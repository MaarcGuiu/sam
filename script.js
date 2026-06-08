
    /* ─── SPA NAVIGATION ─────────────────────────────────────── */
    function navigateTo(pageId) {
      // hide all pages
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

      // show target page
      const target = document.getElementById('page-' + pageId);
      if (target) {
        target.classList.add('active');
      }

      // update active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
      });

      // scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // close mobile menu
      closeMobileMenu();

      // trigger fade animations for the new page
      requestAnimationFrame(() => {
        observeFades();
      });
    }

    /* ─── GLOBAL CLICK HANDLER (delegation) ──────────────────── */
    document.addEventListener('click', function (e) {
      const el = e.target.closest('[data-page]');
      if (el && el.tagName !== 'A' || (el && el.dataset.page)) {
        // If it also has an href that's a real link (tel:, mailto:), skip
        if (el.tagName === 'A' && el.href && !el.href.includes('#') && !el.dataset.page) return;
        if (el.dataset.page) {
          e.preventDefault();
          navigateTo(el.dataset.page);
        }
      }
    });

    /* ─── HAMBURGER MENU ──────────────────────────────────────── */
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');

    function closeMobileMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    /* ─── GALLERY FILTER ──────────────────────────────────────── */
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        // update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;

        document.querySelectorAll('.muntatge-item').forEach(item => {
          const cat = item.dataset.cat;
          if (filter === 'tots' || cat === filter) {
            item.classList.remove('hidden');
            item.style.display = '';
          } else {
            item.classList.add('hidden');
            item.style.display = 'none';
          }
        });
      });
    });

    /* ─── SCROLL FADE ANIMATIONS ──────────────────────────────── */
    let observer;

    function observeFades() {
      if (observer) observer.disconnect();

      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, i * 90);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      document.querySelectorAll('.page.active .fade-section').forEach(function (el) {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });
    }

    /* ─── NAVBAR SCROLL EFFECT ────────────────────────────────── */
    window.addEventListener('scroll', function () {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.4)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }, { passive: true });

    /* ─── DISPONIBILITAT MODULE ──────────────────────────────── */

    /* ── Embedded stock data (equivalent to estoc.json)
       In production: replace the fetch below with data from your system.
       To update: edit the STOCK_DATA array directly, or point the
       fetch() call to your real API endpoint.
    ── */
    const STOCK_DATA = [
      { id:"P001", amplada:205, perfil:55, diametre:16, marca:"Michelin",    model:"Primacy 4+",                  estacio:"estiu",     tipus:"turisme",    preu:98.50,  estoc:8,  eficiencia:"A", humit:"A", soroll:68, speed:"V", load:"91" },
      { id:"P002", amplada:205, perfil:55, diametre:16, marca:"Goodyear",    model:"EfficientGrip Performance 2", estacio:"estiu",     tipus:"turisme",    preu:89.00,  estoc:4,  eficiencia:"B", humit:"A", soroll:70, speed:"V", load:"91" },
      { id:"P003", amplada:205, perfil:55, diametre:16, marca:"Bridgestone", model:"Turanza T005",                estacio:"estiu",     tipus:"turisme",    preu:92.00,  estoc:0,  eficiencia:"A", humit:"A", soroll:69, speed:"V", load:"91" },
      { id:"P004", amplada:205, perfil:55, diametre:16, marca:"Michelin",    model:"Alpin 6",                     estacio:"hivern",    tipus:"turisme",    preu:105.00, estoc:6,  eficiencia:"C", humit:"B", soroll:71, speed:"T", load:"91" },
      { id:"P005", amplada:225, perfil:45, diametre:18, marca:"Pirelli",     model:"P Zero",                      estacio:"estiu",     tipus:"sport",      preu:178.00, estoc:4,  eficiencia:"A", humit:"A", soroll:72, speed:"Y", load:"92" },
      { id:"P006", amplada:225, perfil:45, diametre:18, marca:"Michelin",    model:"Pilot Sport 4S",              estacio:"estiu",     tipus:"sport",      preu:192.00, estoc:2,  eficiencia:"A", humit:"A", soroll:70, speed:"Y", load:"92" },
      { id:"P007", amplada:235, perfil:60, diametre:18, marca:"Goodyear",    model:"UltraGrip Performance+ SUV",  estacio:"hivern",    tipus:"suv",        preu:145.00, estoc:8,  eficiencia:"C", humit:"A", soroll:73, speed:"H", load:"107" },
      { id:"P008", amplada:235, perfil:60, diametre:18, marca:"Michelin",    model:"CrossClimate 2 SUV",          estacio:"allseason", tipus:"suv",        preu:158.00, estoc:6,  eficiencia:"B", humit:"A", soroll:71, speed:"V", load:"107" },
      { id:"P009", amplada:235, perfil:60, diametre:18, marca:"Pirelli",     model:"Scorpion Verde",              estacio:"estiu",     tipus:"suv",        preu:138.00, estoc:0,  eficiencia:"B", humit:"B", soroll:72, speed:"V", load:"107" },
      { id:"P010", amplada:195, perfil:65, diametre:15, marca:"Bridgestone", model:"Blizzak LM005",               estacio:"hivern",    tipus:"turisme",    preu:112.00, estoc:4,  eficiencia:"C", humit:"A", soroll:70, speed:"T", load:"91" },
      { id:"P011", amplada:195, perfil:65, diametre:15, marca:"Goodyear",    model:"Vector 4Seasons Gen-3",       estacio:"allseason", tipus:"turisme",    preu:102.00, estoc:10, eficiencia:"B", humit:"A", soroll:69, speed:"V", load:"91" },
      { id:"P012", amplada:215, perfil:50, diametre:17, marca:"Dunlop",      model:"Sport Maxx RT2",              estacio:"estiu",     tipus:"sport",      preu:118.00, estoc:6,  eficiencia:"A", humit:"A", soroll:71, speed:"W", load:"91" },
      { id:"P013", amplada:255, perfil:40, diametre:19, marca:"Pirelli",     model:"P Zero PZ4",                  estacio:"estiu",     tipus:"sport",      preu:235.00, estoc:4,  eficiencia:"A", humit:"A", soroll:73, speed:"Y", load:"103" },
      { id:"P014", amplada:175, perfil:65, diametre:14, marca:"Firestone",   model:"Roadhawk 2",                  estacio:"estiu",     tipus:"turisme",    preu:62.00,  estoc:12, eficiencia:"B", humit:"A", soroll:70, speed:"T", load:"82" },
      { id:"P015", amplada:265, perfil:65, diametre:17, marca:"Bridgestone", model:"Dueler H/T 684 II",           estacio:"estiu",     tipus:"suv",        preu:148.00, estoc:3,  eficiencia:"C", humit:"C", soroll:74, speed:"H", load:"112" },
      { id:"P016", amplada:205, perfil:75, diametre:16, marca:"Michelin",    model:"Agilis 3",                    estacio:"estiu",     tipus:"furgoneta",  preu:128.00, estoc:6,  eficiencia:"B", humit:"A", soroll:72, speed:"R", load:"110" },
      { id:"P017", amplada:215, perfil:65, diametre:16, marca:"Pirelli",     model:"Carrier Winter",              estacio:"hivern",    tipus:"furgoneta",  preu:134.00, estoc:4,  eficiencia:"C", humit:"B", soroll:73, speed:"R", load:"109" },
      { id:"P018", amplada:120, perfil:70, diametre:17, marca:"Pirelli",     model:"Diablo Rosso IV",             estacio:"estiu",     tipus:"moto",       preu:148.00, estoc:3,  eficiencia:null, humit:null, soroll:null, speed:"W", load:"58" },
      { id:"P019", amplada:180, perfil:55, diametre:17, marca:"Michelin",    model:"Power 6",                     estacio:"estiu",     tipus:"moto",       preu:168.00, estoc:2,  eficiencia:null, humit:null, soroll:null, speed:"W", load:"73" },
      { id:"P020", amplada:190, perfil:55, diametre:17, marca:"Metzeler",    model:"Roadtec 01 SE",               estacio:"estiu",     tipus:"moto",       preu:155.00, estoc:5,  eficiencia:null, humit:null, soroll:null, speed:"W", load:"74" }
    ];

    /* ── State ── */
    let dispData     = STOCK_DATA;
    let activeSeason = 'tots';

    /* ── Populate filter dropdowns ── */
    function populateFilters(data) {
      const uniq = (arr) => [...new Set(arr)].sort((a,b) => a - b);

      const setOpts = (id, vals) => {
        const sel = document.getElementById(id);
        const cur = sel.value;
        const first = sel.options[0].outerHTML;
        sel.innerHTML = first + vals.map(v => `<option value="${v}">${v}</option>`).join('');
        if (cur) sel.value = cur;
      };

      setOpts('fAmplada',  uniq(data.map(p => p.amplada)));
      setOpts('fPerfil',   uniq(data.map(p => p.perfil)));
      setOpts('fDiametre', uniq(data.map(p => p.diametre)));

      const marcaSel = document.getElementById('fMarca');
      const curMarca = marcaSel.value;
      const marcaFirst = marcaSel.options[0].outerHTML;
      const marques = [...new Set(data.map(p => p.marca))].sort();
      marcaSel.innerHTML = marcaFirst + marques.map(m => `<option value="${m}">${m}</option>`).join('');
      if (curMarca) marcaSel.value = curMarca;
    }

    /* ── Filter & sort ── */
    function applyFilters() {
      const amplada  = document.getElementById('fAmplada').value;
      const perfil   = document.getElementById('fPerfil').value;
      const diametre = document.getElementById('fDiametre').value;
      const marca    = document.getElementById('fMarca').value;
      const tipus    = document.getElementById('fTipus').value;
      const sort     = document.getElementById('sortBy').value;

      let result = STOCK_DATA.filter(p => {
        if (amplada  && p.amplada  != amplada)   return false;
        if (perfil   && p.perfil   != perfil)    return false;
        if (diametre && p.diametre != diametre)   return false;
        if (marca    && p.marca    !== marca)     return false;
        if (tipus    && p.tipus    !== tipus)     return false;
        if (activeSeason !== 'tots' && p.estacio !== activeSeason) return false;
        return true;
      });

      // Sort
      if (sort === 'preu-asc')   result.sort((a,b) => a.preu - b.preu);
      if (sort === 'preu-desc')  result.sort((a,b) => b.preu - a.preu);
      if (sort === 'marca')      result.sort((a,b) => a.marca.localeCompare(b.marca));
      if (sort === 'estoc-desc') result.sort((a,b) => b.estoc - a.estoc);

      renderResults(result);
    }

    /* ── EU label helper ── */
    function euBadge(val, label) {
      if (!val) return '';
      const cls = val === 'A' ? 'eu-a' : val === 'B' ? 'eu-b' : val === 'C' ? 'eu-c' : '';
      return `<span class="eu-val ${cls}">${label}: ${val}</span>`;
    }

    /* ── Season tag helper ── */
    function seasonTag(s) {
      const map = {
        estiu:     ['tag-estiu',    '☀️ Estiu'],
        hivern:    ['tag-hivern',   '❄️ Hivern'],
        allseason: ['tag-allseason','🔄 All Season']
      };
      const [cls, lbl] = map[s] || ['tag-tipus', s];
      return `<span class="tyre-tag ${cls}">${lbl}</span>`;
    }

    /* ── Stock badge helper ── */
    function stockBadge(n) {
      if (n === 0)  return ['badge-out', '❌ Sense estoc'];
      if (n <= 3)   return ['badge-low', `⚠️ Últimes ${n} ud.`];
      return ['badge-ok', `✅ Estoc: ${n} ud.`];
    }

    /* ── Render cards ── */
    function renderResults(data) {
      const container = document.getElementById('dispResults');
      const count = document.getElementById('dispCount');

      count.innerHTML = data.length === 0
        ? 'Cap resultat per als filtres seleccionats'
        : `<strong>${data.length}</strong> pneumàtic${data.length !== 1 ? 's' : ''} trobat${data.length !== 1 ? 's' : ''}`;

      if (data.length === 0) {
        container.innerHTML = `
          <div class="disp-empty">
            <div class="disp-empty-icon">🔍</div>
            <h3>Sense resultats</h3>
            <p>Prova amb altres filtres o <a href="tel:+376722229" style="color:var(--red)">truca'ns</a> per consultar disponibilitat.</p>
          </div>`;
        return;
      }

      container.innerHTML = data.map(p => {
        const [badgeClass, badgeText] = stockBadge(p.estoc);
        const available = p.estoc > 0;
        const mida = `${p.amplada}/${p.perfil} R${p.diametre}`;
        return `
          <div class="tyre-card ${available ? '' : 'out-of-stock'}">
            <div class="tyre-card-header">
              <div>
                <div class="tyre-size">${p.amplada}/<small>${p.perfil} R${p.diametre}</small></div>
                <div style="font-size:0.72rem;color:var(--muted);margin-top:0.2rem;">${p.speed}${p.load} · Ref: ${p.id}</div>
              </div>
              <span class="tyre-stock-badge ${badgeClass}">${badgeText}</span>
            </div>
            <div class="tyre-card-body">
              <div class="tyre-brand">${p.marca}</div>
              <div class="tyre-model">${p.model}</div>
              <div class="tyre-meta">
                ${seasonTag(p.estacio)}
                <span class="tyre-tag tag-tipus">${p.tipus.charAt(0).toUpperCase()+p.tipus.slice(1)}</span>
              </div>
              ${p.eficiencia ? `
              <div class="tyre-eu">
                <span style="font-size:0.72rem;color:var(--muted);">Etiqueta EU:</span>
                ${euBadge(p.eficiencia, 'Ef')}
                ${euBadge(p.humit, 'Hum')}
                ${p.soroll ? `<span class="eu-val">🔊 ${p.soroll}dB</span>` : ''}
              </div>` : ''}
            </div>
            <div class="tyre-card-footer">
              <div class="tyre-price">${p.preu.toFixed(2)} €<small>/ud.</small></div>
              <button class="tyre-action ${available ? 'available' : 'unavailable'}"
                ${available
                  ? `onclick="openRequest('${p.id}','${p.marca} ${p.model}','${mida}')">`
                  : `disabled>`}
                ${available ? '📞 Reservar' : '🚫 No disponible'}
              </button>
            </div>
          </div>`;
      }).join('');
    }

    /* ── Request / reserve modal ── */
    function openRequest(id, name, size) {
      document.getElementById('reqTyreName').textContent = name;
      document.getElementById('reqTyreSize').textContent = size + ' · Ref: ' + id;
      document.getElementById('requestPanel').classList.add('open');
      document.getElementById('reqName').focus();

      // Update WhatsApp link dynamically on input
      function updateWA() {
        const nom    = document.getElementById('reqName').value.trim() || 'Client';
        const tel    = document.getElementById('reqPhone').value.trim() || '(sense telèfon)';
        const matric = document.getElementById('reqMatricula').value.trim();
        const msg = encodeURIComponent(
          `Hola! Voldria reservar el pneumàtic:\n` +
          `• *${name}*\n• Mida: ${size}\n• Ref: ${id}\n\n` +
          `Nom: ${nom}\nTelèfon: ${tel}` +
          (matric ? `\nMatrícula: ${matric}` : '')
        );
        document.getElementById('reqWhatsapp').href = `https://wa.me/376722229?text=${msg}`;
      }

      ['reqName','reqPhone','reqMatricula'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateWA);
      });
      updateWA();
    }

    document.getElementById('reqClose').addEventListener('click', () => {
      document.getElementById('requestPanel').classList.remove('open');
    });
    document.getElementById('reqCancel').addEventListener('click', () => {
      document.getElementById('requestPanel').classList.remove('open');
    });
    document.getElementById('requestPanel').addEventListener('click', function(e) {
      if (e.target === this) this.classList.remove('open');
    });

    /* ── Season pill toggle ── */
    document.querySelectorAll('.season-pill').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.season-pill').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeSeason = this.dataset.season;
      });
    });

    /* ── Search / reset buttons ── */
    document.getElementById('btnSearch').addEventListener('click', applyFilters);
    document.getElementById('btnReset').addEventListener('click', function() {
      document.getElementById('fAmplada').value  = '';
      document.getElementById('fPerfil').value   = '';
      document.getElementById('fDiametre').value = '';
      document.getElementById('fMarca').value    = '';
      document.getElementById('fTipus').value    = '';
      document.querySelectorAll('.season-pill').forEach(b => b.classList.remove('active'));
      document.querySelector('.season-pill[data-season="tots"]').classList.add('active');
      activeSeason = 'tots';
      applyFilters();
    });

    /* Also search on Enter key in any select */
    document.querySelectorAll('#page-disponibilitat select').forEach(sel => {
      sel.addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters(); });
      sel.addEventListener('change', applyFilters);
    });

    /* Sort change */
    document.getElementById('sortBy').addEventListener('change', applyFilters);

    /* ── Init disponibilitat page ── */
    function initDisponibilitat() {
      populateFilters(STOCK_DATA);
      applyFilters();
    }

    /* Call init when navigating to the page */
    const _origNavigateTo = navigateTo;
    // Patch navigateTo to init stock page on first visit
    let dispInited = false;
    const origNav = navigateTo;
    navigateTo = function(pageId) {
      origNav(pageId);
      if (pageId === 'disponibilitat' && !dispInited) {
        dispInited = true;
        setTimeout(initDisponibilitat, 50);
      }
    };

    /* ─── INIT ────────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
      observeFades();
    });
