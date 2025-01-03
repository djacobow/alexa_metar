/*jshint esversion: 6 */
// App ID for the skill
var APP_ID = 'amzn1.echo-sdk-ams.app.74a477b4-fe89-452d-8aa2-9cb6d89391ff';

var AlexaSkill = require('./AlexaSkill'); // The AlexaSkill prototype and helpers
var adds       = require('./adds');       // aviation METARs
var wxdec      = require('./wxdec_helpers.js');
var pdb        = require('./prefs');      // saving user preferences
var util       = require('./dutil');      // utils

// airport_wx_app is a child of AlexaSkill, overrides various methods
var airport_wx_app = function () {
    AlexaSkill.call(this, APP_ID);
};


function logBasic(name,session,message) {
    if ((message === undefined) || (!message)) message = null;
    var chunks = [
        name,
        'sessionId: ' + session.sessionId,
        message ? JSON.stringify(message,null,2) : ''
    ];
    console.log(chunks.join(' | '));
}

// Extend AlexaSkill
airport_wx_app.prototype = Object.create(AlexaSkill.prototype);
airport_wx_app.prototype.constructor = airport_wx_app;
airport_wx_app.prototype.eventHandlers.onSessionStarted =
    function (sessionStartedRequest, session) {
        logBasic('onSessionStarted',session, 'userId: ' + session.user.userId);

};

airport_wx_app.prototype.eventHandlers.onLaunch =
    function (launchRequest, session, response) {
        logBasic('onLaunch',session);
        var speechOutput =

`Welcome to the mee-tar reader app. I will read you airport weather \
reports. You can say "get San Francisco" to get the weather at San \
Francisco airport. You can say "get kilo oscar romeo delta" to get \
the weather at Chicago O'Hare airport. Please note that the data \
I read is advisory and pilots should consult official sources for a legal \
weather briefing.`;

        var repromptText =
'Say a major US city name or a three or four letter airport identifier.';
        response.ask(speechOutput, repromptText);
};

airport_wx_app.prototype.eventHandlers.onSessionEnded =
    function (sessionEndedRequest, session) {
        logBasic('onSessionEnded',session);
};


var help_text = `\
The airport weather skill lets you hear airport mee-tars and terminal \
forecasts red aloud as if they were ATIS reports. It works by three or four \
letter airport identifier, or by city name. For example, you can say \
get kilo oscar alpha kilo or get Oakland. This will return the current  \
weather. You can say get forecast San Francisco or get forecast  \
kilo sierra foxtrot oscar. This will return the terminal forecast.`;

function weatherById(sr, session, response, do_taf) {
    do_taf = util.definedNonNullTrue(do_taf);
    if (sr.valid) {
        var ctx = {
            session: session,
            response_object : response,
            letters : sr.letters,
        };
        if (do_taf) {
            adds.getCachedMETAR_TAF(ctx, 'taf', wxdec.processTAF);
        } else {
            adds.getCachedMETAR_TAF(ctx, 'metar', wxdec.processMETAR);
        }
    } else {
        var was_city    = sr.mode == 'city';
        var was_default = sr.mode == 'default_airport';
         var ask = '';
         if (was_city) {
             if (sr.orig && (sr.orig !== 'none provided')) {
                 ask =

`I could not find the city ${sr.orig} in my database. That is probably \
my fault. I am working on expanding my database, but it is limited to  \
the largest airports right now. You might try using the airports \
eye kay oh identifier instead.`;

             } else {
                 ask = `It looks like you didn't name a city  \
                 for me to look up.`;
             }
         } else if (was_default) {
             ask = 

`The default airport has not been set. Complete a request first by  \
identifier or city name, then say "set default" to set the default  \
airport.`;

         } else {
             ask = "I couldn't make sense of your request. I heard " +
                   sr.orig.join(' ');
         }
         repromptText =

`Please try again. To get the mee-tar say get, followed by a US or UK \
city name, or three or four letter identifier using eye kay oh phonetics. \
To get the forecast, say get forecast followed by the city, or three or \
four letter phonetic identifier.`;

         ask += ' '  + repromptText;
         response.ask(ask,repromptText);
    }
}

function joinWithAnd(a) {
    if (a.length > 1) {
        return a.slice(0,a.length-1).join(' , ') + ' and ' + a[a.length-1];
    } else if (a.length > 0) {
        return a[0];
    } else {
        return '';
    }
}

function airportSetter(kind, intent, session, response) {
    // kind must be weather or forecast
    var do_taf = util.stringIsIgnoreCase(kind,'taf');

    logBasic('airportSetter',session,intent);
    var last_airport = session.user_info.stats.last_airport;
    if (util.definedHasLength(last_airport)) {
        var pref_to_set = do_taf ?
                           'default_taf_airport' :
                           'default_airport';
        session.user_info.preferences[pref_to_set] = last_airport;
        console.log('-d- __setAirport SAVING ' + pref_to_set);
        console.log(session.user);
        console.log(session.user_info);
        pdb.setUserInfo(session.user.userId,session.user_info,function() {
            var rstring = 'I set your default airport for ' +
            (do_taf ? 'terminal forecasts' : 'weather reports') +
            ' to ';
            last_airport.split('').forEach(function(l) {
                rstring += l + ' ';
            });
            response.tell(rstring);
        });
    } else {
        response.tell(
` The previous query did not succeed. Query an airport first, then \
say "store local airport" to store that airport as your default. \
If you want to set a different airport to be used as your default \
for terminal forecasts, say "store airport for forecasts.`
        );
    }
}

