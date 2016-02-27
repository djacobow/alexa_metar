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

module.exports = {
 defined: defined,
 definedHasLength: definedHasLength,
 definedNonNull: definedNonNull,
 stringIs: stringIs,
}

