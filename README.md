# use it live

This skill is live on Amazon right now. (as of 6/2016). It is called
"Dave's Airport METAR Reader" and is free. It may be slightly behind
this repo at any given time.

# alexa_metar

This is a node.js implementation of a simple Alexa / Echo app designed to deploy on Lambda,
though you could adjust it to run anywhere.

It hits the Aviation Digital Data Service (ADDS) to fetch METARs (that's weather reports)
from various airports, then reads the result aloud in the format that a pilot would here
if he were listening on ATIS. 

It can also read TAFS (terminal forecasts) in a format that seems appropriate
for Alexa. There is no official verbal format for TAFS to mimic, since they
are strictly a printed weather product.

## ATIS vs METAR

METAR == METeorological Report

ATIS  == Automatic Terminal Information Service

METAR is an airport (or other weather station) weather report in a very concise format,
intended to be printed and read on the ground.

ATIS is broadcast over the radio and intended for pilots to listen to in the air.

The information in an ATIS broadcast is similar to -- but not exactly the same -- as 
in a METAR. In particular, the phrasing and formatting are totally different, the 
reference for wind direction is different (magnetic vs true north), and the total
amount of information may be different. A METAR might have some fields that are not
normally present in an ATIS report (such as fraction temperatures) and an ATIS report
often includes non-weather related airport information.

## TAF printed vs TAF read aloud

TAFS are generally not read aloud, so this app has no particular format
to mimic. In general, the phraseology is like that for ATIS, except there
will be no temperature (not included in TAFs) and each section of the 
TAF will be preceded by a from-to period that the forecast covers. Also,
the beginning of the TAF specifies the entire duration of the forecast.

## What the program does

- fetches the METAR based on spelling out the ICAO code or using a city 
  name
- converts it, to the degree possible, to sound as it would being read 
  aloud in ATIS
- returns that as a 'tell' command for Alexa

## extra features

- If you fly in Europe, you might want your report in kilometers and millibars.

"Alexa, ask airport weather to set visibility to kilometers."
"Alexa, ask airport weather to set altimeter to millibars."
"Alexa, ask airport weather to set temperature to Fahrenheit."

- If you want the wind direction in the metar without a correction for
magnetic variation:

"Alexa, ask airport weather to set wind reference to true."

