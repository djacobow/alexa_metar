
// App ID for the skill
var APP_ID = 'amzn1.echo-sdk-ams.app.74a477b4-fe89-452d-8aa2-9cb6d89391ff'; // new -- me
// var APP_ID = 'amzn1.echo-sdk-ams.app.9e6999ca-44ba-40cc-99cb-0ea73e96bfca'; // old -- lbl

var AlexaSkill = require('./AlexaSkill'); // The AlexaSkill prototype and helpers
var metar      = require('./adds_metar')  // aviation METARs

// open_apps is a child of AlexaSkill, overrides various methods
var open_apps = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
open_apps.prototype = Object.create(AlexaSkill.prototype);
open_apps.prototype.constructor = open_apps;

open_apps.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("-i- open_apps onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

open_apps.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("-i- open_apps onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the LBL App.";
    // var repromptText = "Ask \"what's for breakfast Thursday?\" or \"Look up Samantha Bee.\"";
    response.ask(speechOutput /* , repromptText */);
};

open_apps.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("-i- open_apps onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};


var help_text = "The LBL Alexa Skill lets you access some commonly-used public data at the lab. You can say \"What's for lunch?\" or \"lookup Paul Alivisatos\" or \"What is our network usage?\" or \"What is the beam status?\" We are always looking for more useful things for the app to do. Be sure to let I T know if you have a good idea!";

open_apps.prototype.intentHandlers = {

    "AMAZON.HelpIntent": function(intent, session, response) {
       response.tell(help_text);
    },

    app_HelpIntent: function (intent, session, response) {
        response.tell(help_text);
    },

    adds_metarIntentThree: function(intent, session, response) {
        var ctx = {
         'response_object' : response,
         'letters' : [
		 metar.wordToLetter(intent.slots.sa.value),
		 metar.wordToLetter(intent.slots.sb.value),
		 metar.wordToLetter(intent.slots.sc.value),
         ]
        }
        metar.getJSON(ctx, metar.processResult);
    },
    adds_metarIntentFour: function(intent, session, response) {
        var ctx = {
         'response_object' : response,
         'letters' : [
		 metar.wordToLetter(intent.slots.sa.value),
		 metar.wordToLetter(intent.slots.sb.value),
		 metar.wordToLetter(intent.slots.sc.value),
		 metar.wordToLetter(intent.slots.sd.value),
         ]
        }
        metar.getJSON(ctx, metar.processResult);
    },
    adds_metarIntentName: function(intent, session, response) {
        var  n    = intent.slots.bob.value;
        var lu    = metar.findByName(n);
        if (lu.ok) {
         var ctx = {
          'response_object' : response,
          'letters' : lu.letters
         }
         metar.getJSON(ctx, metar.processResult);
        } else {
         var r = "could not find: " + n;
         response.tellWithCard(r,"Not found",n);
	}
    }
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
    if (typeof b !== 'undefined') {
      console.log("-d- card title    : " + b);
    }
    if (typeof c !== 'undefined') {
      console.log("-d- card contents : " + c);
    }
};

if (0) {
 var fake_ctx = {
  'response_object': {
   'tellWithCard': dummyTellWithCard
  },
  letters: [ metar.wordToLetter('sierra'),
             metar.wordToLetter('echo'),
	     metar.wordToLetter('alpha') ]
 };
 metar.getJSON(fake_ctx, metar.processResult);
}

if (0) {
 var  n    = 'houston';
 var lu    = metar.findByName(n);
 if (lu.ok) {
  var fake_ctx = {
   'response_object' : {
    'tellWithCard': dummyTellWithCard
   },
   'letters' : lu.letters
  };
  metar.getJSON(fake_ctx, metar.processResult);
 }
}

