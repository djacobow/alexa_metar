/*jshint node:true */
/*jshint -W097 */
/*jshint esversion: 6 */

var util          = require('./dutil');
var pdb           = require('./prefs');
var WorldMagModel = require('./WorldMagneticModel');
var wmm           = new WorldMagModel();
var stations      = require('./stations.js');

var s_pause = '<break time="100ms"/>';
var m_pause = '<break time="200ms"/>';
var l_pause = '<break time="400ms"/>';


var nowToMagYear = function() {
    var now = new Date();
    var start = new Date("January 1, 2015 00:00:00 GMT");
    return (2015 + (now - start) / (1000*60*60*24*365.25));
};

// This is hopefully consistent with European usage, where
// visibilities in excess of 5km are read as km, and
// less than that are read as meters.
var metersToWords = function(b,m) {
    if (m >= 5000) {
        b.push(Math.floor(m/1000 + 0.5).toString());
        b.push('kilometers');
    } else {
        b.push(Math.floor(m/100 + 0.5) * 100).toString();
        b.push('meters');
    }
};

// This is consistent with common US usage where visibilities
// in excess of 3 statute miles are read simply as integer miles
// and less than will be reported in quarter mile increment.
// No unit is uttered.
var milesToWords = function(b,m) {
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
};


// Get the airport name if we have it in our database,
// otherwise just say the identifier.
var makeAirportName = function(id, blobs) {
    var sta_dat = null;
    if (util.definedNonNull(id)) {
        sta_dat = stations[id];
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
            blobs.push.apply(blobs,id.split(''));
            blobs.push('airport');
        }
    }
    return sta_dat;
};

var taf2text = function(period, last_dt, sta_dat, preferences) {
    // console.log(JSON.stringify(period,null,2));
    var blobs = [];

    if (period.hasOwnProperty('change_indicator') &&
        (period.change_indicator[0] === 'TEMPO')) {
        blobs.push('temporarily');
    }

    var from_t = new Date(period.fcst_time_from[0]);
    var to_t   = new Date(period.fcst_time_to[0]);
    blobs.push('from');
    blobs.push.apply(blobs, dateToMonthDayZulu(from_t, last_dt));

    blobs.push('to');
    blobs.push.apply(blobs, dateToMonthDayZulu(to_t, from_t));

    if (period.hasOwnProperty('change_indicator') &&
        (period.change_indicator[0] === 'BECMG')) {
        blobs.push('becoming');
    }

    blobs.push(m_pause);

    preferences.wind_reference = 'true'; // TAF should always be true
    wind2text(period.wind_dir_degrees, period.wind_speed_kt,
              period.hasOwnProperty('wind_gust_kt') ?
                  period.wind_gust_kt :
                  null,
              [''], sta_dat, preferences, false, blobs);

    // note: note passing in the raw string because we need to parse
    // out the specific section, which I have not gotten around to
    // and for which doing so completely ruins the point of having
    // the XML :-(
    vis2text(period.visibility_statute_mi, '', preferences, blobs);

    wx2text(period.hasOwnProperty('wx_string') ? period.wx_string : null,
            preferences, blobs);

    sky2text(period.sky_condition, preferences, blobs);

    blobs.push(s_pause);
    return blobs;
};

var vis2text = function(vis_mi, raw_text, preferences, blobs) {
    // report the visibility information
    if (util.definedNonNull(vis_mi)) {
        blobs.push('visibility');

        // console.log(raw_text[0]); process.exit();
        if (util.definedNonNull(raw_text) &&
            util.definedNonNull(raw_text[0]) &&
            raw_text[0].match(/\b(P6SM|9999)\b/)) {
            blobs.push.apply(blobs,['better','than']);
        }

        var use_km =
            util.stringInIgnoreCase(preferences.distance_unit,
                                    ['kilometer','kilometers','km']);
        if (use_km) {
            metersToWords(blobs, parseFloat(vis_mi) * 1609.34);
        } else {
            milesToWords(blobs, parseFloat(vis_mi));
        }
        blobs.push(m_pause);
    }
};

