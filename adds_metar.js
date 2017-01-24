/*jshint node:true */
/*jshint -W097 */
/*jshint esversion: 6 */
"use strict";

var do_not_cache = false;

var pdb = require('./prefs');
var util = require('./dutil');

var s_pause = '<break time="100ms"/>';
var m_pause = '<break time="200ms"/>';

var names         = require('./airports_by_city.js');
var AlexaSkill    = require('./AlexaSkill'); // The AlexaSkill prototype and helpers
var https         = require('https');
var xml2js        = require('xml2js');
var WorldMagModel = require('./WorldMagneticModel');
var wmm           = new WorldMagModel();
var stations      = require('./stations.js');

var nowToMagYear = function() {
    var now = new Date();
    var start = new Date("January 1, 2015 00:00:00 GMT");
    return (2015 + (now - start) / (1000*60*60*24*365.25));
};

var wordToLetter = function(word) {
    word = word.toLowerCase();
    var v = null;
    if (util.definedNonNull(util.phonetics[word])) {
        v = util.phonetics[word].toUpperCase();
    }
    return v;
};

// This is hopefully consistent with European usage, where
// visibilities in excess of 5km are read as km, and
// less than that are read as meters.
function metersToWords(b,m) {
    if (m >= 5000) {
        b.push(Math.floor(m/1000 + 0.5).toString());
        b.push('kilometers');
    } else {
        b.push(Math.floor(m/100 + 0.5) * 100).toString();
        b.push('meters');
    }
}

// This is consistent with common US usage where visibilities
// in excess of 3 statute miles are read simply as integer miles
// and less than will be reported in quarter mile increment.
// No unit is uttered.
function milesToWords(b,m) {
    if (m >= 3) {
        b.push(Math.floor(m + 0.5).toString());
    } else {
        var quarters = Math.floor(m*4 + 0.5);
        var wholes   = Math.floor(quarters/4);
        quarters -= wholes * 4;
        if (wholes || !quarters) b.push(wholes);
        if (quarters) {
            if (wholes) b.push('and');
            if (quarters == 1) {
                b.push('one quarter');
            } else if (quarters == 2) {
                b.push('one half');
            } else if (quarters == 3) {
                b.push('three quarters');
            }
        }
    }
}

var getCached = function(cbctx, cb) {
    var letters      = cbctx.letters;
    var id           = '';
    if (letters.length < 4) {
        id = 'K';
    }
    id += letters.join('');

    if (do_not_cache) return getXML(cbctx, id, cb);

    pdb.sta_get(id,function(ferr,fdata) {
        if (ferr) {
            if (!util.stringInIgnoreCase(ferr,['too_old','no_items_returned'])) {
                console.error('-w- getCached return error: ' + ferr);
            }
            return getXML(cbctx, id, cb);
        } else {
            return cb(cbctx,fdata);
        }
    });
};

var getXML = function(cbctx, id, cb) {

    var url =
       'https://www.aviationweather.gov/adds/dataserver_current/httpparam' +
	   '?dataSource=metars' +
	   '&requestType=retrieve' +
	   '&format=xml' +
	   '&hoursBeforeNow=3' +
	   '&mostRecent=true' +
	   '&stationString=' + id;

    // console.log('-d- url: ' + url);
    var req = https.get(url, function(res) {
        var body = '';
        res.on('data', function(data) { body += data; });
        res.on('end', function() {
            var xmlparser = new xml2js.Parser();
            if (util.definedHasLength(body)) {
                try {
                    xmlparser.parseString(body,function(err,result) {
                        if (err) {
                            console.error('-err- : getXML : ' + err);
                            return cb(cbctx,{});
                        } else {
                            if (do_not_cache) return cb(cbctx, result);

                            pdb.sta_store(id,result,function(serr) {
                                return cb(cbctx,result);
                            });
                        }
                    });
                }
                catch(e) {
                    console.error('-err- : getXML : ' + e);
                    return cb(cbctx,{});
                }
           }
       });
    }).on('error', function(e) {
        console.log('-err- : getXML : ' + e);
    });


    req.setTimeout(5000, function() {
        console.log('-err- : getXML : request timed out');
        var msg = 'Query from a d d s is taking too long. Try again later.';
        cbctx.response_object.tellWithCard(msg,"query taking Too long",msg);
        return;
    });
};

