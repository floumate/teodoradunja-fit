(function () {
  // =========================================================
  //   CONFIG
  // =========================================================
  var WEBHOOK_URL = 'https://hook.eu1.make.com/trnun22i6w92szmxzhkt1hv47osltofa';
  var REDIRECT_URL = '';
  var TOTAL_STEPS = 26;
  var MAX_INGREDIENTS = 10;
  var AUTO_NEXT_DELAY = 250; // ms
  var STORAGE_KEY = 'tdfit_onboarding_v1';
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
  //   NAMIRNICE - proširena baza ~200 stavki
  // =========================================================
  var NAMIRNICE = [
    // Meso
    "Piletina (belo meso)", "Piletina (batak)", "Ćuretina (belo meso)", "Ćuretina (batak)",
    "Junetina", "Govedina (mleveno)", "Govedina (biftek)", "Svinjetina", "Svinjski kare",
    "Jagnjetina", "Divljač", "Pačetina", "Zečetina",
    "Ćufte", "Ćevapi", "Šnicla (panirana)", "Roštilj meso", "Suvo meso", "Šunka", "Pršuta", "Salama", "Pileći nareski",
    // Riba
    "Losos", "Orada", "Brancin", "Tuna (sveža)", "Tunjevina (konzerva)", "Skuša",
    "Sardine (konzerva)", "Sleđ", "Pastrmka", "Šaran", "Som", "Smuđ", "Oslić", "Bakalar",
    "Gambori / škampi", "Morski plodovi (mešano)", "Hobotnica", "Lignje", "Dagnje", "Kamenice",
    // Povrće
    "Spanać", "Brokoli", "Karfiol", "Tikvica", "Paprika", "Patlidžan", "Paradajz",
    "Krastavac", "Cvekla", "Šargarepa", "Kelj", "Prokelj", "Blitva", "Boranija", "Bundeva",
    "Kupus", "Kiseli kupus", "Rukola", "Zelena salata", "Radič", "Endivija", "Masline",
    "Artičoke", "Špargla", "Pečurke", "Šampinjoni", "Vrganji", "Avokado",
    "Praziluk", "Beli luk", "Crveni luk", "Mladi luk", "Vlašac", "Ren",
    "Đumbir", "Celer", "Peršun", "Mirođija", "Bosiljak", "Origano", "Ruzmarin",
    // Ugljeni hidrati
    "Beli pirinač", "Integralni pirinač", "Crni pirinač", "Kinoa", "Bulgur", "Kuskus",
    "Ovsena kaša", "Heljda", "Proso", "Batat", "Krompir", "Palenta",
    "Pasta (bela)", "Integralna pasta", "Bezglutenska pasta", "Spageti", "Njoke",
    "Hleb (beli)", "Hleb (crni)", "Integralni hleb", "Bezglutenski hleb", "Tost",
    "Wrap / tortilja", "Proja", "Pirinčane galete", "Krekeri", "Pita kora", "Lepinja",
    "Pasulj", "Sočivo", "Crveni pasulj", "Leblebije", "Slanutak", "Grašak", "Soja zrno",
    // Mlečni i jaja
    "Jaja (cela)", "Belanca", "Žumanca", "Omlet",
    "Mleko (kravlje)", "Mleko (kozje)", "Bez laktoze mleko", "Pavlaka", "Slatka pavlaka", "Mileram",
    "Jogurt (beli)", "Voćni jogurt", "Grčki jogurt", "Kefir", "Kiselo mleko",
    "Sir (mladi)", "Sir (tvrdi)", "Kačkavalj", "Feta", "Mocarela", "Trapist", "Parmezan",
    "Skuta", "Urda", "Krem sir", "Puter", "Maslac",
    "Kokosovo mleko", "Bademovo mleko", "Sojino mleko", "Ovseno mleko", "Pirinčano mleko",
    // Voće
    "Banana", "Jabuka", "Kruška", "Bobičasto voće", "Borovnice", "Maline", "Kupine", "Jagode",
    "Grožđe", "Kivi", "Narandža", "Mandarina", "Limun", "Grejpfrut",
    "Mango", "Ananas", "Lubenica", "Dinja", "Breskva", "Nektarina", "Kajsija",
    "Šljiva", "Trešnja", "Višnja", "Smokva", "Kaki", "Nar", "Papaja",
    "Suvo grožđe", "Suve šljive", "Suve smokve", "Datule", "Suve kajsije", "Brusnice (suve)",
    // Orasi i semenke
    "Orasi", "Bademi", "Kikiriki", "Puter od kikirikija", "Puter od badema", "Tahini",
    "Lešnici", "Indijski orah", "Pistaći", "Brazilski oraščić", "Pekan", "Pinjoli",
    "Semenke bundeve", "Semenke suncokreta", "Chia seme", "Lan seme", "Susam", "Konopljino seme",
    // Proteinski dodaci / vege
    "Tofu", "Tempeh", "Edamame", "Seitan",
    "Proteinski prah (whey)", "Proteinski prah (kazein)", "Proteinski prah (biljni)",
    "Proteinske pločice", "BCAA", "Kreatin",
    // Začini i sosevi
    "Kari", "Cimet", "Korijander", "Čili / ljuta paprika", "Aleva paprika", "Biber", "So",
    "Senf", "Kečap", "Majonez", "Ajvar", "Pesto",
    "Soja sos", "Sirće (jabukovo)", "Sirće (balzamiko)", "Maslinovo ulje", "Limunov sok",
    "Med", "Javorov sirup", "Stevia", "Eritritol", "Šećer (smeđi)",
    // Pića
    "Kafa (espresso)", "Instant kafa", "Tursa kafa", "Bele kafe", "Zeleni čaj", "Crni čaj", "Voćni čaj",
    "Cedevita", "Sok od jabuke", "Sok od narandže", "Smoothie", "Kombuča", "Gazirana voda", "Mineralna voda",
    // Slatkiši (najčešći)
    "Tamna čokolada", "Mlečna čokolada", "Plazma keks", "Eurokrem", "Sladoled", "Torta",
    "Palačinke", "Vafli", "Krofne", "Bombone", "Lokum",
    // Ulja i masti
    "Suncokretovo ulje", "Repičino ulje", "Kokosovo ulje", "Avokado ulje",
    // Ostalo
    "Hummus", "Tzatziki", "Guacamole", "Salsa", "Kiseli krastavci"
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

  phoneIn.addEventListener('input', function() {
    phoneIn.value = phoneIn.value.replace(/[^\d\s\-()+]/g, '');
    autoDetectFromDialCode();
    if (phoneIn.closest('.field').classList.contains('error')) validatePhone();
  });

  // =========================================================
  //   INGREDIENT PICKER (Nutribox-style, max 10)
  // =========================================================
  function setupIngredientPicker(opts) {
    var wrap = document.getElementById(opts.wrapId);
    var input = document.getElementById(opts.inputId);
    var suggestions = document.getElementById(opts.suggestionsId);
    var counter = document.getElementById(opts.counterId);
    var stateKey = opts.stateKey;

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

    function showSuggestions() {
      if (state[stateKey].length >= MAX_INGREDIENTS) { suggestions.classList.remove('open'); return; }
      var q = input.value.trim().toLowerCase();
      var matches;
      if (!q) {
        matches = NAMIRNICE.filter(function(n) { return state[stateKey].indexOf(n) === -1; }).slice(0, 50);
      } else {
        matches = NAMIRNICE.filter(function(n) {
          return n.toLowerCase().indexOf(q) !== -1 && state[stateKey].indexOf(n) === -1;
        }).slice(0, 50);
      }
      if (matches.length === 0) {
        suggestions.innerHTML = '<div style="padding:14px;text-align:center;color:#74706A;font-size:14px;">Nema rezultata</div>';
        suggestions.classList.add('open');
        return;
      }
      suggestions.innerHTML = matches.map(function(n) {
        return '<div class="ingredient-suggestion" data-value="' + escapeAttr(n) + '">' + escapeHtml(n) + '</div>';
      }).join('');
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

    document.addEventListener('click', function(e) {
      if (!wrap.contains(e.target)) hideSuggestions();
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
        saveState();

        if (autoNext) {
          setTimeout(function() { goNext(); }, AUTO_NEXT_DELAY);
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
          setTimeout(function() { goNext(); }, AUTO_NEXT_DELAY);
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
    // Clear all errors before showing new step
    document.querySelectorAll('.field.error').forEach(function(f) {
      f.classList.remove('error');
    });
    document.querySelectorAll('.error-msg').forEach(function(e) { e.textContent = ''; });

    document.querySelectorAll('.step').forEach(function(s) { s.classList.remove('active'); });
    var target = document.querySelector('.step[data-step="' + n + '"]');
    if (!target) return;
    target.classList.add('active');
    state.currentStep = n;
    updateProgress();
    updateNav();
    // Scroll to top of card smoothly
    setTimeout(function() {
      window.scrollTo({ top: card.offsetTop - 20, behavior: 'smooth' });
    }, 50);
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
    // Conditional skip: 22 → 23 (Kućna varijanta) or 22 → 24 (Teretana)
    var nextStep = step + 1;
    if (step === 22 && state.radioChoices.tipTreninga === 'Teretana') {
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
    if (step === 24 && state.radioChoices.tipTreninga === 'Teretana') {
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
    var v = el.value;
    if (!v) { setError(fieldName, 'Datum je obavezan.'); return false; }
    var d = new Date(v);
    if (isNaN(d.getTime())) { setError(fieldName, 'Datum nije validan.'); return false; }
    if (opts.minDate) {
      if (d < opts.minDate) { setError(fieldName, opts.minMsg || 'Datum je suviše rano.'); return false; }
    }
    if (opts.maxDate) {
      if (d > opts.maxDate) { setError(fieldName, opts.maxMsg || 'Datum je suviše kasno.'); return false; }
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
      case 4: return validateRadio('kakoSiDosla');
      case 5:
        return [
          validateNumber('visina', { min: 120, max: 230 }),
          validateNumber('tezina', { min: 35, max: 250 }),
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
  //   LIVE VALIDATION — clear error as user types valid input
  // =========================================================
  function bindLive(fieldId, validatorFn, eventName) {
    var el = document.getElementById(fieldId);
    if (!el) return;
    el.addEventListener(eventName || 'input', function() {
      if (el.closest('.field').classList.contains('error')) {
        validatorFn();
      }
    });
  }

  bindLive('fullName', validateName);
  bindLive('email', validateEmail);
  // phone — već wired u sekciji iznad
  bindLive('zaposlenje', function() { return validateRequiredText('zaposlenje'); });
  bindLive('mesto', function() { return validateRequiredText('mesto'); });
  bindLive('brojClanova', function() { return validateNumber('brojClanova', { optional: true, min: 1, max: 30 }); });
  bindLive('visina', function() { return validateNumber('visina', { min: 120, max: 230 }); });
  bindLive('tezina', function() { return validateNumber('tezina', { min: 35, max: 250 }); });
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
        'visina','tezina','krvnaGrupa','ciljMesec','ciljDugorocno','kgIzgubiti','stoSprecavalo',
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
      // Sync datepickers with restored hidden input values
      if (typeof datepickerRodjenja !== 'undefined' && datepickerRodjenja && snapshot.inputs && snapshot.inputs.datumRodjenja) {
        datepickerRodjenja.setValue(snapshot.inputs.datumRodjenja);
      }
      if (typeof datepickerStarta !== 'undefined' && datepickerStarta && snapshot.inputs && snapshot.inputs.datumStarta) {
        datepickerStarta.setValue(snapshot.inputs.datumStarta);
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

    var payload = {
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
      kako_si_dosla: state.radioChoices.kakoSiDosla || '',
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
      rekviziti: state.radioChoices.tipTreninga === 'Teretana' ? '' : document.getElementById('rekviziti').value.trim(),
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
  //   INIT
  // =========================================================
  // =========================================================
  //   CUSTOM DATEPICKER
  // =========================================================
  var MONTHS_SR = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
  var WEEKDAYS_SR = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function isoDate(d) {
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function formatDateDisplay(d) {
    return pad2(d.getDate()) + '. ' + MONTHS_SR[d.getMonth()] + ' ' + d.getFullYear() + '.';
  }
  function parseDateISO(str) {
    if (!str) return null;
    var parts = str.split('-');
    if (parts.length !== 3) return null;
    var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return isNaN(d.getTime()) ? null : d;
  }
  function sameDate(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function startOfDay(d) {
    var nd = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return nd;
  }

  function setupDatePicker(opts) {
    // opts: { container, targetId, placeholder, minDate, maxDate, initialView }
    var container = opts.container;
    var targetId = opts.targetId;
    var hiddenInput = document.getElementById(targetId);
    var placeholder = opts.placeholder || 'Izaberi datum';
    var minDate = opts.minDate ? startOfDay(opts.minDate) : null;
    var maxDate = opts.maxDate ? startOfDay(opts.maxDate) : null;
    var initialView = opts.initialView || 'days'; // days, months, years

    // State
    var pickerState = {
      view: 'days',
      viewDate: new Date(), // controls which month/year is shown
      selectedDate: parseDateISO(hiddenInput.value) || null,
      yearPageStart: 0
    };

    if (pickerState.selectedDate) {
      pickerState.viewDate = new Date(pickerState.selectedDate);
    } else if (initialView === 'years') {
      // For birth date, start at year picker
      pickerState.view = 'years';
    }

    // Build markup
    container.innerHTML =
      '<button type="button" class="datepicker-trigger">' +
        '<svg class="datepicker-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>' +
        '</svg>' +
        '<span class="datepicker-trigger-text"></span>' +
      '</button>' +
      '<div class="datepicker-popup" hidden>' +
        '<div class="datepicker-content"></div>' +
        '<div class="datepicker-footer">' +
          '<button type="button" class="datepicker-clear">Obriši</button>' +
          '<button type="button" class="datepicker-close">Zatvori</button>' +
        '</div>' +
      '</div>';

    var trigger = container.querySelector('.datepicker-trigger');
    var triggerText = container.querySelector('.datepicker-trigger-text');
    var popup = container.querySelector('.datepicker-popup');
    var content = container.querySelector('.datepicker-content');
    var clearBtn = container.querySelector('.datepicker-clear');
    var closeBtn = container.querySelector('.datepicker-close');

    function updateTriggerDisplay() {
      if (pickerState.selectedDate) {
        triggerText.textContent = formatDateDisplay(pickerState.selectedDate);
        triggerText.classList.remove('placeholder');
        trigger.classList.add('has-value');
      } else {
        triggerText.textContent = placeholder;
        triggerText.classList.add('placeholder');
        trigger.classList.remove('has-value');
      }
    }

    function isOutOfRange(d) {
      if (minDate && d < minDate) return true;
      if (maxDate && d > maxDate) return true;
      return false;
    }

    function isMonthFullyDisabled(year, month) {
      // Check if any day of this month is selectable
      var firstDay = new Date(year, month, 1);
      var lastDay = new Date(year, month + 1, 0);
      if (maxDate && firstDay > maxDate) return true;
      if (minDate && lastDay < minDate) return true;
      return false;
    }

    function isYearFullyDisabled(year) {
      var firstDay = new Date(year, 0, 1);
      var lastDay = new Date(year, 11, 31);
      if (maxDate && firstDay > maxDate) return true;
      if (minDate && lastDay < minDate) return true;
      return false;
    }

    function renderHeader(titleText, opts) {
      opts = opts || {};
      var prevDisabled = opts.prevDisabled ? ' disabled' : '';
      var nextDisabled = opts.nextDisabled ? ' disabled' : '';
      return '<div class="datepicker-header">' +
        '<button type="button" class="datepicker-nav-btn dp-prev"' + prevDisabled + ' aria-label="Prethodno">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="10 4 6 8 10 12"></polyline></svg>' +
        '</button>' +
        '<button type="button" class="datepicker-title dp-title">' + titleText + '</button>' +
        '<button type="button" class="datepicker-nav-btn dp-next"' + nextDisabled + ' aria-label="Sledeće">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 4 10 8 6 12"></polyline></svg>' +
        '</button>' +
      '</div>';
    }

    function renderDaysView() {
      var y = pickerState.viewDate.getFullYear();
      var m = pickerState.viewDate.getMonth();
      var today = startOfDay(new Date());

      // Prev/next month range check
      var prevMonth = new Date(y, m - 1, 1);
      var nextMonth = new Date(y, m + 1, 1);
      var prevDisabled = isMonthFullyDisabled(prevMonth.getFullYear(), prevMonth.getMonth());
      var nextDisabled = isMonthFullyDisabled(nextMonth.getFullYear(), nextMonth.getMonth());

      var html = renderHeader(MONTHS_SR[m] + ' ' + y, { prevDisabled: prevDisabled, nextDisabled: nextDisabled });

      // Weekdays
      html += '<div class="datepicker-weekdays">';
      WEEKDAYS_SR.forEach(function(w) { html += '<span class="datepicker-weekday">' + w + '</span>'; });
      html += '</div>';

      // Day grid
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);
      var startWeekday = (firstDay.getDay() + 6) % 7; // Pon=0, Ned=6
      var daysInMonth = lastDay.getDate();
      var prevMonthLastDay = new Date(y, m, 0).getDate();

      html += '<div class="datepicker-grid">';
      // Previous month leading days
      for (var i = startWeekday - 1; i >= 0; i--) {
        var d = prevMonthLastDay - i;
        var fullDate = new Date(y, m - 1, d);
        var dis = isOutOfRange(fullDate) ? ' disabled' : '';
        html += '<button type="button" class="datepicker-day other-month"' + dis +
          ' data-date="' + isoDate(fullDate) + '">' + d + '</button>';
      }
      // Current month days
      for (var d = 1; d <= daysInMonth; d++) {
        var fullDate = new Date(y, m, d);
        var classes = 'datepicker-day';
        if (sameDate(fullDate, pickerState.selectedDate)) classes += ' selected';
        if (sameDate(fullDate, today)) classes += ' today';
        var dis = isOutOfRange(fullDate) ? ' disabled' : '';
        html += '<button type="button" class="' + classes + '"' + dis +
          ' data-date="' + isoDate(fullDate) + '">' + d + '</button>';
      }
      // Trailing days
      var totalCells = startWeekday + daysInMonth;
      var trailing = (7 - (totalCells % 7)) % 7;
      for (var i = 1; i <= trailing; i++) {
        var fullDate = new Date(y, m + 1, i);
        var dis = isOutOfRange(fullDate) ? ' disabled' : '';
        html += '<button type="button" class="datepicker-day other-month"' + dis +
          ' data-date="' + isoDate(fullDate) + '">' + i + '</button>';
      }
      html += '</div>';

      content.innerHTML = html;
    }

    function renderMonthsView() {
      var y = pickerState.viewDate.getFullYear();
      var prevYear = y - 1;
      var nextYear = y + 1;
      var prevDisabled = isYearFullyDisabled(prevYear);
      var nextDisabled = isYearFullyDisabled(nextYear);

      var html = renderHeader('' + y, { prevDisabled: prevDisabled, nextDisabled: nextDisabled });
      html += '<div class="datepicker-months">';
      for (var i = 0; i < 12; i++) {
        var classes = 'datepicker-month-item';
        if (pickerState.selectedDate &&
            pickerState.selectedDate.getFullYear() === y &&
            pickerState.selectedDate.getMonth() === i) {
          classes += ' selected';
        }
        var dis = isMonthFullyDisabled(y, i) ? ' disabled' : '';
        html += '<button type="button" class="' + classes + '"' + dis +
          ' data-month="' + i + '">' + MONTHS_SR[i] + '</button>';
      }
      html += '</div>';
      content.innerHTML = html;
    }

    function renderYearsView() {
      // Show 12 years per page
      var currentYear = pickerState.viewDate.getFullYear();
      if (pickerState.yearPageStart === 0) {
        // Center current year
        pickerState.yearPageStart = currentYear - (currentYear % 12);
      }
      var start = pickerState.yearPageStart;
      var end = start + 11;

      var prevDisabled = false;
      var nextDisabled = false;
      if (maxDate && start > maxDate.getFullYear()) prevDisabled = nextDisabled = false;
      // Optional: limit how far back/forward
      if (start < 1900) prevDisabled = true;
      if (end > 2100) nextDisabled = true;

      var html = renderHeader(start + ' - ' + end, { prevDisabled: prevDisabled, nextDisabled: nextDisabled });
      html += '<div class="datepicker-years">';
      for (var y = start; y <= end; y++) {
        var classes = 'datepicker-year-item';
        if (pickerState.selectedDate && pickerState.selectedDate.getFullYear() === y) {
          classes += ' selected';
        }
        var dis = isYearFullyDisabled(y) ? ' disabled' : '';
        html += '<button type="button" class="' + classes + '"' + dis +
          ' data-year="' + y + '">' + y + '</button>';
      }
      html += '</div>';
      content.innerHTML = html;
    }

    function render() {
      if (pickerState.view === 'days') renderDaysView();
      else if (pickerState.view === 'months') renderMonthsView();
      else if (pickerState.view === 'years') renderYearsView();
    }

    function openPopup() {
      popup.hidden = false;
      trigger.classList.add('open');
      // Reset to days view if a date is selected, otherwise stay on initial
      if (pickerState.selectedDate) {
        pickerState.view = 'days';
        pickerState.viewDate = new Date(pickerState.selectedDate);
      } else if (initialView === 'years' && pickerState.view === 'days') {
        // for birth date with no selection, start at year picker
        pickerState.view = 'years';
        pickerState.yearPageStart = (new Date().getFullYear() - 30) - ((new Date().getFullYear() - 30) % 12);
      }
      render();
    }

    function closePopup() {
      popup.hidden = true;
      trigger.classList.remove('open');
    }

    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      if (popup.hidden) openPopup();
      else closePopup();
    });

    // Delegated click handler within content
    content.addEventListener('click', function(e) {
      var dayBtn = e.target.closest('.datepicker-day');
      var monthBtn = e.target.closest('.datepicker-month-item');
      var yearBtn = e.target.closest('.datepicker-year-item');
      var titleBtn = e.target.closest('.dp-title');
      var prevBtn = e.target.closest('.dp-prev');
      var nextBtn = e.target.closest('.dp-next');

      if (dayBtn && !dayBtn.disabled) {
        var dateStr = dayBtn.dataset.date;
        var parts = dateStr.split('-');
        pickerState.selectedDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        hiddenInput.value = dateStr;
        updateTriggerDisplay();
        // Clear error if any
        var fieldEl = container.closest('.field');
        if (fieldEl) {
          fieldEl.classList.remove('error');
          var errEl = fieldEl.querySelector('.error-msg');
          if (errEl) errEl.textContent = '';
        }
        saveState();
        closePopup();
      } else if (monthBtn && !monthBtn.disabled) {
        var mi = parseInt(monthBtn.dataset.month, 10);
        pickerState.viewDate = new Date(pickerState.viewDate.getFullYear(), mi, 1);
        pickerState.view = 'days';
        render();
      } else if (yearBtn && !yearBtn.disabled) {
        var yi = parseInt(yearBtn.dataset.year, 10);
        pickerState.viewDate = new Date(yi, pickerState.viewDate.getMonth(), 1);
        pickerState.view = 'months';
        render();
      } else if (titleBtn) {
        if (pickerState.view === 'days') {
          pickerState.view = 'months';
        } else if (pickerState.view === 'months') {
          pickerState.view = 'years';
          pickerState.yearPageStart = pickerState.viewDate.getFullYear() - (pickerState.viewDate.getFullYear() % 12);
        }
        render();
      } else if (prevBtn && !prevBtn.disabled) {
        if (pickerState.view === 'days') {
          pickerState.viewDate = new Date(pickerState.viewDate.getFullYear(), pickerState.viewDate.getMonth() - 1, 1);
        } else if (pickerState.view === 'months') {
          pickerState.viewDate = new Date(pickerState.viewDate.getFullYear() - 1, pickerState.viewDate.getMonth(), 1);
        } else {
          pickerState.yearPageStart -= 12;
        }
        render();
      } else if (nextBtn && !nextBtn.disabled) {
        if (pickerState.view === 'days') {
          pickerState.viewDate = new Date(pickerState.viewDate.getFullYear(), pickerState.viewDate.getMonth() + 1, 1);
        } else if (pickerState.view === 'months') {
          pickerState.viewDate = new Date(pickerState.viewDate.getFullYear() + 1, pickerState.viewDate.getMonth(), 1);
        } else {
          pickerState.yearPageStart += 12;
        }
        render();
      }
    });

    clearBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      pickerState.selectedDate = null;
      hiddenInput.value = '';
      updateTriggerDisplay();
      saveState();
      closePopup();
    });

    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closePopup();
    });

    // Click outside closes
    document.addEventListener('click', function(e) {
      if (!container.contains(e.target)) closePopup();
    });

    // Initial render
    updateTriggerDisplay();

    return {
      setValue: function(isoStr) {
        var d = parseDateISO(isoStr);
        if (d) {
          pickerState.selectedDate = d;
          pickerState.viewDate = new Date(d);
          hiddenInput.value = isoStr;
        } else {
          pickerState.selectedDate = null;
          hiddenInput.value = '';
        }
        updateTriggerDisplay();
      }
    };
  }

  // Initialize datepickers
  var datepickerRodjenja, datepickerStarta;
  (function initDatepickers() {
    var minStart = new Date();
    minStart.setDate(minStart.getDate() + 5);
    var maxStart = new Date();
    maxStart.setMonth(maxStart.getMonth() + 6);

    var rodjenjaContainer = document.querySelector('.datepicker[data-target="datumRodjenja"]');
    var startaContainer = document.querySelector('.datepicker[data-target="datumStarta"]');

    if (rodjenjaContainer) {
      datepickerRodjenja = setupDatePicker({
        container: rodjenjaContainer,
        targetId: 'datumRodjenja',
        placeholder: rodjenjaContainer.dataset.placeholder || 'Izaberi datum',
        maxDate: new Date(),
        initialView: 'years'
      });
    }
    if (startaContainer) {
      datepickerStarta = setupDatePicker({
        container: startaContainer,
        targetId: 'datumStarta',
        placeholder: startaContainer.dataset.placeholder || 'Izaberi datum',
        minDate: minStart,
        maxDate: maxStart
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
