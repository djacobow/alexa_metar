"use strict";

var pause_med = '<break strength="medium"/>';

var names = {
 'atlanta'           : 'KATL',
 'los angeles'       : 'KLAX',
 'o\'hare'           : 'KORD',
 'dallas fort worth' : 'KDFW',
 'new york'          : 'KJFK',
 'san francisco'     : 'KSFO',
 'charlotte'         : 'KDEN',
 'las vegas'         : 'KLAS',
 'vegas'             : 'KLAS',
 'phoenix'           : 'KPHX',
 'houston'           : 'KIAH',
 'seattle'           : 'KSEA',
 'newark'            : 'KEWR',
 'orlando'           : 'KMCO',
 'minneapolis'       : 'KMSP',
 'detroit'           : 'KDTW',
 'boston'            : 'KBOS',
 'laguardia'         : 'KLGA',
 'fort lauderdale'   : 'KFLL',
 'baltimore'         : 'KBWI',
 'dulles'            : 'KIAD',
 'midway'            : 'KMDW',
 'salt lake city'    : 'KSLC',
 'national'          : 'KDCA',
 'reagan'            : 'KDCA',
 'honolulu'          : 'KHNL',
 'san diego'         : 'KSAN',
 'portland'          : 'KPDX',
 'lambert'           : 'KSTL',
 'st louis'          : 'KSTL',
 'hobby'             : 'KHOU',
 'nashville'         : 'KBNA',
 'austin'            : 'KAUS',
 'oakland'           : 'KOAK',
 'kansas city'       : 'KMCI',
 'new orleans'       : 'KMSY',
 'raleigh-durham'    : 'KRDU',
 'san jose'          : 'KSJC',
 'john wayne'        : 'KSNA',
 'love'              : 'KDAL',
 'dallas'            : 'KDAL',
 'sacramento'        : 'KSMF',
 'san antonio'       : 'KSAT',
 'pittsburgh'        : 'KPIT',
 'cleveland'         : 'KCLE',
 'indianapolis'      : 'KIND',
 'milwaukee'         : 'KMKE',
 'columbus'          : 'KCMH',
 'kahului'           : 'PHOG',
 'palm beach'        : 'KPBI',
 'hartford'          : 'KBDL',
 'cincinnati'        : 'KCVG',
 'jacksonville'      : 'KJAX',
 'anchorage'         : 'KANC',
 'buffalo'           : 'KBUF',
 'albuquerque'       : 'KABQ',
 'ontario'           : 'KONT',
 'omaha'             : 'KOMA',
 'burbank'           : 'KBUR',
 'palo alto'         : 'KPAO',
 'south lake tahoe'  : 'KTVL',
};

var phonetics = {
 'alpha': 'a',
 'bravo': 'b',
 'charlie': 'c',
 'delta': 'd',
 'echo': 'e',
 'foxtrot': 'f',
 'golf': 'g',
 'hotel': 'h',
 'india': 'i',
 'juliet': 'j',
 'kilo': 'k',
 'lima': 'l',
 'mike': 'm',
 'november': 'n',
 'oscar': 'o',
 'papa': 'p',
 'quebec': 'q',
 'romeo': 'r',
 'sierra': 's',
 'tango': 't',
 'uniform': 'u',
 'victor': 'v',
 'whiskey': 'w',
 'x-ray': 'x',
 'yankee': 'y',
 'zulu': 'z',
 'zero': '0',
 'one': '1',
 'two': '2',
 'three': '3',
 'tree': '3',
 'four': '4',
 'five': '5',
 'fife': '5',
 'six': '6',
 'seven': '7',
 'eight': '8',
 'nine': '9',
 'niner': '9',
};

var AlexaSkill    = require('./AlexaSkill'); // The AlexaSkill prototype and helpers
var https         = require('https');
var xml2js        = require('xml2js');
var WorldMagModel = require('./WorldMagneticModel')
var wmm           = new WorldMagModel;
var stations      = require('./stations.js');

var nowToMagYear = function() {
 var now = new Date();
 var start = new Date("January 1, 2015 00:00:00 GMT");
 return (2015 + (now - start) / (1000*60*60*24*365.25));
}

var wordToLetter = function(word) {
 word = word.toLowerCase();
 var v = null;
 if (phonetics[word]) {
  v = phonetics[word].toUpperCase();
 }
 return v;
};