var wind2text = function(wdir_deg, wspd_kt, wgst_kt, raw_text,
                   sta_dat, preferences, say_true, blobs) {
    // report the wind. There are several variations in phraseology for this,
    // so this is a bit more complicated than one might imagine.
    if (util.definedNonNull(wdir_deg) &&
        util.definedNonNull(wspd_kt)) {
        blobs.push('wind');
        // METARs have true directions
        var wind_dir_true = parseFloat(wdir_deg[0]);

        var mag_var = 0;
        if (util.defined(sta_dat) && sta_dat) {
            mag_var = wmm.declination(sta_dat.elev,sta_dat.lat,sta_dat.lon,
		    nowToMagYear());
        } else {
            console.log('-warn- : wind2text : did not calculate mag var; ' +
                'wind is true');
       }

       var wind_speed_int = parseInt(wspd_kt[0]);
       if (wind_speed_int === 0) {
           blobs.push('calm');
       } else {
           if (raw_text[0].match(/\sVRB/)) {
               blobs.push('variable');
           } else {
               var wind_dir_pref  = mag_var;
               var use_true = util.stringIsIgnoreCase(
                   preferences.wind_reference,'true');
               if (use_true) {
                   // true wind directions are generally not appropriate
                   // in an ATIS report, but because I have to calculate
                   // starting from true, I make it optional for the
                   // user to get a true direction.
                   wind_dir_pref = wind_dir_true;
               } else {
                   wind_dir_pref += wind_dir_true;
               }

               // console.log(preferences);
               // console.log('USE_TRUE: ' + use_true);
               // console.log('SAY_TRUE: ' + say_true);

               // adjustment can leave you with non 0-360 results
               while (wind_dir_pref < 0)   wind_dir_pref += 360;
               while (wind_dir_pref > 360) wind_dir_pref -= 360;
               var wind_dir_int = Math.floor(wind_dir_pref + 0.5);
               var wind_digits = util.numberToZeroPaddedArray(wind_dir_int,3);
               wind_digits.forEach(function(x) {
                   blobs.push(x.toString());
               });
               if (use_true && say_true) {
                   // console.log('SAYING TRUE');
                   blobs.push('true');
               }
           }
           blobs.push('at');
           blobs.push(wspd_kt[0]);
           if (wgst_kt) {
               blobs.push('gusting');
               blobs.push(wgst_kt[0]);
           }
       }
       blobs.push(m_pause);
   }
};