var validateCity = function(slots) {
    var name = "none provided";
    try {
        name = slots.city.value.toLowerCase()
            .replace('/',' ')
            .replace('-',' ')
            .replace(/\bairport\b/,'')
            .replace(/\binternational\b/,'')
            .replace(/\bweather\b/,'');
        if (names[name]) {
            return { mode: 'city', valid: true, letters: names[name].split(''), orig: name };
        } else {
            console.log('validateCity() airport_not_found: ' + name);
        }
    } catch (e) {
        console.error('-err- : validateCity : ' + e);
    }
    return { mode: 'city', valid: false, letters: [], orig: name };
};

function validateSlots(slots) {
    var response = {
        letters: [],
        orig: [],
        valid: true,
        mode: 'identifier'
    };

    var slot_names = ['sa','sb','sc','sd'];
    slot_names.forEach(function(sn) {
        var value = null;
        try {
            value = slots[sn] ? slots[sn].value : null;
        } catch(e) { }

        if (util.definedHasLength(value)) {
            response.orig.push(value);
            var letter = wordToLetter(value);
            if (letter !== null) {
                response.letters.push(letter.toUpperCase());
            } else {
                var char1 = value.substr(0,1);
                if (char1.match(/^\d/)) {
                    response.letters.push(char1);
                } else {
                    // only include below if we want to
                    // allow non-phonetics
                    response.letters.push(char1.toUpperCase());
                }
            }
        }
    });


    if (response.letters.length < 3) {
        response.valid = false;
    } else if (response.letters.length == 3) {
        response.letters.unshift('K');
    }

    return response;
}


function validateDefaultAirport(user_info) {
    if (false) {
        console.log('-d- validateDefaultAirport');
        console.log(user_info);
    }

    var da = user_info.preferences.default_airport;
    var sr = { mode: 'default_airport', valid: false, };

    if (util.definedHasLength(da)) {
        sr.valid = true;
        sr.letters = da.split('');
    } else {
        sr.orig = 'Default Airport Not Set';
        sr.letters = [];
    }
    if (true) console.log(sr);
    return sr;
}

// switches text to use some of the stranger ICAO standard
// pronunciation, such as saying three as tree and five as fife,
// for "realism."
function radioify(blobs) {
    var new_blobs = [];
    blobs.forEach(function(blob) {
        var nb = blob;
        switch (blob) {
            case '9': nb = 'niner'; break;
            case '5': nb = 'fife'; break;
            case '3': nb = 'tree'; break;
            // case '4': nb = 'fow-er'; break; // fow-er is too annoying. Nobody really says it.
            default: break;
        }
        new_blobs.push(nb);
    });
    return new_blobs;
}


