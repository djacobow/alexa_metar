// This is a list of many (but by no means enough)
// airports by city. This is for the city-based
// lookup function.
//
// This list is indexed by what people say, which is
// itself filtered by the AMAZON.US_CITIES or
// AMAZON.UK_CITIES slot. As such, it is probbly
// that many of these, particularly the international
// ones, can never be accessed because the utterances
// would be filtered already.
//
// There are duplications in this list to try to
// capture some of the varying way people will refer
// to airports, such as airports that serve more than
// one city.
//
// This is not a complete list of airports with
// METARs. It's mostly just airport that have TAFs.
// Of course, I'm not using TAFs, I just think if it
// as a signifier that this airport is a bit bigger
// or has commercial traffic.

var US = true;

var names = {
    'aasiaat'           : 'BGAA', //   aasiaat/egedesmi
    'abadan'            : 'OIAA', //   abadan intl airp
    'abakan'            : 'UNAA', //   abakan
    'abbotsford'        : 'CYXX', //BC abbotsford airpo
    'aberdeen'          : 'KABR', //SD aberdeen
    'abha'              : 'OEAB', //   abha
    'abidjan/port'      : 'DIAP', //   abidjan/port bou
    'abilene'           : 'KABI', //TX abilene
    'abu dhabi'         : 'OMAA', //   abu dhabi intl
    'abu'               : 'HEBL', //   abu simbel (ruin
    'abuja'             : 'DNAA', //   abuja
    'acapulco'          : 'MMAA', //   acapulco/g. alva
    'accra'             : 'DGAA', //   accra/kotoka int
    'achmad'            : 'WARS', //   achmad yani
    'adak'              : 'PADK', //AK adak nas
    'adana'             : 'LTAG', //   adana/incirlik a
    'addis ababa'       : 'HAAB', //   addis ababa/bole
    'adelaide'          : 'YPAD', //   adelaide intl ar
    'aden'              : 'OYAA', //   aden intl
    'adi sumarmo'       : 'WARQ', //   adi sumarmo wiry
    'adi sutjipto'      : 'WARJ', //   adi sutjipto
    'adiyaman'          : 'LTCP', //   adiyaman arpt
    'adrar'             : 'DAUA', //   adrar/touat
    'afonsos'           : 'SBAF', //   afonsos arpt (mi
    'afyon'             : 'LTAH', //   afyon (mil)
    'agadez'            : 'DRZA', //   agadez south (mi
    'agana'             : 'PGUM', //GU agana
    'agen/la'           : 'LFBA', //   agen/la garenne
    'agri'              : 'LTCB', //   agri
    'aguadilla'         : 'TJBQ', //PR aguadilla/borinq
    'aguascalientes'    : 'MMAS', //   aguascalientes
    'ahmadabad'         : 'VAAH', //   ahmadabad
    'ahwaz'             : 'OIAW', //   ahwaz
    'aigen'             : 'LOXA', //   aigen/ennstal (m
    'ajaccio/campo'     : 'LFKJ', //   ajaccio/campo or
    'akhisar'           : 'LTBT', //   akhisar (tur-afb
    'akita'             : 'RJSK', //   akita airport
    'akobo'             : 'HSAK', //   akobo
    'akron'             : 'KCAK', //OH akron
    'akrotiri'          : 'LCRA', //   akrotiri (raf)
    'aktau'             : 'UATE', //   aktau kazakhstan
    'aktjubinsk'        : 'UATT', //   aktjubinsk
    'akure'             : 'DNAK', //   akure airport
    'akureyri'          : 'BIAR', //   akureyri
    'al ahsa'           : 'OEAH', //   al ahsa
    'al ain'            : 'OMAL', //   al ain intnl arp
    'al baha'           : 'OEBA', //   al baha
    'al dawadmi'        : 'OEDM', //   al dawadmi
    'al hoceima'        : 'GMTA', //   al hoceima/cote
    'al jouf'           : 'OESK', //   al-jouf (civ/mil
    'al jubail'         : 'OEJB', //   al jubail
    'al kharj'          : 'OEKJ', //   al kharj ab
    'al massira'        : 'GMAD', //   al massira mc
    'al najaf'          : 'ORNI', //   al najaf
    'alabaster'         : 'KEET', //AL alabaster
    'alamosa'           : 'KALS', //CO alamosa
    'albacete'          : 'LEAB', //   albacete (civ/mi
    'albany'            : 'KALB', //NY albany
    'albenga'           : 'LIMG', //   albenga
    'alborg'            : 'EKYT', //   alborg
    'albuquerque'       : 'KABQ', //NM albuquerque
    'alcantarilla'      : 'LERI', //   alcantarilla(sp-
    'alencon'           : 'LFOF', //   alencon/valframb
    'aleppo'            : 'OSAP', //   aleppo (civ/mil)
    'alert'             : 'CYLT', //NU alert airport
    'alesund'           : 'ENAL', //   alesund/vigra
    'alexandria'        : US ? 'KAXN' : 'HEBA', //MN alexandria, Egypt
    'alexandroupolis'   : 'LGAL', //   alexandroupolis
    'alghero'           : 'LIEA', //   alghero
    'alicante/el'       : 'LEAL', //   alicante/el alte
    'alice'             : 'KALI', //TX alice
    'allentown'         : 'KABE', //PA allentown
    'alliance'          : 'KAIA', //NE alliance
    'alma-ata'          : 'UAAA', //   alma-ata
    'almeria'           : 'LEAM', //   almeria airport
    'alofi'             : 'NIUE', //   alofi cook is
    'alotau'            : 'AYGN', //   alotau
    'alpena'            : 'KAPN', //MI alpena
    'alpnach'           : 'LSMA', //   alpnach
    'alta floresta'     : 'SBAT', //   alta floresta
    'alta'              : 'ENAT', //   alta airport
    'altenburg'         : 'EDAC', //   altenburg-nobitz
    'altenstadt'        : 'ETHA', //   altenstadt/schon
    'altoona'           : 'KAOO', //PA altoona
    'altus'             : 'KLTS', //OK altus afb
    'alverca'           : 'LPAR', //   alverca
    'alykel'            : 'UOOO', //   alykel
    'amahai'            : 'WAPA', //   amahai
    'amapala/los'       : 'MHAM', //   amapala/los pel
    'amari'             : 'EEEI', //   amari air base
    'amarillo'          : 'KAMA', //TX amarillo
    'amberley'          : 'YAMB', //   amberley
    'ambon'             : 'WAPP', //   ambon/pattimura
    'ambouli'           : 'HDAM', //   ambouli djibouti
    'amderma'           : 'ULDD', //   amderma
    'amendola'          : 'LIBA', //   amendola (it-afb
    'amman'             : 'OJAM', //   amman/king abdul
    'amritsar'          : 'VIAR', //   amritsar
    'amsterdam'         : 'EHAM', //   amsterdam/schiph
    'amundsen scott'    : 'NZSP', //   amundsen-scott
    'anadolu'           : 'LTBY', //   anadolu
    'anaheim'           : 'KSNA',
    'anapa/vitiazevo'   : 'URKA', //   anapa/vitiazevo
    'anapolis'          : 'SBAN', //   anapolis (braz-a
    'anchorage'         : 'PANC', //AK anchorage intl
    'andahuayla'        : 'SPHY', //   andahuayla
    'andenes'           : 'ENAN', //   andoya/andenes(a
    'anderson'          : 'KAND', //SC anderson
    'andizan'           : 'UTFA', //   andizan
    'andoya'            : 'ENAN', //   andoya/andenes(a
    'andravida'         : 'LGAD', //   andravida (civ/a
    'andrews'           : 'KADW', //MD andrews afb
    'anelghowhat'       : 'NVVA', //   anelghowhat arpt
    'angeles/pampanga'  : 'RPLC', //   angeles/pampanga
    'angelholm'         : 'ESTA', //   angelholm (swe-a
    'angleton'          : 'KLBX', //TX angleton
    'ankara'            : 'LTAC', //   ankara/esenboga
    'annabal'           : 'DABB', //   annaba/el mellah
    'annecy/meythet'    : 'LFLP', //   annecy/meythet
    'anniston'          : 'KANB', //AL anniston
    'anta/huaraz'       : 'SPHZ', //   anta/huaraz
    'antalya'           : 'LTAI', //   antalya (civ/mil
    'antananarivo/iva'  : 'FMMI', //   antananarivo/iva
    'antigua'           : 'TAPA', //   coolidge/antigua
    'antisiranana'      : 'FMNA', //   diego-suarez/ant
    'antofagasta/cerr'  : 'SCFA', //   antofagasta/cerr
    'antsirabe'         : 'FMME', //   antsirabe
    'antwerp'           : 'EBAW', //   antwerp/deurne
    'aomori'            : 'RJSA', //   aomori airport
    'aosta'             : 'LIMW', //   aosta arpt
    'apiaupolu'         : 'NSAP', //   apia/upolu islan
    'appleton'          : 'KATW', //WI appleton/outagam
    'aqaba'             : 'OJAQ', //   aqaba intl airpo
    'aracaju'           : 'SBAR', //   aracaju/santa ma
    'arad'              : 'LRAR', //   arad
    'arapahoe'          : 'KAPA', //CO denver/arapahoe
    'arar'              : 'OERR', //   arar
    'araxos'            : 'LGRX', //   araxos (civ/afb)
    'arcata'            : 'KACV', //CA arcata/eureka
    'arctic'            : 'CYAB', //NU arctic bay
    'ardabil'           : 'OITL', //   ardabil
    'arequipa'          : 'SPQU', //   arequipa/rodrigu
    'arhangelsk'        : 'ULAA', //   arhangelsk
    'arica'             : 'SCAR', //   arica/chacalluta
    'arkadelphia'       : 'KADF', //AR arkadelphia
    'arlington'         : 'KGKY', //TX arlington
    'armenia/el'        : 'SKAR', //   armenia/el eden
    'armilla'           : 'LEGA', //   armilla (civ/mil
    'arnos'             : 'TVSV', //   arnos vale/st v
    'arrecife'          : 'GCRR', //   arrecife/lanzaro
    'arroyo barril'     : 'MDAB', //   arroyo barril
    'arusha'            : 'HTAR', //   arusha
    'arviat'            : 'CYEK', //NU arviat airport
    'arvidsjaur'        : 'ESNX', //   arvidsjaur
    'arwi'              : 'GMMW', //   arwi
    'asahikawa'         : 'RJEC', //   asahikawa airpor
    'asheville'         : 'KAVL', //NC asheville
    'ashgabat'          : 'UTAA', //   ashgabat
    'ashland'           : 'KDWU', //KY ashland
    'ashwaubenon'       : 'KGRB', //WI ashwaubenon
    'asmara'            : 'HHAS', //   asmara/yohannes
    'aspen'             : 'KASE', //CO aspen
    'astana'            : 'UACC', //   astana kazakhsta
    'astoria'           : 'KAST', //OR astoria
    'astrakhan'         : 'URWA', //   astrakhan
    'asturias'          : 'LEAS', //   asturias/aviles
    'asuncion/silvio'   : 'SGAS', //   asuncion/silvio
    'aswan'             : 'HESN', //   aswan (civ/mil)
    'asyut'             : 'HEAT', //   asyut
    'athens'            : US ? 'KAHN' : 'LGAV', //GA athens, Greece
    'atlanta'           : 'KATL', //GA atlanta
    'atlantic city'     : 'KACY', //NJ atlantic city
    'atyrau'            : 'UATG', //   atyrau
    'auckland'          : 'NZAA', //   auckland intl ar
    'augsburg'          : 'EDMA', //   augsburg/mulhaus
    'augusta'           : 'KAGS', //GA augusta/bush
    'aurangabad'        : 'VAAU', //   aurangabad airpo
    'aurillac'          : 'LFLW', //   aurillac (aut)
    'austin'            : 'KAUS', //TX austin
    'avalon'            : 'YMAV', //   avalon airport
    'aviano'            : 'LIYW', //   aviano (usaf)
    'avord'             : 'LFOA', //   avord (fafb)
    'aweil/uwayl'       : 'HSAW', //   aweil/uwayl
    'ayacucho'          : 'SPHO', //   ayacucho/coronel
    'aydin'             : 'LTBD', //   aydin
    'babelthuap'        : 'PTRO', //   babelthuap/koror
    'bacache'           : 'SBBI', //   curitiba/bacache
    'bacau'             : 'LRBC', //   bacau
    'bage/cmdt'         : 'SBBG', //   bage/cmdt kraeme
    'baghdad'           : 'ORBI', //   baghdad intl
    'bagotville'        : 'CYBG', //QC bagotville(can m
    'bahawalpur'        : 'OPBW', //   bahawalpur
    'bahia'             : 'SAZB', //   bahia blanca (mi
    'bahias'            : 'MMBT', //   bahias de huatul
    'bahrain'           : 'OBBI', //   bahrain intl arp
    'bai gan'           : 'RCMT', //   bai gan
    'baia'              : 'LRBM', //   baia mare
    'baie comeau'       : 'CYBC', //QC baie comeau airp
    'baker lake'        : 'CYBK', //NU baker lake airpo
    'baker'             : 'KBKE', //OR baker
    'bakersfield'       : 'KBFL', //CA bakersfield
    'baku'              : 'UBBB', //   baku/bine arpt
    'balaton'           : 'LHSM', //   balaton
    'bali'              : 'WADD', //   bali intl
    'balikesir'         : 'LTBF', //   balikesir (tur-a
    'balkhash'          : 'UAAH', //   balkhash
    'balmaceda'         : 'SCBA', //   balmaceda
    'balti'             : 'LUBL', //   balti intl arpt
    'baltimore'         : 'KBWI',
    'bamako'            : 'GABS', //   bamako/senou (mi
    'banak'             : 'ENNA', //   banak/lakselv (a
    'banda'             : 'WITT', //   banda aceh/blang
    'bandar'            : 'OIKB', //   bandar abbas int
    'bandara'           : 'WADL', //   bandara
    'bandirma'          : 'LTBG', //   bandirma (civ/af
    'bangalore'         : 'VOBG', //   bangalore arp
    'bangkok'           : 'VTBD', //   bangkok/don muan
    'bangor'            : 'KBGR', //ME bangor
    'banja'             : 'LQBK', //   banja luka
    'banjul'            : 'GBYD', //   banjul/yundum in
    'bar'               : 'KBHB', //ME bar harbor
    'barahona'          : 'MDBH', //   barahona
    'barcelona'         : 'LEBL', //   barcelona airpor
    'bardenas'          : 'LEBR', //   bardenas reales
    'bardufoss'         : 'ENDU', //   bardufoss (civ/m
    'bari'              : 'LIBD', //   bari/palese macc
    'bariloche'         : 'SAZS', //   san carlos baril
    'barksdale'         : 'KBAD', //LA barksdale afb
    'barnaul'           : 'UNBB', //   barnaul
    'barquisimeto'      : 'SVBM', //   barquisimeto (mi
    'barranquilla'      : 'SKBQ', //   barranquilla/ern
    'barrow'            : 'PABR', //AK barrow
    'bartlesville'      : 'KBVO', //OK bartlesville
    'basel'             : 'LFSB', //   bale/mulhouse
    'bashkortostan'     : 'UWUU', //   bashkortostan
    'basrah'            : 'ORMM', //   basrah/magal
    'bastia'            : 'LFKB', //   bastia/poretta
    'bata'              : 'FGBT', //   bata (rio muni)
    'batajnica'         : 'LYBT', //   batajnica
    'bathurst'          : 'CZBF', //NB bathurst arpt(aw
    'batman'            : 'LTCJ', //   batman (tur-afb)
    'batna'             : 'DABT', //   batna
    'baton rouge'       : 'KBTR', //LA baton rouge
    'battle creek'      : 'KBTL', //MI battle creek
    'batumi'            : 'UGSB', //   batumi
    'bauerfield'        : 'NVVV', //   bauerfield/efate
    'bauru'             : 'SBBU', //   bauru
    'bay'               : 'KHSA', //MS bay st louis
    'bayreuth'          : 'EDQD', //   bayreuth
    'beale'             : 'KBAB', //CA beale afb/marysv
    'beaufort'          : 'KNBC', //SC beaufort mcas
    'beaumont/port'     : 'KBPT', //TX beaumont/port ar
    'beauvais/tille(a'  : 'LFOB', //   beauvais/tille(a
    'beauvechain'       : 'EBBE', //   beauvechain (baf
    'beaver'            : 'KBVI', //PA beaver falls arp
    'bechar/ouakda'     : 'DAOR', //   bechar/ouakda
    'beckley'           : 'KBKW', //WV beckley
    'bedford'           : 'KBED', //MA bedford
    'beef'              : 'TUPJ', //   beef isl/roadtow
    'begishevo'         : 'UWKE', //   begishevo
    'beijing'           : 'ZBAA',
    'beira'             : 'FQBR', //   beira
    'beirut'            : 'OLBA', //   beirut (civ/mil)
    'beja'              : 'LPBJ', //   beja (por/ger-af
    'bejaia'            : 'DAAE', //   bejaia/soummam
    'belem'             : 'SBBE', //   belem/val de cae
    'belfast'           : 'EGAA', //   belfast/aldergro
    'belgaum'           : 'VABM', //   belgaum/sambra
    'belgorod'          : 'UUOB', //   belgorod
    'belgrade'          : 'LYBE',
    'belize'            : 'MZBZ', //   belize intl
    'bella'             : 'CBBC', //BC bella bella
    'belleville'        : 'KBLV', //IL scott afb/bellev
    'bellingham'        : 'KBLI', //WA bellingham
    'bemidji'           : 'KBJI', //MN bemidji
    'ben'               : 'LLIB', //   ben ya akov
    'ben-gurion(civ/m'  : 'LLBG', //   ben-gurion(civ/m
    'benbecula'         : 'EGPL', //   benbecula island
    'bend'              : 'KBDN', //OR bend
    'bengaluru'         : 'VOBL', //   bengaluru
    'benghazi'          : 'HLLB', //   benina/benghazi
    'bengkula'          : 'WIPL', //   bengkula/padangk
    'benguela'          : 'FNBG', //   benguela/monbaca
    'benin'             : 'DNBE', //   benin city(civ/m
    'benina'            : 'HLLB', //   benina/benghazi
    'benson'            : 'EGUB', //   benson raf
    'bentonville'       : 'KXNA', //AR bentonville (nw)
    'bergamo/orio'      : 'LIME', //   bergamo/orio ser
    'bergen/flesland'   : 'ENBR', //   bergen/flesland
    'bergerac/roumani'  : 'LFBE', //   bergerac/roumani
    'berlevag'          : 'ENBV', //   berlevag
    'berlin'            : 'EDDI',
    'bermuda'           : 'TXKF', //   bermuda nas
    'bern'              : 'LSZB', //   bern/belp
    'berra'             : 'SBBW', //   berra do garcas
    'beslan'            : 'URMO', //   beslan
    'bethel'            : 'PABE', //AK bethel
    'bettles'           : 'PABT', //AK bettles
    'beziers'           : 'LFMU', //   beziers/vias
    'bhaunagar'         : 'VABV', //   bhaunagar
    'bhopal'            : 'VABP', //   bhopal/bairagarh
    'biak'              : 'WABB', //   biak/frans kaisi
    'biarritz'          : 'LFBZ', //   biarritz/anglet
    'bicycle lake'      : 'KBYS', //CA bicycle lake
    'big piney'         : 'KBPI', //WY big piney
    'big sandy'         : 'KSJS', //KY big sandy rgnl
    'big sky'           : 'KEKS', //MT ennis big sky
    'big trout lake'    : 'CYTL', //ON big trout lake
    'biggin hill'       : 'EGKB', //   biggin hill
    'bilbao'            : 'LEBB', //   bilbao/sondica
    'bildudalur'        : 'BIBD', //   bildudalur
    'billings'          : 'KBIL', //MT billings
    'billund'           : 'EKBI', //   billund airport
    'biloxi'            : 'KBIX', //MS biloxi/keesler
    'binghamton'        : 'KBGM', //NY binghamton
    'bingol'            : 'LTCU', //   bingol
    'bintulu'           : 'WBGB', //   bintulu/kalimant
    'birmingham alabama'        : 'KBHM', //AL birmingham
    'birmingham england'        : 'EGBB', //   birmingham airpo
    'birmingham'        : US ? 'KBHM' : 'EGBB',
    'bisbee'            : 'KDUG', //AZ douglas bisbee
    'bisha'             : 'OEBH', //   bisha (civ/mil)
    'bishkek'           : 'UAFM', //   bishkek/manas
    'bishop'            : 'KBIH', //CA bishop
    'biskra'            : 'DAUB', //   biskra
    'bismarck'          : 'KBIS', //ND bismarck
    'bissau'            : 'GGOV', //   bissau (civ/mil)
    'bizerte/sidi'      : 'DTTB', //   bizerte/sidi ahm
    'blackpool'         : 'EGNH', //   blackpool airpor
    'blacksburg'        : 'KBCB', //VA blacksburg/va t.
    'blagoveshchensk'   : 'UHBB', //   blagoveshchensk
    'blanc'             : 'CYBX', //QC blanc sablon arp
    'bloemfontein/her'  : 'FABL', //   bloemfontein/her
    'bloomington'       : 'KBMG', //IN bloomington
    'bluefield'         : 'KBLF', //WV bluefield
    'bluefields'        : 'MNBL', //   bluefields
    'blythe'            : 'KBLH', //CA blythe
    'boa'               : 'SBBV', //   boa vista (civ/m
    'bobo-dioulasso'    : 'DFOO', //   bobo-dioulasso
    'bodo'              : 'ENBO', //   bodo vi (civ/mil
    'bodrum'            : 'LTFE', //   bodrum milas
    'bogota'            : 'SKBO', //   bogota/eldorado
    'bogue'             : 'KNJM', //NC bogue/swansboro
    'boise'             : 'KBOI', //ID boise
    'bol'               : 'LDSB', //   bol airport
    'bologna'           : 'LIPE', //   bologna/borgo (a
    'bolzano'           : 'LIPB', //   bolzano(civ/it-a
    'bombay'            : 'VABB', //   bombay/santacruz
    'bonaire'           : 'TNCB', //   bonaire/flamingo
    'boothville'        : 'KBVE', //LA boothville
    'bor'               : 'HSBR', //   bor
    'bora-bora'         : 'NTTB', //   bora-bora/motu-m
    'bordeaux'          : 'LFBD', //   bordeaux/merigna
    'borden'            : 'CYBN', //ON borden
    'bordj'             : 'DATM', //   bordj mokhtar
    'borlange'          : 'ESSD', //   borlange (swe-af
    'boscombe'          : 'EGDM', //   boscombe down
    'boston'            : 'KBOS', //MA boston
    'botovo'            : 'ULWC', //   botovo/cherepove
    'bou-saada'         : 'DAAD', //   bou-saada
    'bouake'            : 'DIBK', //   bouake (civ/mil)
    'boulder'           : 'KBVU',
    'bournemouth'       : 'EGHH', //   bournemouth airp
    'bowling green'     : 'KBWG', //KY bowling gree
    'bozeman'           : 'KBZN', //MT bozeman
    'bradford'          : US ? 'KBFD' : 'EGNM', //PA bradford, UK
    'bradshaw'          : 'PHSF', //HI bradshaw aaf/haw
    'brady'             : 'KBBD', //TX brady
    'brainerd'          : 'KBRD', //MN brainerd
    'brandon'           : 'CYBR', //MB brandon airport
    'branson'           : 'KBBG', //MO branson
    'brasilia'          : 'SBBR', //   brasilia (civ/mi
    'brasschaat'        : 'EBBT', //   brasschaat (mil)
    'bratislava'        : 'LZIB', //   bratislava ivank
    'bratsk'            : 'UIBB', //   bratsk/irkutsk
    'braunschweig'      : 'EDVE', //   braunschweig
    'bray'              : 'LFAQ', //   bray
    'brazzaville/maya'  : 'FCBB', //   brazzaville/maya
    'bremen'            : 'EDDW', //   bremen
    'brescia/montichi'  : 'LIPO', //   brescia/montichi
    'brest'             : 'UMBB', //   brest
    'brest/guipavas'    : 'LFRB', //   brest/guipavas
    'bridgeport'        : 'KBDR', //CT bridgeport
    'brie'              : 'LFBU', //   brie champniers
    'brindisi/casale'   : 'LIBR', //   brindisi/casale
    'bringeland'        : 'ENBL', //   forde/bringeland
    'brisbane'          : 'YBBN', //   brisbane intl ar
    'bristol'           : US ? 'KTRI' : 'EGGD', //TN bristol
    'brive'             : 'LFSL', //   brive/souillac
    'brize'             : 'EGVN', //   brize norton raf
    'brjansk'           : 'UUBP', //   brjansk
    'brno'              : 'LKTB', //   brno/turany
    'bronnoysund'       : 'ENBN', //   bronnoysund/bron
    'broome'            : 'YBRM', //   broome airport
    'broomfield'        : 'KBJC', //CO broomfield/jeffc
    'brownsville'       : 'KBRO', //TX brownsville
    'brunei'            : 'WBSB', //   brunei intl airp
    'brunswick georgia' : 'KSSI', //GA brunswick
    'brunswick maine'         : 'KNHZ', //ME brunswick nas
    'brunswick'         : 'KSSI', //GA brunswick
    'brussels'          : 'EBBR', //   brussels nationa
    'bryce canyon'      : 'KBCE', //UT bryce canyon
    'bucaramango'       : 'SKBG', //   bucaramango/palo
    'bucharest'         : 'LROP',
    'buckeburg'         : 'ETHB', //   buckeburg(ger-ar
    'buckley'           : 'KBKF', //CO buckley angb/den
    'budapest'          : 'EPWA',
    'budapest/feriheg'  : 'LHBP', //   budapest/feriheg
    'buechel'           : 'ETSB', //   buechel
    'buenos aires'      : 'SAEZ', //   buenos aires/eze
    'buffalo'           : 'KBUF', //NY buffalo/cheektow
    'bujumbura'         : 'HBBA', //   bujumbura
    'bukhara'           : 'UTSB', //   bukhara
    'bulawayo'          : 'FVBU', //   bulawayo/woodval
    'bullhead city'          : 'KIFP', //AZ bullhead city
    'buochs'            : 'LSZC', //   buochs
    'buraimi'           : 'OOBR', //   buraimi (aut)
    'burbank'           : 'KBUR', //CA burbank
    'burgas'            : 'LBBG', //   burgas
    'burgos'            : 'LEBG', //   burgos/villafria
    'burirum'           : 'VTUO', //   burirum
    'burley'            : 'KBYI', //ID burley
    'burlington iowa'        : 'KBRL', //IA burlington
    'burlington'        : 'KBTV', //VT burlington
    'burns'             : 'KBNO', //OR burns
    'burwash'           : 'CYDB', //YT burwash
    'busan'             : 'RKPK', //   busan/kimhae int
    'bushehr'           : 'OIBB', //   bushehr (civ/afb
    'butte'             : 'KBTM', //MT butte
    'butterworth'       : 'WMKB', //   butterworth(aus-
    'bydgoszcz'         : 'EPBY', //   bydgoszcz
    'cabinda'           : 'FNCA', //   cabinda
    'cabo frio'         : 'SBCB', //   cabo frio
    'cabo san lucas'    : 'MMSL', //   cabo san lucas
    'caen'              : 'LFRK', //   caen/carpiquet(a
    'cagayan de oro'    : 'RPML', //   cagayan de oro
    'cagliari'          : 'LIEE', //   cagliari/elmas(a
    'cahokia'           : 'KCPS', //IL cahokia/st louis
    'cahul'             : 'LUCH', //   cahul intl
    'cairns'            : 'YBCS', //   cairns airport
    'cairo'             : 'HECA', //   cairo intl airpo
    'cajamarca'         : 'SPJR', //   cajamarca/revore
    'calabar'           : 'DNCA', //   calabar
    'calama'            : 'SCCF', //   calama/el loa
    'calcutta'          : 'VECC', //   calcutta/dum dum
    'caldwell'          : 'KCDW',
    'calgary'           : 'CYYC', //AB calgary intnl ar
    'cali'              : 'SKCL', //   cali/alfonso bon
    'calicut'           : 'VOCL', //   calicut
    'cam ranh bay'      : 'VVCR', //   cam ranh bay
    'camaguey'          : 'MUCM', //   camaguey/iganci
    'cambrai'           : 'LFQI', //   cambrai/epinoy(f
    'cambridge bay'     : 'CYCB', //NU cambridge bay ar
    'cambridge'         : 'EGSC', //   cambridge
    'cameri'            : 'LIMN', //   cameri (it-afb)
    'camp bastion'      : 'EQBH', //   camp bastion
    'camp page'         : 'RKNC', //   camp page/chunch
    'camp pendleton'    : 'KNFG', //CA camp pendleton
    'camp stanley'      : 'RKSX', //   camp stanley/h-2
    'campbell river'    : 'CYBL', //BC campbell river a
    'campbeltown'       : 'EGEC', //   campbeltown
    'campeche'          : 'MMCP', //   campeche/ignacio
    'campia turzii'     : 'LRCT', //   campia turzii
    'campina grande'    : 'SBKG', //   campina grande
    'campinas'          : 'SBKP', //   campinas/viracop
    'campo grande'      : 'SBCG', //   campo grande int
    'can tho'           : 'VVCT', //   can tho
    'canagua'           : 'MUCC', //   canagua
    'canakkale'         : 'LTBH', //   canakkale
    'canary islands'    : 'GCRR', //   arrecife/lanzaro
    'canberra'          : 'YSCB', //   canberra (civ/mi
    'cancun'            : 'MMUN', //   cancun
    'candle'            : 'CWLZ', //SK candle lake
    'cannes'            : 'LFMD', //   cannes/mandelieu
    'cannon'            : 'KCVS', //NM cannon afb/clovi
    'cape dorset'       : 'CYTE', //NU cape dorset airp
    'cape girardeau'    : 'KCGI', //MO cape girardeau
    'cape lusburn'      : 'PALU', //AK cape lisburne
    'cape newenham'     : 'PAEH', //AK cape newenham
    'cape romanzof'     : 'PACZ', //AK cape romanzof
    'cape skiring'      : 'GOGS', //   cape skiring
    'capetown'          : 'FACT', //   capetown/df mala
    'capitan corbeta'   : 'SULS', //   capitan corbeta
    'caracas'           : 'SVMI', //   caracas/s. boliv
    'caravelas'         : 'SBCV', //   caravelas airpor
    'carcassonne'       : 'LFMK', //   carcassonne/salv
    'cardak'            : 'LTAY', //   cardak
    'cardiff'           : 'EGFF',
    'caribou'           : 'KCAR', //ME caribou
    'carlisle'          : 'EGNC', //   carlisle
    'carlsbad new mexico'          : 'KCNM', //NM carlsbad
    'carlsbad'          : 'KCRQ', //CA carlsbad
    'carolina'          : 'SBCI', //   carolina airport
    'carrasco'          : 'SUMU', //   carrasco (civ/mi
    'carsamba'          : 'LTFH', //   carsamba
    'carson ciry'       : 'KCXP', //NV carson city
    'cartagena'         : 'SKCG', //   cartagena/rafael
    'cartwright'        : 'CYCA', //NL cartwright
    'casablanca'        : 'GMMT', //   casablanca t-m
    'casement'          : 'EIME', //   casement (mil)
    'caslav'            : 'LKCV', //   caslav
    'casper'            : 'KCPR', //WY casper
    'castlegar'         : 'CYCG', //BC castlegar airpor
    'castres-mazamet'   : 'LFCK', //   castres-mazamet
    'catacamas'         : 'MHCA', //   catacamas
    'catania'           : 'LICC', //   catania/fontanar
    'caucedo'           : 'MDSD', //   caucedo/de las
    'caumont'           : 'LFMV', //   caumont
    'cayenne'           : 'SOCA', //   cayenne/rochambe
    'cayo largo'        : 'MUCL', //   cayo largo d sur
    'cazaux pond'       : 'LFBC', //   cazaux pond (faf
    'cedar city'        : 'KCDC', //UT cedar city
    'cedar rapids'      : 'KCID', //IA cedar rapids
    'celle'             : 'ETHC', //   celle (ger-army)
    'cerklje'           : 'LJCE', //   cerklje
    'cervia'            : 'LIPC', //   cervia (it-afb)
    'cewice'            : 'EPCE', //   cewice airbase
    'chadron'           : 'KCDR', //NE chadron
    'chagcharan'        : 'EQBI', //   chagcharan
    'chah bahar'        : 'OIZC', //   chah bahar (ir-a
    'chajang'           : 'RKSI', //   chajang ni
    'chalons'           : 'LFOK', //   chalons/vatry fa
    'chambery'          : 'LFLB', //   chambery/aix bai
    'chamonate'         : 'SCHA', //   copiapo/chamonat
    'champaign'         : 'KCMI', //IL champaign/urbana
    'chandler'          : 'KIWA',
    'changchun'         : 'ZYCC', //   changchun
    'channel islands'   : 'EGJA', //   alderney/channel
    'chanute'           : 'KCNU', //KS chanute
    'chapleau'          : 'CYLD', //ON chapleau arpt(sa
    'charleroi'         : 'EBCI', //   charleroi/gossel
    'charles'           : 'LFPG', //   charles de gaull
    'charleston west virginia'        : 'KCRW', //WV charleston
    'charleston'        : 'KCHS', //SC charleston
    'charlotte'         : 'KCLT', //NC charlotte
    'charlottesville'   : 'KCHO', //VA charlottesville
    'charlottetown'     : 'CYYG', //PE charlottetown ar
    'chateaube'         : 'LFBG', //   cognac/chateaube
    'chateaudun'        : 'LFOC', //   chateaudun (fafb
    'chateauroux'       : 'LFLX', //   chateauroux/deol
    'chattanooga'       : 'KCHA', //TN chattanooga
    'cheboksary'        : 'UWKS', //   cheboksary
    'chelyabinsk'       : 'USCC', //   chelyabinsk-bala
    'chengdu'           : 'ZUUU', //   chengdu
    'cherbourg'         : 'LFRC', //   cherbourg/mauper
    'cherkasy'          : 'UKKE', //   cherkasy
    'chernovtsy'        : 'UKLN', //   chernovtsy
    'cherry'            : 'KNKT', //NC cherry point
    'chetumal'          : 'MMCM', //   chetumal
    'cheyenne'          : 'KCYS', //WY cheyenne
    'chiang mai'        : 'VTCC', //   chiang mai(civ/a
    'chiang rai'        : 'VTCT', //   chiang rai intl
    'chibougamau'       : 'CYMT', //QC chibougamau chap
    'chicago midway'            : 'KMDW',
    'chicago'           : 'KORD', //IL chicago o'hare
    'chiclayo'          : 'SPHI', //   chiclayo/capt jo
    'chicopee'          : 'KCEF', //MA chicopee/westove
    'chievres'          : 'EBCV', //   chievres ab
    'chihuahua'         : 'MMCU', //   chihuahua intl a
    'childress'         : 'KCDS', //TX childress
    'chileka'           : 'FWCL', //   chileka intl arp
    'chimoio'           : 'FQCH', //   chimoio
    'china'             : 'KNID', //CA china lake (naf)
    'chinandega'        : 'MNCH', //   chinandega
    'chinmem'           : 'RCBS', //   chinmem/shatou
    'chios'             : 'LGHI', //   chios airport
    'chipata'           : 'FLCP', //   chipata
    'chiredzi'          : 'FVCZ', //   chiredzi/buffalo
    'chisinau'          : 'LUKK', //   chisinau intl
    'chitose'           : 'RJCC', //   chitose (jasdf/c
    'chittagong'        : 'VGEG', //   chittagong (cv/m
    'chlef'             : 'DAOI', //   chlef
    'chokurdakh'        : 'UESO', //   chokurdakh
    'choluteca'         : 'MHCH', //   choluteca
    'chon'              : 'VTBS', //   chon buri/sattah
    'chongqing'         : 'ZUCK', //   chongqing/chungk
    'christchurch'      : 'NZCH', //   christchurch int
    'christiansted'     : 'TISX', //   christiansted
    'christmas island'  : 'YPXM', //   christmas isl (p
    'christmas'         : 'PLCH', //UM christmas/cassid
    'chumphon'          : 'VTSE', //   chumphon
    'chungking'         : 'ZUCK', //   chongqing/chungk
    'church'            : 'EGXG', //   church fenton ra
    'churchill falls'   : 'CZUM', //NL churchill falls
    'churchill'         : 'CYYQ', //MB churchill airpor
    'ciampino'          : 'LIRA', //   ciampino(it-afb/
    'cienfuegos'        : 'MUCF', //   cienfuegos(civ/m
    'cimkent'           : 'UAII', //   cimkent
    'cincinnati'        : 'KCVG',
    'cita'              : 'UIAA', //   cita/kadala
    'ciudad del carmen' : 'MMCE', //   ciudad del carm
    'ciudad juarez'     : 'MMCS', //   ciudad juarez in
    'ciudad obregon'    : 'MMCN', //   ciudad obregon
    'ciudad real'       : 'LEAO', //   ciudad real
    'ciudad victoria'   : 'MMCV', //   ciudad victoria
    'clarksburg'        : 'KCKB', //WV clarksburg
    'clarksville'       : 'KCKV', //TN clarksville
    'clermont'          : 'LFLC', //   clermont/aulnat
    'cleveland'         : 'KCLE', //OH cleveland
    'clinton'           : 'KCSM', //OK clinton
    'cluj napoca'       : 'LRCL', //   cluj-napoca/some
    'cobija'            : 'SLCO', //   cobija
    'cochabamba'        : 'SLCB', //   cochabamba/jorge
    'cochin'            : 'VOCI', //   cochin intl
    'cochstedt'         : 'EDBC', //   cochstedt arpt
    'cocos'             : 'YPCC', //   cocos isl intl a
    'cody'              : 'KCOD', //WY cody
    'coeur d\'alene'    : 'KCOE', //ID coeur d'alene
    'coffs harbour'     : 'YCFS', //   coffs harbour
    'cognac'            : 'LFBG', //   cognac/chateaube
    'coimbatore'        : 'VOCB', //   coimbatore/peela
    'cold bay'          : 'PACD', //AK cold bay
    'cold lake'         : 'CYOD', //AB cold lake (can
    'coleman'           : 'ETOR', //   coleman (usa-af)
    'colerne'           : 'EGUO', //   colerne raf
    'colima'            : 'MMIA', //   colima
    'college'           : 'KCLL', //TX college station
    'colmar'            : 'LFSC', //   colmar/meyenheim
    'colombo'           : 'VCBI', //   colombo/katunaya
    'colonia'           : 'SUCA', //   colonia sacramen
    'colorado springs'  : 'KCOS', //CO colorado springs
    'columbia mossouri'   : 'KCOU', //MO columbia
    'columbia owens'    : 'KCUB', //SC columbia-owens
    'columbia south carolina'    : 'KCUB', //SC columbia-owens
    'columbia'          : 'KCAE', //SC columbia
    'columbus georgia' : 'KCSG', //GA columbus
    'columbus mississippi': 'KGTR', //MS golden/columbus
    'columbus'          : 'KCMH', //OH columbus
    'comiso'            : 'LICB', //   comiso
    'comodoro'          : 'SAVC', //   comodoro rivadav
    'comox'             : 'CYQQ', //BC comox (can mil)
    'conakry'           : 'GUCY', //   conakry/gbessia
    'concepcion'        : 'SCIE', //   concepcion/carri
    'concord'           : 'KCON', //NH concord
    'concordia'         : 'SAAC', //   concordia/pierre
    'coningsby'         : 'EGXC', //   coningsby raf
    'connaught'         : 'EIKN', //   connaught apt
    'conroe'            : 'KCXO', //TX conroe
    'constable'         : 'BGCO', //   constable point
    'coolangatta'       : 'YBCG', //   coolangatta aws
    'copenhagen'        : 'EKRK',
    'coppermine'        : 'CYCO', //NU coppermine airpo
    'coral harbour'     : 'CYZS', //NU coral harbour ar
    'cordoba'           : 'LEBA', //   cordoba airport
    'cordova'           : 'PACV', //AK cordova
    'cork'              : 'EICK', //   cork arpt/corcai
    'corlu'             : 'LTBU', //   corlu
    'corpus christi'    : 'KNGP', //TX c. christi nas
    'corrientes'        : 'SARC', //   corrientes airpo
    'corumba'           : 'SBCR', //   corumba intl arp
    'cosford'           : 'EGWC', //   cosford raf
    'costa brava'       : 'LEGE', //   gerona/costa bra
    'costa'             : 'KSNA', //CA costa mesa
    'cotonou'           : 'DBBB', //   cotonou/cadjehou
    'coventry'          : 'EGBE', //   coventry airport
    'covington'         : 'KCVG', //KY covington
    'cozumel'           : 'MMCZ', //   cozumel (civ/mil
    'craiova'           : 'LRCV', //   craiova
    'cranbrook'         : 'CYXC', //BC cranbrook
    'cranfield'         : 'EGTC', //   cranfield
    'cranwell'          : 'EGYD', //   cranwell raf
    'creil'             : 'LFPC', //   creil (fafb)
    'crescent city'     : 'KCEC', //CA crescent city
    'crossville'        : 'KCSV', //TN crossville
    'crotone'           : 'LIBC', //   crotone
    'crown'             : 'TTCP', //   crown pt/scarbor
    'cruzeiro'          : 'SBCZ', //   cruzeiro do sul
    'cucuta'            : 'SKCC', //   cucuta/camilo da
    'cuernavaca'        : 'MMCB', //   cuernavaca
    'cuiaba'            : 'SBCY', //   cuiaba/marechal
    'culdrose'          : 'EGDR', //   culdrose (navy)
    'culiacan'          : 'MMCL', //   culiacan (city)
    'curitiba'          : 'SBCT', //   curitiba/afonso
    'curtin'            : 'YCIN', //   curtin/derby
    'cut'               : 'KCTB', //MT cut bank
    'cuzco'             : 'SPZO', //   cuzco/velazco as
    'cylde'             : 'CYCY', //NU cylde airport
    'cypress hills'     : 'CWVP', //SK cypress hills pa
    'da nang'           : 'VVDN', //   da nang intl arp
    'dabolim'           : 'VOGO', //   goa/dabolim (nav
    'daggett'           : 'KDAG', //CA daggett
    'dakar'             : 'GOOY', //   dakar/yoff
    'dakhla'            : 'GMMH', //   dakhla airport
    'dalaman'           : 'LTBS', //   dalaman (commune
    'dalhart'           : 'KDHT', //TX dalhart
    'dalian/dairen/lu'  : 'ZYTL', //   dalian/dairen/lu
    'dallas fort worth' : 'KDFW',
    'dallas love'       : 'KDAL', //TX dallas/love fld
    'dallas'            : 'KDFW', //TX dallas/ft worth
    'damascus'          : 'OSDI', //   damascus (civ/mi
    'danville'          : 'KDAN', //VA danville
    'dar el beida'      : 'DAAG', //   dar-el-beida/hou
    'dar es salaam'     : 'HTDA', //   dar es salaam ar
    'dartowek'          : 'EPDA', //   dartowek naval
    'darwin'            : 'YPDN', //   darwin (civ/mil)
    'dashoguz'          : 'UTAT', //   dashoguz
    'dauphin'           : 'CYDN', //MB dauphin airport
    'davao'             : 'RPMD', //   davao/francisco
    'david'             : 'MPDA', //   david/enrique m
    'davis/tucson'      : 'KDMA', //AZ davis/tucson
    'dawson creek'      : 'CYDQ', //BC dawson creek arp
    'dawson'            : 'CYDA', //YT dawson airport
    'dax/seyresse'      : 'LFBY', //   dax/seyresse
    'dayton'            : 'KDAY', //OH dayton
    'daytona beach'     : 'KDAB', //FL daytona beach
    'daytona'           : 'KDAB', //FL daytona beach
    'de kooy'           : 'EHKD', //   de kooy (navy)
    'deadhorse'         : 'PASC', //AK deadhorse
    'dease lake'        : 'CYDL', //BC dease lake
    'deblin irena'      : 'EPDE', //   deblin-irena
    'debrecen'          : 'LHDC', //   debrecen airport
    'decatur'           : 'KDEC', //IL decatur
    'decimomannu'       : 'LIED', //   decimomannu(it-a
    'deelen'            : 'EHDL', //   deelen rnlafb
    'deer lake'         : 'CYDF', //NL deer lake airpor
    'del bajio'         : 'MMLO', //   del bajio/leon
    'del rio'           : 'KDRT', //TX del rio
    'delhi'             : 'VIDP',
    'delta junctoin'    : 'PABI', //AK delta junction
    'deming'            : 'KDMN', //NM deming
    'denver'            : 'KDEN', //CO denver (dia)
    'depati amir'       : 'WIPK', //   depati amir
    'dera ghazi'        : 'OPDG', //   dera ghazi
    'des moines'        : 'KDSM', //IA des moines
    'desert rock'       : 'KDRA', //NV desert r/mercury
    'desierto atacama'  : 'SCAT', //   desierto atacama
    'detroit city'      : 'KDET', //MI detroit/city air
    'detroit wayne county' : 'KDTW', //MI detroit/wayne
    'detroit willow'    : 'KYIP', //MI detroit/willow
    'detroit'           : 'KDTW',
    'devils lake'       : 'KDVL', //ND devils lake
    'dhahran'           : 'OEDR', //   dhahran intl (mi
    'dhaka'             : 'VGHS', //   dhaka
    'dickinson'         : 'KDIK', //ND dickinson
    'diego garcia'      : 'FJDG', //   diego garcia
    'diepholz'          : 'ETND', //   diepholz (ger-af
    'dilli'             : 'WPDL', //   dilli arpt/timor
    'dillingham'        : 'PADL', //AK dillingham
    'dinard'            : 'LFRD', //   dinard/pleurtuit
    'dire dawa'         : 'HADR', //   dire dawa (mil/c
    'dishforth'         : 'EGXD', //   dishforth raf
    'diyarbakir'        : 'LTCC', //   diyarbakir(civ/a
    'djanet'            : 'DAAJ', //   djanet/tiska
    'djerba'            : 'DTTJ', //   djerba mellita
    'dnipropetrovsk'    : 'UKDD', //   dnipropetrovsk
    'dobbins'           : 'KMGE', //GA dobbins afb/mari
    'dodge city'        : 'KDDC', //KS dodge city
    'doha'              : 'OTBD', //   doha intl airpor
    'dole tavaux'       : 'LFGJ', //   dole tavaux
    'don torcuato'      : 'SADD', //   don torcuato arp
    'donaueschingen'    : 'EDTD', //   donaueschingen
    'doncaster sheffield' : 'EGCN', //   doncaster sheffi
    'doncaster'         : 'EGCN', //   doncaster sheffi
    'donegal'           : 'EIDL', //   donegal arpt
    'donetsk'           : 'UKCC', //   donetsk
    'dortmund/wickede'  : 'EDLW', //   dortmund/wickede
    'dothan'            : 'KDHN', //AL dothan
    'douala'            : 'FKKD', //   douala (civ/mil)
    'double eagle'      : 'KAEG', //NM double eagle ii
    'douglas'           : 'KDUG', //AZ douglas bisbee
    'dover air force base'    : 'KDOV', //DE dover afb
    'dover delaware'    : 'KDOV', //DE dover afb
    'dover'             : 'KDOV', //DE dover afb
    'dresden'           : 'EDDC', //   dresden/klotzsch
    'driggs'            : 'KDIJ', //ID driggs reed mem
    'dryden'            : 'CYHD', //ON dryden airport
    'du bois'           : 'KDUJ', //PA du bois
    'dubai'             : 'OMDB', //   dubai intl airpo
    'dubbo'             : 'YSDU', //   dubbo
    'dubendorf'         : 'LSMD', //   dubendorf
    'dublin'            : 'EIDW', //   dublin airport
    'dubrovnik'         : 'LDDU', //   dubrovnik-cilipi
    'dubuque'           : 'KDBQ', //IA dubuque
    'duesseldorf'       : 'EDDL', //   duesseldorf
    'duke'              : 'KEGI', //FL duke fld/eglin
    'dulles'            : 'KIAD',
    'duluth'            : 'KDLH', //MN duluth
    'dumaguete'         : 'RPVD', //   dumaguete/negros
    'dundee'            : 'EGPN', //   dundee/riverside
    'dupage'            : 'KDPA', //IL chicago/dupage
    'durango mexico'           : 'MMDO', //   durango airport
    'durango'           : 'KDRO', //CO durango
    'durazno'           : 'SUDU', //   durazno/santa be
    'durban'            : 'FALE', //   durban shaka
    'durham'            : 'KRDU',
    'dushanbe'          : 'UTDD', //   dushanbe
    'dutch'             : 'PADU', //AK dutch harbor
    'dyess'             : 'KDYS', //TX dyess afb/abilen
    'dzaoudzi'          : 'FMCZ', //   dzaoudzi/pamanzi
    'eagle county'      : 'KEGE', //CO eagle co. region
    'eareckson'         : 'PASY', //AK eareckson/shemya
    'earlton'           : 'CYXR', //ON earlton airport
    'east london'       : 'FAEL', //   east london/scho
    'east midlands'     : 'EGNX', //   east midlands
    'easter island'     : 'SCIP', //   easter island
    'eau claire'        : 'KEAU', //WI eau claire
    'edinburgh'         : 'EGPH', //   edinburgh airpor
    'edmonton'          : 'CYEG', //AB edmonton intl ar
    'eduardo gomes'     : 'SBEG', //   eduardo gomes in
    'edwards air force base'           : 'KEDW', //CA edwards afb
    'edwards'           : 'KEDW', //CA edwards afb
    'egedesmi'          : 'BGAA', //   aasiaat/egedesmi
    'egilsstadir'       : 'BIEG', //   egilsstadir
    'eglin air force base' : 'KEGI', //FL duke fld/eglin
    'eglin'             : 'KVPS', //FL eglin afb/valpar
    'eglinton/londond'  : 'EGAE', //   eglinton/londond
    'eielson'           : 'PAEI', //AK eielson afb
    'eilat'             : 'LLET', //   elat/j. hozman(a
    'eindhoven'         : 'EHEH', //   eindhoven rnlafb
    'ekaterinburg'      : 'USSS', //   ekaterinburg
    'ekati'             : 'CYOA', //NT ekati (pws)
    'ekofisk'           : 'ENEK', //   ekofisk oil pltf
    'el arish'          : 'HEAR', //   el arish
    'el bayadh'         : 'DAOY', //   el bayadh
    'el beida'          : 'HLLQ', //   el beida
    'el borma'          : 'DTTR', //   el borma
    'el catey'          : 'MDCY', //   el catey intl
    'el centro'         : 'KNJK', //CA el centro naf
    'el dorado'         : 'KELD', //AR el dorado
    'el golea'          : 'DAUE', //   el golea
    'el obeid'          : 'HSOB', //   el obeid
    'el oued'           : 'DAUO', //   el oued/guemer
    'el paso'           : 'KELP',
    'el salvador'       : 'MSLP', //   el salvador int
    'el tari'           : 'WATT', //   el tari
    'el tor'            : 'HETR', //   el tor
    'el turbio'         : 'SAWT', //   el turbio/rio tu
    'elazig'            : 'LTCA', //   elazig (civ/mil)
    'eldoret'           : 'HKEL', //   eldoret
    'elefsis'           : 'LGEL', //   elefsis (hel-afb
    'elista'            : 'URWI', //   elista
    'elizabeth city'    : 'KECG', //NC elizabeth city
    'elkins'            : 'KEKN', //WV elkins
    'elko'              : 'KEKO', //NV elko
    'elliot lake'       : 'CYEL', //ON elliot lake (saw
    'ellsworth air force base' : 'KRCA', //SD ellsworth afb
    'ellsworth'         : 'KRCA', //SD ellsworth afb
    'elmendorf air force base' : 'PAED', //AK elmendorf afb
    'elmendorf'         : 'PAED', //AK elmendorf afb
    'elmira'            : 'KELM', //NY elmira
    'elsenborn'         : 'EBLB', //   elsenborn (mil)
    'ely'               : 'KELY', //NV ely
    'emmen'             : 'LSME', //   emmen
    'enarotali'         : 'WABT', //   enarotali
    'encarnacion'       : 'SGEN', //   encarnacion
    'enfidha'           : 'DTNH', //   enfidha
    'enid'              : 'KEND', //OK enid/vance afb
    'ennis'             : 'KEKS', //MT ennis big sky
    'ennstal'           : 'LOXA', //   aigen/ennstal (m
    'enontekio'         : 'EFET', //   enontekio
    'entebbe'           : 'HUEN', //   entebbe intl arp
    'enugu'             : 'DNEN', //   enugu
    'ephrata'           : 'KEPH', //WA ephrata
    'erbil'             : 'ORER', //   erbil intl
    'ercan'             : 'LCEN', //   ercan
    'erding'            : 'ETSE', //   erding (ger-afb)
    'erfurt'            : 'EDDE', //   erfurt/bindersle
    'erie'              : 'KERI', //PA erie
    'ermelo'            : 'FAEO', //   ermelo
    'eros'              : 'FYWE', //   eros airport
    'erzincan'          : 'LTCD', //   erzincan
    'erzurum'           : 'LTCE', //   erzurum (civ/mil
    'esbjerg'           : 'EKEB', //   esbjerg
    'esfahan'           : 'OIFM', //   esfahan s b intl
    'eskisehir'         : 'LTBI', //   eskisehir (tur-a
    'essaouira'         : 'GMMI', //   essaouira
    'estevan'           : 'CYEN', //SK estevan airport
    'eugene'            : 'KEUG', //OR eugene
    'eureka nanavut'    : 'CYEU', //NU eureka
    'eureka'            : 'KACV', //CA arcata/eureka
    'evanston'          : 'KEVW', //WY evanston
    'evansville'        : 'KEVV', //IN evansville
    'evenes'            : 'ENEV', //   evenes (civ/mil)
    'everett'           : 'KPAE', //WA everett
    'evreux'            : 'LFOE', //   evreux/fauville
    'exeter'            : 'EGTE', //   exeter airport
    'fagernes'          : 'ENFG', //   fagernes/leirin
    'fairbanks alaska'  : 'PAFA', //AK fairbanks
    'fairbanks'         : 'PAFA', //AK fairbanks
    'fairchild'         : 'KSKA', //WA fairchild afb
    'fairford'          : 'EGVA', //   fairford raf
    'faisalabad'        : 'OPFA', //   faisalabad intl
    'faizabad'          : 'OAFZ', //   faizabad
    'fak fak'           : 'WASF', //   fak-fak/torea
    'falconara'         : 'LIPY', //   falconara (it-af
    'faleolo'           : 'NSFA', //   faleolo int/apia
    'fallon'            : 'KNFL', //NV fallon nas
    'falmouth'          : 'KFMH', //MA falmouth/otis ab
    'fargo'             : 'KFAR', //ND fargo
    'farmington'        : 'KFMN', //NM farmington
    'farnborough'       : 'EGLF', //   farnborough
    'faro'              : 'LPFR', //   faro
    'fassberg'          : 'ETHS', //   fassberg (ger-af
    'fayetteville north carolina'      : 'KFAY', //NC fayetteville
    'fayetteville'      : 'KFYV', //AR fayetteville
    'feng nin'          : 'RCFN', //   feng nin tw-afb
    'fergana'           : 'UTFF', //   fergana
    'fernando'          : 'SBFN', //   fernando de noro
    'ferrara'           : 'LIPF', //   ferrara (aut)
    'fes sais'          : 'GMFF', //   fes-sais
    'feyzabad'          : 'EQBF', //   feyzabad
    'figari'            : 'LFKF', //   figari (aut)
    'filton'            : 'EGTG', //   filton (private)
    'findlay'           : 'KFDY', //OH findlay
    'firenze'           : 'LIRQ', //   firenze/peretola
    'flag citty'        : 'KFBC', //OH flag city
    'flagstaff'         : 'KFLG', //AZ flagstaff
    'flint'             : 'KFNT', //MI flint
    'florence'          : 'KFLO', //SC florence
    'florennes'         : 'EBFS', //   florennes (bel-a
    'flores'            : 'MGFL', //   flores/santa el
    'florianopolis'     : 'SBFL', //   florianopolis ar
    'floro'             : 'ENFL', //   floro
    'foggia'            : 'LIBF', //   foggia/gino lisa
    'forde'             : 'ENBL', //   forde/bringeland
    'forli'             : 'LIPK', //   forli (civ/it-af
    'formosa'           : 'SARF', //   formosa airport
    'forrest'           : 'YFRT', //   forrest
    'fort belvoir'      : 'KDAA', //VA fort belvoir/dav
    'fort benning'      : 'KLSF', //GA ft benning/colum
    'fort bliss'        : 'KBIF', //TX fort bliss
    'fort bragg'        : 'KFBG', //NC fort bragg/simmo
    'fort carson'       : 'KFCS', //CO fort carson
    'fort chipewyan'    : 'CYPY', //AB fort chipewyan a
    'fort dauphin'      : 'FMSD', //   ft. dauphin/tola
    'fort dodge'        : 'KFOD', //IA fort dodge
    'fort drum'         : 'KGTB', //NY fort drum/wheele
    'fort eustis'       : 'KFAF', //VA ft eustis/felker
    'fort franklin'     : 'CYWJ', //NT fort franklin ar
    'fort good hope'    : 'CYGH', //NT fort good hope a
    'fort hood'         : 'KGRK', //TX gray/ft hood
    'fort huachuca'     : 'KFHU', //AZ fort huachuca
    'fort knox'         : 'KFTK', //KY fort knox/godman
    'fort lauderdale'   : 'KFLL',
    'fort lewis'        : 'KGRF', //WA fort lewis/gray
    'fort mcmurray'     : 'CYMM', //AB fort mcmurray ar
    'fort mcpherson'    : 'CZFM', //NT fort mcpherson a
    'fort myers'        : 'KFMY', //FL fort myers
    'fort nelson'       : 'CYYE', //BC fort nelson airp
    'fort pierce'       : 'KFPR', //FL fort pierce
    'fort polk'         : 'KPOE', //LA fort polk fr
    'fort rileyt'       : 'KFRI', //KS ft riley/marshal
    'fort saint john'     : 'CYXJ', //BC fort st. john ar
    'fort simpson'      : 'CYFS', //NT fort simpson arp
    'fort smith'        : 'CYSM', //NT fort smith airpo
    'fort still'        : 'KFSI', //OK fort sill
    'fort stockton'     : 'KFST', //TX fort stockton
    'fort wainwright'   : 'PAFB', //AK fort wainwright
    'fort wayne'        : 'KFWA', //IN fort wayne
    'fort worth'        : 'KDFW', //TX dallas/ft worth
    'fortaleza'         : 'SBFZ', //   fortaleza/pinto
    'foz go iguacu'     : 'SBFI', //   foz do iguacu ar
    'franceville'       : 'FOON', //   franceville/mven
    'francistown'       : 'FBFT', //   francistown
    'frankfurt'         : 'EDDF', //   frankfurt main a
    'franklin'          : 'KFKL', //PA franklin
    'fredericton'       : 'CYFC', //NB fredericton airp
    'freeport'          : 'MYGF', //   freeport intl a
    'freetown'          : 'GFLL', //   freetown/lungi
    'frejorgues'        : 'LFMT', //   frejorgues/montp
    'frenchville'       : 'KFVE', //ME frenchville
    'fresno'            : 'KFAT', //CA fresno
    'friedrichshafen'   : 'EDNY', //   friedrichshafen
    'fritzlar'          : 'ETHF', //   fritzlar (ger-ar
    'frobisher'         : 'CYFB', //NU frobisher/iqalui
    'frosinone'         : 'LIRH', //   frosinone (it-af
    'fua amotu'         : 'NFTF', //   fua amotu tonga
    'fuerteventura'     : 'GCFV', //   fuerteventura ar
    'fujairah'          : 'OMFJ', //   fujairah intl ar
    'fukuoka'           : 'RJFF', //   fukuoka/itazuke
    'fukushima'         : 'RJSF', //   fukushima arpt
    'funafuti'          : 'NGFU', //   funafuti tuvalu
    'funchal'           : 'LPMA', //   funchal/madeira
    'futenma'           : 'ROTM', //   futenma(us-mcas)
    'futuna'            : 'NLWF', //   futuna isl/maopo
    'fuzhou'            : 'ZSFZ', //   fuzhou
    'gabes'             : 'DTTG', //   gabes
    'gafsa'             : 'DTTF', //   gafsa
    'gage'              : 'KGAG', //OK gage
    'gagetown'          : 'CYCX', //NB gagetown  (can m
    'gainesville'       : 'KGNV', //FL gainesville
    'galeao'            : 'SBGL', //   galeao/rio(civ/m
    'galela'            : 'WAMA', //   galela/gamarmala
    'galena'            : 'PAGA', //AK galena
    'gallivare'         : 'ESNG', //   gallivare (priva
    'gallup'            : 'KGUP', //NM gallup
    'galveston'         : 'KGLS', //TX galveston
    'gamarmala'         : 'WAMA', //   galela/gamarmala
    'gan'               : 'VRMG', //   gan intl airport
    'gander'            : 'CYQX', //NL gander intl airp
    'gao'               : 'GAGO', //   gao (civ/mil)
    'garden city'       : 'KGCK', //KS garden city
    'garoua'            : 'FKKR', //   garoua
    'gary'              : 'KGYY', //IN gary regional
    'gaspe'             : 'CYGP', //QC gaspe airport
    'gassim'            : 'OEGS', //   gassim
    'gatineau'          : 'CYND', //QC gatineau airport
    'gatwick'           : 'EGKK',
    'gaziantep'         : 'LTAJ', //   gaziantep
    'gazipasa'          : 'LTFG', //   gazipasa
    'gbessia'           : 'GUCY', //   conakry/gbessia
    'gdansk'            : 'EPGD', //   gdansk/rebiechow
    'gdynia-babie'      : 'EPOK', //   gdynia-babie do
    'gecitkale'         : 'LCGK', //   gecitkale
    'geilenkirchen'     : 'ETNG', //   geilenkirchen(na
    'gen santos'        : 'RPMR', //   gen santos
    'geneva'            : 'LSGG', //   geneva/cointrin
    'genova'            : 'LIMJ', //   genova/sestri
    'george'            : 'FAGG', //   george/p. w. bot
    'georgetown'        : 'SYGT', //   georgetown
    'geraldton'         : 'CYGQ', //ON geraldton airpor
    'gerona'            : 'LEGE', //   gerona/costa bra
    'gerrard smith'     : 'MWCB', //   gerrard smith
    'ghadames'          : 'HLTD', //   ghadames
    'ghanzi'            : 'FBGZ', //   ghanzi
    'ghardaia'          : 'DAUG', //   ghardaia/noumera
    'ghat'              : 'HLGT', //   ghat
    'ghedi'             : 'LIPL', //   ghedi (it-afb)
    'gibraltar'         : 'LXGB', //   gibraltar (civ/m
    'giebelstadt'       : 'ETEU', //   giebelstadt(usa-
    'gillam'            : 'CYGX', //MB gillam airport
    'gillette'          : 'KGCC', //WY gillette
    'gilze-rijen'       : 'EHGR', //   gilze-rijen rnla
    'gioia del colle'   : 'LIBV', //   gioia del colle
    'gizan'             : 'OEGN', //   gizan
    'gjoa'              : 'CYHK', //NU gjoa haven airpo
    'glasgow'           : 'EGPF', //   glasgow airport
    'glendive'          : 'KGDV', //MT glendive
    'glens'             : 'KGFL', //NY glens falls
    'godthab'           : 'BGGH', //   godthab (port)
    'goiania'           : 'SBGO', //   goiania/santa ge
    'gokceada'          : 'LTFK', //   gokceada
    'golden mississippi'  : 'KGTR', //MS golden/columbus
    'golden rocks'      : 'TKPK', //   golden rocks/nev
    'goldsboro'         : 'KGSB', //NC goldsboro/s. j.
    'gomel'             : 'UMGG', //   gomel
    'goodland'          : 'KGLD', //KS goodland
    'goose bay'         : 'CYYR', //NL goose bay airpor
    'gore bay'          : 'CYZE', //ON gore bay airport
    'gorgan'            : 'OING', //   gorgan
    'gorna'             : 'LBGO', //   gorna orechovist
    'goroka'            : 'AYGA', //   goroka
    'gorontalo'         : 'WAMG', //   gorontalo/jalal
    'goteborg'          : 'ESGP', //   goteborg/save (a
    'gove'              : 'YPGV', //   gove airport
    'graf ignatievo'    : 'LBPG', //   graf ignatievo
    'grafenwoehr'       : 'ETIC', //   grafenwoehr
    'granada'           : 'LEGR', //   granada airport
    'grand bahama'      : 'MYGF', //   freeport intl a
    'grand canyon'      : 'KGCN', //AZ grand canyon
    'grand cayman'      : 'MWCR', //   grnd cayman/owen
    'grand forks'       : 'KGFK', //ND grand forks
    'grand island'      : 'KGRI', //NE grand island
    'grand junction'    : 'KGJT', //CO grand junction
    'grand rapids'      : 'KGRR', //MI grand rapids
    'grande praire'     : 'CYQU', //AB grande praire ar
    'grantley'          : 'TBPB', //   grantley adams
    'graz'              : 'LOWG', //   graz (mil/civ)
    'grazzanise'        : 'LIRM', //   grazzanise (it-a
    'great bend'        : 'KGBD', //KS great bend
    'great fails'       : 'KGTF', //MT great falls
    'great yarmouth'    : 'EGSD', //   great yarmouth
    'green island'      : 'RCGI', //   green island
    'greensboro'        : 'KGSO', //NC greensboro
    'greenville'        : 'KGMU', //SC greenville
    'greenwood'         : 'KGWO', //MS greenwood
    'greer'             : 'KGSP', //SC greer/spartansbg
    'grenchen'          : 'LSZG', //   grenchen
    'grenoble'          : 'LFLS', //   grenoble/st. geo
    'grissom'           : 'KGUS', //IN grissom afb/peru
    'grodno'            : 'UMMG', //   grodno
    'groningen'         : 'EHGG', //   groningen/eelde
    'grootfontein'      : 'FYGF', //   grootfontein
    'grosseto'          : 'LIRS', //   grosseto (it-afb
    'groton'            : 'KGON', //CT groton/new londo
    'grottaglie'        : 'LIBG', //   grottaglie(civ/a
    'grozny'            : 'URMG', //   grozny
    'guadalajara'       : 'MMGL', //   guadalajara
    'guangzhou'         : 'ZGGG', //   guangzhou/baiyun
    'guantanamo bay'   : 'MUGM', //   guantanamo bay
    'guarany'           : 'SGES', //   guarany
    'guaratingueta'     : 'SBGW', //   guaratingueta (m
    'guarulhos'         : 'SBGR', //   guarulhos (civ/m
    'guatemala/la'      : 'MGGT', //   guatemala/la au
    'guayaquil'         : 'SEGU', //   guayaquil/simon
    'guaymas'           : 'MMGM', //   guaymas intl arp
    'guernsey'          : 'EGJB', //   guernsey airport
    'guetersloh'        : 'ETUO', //   guetersloh (raf)
    'guidonia'          : 'LIRG', //   guidonia (it-afb
    'guilin'            : 'ZGKL', //   guilin
    'guiyang'           : 'ZUGY', //   guiyang
    'gulfport'          : 'KGPT', //MS gulfport
    'gulkana'           : 'PAGK', //AK gulkana
    'gullfax'           : 'ENGC', //   gullfax (platfor
    'gunnison'          : 'KGUC', //CO gunnison
    'guriat'            : 'OEGT', //   guriat
    'gustavus'          : 'PAGS', //AK gustavus
    'guymon'            : 'KGUY', //OK guymon
    'gwadar'            : 'OPGD', //   gwadar
    'gwalior'           : 'VIGR', //   gwalior (in-afb)
    'gwangju'           : 'RKJJ', //   gwangju (kor-afb
    'gweru thornhill'   : 'FVTL', //   gweru/thornhill
    'gwinn'             : 'KSAW', //MI gwinn/sawyer
    'gyandzha'          : 'UBBG', //   gyandzha
    'gyor'              : 'LHPR', //   gyor
    'habib bouruguiba'  : 'DTMB', //   habib bourguiba
    'hae mi'            : 'RKTP', //   hae mi
    'hafr al batin'     : 'OEPA', //   hafr al-batin ar
    'hagshult'          : 'ESMV', //   hagshult (swe-af
    'hahn'              : 'EDFH', //   hahn
    'haifa'             : 'LLHA', //   haifa (isr-afb)
    'haikou'            : 'ZJHK', //   haikou
    'hail'              : 'OEHL', //   hail
    'hailey'            : 'KSUN', //ID hailey/friedman
    'sun valley'        : 'KSUN', //ID hailey/friedman
    'haines'            : 'PAHN', //AK haines
    'hakodate'          : 'RJCH', //   hakodate airport
    'halifax'           : 'CYHZ', //NS halifax intl arp
    'halim perdanakus'  : 'WIHH', //   halim perdanakus
    'halim'             : 'WIIH', //   halim intl(civ/m
    'hall beach'        : 'CYUX', //NU hall beach airpo
    'halli'             : 'EFHA', //   halli (fin-afb)
    'halmstad'          : 'ESMT', //   halmstad (swe-af
//    'hamburg'           : 'EDHI', //   hamburg/finkenwe
    'hamburg'           : 'EDDH', //   hamburg/fuhlsbut
    'hamilton island'   : 'YBHM', //   hamilton island
    'hamilton'          : 'CYHM', //ON hamilton airport
    'hammerfest'        : 'ENHF', //   hammerfest
    'hammond'           : 'KHDC', //LA hammond
    'hanau'             : 'ETID', //   hanau (usa-af)
    'hancock'           : 'KCMX', //MI hancock
    'hanford'           : 'KHNX', //CA hanford/san joaq
    'hang nadim'        : 'WIDD', //   hang nadim
    'hangzhou'          : 'ZSHC', //   hangzhou/jianqia
    'hannover'          : 'EDDV', //   hannover
    'hanoi'             : 'VVNB', //   hanoi/noibai int
    'harare'            : 'FVHA', //   harare/kutsaga(m
    'harbin'            : 'ZYHB', //   harbin
    'harlingen'         : 'KHRL', //TX harlingen
    'harrisburg'        : 'KHIA',
    'harrison'          : 'KHRO', //AR harrison
    'hartford'          : 'KBDL',
    'hasanuddin'        : 'WAAA', //   hasanuddin/ujung
    'hassi messaoud'    : 'DAUH', //   hassi-messaoud/i
    'hat yai'           : 'VTSS', //   hat yai
    'hatay'             : 'LTDA', //   hatay airport
    'hato'              : 'TNCC', //   hato air curacao
    'curacao'           : 'TNCC', //   hato air curacao
    'hattiesburg'       : 'KHBG', //MS hattiesburg
    'haugesund'         : 'ENHD', //   haugesund/karmoy
    'havana'            : 'MUHA', //   havana/jose mar
    'havre saint pierre': 'CYGV', //QC havre st pierre
    'havre'             : 'KHVR', //MT havre
    'hawarden'          : 'EGNR', //   hawarden (aut)
    'hay river'         : 'CYHY', //NT hay river airpor
    'hayden'            : 'KHDN', //CO hayden/yampa
    'hays'              : 'KHYS', //KS hays muni
    'hayward wisconsin' : 'KHYR', //WI hayward
    'hayward california': 'KHWD', //CA hayward
    'hayward'           : 'KHWD', //CA hayward
    'heathrow'          : 'EGLL',
    'heber'             : 'K36U', //UT heber/russ mcdon
    'hefei'             : 'ZSOF', //   hefei/xingiao
    'xingiao'           : 'ZSOF', //   hefei/xingiao
    'heidrun'           : 'ENHE', //   heidrun
    'heimdal'           : 'ENHM', //   heimdal oilp
    'helena'            : 'KHLN', //MT helena
    'helsinki'          : 'EFHK',
//    'helsinki/malmi'    : 'EFHF', //   helsinki/malmi
//    'helsinki/vantaa'   : 'EFHK', //   helsinki/vantaa
    'hemavan'           : 'ESUT', //   hemavan
    'hengchun'          : 'RCKW', //   hengchun
    'henties'           : 'FYGN', //   henties bay
    'herat'             : 'OAHR', //   herat
    'heringsdorf'       : 'EDAH', //   heringsdorf
    'hermosillo'        : 'MMHO', //   hermosillo intl
    'herrera'           : 'MDHE', //   herrera
    'hewanorra'         : 'TLPL', //   hewanorra intl
    'hibbing'           : 'KHIB', //MN hibbing
    'hickam'            : 'PHIK', //HI hickam afb
    'hickory'           : 'KHKY', //NC hickory
    'hierro'            : 'GCHI', //   hierro airport
    'high level'        : 'CYOJ', //AB high level airpo
    'hihifo'            : 'NLWW', //   hihifo ile walli
    'hill'              : 'KHIF', //UT hill afb/ogden
    'hillsboro'         : 'KHIO', //OR hillsboro/portld
    'hilo'              : 'PHTO', //HI hilo
    'hiroshima'         : 'RJOA', //   new hiroshima
    'hjardarnes'        : 'BIHN', //   hjardarnes/horna
    'ho chi minh'       : 'VVTS', //   ho chi minh/tans
    'ho chi minh city'  : 'VVTS', //   ho chi minh/tans
    'hobart'            : 'KHBR', //OK hobart
    'hobart tasmania'   : 'KHBR', // austr
    'tasmania'          : 'YMHB', //   hobart/tasmania
    'hobbs'             : 'KHOB', //NM hobbs/lea co.
    'hobby'             : 'KHOU',
    'houston hobby'     : 'KHOU',
    'hodeidah'          : 'OYHD', //   hodeidah
    'hoedspruit'        : 'FAHS', //   hoedspruit (saaf
    'hof'               : 'EDQM', //   hof
    'hohenems'          : 'LOIH', //   hohenems-dornbir
    'hohenfels'         : 'EDIH', //   hohenfels (usaf)
    'hohn'              : 'ETNH', //   hohn (ger-afb)
    'holguin'           : 'MUHG', //   holguin (civ/mil
    'holloman'          : 'KHMN', //NM holloman afb
    'holman island'     : 'CYHI', //NT holman island ar
    'holzdorf'          : 'ETSH', //   holzdorf
    'homer'             : 'PAHO', //AK homer
    'homestead'         : 'KHST', //FL homestead afb
    'hon'               : 'HLON', //   hon
    'hong kong'         : 'VHHH',
    'hong'              : 'VHHH', //   hong kong intl
    'honiara'           : 'AGGH', //   honiara/henderso
    'honolulu'          : 'PHNL', //HI honolulu
    'hopkinsville'      : 'KHOP', //KY hopkinsville
    'hoquiam'           : 'KHQM', //WA hoquiam
    'horn island'       : 'YHID', //   horn island
    'horta/faial'       : 'LPHR', //   horta/faial isla
    'hot springs'       : 'KHOT', //AR hot springs
    'houlton'           : 'KHUL', //ME houlton
    'houma'             : 'KHUM', //LA houma terrebonne
    'houston'           : 'KIAH',
    'houston/ellingto'  : 'KEFD', //TX houston/ellingto
    'houston/hobby'     : 'KHOU', //TX houston/hobby
    'houston/intnl'     : 'KIAH', //TX houston/intnl
    'houston/sugar'     : 'KSGR', //TX houston/sugar la
    'howard air force base'            : 'MPHO', //   howard afb
    'howard'            : 'MPHO', //   howard afb
    'hua hin'               : 'VTPH', //   hua hin
    'huambo'            : 'FNHU', //   huambo/nova lisb
    'huanghua'          : 'ZGHA', //   huanghua/changsh
    'huanuco'           : 'SPNC', //   huanuco/alferez
    'phubai'            : 'VVPB', //   hue/phubai
    'hue'               : 'VVPB', //   hue/phubai
    'huehuetenango'     : 'MGHT', //   huehuetenango
    'huesca pirineos'   : 'LEHC', //   huesca-pirineos
    'huhhot'            : 'ZBHH', //   huhhot
    'humberside'        : 'EGNJ', //   humberside
    'huntington'        : 'KHTS', //WV huntington
    'huntsville texas'  : 'KUTS', //TX huntsville
    'huntsville'        : 'KHSV', //AL huntsville
    'hurguada'          : 'HEGN', //   hurguada
    'hurlburt'          : 'KHRT', //FL hurlburt field
    'huron'             : 'KHON', //SD huron
    'hutchinson'        : 'KHUT', //KS hutchinson
    'hwange'            : 'FVWN', //   hwange natl. par
    'hyakuri'           : 'RJAH', //   hyakuri (jasdf)
    'hyannis'           : 'KHYA', //MA hyannis
    'hyderabad'         : 'VOHY', //   hyderabad (civ/m
    'hyeres'            : 'LFTH', //   hyeres/le palyve

// ------
// -- only gotten through here so far
// ------

    'iasi'              : 'LRIA', //   iasi
    'ibadan'            : 'DNIB', //   ibadan
    'ibiza'             : 'LEIB', //   ibiza/es codola
    'idaho falls'       : 'KIDA', //ID idaho falls
    'igarka'            : 'UOII', //   igarka
    'igdir'             : 'LTCT', //   igdir
    'igloolik'          : 'CYGT', //NU igloolik airport
    'iguazu/cataratas'  : 'SARI', //   iguazu/cataratas
    'ilam'              : 'OICI', //   ilam airport
    'iles'              : 'CYGR', //QC iles de la madel
    'ilheus'            : 'SBIL', //   ilheus airport
    'iliamna'           : 'PAIL', //AK iliamna
    'illesheim'         : 'ETIK', //   illesheim (usa-a
    'illizi/illirane'   : 'DAAP', //   illizi/illirane
    'ilo'               : 'SPLO', //   ilo
    'iloilo/panay'      : 'RPVI', //   iloilo/panay isl
    'ilopango/s.salv'   : 'MSSS', //   ilopango/s.salv
    'ilorin'            : 'DNIL', //   ilorin
    'imam'              : 'OIIE', //   imam khomeini
    'imperatrize'       : 'SBIZ', //   imperatrize
    'imperial'          : 'KIPL', //CA imperial
    'in amenas'         : 'DAUZ', //   in amenas/zarzai
    'in salah'          : 'DAUI', //   in salah north
    'incirlik'          : 'LTAG', //   adana/incirlik a
    'indian mountain'   : 'PAIM', //AK indian mountain
    'indian springs'    : 'KINS', //NV indian springs
    'indianapolis'      : 'KIND', //IN indianapolis
    'indira'            : 'VIDP', //   indira gandhi/de
    'indore'            : 'VAID', //   indore
    'ingolstadt(ger-m'  : 'ETSI', //   ingolstadt(ger-m
    'inhambane'         : 'FQIN', //   inhambane
    'innsbruck'         : 'LOWI', //   innsbruck airpor
    'inowroclaw'        : 'EPIR', //   inowroclaw inowr
    'interntnl'         : 'KINL', //MN interntnl falls
    'inukjuak'          : 'CYPH', //QC inukjuak
    'inuvik'            : 'CYEV', //NT inuvik airport
    'inverness/dalcro'  : 'EGPE', //   inverness/dalcro
    'ioannina'          : 'LGIO', //   ioannina
    'ioannis'           : 'LGKR', //   ioannis kapodist
    'ipoh'              : 'WMKI', //   ipoh
    'iquique/diego'     : 'SCDA', //   iquique/diego ar
    'iquitos/secada'    : 'SPQT', //   iquitos/secada
    'iraklion'          : 'LGIR', //   iraklion (civ/af
    'irkutsk'           : 'UIII', //   irkutsk
    'ironwood'          : 'KIWD', //MI ironwood
    'isafjorour'        : 'BIIS', //   isafjorour
    'ishigakijima'      : 'ROIG', //   ishigakijima isl
    'islamabad'         : 'OPRN', //   islamabad (civ/m
    'island'            : 'CYIV', //MB island lake airp
    'islay/port'        : 'EGPI', //   islay/port ellen
    'isle'              : 'EGNS', //   isle of man/rona
    'islip'             : 'KISP', //NY islip
    'istanbul'          : 'LTBA',
    'istanbul/ataturk'  : 'LTBA', //   istanbul/ataturk
    'istrana'           : 'LIPS', //   istrana (it-afb)
    'istres/le'         : 'LFMI', //   istres/le tube f
    'itaituba'          : 'SBIH', //   itaituba
    'ithaca/tompkins'   : 'KITH', //NY ithaca/tompkins
    'ivalo'             : 'EFIV', //   ivalo
    'ivano-frankivsk'   : 'UKLI', //   ivano-frankivsk
    'ivanovo'           : 'UUBI', //   ivanovo south
    'ivujivik'          : 'CYIK', //QC ivujivik arpt(sa
    'iwakuni'           : 'RJOI', //   iwakuni mcas
    'ixtapa'            : 'MMZH', //   ixtapa zihuatane
    'izmir/adnan'       : 'LTBJ', //   izmir/adnan mend
    'izmir/cigli(cv/a'  : 'LTBL', //   izmir/cigli(cv/a
    'izmir/kaklic'      : 'LTFA', //   izmir/kaklic
    'izumo'             : 'RJOC', //   izumo airport
    'jabalpur'          : 'VAJB', //   jabalpur
    'jackson tennessee'           : 'KMKL', //TN jackson
    'jackson wyoming'           : 'KJAC', //WY jackson
    'jackson'           : 'KJAN', //MS jackson
    'jackson/hawkins'   : 'KHKS', //MS jackson/hawkins
    'jackson/reynolds'  : 'KJXN', //MI jackson/reynolds
    'jacksonvil/cecil'  : 'KVQQ', //FL jacksonvil/cecil
    'jacksonvil/craig'  : 'KCRG', //FL jacksonvil/craig
    'jacksonville north carolina'      : 'KOAJ', //NC jacksonville
    'jacksonville'      : 'KJAX', //FL jacksonville
    'jaipur'            : 'VIJP', //   jaipur/sanganer
    'jakobshavn'        : 'BGJN', //   jakobshavn (port
    'jambi/sultan'      : 'WIPA', //   jambi/sultan tah
    'jamestown'         : 'KJHW', //NY jamestown
    'jamnagar'          : 'VAJM', //   jamnagar (in-afb
    'jandakot'          : 'YPJT', //   jandakot
    'jauja'             : 'SPJJ', //   jauja
    'jayapura/sentani'  : 'WAJJ', //   jayapura/sentani
    'jeddah'            : 'OEJD', //   jeddah
    'jeddah/king'       : 'OEJN', //   jeddah/king abdu
    'jefferson country' : 'KBJC', //CO broomfield/jeffc
    'jeju'              : 'RKPC', //   jeju intl airpo
    'jerez'             : 'LEJR', //   jerez (civ/mil)
    'jerome'            : 'KJER', //ID jerome county
    'jersey'            : 'EGJJ', //   jersey airport
    'jerusalem/atarot'  : 'LLJR', //   jerusalem/atarot
    'jever'             : 'ETNJ', //   jever (ger-afb)
    'jfk'               : 'KJFK', //NY nyc/jfk arpt
    'jijel/taher'       : 'DAAV', //   jijel/taher
    'jinan'             : 'ZSJN', //   jinan yaoqiang
    'jinotega'          : 'MNJG', //   jinotega
    'joao'              : 'SBJP', //   joao pessoa/pres
    'joensuu'           : 'EFJO', //   joensuu
    'johan'             : 'SMJP', //   johan a. pengel
    'johannesburg/tam'  : 'FAOR', //   johannesburg/tam
    'john wayne'        : 'KSNA',
    'john'              : 'TRPG', //   john osborne apt
    'johnston'          : 'PJON', //UM johnston island
    'johnstown'         : 'KJST', //PA johnstown
    'johore'            : 'WMKJ', //   johore bharu/sen
    'joinville'         : 'SBJV', //   joinville
    'jonesboro'         : 'KJBR', //AR jonesboro
    'jongju'            : 'RKTU', //   jongju (kafb-ar
    'jonkoping'         : 'ESGJ', //   jonkoping airpor
    'joplin'            : 'KJLN', //MO joplin
    'jos'               : 'DNJO', //   jos
    'juan'              : 'MROC', //   juan santamaria
    'juanda'            : 'WARR', //   juanda
    'juanjui'           : 'SPJI', //   juanjui
    'juba'              : 'HSSJ', //   juba
    'jujuy'             : 'SASJ', //   jujuy airport
    'juliaca'           : 'SPJL', //   juliaca
    'junction'          : 'KJCT', //TX junction
    'juneau'            : 'PAJN', //AK juneau
    'juwata'            : 'WAQQ', //   juwata
    'juzno-sahalinsk'   : 'UHSS', //   juzno-sahalinsk
    'jyvaskyla'         : 'EFJY', //   jyvaskyla (mil/c
    'kabul'             : 'OAKB', //   kabul intl (mil)
    'kadala'            : 'UIAA', //   cita/kadala
    'kadena'            : 'RODN', //   kadena (usafb-na
    'kaduna'            : 'DNKA', //   kaduna (civ/mil)
    'kagoshima'         : 'RJFK', //   kagoshima airpor
    'kahramanmaras'     : 'LTCN', //   kahramanmaras
    'kahului'           : 'PHOG', //HI kahului
    'kailua/kona'       : 'PHKO', //HI kailua/kona
    'kaimana/utarom'    : 'WASK', //   kaimana/utarom
    'kajaani'           : 'EFKI', //   kajaani
    'kalaeloa'          : 'PHJR', //HI kalaeloa
    'kalamata'          : 'LGKL', //   kalamata (hel-af
    'kalamazoo'         : 'KAZO', //MI kalamazoo
    'kalgoorlie/bould'  : 'YPKG', //   kalgoorlie/bould
    'kalinin/migalovo'  : 'UUEM', //   kalinin/migalovo
    'kaliningrad'       : 'UMKK', //   kaliningrad
    'kalispell'         : 'KFCA', //MT kalispell
    'kalkar'            : 'ETGY', //   kalkar (mil comm
    'kallax/lulea'      : 'ESPA', //   kallax/lulea (af
    'kalmar'            : 'ESMQ', //   kalmar
    'kamarang'          : 'SYKM', //   kamarang
    'kamembe'           : 'HRZA', //   kamembe
    'kamishli'          : 'OSKL', //   kamishli
    'kamloops'          : 'CYKA', //BC kamloops airport
    'kamuzu'            : 'FWKI', //   kamuzu intl airp
    'kandahar'          : 'OAKN', //   kandahar intl ar
    'kaneohe'           : 'PHNG', //HI kaneohe mcas
    'kangnung'          : 'RKNN', //   kangnung (kor-af
    'kano/mallam'       : 'DNKN', //   kano/mallam amin
    'kansai'            : 'RJBB', //   kansai intl
    'kansas city'       : 'KMCI', //MO kansas city/intl
    'kaohsiung'         : 'RCKH', //   kaohsiung intl
    'kapuskasing'       : 'CYYU', //ON kapuskasing airp
    'karachi'           : 'OPKC', //   karachi intl arp
    'karaganda'         : 'UAKK', //   karaganda
    'karaj/payam'       : 'OIIP', //   karaj/payam
    'kardla'            : 'EEKA', //   kardla
    'kariba'            : 'FVKB', //   kariba
    'karlovy'           : 'LKKV', //   karlovy vary
    'karlsruhe/baden'   : 'EDSB', //   karlsruhe/baden
    'karlstad'          : 'ESOK', //   karlstad north
    'karpathos'         : 'LGKP', //   karpathos
    'kars'              : 'LTCF', //   kars
    'karshi'            : 'UTSK', //   karshi khanabad
    'karup'             : 'EKKA', //   karup (dan-afb)
    'kasama'            : 'FLKS', //   kasama
    'kasane'            : 'FBKE', //   kasane
    'kashi'             : 'ZWSH', //   kashi
    'kassala'           : 'HSKA', //   kassala
    'kassel/calden'     : 'EDVK', //   kassel/calden
    'kastamonu'         : 'LTAL', //   kastamonu
    'kasteli'           : 'LGTL', //   kasteli airport
    'katherine/tindal'  : 'YPTN', //   katherine/tindal
    'kathmandu'         : 'VNKT', //   kathmandu intl a
    'katima'            : 'FYKM', //   katima mulilo
    'kato'              : 'SYKT', //   kato
    'katowice/pyrzowi'  : 'EPKT', //   katowice/pyrzowi
    'katterbach'        : 'ETEB', //   katterbach (usa-
    'kauhava'           : 'EFKA', //   kauhava (fin-afb
    'kaunas'            : 'EYKA', //   kaunas
    'kavala/chrisoupo'  : 'LGKV', //   kavala/chrisoupo
    'kayseri/erkilet'   : 'LTAU', //   kayseri/erkilet
    'kazan'             : 'UWKD', //   kazan
    'kbely'             : 'LKKB', //   kbely
    'kearney'           : 'KEAR', //NE kearney muni
    'kecskemet'         : 'LHKE', //   kecskemet
    'keetmanshoop'      : 'FYKT', //   keetmanshoop
    'kefallinia'        : 'LGKF', //   kefallinia
    'keflavik'          : 'BIKF', //   keflavik (civ/mi
    'kelly'             : 'KSKF', //TX kelly afb
    'kelowna'           : 'CYLW', //BC kelowna apt
    'kemerovo'          : 'UNEE', //   kemerovo
    'kemi'              : 'EFKE', //   kemi
    'kenai'             : 'PAEN', //AK kenai
    'kenora'            : 'CYQK', //ON kenora airport
    'kenosha'           : 'KENW', //WI kenosha
    'kerinci/depati'    : 'WIPH', //   kerinci/depati p
    'kerman'            : 'OIKK', //   kerman
    'kermanshah/bakta'  : 'OICC', //   kermanshah/bakta
    'kerry'             : 'EIKY', //   kerry arpt
    'kerteh'            : 'WMKE', //   kerteh
    'ketchikan'         : 'PAKT', //AK ketchikan
    'key lake'          : 'CYKJ', //SK key lake
    'key west'               : 'KEYW', //FL key west
    'khabarovsk/novy'   : 'UHHH', //   khabarovsk/novy
    'khamis'            : 'OEKM', //   khamis mushait a
    'khanty-mansiysk'   : 'USHH', //   khanty-mansiysk
    'khartoum'          : 'HSSS', //   khartoum (civ/mi
    'khassab'           : 'OOKB', //   khassab (mil)
    'khatanga'          : 'UOHH', //   khatanga
    'kherson'           : 'UKOH', //   kherson
    'khon'              : 'VTUK', //   khon kaen
    'khudzhand'         : 'UTDL', //   khudzhand
    'kiev'              : 'UKBB', //   borispol'/kiev
    'kigali'            : 'HRYR', //   kigali
    'kigoma'            : 'HTKA', //   kigoma
    'kilimanjaro'       : 'HTKJ', //   kilimanjaro airp
    'kimberley/bj'      : 'FAKM', //   kimberley/bj vor
    'king fahd'         : 'OEDF', //   king fahd intl
    'king khalid'       : 'OEKK', //   king khalid mil
    'king salmon'              : 'PAKN', //AK king salmon
    'kingston'          : 'CYGK', //ON kingston arpt (m
    'kingston/norman'   : 'MKJP', //   kingston/norman
    'kingsville'        : 'KNQI', //TX kingsville nas
    'kinloss'           : 'EGQK', //   kinloss raf
    'kinston'           : 'KISO', //NC kinston/stalling
    'kirkenes'          : 'ENKR', //   kirkenes (civ/mi
    'kirkwall'          : 'EGPA', //   kirkwall airport
    'kirtland'          : 'KIKR', //NM kirtland afb-abq
    'kiruna'            : 'ESNQ', //   kiruna airport
    'kish'              : 'OIBK', //   kish island
    'kissimmee/orland'  : 'KISM', //FL kissimmee/orland
    'kisumu'            : 'HKKI', //   kisumu
    'kitakyushu/kokur'  : 'RJFR', //   kitakyushu/kokur
    'kithira'           : 'LGKC', //   kithira arpt
    'kittila'           : 'EFKT', //   kittila
    'klagenfurt(civ/m'  : 'LOWK', //   klagenfurt(civ/m
    'klamath'           : 'KLMT', //OR klamath falls
    'klawock'           : 'PAKW', //AK klawock
    'kleine-brogel(ba'  : 'EBBL', //   kleine-brogel(ba
    'kluang'            : 'WMAP', //   kluang
    'knoxville'         : 'KTYS', //TN knoxville
    'kochi'             : 'RJOK', //   kochi airport
    'kodiak'            : 'PADQ', //AK kodiak
    'koeln/bonn'        : 'EDDK', //   koeln/bonn
    'kogalniceanu'      : 'LRCK', //   kogalniceanu
    'kokshetau'         : 'UACK', //   kokshetau
    'koksijde'          : 'EBFN', //   koksijde (bel-af
    'kolub'             : 'UTDK', //   kolub
    'komatsu'           : 'RJNK', //   komatsu (civ/jas
    'kone'              : 'NWWD', //   kone airport
    'konya'             : 'LTAN', //   konya (tur-afb)
    'kopitnari'         : 'UGKO', //   kopitnari
    'kos'               : 'LGKO', //   kos airport
    'kosice'            : 'LZKZ', //   kosice barca
    'kosrae'            : 'PTSA', //   kosrae island
    'kostanay'          : 'UAUU', //   kostanay
    'kota bharu'        : 'WMKC', //   kota bharu/sulta
    'kota kinabalu'     : 'WBKK', //   kota kinabalu in
    'kotlas'            : 'ULKK', //   kotlas
    'kotoka'            : 'DGAA', //   accra/kotoka int
    'kotzebue'          : 'PAOT', //AK kotzebue
    'koumac'            : 'NWWK', //   koumac
    'krabi'             : 'VTSG', //   krabi
    'krakow/balice'     : 'EPKK', //   krakow/balice
    'kraljevo'          : 'LYKV', //   kraljevo
    'kramfors'          : 'ESNK', //   kramfors (swe-af
    'krasnodar'         : 'URKK', //   krasnodar
    'krasnoyarsk'       : 'UNKL', //   krasnoyarsk
    'kristiansand/kje'  : 'ENCN', //   kristiansand/kje
    'kristianstad/eve'  : 'ESMK', //   kristianstad/eve
    'kristiansund/kve'  : 'ENKB', //   kristiansund/kve
    'krivyy'            : 'UKDR', //   krivyy rih
    'kruger'            : 'FAKN', //   kruger mpumalang
    'kruunupyy'         : 'EFKK', //   kruunupyy
    'krzesiny'          : 'EPKS', //   krzesiny arpt
    'kuala lumpur'      : 'WMKK', //   kuala lumpur/sub
    'kuala trenganu'    : 'WMKN', //   kuala trengganu
    'kuantan'           : 'WMKD', //   kuantan (afb)
    'kuching'           : 'WBGG', //   kuching (civ/mil
    'kufra'             : 'HLKF', //   kufra (mil/civ)
    'kuito'             : 'FNKU', //   bie/kuito/silva
    'kujbysev/bezencu'  : 'UWWS', //   kujbysev/bezencu
    'kulusuk'           : 'BGKK', //   kulusuk airport
    'kumamoto(civ/jas'  : 'RJFT', //   kumamoto(civ/jas
    'kumasi'            : 'DGSI', //   kumasi
    'kunduz'            : 'EQBA', //   kunduz
    'kunming/wujiaba'   : 'ZPPP', //   kunming/wujiaba
    'kunsan'            : 'RKJK', //   kunsan (us/kor-a
    'kununurra'         : 'YPKU', //   kununurra airpor
    'kuopio'            : 'EFKU', //   kuopio (mil/civ)
    'kupang/el'         : 'WRKK', //   kupang/el tari
    'kuressaare'        : 'EEKE', //   kuressaare
    'kursk'             : 'UUOK', //   kursk
    'kurumoch'          : 'UWWW', //   kurumoch
    'kushiro'           : 'RJCK', //   kushiro airport
    'kutahya'           : 'LTBN', //   kutahya (tur-afb
    'kuujjuaq'          : 'CYVP', //QC kuujjuaq airport
    'kuujjuarapik'      : 'CYGW', //QC kuujjuarapik arp
    'kuusamo'           : 'EFKS', //   kuusamo
    'kuwait'            : 'OKBK', //   kuwait intl (mil
    'kwajalein/buchol'  : 'PKWA', //MH kwajalein/buchol
    'kzyl-orda'         : 'UAOO', //   kzyl-orda
    'la ceiba'          : 'MHLC', //   la ceiba/goloso
    'la coruna'         : 'LECO', //   la coruna/alvedr
    'la crosse'         : 'KLSE', //WI la crosse
    'la esperanza'      : 'MHLE', //   la esperanza
    'la gomera'         : 'GCGM', //   la gomera arpt
    'la grande reviera' : 'CYGL', //QC la grande rivier
    'la guardia'        : 'KLGA', //NY nyc/la guardia
    'la isabela'        : 'MDJB', //   dr balaguer intl
    'la mesa'           : 'MHLM', //   la mesa/pedro s
    'la palma'          : 'GCLA', //   la palma airport
    'la paz'            : 'MMLP', //   la paz intl airp
    'la roche'          : 'LFRI', //   la roche/les ajo
    'la rochelle'       : 'LFBH', //   la rochelle/lale
    'la romana'         : 'MDLR', //   la romana int. a
    'la ronga'          : 'CYVC', //SK la ronge airport
    'la serena'         : 'SCSE', //   la serena/laflor
    'la seu'            : 'LESU', //   la seu
    'la tontouta'       : 'NWWW', //   la tontouta nlle
    'laage'             : 'ETNL', //   laage
    'laayoune/hassan'   : 'GMML', //   laayoune/hassan
    'labuan'            : 'WBKL', //   labuan (afb)
    'labuha/taliabu'    : 'WAPH', //   labuha/taliabu
    'lafayette indiana' : 'KLAF', //IN lafayette
    'lafayette louisiana'       : 'KLFT', //LA lafayette
    'lafayette'         : 'KLAF', //IN lafayette
    'laghouat'          : 'DAUL', //   laghouat
    'lagos/ikeja'       : 'DNMM', //   lagos/ikeja
    'laguardia'         : 'KLGA',
    'lahaina/west'      : 'PHJH', //HI lahaina/west mau
    'lahore'            : 'OPLA', //   lahore (civ/mil)
    'lahr'              : 'EDTL', //   lahr (can-afb)
    'lajes'             : 'LPLA', //   lajes ab
    'lake tahoe'        : 'KTVL', //CA south lake tahoe
    'lake'              : 'KLCH', //LA lake charles
    'lakeland'          : 'KLAL', //FL lakeland regiona
    'lakenheath'        : 'EGUL', //   lakenheath raf
    'lamap/malekoula'   : 'NVSL', //   lamap/malekoula
    'lambasa'           : 'NFNL', //   lambasa airport
    'lambert'           : 'KSTL',
    'lamezia'           : 'LICA', //   lamezia terme
    'lamont'            : '    ', //OK lamont arm klmn
    'lampang'           : 'VTCL', //   lampang
    'lampedusa'         : 'LICD', //   lampedusa island
    'lan'               : 'RCLY', //   lan yu
    'lanai'             : 'PHNY', //HI lanai city airpo
    'lancaster'         : 'KLNS', //PA lancaster
    'lancaster/fox'     : 'KWJF', //CA lancaster/fox
    'lander'            : 'KLND', //WY lander
    'landivisiau'       : 'LFRJ', //   landivisiau (nav
    'landsberg'         : 'ETSA', //   landsberg (ger-a
    'langebaanweg'      : 'FALW', //   langebaanweg (sa
    'langenlebarn/tul'  : 'LOXT', //   langenlebarn/tul
    'langkawi'          : 'WMKL', //   langkawi intl ar
    'langley'           : 'KLFI', //VA langley afb/hamp
    'lannion/servel'    : 'LFRO', //   lannion/servel
    'lanseria'          : 'FALA', //   lanseria (civ/mi
    'lansing'           : 'KLAN', //MI lansing
    'lanveoc/poulmic('  : 'LFRL', //   lanveoc/poulmic(
    'lanzhou'           : 'ZLLL', //   lanzhou
    'laoag'             : 'RPLI', //   laoag intl(ph-ar
    'lappeenranta'      : 'EFLP', //   lappeenranta
    'lar'               : 'OISL', //   lar airport
    'laramie'           : 'KLAR', //WY laramie
    'laredo'            : 'KLRD', //TX laredo
    'larisa'            : 'LGLR', //   larisa airport
    'larnaca/larnax'    : 'LCLK', //   larnaca/larnax a
    'las cruces'        : 'KLRU', //NM las cruces intl
    'las palmas'        : 'GCLP', //   las palmas/gando
    'las vegas'         : 'KLAS',
    'lask'              : 'EPLK', //   lask arpt
    'latacunga/cotopa'  : 'SELT', //   latacunga/cotopa
    'latakia'           : 'OSLK', //   latakia
    'latina'            : 'LIRL', //   latina (it-afb)
    'latrobe/westmorl'  : 'KLBE', //PA latrobe/westmorl
    'laughlin'          : 'KDLF', //TX laughlin afb
    'launceston'        : 'YMLT', //   launceston airpo
    'laupheim'          : 'ETHL', //   laupheim (ger-ar
    'lavrentija'        : 'UHML', //   lavrentija
    'lawton'            : 'KLAW', //OK lawton
    'le havre'          : 'LFOH', //   le havre/octevil
    'le lamentin'       : 'TFFF', //   le lamentin/mart
    'le luc'            : 'LFMC', //   le luc/le cannet
    'le mans'           : 'LFRM', //   le mans/arnage(a
    'le puy'            : 'LFHP', //   le puy/loudes (a
    'le raizet'         : 'TFFR', //   le raizet
    'le touquet'        : 'LFAT', //   le touquet/p. pl
    'learmouth'         : 'YPLM', //   learmouth
    'lebanon'           : 'KLEB', //NH lebanon
    'lecce'             : 'LIBN', //   lecce (it-afb)
    'lechfeld'          : 'ETSL', //   lechfeld (ger-af
    'leczyca-leznica'   : 'EPLY', //   leczyca-leznica
    'leeds'             : 'EGNM', //   leeds and bradfo
    'leeming'           : 'EGXE', //   leeming raf
    'leesburg'          : 'KLEE', //FL leesburg
    'leeuwarden'        : 'EHLW', //   leeuwarden rnlaf
    'leicester'         : 'EGBG',
    'leipzig/schkeudi'  : 'EDDP', //   leipzig/schkeudi
    'leite'             : 'SBRP', //   leite lopes/ribe
    'lemoore'           : 'KNLC', //CA lemoore nas/reev
    'lenkoran'          : 'UBBL', //   lenkoran
    'leon/virgen'       : 'LELN', //   leon/virgen cami
    'les'               : 'LSGC', //   les eplatures
    'lethbridge'        : 'CYQL', //AB lethbridge vor
    'lethem'            : 'SYLT', //   lethem
    'leticia/vasquez'   : 'SKLT', //   leticia/vasquez
    'leuchars'          : 'EGQL', //   leuchars raf
    'levaldigi'         : 'LIMZ', //   levaldigi
    'lewisburg/greenb'  : 'KLWB', //WV lewisburg/greenb
    'lewiston'          : 'KLWS', //ID lewiston
    'lewistown'         : 'KLWT', //MT lewistown
    'lexington'         : 'KLEX', //KY lexington
    'lhasa'             : 'ZULS', //   lhasa
    'liberia/tomas'     : 'MRLB', //   liberia/tomas g
    'libreville/leon'   : 'FOOL', //   libreville/leon
    'lichinga'          : 'FQLC', //   lichinga
    'liepaja'           : 'EVLA', //   liepaja intl
    'lihue/kauai'       : 'PHLI', //HI lihue/kauai is
    'lille/lesquin'     : 'LFQQ', //   lille/lesquin
    'lilongwe'          : 'FWLI', //   lilongwe intl ar
    'lima'              : 'SPIM', //   lima/jorge chave
    'limnos'            : 'LGLM', //   limnos island ar
    'limoges/bellegar'  : 'LFBL', //   limoges/bellegar
    'limon'             : 'MRLM', //   limon intl airp
    'lincoln'           : 'KLNK', //NE lincoln
    'linkoping/malmen'  : 'ESCF', //   linkoping/malmen
    'linkoping/saab'    : 'ESSL', //   linkoping/saab
    'linton-on-ouse'    : 'EGXU', //   linton-on-ouse r
    'linz'              : 'LOWL', //   linz (civ/mil)
    'lisbon/portela'    : 'LPPT', //   lisbon/portela
    'lista/farsund'     : 'ENLI', //   lista/farsund (a
    'little rock'       : 'KLIT', //AR little rock
    'livermore'         : 'KLVK', //CA livermore
    'liverpool'         : 'EGGP', //   liverpool airpor
    'livingston'        : 'KLVM', //MT livingston
    'livingstone'       : 'FLHN', //   livingstone nkum
    'ljubljana/brnik'   : 'LJLJ', //   ljubljana/brnik
    'ljungbyhed'        : 'ESTL', //   ljungbyhed
    'lloydminster'      : 'CYLL', //AB lloydminster arp
    'locarno'           : 'LSZL', //   locarno
    'lodz/lublinek'     : 'EPLL', //   lodz/lublinek
    'loei'              : 'VTUL', //   loei
    'logan'             : 'KLGU', //UT logan
    'logrono/agoncill'  : 'LELO', //   logrono/agoncill
    'lome/tokoin'       : 'DXXX', //   lome/tokoin (mil
    'london ontario'            : 'CWSN', //ON london cs
    'london'            : 'EGLL',
    'london/gatwick'    : 'EGKK', //   london/gatwick a
    'london/heathrow'   : 'EGLL', //   london/heathrow
    'londrina'          : 'SBLO', //   londrina airport
    'long beach'        : 'KLGB',
    'long poind'        : 'CWWU', //NL long pond
    'long'              : 'KLGB', //CA long beach
    'longana'           : 'NVSG', //   longana airport
    'longvic'           : 'LFSD', //   dijon/longvic(fa
    'longview'          : 'KGGG', //TX longview
    'lord'              : 'YLHI', //   lord howe island
    'loreto'            : 'MMLT', //   loreto
    'lorient/lann'      : 'LFRH', //   lorient/lann bih
    'los alamitos'      : 'KSLI', //CA los alamitos aaf
    'los angeles'       : 'KLAX',
    'los mochis'               : 'MMLM', //   los mochis airpo
    'losinj'            : 'LDLO', //   losinj island
    'lossiemouth'       : 'EGQS', //   lossiemouth raf
    'louisville'        : 'KSDF', //KY louisville
    'love'              : 'KDAL',
    'lovelock'          : 'KLOL', //NV lovelock
    'luanda/4'          : 'FNLU', //   luanda/4 de feve
    'luang'             : 'VLLN', //   luang namtha
    'luang-prabang'     : 'VLLB', //   luang-prabang
    'lubango'           : 'FNUB', //   lubango
    'lubbock'           : 'KLBB', //TX lubbock
    'lublin'            : 'EPLB', //   lublin
    'lubumbashi/luano'  : 'FZQA', //   lubumbashi/luano
    'lucknow/amausi'    : 'VILK', //   lucknow/amausi
    'luderitz/diaz'     : 'FYLZ', //   luderitz/diaz po
    'luebeck/blankens'  : 'EDHL', //   luebeck/blankens
    'luena'             : 'FNUE', //   luena
    'lufkin'            : 'KLFK', //TX lufkin
    'lugano'            : 'LSZA', //   lugano (pvt/aut)
    'luhansk'           : 'UKCW', //   luhansk
    'luke'              : 'KLUF', //AZ luke afb/glendal
    'lulsgate'          : 'EGGD', //   bristol/lulsgate
    'lumberton'         : 'KLBT', //NC lumberton
    'lunken'            : 'KLUK', //OH cincinnat/lunken
    'lupin'             : 'CYWO', //NU lupin arpt (sawr
    'luqa/malta'        : 'LMML', //   luqa/malta
    'lusaka'            : 'FLKK', //   lusaka kuanda
    'luton'             : 'EGGW', //   luton airport
    'lutsel'            : 'CYLK', //NT lutsel ke arpt (
    'luwuk/bubung'      : 'WAMW', //   luwuk/bubung
    'luxembourg'        : 'ELLX', //   luxembourg (aut)
    'luxeuil/st.'       : 'LFSX', //   luxeuil/st. sauv
    'luxor'             : 'HELX', //   luxor (civ/mil)
    'lviv'              : 'UKLL', //   lviv
    'lycksele'          : 'ESNL', //   lycksele
    'lydd'              : 'EGMD', //   lydd airport
    'lynchburg'         : 'KLYH', //VA lynchburg
    'lyneham'           : 'EGDL', //   lyneham raf
    'lynn'              : 'CYYL', //MB lynn lake airpor
    'lyon'              : 'EKCH',
    'lyon/bron'         : 'LFLY', //   lyon/bron
    'lyon/satolas'      : 'LFLL', //   lyon/satolas
    'mabaruma'          : 'SYMB', //   mabaruma
    'macae'             : 'SBME', //   macae
    'macao/macau'       : 'VMMC', //   macao/macau
    'macapa'            : 'SBMQ', //   macapa intl airp
    'macdill'           : 'KMCF', //FL macdill afb/tamp
    'maceio/campo'      : 'SBMO', //   maceio/campo pal
    'mackenzie'         : 'CYZY', //BC mackenzie airpor
    'macon'             : 'KMCN', //GA macon
    'mactan-cebu'       : 'RPVM', //   mactan-cebu
    'madang'            : 'AYMD', //   madang airport
    'madinah'           : 'OEMA', //   madinah intl arp
    'madison'           : 'KMSN', //WI madison
    'madras/chennai'    : 'VOMM', //   madras/chennai
    'madri-colmenar'    : 'LECV', //   madri-colmenar
    'madrid'            : 'LEMD',
    'madrid/barajas'    : 'LEMD', //   madrid/barajas
    'madrid/cuatro'     : 'LEVS', //   madrid/cuatro vi
    'madrid/getafe'     : 'LEGT', //   madrid/getafe (a
    'madurai'           : 'VOMD', //   madurai
    'mae hong son'      : 'VTCH', //   mae hong son/mua
    'mae sot'           : 'VTPM', //   mae sot/tak
    'magadan/nagaevo'   : 'UHMM', //   magadan/nagaevo
    'magdeburg'         : 'EDBM', //   magdeburg
    'magenta'           : 'NWWM', //   magenta
    'magnitogorsk'      : 'USCM', //   magnitogorsk
    'mahon/menorca'     : 'LEMH', //   mahon/menorca is
    'maiduguri'         : 'DNMA', //   maiduguri
    'majunga/mahajang'  : 'FMNM', //   majunga/mahajang
    'majuro'            : 'PKMJ', //MH majuro wso airpo
    'makhado'           : 'FALM', //   makhado afb
    'malabo/fernando'   : 'FGSL', //   malabo/fernando
    'malacca'           : 'WMKM', //   malacca
    'malaga'            : 'LEMG', //   malaga (civ/mil)
    'malakal'           : 'HSSM', //   malakal
    'malange'           : 'FNMA', //   malange
    'malanguane/talau'  : 'WAMN', //   malanguane/talau
    'malatya/erhac'     : 'LTAT', //   malatya/erhac (a
    'malbork'           : 'EPMB', //   malbork
    'male'              : 'VRMM', //   male intl/hulule
    'malindi'           : 'HKML', //   malindi
    'malmo/sturup'      : 'ESMS', //   malmo/sturup
    'malmstrom'         : 'KGFA', //MT malmstrom afb
    'mammoth/june'      : 'KMMH', //CA mammoth/june lak
    'managua/augusto'   : 'MNMG', //   managua/augusto
    'manas'             : 'UCFM', //   manas
    'manaus/ponta'      : 'SBMN', //   manaus/ponta pel
    'manchester'        : US ? 'KMHT' : 'EGCC', //   manchester intl
    'mandalay'          : 'VYMD', //   mandalay
    'mangalore/bajpe'   : 'VOML', //   mangalore/bajpe
    'manhattan'         : 'KMHK', //KS manhattan
    'maniitsoq'         : 'BGMQ', //   maniitsoq
    'manistee'          : 'KMBL', //MI manistee
    'manitowac'         : 'KMTW', //WI manitowac muni
    'mannheim'          : 'EDFM', //   mannheim
    'manokwari/rendan'  : 'WASR', //   manokwari/rendan
    'mansfield'         : 'KMFD', //OH mansfield
    'manston'           : 'EGMH', //   manston southeas
    'manta/eloy'        : 'SEMT', //   manta/eloy alfar
    'manzanillo'        : 'MMZO', //   manzanillo intl
    'manzini/matsapa'   : 'FDMS', //   manzini/matsapa
    'maputo/mavalane'   : 'FQMA', //   maputo/mavalane
    'mar'               : 'SAZM', //   mar del plata ar
    'maraba'            : 'SBMA', //   maraba
    'maracaibo/la'      : 'SVMC', //   maracaibo/la chi
    'marathon ontary'          : 'CYSP', //ON marathon
    'marathon'          : 'KMTH', //FL marathon
    'marce'             : 'LFJR', //   marce
    'marcos'            : 'MPMG', //   marcos gelabert
    'marculesti'        : 'LUBM', //   marculesti
    'mardin'            : 'LTCR', //   mardin airport
    'margarita/del'     : 'SVMG', //   margarita/del ca
    'marham'            : 'EGYM', //   marham raf
    'mariana/andersen'  : 'PGUA', //GU mariana/andersen
    'maribo'            : 'EKMB', //   maribo arpt (aut
    'maribor'           : 'LJMB', //   maribor
    'mariehamn/aland'   : 'EFMA', //   mariehamn/aland
    'marietta'          : 'KRYY', //GA marietta mccolum
    'marisa'            : 'LTBZ', //   marisa
    'mariupol'          : 'UKCM', //   mariupol intl
    'maroua'            : 'FKKL', //   maroua salak
    'marrakech/menara'  : 'GMMX', //   marrakech/menara
    'marsa'             : 'HEMA', //   marsa alam intl
    'marseille/marign'  : 'LFML', //   marseille/marign
    'marte'             : 'SBMT', //   marte (civ/mil)
    'martinsburg'       : 'KMRB', //WV martinsburg
    'marzar'            : 'EQBM', //   marzar i sharif
    'mascara/ghriss'    : 'DAOV', //   mascara/ghriss
    'maseru/moshoesho'  : 'FXMM', //   maseru/moshoesho
    'mashhad'           : 'OIMM', //   mashhad (afb/civ
    'mason'             : 'KMCW', //IA mason city
    'massena'           : 'KMSS', //NY massena
    'masset'            : 'CZMT', //BC masset
    'masvingo'          : 'FVMV', //   masvingo
    'matamoros'         : 'MMMA', //   matamoros intl
    'mather'            : 'KMHR', //CA mather field
    'matsuyama'         : 'RJOM', //   matsuyama airpor
    'maun'              : 'FBMN', //   maun
    'maxwell'           : 'KMXF', //AL maxwell afb/mgm
    'mayaguez/eugenio'  : 'TJMZ', //PR mayaguez/eugenio
    'maykop'            : 'URKM', //   maykop
    'mayo'              : 'CYMA', //YT mayo airport
    'mayport'           : 'KNRB', //FL mayport nas
    'mazar-i-sharif'    : 'OAMS', //   mazar-i-sharif
    'mazatlan/g.'       : 'MMMZ', //   mazatlan/g. buel
    'mazu'              : 'RCFG', //   mazu
    'mcalester'         : 'KMLC', //OK mcalester
    'mcallen'           : 'KMFE', //TX mcallen
    'mccall'            : 'KMYL', //ID mccall
    'mccarran'          : 'KLAS',
    'mccomb'            : 'KMCB', //MS mccomb
    'mcconnell'         : 'KIAB', //KS mcconnell afb
    'mccook'            : 'KMCK', //NE mccook
    'mcentire'          : 'KMMT', //SC mcentire ang bas
    'mcgrath'           : 'PAMC', //AK mcgrath
    'mcmurdo'           : 'NZIR', //   mcmurdo ice rnwy
    'mecheria'          : 'DAAY', //   mecheria
    'medan/polonia'     : 'WIMM', //   medan/polonia (m
    'medford'           : 'KMFR', //OR medford
    'medicine'          : 'CYXH', //AB medicine hat
    'meierwik'          : 'ETGG', //   meierwik
    'meiringen'         : 'LSMM', //   meiringen
    'meknes/bassatine'  : 'GMFM', //   meknes/bassatine
    'melbourne'         : US ? 'KMLB' : 'YMML', //   FL vs Australia
    'melilla'           : 'GEML', //   melilla
    'melilla/angel'     : 'SUAA', //   melilla/angel s.
    'melun/villaroche'  : 'LFPM', //   melun/villaroche
    'melville'          : 'TDPD', //   melville hall ar
    'memambetsu'        : 'RJCM', //   memambetsu airpo
    'memmingen'         : 'EDJA', //   memmingen allgau
    'memphis'           : 'KMEM', //TN memphis
    'menado/sam'        : 'WAMM', //   menado/sam ratul
    'mendoza/el'        : 'SAME', //   mendoza/el plume
    'menongue'          : 'FNME', //   menongue east/se
    'merauke/mopah'     : 'WAKK', //   merauke/mopah
    'merced'            : 'KMCE', //CA merced
    'merced/castle'     : 'KMER', //CA merced/castle af
    'mercury'           : 'KDRA', //NV desert r/mercury
    'merida'            : 'MMMD', //   merida intl arpt
    'meridian'          : 'KNMM', //MS meridian nas
    'meridian/key'      : 'KMEI', //MS meridian/key fld
    'mersa'             : 'HEMM', //   mersa matruh (mi
    'merzifon'          : 'LTAP', //   merzifon (tur-af
    'mesa'              : 'KAZA',
    'metz-nancy-lorra'  : 'LFJL', //   metz-nancy-lorra
    'metz/frescaty(fa'  : 'LFSF', //   metz/frescaty(fa
    'mexicali'          : 'MMML', //   mexicali intl ar
    'mexico'            : 'MMMX', //   mexico city/lice
    'mfuwe'             : 'FLMF', //   mfuwe
    'miami'             : 'KMIA', //FL miami
    'miami/opa'         : 'KOPF', //FL miami/opa locka
    'miami/tamiami'     : 'KTMB', //FL miami/tamiami
    'middle'            : 'EGVP', //   middle wallop
    'middletown'        : 'KMDT', //PA middletown
    'midland'           : 'KMAF', //TX midland
    'midway'            : 'PMDY', //HI midway island na
    'miho'              : 'RJOH', //   miho (civ/jasdf)
    'mikkeli'           : 'EFMI', //   mikkeli
    'mikonos'           : 'LGMK', //   mikonos island
    'milan'             : 'LIML',
    'milano/linate'     : 'LIML', //   milano/linate
    'milano/malpensa'   : 'LIMC', //   milano/malpensa
    'mildenhall'        : 'EGUN', //   mildenhall raf
    'miles'             : 'KMLS', //MT miles city
    'millville'         : 'KMIV', //NJ millville
    'milwaukee'         : 'KMKE', //WI milwaukee
    'minangkabau'       : 'WIEE', //   minangkabau
    'minatitlan'        : 'MMMT', //   minatitlan
    'mineralyne'        : 'URMM', //   mineralyne vody
    'minna'             : 'DNMN', //   minna airport
    'minneapolis'       : 'KMSP', //MN minneapolis
    'minot air force base'             : 'KMIB', //ND minot afb
    'minot'             : 'KMOT', //ND minot
    'minsk'             : 'EPMM', //   minsk mazowiecki
    'minsk-in-min'      : 'UMMM', //   minsk-in-min
    'miramar'           : 'KNKX', //CA miramar nas/san
    'miramichi'         : 'CACQ', //NB miramichi
    'miri/kalimantan'   : 'WBGR', //   miri/kalimantan
    'mirny'             : 'UERR', //   mirny
    'misawa(jasdf/af/'  : 'RJSM', //   misawa(jasdf/af/
    'missoula'          : 'KMSO', //MT missoula
    'mitiga'            : 'HLLM', //   mitiga
    'mitilini'          : 'LGMT', //   mitilini
    'miyazaki'          : 'RJFM', //   miyazaki airport
    'mmabatho'          : 'FAMM', //   mmabatho intl ar
    'moab'              : 'KCNY', //UT moab
    'mobile/bates'      : 'KMOB', //AL mobile/bates
    'mobile/brookley'   : 'KBFM', //AL mobile/brookley
    'mobridge'          : 'KMBG', //SD mobridge
    'modlin'            : 'EPMO', //   modlin
    'mogilev'           : 'UMOO', //   mogilev
    'moirana'           : 'ENRA', //   moirana
    'mokraya'           : 'UKDE', //   mokraya
    'molde/aro'         : 'ENML', //   molde/aro
    'moline/quad'       : 'KMLI', //IL moline/quad city
    'molokai'           : 'PHMK', //HI molokai
    'mombasa/moi'       : 'HKMO', //   mombasa/moi intl
    'momote'            : 'AYMO', //   momote manus is
    'monbaca'           : 'FNBG', //   benguela/monbaca
    'monchengladbach'   : 'EDLN', //   monchengladbach
    'monclova'          : 'MMMV', //   monclova
    'moncton'           : 'CYQM', //NB moncton airport
    'monopulli'         : 'SCPQ', //   monopulli
    'monroe'            : 'KMLU', //LA monroe
    'mont'              : 'CYYY', //QC mont joli airpor
    'mont-de-marsan'    : 'LFBM', //   mont-de-marsan f
    'monte'             : 'LPMR', //   monte real(por-a
    'monterey'          : 'KMRY', //CA monterey
    'monterrey'         : 'MMAN', //   monterrey intl a
    'monterrey/gen'     : 'MMMY', //   monterrey/gen ma
    'montgomery'        : 'KMGM', //AL montgomery
    'monticello'        : 'KLLQ', //AR monticello
    'montijo'           : 'LPMT', //   montijo (por-afb
    'montpelier/barre'  : 'KMPV', //VT montpelier/barre
    'montpellier mediterranee'  : 'LFMT', //   frejorgues/montp
    'montreal/dorval'   : 'CYUL', //QC montreal/dorval
    'montreal/mirabel'  : 'CYMX', //QC montreal/mirabel
    'montrose'          : 'KMTJ', //CO montrose
    'moody'             : 'KVAD', //GA moody afb/valdos
    'moose'             : 'CYMJ', //SK moose jaw (can m
    'moosonee'          : 'CYMO', //ON moosonee (sawr)
    'morehead'          : 'KSYM', //KY morehead
    'morelia'           : 'MMMM', //   morelia new
    'morgantown'        : 'KMGW', //WV morgantown
    'moron'             : 'LEMO', //   moron (sp-usafb)
    'moroni/hahaia'     : 'FMCH', //   moroni/hahaia in
    'moscow'            : 'UUDD', //   moscow/domodedov
    'moscow/novoye'     : 'UUBW', //   moscow/novoye sr
    'moscow/sheremet'   : 'UUEE', //   moscow/sheremet'
    'moscow/vnukovo'    : 'UUWW', //   moscow/vnukovo
    'moses'             : 'KMWH', //WA moses lake
    'mosinee/central'   : 'KCWA', //WI mosinee/central
    'mostar'            : 'LQMO', //   mostar airport
    'mosul'             : 'ORBM', //   mosul (irq-afb)
    'moti'              : 'FDOT', //   moti
    'mount hagen'       : 'AYMH', //   mount hagen
    'mount isa'         : 'YBMA', //   mount isa airpor
    'mount pleasant'    : 'EGYP', //   mount pleasant
    'mountain home'     : 'KBPK', //AR mountain home
    'mtwara'            : 'HTMT', //   mtwara
    'muan'              : 'RKJB', //   muan intl
    'muenster/osnabru'  : 'EDDG', //   muenster/osnabru
    'muir'              : 'KMUI', //PA muir aaf/indiant
    'mulhouse'          : 'LFSB', //   bale/mulhouse
    'multan'            : 'OPMT', //   multan
    'mumbai'            : 'VABB', //   bombay/santacruz
    'munda/new'         : 'AGGM', //   munda/new georgi
    'mundo'             : 'MGMM', //   mundo maya
    'munich'            : 'EDDM',
    'munich-flughafen'  : 'EDDM', //   munich-flughafen
    'murmansk'          : 'ULMM', //   murmansk
    'murted'            : 'LTAE', //   murted (tur-afb)
    'mus'               : 'LTCK', //   mus (tur-afb)
    'muscle'            : 'KMSL', //AL muscle shoal
    'muskegon'          : 'KMKG', //MI muskegon
    'muskoka'           : 'CYQA', //ON muskoka airport
    'mwanza'            : 'HTMW', //   mwanza
    'mykolaiv'          : 'UKON', //   mykolaiv
    'myrtle beach'      : 'KCRE', //SC north myrtle bea
    'myrtle'            : 'KMYR', //SC myrtle beach
    'mys'               : 'UHMI', //   mys schmidta
    'mysore'            : 'VOMY', //   mysore
    'mzuzu'             : 'FWUU', //   mzuzu
    'nabire/irian'      : 'WABI', //   nabire/irian jay
    'nadym'             : 'USMM', //   nadym
    'nadzab'            : 'AYNZ', //   nadzab
    'nagasaki(civ/jms'  : 'RJFU', //   nagasaki(civ/jms
    'nagoya'            : 'RJNA', //   nagoya (civ/jasd
    'nagoya/chubu'      : 'RJGG', //   nagoya/chubu
    'nagpur'            : 'VANP', //   nagpur sonegaon
    'naha'              : 'ROAH', //   naha (civ/jasdf)
    'naimtougou(civ/m'  : 'DXNG', //   naimtougou(civ/m
    'nain'              : 'CYDP', //NL nain airport
    'nairobi'           : 'HKJK', //   nairobi/jomo ken
    'nakhchivan'        : 'UBBN', //   nakhchivan
    'nakhon phanom'     : 'VTUW', //   nakhon phanom
    'nakhon ratchasim'  : 'VTUQ', //   nakhon ratchasim
    'nakhon si thamma'  : 'VTSF', //   nakhon si thamma
    'nalchik'           : 'URMN', //   nalchik
    'namangan'          : 'UTFN', //   namangan
    'namest'            : 'LKNA', //   namest
    'namibe'            : 'FNMO', //   namibe
    'namlea/buru'       : 'WAPR', //   namlea/buru isla
    'nampula'           : 'FQNP', //   nampula
    'nan/muang'         : 'VTCN', //   nan/muang nan
    'nanaimo'           : 'CYCD', //BC nanaimo airport
    'nancy/essey'       : 'LFSN', //   nancy/essey
    'nancy/ochey'       : 'LFSO', //   nancy/ochey (faf
    'nandi'             : 'NFFN', //   nandi fiji
    'nanisivik'         : 'CYSR', //NU nanisivik airpor
    'nanjing/lukou'     : 'ZSNJ', //   nanjing/lukou
    'nanning/wuxu'      : 'ZGNN', //   nanning/wuxu
    'nantes/chateau'    : 'LFRS', //   nantes/chateau b
    'nantucket'         : 'KACK', //MA nantucket
    'naples'            : US ? 'KAPF' : 'LIRN', //FL v. Italy
    'naples/capodichi'  : 'LIRN', //   naples/capodichi
    'narathiwat'        : 'VTSC', //   narathiwat
    'narita'            : 'RJAA', //   narita intl
    'narssarssuaq'      : 'BGBW', //   narssarssuaq
    'nasa'              : 'KTTS', //FL nasa shuttle fcl
    'nashville'         : 'KBNA', //TN nashville
    'nassau'            : 'MYNN', //   nassau intl
    'natal'             : 'SBSG', //   natal
    'natal/augusto'     : 'SBNT', //   natal/augusto se
    'natashquan'        : 'CYNA', //QC natashquan airp
    'national'          : 'KDCA',
    'nauru'             : 'ANYN', //   nauru island
    'nausori'           : 'NFNA', //   nausori fiji
    'navegantes'        : 'SBNF', //   navegantes
    'navoi'             : 'UTSA', //   navoi
    'nawabshah'         : 'OPNH', //   nawabshah
    'nazca'             : 'SPZA', //   nazca reiche apt
    'ndjamena'          : 'FTTJ', //   ndjamena (civ/mi
    'ndola'             : 'FLND', //   ndola
    'nea'               : 'LGBL', //   nea anchialos
    'needles'           : 'KEED', //CA needles
    'nejran'            : 'OENG', //   nejran
    'netheravon'        : 'EGDN', //   netheravon (army
    'neuburg/donau'     : 'ETSN', //   neuburg/donau
    'neuquen'           : 'SAZN', //   neuquen airport
    'nevsehir'          : 'LTAZ', //   nevsehir
    'new bern'          : 'KEWN', //NC new bern
    'new iberia'        : 'KARA', //LA new iberia
    'new orleans'       : 'KMSY',
    'new richmond'      : 'KRNH', //WI new richmond mun
    'new river'         : 'KNCA', //NC new river mcas
    'new york'          : 'KJFK',
    'newark'            : 'KEWR', //NJ newark
    'newburgh'          : 'KSWF', //NY newburgh/stewart
    'newcastle'         : 'EGNT', //   newcastle
    'newport oregon'           : 'KONP', //OR newport
    'newport'           : 'KPHF', //VA newport news
    'newquay'           : 'EGHQ', //   newquay
    'ngaoundere'        : 'FKKN', //   ngaoundere
    'niagara'           : 'KIAG', //NY niagara falls
    'niamey'            : 'DRRN', //   niamey (civ/mil)
    'nice'              : 'LFMN',
    'nice/cote'         : 'LFMN', //   nice/cote d'azur
    'nickerie'          : 'SMNI', //   nickerie fernand
    'nicosia/athalass'  : 'LCNC', //   nicosia/athalass
    'niederrhein'       : 'EDLV', //   niederrhein
    'niederstetten'     : 'ETHN', //   niederstetten (g
    'niigata'           : 'RJSN', //   niigata (civ/jas
    'nikolaevsk-na-am'  : 'UHNN', //   nikolaevsk-na-am
    'nimes/garons'      : 'LFTW', //   nimes/garons (na
    'ningbo/lishe'      : 'ZSNB', //   ningbo/lishe
    'ninoy'             : 'RPLL', //   ninoy aquino int
    'nis'               : 'LYNI', //   nis
    'nizhnevartovsk'    : 'USNN', //   nizhnevartovsk
    'nizhny'            : 'UWGG', //   nizhny novgorod
    'noctor/jackson'    : 'KJKL', //KY noctor/jackson
    'noervenich'        : 'ETNN', //   noervenich (gaf)
    'nogales'           : 'KOLS', //AZ nogales
    'nome'              : 'PAOM', //AK nome
    'nordholz'          : 'ETMN', //   nordholz (ger-na
    'norfolk nebraska'           : 'KOFK', //NE norfolk
    'norfolk'           : 'KORF', //VA norfolk
    'norman'            : 'CYVQ', //NT norman wells arp
    'norman/westheime'  : 'KOUN', //OK norman/westheime
    'norne'             : 'ENNE', //   norne fpso oilp
    'norrkoping/kungs'  : 'ESSP', //   norrkoping/kungs
    'north battleford'  : 'CYQW', //SK north battleford
    'north bay'         : 'CYYB', //ON north bay airpor
    'north bend'        : 'KOTH', //OR north bend
    'north island'      : 'KNZY', //CA north island nas
    'north las vegas'   : 'KVGT', //NV north las vegas
    'north platte'      : 'KLBF', //NE north platte
    'northolt'          : 'EGWU', //   northolt raf
    'northway'          : 'PAOR', //AK northway
    'norway'            : 'CYNE', //MB norway house arp
    'norwich'           : 'EGSH', //   norwich wea cntr
    'nosy'              : 'FMNN', //   nosy be/fascene
    'notodden'          : 'ENNO', //   notodden
    'nouadhibou'        : 'GQPP', //   nouadhibou
    'nouakchott'        : 'GQNN', //   nouakchott
    'nouasseur/casabl'  : 'GMMN', //   nouasseur/casabl
    'novokuznetsk'      : 'UNWW', //   novokuznetsk
    'novyi'             : 'USMU', //   novyi urengoi
    'nowra'             : 'YSNW', //   nowra (aus-navy)
    'nuernberg'         : 'EDDN', //   nuernberg
    'nueva greona'      : 'MUNG', //   nueva gerona (m
    'nueva ocotopeque'  : 'MHNO', //   nueva ocotepeque
    'nuevo'             : 'MMNL', //   nuevo laredo int
    'nuiqsut'           : 'PAQT', //AK nuiqsut
    'nukus/karakalpak'  : 'UTNN', //   nukus/karakalpak
    'o\'hare'           : 'KORD',
    'oakland'           : 'KOAK', //CA oakland
    'oaxaca/xoxocotla'  : 'MMOX', //   oaxaca/xoxocotla
    'oban'              : 'EGEO', //   oban airport
    'oberpfaffenhofen'  : 'EDMO', //   oberpfaffenhofen
    'obihiro'           : 'RJCB', //   obihiro airport
    'oceana'            : 'KNTU', //VA oceana nas/souce
    'odense/beldringe'  : 'EKOD', //   odense/beldringe
    'odessa'            : 'KODO',
    'odessa/tsentraln'  : 'UKOO', //   odessa/tsentraln
    'odiham'            : 'EGVO', //   odiham raf
    'offutt'            : 'KOFF', //NE offutt afb/belle
    'ogden'             : 'KOGD', //UT ogden
    'ogle'              : 'SYGO', //   ogle airport
    'ohrid'             : 'LWOH', //   ohrid
    'oiapoque'          : 'SBOI', //   oiapoque
    'oita'              : 'RJFO', //   oita airport
    'okayama'           : 'RJOB', //   okayama airport
    'okha'              : 'UHSH', //   okha
    'oklahoma city'     : 'KOKC',
    'oklahoma'          : 'KOKC', //OK oklahoma city
    'olathe/industria'  : 'KIXD', //KS olathe/industria
    'olbia/costa'       : 'LIEO', //   olbia/costa smer
    'old'               : 'CYOC', //YT old crow airport
    'olongapo/subic'    : 'RPLB', //   olongapo/subic
    'olympia'           : 'KOLM', //WA olympia
    'olympic'           : 'YOLD', //   olympic dam arpt
    'omaha'             : 'KOMA',
    'omaha/eppley'      : 'KOMA', //NE omaha/eppley
    'ondangwa'          : 'FYOA', //   ondangwa
    'ondjiva'           : 'FNGI', //   ondjiva
    'ontario'           : 'KONT', //CA ontario
    'oostende'          : 'EBOS', //   oostende airport
    'oradea'            : 'LROD', //   oradea
    'oran/es'           : 'DAOO', //   oran/es senia
    'orange/caritat(f'  : 'LFMO', //   orange/caritat(f
    'orangeburg'        : 'KOGB', //SC orangeburg
    'oranjemund'        : 'FYOG', //   oranjemund
    'orebro'            : 'ESOE', //   orebro (private)
    'orenburg/tsentra'  : 'UWOO', //   orenburg/tsentra
    'orland'            : 'ENOL', //   orland iii(nor-a
    'orlando'           : 'KMCO', //FL orlando
    'orleans/bricy(fa'  : 'LFOJ', //   orleans/bricy(fa
    'ornskoldsvik'      : 'ESNO', //   ornskoldsvik arp
    'orsk'              : 'UWOR', //   orsk
    'orumieh'           : 'OITR', //   orumieh
    'oruro/juan'        : 'SLOR', //   oruro/juan mendo
    'osaka'             : 'RJOO', //   osaka intl/itami
    'osan'              : 'RKSO', //   osan (us/kor-afb
    'oseberg'           : 'ENOA', //   oseberg
    'osh'               : 'UCFO', //   osh
    'oshkosh'           : 'KOSH', //WI oshkosh
    'osijek'            : 'LDOS', //   osijek
    'oslo'              : 'ENGM',
    'oslo/gardermoen'   : 'ENGM', //   oslo/gardermoen
    'osorno/canal'      : 'SCJO', //   osorno/canal baj
    'ostafyevo'         : 'UUMO', //   ostafyevo intl
    'ostersund/froson'  : 'ESNZ', //   ostersund/froson
    'ostrava/mosnov'    : 'LKMT', //   ostrava/mosnov
    'otis air force base' : 'KFMH', //MA falmouth/otis ab
    'ottawa'            : 'CYOW', //ON ottawa intl
    'ottumwa'           : 'KOTM', //IA ottumwa
    'ouagadougou'       : 'DFFD', //   ouagadougou (mil
    'ouanaham/wanaham'  : 'NWWL', //   ouanaham/wanaham
    'ouargla'           : 'DAUU', //   ouargla
    'ouarzazate'        : 'GMMZ', //   ouarzazate
    'oujda/angads'      : 'GMFO', //   oujda/angads
    'oulu/uleaborg'     : 'EFOU', //   oulu/uleaborg
    'ovar'              : 'LPOV', //   ovar mil
    'ovda'              : 'LLOV', //   ovda (isr-afb/ci
    'overberg'          : 'FAOB', //   overberg
    'owensboro/davies'  : 'KOWB', //KY owensboro/davies
    'oxford'            : 'EGTK', //   oxford
    'oxnard'            : 'KOXR', //CA oxnard
    'ozark/cairns'      : 'KOZR', //AL ozark/cairns aaf
    'padangk'           : 'WIPL', //   bengkula/padangk
    'paderborn/lippst'  : 'EDLP', //   paderborn/lippst
    'paducah'           : 'KPAH', //KY paducah
    'page'              : 'KPGA', //AZ page
    'pago'              : 'NSTU', //   pago pago
    'pakanbaru/simpan'  : 'WIBB', //   pakanbaru/simpan
    'pakse'             : 'VLPS', //   pakse intl
    'palanga'           : 'EYPA', //   palanga intl
    'palembang/sultan'  : 'WIPP', //   palembang/sultan
    'palenque'          : 'MMPQ', //   palenque
    'palermo/point'     : 'LICJ', //   palermo/point ra
    'palm beach'        : 'KPBI',
    'palm'              : 'KPSP', //CA palm springs
    'palma'             : 'LEPA', //   palma de mallorc
    'palmas'            : 'SBPJ', //   palmas
    'palmdale'          : 'KPMD', //CA palmdale
    'palmer'            : 'PAAQ', //AK palmer
    'palo alto'         : 'KPAO',
    'pamplona/noain'    : 'LEPP', //   pamplona/noain
    'panama'            : 'KECP', //FL panama city
    'pangkor'           : 'WMPA', //   pangkor island
    'pangnirtung'       : 'CYXP', //NU pangnirtung airp
    'pantelleria(it-a'  : 'LICG', //   pantelleria(it-a
    'papa'              : 'LHPA', //   papa
    'paphos/baf'        : 'LCPH', //   paphos/baf intl
    'paraguana/josefa'  : 'SVJC', //   paraguana/josefa
    'paramaribo'        : 'SMZO', //   paramaribo
    'pardubice'         : 'LKPD', //   pardubice
    'paris'             : 'LFPG',
    'paris/le'          : 'LFPB', //   paris/le bourget
    'paris/orly'        : 'LFPO', //   paris/orly
    'parkersburg'       : 'KPKB', //WV parkersburg
    'parma'             : 'LIMP', //   parma
    'parnaiba'          : 'SBPB', //   parnaiba airport
    'parnu'             : 'EEPU', //   parnu
    'pasco'             : 'KPSC', //WA pasco
    'paso robles'              : 'KPRB', //CA paso robles
    'patna'             : 'VEPT', //   patna
    'patrick'           : 'KCOF', //FL patrick afb/coco
    'pattani'           : 'VTSK', //   pattani
    'pattimura'         : 'WAPP', //   ambon/pattimura
    'patuxent'          : 'KNHK', //MD patuxent river
    'paulatuk'          : 'CYPC', //NT paulatuk airport
    'pavlodar'          : 'UASP', //   pavlodar
    'paya'              : 'WSAP', //   paya lebar
    'payerne'           : 'LSMP', //   payerne (mil/aut
    'peace'             : 'CYPE', //AB peace river airp
    'peachtree/dekalb'  : 'KPDK', //GA peachtree/dekalb
    'pearce'            : 'YPEA', //   pearce (aus-afb)
    'pecos'             : 'KPEQ', //TX pecos city
    'pecs-pogany'       : 'LHPP', //   pecs-pogany
    'pegasus'           : 'NZPG', //   pegasus field
    'peipeinimaru/tin'  : 'PGWT', //GU peipeinimaru/tin
    'peking'            : 'ZBAA',
    'pekoa'             : 'NVSS', //   pekoa arpt/santo
    'pellston'          : 'KPLN', //MI pellston
    'pelly'             : 'CYBB', //NU pelly bay airpor
    'pelotas'           : 'SBPK', //   pelotas
    'pemba'             : 'FQPB', //   pemba
    'pemba/karume'      : 'HTPE', //   pemba/karume arp
    'penang/bayan'      : 'WMKP', //   penang/bayan lep
    'pendleton'         : 'KPDT', //OR pendleton
    'pensacola'         : 'KPNS', //FL pensacola
    'penticton'         : 'CYYF', //BC penticton airpor
    'penza'             : 'UWPP', //   penza (stream)
    'peoria'            : 'KPIA', //IL peoria
    'pereira/matecana'  : 'SKPE', //   pereira/matecana
    'perkasie'          : 'KCKZ', //PA perkasie
    'perm/bolshoe'      : 'USPP', //   perm/bolshoe sav
    'perpignan/rivesa'  : 'LFMP', //   perpignan/rivesa
    'perth'             : 'YPPH', //   perth intl/belmo
    'perugia'           : 'LIRZ', //   perugia
    'pescara'           : 'LIBP', //   pescara
    'peshawar'          : 'OPPS', //   peshawar (civ/mi
    'petawawa'          : 'CYWA', //ON petawawa
    'peterborough'      : 'CYPQ', //ON peterborough arp
    'petersburg'        : 'PAPG', //AK petersburg
    'petrolina'         : 'SBPL', //   petrolina airpor
    'petropavlovsk'     : 'UACP', //   petropavlovsk
    'petropavlovsk-ka'  : 'UHPP', //   petropavlovsk-ka
    'petrozavodsk'      : 'ULPB', //   petrozavodsk
    'pevek'             : 'UHMP', //   pevek
    'phetchabun'        : 'VTPB', //   phetchabun
    'philadelphia'      : 'KPHL', //PA philadelphia
    'phitsanulok'       : 'VTPP', //   phitsanulok
    'phnom-penh/poche'  : 'VDPP', //   phnom-penh/poche
    'phoenix'           : 'KPHX',
    'phoenix/sky'       : 'KPHX', //AZ phoenix/sky hrbr
    'phrae'             : 'VTCP', //   phrae
    'phu'               : 'VVPQ', //   phu quoc
    'phuket'            : 'VTSP', //   phuket intl airp
    'piacenza'          : 'LIMS', //   piacenza (it-afb
    'piarco'            : 'TTPP', //   piarco int airpt
    'pibor'             : 'HSPI', //   pibor post
    'pickle'            : 'CYPL', //ON pickle lake
    'piedras'           : 'MMPG', //   piedras negras
    'pierre'            : 'KPIR', //SD pierre
    'piestany'          : 'LZPP', //   piestany
    'pietermaritzburg'  : 'FAPM', //   pietermaritzburg
    'pietersburg'       : 'FAPB', //   pietersburg (saa
    'pilanesberg'       : 'FAPN', //   pilanesberg
    'pine'              : 'KPBF', //AR pine bluff/gridr
    'pinedale'          : 'KPNA', //WY pinedale r wenz
    'pirassununga/cam'  : 'SBYS', //   pirassununga/cam
    'pisa'              : 'LIRP', //   pisa (civ/it-afb
    'pisco'             : 'SPSO', //   pisco (civ/mil)
    'pitt'              : 'KPGV', //NC pitt greenville
    'pittsburgh'        : 'KPIT', //PA pittsburgh
    'pittsburgh/alleg'  : 'KAGC', //PA pittsburgh/alleg
    'pittsfield'        : 'KPSF', //MA pittsfield
    'piura/capt'        : 'SPUR', //   piura/capt conch
    'plainview'         : 'KPVW', //TX plainview
    'plaisance'         : 'FIMP', //   plaisance
    'plattsburgh'       : 'KPBG', //NY plattsburgh afb
    'playa'             : 'MUPB', //   playa baracoa
    'plotnikovo/tomsk'  : 'UNTT', //   plotnikovo/tomsk
    'plovdiv'           : 'LBPD', //   plovdiv
    'plymouth/roborou'  : 'EGHD', //   plymouth/roborou
    'poca'              : 'MMPA', //   poca rica-tajin
    'pocatello'         : 'KPIH', //ID pocatello
    'podgorica(titogr'  : 'LYPG', //   podgorica(titogr
    'pohang'            : 'RKTH', //   pohang (kor-navy
    'pohnpei'           : 'PTPN', //   pohnpei airport
    'point magu'        : 'KNTD', //CA point mugu nas
    'point salines'     : 'TGPY', //   point salines
    'pointe-noire'      : 'FCPP', //   pointe-noire
    'poitiers/biard(a'  : 'LFBI', //   poitiers/biard(a
    'polokwane'         : 'FAPP', //   polokwane intl
    'polyarny'          : 'UERP', //   polyarny
    'ponca'             : 'KPNC', //OK ponca city
    'ponce/mercedita'   : 'TJPS', //PR ponce/mercedita
    'pond'              : 'CYIO', //NU pond inlet airpo
    'pont-long-uzein/'  : 'LFBP', //   pont-long-uzein/
    'ponta delgada'     : 'LPPD', //   ponta delgada/no
    'ponta pora'        : 'SBPP', //   ponta pora intl
    'pontiac'           : 'KPTK', //MI pontiac
    'pontianak/supadi'  : 'WIOO', //   pontianak/supadi
    'pope'              : 'KPOB', //NC pope afb
    'poprad/tatry'      : 'LZTT', //   poprad/tatry
    'pori'              : 'EFPO', //   pori (mil/civ)
    'port angeles'      : 'KCLM', //WA port angeles
    'port au prince'    : 'MTPP', //   port-au-prince
    'port elizabeth'    : 'FAPE', //   port elizabeth
    'port gentil'       : 'FOOG', //   port gentil
    'port harcourt'     : 'DNPO', //   port harcourt
    'port hardy'        : 'CYZT', //BC port hardy airpo
    'port heldlands'    : 'YPPD', //   port hedland arr
    'port moresby'      : 'AYPY', //   port moresby int
    'port said'         : 'HEPS', //   port said
    'port sudan'        : 'HSPN', //   port sudan intl
    'portage'           : 'CYPG', //MB portage southpor
    'portland maine'    : 'KPWM', //ME
    'portland oregon'   : 'KPDX', //OR portland
    'portland'          : 'KPDX', //OR portland
    'porto alegre'      : 'SBCO', //   porto alegre/can
    'porto santo'       : 'LPPS', //   porto santo isla
    'porto seguro'      : 'SBPS', //   porto seguro
    'porto velho'       : 'SBPV', //   porto velho(cv/m
    'porto/pedras'      : 'LPPR', //   porto/pedras rub
    'portoroz'          : 'LJPZ', //   portoroz
    'portsmouth'        : 'KPSM', //NH portsmouth/pease
    'posadas'           : 'SARP', //   posadas airport
    'poso/kasiguncu'    : 'WAMP', //   poso/kasiguncu
    'poughkeepsie'      : 'KPOU', //NY poughkeepsie
    'powidz'            : 'EPPW', //   powidz airport
    'poznan/lawica'     : 'EPPO', //   poznan/lawica
    'prague'            : 'LKPR',
    'prague/ruzyne'     : 'LKPR', //   prague/ruzyne
    'praia'             : 'GVNP', //   praia intl
    'pratica'           : 'LIRE', //   pratica di mare(
    'prerov'            : 'LKPO', //   prerov
    'prescott'          : 'KPRC', //AZ prescott
    'presidente'        : 'SBDN', //   presidente prude
    'presque'           : 'KPQI', //ME presque isle
    'prestwick(civ/na'  : 'EGPK', //   prestwick(civ/na
    'preveza/aktion'    : 'LGPZ', //   preveza/aktion
    'prince abdulmaje'  : 'OEAO', //   prince abdulmaje
    'prince albert'     : 'CYPA', //SK prince albert ar
    'prince george'     : 'CYXS', //BC prince george
    'prince rupert'     : 'CYPR', //BC prince rupert ar
    'prishtina'         : 'BKPR', //   prishtina
    'providence/green'  : 'KPVD', //RI providence/green
    'providenciales'    : 'MBPV', //   providenciales
    'providenja'        : 'UHMD', //   providenja bay
    'provo'             : 'KPVU', //UT provo muni
    'pruszcz'           : 'EPPR', //   pruszcz gdanski
    'pskov'             : 'ULOO', //   pskov
    'pucallpa'          : 'SPCL', //   pucallpa (civ/mi
    'pudahuel/arturo'   : 'SCEL', //   pudahuel/arturo
    'puebla'            : 'MMPB', //   puebla
    'pueblo'            : 'KPUB', //CO pueblo
    'puerto barrios'    : 'MGPB', //   puerto barrios(
    'puerto cabezas'    : 'MNPC', //   puerto cabezas(
    'puerto escondido'  : 'MMPS', //   puerto escondido
    'puerto lempira'    : 'MHPL', //   puerto lempira
    'puerto maldonado'  : 'SPTU', //   puerto maldonado
    'puerto montt'      : 'SCTE', //   puerto montt/tep
    'puerto plata'      : 'MDPP', //   puerto plata in
    'puerto princesa'   : 'RPVP', //   puerto princesa
    'puerto suarez'     : 'SLPS', //   puerto suarez/sa
    'puerto vallarta'   : 'MMPR', //   puerto vallarta
    'pula'              : 'LDPL', //   pula
    'pullman/moscow'    : 'KPUW', //WA pullman/moscow
    'pune/poona'        : 'VAPO', //   pune/poona (in-a
    'punta arenas'      : 'SCCI', //   punta arenas/pre
    'punta cana'        : 'MDPC', //   punta cana
    'punta gorda'       : 'KPGD', //FL punta gorda
    'puvirgnituq'       : 'CYPX', //QC puvirgnituq
    'pyongtaek'         : 'RKSG', //   pyongtaek (a-511
    'pyongyang/sunan'   : 'ZKPY', //   pyongyang/sunan
    'qaanaaq'           : 'BGQQ', //   qaanaaq
    'qabala'            : 'UBBQ', //   qabala
    'qikiqtarjuaq'      : 'CYVM', //NU qikiqtarjuaq
    'qingdao/tsingtao'  : 'ZSQD', //   qingdao/tsingtao
    'quantico'          : 'KNYG', //VA quantico mcaf
    'quaqtaq'           : 'CYHA', //QC quaqtaq airport
    'quebec'            : 'CYQB', //QC quebec
    'queen alia'        : 'OJAI', //   queen alia intl
    'queen beatrix'     : 'TNCA', //   queen beatrix
    'quelimane'         : 'FQQL', //   quelimane
    'queretaro'         : 'MMQT', //   queretaro
    'quesnel'           : 'CYQZ', //BC quesnel airport
    'quimper/pluguffa'  : 'LFRQ', //   quimper/pluguffa
    'quincy'            : 'KUIN', //IL quincy muni/bald
    'quito/mariscal'    : 'SEQU', //   quito/mariscal s
    'quito/new'         : 'SEQM', //   quito/new intl
    'qurghonteppa'      : 'UTDT', //   qurghonteppa
    'rabat/sale'        : 'GMME', //   rabat/sale (rmaf
    'rabil'             : 'GVBA', //   rabil airport
    'radom'             : 'EPRA', //   radom airport
    'raduzhny'          : 'USNR', //   raduzhny
    'rae'               : 'CYRA', //NT rae lakes
    'rafha'             : 'OERF', //   rafha (private)
    'raipur'            : 'VARP', //   raipur
    'rajiv'             : 'VOHS', //   rajiv gandhi inl
    'rajkot'            : 'VARK', //   rajkot
    'raleigh durham'    : 'KRDU',
    'raleigh'           : 'KRDU',
    'raleigh-durham'    : 'KRDU',
    'raleigh/durham'    : 'KRDU', //NC raleigh/durham
    'ramstein'          : 'ETAR', //   ramstein (usafb)
    'randolph'          : 'KRND', //TX randolph afb
    'rankin'            : 'CYRT', //NU rankin inlet arp
    'ranong'            : 'VTSR', //   ranong
    'rapid'             : 'KRAP', //SD rapid city
    'rarotonga'         : 'NCRG', //   rarotonga cook i
    'ras'               : 'OMRK', //   ras al khaimah
    'rasht'             : 'OIGG', //   rasht
    'rawlins'           : 'KRWL', //WY rawlins municipa
    'rayong/u-taphao'   : 'VTBU', //   rayong/u-taphao
    'reading'           : 'KRDG', //PA reading
    'reagan'            : 'KDCA',
    'recife/guararape'  : 'SBRF', //   recife/guararape
    'red bluff'         : 'KRBL', //CA red bluff
    'red deer'          : 'CYQF', //AB red deer airport
    'red lake'          : 'CYRL', //ON red lake airport
    'redding'           : 'KRDD', //CA redding
    'redmond'           : 'KRDM', //OR redmond
    'redwood'           : 'KRWF', //MN redwood fall
    'reggio'            : 'LICR', //   reggio calabria
    'regina'            : 'CYQR', //SK regina airport
    'reims/champagne'   : 'LFSR', //   reims/champagne
    'remada'            : 'DTTD', //   remada
    'rennes/st.'        : 'LFRN', //   rennes/st. jacqu
    'reno'              : 'KRNO', //NV reno
    'repulse'           : 'CYUT', //NU repulse bay airp
    'resistencia'       : 'SARE', //   resistencia airp
    'resolute'          : 'CYRB', //NU resolute airport
    'reus'              : 'LERS', //   reus (civ/mil)
    'reykjavik'         : 'BIRK', //   reykjavik (notam
    'reynosa'           : 'MMRX', //   reynosa intl arp
    'rheine/bentlage'   : 'ETHE', //   rheine/bentlage
    'rheineck/altenrh'  : 'LSZR', //   rheineck/altenrh
    'rhinelander'       : 'KRHI', //WI rhinelander
    'rhodes/diagoras'   : 'LGRP', //   rhodes/diagoras
    'rhourd'            : 'DAEN', //   rhourd nouss
    'richard\'s bay'         : 'FARB', //   richard's bay
    'richmond'          : 'KRIC', //VA richmond
    'rickenbacker'      : 'KLCK', //OH rickenbacker ang
    'rifle'             : 'KRIL', //CO rifle
    'riga'              : 'EVRA', //   riga airport
    'rijeka/omisalj'    : 'LDRI', //   rijeka/omisalj
    'rimini'            : 'LIPR', //   rimini (civ/it-a
    'rio branco'        : 'SBRB', //   rio branco/medic
    'rio cuarto'        : 'SAOC', //   rio cuarto airpo
    'rio de janeiro'    : 'SBGL', //   galeao/rio(civ/m
    'rio gallegos'      : 'SAWG', //   rio gallegos arp
    'rio grande'        : 'SAWE', //   rio grande airpo
    'rio/jacarepagua'   : 'SBJR', //   rio/jacarepagua
    'riohacha/almiran'  : 'SKRH', //   riohacha/almiran
    'rionegro/jose'     : 'SKRG', //   rionegro/jose ma
    'rivas'             : 'MNRS', //   rivas
    'rivera'            : 'SURV', //   rivera
    'riverside'         : 'KRAL',
    'riverside/march'   : 'KRIV', //CA riverside/march
    'riverton'          : 'KRIW', //WY riverton
    'rivolto'           : 'LIPI', //   rivolto (it-afb)
    'riyadh'            : 'OERY', //   riyadh (saud-afb
    'riyadh/king'       : 'OERK', //   riyadh/king khal
    'rmukalla'          : 'OYRN', //   rmukalla intl
    'roanoke'           : 'KROA', //VA roanoke
    'roatan'            : 'MHRO', //   roatan
    'roberts'           : 'GLRB', //   roberts intl/mon
    'roberval'          : 'CYRJ', //QC roberval airport
    'rochester minnesota'         : 'KRST', //MN rochester
    'rochester'         : 'KROC', //NY rochester
    'rock'              : 'KRKS', //WY rock springs
    'rockford'          : 'KRFD', //IL rockford
    'rockhampton'       : 'YBRK', //   rockhampton airp
    'rockland/knox'     : 'KRKD', //ME rockland/knox
    'rocky'             : 'KRWI', //NC rocky mount
    'rodez/marcillac'   : 'LFCR', //   rodez/marcillac
    'rodrigues/plaine'  : 'FIMR', //   rodrigues/plaine
    'rogers'            : 'KROG', //AR rogers
    'roiet'             : 'VTUV', //   roiet
    'rome'              : 'LIRU',
    'rome/fiumicino'    : 'LIRF', //   rome/fiumicino
    'rome/griffiss'     : 'KRME', //NY rome/griffiss af
    'rome/urbe'         : 'LIRU', //   rome/urbe (it-af
    'romorantin/pruni'  : 'LFYR', //   romorantin/pruni
    'ronchi'            : 'LIPQ', //   ronchi legionari
    'ronne'             : 'EKRN', //   ronne
    'ronneby'           : 'ESDF', //   ronneby (swe-afb
    'roosevelt'         : 'TJNR', //PR roosevelt rd nas
    'roros'             : 'ENRO', //   roros airport
    'rorvik/ryum'       : 'ENRM', //   rorvik/ryum
    'rosario'           : 'SAAR', //   rosario airport
    'roschino'          : 'USTR', //   roschino
    'roseburg'          : 'KRBG', //OR roseburg
    'rostov-on-don'     : 'URRR', //   rostov-on-don
    'roswell'           : 'KROW', //NM roswell
    'rota'              : 'LERT', //   rota naval stati
    'rotenburg'         : 'ETGQ', //   rotenburg
    'roth'              : 'ETHR', //   roth (ger-army)
    'rotterdam'         : 'EHRD', //   rotterdam airpor
    'rouen/boos'        : 'LFOP', //   rouen/boos (aut)
    'rouyn'             : 'CYUY', //QC rouyn airport
    'rovaniemi'         : 'EFRO', //   rovaniemi (civ/m
    'rovno'             : 'UKLR', //   rovno
    'rumbek'            : 'HSMK', //   rumbek
    'rundu'             : 'FYRU', //   rundu
    'russell'           : 'KRSL', //KS russell
    'russkinskaja'      : 'USRK', //   russkinskaja
    'rutland'           : 'KRUT', //VT rutland state
    'rygge'             : 'ENRY', //   rygge (nor-afb)
    'rzeszow/jasionka'  : 'EPRZ', //   rzeszow/jasionka
    'saarbruecken'      : 'EDDR', //   saarbruecken
    'sabadell'          : 'LELL', //   sabadell
    'sabiha'            : 'LTFJ', //   sabiha gokcen
    'sable island'             : 'CWSA', //NS sable island
    'sachon'            : 'RKPS', //   sachon (kor-afb)
    'sachs'             : 'CYSY', //NT sachs harbour(m
    'sacramento'        : 'KSAC', //CA sacramento
    'saddam'  : 'ORBS', //   saddam(irq-afb/c
    'saga'              : 'RJFS', //   saga airport
    'saginaw'           : 'KMBS', //MI saginaw
    'saint anthony'     : 'CYAY', //NL saint anthony ar
    'saint augustine'   : 'KSGJ', //FL st augustine
    'saint catharines'  : 'CYSN', //ON st. catharines a
    'saint catherine'   : 'HESC', //   st catherine
    'saint cloud'       : 'KSTC', //MN st. cloud
    'saint denis'       : 'FMEE', //   st. denis/gillot
    'saint dizier'      : 'LFSI', //   st. dizier/robin
    'saint etienee'     : 'LFMH', //   st etienne/bouth
    'saint gatien'      : 'LFRG', //   st gatien
    'saint george'      : 'KDXZ', //UT saint george
    'saint hubert'      : 'CYHU', //QC saint hubert arp
    'saint john'        : 'CYSJ', //NB saint john
    'saint johns'       : 'CYYT', //NL st johns arp
    'saint joseph'      : 'KSTJ', //MO st. joseph
    'saint leonard'     : 'CYSL', //NB saint leonard ar
    'saint louis'       : 'KSTL', //MO st. louis
    'saint maarten'     : 'TNCM', //   st maarten julia
    'saint nazaire'     : 'LFRZ', //   st. nazaire/mont
    'saint paul island' : 'PASN', //AK st paul island
    'saint paul'        : 'KMSP',
    'saint petersburg'  : 'KPIE', //FL st petersburg
    'saint pierre'      : 'LFVP', //NL st pierre-france
    'saint thomas'      : 'TIST', //   st thomas (king)
    'saint yan'         : 'LFLN', //   saint yan
    'saint-brieuc'      : 'LFRT', //   saint-brieuc arm
    'sainte-marie'      : 'FMMS', //   sainte-marie arp
    'saipan/kobler'     : 'PGSN', //   saipan/kobler
    'saiq'              : 'OOSQ', //   saiq
    'sakirpasa'         : 'LTAF', //   adana/sakirpasa
    'sakon'             : 'VTUI', //   sakon nakhon
    'sal'               : 'GVAC', //   sal isl/amilcar
    'salalah'           : 'OOSA', //   salalah
    'salamanca'         : 'LESA', //   salamanca (civ/m
    'salekhard'         : 'USDD', //   salekhard
    'salem'             : 'KSLE', //OR salem
    'salina'            : 'KSLN', //KS salina
    'salinas'           : 'KSNS', //CA salinas
    'salisbury'         : 'KSBY', //MD salisbury
    'salmon/lemhi'      : 'KSMN', //ID salmon/lemhi
    'salon'             : 'LFMY', //   salon (fafb)
    'salt lake city'    : 'KSLC',
    'salt'              : 'KSLC', //UT salt lake city
    'salta'             : 'SASA', //   salta airport
    'saltillo'          : 'MMIO', //   saltillo
    'salto'             : 'SUSO', //   salto
    'salvador/dois'     : 'SBSV', //   salvador/dois ju
    'salzburg'          : 'LOWS', //   salzburg airport
    'sam'               : 'DNIM', //   sam mbakwe
    'samarkand'         : 'UTSS', //   samarkand
    'samedan'           : 'LSZS', //   samedan
    'samos'             : 'LGSM', //   samos airport
    'samui'             : 'VTSM', //   samui
    'san angelo'        : 'KSJT', //TX san angelo
    'san antonio'       : 'KSAT',
    'san diego'         : 'KSAN',
    'san fernando'      : 'SADF', //   san fernando
    'san francisco'     : 'KSFO',
    'san javier'        : 'LELC', //   san javier(mil/c
    'san jose'          : 'KSJC',
    'san juan'          : 'TJSJ', //PR san juan/wfo
    'san luis obispo'   : 'KSBP', //CA san luis obispo
    'san marcos'        : 'KHYI', //TX san marcos
    'san sebastian'     : 'LESO', //   san sebastian/fu
    'sanana'            : 'WAPN', //   sanana
    'sand point'        : 'PASD', //AK sand point
    'sandakan/kaliman'  : 'WBKS', //   sandakan/kaliman
    'sandspit'          : 'CYZP', //BC sandspit airport
    'sanford/orlando'   : 'KSFB', //FL sanford/orlando
    'sangster/monteg'   : 'MKJS', //   sangster/monteg
    'sanliurfa'         : 'LTCS', //   sanliurfa gap
    'santa ana'         : 'KRAL',
    'santa barbara'     : 'KSBA', //CA santa barbara
    'santa fe'          : 'KSAF', //NM santa fe
    'santa maria'       : 'KSMX', //CA santa maria
    'santa rosa'        : 'KSTS', //CA santa rosa
    'santander'         : 'LEXJ', //   santander/paraya
    'santarem'          : 'SBSN', //   santarem intl ar
    'santiago'          : 'MDST', //   santiago intl a
    'santiago/labacol'  : 'LEST', //   santiago/labacol
    'santo domingo'     : 'MDJB', //   dr balaguer intl
    'santorini'         : 'LGSR', //   santorini island
    'santos dumont'     : 'SBRJ', //   santos dumont/ri
    'sanya'             : 'ZJSY', //   sanya/fenghuang
    'sao jose'          : 'SBSJ', //   sao jose dos cam
    'sao luis'          : 'SBSL', //   sao luis/marecha
    'sao paulo'         : 'SBSP', //   sao paulo/congon
    'sao tome'          : 'FPST', //   sao tome il/sala
    'sarajevo/butmir'   : 'LQSA', //   sarajevo/butmir
    'saranac'           : 'KSLK', //NY saranac lake
    'sarasota'          : 'KSRQ', //FL sarasota/bradent
    'saratov/tsentral'  : 'UWSS', //   saratov/tsentral
    'sarmi/orai'        : 'WAJI', //   sarmi/orai
    'sarnia'            : 'CYZR', //ON sarnia airport
    'sary'              : 'OINZ', //   sary dashte naz
    'saskatoon'         : 'CYXE', //SK saskatoon airpor
    'satenas'           : 'ESIB', //   satenas (swe-afb
    'satu'              : 'LRSM', //   satu mare
    'sauce'             : 'SAAV', //   sauce viejo airp
    'sault'             : 'CYAM', //ON sault ste marie
    'saumlaki'          : 'WAPI', //   saumlaki
    'sauoarkrokur'      : 'BIKR', //   sauoarkrokur
    'saurimo/henrique'  : 'FNSA', //   saurimo/henrique
    'savannah'          : 'KSAV', //GA savannah
    'savannah/hunter'   : 'KSVN', //GA savannah/hunter
    'savannakhet(cv/m'  : 'VLSK', //   savannakhet(cv/m
    'savonlinna'        : 'EFSA', //   savonlinna (aut)
    'sawyer'            : 'KSAW', //MI gwinn/sawyer
    'sayun'             : 'OYSY', //   sayun
    'scampton'          : 'EGXP', //   scampton raf
    'scatsa/shetland'   : 'EGPM', //   scatsa/shetland
    'schaffen'          : 'EBDT', //   schaffen
    'schefferville'     : 'CYKL', //QC schefferville ar
    'schipol'           : 'EHAM', //   amsterdam/schiph
    'schleswig(ger-na'  : 'ETNS', //   schleswig(ger-na
    'schon'             : 'ETHA', //   altenstadt/schon
    'schonefel'         : 'EDDB', //   berlin/schonefel
    'schwaebisch'       : 'EDTY', //   schwaebisch hall
    'schwerin-parchim'  : 'EDOP', //   schwerin-parchim
    'scilly'            : 'EGHE', //   scilly saint mar
    'scott air force base' : 'KBLV', //IL scott afb/bellev
    'scottsbluff'       : 'KBFF', //NE scottsbluff
    'scottsdale'        : 'KSDL', //AZ scottsdale
    'scranton'          : 'KAVP', //PA avoca/wilkes b.
    'sde'               : 'LLSD', //   sde dov airport
    'seattle'           : 'KSEA',
    'seattle/boeing'    : 'KBFI', //WA seattle/boeing
    'seattle/metro'     : 'KSEA', //WA seattle/metro
    'sebha'             : 'HLLS', //   sebha (aut)
    'sedona'            : 'KSEZ', //AZ sedona
    'seeb'              : 'OOMS', //   seeb intl/muscat
    'seinajoki-ilmajo'  : 'EFSI', //   seinajoki-ilmajo
    'selaparang'        : 'WADA', //   selaparang
    'selebi'            : 'FBSP', //   selebi phikwe
    'selfridge'         : 'KMTC', //MI selfridge angb
    'selma'             : 'KSEM',
    'semipalatinsk'     : 'UASS', //   semipalatinsk
    'sendai'            : 'RJSS', //   sendai airport
    'seoul/kimpo'       : 'RKSS', //   seoul/kimpo intl
    'sepinggan'         : 'WALL', //   sepinggan
    'sept'              : 'CYZV', //QC sept iles airpor
    'serui/yendosa'     : 'WABO', //   serui/yendosa
    'setif/ain-arnat'   : 'DAAS', //   setif/ain-arnat
    'sevilla'           : 'LEZL', //   sevilla (civ/mil
    'sevilla/el'        : 'LEEC', //   sevilla/el coper
    'seville'           : 'LETA',
    'seychelles'        : 'FSIA', //   seychelles intl
    'sfax/el-maou'      : 'DTTX', //   sfax/el-maou
    'shaikh'            : 'OPRK', //   shaikh zaid
    'shan-tou'          : 'ZGOW', //   shan-tou
    'shanghai'          : 'ZSPD',
    'shanghai/hongqia'  : 'ZSSS', //   shanghai/hongqia
    'shanghai/pudong'   : 'ZSPD', //   shanghai/pudong
    'shannon'           : 'EINN', //   shannon airport
    'sharjah'           : 'OMSJ', //   sharjah intl arp
    'sharm'             : 'HESH', //   sharm el sheikhi
    'sharurah'          : 'OESH', //   sharurah (civ/mi
    'shatou'            : 'RCBS', //   chinmem/shatou
    'shaw'              : 'KSSC', //SC shaw afb/sumter
    'shawbury'          : 'EGOS', //   shawbury raf
    'shearwater(can'    : 'CYAW', //NS shearwater(can m
    'sheffield'         : 'EGSY',
    'shenyang/taokian'  : 'ZYTX', //   shenyang/taokian
    'shenzhen'          : 'ZGSZ', //   shenzhen
    'sheppard'          : 'KSHP', //TX sheppard afb
    'sherbrooke'        : 'CYSC', //QC sherbrooke
    'sheridan'          : 'KSHR', //WY sheridan
    'shinyanga'         : 'HTSY', //   shinyanga
    'shirak'            : 'UDSG', //   shirak
    'shiraz'            : 'OISS', //   shiraz (civ/afb)
    'shizouka'          : 'RJNS', //   shizouka
    'shoreham-by-sea'   : 'EGKA', //   shoreham-by-sea
    'shreveport'        : 'KSHV', //LA shreveport
    'shreveport/dwntn'  : 'KDTN', //LA shreveport/dwntn
    'sialkot'           : 'OPST', //   sialkot airport
    'siauliai'          : 'EYSA', //   siauliai intl
    'sibiu/turnisor'    : 'LRSB', //   sibiu/turnisor
    'sibu'              : 'WBGS', //   sibu
    'siegerland'        : 'EDGS', //   siegerland
    'siemreap'          : 'VDSR', //   siemreap
    'sigonella'         : 'LICZ', //   sigonella (nas)
    'siirt'             : 'LTCL', //   siirt airport
    'sikhuiphe'         : 'FDSK', //   sikhuiphe
    'sindal'            : 'EKSN', //   sindal airport
    'singapore'         : 'WSSS', //   singapore/changi
    'singapore/seleta'  : 'WSSL', //   singapore/seleta
    'sinop'             : 'LTCM', //   sinop airport
    'sintra/granja'     : 'LPST', //   sintra/granja (a
    'sion'              : 'LSGS', //   sion (mil/civ/au
    'sioux city'        : 'KSUX', //IA sioux city
    'sioux falls'       : 'KFSD', //SD sioux falls
    'sioux lookout'     : 'CYXL', //ON sioux lookout ar
    'sir seretse kham'  : 'FBSK', //   sir seretse kham
    'sirnak'            : 'LTCV', //   sirnak
    'sirte'             : 'HLGD', //   sirte
    'sisimiut'          : 'BGSS', //   sisimiut
    'sitia'             : 'LGST', //   sitia airport
    'sitka'             : 'PASI', //AK sitka
    'sivas'             : 'LTAR', //   sivas (civ/mil)
    'sivrihisar'        : 'LTAV', //   sivrihisar
    'skagway'           : 'PAGY', //AK skagway
    'skavsta/stockho'   : 'ESKN', //   skavsta/stockho
    'skelleftea'        : 'ESNS', //   skelleftea airpo
    'skiathos'          : 'LGSK', //   skiathos island
    'skien/geiterygge'  : 'ENSN', //   skien/geiterygge
    'skiros'            : 'LGSY', //   skiros
    'skive'             : 'EKSV', //   skive airport
    'skopje/petrovac'   : 'LWSK', //   skopje/petrovac
    'skrydstrup(dan-a'  : 'EKSP', //   skrydstrup(dan-a
    'slave'             : 'CYZH', //AB slave lake airpo
    'sleipner'          : 'ENSL', //   sleipner a platf
    'sliac'             : 'LZSL', //   sliac
    'slidell'           : 'KASD', //LA slidell 22
    'sligo'             : 'EISG', //   sligo arpt
    'smithers'          : 'CYYD', //BC smithers airport
    'soekarno-hatta'    : 'WIII', //   soekarno-hatta i
    'soesterberg'       : 'EHSB', //   soesterberg rnla
    'sofia'             : 'LBSF', //   sofia
    'sohag'             : 'HESG', //   sohag
    'sohar'             : 'OOSH', //   sohar majis
    'sokoto'            : 'DNSO', //   sokoto
    'sola/vanua'        : 'NVSC', //   sola/vanua lava
    'solenzara'         : 'LFKS', //   solenzara (fafb)
    'solwezi'           : 'FLSW', //   solwezi
    'somerset'          : 'KSME', //KY somerset
    'sonderborg'        : 'EKSB', //   sonderborg airpo
    'sondre'            : 'BGSF', //   sondre stromfjor
    'songea'            : 'HTSO', //   songea
    'songkhla(thai-na'  : 'VTSH', //   songkhla(thai-na
    'songmu'            : 'RKTE', //   songmu (kor-afb)
    'sonora'            : 'KSOA', //TX sonora
    'sorong/jefman'     : 'WASS', //   sorong/jefman
    'sorvaag/vagar'     : 'EKVG', //   sorvaag/vagar
    'sotchi'            : 'URSS', //   sotchi
    'soto'              : 'MHSC', //   soto cano ab
    'souda/khania'      : 'LGSA', //   souda/khania (af
    'south bend'        : 'KSBN', //IN south bend
    'south lake tahoe'  : 'KTVL',
    'southampton'       : 'EGHI', //   southampton wx c
    'southend-on-sea'   : 'EGMC', //   southend-on-sea
    'soyo'              : 'FNSO', //   soyo
    'spaa'              : 'EPTM', //   spaa glinnik
    'spangdahlem'       : 'ETAD', //   spangdahlem (usa
    'sparrevohn'        : 'PASV', //AK sparrevohn
    'spartansberg'      : 'KGSP', //SC greer/spartansbg
    'spence'            : 'CYYH', //NU spence bay airpo
    'split/kastel'      : 'LDSP', //   split/kastel sta
    'spokane/felts'     : 'KSFF', //WA spokane/felts
    'spokane/metro'     : 'KGEG', //WA spokane/metro
    'springbok'         : 'FASB', //   springbok
    'springfield illinois'       : 'KSPI', //IL springfield
    'springfield'       : 'KSGF', //MO springfield
    'st athan'          : 'EGDX', //   st athan raf
    'stanley'           : 'SFAL', //   stanley airport
    'stansted'          : 'EGSS', //   stansted airport
    'state'             : 'KUNV', //PA state college
    'stauning'          : 'EKVJ', //   stauning airport
    'stavanger/sola(a'  : 'ENZV', //   stavanger/sola(a
    'staverton'         : 'EGBJ', //   staverton (priva
    'stavropol/shpako'  : 'URMT', //   stavropol/shpako
    'stephenville'      : 'CYJT', //NL stephenville arp
    'stockholm/arland'  : 'ESSA', //   stockholm/arland
    'stockholm/bromma'  : 'ESSB', //   stockholm/bromma
    'stockton'          : 'KSCK', //CA stockton
    'stony'             : 'CYSF', //SK stony rapids arp
    'stord/soerstokke'  : 'ENSO', //   stord/soerstokke
    'stornoway'         : 'EGPO', //   stornoway
    'strasbourg/entzh'  : 'LFST', //   strasbourg/entzh
    'stuart/witham'     : 'KSUA', //FL stuart/witham
    'stuttgart/echter'  : 'EDDS', //   stuttgart/echter
    'suceava/salcea'    : 'LRSV', //   suceava/salcea
    'sucre/juana'       : 'SLSU', //   sucre/juana azur
    'sudbury'           : 'CYSB', //ON sudbury airport
    'sukhothai'         : 'VTPO', //   sukhothai
    'sukkur'            : 'OPSK', //   sukkur
    'sulaymaniyah'      : 'ORSU', //   sulaymaniyah
    'suleyman'          : 'LTFC', //   suleyman demirel
    'sumburgh'          : 'EGPB', //   sumburgh (cape)
    'sundsvall/harnos'  : 'ESNN', //   sundsvall/harnos
    'sungshan/taipei'   : 'RCSS', //   sungshan/taipei
    'sur'               : 'OOSR', //   sur
    'surabaya/juanda'   : 'WRSJ', //   surabaya/juanda
    'surat'             : 'VTSB', //   surat thani
    'surgut'            : 'USRR', //   surgut
    'surin'             : 'VTUJ', //   surin
    'suwon'             : 'RKSW', //   suwon (us/kor-af
    'svalbard/longyea'  : 'ENSB', //   svalbard/longyea
    'svolvaer/helle'    : 'ENSH', //   svolvaer/helle
    'swansboro'         : 'KNJM', //NC bogue/swansboro
    'swartkop'          : 'FASK', //   swartkop (saaf)
    'swidwin'           : 'EPSN', //   swidwin arpt
    'swift'             : 'CYYN', //SK swift curren
    'syamsudin'         : 'WAOO', //   syamsudin noor
    'sydney'            : 'CYQY', //NS sydney airport
    'syktyvkar'         : 'UUYY', //   syktyvkar
    'syracuse'          : 'KSYR', //NY syracuse
    'szczecin/golenio'  : 'EPSC', //   szczecin/golenio
    'szolnok'           : 'LHSN', //   szolnok
    'taba'              : 'HETB', //   taba intl
    'tabarka'           : 'DTKA', //   tabarka
    'tabatinga'         : 'SBTT', //   tabatinga intl a
    'tabriz(iran-ab/c'  : 'OITT', //   tabriz(iran-ab/c
    'tabuk'             : 'OETB', //   tabuk (saud-afb)
    'tacna/ciriani'     : 'SPTN', //   tacna/ciriani
    'tacoma/mc'         : 'KTCM', //WA tacoma/mc chord
    'taegu'             : 'RKTN', //   taegu (us/kor-af
    'tahiti-faaa'       : 'NTAA', //   tahiti-faaa poly
    'tahuna/naha'       : 'WAMH', //   tahuna/naha
    'taif'              : 'OETF', //   taif (civ/mil)
    'tainan'            : 'RCNN', //   tainan tw-afb
    'taipei'            : 'RCTP', //   taipei taoyuan
    'taiyuan/wusu'      : 'ZBYN', //   taiyuan/wusu
    'taiz/ganed'        : 'OYTZ', //   taiz/ganed
    'tak'               : 'VTPT', //   tak
    'takamatsu'         : 'RJOT', //   takamatsu airpor
    'takoradi'          : 'DGTK', //   takoradi (afb)
    'talara/capt'       : 'SPYL', //   talara/capt mont
    'talavera'          : 'LEBZ', //   talavera ab/bada
    'talkeetna'         : 'PATK', //AK talkeetna
    'talladega'         : 'KASN', //AL talladega
    'tallahassee'       : 'KTLH', //FL tallahassee
    'tallinn'           : 'EETN', //   tallinn
    'tamanrasset/ague'  : 'DAAT', //   tamanrasset/ague
    'tamatave/toamasi'  : 'FMMT', //   tamatave/toamasi
    'tampa'             : 'KTPA', //FL tampa
    'tampere/pirkkala'  : 'EFTP', //   tampere/pirkkala
    'tampico/gen'       : 'MMTM', //   tampico/gen fj m
    'tamworth'          : 'YSTW', //   tamworth airport
    'tanagra'           : 'LGTG', //   tanagra airport
    'tanah'             : 'WAKT', //   tanah merah
    'tanana'            : 'PATA', //AK tanana
    'tangier/boukhalf'  : 'GMTT', //   tangier/boukhalf
    'tanna'             : 'NVVW', //   tanna
    'tapachula'         : 'MMTP', //   tapachula
    'tarapoto'          : 'SPST', //   tarapoto
    'tarawa'            : 'NGTA', //   tarawa kiribati
    'taraz'             : 'UADD', //   taraz
    'tarbes/ossun'      : 'LFBT', //   tarbes/ossun
    'taree'             : 'YTRE', //   taree airport
    'tarija/capt'       : 'SLTJ', //   tarija/capt orie
    'tarin'             : 'EQTK', //   tarin kowt
    'tartu'             : 'EETU', //   tartu
    'tashkent-vostoch'  : 'UTTP', //   tashkent-vostoch
    'tasiujaq'          : 'CYTQ', //QC tasiujaq a
    'taskent/yuzni'     : 'UTTT', //   taskent/yuzni
    'tatalina'          : 'PATL', //AK tatalina afs
    'tawau/kalimantan'  : 'WBKW', //   tawau/kalimantan
    'tbilisi/novo-al'   : 'UGTB', //   tbilisi/novo-al
    'tebessa'           : 'DABS', //   tebessa
    'tees-side'         : 'EGNV', //   tees-side
    'tefe'              : 'SBTF', //   tefe
    'tegel'             : 'EDDT', //   berlin/tegel (fa
    'tegucigalpa/ton'   : 'MHTG', //   tegucigalpa/ton
    'tehran/mehrabad'   : 'OIII', //   tehran/mehrabad
    'tela'              : 'MHTE', //   tela
    'telfer'            : 'YTEF', //   telfer airport
    'telluride'         : 'KTEX', //CO telluride region
    'tempelhof'         : 'EDDI', //   berlin/tempelhof
    'temuco'            : 'SCQP', //   temuco
    'temuco/maquehue'   : 'SCTC', //   temuco/maquehue
    'tenerife'          : 'GCTS', //   tenerife sur/rei
    'tenerife/los'      : 'GCXO', //   tenerife/los rod
    'teniente'          : 'SCNT', //   teniente gallard
    'tennant'           : 'YTNK', //   tennant creek
    'tepic'             : 'MMEP', //   tepic
    'teresina'          : 'SBTE', //   teresina airport
    'termez'            : 'UTST', //   termez
    'ternate/babullah'  : 'WAMT', //   ternate/babullah
    'terrace'           : 'CYTJ', //ON terrace bay (saw
    'terre'             : 'KHUF', //IN terre haute
    'teslin'            : 'CYZW', //YT teslin arpt (aut
    'tete'              : 'FQTE', //   tete
    'tete/chingozi'     : 'FQTT', //   tete/chingozi
    'teterboro'         : 'KTEB', //NJ teterboro
    'texarkana'         : 'KTXK', //AR texarkana
    'the dalles'        : 'KDLS', //OR the dalles
    'the pas'           : 'CYQD', //MB the pas airport
    'thermal/palm'      : 'KTRM', //CA thermal/palm spg
    'thessaloniki/mik'  : 'LGTS', //   thessaloniki/mik
    'thief'             : 'KTVF', //MN thief river
    'thiruvananthapur'  : 'VOTV', //   thiruvananthapur
    'thisted'           : 'EKTS', //   thisted arpt (au
    'thompson'          : 'CYTH', //MB thompson airport
    'thule'             : 'BGTL', //   thule ab
    'thumrait'          : 'OOTH', //   thumrait (om-afb
    'thunder'           : 'CYQT', //ON thunder bay
    'tianjin/zhanggui'  : 'ZBTJ', //   tianjin/zhanggui
    'tiaret'            : 'DAOB', //   tiaret
    'tigu'              : 'LRTM', //   tigu mures/vidra
    'tijuana'           : 'MMTJ', //   tijuana intl arp
    'tikal'             : 'MGTK', //   tikal intl
    'tiksi'             : 'UEST', //   tiksi
    'tilrempt/hassi'    : 'DAFH', //   tilrempt/hassi
    'timimoun'          : 'DAUT', //   timimoun
    'timisoara/giarma'  : 'LRTR', //   timisoara/giarma
    'timmins'           : 'CYTS', //ON timmins airport
    'tin'               : 'PATC', //AK tin city afs
    'tindouf'           : 'DAOF', //   tindouf
    'tinfouye'          : 'DAEF', //   tinfouye
    'tingo'             : 'SPGM', //   tingo maria
    'tinker'            : 'KTIK', //OK tinker afb
    'tioman'            : 'WMBT', //   tioman island
    'tirana'            : 'LATI', //   tirana
    'tiree'             : 'EGPU', //   tiree island
    'tirstrup'          : 'EKAH', //   tirstrup (civ/mi
    'tiruchchirapalli'  : 'VOTR', //   tiruchchirapalli
    'titusville'        : 'KTIX', //FL titusville
    'tivat'             : 'LYTV', //   tivat
    'tlemcen/zenata'    : 'DAON', //   tlemcen/zenata
    'tobias'            : 'MRPV', //   tobias bolano
    'tocumen'           : 'MPTO', //   tocumen
    'tofino'            : 'CYAZ', //BC tofino airport
    'tokat'             : 'LTAW', //   tokat
    'tokyo'             : 'RJTT', //   tokyo intl airpo
    'toledo'            : 'KTOL', //OH toledo
    'toli-toli/lalos'   : 'WAMI', //   toli-toli/lalos
    'tolmachevo'        : 'UNNT', //   tolmachevo
    'toluca/jose'       : 'MMTO', //   toluca/jose mari
    'tonopah'           : 'KTPH', //NV tonopah
    'topcliffe'         : 'EGXZ', //   topcliffe raf
    'topeka'            : 'KTOP', //KS topeka
    'topeka/forbes'     : 'KFOE', //KS topeka/forbes
    'topel'             : 'LTBQ', //   topel (tur-afb)
    'torino/caselle'    : 'LIMF', //   torino/caselle
    'toronto'           : 'CYYZ', //ON toronto/pearson
    'torp'              : 'ENTO', //   torp (civ/nor-af
    'torrejon'          : 'LETO', //   torrejon (usafb)
    'torreon'           : 'MMTC', //   torreon airport
    'touat'             : 'DAUA', //   adrar/touat
    'touggourt/sidi'    : 'DAUK', //   touggourt/sidi m
    'touho'             : 'NWWU', //   touho
    'toulouse/blagnac'  : 'LFBO', //   toulouse/blagnac
    'tours/st'          : 'LFOT', //   tours/st symphor
    'toussus'           : 'LFPN', //   toussus le noble
    'townsville(civ/m'  : 'YBTL', //   townsville(civ/m
    'toyama'            : 'RJNT', //   toyama airport
    'tozeur/nefta'      : 'DTTZ', //   tozeur/nefta
    'trabzon'           : 'LTCG', //   trabzon
    'trang'             : 'VTST', //   trang
    'trapani/birgi'     : 'LICT', //   trapani/birgi (a
    'trat/khao'         : 'VTBO', //   trat/khao saming
    'traverse'          : 'KTVC', //MI traverse cit
    'travis'            : 'KSUU', //CA travis afb/fairf
    'trelew/almirante'  : 'SAVT', //   trelew/almirante
    'trenton'           : 'KTTN', //NJ trenton
    'treviso(civ/it-a'  : 'LIPH', //   treviso(civ/it-a
    'trinidad/jorge'    : 'SLTR', //   trinidad/jorge h
    'tripoli'           : 'HLLT', //   tripoli intl arp
    'trois'             : 'CYRQ', //QC trois rivieres
    'trollenhagen'      : 'ETNU', //   trollenhagen
    'trollhattan'       : 'ESGT', //   trollhattan (pvt
    'tromso/langnes'    : 'ENTC', //   tromso/langnes
    'trondheim/vaerne'  : 'ENVA', //   trondheim/vaerne
    'troutdale'         : 'KTTD', //OR troutdale
    'troy'              : 'KTOI', //AL troy
    'troyes/barberey'   : 'LFQB', //   troyes/barberey
    'truckee'           : 'KTRK', //CA truckee tahoe
    'trujillo/martine'  : 'SPRU', //   trujillo/martine
    'truth'             : 'KTCS', //NM truth or conseq.
    'tsentralny/omsk'   : 'UNOO', //   tsentralny/omsk
    'tucson'            : 'KTUS', //AZ tucson
    'tucuman/teniente'  : 'SANT', //   tucuman/teniente
    'tucumcari'         : 'KTCC', //NM tucumcari
    'tucurui'           : 'SBTU', //   tucurui
    'tuktoyaktuk'       : 'CYUB', //NT tuktoyaktuk
    'tulcea'            : 'LRTC', //   tulcea
    'tulear/toliara'    : 'FMST', //   tulear/toliara
    'tulsa'             : 'KTUL', //OK tulsa
    'tumbes/pedro'      : 'SPME', //   tumbes/pedro can
    'tunis/carthage'    : 'DTTA', //   tunis/carthage
    'tupelo'            : 'KTUP', //MS tupelo
    'turaif'            : 'OETR', //   turaif
    'turany'            : 'LKTB', //   brno/turany
    'turkmenabat'       : 'UTAV', //   turkmenabat
    'turkmenbashi'      : 'UTAK', //   turkmenbashi
    'turks'             : 'MBGT', //   turks island
    'turku/abo'         : 'EFTU', //   turku/abo
    'tuscaloosa'        : 'KTCL', //AL tuscaloosa
    'tuxtla'            : 'MMTB', //   tuxtla gutierrez
    'tuzla'             : 'LQTZ', //   tuzla
    'twelth'            : 'EPMI', //   twelth airbase
    'twente'            : 'EHTW', //   twente rnlafb
    'twentynine'        : 'KNXP', //CA twentynine palms
    'twin'              : 'KTWF', //ID twin falls
    'tyler'             : 'KTYR', //TX tyler
    'tyndall'           : 'KPAM', //FL tyndall afb
    'tyra'              : 'EKGF', //   tyra oest
    'uberaba'           : 'SBUR', //   uberaba
    'uberlandia'        : 'SBUL', //   uberlandia
    'ubon/ratchathani'  : 'VTUU', //   ubon/ratchathani
    'udon'              : 'VTUD', //   udon thani(civ/a
    'ugryumovo'         : 'UUBC', //   ugryumovo
    'ukhta'             : 'UUYH', //   ukhta
    'ukiah'             : 'KUKI', //CA ukiah
    'ulan-bator'        : 'ZMUB', //   ulan-bator
    'ulan-ude/muhino'   : 'UIUU', //   ulan-ude/muhino
    'uljanovsk'         : 'UWLL', //   uljanovsk
    'ulsan'             : 'RKPU', //   ulsan
    'ulyanovsk'         : 'UWLW', //   ulyanovsk
    'umea'              : 'ESNU', //   umea airport
    'umtata/mthatha'    : 'FAUT', //   umtata/mthatha
    'unalakleet'        : 'PAUN', //AK unalakleet
    'upernavik'         : 'BGUK', //   upernavik
    'upington/pierre'   : 'FAUP', //   upington/pierre
    'upolu island'      : 'NSAP', //   apia/upolu islan
    'uppsala'           : 'ESCM', //   uppsala (swe-afb
    'uralsk'            : 'UARR', //   uralsk
    'urbana champaign'  : 'KCMI', //IL champaign/urbana
    'urbana'            : 'KCMI', //IL champaign/urbana
    'urfa/sanilurfa'    : 'LTCH', //   urfa/sanilurfa
    'urgench'           : 'UTNU', //   urgench
    'uruapan/gen'       : 'MMPN', //   uruapan/gen rayo
    'uruguaiana/rubem'  : 'SBUG', //   uruguaiana/rubem
    'urum-qi/diwopu'    : 'ZWWW', //   urum-qi/diwopu
    'usaf'              : 'KAFF', //CO usaf academy/cos
    'usak'              : 'LTBO', //   usak
    'ushuaia'           : 'SAWH', //   ushuaia (arg-nav
    'usinsk'            : 'UUYS', //   usinsk
    'ust'               : 'UASK', //   ust kamenogorsk
    'utica'             : 'KUCA', //NY utica
    'utti'              : 'EFUT', //   utti (fin-afb)
    'uummannaq/qaarsu'  : 'BGUQ', //   uummannaq/qaarsu
    'uytash'            : 'URML', //   uytash
    'uzhgorod'          : 'UKLU', //   uzhgorod
    'uzice-ponikve'     : 'LYUZ', //   uzice-ponikve
    'vaasa'             : 'EFVA', //   vaasa
    'vadso'             : 'ENVD', //   vadso
    'vaerlose'          : 'EKVL', //   vaerlose (dan-af
    'val'               : 'CYVO', //QC val d'or airport
    'valcartier'        : 'CYOY', //QC valcartier airpo
    'valdez'            : 'PAVD', //AK valdez
    'valdivia/pichoy'   : 'SCVD', //   valdivia/pichoy
    'valdosta'          : 'KVLD', //GA valdosta regiona
    'valencia'          : 'LEVC', //   valencia (civ/mi
    'valentine'         : 'KVTN', //NE valentine
    'valkenburg'        : 'EHVB', //   valkenburg (navy
    'valladolid(mil/c'  : 'LEVD', //   valladolid(mil/c
    'valley'            : 'EGOV', //   valley raf
    'vamdrup'           : 'EKVD', //   vamdrup (aut/man
    'van nuys'               : 'KVNY', //CA van nuys
    'vance air force base' : 'KEND', //OK enid/vance afb
    'vancouver'         : 'CYVR', //BC vancouver intl a
    'vandel'            : 'EKVA', //   vandel (dan-afb)
    'vandenberg'        : 'KVBG', //CA vandenberg afb
    'vanimo'            : 'AYVN', //   vanimo airport
    'varadero'          : 'MUVR', //   varadero
    'varanasi/babatpu'  : 'VIBN', //   varanasi/babatpu
    'varkaus'           : 'EFVR', //   varkaus
    'varna'             : 'LBWN', //   varna
    'vasteras/hasslo'   : 'ESOW', //   vasteras/hasslo
    'vaxjo/kronoberg'   : 'ESMX', //   vaxjo/kronoberg
    'vegas'             : 'KLAS',
    'vegas/henderson'   : 'KHND', //NV vegas/henderson
    'velikie'           : 'ULOL', //   velikie luki
    'venezia/tessera'   : 'LIPZ', //   venezia/tessera
    'venezuela/ciego'   : 'MUCA', //   venezuela/ciego
    'veracruz'          : 'MMVR', //   veracruz
    'vernal'            : 'KVEL', //UT vernal
    'vero'              : 'KVRB', //FL vero beach
    'vestmannaeyjar'    : 'BIVM', //   vestmannaeyjar (
    'vicenza(civ/it-a'  : 'LIPT', //   vicenza(civ/it-a
    'vichy/charmeil'    : 'LFLV', //   vichy/charmeil
    'victoria falls'          : 'FVFA', //   victoria falls
    'victoria texas'          : 'KVCT', //TX victoria
    'victoria'          : 'CYYJ', //BC victoria intl ar
    'vidsel'            : 'ESPE', //   vidsel (swe-afb)
    'vienna/schwechat'  : 'LOWW', //   vienna/schwechat
    'vientiane/wattay'  : 'VLVT', //   vientiane/wattay
    'vigie/st'          : 'TLPC', //   vigie/st lucia
    'vigo/peinador'     : 'LEVX', //   vigo/peinador
    'vigra'             : 'ENAL', //   alesund/vigra
    'vijayawada/ganna'  : 'VOBZ', //   vijayawada/ganna
    'vilanculos'        : 'FQVL', //   vilanculos
    'vilhena'           : 'SBVH', //   vilhena
    'villa'             : 'SAOR', //   villa reynolds a
    'villacoublay/vel'  : 'LFPV', //   villacoublay/vel
    'villafranca(cv/m'  : 'LIPX', //   villafranca(cv/m
    'villahermosa'      : 'MMVA', //   villahermosa
    'vilnius'           : 'EYVI', //   vilnius intl
    'vinnitsa'          : 'UKWW', //   vinnitsa
    'virginia beach'    : 'KORF',
    'viru'              : 'SLVR', //   viru viru intl a
    'visalia'           : 'KVIS', //CA visalia muni
    'visby'             : 'ESSV', //   visby airport
    'vitebsk'           : 'UMII', //   vitebsk
    'viterbo'           : 'LIRV', //   viterbo (it-mil)
    'vitoria'           : 'LEVT', //   vitoria
    'vitoria/goiabeir'  : 'SBVT', //   vitoria/goiabeir
    'vladivostok'       : 'UHWW', //   vladivostok
    'voeslau-kottingb'  : 'LOAV', //   voeslau-kottingb
    'volgograd/gumrak'  : 'URWW', //   volgograd/gumrak
    'volk/camp'         : 'KVOK', //WI volk/camp dougla
    'volkel'            : 'EHVK', //   volkel rnlafb
    'vologda'           : 'ULWW', //   vologda
    'vorkuta'           : 'UUYW', //   vorkuta
    'voronez'           : 'UUOO', //   voronez
    'vrsac'             : 'LYVR', //   vrsac
    'wabush'            : 'CYWK', //NL wabush lake airp
    'waco'              : 'KACT', //TX waco
    'waddington'        : 'EGXW', //   waddington raf
    'wadi'              : 'OEWD', //   wadi al dawaser
    'wagga'             : 'YSWG', //   wagga wagga(cv/m
    'wake'              : 'PWAK', //UM wake island airf
    'wales'             : 'EGFF', //   cardiff-wales ar
    'wall'              : 'TQPF', //   wall blake
    'walla'             : 'KALW', //WA walla walla
    'walvis'            : 'FYWB', //   walvis bay
    'wamena/irian'      : 'WAJW', //   wamena/irian jay
    'wangaratta'        : 'YWGT', //   wangaratta arp
    'warner'            : 'KWRB', //GA warner robins af
    'warsaw'            : 'LHBP',
    'warsaw/okecie'     : 'EPWA', //   warsaw/okecie
    'wash'              : 'KIAD', //VA wash dc/dulles
    'washington/natl'   : 'KDCA', //DC washington/natl
    'wasington dc'      : 'KDCA',
    'waskaganish'       : 'CYKQ', //QC waskaganish airp
    'waterford'         : 'EIWF', //   waterford arpt
    'waterkloof'        : 'FAWK', //   waterkloof (saaf
    'waterloo iowa'          : 'KALO', //IA waterloo
    'waterloo'          : 'CYKF', //ON waterloo well
    'watertown south dakota'         : 'KATY', //SD watertown
    'watertown'         : 'KART', //NY watertown
    'watson'            : 'CYQH', //YT watson lake airp
    'wattisham'         : 'EGUW', //   wattisham raf
    'waukesha'          : 'KUES', //WI waukesha cnty
    'wausau'            : 'KAUW', //WI wausau
    'wawa'              : 'CYXZ', //ON wawa airport
    'weimar'            : 'EDDE', //   erfurt/bindersle
    'wejh'              : 'OEWJ', //   wejh
    'wekweeti'          : 'CYWE', //NT wekweeti
    'wellington'        : 'NZWN', //   wellington intl
    'wenatchee'         : 'KEAT', //WA wenatchee
    'wendover'          : 'KENV', //UT wendover (aut)
    'weno'              : 'PTKK', //   weno is/chuuk
    'west'              : 'KPBI', //FL west palm beach
    'westchester'       : 'KHPN',
    'westerland/sylt'   : 'EDXW', //   westerland/sylt
    'westfield'         : 'KBAF', //MA westfield
    'westover'          : 'KCEF', //MA chicopee/westove
    'wewak'             : 'AYWK', //   wewak intl airpo
    'wharton'           : 'EGNO', //   wharton
    'wheeler'           : 'PHHI', //HI wheeler afb/oahu
    'wheeling'          : 'KHLG', //WV wheeling
    'whidbey'           : 'KNUW', //WA whidbey is. nas
    'white'             : 'KHPN', //NY white plains
    'whitecourt'        : 'CYZU', //AB whitecourt airpo
    'whitefield'        : 'KHIE', //NH whitefield
    'whitehorse'        : 'CYXY', //YT whitehorse airpo
    'whiteman'          : 'KSZL', //MO whiteman afb
    'whiting'           : 'KNSE', //FL whiting fld nas
    'whyalla'           : 'YWHA', //   whyalla airport
    'wiarton'           : 'CYVV', //ON wiarton air
    'wichita falls'     : 'KSPS', //TX wichita fall
    'wichita'           : 'KICT', //KS wichita
    'wick'              : 'EGPC', //   wick
    'wide awake'        : 'FHAW', //   wide awake field
    'wiener neustadt'   : 'LOAN', //   wr.neustadt east
    'wiesbaden'         : 'ETOU', //   wiesbaden (usa-a
    'williams'          : 'CYWL', //BC williams lake ar
    'williamsport'      : 'KIPT', //PA williamsport
    'williamtown'       : 'YWLM', //   williamtown arp
    'williston'         : 'KISN', //ND williston
    'wilmington north carolina'        : 'KILM', //NC wilmington
    'wilmington ohio'        : 'KILN', //OH wilmington
    'wilmington'        : 'KILG', //DE wilmington
    'windhoek'          : 'FYWW', //   windhoek
    'windsor ontario'           : 'CYQG', //ON windsor airport
    'windsor'           : 'KBDL', //CT windsor locks
    'wink'              : 'KINK', //TX wink
    'winnemucca'        : 'KWMC', //NV winnemucca
    'winnipeg'          : 'CYWG', //MB winnipeg intl ar
    'winslow'           : 'KINW', //AZ winslow
    'winston'           : 'KINT', //NC winston salem
    'wittering'         : 'EGXT', //   wittering raf
    'wittmundhaven(ga'  : 'ETNT', //   wittmundhaven(ga
    'woensdrecht'       : 'EHWO', //   woensdrecht rnla
    'wolf'              : 'KOLF', //MT wolf point
    'wolverhampton'     : 'EGBO',
    'wonderboom/preto'  : 'FAWB', //   wonderboom/preto
    'woodvale'          : 'EGOW', //   woodvale raf
    'woodward'          : 'KWWR', //OK woodward
    'woomera'           : 'YPWR', //   woomera (aus-afb
    'worcester'         : 'KORH', //MA worcester
    'worland'           : 'KWRL', //WY worland
    'wrangell'          : 'PAWG', //AK wrangell
    'wright'            : 'KFFO', //OH wright patterson
    'wrightst/mcguire'  : 'KWRI', //NJ wrightst/mcguire
    'wroclaw/strachow'  : 'EPWR', //   wroclaw/strachow
    'wuchia'            : 'RCMQ', //   wuchia observato
    'wuhan/nanhu'       : 'ZHHH', //   wuhan/nanhu
    'wunstorf'          : 'ETNW', //   wunstorf (ger-af
    'wyton'             : 'EGUY', //   wyton raf
    'xiamen'            : 'ZSAM', //   xiamen
    'xianyang'          : 'ZLXY', //   xianyang
    'yacuiba'           : 'SLYA', //   yacuiba
    'yakima'            : 'KYKM', //WA yakima
    'yakutat'           : 'PAYA', //AK yakutat
    'yakutsk'           : 'UEEE', //   yakutsk
    'yambio'            : 'HSYA', //   yambio
    'yamoussoukro'      : 'DIYO', //   yamoussoukro
    'yangon'            : 'VYYY', //   yangon intl myan
    'yangyang'          : 'RKNY', //   yangyang intl
    'yaounde'           : 'FKYS', //   yaounde
    'yap'               : 'PTYA', //   yap island
    'yarmouth'          : 'CYQI', //NS yarmouth airport
    'yaroslav'          : 'UUDL', //   yaroslav
    'yazd'              : 'OIYY', //   yazd
    'yechon'            : 'RKTY', //   yechon (kor-afb)
    'yellowknife'       : 'CYZF', //NT yellowknife airp
    'yenbo'             : 'OEYN', //   yenbo
    'yenisehir'         : 'LTBR', //   yenisehir ab
    'yeovilton'         : 'EGDY', //   yeovilton (navy)
    'yerevan/zapadny'   : 'UGEE', //   yerevan/zapadny
    'yokosuka'          : 'RJTX', //   yokosuka fwf
    'yokota'            : 'RJTY', //   yokota (jasdf/us
    'yola'              : 'DNYO', //   yola
    'yorkshire/humber'  : 'EGSY', //   yorkshire/humber
    'yorkton'           : 'CYQV', //SK yorkton airport
    'yoro'              : 'MHYR', //   yoro
    'yosu'              : 'RKJY', //   yosu airport
    'youngstown'        : 'KYNG', //OH youngstown
    'yuma'              : 'KYUM', //AZ yuma intl
    'yurimaguas/moise'  : 'SPMS', //   yurimaguas/moise
    'zacatecas'         : 'MMZC', //   zacatecas arpt
    'zadar/zemunik'     : 'LDZD', //   zadar/zemunik
    'zagreb/pleso'      : 'LDZA', //   zagreb/pleso
    'zahedan'           : 'OIZH', //   zahedan intl arp
    'zakataly'          : 'UBBY', //   zakataly
    'zakinthos'         : 'LGZA', //   zakinthos airpor
    'zamboanga'         : 'RPMZ', //   zamboanga (civ/a
    'zanesville'        : 'KZZV', //OH zanesville
    'zanzibar/kisauni'  : 'HTZA', //   zanzibar/kisauni
    'zaragoza'          : 'LEZG', //   zaragoza (mil/ci
    'zell'              : 'LOWZ', //   zell am see
    'zeltweg'           : 'LOXZ', //   zeltweg (mil)
    'zhengding'         : 'ZBSJ', //   zhengding
    'zhengzhou'         : 'ZHCC', //   zhengzhou
    'zhezkazgan'        : 'UAKD', //   zhezkazgan
    'zielona'           : 'EPZG', //   zielona gora
    'zilina'            : 'LZZI', //   zilina
    'zim'               : 'SVVA', //   zim valencia int
    'zinder'            : 'DRZR', //   zinder
    'zine'              : 'DTNZ', //   zine el abidine
    'zonguldak'         : 'LTAS', //   zonguldak
    'zuid-limburg/bee'  : 'EHBK', //   zuid-limburg/bee
    'zurich'            : 'LSZH',
    'zurich-kloten'     : 'LSZH', //   zurich-kloten (a
    'zvartnots'         : 'UDYZ', //   zvartnots
    'zweibrucken'       : 'EDRZ', //   zweibrucken
//    'aberdeen/dyce'     : 'EGPD', //   aberdeen/dyce
//    'abu'               : 'OMAD', //   abu dhabi/bateen
//    'aeroparque(civ/m'  : 'SABE', //   aeroparque(civ/m
//    'agri'              : 'LTCO', //   agri airport
//    'albany'            : 'KABY', //GA albany
//    'alexandria'        : 'HEBA', //   alexandria borg
//    'alexandria'        : 'KAEX', //LA alexandria
//    'alexandria'        : 'KESF', //LA alexandria
//    'alexandria/nouzh'  : 'HEAX', //   alexandria/nouzh
//    'alice'             : 'YBAS', //   alice springs ar
//    'ankara/etimesgut'  : 'LTAD', //   ankara/etimesgut
//    'ankara/guvercin'   : 'LTAB', //   ankara/guvercin
//    'athens/elef-ven'   : 'LGAV', //   athens/elef-ven
//    'athens/hellenkio'  : 'LGAT', //   athens/hellenkio
//    'atlanta/fulton'    : 'KFTY', //GA atlanta/fulton
//    'augusta'           : 'KAUG', //ME augusta
//    'augusta/daniel'    : 'KDNL', //GA augusta/daniel
//    'aviano'            : 'LIPA', //   aviano (it/us-af
//    'balikesir'         : 'LTFD', //   balikesir korfez
//    'baltimore/martin'  : 'KMTN', //MD baltimore/martin
//    'bangui/m'poko'     : 'FEFF', //   bangui/m'poko (m
//    'barcelona/gen'     : 'SVBC', //   barcelona/gen jo
//    'beijing/peking'    : 'ZBAA', //   beijing/peking
//    'belfast'           : 'EGAC', //   belfast harbour
//    'belgrade/surcin'   : 'LYBE', //   belgrade/surcin
//    'belo'              : 'SBBH', //   belo horiz/pampu
//    'belo'              : 'SBCF', //   belo horiz/tancr
//    'bierset/liege'     : 'EBLG', //   bierset/liege (c
//    'bierset/liege'     : 'EBLH', //   bierset/liege (m
//    'bloomington/norm'  : 'KBMI', //IL bloomington/norm
//    'boise'             : 'KBOI',
//    'bom'               : 'SBLP', //   bom jesus da lap
//    'bucharest/baneas'  : 'LRBS', //   bucharest/baneas
//    'bucharest/otopen'  : 'LROP', //   bucharest/otopen
//    'buffalo'           : 'CYVT', //SK buffalo narrows
//    'calgary/springba'  : 'CYBW', //AB calgary/springba
//    'calvi/st.'         : 'LFKC', //   calvi/st. cather
//    'campos/bartolome'  : 'SBCP', //   campos/bartolome
//    'capt'              : 'SCFM', //   capt fuentes mar
//    'carajas/maraba'    : 'SBCJ', //   carajas/maraba
//    'chandler/mesa'     : 'KIWA', //AZ chandler/mesa
//    'charleston'        : 'KIGC', //SC charleston afb
//    'charlestown/newc'  : 'TKPN', //   charlestown/newc
//    'chicago/midway'           : 'KMDW', //IL chicago
//    'cochin'            : 'VOCC', //   cochin (in-navy)
//    'concepcion/maris'  : 'SGCO', //   concepcion/maris
//    'constantine/el'    : 'DABC', //   constantine/el b
//    'copenhagen/kastr'  : 'EKCH', //   copenhagen/kastr
//    'copenhagen/roski'  : 'EKRK', //   copenhagen/roski
//    'corpus christi'    : 'KCRP', //TX corpus christi
//    'culman/neriugri'   : 'UELL', //   culman/neriugri
//    'decatur'           : 'KAXC', //IL decatur
//    'dubai'             : 'OMDW', //   dubai al maktoum
//    'durban/louis'      : 'FADN', //   durban/louis bot
//    'edmonton'          : 'CYXD', //AB edmonton municip
//    'edmonton/namao(m'  : 'CYED', //AB edmonton/namao(m
//    'edmonton/villenu'  : 'CZVL', //AB edmonton/villenu
//    'el paso'           : 'KELP', //TX el paso
//    'faro'              : 'CZFA', //YT faro apt artcc
//    'fort lauderdale'   : 'KFLL', //FL ft lauderd/holly
//    'fort myers'      : 'KRSW', //FL fort myers
//    'fort smith'      : 'KFSM', //AR fort smith
//    'fort'            : 'KNFW', //TX fort worth nas
//    'ft'                : 'KAFW', //TX ft worth/allianc
//    'ft'                : 'KFXE', //FL ft lauderd/exec
//    'georgetown/corre'  : 'SYEC', //   georgetown/corre
//    'georgetown/timeh'  : 'SYCJ', //   georgetown/timeh
//    'geraldton'         : 'YGEL', //   geraldton
//    'glasgow'           : 'KGGW', //MT glasgow
//    'gostomel''         : 'UKKM', //   gostomel'
//    'goteborg/landvet'  : 'ESGG', //   goteborg/landvet
//    'grand forks'       : 'KRDR', //ND grand forks afb
//    'greenville'        : 'KGLH', //MS greenville
//    'greenwood'         : 'CYZX', //NS greenwood (can m
//    'har'kov/osnova'    : 'UKHH', //   har'kov/osnova
//    'j.'                : 'FYWH', //   j. g. strijdom
//    'jacksonville'      : 'KNIP', //FL jacksonville nas
//    'jamestown'         : 'KJMS', //ND jamestown
//    'kalispell'         : 'KGPI', //MT kalispell
//    'kandahar'          : 'EQCB', //   kandahar
//    'kansas city' : 'KMKC', //MO kansas city/dntn
//    'key'               : 'KNQX', //FL key west nas
//    'kiel/holtenau'     : 'EDHK', //   kiel/holtenau ci
//    'kiev/zhyliany'     : 'UKKK', //   kiev/zhyliany
//    'kinshasa/n'djili'  : 'FZAA', //   kinshasa/n'djili
//    'kuala'             : 'WMSA', //   kuala lumpur sa
//    'kunduz'            : 'OAUZ', //   kunduz
//    'la grande'         : 'CYAH', //QC la grande iv arp
//    'la'              : 'NWWR', //   la roche/mare is
//    'la'              : 'SLLP', //   la paz/jfk intl
//    'las'               : 'KLSV', //NV las vegas/nellis
//    'las'               : 'KLVS', //NM las vegas
//    'lima/jorge'        : 'SPJC', //   lima/jorge chave
//    'little'            : 'KLRF', //AR little rock afb
//    'livingstone'       : 'FLLI', //   livingstone (mil
//    'london'            : 'CYXU', //ON london airport
//    'london'            : 'EGLC', //   london city airp
//    'london'            : 'KLOZ', //KY london
//    'manzanillo'        : 'MUMZ', //   manzanillo
//    'mary'              : 'UTAM', //   mary
//    'mary's'            : 'CYMH', //NL mary's harbour
//    'mcmurdo'           : 'NZWD', //   mcmurdo williams
//    'minsk'             : 'UMMS', //   minsk
//    'mountain home'   : 'KMUO', //ID mountain home
//    'n'zeto/ambrizete'  : 'FNZE', //   n'zeto/ambrizete
//    'nagoya'            : 'RJNN', //   nagoya (civ/jasd
//    'nairobi/jomo'      : 'HKNA', //   nairobi/jomo ken
//    'nairobi/wilson'    : 'HKNW', //   nairobi/wilson
//    'namangan'          : 'UTKN', //   namangan
//    'ndola'             : 'FLSK', //   ndola
//    'new orleans'     : 'KNBG', //LA new orleans nas
//    'new orleans'     : 'KNEW', //LA new orleans/lake
//    'norfolk'           : 'KNGU', //VA norfolk nas/cham
//    'norfolk'           : 'YSNF', //   norfolk island a
//    'osh'               : 'UAFO', //   osh
//    'panama'            : 'MPPA', //   panama pacifico
//    'paso'              : 'SARL', //   paso de los libr
//    'pensacola'         : 'KNPA', //FL pensacola nas
//    'philadelphia/ne'   : 'KPNE', //PA philadelphia/ne
//    'portland'        : 'KPWM', //ME portland
//    'porto alegre'           : 'SBPA', //   porto alegre/sal
//    'prishtina'         : 'LYPR', //   prishtina
//    'richmond'          : 'YRMD', //   richmond
//    'richmond'          : 'YSRI', //   richmond (aus-af
//    'rota'              : 'PGRO', //   rota intl airp
//    's'                 : 'WMKA', //   s abdul halim
//    's.'                : 'GVSV', //   s. pedro
//    'sable island'             : 'CYSA', //NS sable island(apt
//    'sacramento'       : 'KSMF', //CA sacramento/metro
//    'saint george'    : 'KSGU', //UT saint george
//    'saint louis'       : 'GOSS', //   saint louis
//    'san antonio'       : 'KSSF', //TX s antonio/stinsn
//    'san juan'        : 'SANU', //   san juan airport
//    'san'             : 'KSAT', //TX san antonio
//    'san'             : 'MGSJ', //   san jose (civ/m
//    'san'             : 'MMSD', //   san jose del cab
//    'san'             : 'MMSP', //   san luis potosi
//    'san'             : 'MUSA', //   san antonio bano
//    'san'             : 'SKSP', //   san andres islan
//    'san'             : 'SVSA', //   san antonio tach
//    'sana'a'          : 'OYSN', //   sana'a (civ/mil)
//    'santa maria'       : 'LPAZ', //   santa maria isla
//    'santa'             : 'AGGL', //   santa cruz islan
//    'santa'             : 'MHSR', //   santa rosa de c
//    'santa'             : 'MUSC', //   santa clara
//    'santa'             : 'SBSC', //   santa cruz (mil)
//    'santa'             : 'SBSM', //   santa maria(cv/m
//    'santa'             : 'SLET', //   santa cruz/el tr
//    'santiago'          : 'MUCU', //   santiago de cub
//    'santos'            : 'SBST', //   santos (braz-afb
//    'seoul'             : 'RKSM', //   seoul east(kor-a
//    'shirak'            : 'UGEL', //   shirak
//    'sidney'            : 'KSDY', //MT sidney richland
//    'sidney'            : 'KSNY', //NE sidney
//    'simferopol''       : 'UKFF', //   simferopol'
//    'simferopol''       : 'URFF', //   simferopol'
//    'st petersburg'                : 'ULLI', //   st petersburg
//    'st pierre'               : 'FMEP', //   st. pierre/fonds
//    'st.'               : 'KSUS', //MO st. louis/spirit
//    'sydney'            : 'YSSY', //   sydney intl airp
//    'terrace'           : 'CYXT', //BC terrace airport
//    'toronto'           : 'CYKZ', //ON toronto buttonvi
//    'toronto'           : 'CYTZ', //ON toronto il  vor
//    'trenton'           : 'CYTR', //ON trenton (can mil
//    'tulsa'             : 'KRVS', //OK tulsa
//    'tuxtla'            : 'MMTG', //   tuxtla gutierrez
//    'van'               : 'LTCI', //   van
//    'victoria'          : 'CYWH', //BC victoria harbour
//    'wr.neustadt'       : 'LOXN', //   wr.neustadt west
//    'yuma'              : 'KNYL', //AZ yuma mcas
//  'cordoba'           : 'SACO', //   cordoba airport
};

module.exports = names;


