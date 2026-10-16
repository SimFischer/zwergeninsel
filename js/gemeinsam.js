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
    const img = h('img', { src: ZI.BILD(datei), alt: alt || '', class: cls || null, draggable: 'false', decoding: 'async' });
    img.addEventListener('error', () => {
      const ph = h('div', { class: 'platzhalter' + (cls ? ' ' + cls : ''), role: 'img', 'aria-label': alt || datei }, alt || datei);
      img.replaceWith(ph);
    }, { once: true });
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
  ZI.meldung = function (text, ms) {
    const m = h('div', { class: 'meldung pergament', role: 'status' }, text);
    document.body.appendChild(m);
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