function metar2text(metar,preferences) {
    var blobs = [];
    // console.log(metar);

    // Get the airport name if we have it in our database,
    // otherwise just say the identifier.
    var sta_dat = null;
    if (util.definedNonNull(metar.station_id)) {
        sta_dat = stations[metar.station_id];
        if (util.defined(sta_dat) && util.defined(sta_dat.name)) {
            var n = sta_dat.name.replace('intnl','international')
                .replace(/\bintl\b/,'international')
                .replace(/\bint\b/,'international')
                .replace(/\bafb\b/,'air force base')
                .replace(/\bmcas\b/,'marine corps air station')
                .replace(/\fld\b/,'field')
                .replace(/\muni\b/,'municipal')
                .replace(/\municip\b/,'municipal')
                .replace(/\bvly\b/,'valley')
                .replace(/\breg\b/,'regional')
                .replace(/\bpt\b/,'point')
                .replace(/\bst\b/,'saint')
                .replace(/\bmt\b/,'mount')
                .replace(/\bmtn\b/,'mountain')
                .replace(/\brgnl\b/,'regional')
                .replace(/\braf\b/,'royal air force')
                .replace(/\bnas\b/,'naval air station')
                .replace(/\bairp\w+/,'airport')
                .replace(/\bislap\w+/,'island')
                .replace(/\barpt\b/,'airport')
                .replace('apt','airport')
                .replace(/\barp\b/,'airport')
                .replace('/',' ');
            blobs.push(n);
            if (n.match(/\bairport|base|station|field|airfield\b/)) {
            } else {
                blobs.push('airport');
            }
        } else {
            var id      = "" + metar.station_id;
            blobs.push.apply(blobs,id.split(''));
            blobs.push('airport');
        }
        // blobs.push('airport');
        blobs.push(m_pause);
    }


    // automated results, like from AWOS state that they were autoamted
    var was_automated = false;
    try {
        was_automated = 
            util.stringIs(metar.quality_control_flags[0].auto_station[0],
                         'TRUE');
    } catch (e0) { }


    // say "special" if the update to the metar was done off the normal
    // schedule, due to an important and sudden weather change, for example
    var was_speci = false;
    try {
        was_speci = util.stringIs(metar.metar_type,'SPECI');
    } catch (e1) { }


    // ADDS returns a lot of reports that are both automated and SPECI,
    // which seems very fishy to me. Wikipedia says that an ASOS 
    // system can do an out-of-schedule report if the weather has changed
    // quickly, but I've never heard an automated station say "special",
    // so I'm going to suppress them here.
    if (was_automated) {
        blobs.push('automated');
    } else {
        if (was_speci) {
            blobs.push('special');
        }
    }


 blobs.push('weather observation');

    // state the time, in zulu
    if (util.definedNonNull(metar.observation_time)) {
        var otime = new Date(metar.observation_time);
        blobs.push(util.timeToDigits(otime).join(' '));
        blobs.push('zulu');
        blobs.push(m_pause);
    }


    // report the visibility information
    if (util.definedNonNull(metar.visibility_statute_mi)) {
        blobs.push('visibility');
        var use_km =
            util.stringInIgnoreCase(preferences.distance_unit,
                                    ['kilometer','kilometers','km']);
        if (use_km) {
            metersToWords(blobs, parseFloat(metar.visibility_statute_mi) * 1609.34);
        } else {
            milesToWords(blobs, parseFloat(metar.visibility_statute_mi));
        }
        blobs.push(m_pause);
    }


    // report the wind. There are several variations in phraseology for this,
    // so this is a bit more complicated than one might imagine.
    if (util.definedNonNull(metar.wind_dir_degrees) &&
        util.definedNonNull(metar.wind_speed_kt)) {
        blobs.push('wind');
        // METARs have true directions
        var wind_dir_true = parseFloat(metar.wind_dir_degrees[0]);

        var mag_var = 0;
        if (util.defined(sta_dat) && sta_dat) {
            mag_var = wmm.declination(sta_dat.elev,sta_dat.lat,sta_dat.lon,
		    nowToMagYear());
        } else {
            console.log('-warn- : metar2text : did not calculate mag var; wind is true');
       }

       var wind_speed_int = parseInt(metar.wind_speed_kt[0]);
       if (wind_speed_int === 0) {
           blobs.push('calm');
       } else {
           if (metar.raw_text[0].match(/\sVRB/)) {
               blobs.push('variable');
           } else {
               var wind_dir_pref  = mag_var;
               var use_true = util.stringIsIgnoreCase(preferences.wind_reference,'true');
               if (use_true) {
                   // true wind directions are generally not appropriate
                   // in an ATIS report, but because I have to calculate starting
                   // from true, I make it optional for the user to get a true
                   // direction.
                   wind_dir_pref = wind_dir_true;
               } else {
                   wind_dir_pref += wind_dir_true;
               }

               // adjustment can leave you with non 0-360 results
               while (wind_dir_pref < 0)   wind_dir_pref += 360;
               while (wind_dir_pref > 360) wind_dir_pref -= 360;
               var wind_dir_int = Math.floor(wind_dir_pref + 0.5);
               var wind_digits = util.numberToZeroPaddedArray(wind_dir_int,3);
               wind_digits.forEach(function(x) { blobs.push(x.toString()); });
               if (use_true) {
                   blobs.push('true');
               }
           }
           blobs.push('at');
           blobs.push(metar.wind_speed_kt[0]);
           if (metar.wind_gust_kt) {
               blobs.push('gusting');
               blobs.push(metar.wind_gust_kt[0]);
           }
       }
       blobs.push(m_pause);
   }


    // weather descriptions
    if (util.definedNonNull(metar.wx_string)) {
        var wx = metar.wx_string.toString();
        var vicinity = false;
        if (wx.match(/^-/)) { blobs.push('light'); }
        if (wx.match(/^\+/)) { blobs.push('heavy'); }
        if (wx.match(/VC/)) { vicinity = true; }
        if (wx.match(/MI/)) { blobs.push('shallow'); }
        if (wx.match(/PR/)) { blobs.push('partial'); }
        if (wx.match(/BC/)) { blobs.push('patches'); }
        if (wx.match(/DR/)) { blobs.push('drifting'); }
        if (wx.match(/BL/)) { blobs.push('blowing'); }
        if (wx.match(/SH/)) { blobs.push('showers'); }
        if (wx.match(/TS/)) { blobs.push('thunderstorm'); }
        if (wx.match(/FZ/)) { blobs.push('freezing'); }

        if (wx.match(/DZ/)) { blobs.push('drizzle'); }
        if (wx.match(/RA/)) { blobs.push('rain'); }
        if (wx.match(/SN/)) { blobs.push('snow'); }
        if (wx.match(/SG/)) { blobs.push('snow grains'); }
        if (wx.match(/IC/)) { blobs.push('ice crystals'); }
        if (wx.match(/PL/)) { blobs.push('ice pellets'); }
        if (wx.match(/GR/)) { blobs.push('hail'); }
        if (wx.match(/GS/)) { blobs.push('small hail'); }
        if (wx.match(/UP/)) { blobs.push('unknown precipitation'); }

        if (wx.match(/BR/)) { blobs.push('mist'); }
        if (wx.match(/FG/)) { blobs.push('fog'); }
        if (wx.match(/FU/)) { blobs.push('smoke'); }
        if (wx.match(/VA/)) { blobs.push('volcanic ash'); }
        if (wx.match(/DU/)) { blobs.push('widepread dust'); }
        if (wx.match(/SA/)) { blobs.push('sand'); }
        if (wx.match(/HZ/)) { blobs.push('haze'); }
        if (wx.match(/PY/)) { blobs.push('spray'); }

        if (wx.match(/PO/)) { blobs.push('well developed dust swirls'); }
        if (wx.match(/SQ/)) { blobs.push('squalls'); }
        if (wx.match(/FC/)) { blobs.push('funnel cloud'); }
        if (wx.match(/SS/)) { blobs.push('sand storm'); }
        if (wx.match(/DS/)) { blobs.push('dust storm'); }

        if (vicinity) blobs.push('in the vicinity');

        var began = wx.match(/B(\d\d)/);
        if (began) {
            blobs.push('began');
            blobs.push(began[1]);
        }

        var ended = wx.match(/E(\d\d)/);
        if (ended) {
            blobs.push('ended');
            blobs.push(ended[1]);
        }
        blobs.push(m_pause);
   }


    // sky condition (clouds)
    if (util.definedNonNull(metar.sky_condition)) {
        blobs.push('sky condition');
        metar.sky_condition.forEach(function(layer) {
            var layer_type_short = layer.$.sky_cover;
            var layer_base = layer.$.cloud_base_ft_agl;
            var layer_type = layer_type_short == 'CLR' ? 'clear' :
                             layer_type_short == 'SKC' ? 'clear' :
	                         layer_type_short == 'FEW' ? 'few clouds' :
	                         layer_type_short == 'SCT' ? 'scattered' :
		                     layer_type_short == 'BKN' ? 'broken' :
		                     layer_type_short == 'OVC' ? 'overcast' : '';
            blobs.push(layer_type);
            if ((layer_type != 'clear') && (layer_type.length)) {
                layer_base = parseInt(layer_base);
                var layer_base_thousands = Math.floor(layer_base / 1000);
                var layer_base_hundreds  = Math.floor((layer_base - layer_base_thousands*1000) / 100);
                if (layer_base_thousands) {
                    blobs.push(layer_base_thousands.toString().split('').join(' '));
                    blobs.push('thousand');
                }
                if (layer_base_hundreds) {
                    blobs.push(layer_base_hundreds.toString());
                    blobs.push('hundred');
                }
            }
            blobs.push(s_pause);
        });
        blobs.push(s_pause);
    }


    // temperature && dewpoint, ATIS is always "c", but I've
    // gotten requests for 'F' so I've added that as an option
    var use_f = util.stringInIgnoreCase(preferences.temp_unit,['fahrenheit','f']);
    if (util.definedNonNull(metar.temp_c)) {
        blobs.push('temperature');
        var tp = parseFloat(metar.temp_c);
        if (use_f) {
            tp = Math.floor((tp * 9.0 / 5.0) + 32.5);
        } else {
            tp = Math.floor(tp + 0.5);
        }
        if (tp < 0) blobs.push('minus');
        blobs.push(Math.abs(tp).toString());
        if (use_f) {
            blobs.push('fahrenheit');
        }
        blobs.push(m_pause);
    }

    if (util.definedNonNull(metar.dewpoint_c)) {
        blobs.push('dewpoint');
        var dp = parseFloat(metar.dewpoint_c);
        if (use_f) {
            dp = Math.floor((dp * 9.0 / 5.0) + 32.5);
            if (dp < 0) blobs.push('minus');
        } else {
            dp = Math.floor(dp + 0.5);
        }
        if (dp < 0) blobs.push('minus');
        blobs.push(Math.abs(dp).toString());
        if (use_f) {
            blobs.push('fahrenheit');
        }
        blobs.push(m_pause);
    }


    // pressure for altimeter setting
    if (util.definedNonNull(metar.altim_in_hg)) {
        var altim;
        var altim_digits;
        var use_mb =
            util.stringInIgnoreCase(preferences.pressure_unit,['millibar','millibars','hectopascal','hectopascals']);

        if (use_mb) {
            altim = Math.floor(0.5 + 33.8639 * parseFloat(metar.altim_in_hg));
            altim_digits = altim.toString().split('');
            blobs.push('q');
            blobs.push('n');
            blobs.push('h');
        } else {
            altim = Math.floor(0.5 + 100 * parseFloat(metar.altim_in_hg));
            altim_digits = altim.toString().split('');
            blobs.push('altimeter');
        }
        altim_digits.forEach(function(digit) { blobs.push(digit); });
        blobs.push(m_pause);
    }

    // adding the period helps alexa determine the ending inflection
    // of the 'sentence'
    blobs.push('.');

    return blobs;
}