var wx2text = function(wx_string, preferences, blobs) {
    // weather descriptions
    if (util.definedNonNull(wx_string)) {
        var wx = wx_string.toString();
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
};

var sky2text = function(sky_condition, preferences, blobs) {
    // sky condition (clouds)
    if (util.definedNonNull(sky_condition)) {
        blobs.push('sky condition');
        sky_condition.forEach(function(layer) {
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
                var layer_base_hundreds  =
                    Math.floor((layer_base - layer_base_thousands*1000) / 100);
                if (layer_base_thousands) {
                    blobs.push(layer_base_thousands
                        .toString().split('').join(' '));
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
};


var reversePhonetics = function() {
    var rp = {};
    for (var phone in util.phonetics) {
        rp[util.phonetics[phone]] = phone;
    }
    return rp;
};

var dateToMonthDayZulu = function(dt, last_dt) {
    last_dt = util.definedNonNull(last_dt) ? last_dt : null;
    var date  = dt.getUTCDate();
    // console.log(last_dt);
    var different_dates = (!util.definedNonNull(last_dt)) ||
                          (last_dt.getUTCDate() !== date);

    var pieces = [];
    if (different_dates) {
        var month = dt.getUTCMonth();
        month = [ 'January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August',
                  'September', 'October', 'November', 'December' ][month];
        pieces.push(month);
        pieces.push(date);
        pieces.push(', ');
    }

    var hours = dt.getUTCHours();
    var minutes = dt.getUTCMinutes();
    if (true) {
        if (hours < 10) {
            pieces.push('zero');
        }
        pieces.push(hours.toString());

        if (minutes === 0) {
            pieces.push('hundred');
        } else {
            if (minutes < 10) {
                pieces.push('zero');
            }
            pieces.push(minutes);
        }
    }
    pieces.push('zulu');
    return pieces;
};

var datesToIntervalMinutes = function(d1,d2) {
    var d1m = d1.getTime();
    var d2m = d2.getTime();
    var delta_m = d2 - d1;
    var delta_sec = delta_m / 1000;
    var delta_min = delta_sec / 60;
    var delta_hrs = Math.floor(delta_min / 60);
    delta_min -= delta_hrs * 60;
    delta_min = Math.floor(delta_min);
    var rv = [];
    if (delta_hrs) rv.push.apply(rv,[delta_hrs, 'hours']);
    if (delta_min) rv.push.apply(rv,[delta_min, 'minutes']);
    return rv;
};


var temp2text = function(temp_c, dewp_c, preferences, blobs) {
    // temperature && dewpoint, ATIS is always "c", but I've
    // gotten requests for 'F' so I've added that as an option
    var use_f = util.stringInIgnoreCase(
        preferences.temp_unit,['fahrenheit','f']
    );
    if (util.definedNonNull(temp_c)) {
        blobs.push('temperature');
        var tp = parseFloat(temp_c);
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

    if (util.definedNonNull(dewp_c)) {
        blobs.push('dewpoint');
        var dp = parseFloat(dewp_c);
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

};

var press2text = function(altim_in_hg, preferences, blobs) {
    // pressure for altimeter setting
    if (util.definedNonNull(altim_in_hg)) {
        var altim;
        var altim_digits;
        var use_mb =
            util.stringInIgnoreCase(
                preferences.pressure_unit,
                ['millibar','millibars','bar','bars',
                 'hectopascal','hectopascals','pascal']
            );

        if (use_mb) {
            altim = Math.floor(0.5 + 33.8639 * parseFloat(altim_in_hg));
            altim_digits = altim.toString().split('');
            blobs.push('q');
            blobs.push('n');
            blobs.push('h');
        } else {
            altim = Math.floor(0.5 + 100 * parseFloat(altim_in_hg));
            altim_digits = altim.toString().split('');
            blobs.push('altimeter');
        }
        altim_digits.forEach(function(digit) { blobs.push(digit); });
        blobs.push(m_pause);
    }
};

// switches text to use some of the stranger ICAO standard
// pronunciation, such as saying three as tree and five as fife,
// for "realism."
var radioify = function(blobs) {
    var new_blobs = [];
    blobs.forEach(function(blob) {
        var nb = blob;
        switch (blob) {
            case   9 : nb = 'niner'; break;
            case '9' : nb = 'niner'; break;
            case   5 : nb = 'fife'; break;
            case '5' : nb = 'fife'; break;
            case   3 : nb = 'tree'; break;
            case '3' : nb = 'tree'; break;
            // fow-er is too annoying. Nobody really says it.
            // case '4': nb = 'fow-er'; break;
            default: break;
        }
        new_blobs.push(nb);
    });
    return new_blobs;
};

function metar2text(metar,preferences) {
    var blobs = [];
    // console.log(metar);

    var sta_dat = makeAirportName(metar.station_id, blobs);
    blobs.push(m_pause);

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


    // ADDS returns a lot of reports that are simultanesouly automated
    // and SPECI, which seems very fishy to me. Wikipedia says that an ASOS
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

    wind2text(metar.wind_dir_degrees, metar.wind_speed_kt,
              metar.wind_gust_kt, metar.raw_text, sta_dat,
              preferences, true, blobs);

    vis2text(metar.visibility_statute_mi, metar.raw_text, preferences, blobs);

    wx2text(metar.wx_string, preferences, blobs);

    sky2text(metar.sky_condition, preferences, blobs);

    temp2text(metar.temp_c, metar.dewpoint_c, preferences, blobs);

    press2text(metar.altim_in_hg, preferences, blobs);


    // adding the period helps alexa determine the ending inflection
    // of the 'sentence'
    blobs.push('.');

    return blobs;
}


var processMETAR = function(cbctx, data) {
    if (false) {
        console.log('processMETAR DATA IS');
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
        console.log('-d- processMETAR : __METAR_OK__');
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

        // console.log('-d- processMETAR : Going to say: ' + to_say);

        cbctx.session.user_info.stats.last_airport = metar.station_id[0];
        if (false) {
            console.log('-d- processMETAR __SAVING_UPDATE__');
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
        console.log('-d- processMETAR : __METAR_NOT_OK__');
        var rp      = reversePhonetics();
        var letters = cbctx.letters.map(function(l) { return rp[l.toLowerCase()]; });
        to_say = 'The weather server returned an empty response for ' +
	        letters.join(' ') +
`. This usually indicates that the identifier is not valid or that the \
airport does not have weather reporting. However, it could also be that \
the A D D S server is having trouble right now and that trying again in \
in a few minuts would help.`;

        cbctx.session.user_info.stats.last_airport = null;
        pdb.setUserInfo(cbctx.session.user.userId,
                        cbctx.session.user_info,
                        function(){
                            cbctx.response_object.tellWithCard(
                                to_say,
                                "No METAR",
                                "No response for " + cbctx.letters.join('')
                            );
                        }
        );
    }
};


var processTAF = function(cbctx, data) {
    if (false) {
        console.log('processTAF DATA IS');
        console.log(JSON.stringify(data,null,2));
    }
    var to_say = '';
    var taf = null;
    if (data.response &&
        data.response.data[0] &&
        data.response.data[0].TAF) {
        taf = data.response.data[0].TAF[0];
    }
    if (taf) {
        console.log('-d- processTAF: __TAF_OK__');
        // console.log(taf);
        var prefs = cbctx.session.user_info.preferences;
        var issue_time = new Date(taf.issue_time[0]);
        var from_time  = new Date(taf.valid_time_from[0]);
        var to_time    = new Date(taf.valid_time_to[0]);
        var forecast   = taf.forecast;

        var chunks = ['terminal', 'forecast', 'for'];

        var sta_dat = makeAirportName(taf.station_id[0], chunks);

        // give the time the forecast was generated, and how
        // long ago that was
        chunks.push.apply(chunks, [s_pause, 'issued']);
        chunks.push.apply(chunks, dateToMonthDayZulu(issue_time));
        chunks.push(',');
        chunks.push.apply(
            chunks,datesToIntervalMinutes(issue_time,new Date())
        );
        chunks.push('ago');
        // these periods end sentences and affect Alexa's inflection
        chunks.push('.');
        chunks.push(m_pause);

        // The overall forecast period.
        chunks.push.apply(chunks, ['forecast', 'valid', 'from']);
        chunks.push.apply(chunks, dateToMonthDayZulu(from_time,issue_time));
        chunks.push('to');
        chunks.push.apply(chunks, dateToMonthDayZulu(to_time,from_time));
        chunks.push('.');
        chunks.push(m_pause);

        var last_dt = to_time;
        for (var i=0; i<forecast.length; i++) {
            var period = forecast[i];
            chunks.push.apply(
                chunks, taf2text(period, last_dt, sta_dat, prefs)
            );
            last_dt = new Date(period.fcst_time_to[0]);
        }

        chunks     = radioify(chunks);
        to_say = chunks.join(' ');
        to_say = ['<speak>',to_say,'.','</speak>'].join(' ');


        cbctx.session.user_info.stats.last_airport = taf.station_id[0];
        pdb.setUserInfo(cbctx.session.user.userId,
                        cbctx.session.user_info,
                        function(e) {
                            cbctx.response_object.tellWithCard(
                                {type: 'SSML', speech: to_say},
                                "TAF for " + taf.station_id,
                                taf.raw_text[0]
                            );
                        }
        );
    } else {
        console.log('-d- processTAF: __TAF_NOT_OK__');
        var rp      = reversePhonetics();
        var letters = cbctx.letters.map(function(l) {
            return rp[l.toLowerCase()];
        });
        to_say = 'When trying to download the forecast for ' +
	        letters.join(' ') +

`, the weather server returned an empty response. This almost always \
indicates that the airport does not exist or that it does not have a \
terminal forecast. However, it is possible that the A D D S weather server \
is having trouble right now and that trying again later would work.`;

        cbctx.response_object.tellWithCard(
            to_say, "No TAF", "No response for " + cbctx.letters.join('')
        );
    }
};


module.exports = {
    processTAF: processTAF,
    processMETAR: processMETAR,
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

