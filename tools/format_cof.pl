#!/usr/bin/perl -w

use strict;
use warnings qw(all);

my $fn = 'WMM2015COF/WMM.COF';
my $fh = undef;
open($fh,'<:utf8',$fn);

while (<$fh>) {
 my $l = $_; chomp $l;

 $l =~ s/(\d) /$1,/g;
 print '"' . $l . '",' . "\n";
};