function reversePhonetics() {
    var rp = {};
    for (var phone in util.phonetics) {
        rp[util.phonetics[phone]] = phone;
    }
    return rp;
}

function processResult(cbctx, data) {
    if (false) {
        console.log('processResult DATA IS');
        console.log(JSON.stringify(data,null,2));
    }
    var metar = null;
    if (data.response &&
        data.response.data[0] &&
        data.response.data[0].METAR) {
        metar = data.response.data[0].METAR[0];
    }

    var to_say = '';
    if (util.definedNonNull(metar)) {
        console.log('-d- processResult : __METAR_OK__');
        var chunks = metar2text(metar,cbctx.session.user_info.preferences);
        chunks     = radioify(chunks);
        to_say = chunks.join(' ');

        var prefs = cbctx.session.user_info.preferences;
        if (prefs && prefs.repeat) {
            var times = prefs.repeat;
            var several = Array.apply(null, Array(times)).map(function() {
                return to_say;
            });
            to_say = several.join(' <break time="2000ms"/> ');
        }

        to_say = ['<speak>',to_say,'</speak>'].join(' ');

        // console.log('-d- processResult : Going to say: ' + to_say);

        cbctx.session.user_info.stats.last_airport = metar.station_id[0];
        if (false) {
            console.log('-d- processResult __SAVING_UPDATE__');
            console.log(cbctx.session.user);
            console.log(cbctx.session.user_info);
        }

        pdb.setUserInfo(cbctx.session.user.userId,
                        cbctx.session.user_info,
                        function(e) {
                            cbctx.response_object.tellWithCard(
                                {type: 'SSML', speech: to_say},
                                "METAR for " + metar.station_id,
                                metar.raw_text[0]
                            );
                        }
        );
    } else {
        console.log('-d- processResult : __METAR_NOT_OK__');
        var rp      = reversePhonetics();
        var letters = cbctx.letters.map(function(l) { return rp[l.toLowerCase()]; });
        to_say = 'The weather server returned an empty response for ' +
	        letters.join(' ') +
	        '. This usually means that the identifier is invalid, but it could be ' +
	        'that the weather server is having trouble right now and trying ' +
	        'in a few minutes would help.';
        cbctx.session.user_info.stats.last_airport = null;
        pdb.setUserInfo(cbctx.session.user.userId,
                        cbctx.session.user_info,
                        function(){
                            cbctx.response_object.tellWithCard(to_say,"No METAR",
                            "No response for " + cbctx.letters.join(''));
                        }
        );
    }
}

module.exports = {
    getCached:              getCached,
    processResult:          processResult,
    wordToLetter:           wordToLetter,
    validateSlots:          validateSlots,
    validateDefaultAirport: validateDefaultAirport,
    validateCity:           validateCity,
};

if (require.main == module) {
    var b;
    b = []; milesToWords(b,0); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,0.125); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,0.25); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,0.375); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,0.5); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,0.625); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,0.75); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,0.875); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,0.90); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,1); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,1.25); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,1.5); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,1.75); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,2); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,2.25); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,2.5); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,2.75); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,3); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,3.25); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,3.5); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,3.75); console.log(JSON.stringify(b,null,2));
    b = []; milesToWords(b,4); console.log(JSON.stringify(b,null,2));
}

