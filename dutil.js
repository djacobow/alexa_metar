/*jshint node:true */
/*jshint -W097 */
"use strict";

function defined(x) {
    return typeof(x) !== 'undefined';
}

function definedNonNull(x) {
    return(
        (typeof x !== 'undefined') &&
        (x !== null)
    );
}

function definedNonNullTrue(x) {
    return(
        (typeof x !== 'undefined') &&
        (x !== null) &&
        (x)
    );
}

function definedHasLength(x) {
    return(
        (typeof x !== 'undefined') &&
        (x !== null) &&
        x.length
    );
}

function stringIsIgnoreCase(str,compare) {
    return (
        (typeof str !== 'undefined') &&
        str &&
	    (str !== '') &&
	    str.length &&
	    (str.toLowerCase() == compare.toLowerCase())
    );
}

function stringInIgnoreCase(str, ary) {
 if (!str) return false;
 if (str === undefined) return false;
 if (!ary.length) return false;
 var lcstr = str.toLowerCase();
 for (var i=0; i<ary.length; i++) {
  if (ary[i].toLowerCase() == lcstr) return true;
 }
 return false;
}

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
}

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

module.exports = {
    defined:                  defined,
    definedHasLength:         definedHasLength,
    definedNonNull:           definedNonNull,
    definedNonNullTrue:       definedNonNullTrue,
    stringIs:                 stringIs,
    stringIsIgnoreCase:       stringIsIgnoreCase,
    stringInIgnoreCase:       stringInIgnoreCase,
    timeToDigits:             timeToDigits,
    numberToZeroPaddedArray:  numberToZeroPaddedArray,
    numberToZeroPaddedString: numberToZeroPaddedString,
    phonetics:                phonetics,
};