var getJSON = function(cbctx, cb) {

 var letters      = cbctx.letters;

 var id           = '';
 if (letters.length < 4) {
  id = 'K';
 }
 id += letters.join('');

 var url = 'https://www.aviationweather.gov/adds/dataserver_current/httpparam' +
	   '?dataSource=metars' +
	   '&requestType=retrieve' +
	   '&format=xml' +
	   '&hoursBeforeNow=3' +
	   '&mostRecent=true' +
	   '&stationString=' + id;

 console.log('-d- url: ' + url);
 var req = https.get(url, function(res) {
  var body = '';
  res.on('data', function(data) {
   body += data;
  });
  res.on('end', function() {
   var xmlparser = new xml2js.Parser();
   if (body && body.length) {
    try {
     xmlparser.parseString(body,function(err,result) {
       if (err) {
         console.log('-err- : ' + err);
         cb(cbctx,{});
       } else {
         return cb(cbctx,result);
       }
     });
    }
    catch(e) {
     console.log('-caught err- : ' + e);
     return cb(cbctx,{});
    }
   }
  });
 }).on('error', function(e){
  console.log('-err- : ' + e);
 });
 req.setTimeout(5000, function() {
  console.log('-err- :  request timed out'); 
  var msg = 'Query from a d d s is taking too long. Try again later.';
  cbctx.response_object.tellWithCard(msg,"query taking Too long",msg);
  return;
 });
}

function radioify(blobs) {
 var new_blobs = [];
 blobs.forEach(function(blob) {
  var nb = blob;
  switch (blob) {
   case '9': nb = 'niner'; break;
   case '5': nb = 'fife'; break;
   case '3': nb = 'tree'; break;
   case '4': nb = 'fow-er'; break;
   default: break;
  }
  new_blobs.push(nb);
 });
 return new_blobs;
};

