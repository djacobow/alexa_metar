"use strict";

function defined(x) { 
 return typeof(x) !== 'undefined' 
};

function definedNonNull(x) {
 return(
  (typeof x !== 'undefined') && 
  (x !== null)
 );
};

function definedHasLength(x) {
 return(
  (typeof x !== 'undefined') && 
  (x !== null) &&
  x.length
 );
};

function stringIs(str,compare) {
 return (
         (typeof str !== 'undefined') && 
         str && 
	 (str !== '') && 
	 str.length && 
	 (str == compare)
	);

}

function timeToDigits(now) {
 var hours   = now.getUTCHours();
 var minutes = now.getUTCMinutes();
 var ha = numberToZeroPaddedArray(hours,2);
 var ma = numberToZeroPaddedArray(minutes,2);
 return [ ha[0], ha[1], ma[0], ma[1] ];
};

function numberToZeroPaddedString(num,len) {
 num = Math.floor(num);
 var ns = num.toString();
 while (ns.length < len) {
  ns = '0' + ns;
 }
 return ns;
}

function numberToZeroPaddedArray(num,len) {
 return numberToZeroPaddedString(num,len).split('');
}


module.exports = {
 defined: defined,
 definedHasLength: definedHasLength,
 definedNonNull: definedNonNull,
 stringIs: stringIs,
 timeToDigits: timeToDigits,
 numberToZeroPaddedArray: numberToZeroPaddedArray,
 numberToZeroPaddedString: numberToZeroPaddedString,
}

