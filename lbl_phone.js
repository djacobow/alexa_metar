var AlexaSkill = require('./AlexaSkill'); // The AlexaSkill prototype and helpers
var http       = require('http');

var myrand6 = function() {
 var n6 = 1 + Math.floor(Math.random() * 6);
 return n6.toString();
};

var getJsonFromLookup = function(cbctx, callback){
  var url_base = "http://phonebook.lbl.gov/api/v1/search/people/";
  var q_encoded = encodeURIComponent(cbctx.query);
  http.get(url_base + q_encoded, function(res){
    var body = '';
    res.on('data', function(data){
      body += data;
    });
    res.on('end', function(){
      var result = JSON.parse(body);
      callback(cbctx,result);
    });

  }).on('error', function(e){
    console.log('Error: ' + e);
  });
};


var parseResult = function(cbctx,data) {
 var rcount = data.result_count;
 var resp = "blank resp";
 if ((null ==  data) || (null == rcount)) {
  resp = "There was a problem with the query. Please try again later.";
 } else if (rcount == 0) {
  resp = "It looks like no results matched " + cbctx.query + ".";
 } else if (rcount == 1) {
  var first = data.results[0];
  resp  = "Here you go: ";
  resp += first.name + ". primary phone: " + first.pphone +
         ". office location: " + first.ploc + ". email: " + first.mail + ".";
 } else if (rcount <= 5) {
  resp = "Your query returned " + rcount.toString() + " results. Here are their names: ";
  for (var i=0;i<rcount;i++) {
   resp += data.results[i].name;
   if (i < (rcount-1)) { resp += ", "; };
  }
 } else if (rcount > 5) {
  resp = "Your query returned " + rcount.toString() + " results. Try narrowing it further.";
 }
 cbctx.response_object.tellWithCard(resp,"phonebook",resp);
};


module.exports = {
 'getJsonFromLookup' : getJsonFromLookup,
 'parseResult'       : parseResult,
 'myrand6'           : myrand6
};


