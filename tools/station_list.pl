#!/usr/bin/perl -w

use strict;
use warnings qw(all);
use Data::Dumper;
use Scalar::Util qw(looks_like_number);

use LWP::UserAgent;

my $cfg = {
 raw_fname => 'raw_stations.txt',
 js_fname => 'stations.js',
 stations_url => 'https://www.aviationweather.gov/docs/metar/stations.txt',
 fetch => 0,
 format => {
  country => [ 81, 82 ],
  name => [ 3, 19 ],
  icao => [ 20, 23 ],
  iata => [ 26, 29],
  lat  => [ 39, 44],
  lon  => [ 47, 53],
  elev => [ 55, 58 ],
  metar => [ 62, 62],
 }
};



my $ds = load_data();
my $parsed = process($ds);
dumpjs($parsed);


sub dumpjs {
 my $data = shift;

 my $ofh;
 open $ofh, '>', $cfg->{js_fname};

 print $ofh "var station_data = {\n";

 foreach my $name (keys %$data) {
  if ($data->{$name}{metar} eq 'X') {
   print $ofh " '$name': {\n";

   foreach my $k (keys %{$data->{$name}}) {
    print $ofh "  '$k': ";
    my $v = $data->{$name}{$k};
    if (looks_like_number($v) && !($v =~ /^INF/)) {
     print $ofh "$v,\n";
    } else {
     $v =~ s/'/\\'/g;
     print $ofh "'$v',\n";
    }
   }
   print $ofh " },\n";
  }
 }

 print $ofh "};\n";
 print $ofh "\nmodule.exports = station_data;\n";


 close $ofh;

};


sub process {
 my $ds = shift;
 my @lines = split(/\n/,$ds);
 my $res = {};
 foreach my $line (@lines) {
  chomp $line;
  my $parsed = get_fields($line);
  if (defined($parsed->{country}) && ($parsed->{country} =~ /\w{2}/)) {
   fixup_fields($parsed);
   $res->{$parsed->{icao}} = $parsed;
  }
 }
 return $res;
};


sub fixup_fields {
 my $p = shift;

 $p->{name} = lc($p->{name});
 $p->{name} =~ s/^\s+//; 
 $p->{name} =~ s/\s+$//; 

 my $l = $p->{lat};
 if ($l =~ /(\d+)\s(\d+)(N|S)/) {
  my $deg = $1;
  my $min = $2;
  my $dir = $3;
  my $v = $deg + $min / 60;
  if ($dir eq 'S') { $v *= -1; }
  $p->{lat} = $v;
 }

 $l = $p->{lon};
 if ($l =~ /(\d+)\s(\d+)(E|W)/) {
  my $deg = $1;
  my $min = $2;
  my $dir = $3;
  my $v = $deg + $min / 60;
  if ($dir eq 'W') { $v *= -1; }
  $p->{lon} = $v;
 }

 # in km
 $p->{elev} = $p->{elev} / 1000;
};

sub load_data {
 my $data_string = '';
 if ($cfg->{fetch}) {
  my $ua = LWP::UserAgent->new(ssl_opts => { verify_hostname => 0 });
  my $res  = $ua->get($cfg->{stations_url});
  if (!$res->is_success) {
   die "could not get data";
  }
  my $ofh = undef;
  open($ofh,'>',$cfg->{raw_fname});
  print $ofh $res->content;
  close $ofh;
  $data_string = $res->content;
 } else {
  my $ifh;
  open($ifh,'<',$cfg->{raw_fname}) or die "could not find $cfg->{raw_fname}";
  while (<$ifh>) { $data_string .= $_; };
  close $ifh;
 }
 return $data_string;
};


sub get_fields {
 my $line = shift;
 my $res  = {};

 foreach my $field (keys %{$cfg->{format}}) {
  my $left = $cfg->{format}{$field}[0];
  my $right= $cfg->{format}{$field}[1];
  my $len  = $right - $left + 1;
  my $val  = substr($line,$left,$len);
  if ($val =~ /\w/) {
   $res->{$field} = $val;
  }
 }
 return $res;
};

