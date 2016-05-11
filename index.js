
// App ID for the skill
var APP_ID = 'amzn1.echo-sdk-ams.app.74a477b4-fe89-452d-8aa2-9cb6d89391ff'; // new -- me

var AlexaSkill = require('./AlexaSkill'); // The AlexaSkill prototype and helpers
var metar      = require('./adds_metar')  // aviation METARs
var pdb        = require('./prefs'); // saving user preferences
var util       = require('./dutil');
// open_apps is a child of AlexaSkill, overrides various methods
var open_apps = function () {
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
open_apps.prototype = Object.create(AlexaSkill.prototype);
open_apps.prototype.constructor = open_apps;

open_apps.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
 logBasic('onSessionStarted',session);
};

open_apps.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
 logBasic('onLaunch',session);
 var speechOutput = "Welcome to the mee-tar reader app. I will read you airport weathr reports. You can say get San Francisco to get San Fancisco airport's weather, or get kilo oscar romeo delta, to get the weather for Chicago O'Hare."
 var repromptText = "Say something like get Cincinnati or get kilo oscar alpha kilo";
 response.ask(speechOutput, repromptText);
};

open_apps.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
 logBasic('onSessionEnded',session);
};


var help_text = "\
The me-tar reader skill lets you hear airport me-tar read aloud \
as if they were ATIS reports. It works by city name or by three or four letter \
airport identifier. You can say get Oakland or get juliet foxtrot kilo. You can  \
also set a default airport. First request an airport by city or identifier. Then, \
say \"set default\". Alexa will remember your default airport and from that  \
point forward, you can just say \"get\" or \"get mee-tar\". \
";

function metarById(sr, session, response) {
 if (sr.valid) {
  var ctx = {
   session: session,
   response_object : response,
   letters : sr.letters,
  };
  console.log(ctx.letters);
  metar.getJSON(ctx, metar.processResult);
 } else {
  var was_city    = sr.mode == 'city';
  var was_default = sr.mode == 'default_airport';

  var ask = ''
  if (was_city) {
   ask = "I could not find the city " + sr.orig +
	   " in my database. If you are sure it's correct, " +
	   " please contact the author " +
	   " and suggest he add it.";
  } else if (was_default) {
   ask = "The default airport has not been set. Complete " +
	   " a request first by identifier or city name, then " +
	   " say \"set default\" to set the default airport.";
  } else {
   ask = "I couldn't make sense of your request. I heard " +
	    sr.orig.join(' ');
  }
  repromptText = 'Please try again. Say "get" followed by a US city name or ' +
         'three or four letter indentifier using eye-kay-oh phonetics.';
  ask += repromptText;

  response.ask(ask,repromptText);
 }
};


open_apps.prototype.intentHandlers = {

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

    getTime: function(intent, session, response) {
      var now = new Date();
      var r = 'The time is now ' + 
	      util.numberToZeroPaddedString(now.getUTCHours(),2) + 
	      ' ' + 
	      util.numberToZeroPaddedString(now.getUTCMinutes(),2) +
	      ' zulu'; 
      // var r   = 'The time is now ' + util.timeToDigits(now).join(' ') + ' zulu';
      response.tell(r);
    },

    setAirport: function(intent, session, response) {
      logBasic('setAirport',session);
      var last_airport = session.user_info.stats.last_airport;
      if (util.definedHasLength(last_airport)) {
        session.user_info.preferences.default_airport = last_airport;
	console.log('__SET_AIRPORT_SAVING__');
	console.log(session.user);
	console.log(session.user_info);
        pdb.setUserInfo(session.user.userId,session.user_info,function(){
         response.tell('default airport set to ' + last_airport);
	});
      } else {
        response.tell('the previous query did not succeed. Query an airport first, then say"set default airport"');
      }
    },

    setWindRef: function(intent,session,response) {
      logBasic('setWindRef',session);
      var desired = intent.slots.ref.value;
      console.log('-d- new wind ref: ' + desired);
      session.user_info.preferences.wind_reference = desired;
      pdb.setUserInfo(session.user.userId,session.user_info,function(){
       response.tell('saved wind direction preference to ' + desired);
      });
    },
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the open_apps skill.
    var apps = new open_apps();
    apps.execute(event, context);
};


// -------------- for testing ----------------
// for testing locallly
var dummyTellWithCard = function(a,b,c) {
    console.log("-d- saying        : " + a);
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


if (0) {
      var now = new Date();
      var r = 'The time is now ' + 
	      util.numberToZeroPaddedString(now.getUTCHours(),2) + 
	      ' ' + 
	      util.numberToZeroPaddedString(now.getUTCMinutes(),2) +
	      ' zulu'; 
      // var r   = 'The time is now ' + util.timeToDigits(now).join(' ') + ' zulu';
      console.log(r);
}


if (0) {
  var slots = {
   sa: { value: 'e' },
   sb: { value: 'w'} ,
   sc: { value: 'r' },
  };
  var sr = metar.validateSlots(slots);
  test_ctx.letters = sr.letters;
  if (sr.valid) {
   metar.getJSON(test_ctx, metar.processResult);
  } else {
   console.log('uh-oh');
   console.log(sr);
  }
}


if (0) {
 var slots = {
  city: { value: 'houston' },
 };
 var sr    = metar.validateCity(slots);
 test_ctx.letters = sr.letters;
 if (sr.valid) {
  metar.getJSON(test_ctx, metar.processResult);
 }
}

if (0) {
 var sr    = metar.validateDefaultAirport(test_ctx.session.user_info);
 test_ctx.letters = sr.letters;
 if (sr.valid) {
  metar.getJSON(test_ctx, metar.processResult);
 }
}