function metar2text(metar) {
 var text = '';
 var blobs = [];
 blobs.push('<speak>');
 console.log(metar);
 var sta_dat = null;
 if (defined(metar.station_id)) {
  sta_dat = stations[metar.station_id];

  if (sta_dat.name) {
   var n = sta_dat.name.replace('intnl','international');
   n = n.replace('intl','international');
   n = n.replace('/',' ');
   blobs.push(n);
  } else {
   var id      = "" + metar.station_id;
   blobs.push.apply(blobs,id.split(''));
  }
  blobs.push('airport');
  blobs.push(pause_med);
 }

 if (defined(metar.quality_control_flags)) {
  var cc = metar.quality_control_flags[0];
  if (defined(cc) && defined(cc.auto_station)) {
   if (cc.auto_station[0] == 'TRUE') {
    blobs.push('automated');
   }
  }
  console.log(cc)
 }
 blobs.push('weather observation');
 if (defined(metar.observation_time)) {
   var otime = new Date(metar.observation_time);
   var hours = otime.getUTCHours();
   var minutes = otime.getUTCMinutes();
   blobs.push(hours.toString());
   blobs.push(minutes.toString());
   blobs.push('zulu');
   blobs.push(pause_med);
 }

 if (defined(metar.visibility_statute_mi)) {
  blobs.push('visibility');
  blobs.push(Math.floor(parseFloat(metar.visibility_statute_mi) + 0.5).toString());
   blobs.push(pause_med);
 }

 if (defined(metar.wind_dir_degrees) && defined(metar.wind_speed_kt)) {
   blobs.push('wind');
   var wind_dir_true = parseFloat(metar.wind_dir_degrees[0]);

   var mag_var = 0;
   if (sta_dat) {
    mag_var = wmm.declination(sta_dat.elev,sta_dat.lat,sta_dat.lon,
		    nowToMagYear());
    console.log("mag var: " + mag_var);
   } else {
    console.log('warn: did not calculate mag var; wind is true');
   }

   var wind_speed_int = parseInt(metar.wind_speed_kt[0]);
   if (wind_speed_int == 0) {
    blobs.push('calm');
   } else {
    var wind_dir_mag  = wind_dir_true + mag_var;
    while (wind_dir_mag < 0)   wind_dir_mag += 360;
    while (wind_dir_mag > 360) wind_dir_mag -= 360;
    var wind_dir_int = Math.floor(wind_dir_mag + 0.5);
    if (wind_dir_int < 10) {
      blobs.push('0');
    }
    if (wind_dir_int < 100) {
      blobs.push('0');
    };
    blobs.push.apply(blobs,wind_dir_int.toString().split(''));
    blobs.push('at');
    blobs.push(metar.wind_speed_kt[0]);
    if (metar.wind_gust_kt) {
     blobs.push('gusting');
     blobs.push(metar.wind_gust_kt[0]);
    }
   }
   blobs.push(pause_med);
 }

 if (defined(metar.wx_string)) {
   var wx = metar.wx_string.toString();
   var vicinity = false;
   if (wx.match(/^-/)) { blobs.push('light'); };
   if (wx.match(/^\+/)) { blobs.push('heavy'); };
   if (wx.match(/VC/)) { vicinity = true; };
   if (wx.match(/MI/)) { blobs.push('shallow'); };
   if (wx.match(/PR/)) { blobs.push('partial'); };
   if (wx.match(/BC/)) { blobs.push('patches'); };
   if (wx.match(/DR/)) { blobs.push('drifting'); };
   if (wx.match(/BL/)) { blobs.push('blowing'); };
   if (wx.match(/SH/)) { blobs.push('showers'); };
   if (wx.match(/TS/)) { blobs.push('thunderstorm'); };
   if (wx.match(/FZ/)) { blobs.push('freezing'); };

   if (wx.match(/DZ/)) { blobs.push('drizzle'); };
   if (wx.match(/RA/)) { blobs.push('rain'); };
   if (wx.match(/SN/)) { blobs.push('snow'); };
   if (wx.match(/SG/)) { blobs.push('snow grains'); };
   if (wx.match(/IC/)) { blobs.push('ice crystals'); };
   if (wx.match(/PL/)) { blobs.push('ice pellets'); };
   if (wx.match(/GR/)) { blobs.push('hail'); };
   if (wx.match(/GS/)) { blobs.push('small hail'); };
   if (wx.match(/UP/)) { blobs.push('unknown precipitation'); };

   if (wx.match(/BR/)) { blobs.push('mist'); };
   if (wx.match(/FG/)) { blobs.push('fog'); };
   if (wx.match(/FU/)) { blobs.push('smoke'); };
   if (wx.match(/VA/)) { blobs.push('volcanic ash'); };
   if (wx.match(/DU/)) { blobs.push('widepread dust'); };
   if (wx.match(/SA/)) { blobs.push('sand'); };
   if (wx.match(/HZ/)) { blobs.push('haze'); };
   if (wx.match(/PY/)) { blobs.push('spray'); };

   if (wx.match(/PO/)) { blobs.push('well developed dust swirls'); };
   if (wx.match(/SQ/)) { blobs.push('squalls'); };
   if (wx.match(/FC/)) { blobs.push('funnel cloud'); };
   if (wx.match(/SS/)) { blobs.push('sand storm'); };
   if (wx.match(/DS/)) { blobs.push('dust storm'); };

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
   blobs.push(pause_med);
 }

 if (defined(metar.sky_condition)) {
  blobs.push('sky condition');
  metar.sky_condition.forEach(function(layer) {
    var layer_type_short = layer['$'].sky_cover;
    var layer_base = layer['$'].cloud_base_ft_agl;
    var layer_type = layer_type_short == 'CLR' ? 'clear' :
	             layer_type_short == 'FEW' ? 'few clouds' :
	             layer_type_short == 'SCT' ? 'scattered' :
		     layer_type_short == 'BKN' ? 'broken' :
		     layer_type_short == 'OVC' ? 'overcast' : '';
    blobs.push(layer_type);
    if ((layer_type != 'clear') && (layer_type.length)) {
      blobs.push(layer_base);
      blobs.push(pause_med);
    }
  });
 }

 if (defined(metar.temp_c)) {
    blobs.push('temperature');
    blobs.push(Math.floor(parseFloat(metar.temp_c) + 0.5).toString());
    blobs.push(pause_med);
 }
 if (defined(metar.dewpoint_c)) {
    blobs.push('dewpoint');
    blobs.push(Math.floor(parseFloat(metar.dewpoint_c) + 0.5).toString());
    blobs.push(pause_med);
 }

 if (defined(metar.altim_in_hg)) {
   var altim = Math.floor(0.5 + 100 * parseFloat(metar.altim_in_hg));
   var altim_digits = altim.toString().split('');
   blobs.push('altimeter');
   altim_digits.forEach(function(digit) { blobs.push(digit); });
   blobs.push(pause_med);
 }
 blobs.push('</speak>');

 return blobs;
};

function defined(x) { return typeof(x) !== 'undefined' };

function processResult(cbctx, data) {
 var metar = null;
 if (data.response && data.response.data[0] && data.response.data[0].METAR) {
  metar = data.response.data[0].METAR[0];
 }
 if (defined(metar) && (metar !== null)) {
  var chunks = metar2text(metar);
  chunks     = radioify(chunks);
  console.log(chunks);
  var to_say = chunks.join(' ');
  cbctx.response_object.tellWithCard({type: 'SSML', speech: to_say},
		  "METAR for " + metar.station_id,
		  metar.raw_text[0]);
 } else {
  cbctx.response_object.tellWithCard("Empty response","METAR info","Empty response");
 }
}

var findByName = function(name) {
 name = name.toLowerCase();
 if (names[name]) {
  return { ok: true, letters: names[name].split('') };
 }
 return { ok: false, letters: [] };
};

module.exports = {
 getJSON: getJSON,
 processResult: processResult,
 wordToLetter: wordToLetter,
 findByName: findByName,
};



