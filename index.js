
// App ID for the skill
var APP_ID = 'amzn1.echo-sdk-ams.app.74a477b4-fe89-452d-8aa2-9cb6d89391ff';

var AlexaSkill = require('./AlexaSkill'); // The AlexaSkill prototype and helpers
var metar      = require('./adds_metar'); // aviation METARs
var pdb        = require('./prefs');      // saving user preferences
var util       = require('./dutil');      // utils

// airport_wx_app is a child of AlexaSkill, overrides various methods
var airport_wx_app = function () {
    AlexaSkill.call(this, APP_ID);
};


function logBasic(name,session) {
    var chunks = [
        '-i-',
        name,
        'requestId:',
        session.requestId,
        'sessionId:',
        session.sessionId,
        'userId:',
        session.user.userId,
    ];
    console.log(chunks.join(' '));
}


// Extend AlexaSkill
airport_wx_app.prototype = Object.create(AlexaSkill.prototype);
airport_wx_app.prototype.constructor = airport_wx_app;
airport_wx_app.prototype.eventHandlers.onSessionStarted =
    function (sessionStartedRequest, session) {
        logBasic('onSessionStarted',session);
};

airport_wx_app.prototype.eventHandlers.onLaunch =
    function (launchRequest, session, response) {
        logBasic('onLaunch',session);
        var speechOutput = 'Welcome to the mee-tar reader app. I will read you airport weather reports. You can say "get San Francisco" to get the weather at San Fancisco airport. You can say "get kilo oscar romeo delta" to get the weather for at Chicago O\'Hare airport.';
        var repromptText = "Say a major US city name or a three or four letter airport identifier.";
        response.ask(speechOutput, repromptText);
};

airport_wx_app.prototype.eventHandlers.onSessionEnded =
    function (sessionEndedRequest, session) {
        logBasic('onSessionEnded',session);
};


var help_text =
"The airport weather skill lets you hear airport me-tars red aloud " +
"as if they were ATIS reports. It works by city name or by three or " +
"four letter airport identifier. You can say get Oakland or get juliet " +
"foxtrot kilo.";

function metarById(sr, session, response) {
    if (sr.valid) {
        var ctx = {
            session: session,
            response_object : response,
            letters : sr.letters,
        };
        // console.log(ctx.letters);
        metar.getCached(ctx, metar.processResult);
    } else {
        var was_city    = sr.mode == 'city';
        var was_default = sr.mode == 'default_airport';
         var ask = '';
         if (was_city) {
             if (sr.orig && (sr.orig !== 'none provided')) {
                 ask = "I could not find the city " + sr.orig +
	                   " in my database. If you are sure it's correct, " +
	                   " please contact the author " +
	                   " and suggest he add it.";
             } else {
                 ask = "It looks like you didn't name a city for me to look up. ";
             }
         } else if (was_default) {
             ask = "The default airport has not been set. Complete " +
	               " a request first by identifier or city name, then " +
	               " say \"set default\" to set the default airport.";
         } else {
             ask = "I couldn't make sense of your request. I heard " +
	         sr.orig.join(' ');
         }
         repromptText =
            'Please try again. Say: get, followed by a US city name or ' +
            'three or four letter identifier using the eye-kay-oh phonetic ' +
            'alphabet.';
         ask += ' '  + repromptText;
         response.ask(ask,repromptText);
    }
}

