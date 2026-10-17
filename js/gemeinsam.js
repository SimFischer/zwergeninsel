/* Zwergeninsel – Hilfsfunktionen für beide Seiten */
(function () {
  const ZI = window.ZI || (window.ZI = {});

  /* Element bauen: h('div', {class: 'x', onclick: fn}, kind1, kind2 …) */
  ZI.h = function h(tag, attrs, ...kinder) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === null || v === undefined || v === false) continue;
        if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else if (k === 'class') el.className = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k === 'html') el.innerHTML = v;
        else el.setAttribute(k, v === true ? '' : v);
      }
    }
    for (const k of kinder.flat(Infinity)) {
      if (k === null || k === undefined || k === false) continue;
      el.appendChild(k instanceof Node ? k : document.createTextNode(String(k)));
    }
    return el;
  };
  const h = ZI.h;

  /* Inhalt ersetzen und dabei leere Einträge (null, false) überspringen */
  ZI.setze = function (el, ...kinder) {
    el.replaceChildren(...kinder.flat(Infinity).filter((k) => k !== null && k !== undefined && k !== false));
  };

  /* Bild mit Platzhalter: Fehlt die Datei noch, erscheint ein beschrifteter Rahmen. */
  ZI.bild = function bild(datei, alt, cls) {
    /* datei darf auch eine Liste sein: dann wird das erste vorhandene Bild genommen */
    const liste = Array.isArray(datei) ? datei.slice() : [datei];
    const img = h('img', { src: ZI.BILD(liste[0]), alt: alt || '', class: cls || null, draggable: 'false', decoding: 'async' });
    let n = 0;
    img.addEventListener('error', function weiter() {
      n++;
      if (n < liste.length) { img.src = ZI.BILD(liste[n]); return; }
      img.removeEventListener('error', weiter);
      const ph = h('div', { class: 'platzhalter' + (cls ? ' ' + cls : ''), role: 'img', 'aria-label': alt || liste[0] }, alt || liste[0]);
      img.replaceWith(ph);
    });
    return img;
  };

  /* Bild mit eigenem Ersatz: Fehlt das Bild, erscheint ersatz (ein Element) – oder gar nichts */
  ZI.bildOder = function bildOder(datei, alt, ersatz, cls) {
    const liste = Array.isArray(datei) ? datei.filter(Boolean) : [datei];
    const img = h('img', { src: ZI.BILD(liste[0]), alt: alt || '', class: cls || null, draggable: 'false', decoding: 'async' });
    let n = 0;
    img.addEventListener('error', function weiter() {
      n++;
      if (n < liste.length) { img.src = ZI.BILD(liste[n]); return; }
      img.removeEventListener('error', weiter);
      if (ersatz) img.replaceWith(ersatz); else img.remove();
    });
    return img;
  };

  /* Hintergrund: Bild, sonst gemalter Ersatz */
  ZI.hintergrund = function hintergrund(datei, ersatzKlasse, abdunkeln) {
    const box = h('div', { class: 'hintergrund ' + ersatzKlasse, 'aria-hidden': 'true' });
    if (abdunkeln !== undefined) box.style.setProperty('--abdunkeln', abdunkeln);
    const img = h('img', { src: ZI.BILD(datei), alt: '' });
    img.addEventListener('error', () => img.remove(), { once: true });
    box.appendChild(img);
    return box;
  };

  /* Kleine Strich-Symbole */
  const svg = (pfad) => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '2.4'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = pfad;
    return s;
  };
  ZI.icon = {
    zurueck: () => svg('<path d="M15 5 L8 12 L15 19"/>'),
    vorlesen: () => svg('<path d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M16 9 Q18 12 16 15"/><path d="M18.5 6.5 Q22.5 12 18.5 17.5"/>'),
    laterne: () => svg('<path d="M9 3 H15"/><path d="M12 3 V5"/><path d="M7 8 Q12 4 17 8 V17 Q12 21 7 17 Z"/><path d="M12 10 Q10 13 12 15 Q14 13 12 10 Z"/>'),
    haken: () => svg('<path d="M5 12.5 L10 17 L19 7"/>'),
    ton: () => svg('<path d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M16.5 9.5 Q18 12 16.5 14.5"/>'),
    stumm: () => svg('<path d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M17 9 L21 15 M21 9 L17 15"/>'),
    flamme: () => svg('<path d="M12 3 Q17 9 16 14 A4 4 0 0 1 8 14 Q8 11 10 9 Q10 12 12 12 Q11 8 12 3 Z"/>'),
    hammer: () => svg('<rect x="4" y="4" width="11" height="6" rx="1.5"/><path d="M10 10 L10 20"/>'),
    lupe: () => svg('<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5 L20 20"/>'),
    schild: () => svg('<path d="M12 3 L19 6 V11 Q19 17 12 21 Q5 17 5 11 V6 Z"/>'),
    sprechblase: () => svg('<path d="M4 5 H20 V15 H10 L6 19 V15 H4 Z"/>'),
    ohr: () => svg('<path d="M8 9 A5 5 0 0 1 18 9 Q18 13 15 15 Q13 16.5 13 19 A2.5 2.5 0 0 1 8 18.5"/><path d="M11 9.5 A2 2 0 0 1 15 9.5 Q15 11 13.5 12"/>'),
    krone: () => svg('<path d="M4 18 L4 8 L9 12 L12 6 L15 12 L20 8 L20 18 Z"/>'),
    stern: () => svg('<path d="M12 3 L14.6 9 L21 9.4 L16 13.6 L17.6 20 L12 16.6 L6.4 20 L8 13.6 L3 9.4 L9.4 9 Z"/>'),
    edelstein: () => svg('<path d="M7 4 H17 L21 9 L12 20 L3 9 Z"/><path d="M3 9 H21 M9 4 L12 9 L15 4"/>'),
    helm: () => svg('<path d="M4 15 Q4 6 12 6 Q20 6 20 15 Z"/><path d="M3 15 H21 M12 6 V3"/>'),
    mond: () => svg('<path d="M20 14 A8 8 0 1 1 10 4 A6.5 6.5 0 0 0 20 14 Z"/>'),
    musik: () => svg('<path d="M9 18 V6 L19 4 V16"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="16" r="2"/>'),
    album: () => svg('<circle cx="12" cy="9" r="5"/><path d="M9 13 L7 21 L12 18.5 L17 21 L15 13"/>'),
    buch: () => svg('<path d="M4 5 Q8 3 12 5 Q16 3 20 5 V19 Q16 17 12 19 Q8 17 4 19 Z"/><path d="M12 5 V19"/>'),
    schloss: () => svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11 V8 a4 4 0 0 1 8 0 V11"/>'),
    kamera: () => svg('<path d="M4 8 H8 L10 5 H14 L16 8 H20 V19 H4 Z"/><circle cx="12" cy="13" r="3.5"/>'),
    zahnrad: () => svg('<circle cx="12" cy="12" r="3"/><path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M4.9 4.9 L7 7 M17 17 L19.1 19.1 M4.9 19.1 L7 17 M17 7 L19.1 4.9"/>'),
    tastatur: () => svg('<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10 H6.01 M10 10 H10.01 M14 10 H14.01 M18 10 H18.01 M7 14 H17"/>'),
  };

  /* Zufällig mischen */
  ZI.mischen = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  ZI.zufall = (arr) => arr[Math.floor(Math.random() * arr.length)];

  /* Speicher, der nie abstürzt (privater Modus o. ä.) */
  ZI.speicher = {
    lesen(k, ersatz) { try { const v = localStorage.getItem(k); return v === null ? ersatz : JSON.parse(v); } catch (e) { return ersatz; } },
    schreiben(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* egal */ } },
    loeschen(k) { try { localStorage.removeItem(k); } catch (e) { /* egal */ } },
  };

  /* ---------- Klänge (ohne Dateien, mit Web Audio erzeugt) ---------- */
  let ctx = null;
  ZI.ton = {
    an: ZI.speicher.lesen('zi-ton', true),
    umschalten() { this.an = !this.an; ZI.speicher.schreiben('zi-ton', this.an); return this.an; },
    ctx() {
      if (!this.an) return null;
      try {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        return ctx;
      } catch (e) { return null; }
    },
    klang(freq, dauer, typ, laut, start) {
      const c = this.ctx(); if (!c) return;
      const t = c.currentTime + (start || 0);
      const o = c.createOscillator(); const g = c.createGain();
      o.type = typ || 'sine'; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(laut || 0.2, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dauer);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + dauer + 0.05);
    },
    amboss() {
      const c = this.ctx(); if (!c) return;
      [1320, 1980, 2640, 3520].forEach((f, i) => this.klang(f, 0.6 - i * 0.1, 'sine', 0.12 / (i + 1)));
      const t = c.currentTime; const n = c.createBufferSource();
      const buf = c.createBuffer(1, c.sampleRate * 0.08, c.sampleRate);
      const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      n.buffer = buf; const g = c.createGain(); g.gain.value = 0.25; n.connect(g).connect(c.destination); n.start(t);
    },
    richtig() { [523, 659, 784].forEach((f, i) => this.klang(f, 0.25, 'triangle', 0.15, i * 0.09)); },
    falsch() { this.klang(196, 0.25, 'triangle', 0.15); this.klang(165, 0.3, 'triangle', 0.12, 0.12); },
    fanfare() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => this.klang(f, 0.3, 'triangle', 0.15, i * 0.12)); },
    plopp() { this.klang(880, 0.12, 'sine', 0.15); },
  };

  /* ---------- Vorlesen ---------- */
  ZI.vorlesen = function (text) {
    try {
      const s = window.speechSynthesis; if (!s) return;
      s.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/…/g, ' '));
      u.lang = 'de-DE'; u.rate = 0.92;
      const stimme = s.getVoices().find((v) => v.lang && v.lang.startsWith('de'));
      if (stimme) u.voice = stimme;
      s.speak(u);
    } catch (e) { /* kein Vorlesen möglich */ }
  };

  /* ---------- Kurze Meldung unten ---------- */
  /* Meldungen erscheinen in einem Stapel, damit sich gleichzeitige nicht überdecken */
  ZI.meldung = function (text, ms) {
    let stapel = document.querySelector('.meldungen');
    if (!stapel) { stapel = h('div', { class: 'meldungen', 'aria-live': 'polite' }); document.body.appendChild(stapel); }
    const m = h('div', { class: 'meldung pergament', role: 'status' }, text);
    stapel.appendChild(m);
    setTimeout(() => m.remove(), ms || 2600);
  };

  /* ---------- Fenster ---------- */
  ZI.fenster = function (inhalt, opts) {
    const s = h('div', { class: 'schleier', role: 'dialog', 'aria-modal': 'true' });
    const f = h('div', { class: 'fenster pergament auf-pergament' }, inhalt);
    s.appendChild(f);
    if (opts && opts.schliessbar) s.addEventListener('click', (e) => { if (e.target === s) s.remove(); });
    document.body.appendChild(s);
    return { schliessen: () => s.remove(), el: f };
  };


  /* ---------- Konfetti ---------- */
  ZI.konfetti = function (anzahl) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const farben = ['#e8b23a', '#f28c28', '#6f8f3a', '#2ec4b6', '#c2533a', '#fff4dc', '#9b6bd3'];
    const box = h('div', { class: 'konfetti', 'aria-hidden': 'true' });
    for (let i = 0; i < (anzahl || 90); i++) {
      const k = h('span');
      k.style.left = Math.random() * 100 + 'vw';
      k.style.background = farben[i % farben.length];
      k.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
      k.style.setProperty('--rot', (Math.random() * 1080 - 540) + 'deg');
      k.style.animationDuration = 1.8 + Math.random() * 1.6 + 's';
      k.style.animationDelay = Math.random() * 0.4 + 's';
      k.style.width = 6 + Math.random() * 8 + 'px'; k.style.height = 10 + Math.random() * 10 + 'px';
      box.appendChild(k);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 4200);
  };

  /* ---------- Feuerwerk (für das Board) ---------- */
  ZI.feuerwerk = function (dauer) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = h('canvas', { class: 'feuerwerk', 'aria-hidden': 'true' });
    document.body.appendChild(c);
    const ctx = c.getContext('2d');
    const W = (c.width = window.innerWidth * (window.devicePixelRatio || 1));
    const H = (c.height = window.innerHeight * (window.devicePixelRatio || 1));
    const farben = ['#ffd56e', '#f28c28', '#2ec4b6', '#ff6b6b', '#b57cff', '#ffffff', '#8db04c'];
    const teile = [];
    let ende = Date.now() + (dauer || 6000);
    function rakete() {
      const x = W * (0.15 + Math.random() * 0.7), y = H * (0.15 + Math.random() * 0.35);
      const farbe = farben[Math.floor(Math.random() * farben.length)];
      for (let i = 0; i < 70; i++) {
        const w = Math.random() * Math.PI * 2, v = (2 + Math.random() * 5) * (W / 1400);
        teile.push({ x, y, vx: Math.cos(w) * v, vy: Math.sin(w) * v, life: 60 + Math.random() * 30, farbe });
      }
      ZI.ton.klang(180 + Math.random() * 80, 0.4, 'sine', 0.08);
    }
    let zaehler = 0;
    (function schleife() {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      if (Date.now() < ende && zaehler++ % 22 === 0) rakete();
      for (let i = teile.length - 1; i >= 0; i--) {
        const t = teile[i];
        t.x += t.vx; t.y += t.vy; t.vy += 0.05 * (W / 1400); t.vx *= 0.985; t.life--;
        ctx.globalAlpha = Math.max(0, t.life / 90);
        ctx.fillStyle = t.farbe; ctx.beginPath(); ctx.arc(t.x, t.y, 2.4 * (W / 1400), 0, Math.PI * 2); ctx.fill();
        if (t.life <= 0) teile.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      if (Date.now() < ende || teile.length) requestAnimationFrame(schleife); else c.remove();
    })();
  };

  /* ---------- Ruhige Schmiede-Melodie (Web Audio, standardmäßig aus) ---------- */
  ZI.musik = {
    an: false, timer: null, schritt: 0, naechste: 0,
    noten: [0, 3, 5, 7, 10, 7, 5, 3, 0, 5, 7, 12, 10, 7, 5, 7], // Moll-Pentatonik
    umschalten() { if (this.an) this.stop(); else this.start(); return this.an; },
    start() {
      const c = ZI.ton.ctx(); if (!c) return;
      this.an = true; this.naechste = c.currentTime + 0.1; this.schritt = 0;
      this.timer = setInterval(() => this.planen(), 120);
    },
    stop() { this.an = false; clearInterval(this.timer); this.timer = null; },
    planen() {
      const c = ZI.ton.ctx(); if (!c || !this.an) return;
      const takt = 0.42;
      while (this.naechste < c.currentTime + 0.4) {
        const n = this.noten[this.schritt % this.noten.length];
        const f = 220 * Math.pow(2, n / 12);
        this.ton(c, f, this.naechste, 0.38, 0.035, 'triangle');
        if (this.schritt % 4 === 0) this.ton(c, 110 * Math.pow(2, (this.schritt % 16 < 8 ? 0 : -2) / 12), this.naechste, 1.5, 0.03, 'sine');
        this.naechste += takt; this.schritt++;
      }
    },
    ton(c, f, t, d, laut, typ) {
      const o = c.createOscillator(); const g = c.createGain();
      o.type = typ; o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(laut, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + 0.05);
    },
  };

  /* ---------- Funken sprühen lassen ---------- */
  ZI.funken = function (behaelter, x, y, anzahl) {
    for (let i = 0; i < (anzahl || 18); i++) {
      const w = Math.random() * Math.PI - Math.PI; // nach oben
      const r = 60 + Math.random() * 110;
      const f = h('span', { class: 'funke' });
      f.style.left = x + 'px'; f.style.top = y + 'px';
      f.style.setProperty('--dx', Math.cos(w) * r + 'px');
      f.style.setProperty('--dy', Math.sin(w) * r + 40 * Math.random() + 'px');
      f.style.animationDuration = 0.5 + Math.random() * 0.6 + 's';
      behaelter.appendChild(f);
      setTimeout(() => f.remove(), 1300);
    }
  };
})();
