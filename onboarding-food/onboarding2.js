(function () {
  // =========================================================
  //   CONFIG
  // =========================================================
  var WEBHOOK_URL = 'https://hook.eu1.make.com/trnun22i6w92szmxzhkt1hv47osltofa';
  var REDIRECT_URL = '';
  var TOTAL_STEPS = 26;
  var MAX_INGREDIENTS = 10;
  var AUTO_NEXT_DELAY = 250; // ms
  var STORAGE_KEY = 'tdfit_onboarding2_v1';
  // =========================================================

  // =========================================================
  //   COUNTRIES (kao u prvoj formi)
  // =========================================================
  var COUNTRIES = [
    { c: 'RS', n: 'Srbija',              d: '+381' },
    { c: 'BA', n: 'Bosna i Hercegovina', d: '+387' },
    { c: 'ME', n: 'Crna Gora',           d: '+382' },
    { c: 'HR', n: 'Hrvatska',            d: '+385' },
    { c: 'SI', n: 'Slovenija',           d: '+386' },
    { c: 'MK', n: 'Severna Makedonija',  d: '+389' },
    { c: 'AL', n: 'Albanija',            d: '+355' },
    { c: 'BG', n: 'Bugarska',            d: '+359' },
    { c: 'RO', n: 'Rumunija',            d: '+40'  },
    { c: 'HU', n: 'Mađarska',            d: '+36'  },
    { c: 'AT', n: 'Austrija',            d: '+43'  },
    { c: 'DE', n: 'Nemačka',             d: '+49'  },
    { c: 'CH', n: 'Švajcarska',          d: '+41'  },
    { c: 'IT', n: 'Italija',             d: '+39'  },
    { c: 'FR', n: 'Francuska',           d: '+33'  },
    { c: 'NL', n: 'Holandija',           d: '+31'  },
    { c: 'BE', n: 'Belgija',             d: '+32'  },
    { c: 'SE', n: 'Švedska',             d: '+46'  },
    { c: 'NO', n: 'Norveška',            d: '+47'  },
    { c: 'DK', n: 'Danska',              d: '+45'  },
    { c: 'GB', n: 'Velika Britanija',    d: '+44'  },
    { c: 'IE', n: 'Irska',               d: '+353' },
    { c: 'ES', n: 'Španija',             d: '+34'  },
    { c: 'PT', n: 'Portugal',            d: '+351' },
    { c: 'GR', n: 'Grčka',               d: '+30'  },
    { c: 'US', n: 'SAD',                 d: '+1'   },
    { c: 'CA', n: 'Kanada',              d: '+1'   },
    { c: 'AU', n: 'Australija',          d: '+61'  }
  ];

  // =========================================================
  //   NAMIRNICE - proširena baza ~450 stavki
  // =========================================================
  var NAMIRNICE = [
    // ========== MESO - perad ==========
    "Piletina (belo meso)", "Piletina (batak)", "Pileća krilca", "Pileći file", "Pileći vrat",
    "Pileća džigerica", "Pileće srce", "Ćuretina (belo meso)", "Ćuretina (batak)", "Ćureći file",
    "Ćureća djigerica", "Pačetina", "Pačja džigerica", "Guščetina", "Prepelice", "Fazan",
    // ========== MESO - govedina/svinjetina/jagnjetina/ostalo ==========
    "Junetina (mleveno)", "Junetina (steak)", "Junetina (pečenica)", "Junetina (rebra)",
    "Govedina (mleveno)", "Govedina (biftek)", "Goveđa pečenica", "Goveđi file", "Goveđa juneca",
    "Teletina", "Teleća pečenica", "Teleće rebro", "Teleći but",
    "Svinjetina", "Svinjski kare", "Svinjski but", "Svinjska plećka", "Svinjska vratina",
    "Svinjska rebra", "Svinjska kolenica", "Svinjska džigerica",
    "Jagnjetina", "Jagnjeća rebra", "Jagnjeći but", "Jagnjeće šnicle",
    "Divljač", "Srnetina", "Divlja svinja", "Zečetina", "Konjsko meso",
    // ========== MESO - prerađevine i tradicionalna ==========
    "Ćufte", "Ćevapi", "Pljeskavica", "Vešalice", "Karađorđeva šnicla", "Mleveno meso (mix)",
    "Šnicla (panirana)", "Bečka šnicla", "Roštilj meso",
    "Suvo meso", "Šunka", "Pršuta", "Salama", "Sudžuk", "Kobasice (domaće)",
    "Slanina", "Čvarci", "Pileći nareski", "Mortadela",
    "Pašteta", "Pileća pašteta", "Foie gras",
    // ========== RIBA i morski plodovi ==========
    "Losos (svež)", "Losos (dimljeni)", "Tuna (sveža)", "Tunjevina (konzerva u ulju)",
    "Tunjevina (konzerva u sopstvenom soku)",
    "Orada", "Brancin", "Cipal", "Trlja", "Skuša", "Sardine (sveže)", "Sardine (konzerva)",
    "Sleđ", "Inćun", "Bakalar", "Oslić", "Polenovka",
    "Pastrmka (sveža)", "Pastrmka (dimljena)", "Šaran", "Som", "Smuđ", "Štuka", "Karaš",
    "Gambori / škampi", "Škampi (jumbo)", "Rakovi", "Jastog",
    "Hobotnica", "Lignje", "Sipa",
    "Dagnje", "Kamenice", "Školjke", "Vongole", "Morski plodovi (mix)",
    "Surimi", "Krabi štapići", "Kavijar", "Ikra", "Sushi (mix)",
    // ========== POVRĆE - lišnato i krstaste ==========
    "Spanać", "Mladi spanać", "Blitva", "Kelj", "Kelj kovrdžavi", "Raštan",
    "Brokoli", "Karfiol", "Romanesko", "Prokelj",
    "Rukola", "Zelena salata", "Iceberg salata", "Romaine salata", "Mizuna", "Pak Choi",
    "Maslačak", "Radič", "Endivija", "Cikorija",
    // ========== POVRĆE - korenasto i krtolasto ==========
    "Krompir (beli)", "Krompir (crveni)", "Krompir (mladi)", "Batat (slatki krompir)",
    "Šargarepa", "Cvekla", "Cveklin list", "Repa", "Pastrnak", "Peršunov koren",
    "Ren", "Rotkva", "Rotkvica", "Crna rotkva", "Đumbir (svež)", "Kurkuma (sveža)",
    "Celer (koren)", "Celer (stabljika)",
    // ========== POVRĆE - tikve i plodno ==========
    "Tikvica", "Tikva", "Bundeva", "Hokaido", "Patišon",
    "Paprika (crvena)", "Paprika (zelena)", "Paprika (žuta)", "Paprika ljuta", "Babura",
    "Patlidžan", "Paradajz", "Čeri paradajz", "Sušeni paradajz", "Paradajz (konzerva)",
    "Krastavac", "Kiseli krastavac", "Cornichon krastavčići", "Bamia (okra)",
    "Avokado",
    // ========== POVRĆE - mahunarke (sveže) ==========
    "Boranija (zelena)", "Boranija (žuta)", "Mahune", "Bob (svež)", "Grašak (svež)",
    "Edamame", "Mladi grašak",
    // ========== POVRĆE - kupusno ==========
    "Kupus", "Kupus (mladi)", "Kiseli kupus", "Crveni kupus", "Kineski kupus",
    // ========== POVRĆE - lukovice i začinsko ==========
    "Beli luk", "Crveni luk", "Mladi luk", "Praziluk", "Šalot", "Vlašac (Schnittlauch)",
    "Peršun (lišće)", "Mirođija", "Bosiljak (svež)", "Origano (svež)", "Ruzmarin (svež)",
    "Estragon", "Žalfija (svežna)", "Lovor (svež)", "Timijan", "Majorina",
    // ========== POVRĆE - pečurke i ostalo ==========
    "Pečurke (mix)", "Šampinjoni", "Vrganji", "Lisičarke", "Bukovače", "Šitake", "Rujnice",
    "Tartufi", "Masline (zelene)", "Masline (crne)", "Punjene masline",
    "Artičoke", "Špargla (bela)", "Špargla (zelena)", "Bambusovi izdanci",
    // ========== VOĆE - jezgričavo i koštičavo ==========
    "Jabuka (zlatni delišes)", "Jabuka (idared)", "Jabuka (granny smith)", "Jabuka (gala)",
    "Kruška (kaluđerka)", "Kruška (viljamovka)", "Kruška (krasanka)",
    "Dunja", "Mušmula",
    "Breskva", "Nektarina", "Kajsija",
    "Šljiva (požegača)", "Šljiva (Stenli)", "Šljiva (čačanska)",
    "Trešnja", "Višnja", "Crna trešnja",
    // ========== VOĆE - jagodičasto i sitno ==========
    "Borovnice", "Maline", "Bele maline", "Kupine", "Jagode", "Šumske jagode",
    "Ribizla (crvena)", "Ribizla (crna)", "Ogrozd", "Brusnice (sveže)", "Aronija",
    "Grožđe (belo)", "Grožđe (crno)", "Grožđe (bez koštica)",
    // ========== VOĆE - citrusi ==========
    "Narandža", "Krvava narandža", "Mandarina", "Klementina", "Limun", "Limeta",
    "Grejpfrut", "Pomelo", "Yuzu",
    // ========== VOĆE - tropsko i egzotično ==========
    "Banana", "Mini banana", "Kivi (zeleni)", "Kivi (zlatni)",
    "Mango", "Ananas", "Papaja", "Liči", "Dragon fruit (pitaya)", "Guava",
    "Karambola", "Maracuja", "Kokos (svež)",
    // ========== VOĆE - bobičasto velike (lubenica, dinja) i ostalo ==========
    "Lubenica", "Dinja (žuta)", "Dinja (galija)", "Dinja (medena)",
    "Smokva (sveža)", "Kaki", "Nar", "Avokado (kao voće)",
    // ========== VOĆE - suvo ==========
    "Suvo grožđe", "Suve šljive", "Suve smokve", "Datule", "Suve kajsije",
    "Brusnice (suve)", "Goji bobice", "Mulberries (dud suvi)", "Suvo voće (mix)",
    // ========== ŽITARICE i UGLJENI HIDRATI ==========
    "Beli pirinač", "Basmati pirinač", "Jasmin pirinač", "Integralni pirinač",
    "Crveni pirinač", "Crni pirinač", "Divlji pirinač", "Sushi pirinač", "Arborio pirinač",
    "Kinoa (bela)", "Kinoa (crvena)", "Kinoa (crna)", "Bulgur", "Kuskus", "Frikeh", "Farro",
    "Ovsena kaša", "Ovsene pahuljice (krupne)", "Ovsene pahuljice (sitne)", "Instant ovsena kaša",
    "Ovsene mekinje", "Heljda", "Heljdine pahuljice", "Proso", "Spelta", "Ječam", "Rž",
    "Polenta", "Kukuruzno brašno", "Kačamak", "Mamaljiga",
    // Pasta i rezanci
    "Pasta (bela)", "Integralna pasta", "Bezglutenska pasta", "Pasta od leblebija",
    "Pasta od graška", "Pasta od sočiva",
    "Spageti", "Penne", "Fusilli", "Rigatoni", "Lasagna", "Tagliatelle", "Makarone", "Vermicelli",
    "Njoke (krompir)", "Ravioli", "Tortelini", "Kineski rezanci", "Soba rezanci", "Udon rezanci",
    "Pho rezanci",
    // Hleb i pekarski proizvodi
    "Hleb (beli)", "Hleb (crni)", "Integralni hleb", "Bezglutenski hleb", "Raženi hleb",
    "Hleb od spelte", "Hleb od kvinoe", "Sourdough hleb",
    "Tost hleb", "Sendvič hleb", "Bagueta", "Ćabata", "Foccacia", "Pita lepinja", "Lepinja",
    "Pogačice", "Đevrek",
    "Wrap", "Tortilja (kukuruzna)", "Tortilja (pšenična)", "Lavash",
    "Proja", "Cornbread", "Kora za pitu", "Pasta filo",
    "Pirinčane galete", "Krekeri (slani)", "Krekeri (integralni)", "Grisini", "Soda krekeri",
    // ========== MAHUNARKE (suve) ==========
    "Pasulj (beli)", "Pasulj (crveni)", "Pasulj (crni)", "Pasulj (šareni)", "Pasulj (tetovac)",
    "Mungo pasulj", "Adzuki pasulj",
    "Sočivo (crveno)", "Sočivo (zeleno)", "Sočivo (smeđe)", "Sočivo (crno beluga)",
    "Leblebije", "Slanutak (kuvani)", "Slanutak (pržen)",
    "Grašak (suvi)", "Bob (suvi)", "Soja zrno", "Lupina",
    // ========== JAJA i MLEČNI PROIZVODI ==========
    "Jaja (cela)", "Belanca", "Žumanca", "Omlet", "Kajgana",
    "Mleko (kravlje 1.5%)", "Mleko (kravlje 2.8%)", "Mleko (kravlje 3.2%)", "Mleko (puno masno)",
    "Mleko (kozje)", "Mleko (ovčije)", "Mleko (bez laktoze)",
    "Bademovo mleko", "Sojino mleko", "Ovseno mleko", "Pirinčano mleko", "Kokosovo mleko",
    "Lešnikovo mleko", "Konopljino mleko",
    "Pavlaka", "Slatka pavlaka", "Mileram", "Kajmak", "Crème fraîche",
    "Jogurt (beli)", "Jogurt 1.5%", "Jogurt 2.8%", "Punomasni jogurt", "Voćni jogurt",
    "Grčki jogurt (beli)", "Grčki jogurt (voćni)", "Skyr", "Probiotic jogurt",
    "Kefir", "Kiselo mleko", "Buttermilk",
    "Sir (mladi)", "Sir (zreli)", "Sir (tvrdi)", "Sir (polutvrdi)",
    "Kačkavalj (mladi)", "Kačkavalj (zreli)", "Kačkavalj dimljeni",
    "Feta", "Halumi", "Mocarela", "Mocarela (bufala)", "Burrata",
    "Trapist", "Parmezan", "Pecorino", "Cheddar", "Gouda", "Edam",
    "Brie", "Camembert", "Roquefort", "Gorgonzola", "Stilton",
    "Skuta", "Urda", "Mascarpone", "Ricotta", "Cottage cheese", "Krem sir", "Filadelfija sir",
    "Puter", "Maslac", "Ghee (pročišćeni maslac)",
    // ========== ORASI, SEMENKE i PUTERI ==========
    "Orasi", "Bademi (sirovi)", "Bademi (slane)", "Bademi (pohovani)",
    "Kikiriki (sirov)", "Kikiriki (slan)", "Kikiriki (pržen)",
    "Lešnici", "Indijski orah (cashew)", "Pistaći", "Brazilski oraščić", "Pekan oraščić",
    "Pinjoli", "Makadamija",
    "Puter od kikirikija", "Puter od badema", "Puter od lešnika", "Tahini (od susama)",
    "Nutella", "Linolada",
    "Semenke bundeve", "Semenke suncokreta", "Chia seme", "Lan seme (celo)", "Lan seme (mleveno)",
    "Susam (svetli)", "Susam (tamni)", "Konopljino seme", "Mak",
    "Granola", "Müsli", "Müsli bez šećera",
    "Brašno od badema", "Brašno od orasa", "Brašno od lešnika", "Kokosovo brašno",
    // ========== BILJNI PROTEINI / VEGAN ==========
    "Tofu (svež)", "Tofu (dimljen)", "Silken tofu",
    "Tempeh", "Seitan",
    "Falafel", "Hummus",
    "Proteinski prah (whey)", "Proteinski prah (kazein)", "Proteinski prah (biljni)",
    "Proteinske pločice", "BCAA", "Kreatin", "L-Carnitin", "Glutamin",
    // ========== ULJA i MASTI ==========
    "Maslinovo ulje (extra devičansko)", "Maslinovo ulje (rafinisano)",
    "Suncokretovo ulje", "Repičino (kolza) ulje", "Kokosovo ulje", "Avokado ulje",
    "Bundevino ulje", "Susamovo ulje", "Lanovo ulje", "Konopljino ulje", "Orahovo ulje",
    "Kikiriki ulje", "Kukuruzno ulje",
    // ========== ZAČINI i SOSEVI ==========
    "Vegeta", "Začin (mix)", "So (morska)", "So (himalajska)", "So (kuhinjska)",
    "Biber (crni)", "Biber (beli)", "Biber (zeleni)", "Biber (rozi)",
    "Aleva paprika (slatka)", "Aleva paprika (dimljena)", "Aleva paprika (ljuta)",
    "Čili", "Ljuta paprika", "Kajenski biber",
    "Cimet", "Vanila", "Vanilini ekstrakt", "Karanfilić", "Muskatni orah", "Kardamom",
    "Šafran", "Anis", "Kim", "Kurkuma (mlevena)", "Đumbir (mleveni)",
    "Korijander", "Kari (curry)", "Garam masala",
    "Sušeni peršun", "Sušeni bosiljak", "Sušeni origano", "Sušeni timijan", "Sušeni ruzmarin",
    "Lovorov list",
    "Senf (žuti)", "Senf (Dijon)", "Senf (engleski)",
    "Kečap (klasik)", "Kečap (light)", "Kečap (pikantni)",
    "Majonez (klasik)", "Majonez (light)", "Vegan majonez", "Aioli",
    "Ajvar (blag)", "Ajvar (ljut)", "Pinđur", "Lutenica",
    "Pesto (bosiljak)", "Pesto (rukola)",
    "Soja sos", "Tamari", "Worchester sos", "BBQ sos", "Sweet chili sos", "Sriracha",
    "Sirće (vinsko)", "Sirće (jabukovo)", "Sirće (balzamiko)", "Sirće (pirinčano)",
    "Limunov sok", "Limeta sok",
    "Tzatziki", "Guacamole", "Salsa", "Cezar dresing", "Ranč dresing",
    // ========== ZASLAĐIVAČI i BRAŠNA ==========
    "Med (livadski)", "Med (bagremov)", "Med (suncokretov)", "Med (lipov)", "Med (kestena)",
    "Javorov sirup (maple)", "Agava sirup", "Datuljev sirup",
    "Stevia", "Eritritol", "Ksilitol", "Sukraloza",
    "Šećer (beli)", "Šećer (smeđi)", "Kokosov šećer", "Šećer u prahu",
    "Brašno (belo, T-400)", "Brašno (T-500)", "Integralno brašno", "Ražano brašno",
    "Brašno od heljde", "Brašno od kvinoe", "Brašno bezglutensko",
    "Speltino brašno", "Brašno od leblebija",
    "Kvasac (svež)", "Kvasac (suvi)", "Pekarski prah", "Soda bikarbona",
    // ========== PIĆA ==========
    "Voda (česmovaca)", "Voda (mineralna)", "Voda (gazirana)",
    "Kafa (espresso)", "Kafa (americano)", "Kafa (latte)", "Kafa (kapučino)",
    "Turska kafa", "Bela kafa", "Instant kafa", "Kafa bez kofeina",
    "Čaj (zeleni)", "Čaj (crni)", "Čaj (beli)", "Čaj matcha", "Čaj (rooibos)",
    "Čaj od kamilice", "Čaj od mente", "Čaj od đumbira", "Čaj od šipka", "Čaj od nane",
    "Sok od jabuke", "Sok od narandže", "Sok od cvekle", "Multivitaminski sok",
    "Smoothie (zeleni)", "Smoothie (voćni)", "Smoothie (proteinski)",
    "Kombuča",
    "Cedevita", "Energetska pića (Red Bull, Monster)",
    "Coca Cola", "Cola Zero", "Schweppes", "Pepsi", "Fanta", "Sprite",
    "Vino (crveno)", "Vino (belo)", "Vino (rose)", "Vino (penušavo)",
    "Pivo (svetlo)", "Pivo (tamno)", "Pivo (bez alkohola)",
    "Žestoka pića (rakija, whisky, vodka, gin)", "Likeri",
    // ========== TRADICIONALNA DOMAĆA JELA ==========
    "Sarma", "Punjene paprike", "Podvarak", "Đuveč",
    "Pasulj prebranac", "Pasulj sa kobasicama",
    "Musaka", "Gibanica", "Burek", "Zeljanica", "Pita sa mesom", "Pita sa sirom",
    "Karađorđeva", "Čvarci",
    "Janija", "Pasulj čorba", "Riblja čorba", "Pileća supa", "Goveđa supa",
    "Knedle", "Sataraš", "Leskovački rošting",
    // ========== SLATKIŠI ==========
    "Tamna čokolada (70%)", "Tamna čokolada (85%)", "Mlečna čokolada", "Bela čokolada",
    "Bajadera", "Griotte", "Najlepše želje",
    "Plazma keks", "Plazma slatkiš", "Eurokrem", "Linolada",
    "Sladoled (vanila)", "Sladoled (čokolada)", "Sladoled (jagoda)", "Frozen yogurt",
    "Torta (čokoladna)", "Torta (voćna)", "Cheesecake", "Tiramisu",
    "Palačinke", "Vafli", "Krofne", "Bombone (gumeni)", "Bombone (lekarne)", "Lokum",
    "Pita sa jabukama", "Strudla", "Bundevara", "Sirnica",
    "Baklava", "Halva", "Tulumbe",
    "Proteinske kuglice", "Marshmallow", "Karamela", "Smokvenjak",
    // ========== SLANO U KESI / FAST FOOD ==========
    "Slane palice", "Slanci (soljonji)", "Smoki", "Čips (slan)", "Čips (paprika)", "Čips (sir)",
    "Tortilja čips", "Popcorn (slan)", "Popcorn (sirast)",
    "Pomfrit",
    "Pizza (Margarita)", "Pizza (sa salamom)", "Pizza (sa pršutom)", "Burito", "Taco",
    "Quesadilla", "Burger", "Cheeseburger", "Hot dog",
    "Sendvič", "Tost sendvič", "Pljeskavica u lepinji", "Ćevapi u lepinji",
    // ========== OSTALO / SUPLEMENTI ==========
    "Vitamin D", "Vitamin C", "B-complex", "Multivitamini",
    "Omega-3", "Magnezijum", "Cink", "Železo", "Kalcijum", "Probiotici",
    "Kolagen"
  ];
  // dedupe za svaki slučaj
  NAMIRNICE = NAMIRNICE.filter(function(v, i, a) { return a.indexOf(v) === i; });

  // =========================================================
  //   STATE
  // =========================================================
  var state = {
    currentStep: 1,
    selectedCountry: findCountry('RS'),
    najradije: [],
    neVolis: [],
    radioChoices: {},
    likertChoice: null
  };

  // Tracks which fields the user has actually focused (touched-state pattern)
  var touchedFields = {};
  // Flag to suppress all validators during step transitions
  var stepInTransition = false;
  // Tracks pending auto-next setTimeout so we can cancel it if user clicks Dalje manually
  var autoNextTimer = null;

  function findCountry(code) {
    if (!code) return null;
    for (var i = 0; i < COUNTRIES.length; i++) {
      if (COUNTRIES[i].c === code) return COUNTRIES[i];
    }
    return null;
  }

  function flagHtml(code) {
    if (!code || code.length !== 2) return '';
    return '<span class="fi fi-' + code.toLowerCase() + '"></span>';
  }

  // =========================================================
  //   DOM ELEMENTS
  // =========================================================
  var form = document.getElementById('onboardingForm');
  var card = document.getElementById('card');
  var progressFill = document.getElementById('progressFill');
  var backBtn = document.getElementById('backBtn');
  var nextBtn = document.getElementById('nextBtn');
  var successEl = document.getElementById('successState');

  // =========================================================
  //   TRACKING
  // =========================================================
  (function populateTracking() {
    var url = new URL(window.location.href);
    document.getElementById('pageUrl').value = url.href;
    document.getElementById('referrerInput').value = document.referrer || '';
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k) {
      var id = k.replace(/_([a-z])/g, function(_, l) { return l.toUpperCase(); });
      var el = document.getElementById(id);
      if (el) el.value = url.searchParams.get(k) || '';
    });
  })();

  // =========================================================
  //   COUNTRY PICKER (kao u prvoj formi)
  // =========================================================
  var trigger = document.getElementById('countryTrigger');
  var flagEl = document.getElementById('countryFlag');
  var dropdown = document.getElementById('countryDropdown');
  var searchEl = document.getElementById('countrySearch');
  var listEl = document.getElementById('countryList');
  var phoneIn = document.getElementById('phone');

  function setCountry(country) {
    if (!country) return;
    state.selectedCountry = country;
    flagEl.innerHTML = flagHtml(country.c);
    trigger.title = country.n + ' (' + country.d + ')';
    var items = listEl.querySelectorAll('.country-item');
    items.forEach(function(item) {
      item.classList.toggle('selected', item.dataset.code === country.c);
    });
    updatePhonePlaceholder();
  }

  function updatePhonePlaceholder() {
    if (!state.selectedCountry || !window.libphonenumber) return;
    try {
      var ex = libphonenumber.getExampleNumber(state.selectedCountry.c, libphonenumber.examples);
      if (ex) { phoneIn.placeholder = ex.formatNational(); return; }
    } catch (e) {}
    phoneIn.placeholder = '60 123 4567';
  }

  function renderCountryList(filter) {
    filter = (filter || '').trim().toLowerCase();
    var html = '';
    var matched = 0;
    for (var i = 0; i < COUNTRIES.length; i++) {
      var c = COUNTRIES[i];
      if (filter && c.n.toLowerCase().indexOf(filter) === -1 && c.d.indexOf(filter) === -1) continue;
      var isSelected = state.selectedCountry && c.c === state.selectedCountry.c;
      html += '<button type="button" class="country-item' + (isSelected ? ' selected' : '') + '" data-code="' + c.c + '" data-dial="' + c.d + '">' +
                '<span class="country-item-flag">' + flagHtml(c.c) + '</span>' +
                '<span class="country-item-name">' + c.n + '</span>' +
                '<span class="country-item-dial">' + c.d + '</span>' +
              '</button>';
      matched++;
    }
    if (matched === 0) html = '<div style="padding:20px;text-align:center;color:#74706A;font-size:14px;">Nema rezultata</div>';
    listEl.innerHTML = html;
  }

  function openCountryDropdown() {
    dropdown.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    renderCountryList('');
    searchEl.value = '';
    setTimeout(function() { searchEl.focus(); }, 50);
  }
  function closeCountryDropdown() {
    dropdown.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    if (dropdown.hidden) openCountryDropdown(); else closeCountryDropdown();
  });
  listEl.addEventListener('click', function(e) {
    var item = e.target.closest('.country-item');
    if (!item) return;
    var c = findCountry(item.dataset.code);
    if (c) { setCountry(c); closeCountryDropdown(); phoneIn.focus(); }
  });
  searchEl.addEventListener('input', function() { renderCountryList(searchEl.value); });
  document.addEventListener('click', function(e) {
    if (!trigger.contains(e.target) && !dropdown.contains(e.target)) closeCountryDropdown();
  });
  setCountry(state.selectedCountry);

  // IP geolocation
  function detectCountryByIP(callback) {
    var providers = [
      { url: 'https://api.country.is/',  field: 'country' },
      { url: 'https://ipwho.is/',         field: 'country_code' },
      { url: 'https://ipapi.co/json/',    field: 'country_code' }
    ];
    function tryProvider(idx) {
      if (idx >= providers.length) { callback(null); return; }
      var p = providers[idx];
      var ctrl = new AbortController();
      var timer = setTimeout(function() { ctrl.abort(); }, 3000);
      fetch(p.url, { signal: ctrl.signal })
        .then(function(r) { clearTimeout(timer); if (!r.ok) throw new Error(); return r.json(); })
        .then(function(d) { var code = d && d[p.field]; if (code) callback(code); else throw new Error(); })
        .catch(function() { tryProvider(idx + 1); });
    }
    tryProvider(0);
  }
  detectCountryByIP(function(code) {
    if (!code) return;
    var c = findCountry(code);
    if (c) setCountry(c);
  });

  // Auto-detect zemlju iz +XXX
  function autoDetectFromDialCode() {
    var v = phoneIn.value.trim();
    if (!v.startsWith('+')) return;
    try {
      var parsed = libphonenumber.parsePhoneNumberFromString(v);
      if (parsed && parsed.country) {
        var c = findCountry(parsed.country);
        if (c && (!state.selectedCountry || state.selectedCountry.c !== c.c)) { setCountry(c); return; }
      }
    } catch (e) {}
    var sorted = COUNTRIES.slice().sort(function(a, b) { return b.d.length - a.d.length; });
    for (var i = 0; i < sorted.length; i++) {
      if (v.startsWith(sorted[i].d)) {
        if (!state.selectedCountry || state.selectedCountry.c !== sorted[i].c) setCountry(sorted[i]);
        return;
      }
    }
  }

  phoneIn.addEventListener('focus', function() {
    if (!stepInTransition) touchedFields['phone'] = true;
  });

  phoneIn.addEventListener('input', function() {
    phoneIn.value = phoneIn.value.replace(/[^\d\s\-()+]/g, '');
    autoDetectFromDialCode();
    if (stepInTransition) return;
    if (phoneIn.closest('.field').classList.contains('error')) validatePhone();
  });

  phoneIn.addEventListener('blur', function() {
    if (stepInTransition) return;
    if (touchedFields['phone']) validatePhone();
  });

  // =========================================================
  //   INGREDIENT PICKER (Nutribox-style, max 10)
  //   Suggestions dropdown attaches to document.body to escape
  //   card's overflow: hidden (same approach as Flatpickr).
  // =========================================================
  function setupIngredientPicker(opts) {
    var wrap = document.getElementById(opts.wrapId);
    var input = document.getElementById(opts.inputId);
    var suggestions = document.getElementById(opts.suggestionsId);
    var counter = document.getElementById(opts.counterId);
    var stateKey = opts.stateKey;

    // Move suggestions out of the card (which clips with overflow: hidden)
    document.body.appendChild(suggestions);

    function positionSuggestions() {
      var rect = wrap.getBoundingClientRect();
      suggestions.style.position = 'fixed';
      suggestions.style.top = (rect.bottom + 6) + 'px';
      suggestions.style.left = rect.left + 'px';
      suggestions.style.width = rect.width + 'px';
    }

    function renderTags() {
      // remove old tags but keep input + suggestions
      var tags = wrap.querySelectorAll('.ingredient-tag');
      tags.forEach(function(t) { t.remove(); });
      state[stateKey].forEach(function(item, idx) {
        var tag = document.createElement('span');
        tag.className = 'ingredient-tag';
        tag.innerHTML = '<span>' + escapeHtml(item) + '</span><span class="ingredient-tag-remove" data-idx="' + idx + '">✕</span>';
        wrap.insertBefore(tag, input);
      });
      updateCounter();
      updateInputState();
      saveState();
    }

    function updateCounter() {
      var len = state[stateKey].length;
      counter.textContent = len + ' / ' + MAX_INGREDIENTS;
      counter.classList.toggle('full', len >= MAX_INGREDIENTS);
    }

    function updateInputState() {
      var atMax = state[stateKey].length >= MAX_INGREDIENTS;
      input.disabled = atMax;
      input.placeholder = atMax ? 'Maksimum ' + MAX_INGREDIENTS + ' namirnica izabrano' : 'Pretraži namirnice...';
    }

    // Diacritic-insensitive normalize: "Šargarepa" → "sargarepa", "Đumbir" → "dumbir".
    // Letting users type "S" instead of "Š", "C" instead of "Č"/"Ć", "D" instead of "Đ"
    // is a major UX win when they don't have a Serbian keyboard.
    function normalizeText(s) {
      return (s || '').toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd');
    }

    function showSuggestions() {
      if (state[stateKey].length >= MAX_INGREDIENTS) { suggestions.classList.remove('open'); return; }
      var q = normalizeText(input.value.trim());
      var matches;
      if (!q) {
        matches = NAMIRNICE.filter(function(n) { return state[stateKey].indexOf(n) === -1; }).slice(0, 50);
      } else {
        matches = NAMIRNICE.filter(function(n) {
          return normalizeText(n).indexOf(q) !== -1 && state[stateKey].indexOf(n) === -1;
        }).slice(0, 50);
      }
      if (matches.length === 0) {
        suggestions.innerHTML = '<div style="padding:14px;text-align:center;color:#74706A;font-size:14px;">Nema rezultata</div>';
      } else {
        suggestions.innerHTML = matches.map(function(n) {
          return '<div class="ingredient-suggestion" data-value="' + escapeAttr(n) + '">' + escapeHtml(n) + '</div>';
        }).join('');
      }
      positionSuggestions();
      suggestions.classList.add('open');
    }

    function hideSuggestions() { suggestions.classList.remove('open'); }

    input.addEventListener('focus', showSuggestions);
    input.addEventListener('input', showSuggestions);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && !input.value && state[stateKey].length > 0) {
        state[stateKey].pop();
        renderTags();
        showSuggestions();
      } else if (e.key === 'Escape') {
        hideSuggestions();
      }
    });

    suggestions.addEventListener('click', function(e) {
      var item = e.target.closest('.ingredient-suggestion');
      if (!item) return;
      var val = item.dataset.value;
      if (state[stateKey].indexOf(val) === -1 && state[stateKey].length < MAX_INGREDIENTS) {
        state[stateKey].push(val);
        input.value = '';
        renderTags();
        // Clear error if any
        wrap.closest('.field').classList.remove('error');
        document.getElementById(opts.errorId).textContent = '';
        showSuggestions();
        input.focus();
      }
    });

    wrap.addEventListener('click', function(e) {
      var rm = e.target.closest('.ingredient-tag-remove');
      if (rm) {
        var idx = parseInt(rm.dataset.idx, 10);
        state[stateKey].splice(idx, 1);
        renderTags();
        return;
      }
      // Click on wrap (not on tag) focuses input
      if (e.target === wrap) input.focus();
    });

    // Close dropdown when clicking outside (both wrap AND suggestions, since
    // suggestions is now in body, not inside wrap)
    document.addEventListener('click', function(e) {
      if (!wrap.contains(e.target) && !suggestions.contains(e.target)) hideSuggestions();
    });

    // Reposition on scroll or window resize while open
    window.addEventListener('scroll', function() {
      if (suggestions.classList.contains('open')) positionSuggestions();
    }, true);
    window.addEventListener('resize', function() {
      if (suggestions.classList.contains('open')) positionSuggestions();
    });

    renderTags();
  }

  setupIngredientPicker({
    wrapId: 'najradijeWrap', inputId: 'najradijeInput',
    suggestionsId: 'najradijeSuggestions', counterId: 'najradijeCounter',
    stateKey: 'najradije', errorId: 'namirniceNajradijeError'
  });
  setupIngredientPicker({
    wrapId: 'neVolisWrap', inputId: 'neVolisInput',
    suggestionsId: 'neVolisSuggestions', counterId: 'neVolisCounter',
    stateKey: 'neVolis', errorId: 'namirniceNeVolisError'
  });

  // =========================================================
  //   RADIO GROUPS - custom styling + auto-next
  // =========================================================
  document.querySelectorAll('.radio-group').forEach(function(group) {
    var name = group.dataset.radio;
    var autoNext = group.dataset.autoNext === 'true';
    var options = group.querySelectorAll('.radio-option');

    options.forEach(function(opt) {
      opt.addEventListener('click', function() {
        var input = opt.querySelector('input[type="radio"]');
        input.checked = true;
        options.forEach(function(o) { o.classList.remove('checked'); });
        opt.classList.add('checked');
        state.radioChoices[name] = input.value;
        // Clear error
        var errEl = document.getElementById(name + 'Error');
        if (errEl) errEl.textContent = '';
        group.closest('.step').querySelector('.step-desc')?.classList?.remove('error');

        // Special case: "Drugo" on kakoSiDosla - show conditional input, skip auto-next
        var isDrugoKako = (name === 'kakoSiDosla' && input.value === 'drugo');
        if (name === 'kakoSiDosla') {
          var drugoWrap = document.getElementById('kakoSiDoslaDrugoWrap');
          var drugoInput = document.getElementById('kakoSiDoslaDrugo');
          if (drugoWrap && drugoInput) {
            if (isDrugoKako) {
              drugoWrap.hidden = false;
              setTimeout(function() { drugoInput.focus(); }, 80);
            } else {
              drugoWrap.hidden = true;
              drugoInput.value = '';
              drugoWrap.classList.remove('error');
              var dErr = document.getElementById('kakoSiDoslaDrugoError');
              if (dErr) dErr.textContent = '';
            }
          }
        }

        saveState();

        // Auto-next: skip when "Drugo" is selected (user must type + click Dalje)
        if (autoNext && !isDrugoKako) {
          if (autoNextTimer) clearTimeout(autoNextTimer);
          autoNextTimer = setTimeout(function() {
            autoNextTimer = null;
            goNext();
          }, AUTO_NEXT_DELAY);
        }
      });
    });
  });

  // =========================================================
  //   LIKERT SCALE (1-5, auto-next)
  // =========================================================
  document.querySelectorAll('.likert').forEach(function(likert) {
    var name = likert.dataset.likert;
    var autoNext = likert.dataset.autoNext === 'true';
    var nums = likert.querySelectorAll('.likert-num');
    nums.forEach(function(num) {
      num.addEventListener('click', function() {
        nums.forEach(function(n) { n.classList.remove('checked'); });
        num.classList.add('checked');
        state.likertChoice = num.dataset.value;
        var errEl = document.getElementById(name + 'Error');
        if (errEl) errEl.textContent = '';
        saveState();
        if (autoNext) {
          if (autoNextTimer) clearTimeout(autoNextTimer);
          autoNextTimer = setTimeout(function() {
            autoNextTimer = null;
            goNext();
          }, AUTO_NEXT_DELAY);
        }
      });
    });
  });

  // =========================================================
  //   STEP NAVIGATION
  // =========================================================
  function getActiveStep() {
    return parseInt(document.querySelector('.step.active').dataset.step, 10);
  }

  function showStep(n, animateDir) {
    // Cancel any pending auto-next from a previous radio/likert click
    if (autoNextTimer) {
      clearTimeout(autoNextTimer);
      autoNextTimer = null;
    }
    // Close any open ingredient dropdowns (they live in body, not in card)
    document.querySelectorAll('.ingredient-suggestions.open').forEach(function(s) {
      s.classList.remove('open');
    });
    // Suppress all validators during transition
    stepInTransition = true;

    // Clear all errors before showing new step
    document.querySelectorAll('.field.error').forEach(function(f) {
      f.classList.remove('error');
    });
    document.querySelectorAll('.error-msg').forEach(function(e) { e.textContent = ''; });

    document.querySelectorAll('.step').forEach(function(s) { s.classList.remove('active'); });
    var target = document.querySelector('.step[data-step="' + n + '"]');
    if (!target) {
      stepInTransition = false;
      return;
    }
    target.classList.add('active');
    state.currentStep = n;

    // Reset touched fields for new step
    touchedFields = {};

    updateProgress();
    updateNav();
    setTimeout(function() {
      window.scrollTo({ top: card.offsetTop - 20, behavior: 'smooth' });
    }, 50);
    // Re-enable validators after transition completes
    setTimeout(function() {
      stepInTransition = false;
    }, 350);
    saveState();
  }

  function updateProgress() {
    var step = state.currentStep;
    var pct = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
    progressFill.style.width = pct + '%';
  }

  function updateNav() {
    var step = state.currentStep;
    backBtn.style.display = step === 1 ? 'none' : 'inline-block';
    if (step === TOTAL_STEPS) {
      nextBtn.textContent = 'Pošalji prijavu';
    } else {
      nextBtn.textContent = 'Dalje';
    }
  }

  function goNext() {
    var step = state.currentStep;
    if (!validateStep(step)) return;
    // Conditional skip: only "Kućna varijanta" needs rekviziti (step 23).
    // Teretana and Vežbam samostalno both skip to step 24.
    var skipsRekviziti = (state.radioChoices.tipTreninga === 'Teretana' || state.radioChoices.tipTreninga === 'Vežbam samostalno');
    var nextStep = step + 1;
    if (step === 22 && skipsRekviziti) {
      nextStep = 24; // skip rekviziti
    }
    if (nextStep > TOTAL_STEPS) {
      submitForm();
      return;
    }
    showStep(nextStep, 'forward');
  }

  function goBack() {
    var step = state.currentStep;
    if (step <= 1) return;
    var prevStep = step - 1;
    // If we skipped step 23 going forward, also skip it going back
    var skipsRekvizitiBack = (state.radioChoices.tipTreninga === 'Teretana' || state.radioChoices.tipTreninga === 'Vežbam samostalno');
    if (step === 24 && skipsRekvizitiBack) {
      prevStep = 22;
    }
    showStep(prevStep, 'backward');
  }

  nextBtn.addEventListener('click', goNext);
  backBtn.addEventListener('click', goBack);

  // Enter key in non-textarea inputs → next
  form.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.id !== 'countrySearch') {
      e.preventDefault();
      goNext();
    }
  });

  // =========================================================
  //   VALIDATION
  // =========================================================
  function setError(fieldName, msg) {
    var fieldEl = document.querySelector('.field[data-field="' + fieldName + '"]');
    var errEl = document.getElementById(fieldName + 'Error');
    if (fieldEl) {
      if (msg) fieldEl.classList.add('error');
      else fieldEl.classList.remove('error');
    }
    if (errEl) errEl.textContent = msg || '';
  }

  function setRadioError(name, msg) {
    var errEl = document.getElementById(name + 'Error');
    if (errEl) errEl.textContent = msg || '';
  }

  function validateName() {
    var v = document.getElementById('fullName').value.trim();
    if (!v) { setError('fullName', 'Ime i prezime su obavezni.'); return false; }
    var re = /^[A-Za-zŠĐČĆŽšđčćžÀ-ÿ'\-]{2,}(\s+[A-Za-zŠĐČĆŽšđčćžÀ-ÿ'\-]{2,})+$/;
    if (!re.test(v.replace(/\s+/g, ' '))) {
      setError('fullName', 'Unesi i ime i prezime.'); return false;
    }
    setError('fullName', null); return true;
  }

  function validateEmail() {
    var v = document.getElementById('email').value.trim();
    if (!v) { setError('email', 'Email je obavezan.'); return false; }
    var re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(v) || v.length > 254) { setError('email', 'Email adresa nije validna.'); return false; }
    setError('email', null); return true;
  }

  function validatePhone() {
    var v = document.getElementById('phone').value.trim();
    if (!v) { setError('phone', 'Broj telefona je obavezan.'); return false; }
    if (!window.libphonenumber) {
      if (v.replace(/\D/g, '').length < 6) { setError('phone', 'Broj telefona nije validan.'); return false; }
      setError('phone', null); return true;
    }
    try {
      var full = v.startsWith('+') ? v : state.selectedCountry.d + ' ' + v;
      if (!libphonenumber.isValidPhoneNumber(full)) {
        setError('phone', 'Broj telefona nije validan za izabranu zemlju.'); return false;
      }
    } catch (e) { setError('phone', 'Broj telefona nije validan.'); return false; }
    setError('phone', null); return true;
  }

  function validateRequiredText(fieldName, msg) {
    var el = document.getElementById(fieldName);
    var v = (el.value || '').trim();
    if (!v) { setError(fieldName, msg || 'Ovo polje je obavezno.'); return false; }
    setError(fieldName, null); return true;
  }

  function validateNumber(fieldName, opts) {
    opts = opts || {};
    var el = document.getElementById(fieldName);
    var v = (el.value || '').trim();
    if (!v) {
      if (opts.optional) { setError(fieldName, null); return true; }
      setError(fieldName, 'Ovo polje je obavezno.'); return false;
    }
    var num = parseFloat(v);
    if (isNaN(num)) { setError(fieldName, 'Unesi broj.'); return false; }
    if (opts.min !== undefined && num < opts.min) { setError(fieldName, 'Minimalna vrednost je ' + opts.min + '.'); return false; }
    if (opts.max !== undefined && num > opts.max) { setError(fieldName, 'Maksimalna vrednost je ' + opts.max + '.'); return false; }
    setError(fieldName, null); return true;
  }

  function validateDate(fieldName, opts) {
    opts = opts || {};
    var el = document.getElementById(fieldName);
    var v = (el.value || '').trim();
    if (!v) { setError(fieldName, 'Datum je obavezan.'); return false; }
    // Parse ISO YYYY-MM-DD as LOCAL date (no timezone shift)
    var parts = v.split('-');
    if (parts.length !== 3) { setError(fieldName, 'Datum nije validan.'); return false; }
    var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    if (isNaN(d.getTime())) { setError(fieldName, 'Datum nije validan.'); return false; }
    if (opts.minDate) {
      var minDay = new Date(opts.minDate.getFullYear(), opts.minDate.getMonth(), opts.minDate.getDate());
      if (d < minDay) { setError(fieldName, opts.minMsg || 'Datum je suviše rano.'); return false; }
    }
    if (opts.maxDate) {
      var maxDay = new Date(opts.maxDate.getFullYear(), opts.maxDate.getMonth(), opts.maxDate.getDate());
      if (d > maxDay) { setError(fieldName, opts.maxMsg || 'Datum je suviše kasno.'); return false; }
    }
    setError(fieldName, null); return true;
  }

  function validateRadio(name) {
    if (!state.radioChoices[name]) {
      setRadioError(name, 'Izaberi jednu opciju.'); return false;
    }
    setRadioError(name, null); return true;
  }

  function validateLikert(name) {
    if (!state.likertChoice) {
      setRadioError(name, 'Izaberi vrednost.'); return false;
    }
    return true;
  }

  function validateIngredients(stateKey, fieldName) {
    if (state[stateKey].length === 0) {
      setError(fieldName, 'Izaberi bar jednu namirnicu.'); return false;
    }
    setError(fieldName, null); return true;
  }

  function validateStep(n) {
    switch (n) {
      case 1: return [validateName(), validateEmail(), validatePhone()].every(Boolean);
      case 2:
        return [
          validateDate('datumRodjenja', {
            maxDate: new Date(),
            maxMsg: 'Datum rođenja ne može biti u budućnosti.'
          }),
          validateRequiredText('zaposlenje')
        ].every(Boolean);
      case 3:
        return [
          validateRequiredText('mesto'),
          validateNumber('brojClanova', { optional: true, min: 1, max: 30 })
        ].every(Boolean);
      case 4:
        if (!validateRadio('kakoSiDosla')) return false;
        // If "Drugo" selected, also require the custom input
        if (state.radioChoices.kakoSiDosla === 'drugo') {
          var drugoText = (document.getElementById('kakoSiDoslaDrugo').value || '').trim();
          if (!drugoText) {
            setError('kakoSiDoslaDrugo', 'Napiši odakle si saznala.');
            return false;
          }
          setError('kakoSiDoslaDrugo', null);
        }
        return true;
      case 5:
        return [
          validateNumber('visina', {}),
          validateNumber('tezina', {}),
          (function() {
            var v = document.getElementById('krvnaGrupa').value;
            if (!v) { setError('krvnaGrupa', 'Izaberi krvnu grupu.'); return false; }
            setError('krvnaGrupa', null); return true;
          })()
        ].every(Boolean);
      case 6: return validateRequiredText('ciljMesec');
      case 7: return validateRequiredText('ciljDugorocno');
      case 8: return validateRequiredText('kgIzgubiti');
      case 9: return validateRequiredText('stoSprecavalo');
      case 10:
        return [
          validateRequiredText('bolestiAlergije'),
          validateRequiredText('terapija'),
          validateRequiredText('povrede')
        ].every(Boolean);
      case 11: return validateRadio('dijastaza');
      case 12: return validateRequiredText('porodjaji');
      case 13: return validateRadio('dojis');
      case 14: return validateRequiredText('opisIshrane');
      case 15: return true; // namirnice najradije - opciono
      case 16: return true; // namirnice ne voli - opciono
      case 17: return validateRadio('jednostavni');
      case 18: return validateRequiredText('slatkisi');
      case 19: return validateRequiredText('kafaCigareteAlkohol');
      case 20: return validateRequiredText('vezbanje');
      case 21: return validateRequiredText('poslednjiTrening');
      case 22: return validateRadio('tipTreninga');
      case 23: return validateRequiredText('rekviziti');
      case 24: return validateLikert('spremnost');
      case 25:
        var minDate = new Date();
        minDate.setHours(0, 0, 0, 0);
        minDate.setDate(minDate.getDate() + 5);
        var maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 6);
        return validateDate('datumStarta', {
          minDate: minDate,
          minMsg: 'Datum starta mora biti bar 5 dana od danas.',
          maxDate: maxDate,
          maxMsg: 'Datum starta ne sme biti više od 6 meseci u budućnosti.'
        });
      case 26:
        if (!state.radioChoices.pristajem) {
          setRadioError('pristajem', 'Moraš da odgovoriš na ovo pitanje.'); return false;
        }
        if (state.radioChoices.pristajem === 'Ne') {
          setRadioError('pristajem', 'Za nastavak je potreban pristanak na uslove.'); return false;
        }
        return true;
      default: return true;
    }
  }

  // =========================================================
  //   LIVE VALIDATION - touched-state pattern
  //   Errors only show after user actively interacts with the field.
  //   stepInTransition flag suppresses validators during step changes.
  // =========================================================
  function bindLive(fieldId, validatorFn, eventName) {
    var el = document.getElementById(fieldId);
    if (!el) return;

    el.addEventListener('focus', function() {
      if (!stepInTransition) touchedFields[fieldId] = true;
    });

    el.addEventListener(eventName || 'input', function() {
      if (stepInTransition) return;
      if (el.closest('.field').classList.contains('error')) {
        validatorFn();
      }
    });

    el.addEventListener('blur', function() {
      if (stepInTransition) return;
      if (touchedFields[fieldId]) validatorFn();
    });
  }

  bindLive('fullName', validateName);
  bindLive('email', validateEmail);
  // phone - već wired u sekciji iznad
  bindLive('zaposlenje', function() { return validateRequiredText('zaposlenje'); });
  bindLive('mesto', function() { return validateRequiredText('mesto'); });
  bindLive('kakoSiDoslaDrugo', function() {
    if (state.radioChoices.kakoSiDosla !== 'drugo') { setError('kakoSiDoslaDrugo', null); return true; }
    var v = (document.getElementById('kakoSiDoslaDrugo').value || '').trim();
    if (!v) { setError('kakoSiDoslaDrugo', 'Napiši odakle si saznala.'); return false; }
    setError('kakoSiDoslaDrugo', null); return true;
  });
  bindLive('brojClanova', function() { return validateNumber('brojClanova', { optional: true, min: 1, max: 30 }); });
  bindLive('visina', function() { return validateNumber('visina', {}); });
  bindLive('tezina', function() { return validateNumber('tezina', {}); });
  bindLive('krvnaGrupa', function() {
    var v = document.getElementById('krvnaGrupa').value;
    if (!v) { setError('krvnaGrupa', 'Izaberi krvnu grupu.'); return false; }
    setError('krvnaGrupa', null); return true;
  }, 'change');
  bindLive('ciljMesec', function() { return validateRequiredText('ciljMesec'); });
  bindLive('ciljDugorocno', function() { return validateRequiredText('ciljDugorocno'); });
  bindLive('kgIzgubiti', function() { return validateRequiredText('kgIzgubiti'); });
  bindLive('stoSprecavalo', function() { return validateRequiredText('stoSprecavalo'); });
  bindLive('bolestiAlergije', function() { return validateRequiredText('bolestiAlergije'); });
  bindLive('terapija', function() { return validateRequiredText('terapija'); });
  bindLive('povrede', function() { return validateRequiredText('povrede'); });
  bindLive('porodjaji', function() { return validateRequiredText('porodjaji'); });
  bindLive('opisIshrane', function() { return validateRequiredText('opisIshrane'); });
  bindLive('slatkisi', function() { return validateRequiredText('slatkisi'); });
  bindLive('kafaCigareteAlkohol', function() { return validateRequiredText('kafaCigareteAlkohol'); });
  bindLive('vezbanje', function() { return validateRequiredText('vezbanje'); });
  bindLive('poslednjiTrening', function() { return validateRequiredText('poslednjiTrening'); });
  bindLive('rekviziti', function() { return validateRequiredText('rekviziti'); });

  // =========================================================
  //   SAVE / RESTORE (localStorage)
  // =========================================================
  function saveState() {
    try {
      var snapshot = {
        currentStep: state.currentStep,
        najradije: state.najradije,
        neVolis: state.neVolis,
        radioChoices: state.radioChoices,
        likertChoice: state.likertChoice,
        country: state.selectedCountry ? state.selectedCountry.c : 'RS',
        inputs: {}
      };
      var fields = ['fullName','email','phone','datumRodjenja','zaposlenje','mesto','brojClanova',
        'kakoSiDoslaDrugo','visina','tezina','krvnaGrupa','ciljMesec','ciljDugorocno','kgIzgubiti','stoSprecavalo',
        'bolestiAlergije','terapija','povrede','porodjaji','opisIshrane','slatkisi',
        'kafaCigareteAlkohol','vezbanje','poslednjiTrening','rekviziti','datumStarta'];
      fields.forEach(function(f) {
        var el = document.getElementById(f);
        if (el) snapshot.inputs[f] = el.value;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch (e) {}
  }

  function restoreState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var snapshot = JSON.parse(raw);
      // Restore inputs
      if (snapshot.inputs) {
        Object.keys(snapshot.inputs).forEach(function(f) {
          var el = document.getElementById(f);
          if (el) el.value = snapshot.inputs[f];
        });
      }
      // Restore radios
      if (snapshot.radioChoices) {
        state.radioChoices = snapshot.radioChoices;
        Object.keys(state.radioChoices).forEach(function(name) {
          var val = state.radioChoices[name];
          var opt = document.querySelector('.radio-group[data-radio="' + name + '"] .radio-option input[value="' + val + '"]');
          if (opt) {
            opt.checked = true;
            opt.closest('.radio-option').classList.add('checked');
          }
        });
        // If "Drugo" was previously selected on kakoSiDosla, show its input
        if (state.radioChoices.kakoSiDosla === 'drugo') {
          var dWrap = document.getElementById('kakoSiDoslaDrugoWrap');
          if (dWrap) dWrap.hidden = false;
        }
      }
      // Restore likert
      if (snapshot.likertChoice) {
        state.likertChoice = snapshot.likertChoice;
        var num = document.querySelector('.likert-num[data-value="' + snapshot.likertChoice + '"]');
        if (num) num.classList.add('checked');
      }
      // Restore ingredients
      if (snapshot.najradije) state.najradije = snapshot.najradije;
      if (snapshot.neVolis) state.neVolis = snapshot.neVolis;
      // Country
      if (snapshot.country) {
        var c = findCountry(snapshot.country);
        if (c) setCountry(c);
      }
      // Sync Flatpickr instances with restored hidden input values
      if (typeof fpRodjenja !== 'undefined' && fpRodjenja && snapshot.inputs && snapshot.inputs.datumRodjenja) {
        fpRodjenja.setDate(snapshot.inputs.datumRodjenja, false);
        document.getElementById('datumRodjenja').value = snapshot.inputs.datumRodjenja;
      }
      if (typeof fpStarta !== 'undefined' && fpStarta && snapshot.inputs && snapshot.inputs.datumStarta) {
        fpStarta.setDate(snapshot.inputs.datumStarta, false);
        document.getElementById('datumStarta').value = snapshot.inputs.datumStarta;
      }
      // Re-render ingredient tags
      ['najradijeWrap','neVolisWrap'].forEach(function(wid, idx) {
        var key = idx === 0 ? 'najradije' : 'neVolis';
        var wrap = document.getElementById(wid);
        var input = wrap.querySelector('.ingredient-input');
        var counterId = idx === 0 ? 'najradijeCounter' : 'neVolisCounter';
        var counter = document.getElementById(counterId);
        // remove existing tags
        wrap.querySelectorAll('.ingredient-tag').forEach(function(t) { t.remove(); });
        state[key].forEach(function(item, i) {
          var tag = document.createElement('span');
          tag.className = 'ingredient-tag';
          tag.innerHTML = '<span>' + escapeHtml(item) + '</span><span class="ingredient-tag-remove" data-idx="' + i + '">✕</span>';
          wrap.insertBefore(tag, input);
        });
        counter.textContent = state[key].length + ' / ' + MAX_INGREDIENTS;
        counter.classList.toggle('full', state[key].length >= MAX_INGREDIENTS);
        if (state[key].length >= MAX_INGREDIENTS) input.disabled = true;
      });
      // Restore step
      if (snapshot.currentStep && snapshot.currentStep >= 1 && snapshot.currentStep <= TOTAL_STEPS) {
        showStep(snapshot.currentStep);
      }
    } catch (e) { console.warn('Failed to restore state:', e); }
  }

  function clearState() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  // =========================================================
  //   SUBMIT
  // =========================================================
  function submitForm() {
    if (!validateStep(TOTAL_STEPS)) return;

    // Honeypot
    if (document.getElementById('website').value.trim() !== '') {
      showSuccess();
      return;
    }

    nextBtn.classList.add('loading');
    nextBtn.disabled = true;
    document.getElementById('submittedAt').value = new Date().toISOString();

    // Build payload
    var fullName = document.getElementById('fullName').value.trim().replace(/\s+/g, ' ');
    var parts = fullName.split(' ');
    var firstName = parts[0];
    var lastName = parts.slice(1).join(' ');
    var phoneRaw = document.getElementById('phone').value.trim();
    var phoneE164 = formatPhoneForSubmit(phoneRaw);

    // Combine "Drugo" with the custom text user typed
    var kakoSiDoslaValue = state.radioChoices.kakoSiDosla || '';
    if (kakoSiDoslaValue === 'drugo') {
      var drugoDetail = (document.getElementById('kakoSiDoslaDrugo').value || '').trim();
      kakoSiDoslaValue = drugoDetail ? ('Drugo: ' + drugoDetail) : 'Drugo';
    } else if (kakoSiDoslaValue) {
      // Capitalize first letter for cleaner doc output
      kakoSiDoslaValue = kakoSiDoslaValue.charAt(0).toUpperCase() + kakoSiDoslaValue.slice(1);
    }

    var payload = {
      form_id: 'food_coaching_upitnik',
      fullName: fullName,
      firstName: firstName,
      lastName: lastName,
      email: document.getElementById('email').value.trim(),
      phone: phoneE164,
      phone_country: state.selectedCountry ? state.selectedCountry.d : '',
      phone_country_code: state.selectedCountry ? state.selectedCountry.c : '',
      phone_raw: phoneRaw,
      datum_rodjenja: document.getElementById('datumRodjenja').value,
      zaposlenje: document.getElementById('zaposlenje').value.trim(),
      mesto: document.getElementById('mesto').value.trim(),
      broj_clanova: document.getElementById('brojClanova').value.trim(),
      kako_si_dosla: kakoSiDoslaValue,
      visina: document.getElementById('visina').value,
      tezina: document.getElementById('tezina').value,
      visina_tezina: document.getElementById('visina').value + 'cm; ' + document.getElementById('tezina').value + 'kg',
      krvna_grupa: document.getElementById('krvnaGrupa').value,
      cilj_mesec: document.getElementById('ciljMesec').value.trim(),
      cilj_dugorocno: document.getElementById('ciljDugorocno').value.trim(),
      kg_izgubiti: document.getElementById('kgIzgubiti').value.trim(),
      sto_sprecavalo: document.getElementById('stoSprecavalo').value.trim(),
      bolesti_alergije: document.getElementById('bolestiAlergije').value.trim(),
      terapija: document.getElementById('terapija').value.trim(),
      povrede: document.getElementById('povrede').value.trim(),
      dijastaza: state.radioChoices.dijastaza || '',
      porodjaji: document.getElementById('porodjaji').value.trim(),
      dojis: state.radioChoices.dojis || '',
      opis_ishrane: document.getElementById('opisIshrane').value.trim(),
      namirnice_najradije: state.najradije.join(', '),
      namirnice_ne_voli: state.neVolis.join(', '),
      jednostavni_obroci: state.radioChoices.jednostavni || '',
      slatkisi: document.getElementById('slatkisi').value.trim(),
      kafa_cigarete_alkohol: document.getElementById('kafaCigareteAlkohol').value.trim(),
      vezbanje: document.getElementById('vezbanje').value.trim(),
      poslednji_trening: document.getElementById('poslednjiTrening').value.trim(),
      tip_treninga: state.radioChoices.tipTreninga || '',
      rekviziti: (state.radioChoices.tipTreninga === 'Teretana' || state.radioChoices.tipTreninga === 'Vežbam samostalno') ? '' : document.getElementById('rekviziti').value.trim(),
      spremnost: state.likertChoice || '',
      datum_starta: document.getElementById('datumStarta').value,
      pristajem: state.radioChoices.pristajem || '',
      page_url: document.getElementById('pageUrl').value,
      referrer: document.getElementById('referrerInput').value,
      utm_source: document.getElementById('utmSource').value,
      utm_medium: document.getElementById('utmMedium').value,
      utm_campaign: document.getElementById('utmCampaign').value,
      utm_content: document.getElementById('utmContent').value,
      utm_term: document.getElementById('utmTerm').value,
      submitted_at: document.getElementById('submittedAt').value,
      user_agent: navigator.userAgent
    };

    if (WEBHOOK_URL) {
      try {
        fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(function() {});
      } catch (err) {
        if (navigator.sendBeacon) {
          var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
          navigator.sendBeacon(WEBHOOK_URL, blob);
        }
      }
    } else {
      console.log('[ONBOARDING] Webhook not configured. Payload:', payload);
    }

    setTimeout(function() {
      clearState();
      if (REDIRECT_URL) { window.location.href = REDIRECT_URL; }
      else { showSuccess(); }
    }, 700);
  }

  function formatPhoneForSubmit(input) {
    var v = (input || '').trim();
    if (!v) return '';
    if (!window.libphonenumber) return v;
    try {
      var full = v.startsWith('+') ? v : state.selectedCountry.d + ' ' + v;
      var parsed = libphonenumber.parsePhoneNumberFromString(full);
      if (parsed && parsed.isValid()) return parsed.format('E.164');
    } catch (e) {}
    return v;
  }

  function showSuccess() {
    card.classList.add('success-mode');
    document.getElementById('navRow').style.display = 'none';
    successEl.hidden = false;
    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // =========================================================
  //   HELPERS
  // =========================================================
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c];
    });
  }
  function escapeAttr(s) { return escapeHtml(s); }

  // =========================================================
  //   DATEPICKERS - Flatpickr (sa custom theme stilom)
  // =========================================================
  var fpRodjenja, fpStarta;

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function dateToISO(d) {
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function onDatepickerChange(hiddenId, errorId) {
    return function(selectedDates) {
      var hidden = document.getElementById(hiddenId);
      if (!hidden) return;
      if (selectedDates.length) {
        hidden.value = dateToISO(selectedDates[0]);
        var fieldEl = hidden.closest('.field');
        if (fieldEl) fieldEl.classList.remove('error');
        var errEl = document.getElementById(errorId);
        if (errEl) errEl.textContent = '';
      } else {
        hidden.value = '';
      }
      saveState();
    };
  }

  (function initDatepickers() {
    if (typeof flatpickr === 'undefined') {
      console.warn('Flatpickr nije učitan');
      return;
    }
    var rodjenjaDisplay = document.getElementById('datumRodjenjaDisplay');
    var startaDisplay = document.getElementById('datumStartaDisplay');

    if (rodjenjaDisplay) {
      fpRodjenja = flatpickr(rodjenjaDisplay, {
        dateFormat: 'j. F Y.',
        locale: 'sr',
        maxDate: 'today',
        monthSelectorType: 'dropdown',
        disableMobile: true,
        appendTo: document.body,
        onChange: onDatepickerChange('datumRodjenja', 'datumRodjenjaError'),
        onReady: function() {
          // Default view: ~30 godina unazad (lakše za godinu rođenja)
          var defaultYear = new Date().getFullYear() - 30;
          if (this.currentYear !== defaultYear && !this.selectedDates.length) {
            this.changeYear(defaultYear);
          }
        }
      });
    }

    if (startaDisplay) {
      var minStart = new Date();
      minStart.setDate(minStart.getDate() + 5);
      var maxStart = new Date();
      maxStart.setMonth(maxStart.getMonth() + 6);

      // Extend UI maxDate to next year-end so year input is editable.
      // Real 6-month constraint is enforced via disable callback below.
      var maxStartUI = new Date();
      maxStartUI.setFullYear(maxStartUI.getFullYear() + 1);
      maxStartUI.setMonth(11);
      maxStartUI.setDate(31);

      fpStarta = flatpickr(startaDisplay, {
        dateFormat: 'j. F Y.',
        locale: 'sr',
        minDate: minStart,
        maxDate: maxStartUI,
        // Override Flatpickr's "today" to the first selectable date.
        // Otherwise the real today (May 23) gets the "today" circle even though
        // it's disabled, which looks misleading.
        now: minStart,
        defaultDate: null,
        disable: [
          function(date) {
            // Strict constraint: date must be within today+5 to today+6mo
            return date > maxStart;
          }
        ],
        monthSelectorType: 'dropdown',
        disableMobile: true,
        appendTo: document.body,
        onChange: onDatepickerChange('datumStarta', 'datumStartaError')
      });
    }
  })();


  // Save state on any input change
  form.addEventListener('input', function() {
    clearTimeout(window._saveDebounce);
    window._saveDebounce = setTimeout(saveState, 500);
  });

  // Restore previous state if exists
  restoreState();
  updateProgress();
  updateNav();
})();