function joinWithAnd(a) {
    if (a.length > 1) {
        return a.slice(0,a.length-2).join(' , ') + ' and ' + a[a.length-1];
    } else if (a.length > 0) {
        return a[0];
    } else {
        return '';
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
            'legal': ['millibar', 'millibars', 'hectopascal','inches'],
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
        logBasic('AMAZON.HelpIntent',session);
        response.tellNoEnd(help_text);
    },
    "AMAZON.StopIntent": function(intent, session, response) {
        logBasic('AMAZON.StopIntent',session);
        response.tell('stopping. goodbye');
    },
    "AMAZON.CancelIntent": function(intent, session, response) {
        logBasic('AMAZON.CancelIntent',session);
        response.tell('canceling. goodbye');
    },

    // The "main" intents for getting the weather
    metarThree: function(intent, session, response) {
        logBasic('metarThree',session);
        metarById(metar.validateSlots(intent.slots),session,response);
    },
    metarFour: function(intent, session, response) {
        logBasic('metarFour',session);
        metarById(metar.validateSlots(intent.slots),session,response);
    },
    metarCity: function(intent, session, response) {
        logBasic('metarCity',session);
        metarById(metar.validateCity(intent.slots),session,response);
    },
    metarDeflt: function(intent, session, response) {
        logBasic('metarDeflt',session);
        metarById(metar.validateDefaultAirport(session.user_info),session,response);
    },


    // a simple intent for getting the time in zulu
    getTime: function(intent, session, response) {
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
        logBasic('setAirport',session);
        var last_airport = session.user_info.stats.last_airport;
        if (util.definedHasLength(last_airport)) {
            session.user_info.preferences.default_airport = last_airport;
	        console.log('__SET_AIRPORT_SAVING__');
	        console.log(session.user);
	        console.log(session.user_info);
            pdb.setUserInfo(session.user.userId,session.user_info,function() {
                var rstring = 'I set your default airport set to ';
                last_airport.split('').forEach(function(l) {
                    rstring += l + ' ';
                });
                response.tell(rstring);
	       });
        } else {
            response.tell('the previous query did not succeed. Query an ' +
                'airport first, then say "set default airport" ');
        }
    },


    setRepeat: function(intent,session,response) {
        logBasic('setRepeat',session);
        var repeat_count = 1;
        try {
            repeat_count = parseInt(intent.slots.repeat_count.value);
        } catch (e) {
        }
        if ((repeat_count < 1) ||
            (repeat_count > 10)) {
            var rstring = 'The supported range for repeat counts is from one' +
                ' to ten, inclusive. Try again with a value in that range.';
            response.tell(rstring);
        } else {
            session.user_info.preferences.repeat = repeat_count;
            pdb.setUserInfo(session.user.userId,session.user_info,function() {
                var rstring = 'I set your repeat count to ';
                rstring += repeat_count.toString() + ' ';
                response.tell(rstring);
            });
        }
    },

    // preference setters
    setDistUnit: function(intent,session,response) {
        prefSetter('dist',intent,session,pdb,response);
    },
    setPressUnit: function(intent,session,response) {
        prefSetter('press',intent,session,pdb,response);
    },
    setWindRef: function(intent,session,response) {
        prefSetter('wdir',intent,session,pdb,response);
    },
    setTempUnit: function(intent,session,response) {
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
        console.log("-d- saying        : " + JSON.stringify(a));
        if (util.definedNonNull(b)) {
            console.log("-d- card title    : " + b);
        }
        if (util.definedNonNull(c)) {
            console.log("-d- card contents : " + c);
        }
    };

    var test_ctx = {
        session: {
            user: {
                userId: 'bob',
            },
            user_info: {
                preferences: {
                    default_airport: 'KLAX',
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
        var sr = metar.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            metar.getCached(test_ctx, metar.processResult);
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
        var sr = metar.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            metar.getCached(test_ctx, metar.processResult);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

    if (1) {
        var slots = {
            city: { value: 'houston' },
        };
        var sr    = metar.validateCity(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            metar.getCached(test_ctx, metar.processResult);
        }
    }


    if (1) {
        var sr    = metar.validateDefaultAirport(test_ctx.session.user_info);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            metar.getCached(test_ctx, metar.processResult);
        }
    }

    if (1) {
        var slots = {
            sa: { value: 'k' },
            sb: { value: 's'} ,
            sc: { value: 'b' },
            sd: { value: 'n' },
        };
        var sr = metar.validateSlots(slots);
        test_ctx.letters = sr.letters;
        if (sr.valid) {
            metar.getCached(test_ctx, metar.processResult);
        } else {
            console.log('uh-oh');
            console.log(sr);
        }
    }

}

