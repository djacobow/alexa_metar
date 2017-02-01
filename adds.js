/*jshint node:true */
/*jshint -W097 */
/*jshint esversion: 6 */
"use strict";

var do_not_cache = false;

var pdb = require('./prefs');
var util = require('./dutil');


var names         = require('./airports_by_city.js');
var https         = require('https');
var xml2js        = require('xml2js');


var wordToLetter = function(word) {
    word = word.toLowerCase();
    var v = null;
    if (util.definedNonNull(util.phonetics[word])) {
        v = util.phonetics[word].toUpperCase();
    }
    return v;
};

var getCachedTAF = function(cbctx, cb) {
    var letters      = cbctx.letters;
    var id           = '';
    if (letters.length < 4) {
        id = 'K';
    }
    id += letters.join('');

    if (do_not_cache) return getRawMETAR_TAF(false, cbctx, id, cb);

    pdb.sta_get(id,'taf',function(ferr,fdata) {
        if (ferr) {
            if (!util.stringInIgnoreCase(ferr,['too_old','no_items_returned'])) {
                console.error('-w- getCached return error: ' + ferr);
            }
            return getRawMETAR_TAF(true, cbctx, id, cb);
        } else {
            return cb(cbctx,fdata);
        }
    });
};

var getCachedMETAR = function(cbctx, cb) {
    var letters      = cbctx.letters;
    var id           = '';
    if (letters.length < 4) {
        id = 'K';
    }
    id += letters.join('');

    if (do_not_cache) return getRawMETAR_TAF(false, cbctx, id, cb);

    pdb.sta_get(id,'metar',function(ferr,fdata) {
        if (ferr) {
            if (!util.stringInIgnoreCase(ferr,['too_old','no_items_returned'])) {
                console.error('-w- getCached return error: ' + ferr);
            }
            return getRawMETAR_TAF(false, cbctx, id, cb);
        } else {
            return cb(cbctx,fdata);
        }
    });
};

var getRawMETAR_TAF = function(taf, cbctx, id, cb) {
    taf = (taf !== undefined) && taf;

    var url =
       'https://www.aviationweather.gov/adds/dataserver_current/httpparam' +
	   '?dataSource=' + (taf ? 'tafs' : 'metars') +
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

                            pdb.sta_store(id,taf ? 'taf' : 'metar',
                                result,function(serr) {
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




module.exports = {
    getCachedMETAR:         getCachedMETAR,
    getCachedTAF:           getCachedTAF,
    validateSlots:          validateSlots,
    validateDefaultAirport: validateDefaultAirport,
    validateCity:           validateCity,
};