// helper for setting stored preferences
function prefSetter(type,intent,session,pdb,response) {
    var types = {
        'dist': {
            'slot_name': 'dist',
            'pref_name': 'distance_unit',
            'read_name': 'visibility unit',
            'legal': ['kilometers', 'miles' ],
        },
        'press': {
            'slot_name': 'pressure',
            'pref_name': 'pressure_unit',
            'read_name': 'altimeter unit',
            'legal': ['millibar', 'millibars','bar','bars',
                      'hectopascal','pascal','inches'],
        },
        'wdir': {
            'slot_name': 'ref',
            'pref_name': 'wind_reference',
            'read_name': 'wind reference',
            'legal': ['magnetic','true'],
        },
        'temp': {
            'slot_name': 'temperature',
            'pref_name': 'temp_unit',
            'read_name': 'temperature unit',
            'legal': ['fahrenheit','f','celsius','centigrade','c'],
        },
    };

    var config = types[type];
    var desired = intent.slots[config.slot_name].value;
    console.log('-d- new ' + type + ' unit: ' + desired);
    session.user_info.preferences[config.pref_name] = desired;
    if (util.stringInIgnoreCase(desired, config.legal)) {
        pdb.setUserInfo(session.user.userId,session.user_info,function() {
            response.tell('I set your ' + config.read_name + ' preference ' +
                'to ' + desired);
        });
    } else {
        response.tell('I did not set your preference because ' + desired +
            ' is not a valid value for ' + config.read_name + 
            '. The acceptable choices are ' + joinWithAnd(config.legal) +
            '.');
    }
}

airport_wx_app.prototype.intentHandlers = {

    // Generic amazon intents
    "AMAZON.HelpIntent": function(intent, session, response) {
        logBasic('AMAZON.HelpIntent',session,intent);
        response.tellNoEnd(help_text);
    },
    "AMAZON.StopIntent": function(intent, session, response) {
        logBasic('AMAZON.StopIntent',session,intent);
        response.tell('stopping. goodbye');
    },
    "AMAZON.CancelIntent": function(intent, session, response) {
        logBasic('AMAZON.CancelIntent',session,intent);
        response.tell('canceling. goodbye');
    },

    // The "main" intents for getting the current weather
    metarThree: function(intent, session, response) {
        logBasic('metarThree',session,intent);
        weatherById(adds.validateSlots(intent.slots),session,response);
    },
    metarFour: function(intent, session, response) {
        logBasic('metarFour',session,intent);
        weatherById(adds.validateSlots(intent.slots),session,response);
    },
    metarCity: function(intent, session, response) {
        logBasic('metarCity',session,intent);
        weatherById(adds.validateCity(intent.slots),session,response);
    },
    metarDeflt: function(intent, session, response) {
        logBasic('metarDeflt',session,intent);
        weatherById(
            adds.validateDefaultAirport('metar',session.user_info),
            session,
            response,
            false
        );
    },

    // The intents for getting the forecast weather
    tafThree: function(intent, session, response) {
        logBasic('tafThree',session,intent);
        weatherById(adds.validateSlots(intent.slots),session,response,true);
    },
    tafFour: function(intent, session, response) {
        logBasic('tafFour',session,intent);
        weatherById(adds.validateSlots(intent.slots),session,response,true);
    },
    tafCity: function(intent, session, response) {
        logBasic('tafCity',session,intent);
        weatherById(adds.validateCity(intent.slots),session,response,true);
    },
    tafDeflt: function(intent, session, response) {
        logBasic('tafDeflt',session,intent);
        weatherById(
            adds.validateDefaultAirport('taf', session.user_info),
            session,
            response,
            true
        );
    },


    // a simple intent for getting the time in zulu
    getTime: function(intent, session, response) {
        logBasic('getTime',session,intent);
        var now = new Date();
        var r = 'The time is now ' +
                util.numberToZeroPaddedString(now.getUTCHours(),2) +
                ' ' +
                util.numberToZeroPaddedString(now.getUTCMinutes(),2) +
               ' zulu';
        response.tell(r);
    },

    // an intent for setting and storing the user's preferred default
    // airport
    setAirport: function(intent, session, response) {
        airportSetter('metar', intent, session, response);
    },
    setTAFAirport: function(intent, session, response) {
        airportSetter('taf', intent, session, response);
    },

    setRepeat: function(intent,session,response) {
        logBasic('setRepeat',session,intent);
        var repeat_count = 1;
        try {
            repeat_count = parseInt(intent.slots.repeat_count.value);
        } catch (e) {
        }
        if ((repeat_count < 1) ||
            (repeat_count > 10)) {
            var rstring = 'The supported range for repeat counts is ' +
                ' from one to ten, inclusive. Try again with a value ' +
                ' in that range.';
            response.tell(rstring);
        } else {
            session.user_info.preferences.repeat = repeat_count;
            pdb.setUserInfo(session.user.userId,session.user_info,
                            function() {
                var rstring = 'I set your repeat count to ';
                rstring += repeat_count.toString() + ' ';
                response.tell(rstring);
            });
        }
    },

    // preference setters
    setDistUnit: function(intent,session,response) {
        logBasic('setDistUnit',session,intent);
        prefSetter('dist',intent,session,pdb,response);
    },
    setPressUnit: function(intent,session,response) {
        logBasic('setPressUnit',session,intent);
        prefSetter('press',intent,session,pdb,response);
    },
    setWindRef: function(intent,session,response) {
        logBasic('setWindRef',session,intent);
        prefSetter('wdir',intent,session,pdb,response);
    },
    setTempUnit: function(intent,session,response) {
        logBasic('setTempUnit',session,intent);
        prefSetter('temp',intent,session,pdb,response);
    },
};


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the airport_wx_app skill.
    var app = new airport_wx_app();
    app.execute(event, context);
};


