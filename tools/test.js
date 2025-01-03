var WorldMagModel = require('./WorldMagneticModel');
var wmm = new WorldMagModel;
var sta = require('./stations.js');

var oak = sta['KEWR'];
console.log(oak);

var now   = new Date();
var start = new Date("January 1, 2015 00:00:00 GMT");
var diff_millis = now - start;
var diff_years  = diff_millis / (1000*60*60*24*365.25);
var yr = 2015 + diff_years;

console.log(wmm.declination(oak.elev,oak.lat,oak.lon,yr));