if (require.main == module) {

    // -------------- for testing ----------------
    // for testing locallly
    var dummyTellWithCard = function(a,b,c) {
        console.log('dummyTellWithCard');
        var x = {
            'saying': a,
            'title': b,
            'contents': c,
        };
        console.log(JSON.stringify(x,null,2));
    };

    var test_ctx = {
        session: {
            user: {
                userId: 'bob',
            },
            user_info: {
                preferences: {
                    default_airport: 'KSMF',
                    default_taf_airport: 'KIAD',
                    wind_reference: 'magnetic',
                    // pressure_unit: 'millibar',
                    // distance_unit: 'kilometers',
                    repeat: 2,
                    // temp_unit: 'f',

                },
                stats: {
                    last_airport: 'KO22',
                    use_count: 3,
                    last_use: Math.floor(Date.now() / 1000),
                },
            },
        },
        response_object: {
            tellWithCard: dummyTellWithCard,
        },
    };


    if (1) {
        var slots = {
            sa: { value: 'l' },
            sb: { value: 'e'} ,
            sc: { value: 'm' },
            sd: { value: 'd' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'metar', wxdec.processMETAR);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            sa: { value: 'p' },
            sb: { value: 'a'} ,
            sc: { value: 'f' },
            sd: { value: 'a' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'metar', wxdec.processMETAR);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            city: { value: 'heathrow' },
        };
        var sr    = adds.validateCity(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'taf', wxdec.processTAF);
        }
    }


    if (1) {
        var sr    = adds.validateDefaultAirport('metar',test_ctx.session.user_info);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'metar', wxdec.processMETAR);
        }
    }

    if (1) {
        var sr    = adds.validateDefaultAirport('taf',test_ctx.session.user_info);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'taf', wxdec.processTAF);
        }
    }

    if (1) {
        var slots = {
            sa: { value: 'k' },
            sb: { value: 'b'} ,
            sc: { value: 'l' },
            sd: { value: 'v' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'metar', wxdec.processMETAR);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            sa: { value: 'p' },
            sb: { value: 'a'} ,
            sc: { value: 'n' },
            sd: { value: 'c' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'metar', wxdec.processMETAR);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            sa: { value: 'k' },
            sb: { value: 'e'} ,
            sc: { value: 'u' },
            sd: { value: 'l' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'metar', wxdec.processMETAR);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            /*
            sa: { value: 'k' },
            sb: { value: 'p'} ,
            sc: { value: 'a' },
            sd: { value: 'o' },
            */
            sa: { value: 'u' },
            sb: { value: 'r'} ,
            sc: { value: 'k' },
            sd: { value: 'k' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'metar', wxdec.processMETAR);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            sa: { value: 'p' },
            sb: { value: 'p'} ,
            sc: { value: 'P' },
            sd: { value: 'P' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'metar', wxdec.processMETAR);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            /*
            sa: { value: 'k' },
            sb: { value: 'k'} ,
            sc: { value: 'b' },
            sd: { value: 'f' },
            */
            sa: { value: 'u' },
            sb: { value: 'r'} ,
            sc: { value: 'k' },
            sd: { value: 'k' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'taf', wxdec.processTAF);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            sa: { value: 'k' },
            sb: { value: 's'} ,
            sc: { value: 'e' },
            sd: { value: 't' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'metar', wxdec.processMETAR);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            sa: { value: 'k' },
            sb: { value: 'm'} ,
            sc: { value: 's' },
            sd: { value: 'p' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        console.log(test_ctx.session.user_info.preferences);
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'metar', wxdec.processMETAR);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            sa: { value: 'k' },
            sb: { value: 'o'} ,
            sc: { value: 'a' },
            sd: { value: 'k' },
        };
        var sr = adds.validateSlots(slots);
        test_ctx.letters = sr.letters;
        console.log(test_ctx.session.user_info.preferences);
        if (sr.valid) {
            adds.getCachedMETAR_TAF(test_ctx, 'taf', wxdec.processTAF);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

}


