/* Zwergeninsel – Insel-Ansicht für das Board (Lehrer-iPad oder PC am Smartboard) */
(function () {
  const ZI = window.ZI;
  const { h, bild, icon, speicher } = ZI;
  const KEY = 'zi-insel';
  const KAP = 0;

  const leer = () => ({ klassengroesse: 27, zwerge: {}, gebaut: [], schmuck: 0, rat: null, gefeiert: false });
  let insel = Object.assign(leer(), speicher.lesen(KEY, {}));
  const sichern = () => speicher.schreiben(KEY, insel);

  /* ---------- Berechnungen ---------- */
  function staende() {
    return Object.values(insel.zwerge).map((e) => ZI.Stand.ausCode(e.code)).filter(Boolean);
  }
  function material() { return staende().reduce((a, s) => a + s.coreCount(KAP), 0); }
  function ziel() { return Math.max(1, insel.klassengroesse * 3); }
  function edelsteine() { return staende().reduce((a, s) => a + s.gems(), 0); }

  /* Bauplan auflösen: Ratsentscheidung bestimmt die Reihenfolge */
  function bauplan() {
    let ratNr = 0;
    return ZI.BAUPLAN_K1.map((schritt) => {
      if (!schritt.rat) return { anteil: schritt.anteil, gebaeude: schritt.gebaeude };
      const [a, b] = schritt.rat;
      const erst = insel.rat || a;
      const zweit = erst === a ? b : a;
      return { anteil: schritt.anteil, gebaeude: ratNr++ === 0 ? erst : zweit };
    });
  }
  function sollGebaut() {
    const m = material();
    if (m === 0) return [];
    const anteil = m / ziel();
    return bauplan().filter((s) => anteil >= s.anteil - 1e-9).map((s) => s.gebaeude);
  }
  function naechstes() {
    const m = material(); const anteil = m / ziel();
    const plan = bauplan();
    const n = plan.find((s) => (m === 0 ? true : anteil < s.anteil - 1e-9));
    if (!n) return null;
    const bedarf = Math.max(1, Math.ceil(n.anteil * ziel()) - m);
    return { gebaeude: ZI.GEBAEUDE.find((g) => g.id === n.gebaeude), bedarf };
  }

  /* ---------- Darstellung ---------- */
  const screen = h('div', { class: 'insel-screen' });
  const buehne = h('div', { class: 'insel-buehne' });
  const grund = h('div', { class: 'insel-grund' }, h('div', { class: 'insel-ersatz' }), h('div', { class: 'wellen' }));
  const grundBild = h('img', { src: ZI.BILD('insel-grund'), alt: '' });
  grundBild.addEventListener('error', () => grundBild.remove(), { once: true });
  grund.appendChild(grundBild);
  buehne.appendChild(grund);
  const bauEls = {};
  ZI.GEBAEUDE.forEach((g) => {
    const el = h('div', { class: 'bau', style: { left: g.x + '%', top: g.y + '%', width: g.w + '%' } },
      h('div', { class: 'ruine' }, bild(g.id + '-ruine', g.name + ' (Ruine)')),
      h('div', { class: 'fertig', style: { display: 'none' } }, bild(g.id, g.name)));
    bauEls[g.id] = el;
    buehne.appendChild(el);
  });
  const zwergSchicht = h('div');
  const schmuckSchicht = h('div');
  buehne.append(schmuckSchicht, zwergSchicht);

  const tafel = h('div', { class: 'tafel pergament auf-pergament' });
  const titel = h('div', { class: 'insel-titel' }, h('h1', null, 'Die Zwergeninsel'), h('div', { class: 'unter' }, 'Kapitel 1 · Gestrandet'));
  const knoepfe = h('div', { class: 'insel-knoepfe' },
    h('button', { class: 'knopf', onclick: oeffneScanner }, icon.kamera(), 'Lieferung scannen'),
    h('button', { class: 'knopf holz', onclick: oeffneCodeEingabe }, icon.tastatur(), 'Code eintippen'),
    h('button', { class: 'knopf holz', onclick: oeffneRat }, 'Zwergenrat'),
    h('button', { class: 'rund', 'aria-label': 'Einstellungen', onclick: oeffneEinstellungen }, icon.zahnrad()));
  screen.append(buehne, titel, tafel, knoepfe);
  document.getElementById('app').appendChild(screen);

  function zeigeGebaeude(animiert) {
    const soll = sollGebaut();
    const neu = soll.filter((id) => !insel.gebaut.includes(id));
    ZI.GEBAEUDE.forEach((g) => {
      const el = bauEls[g.id];
      const ist = insel.gebaut.includes(g.id) || (!animiert && soll.includes(g.id));
      el.classList.toggle('gebaut', ist);
      el.querySelector('.fertig').style.display = ist ? '' : 'none';
      el.classList.toggle('gesperrt', g.kapitel > 1);
    });
    if (!animiert) { insel.gebaut = soll.slice(); sichern(); return; }
    neu.forEach((id, i) => setTimeout(() => baue(id), 900 * i + 300));
    insel.gebaut = Array.from(new Set([...insel.gebaut, ...soll]));
    sichern();
  }

  function baue(id) {
    const el = bauEls[id]; const g = ZI.GEBAEUDE.find((x) => x.id === id);
    const r = el.getBoundingClientRect(); const b = buehne.getBoundingClientRect();
    const cx = r.left - b.left + r.width / 2; const cy = r.top - b.top + r.height * 0.75;
    for (let i = 0; i < 16; i++) {
      const s = h('span', { class: 'staub' });
      const w = Math.random() * Math.PI * 2; const d = 40 + Math.random() * 90;
      s.style.left = cx + 'px'; s.style.top = cy + 'px';
      s.style.setProperty('--dx', Math.cos(w) * d + 'px'); s.style.setProperty('--dy', Math.sin(w) * d * 0.5 - 20 + 'px');
      buehne.appendChild(s); setTimeout(() => s.remove(), 1200);
    }
    ZI.ton.amboss();
    setTimeout(() => {
      el.classList.add('gebaut');
      el.querySelector('.fertig').style.display = '';
      el.classList.remove('wird-gebaut'); void el.offsetWidth; el.classList.add('wird-gebaut');
      ZI.ton.fanfare();
      ZI.meldung(g.name + ' ist fertig gebaut!', 3200);
      if (sollGebaut().length === ZI.BAUPLAN_K1.length && !insel.gefeiert) setTimeout(feiern, 2500);
    }, 450);
  }

  function zeigeSchmuck(animiert) {
    const anzahl = Math.min(ZI.SCHMUCK.length, Math.floor(edelsteine() / ZI.SCHMUCK_PRO));
    ZI.setze(schmuckSchicht, ...ZI.SCHMUCK.slice(0, anzahl).map((s, i) => {
      const el = h('div', { class: 'schmuck', style: { left: s.x + '%', top: s.y + '%', width: s.w + '%' } }, bild(s.id, s.name));
      if (!animiert || i < insel.schmuck) el.style.animation = 'none';
      return el;
    }));
    if (animiert && anzahl > insel.schmuck) ZI.meldung('Neuer Schmuck fürs Dorf: ' + ZI.SCHMUCK[anzahl - 1].name + '!', 3000);
    insel.schmuck = anzahl; sichern();
  }

  /* Gelieferte Zwerge stehen um das Lagerfeuer */
  function platz(i) {
    const ring = Math.floor(i / 10); const pos = i % 10;
    const winkel = (pos / 10) * Math.PI * 2 + ring * 0.3;
    const rx = 9 + ring * 4.5; const ry = 5 + ring * 2.6;
    return { x: 50 + Math.cos(winkel) * rx, y: 62 + Math.sin(winkel) * ry };
  }
  function zeigeZwerge(neueIds) {
    const liste = Object.entries(insel.zwerge).sort((a, b) => a[1].erst - b[1].erst);
    ZI.setze(zwergSchicht, ...liste.map(([id, e], i) => {
      const s = ZI.Stand.ausCode(e.code); if (!s) return null;
      const z = ZI.ZWERGE.find((d) => d.nr === s.zwerg);
      const p = platz(i);
      return h('div', { class: 'mini-zwerg' + (neueIds && neueIds.includes(id) ? ' neu' : ''),
        style: { left: p.x + '%', top: p.y + '%', zIndex: String(3 + Math.round(p.y)), animationDelay: (i % 7) * 0.3 + 's' } }, bild(z.datei, z.name));
    }));
  }

  function zeigeTafel() {
    const m = material(); const zl = ziel();
    const n = naechstes();
    const gems = edelsteine();
    const anteil = Math.min(100, Math.round((m / zl) * 100));
    ZI.setze(tafel, 
      h('h2', { style: { fontSize: '26px' } }, 'Baumaterial'),
      h('div', null, h('span', { class: 'zahl' }, String(m)), h('span', { style: { fontSize: '22px' } }, ' von ' + zl)),
      h('div', { class: 'balken', role: 'progressbar', 'aria-valuenow': String(anteil), 'aria-valuemin': '0', 'aria-valuemax': '100' }, h('div', { style: { width: anteil + '%' } })),
      n ? h('div', { class: 'klein' }, 'Als Nächstes: ', h('b', null, n.gebaeude.name), ' – noch ' + n.bedarf + ' Lieferung' + (n.bedarf === 1 ? '' : 'en') + '.')
        : h('div', { class: 'klein' }, h('b', null, 'Kapitel 1 geschafft! '), 'Runenwort für Kapitel 2: ', h('b', null, ZI.KAPITEL[1].runenwort)),
      h('div', { class: 'zeile' }, bild('edelstein', 'Edelsteine'), gems + ' Edelsteine · ' + insel.schmuck + ' Schmuckstücke'),
      h('div', { class: 'zeile' }, bild('zwerg-01-brumm', 'Zwerge'), Object.keys(insel.zwerge).length + ' von ' + insel.klassengroesse + ' Zwergen haben geliefert'),
      m === 0 ? h('div', { class: 'klein' }, 'Jede geschaffte Station im Hauptstollen bringt 1 Material. Am Ende der Stunde scannt ihr die Lieferungen.') : null);
  }

  function allesZeigen(animiert, neueIds) {
    zeigeGebaeude(animiert);
    zeigeSchmuck(animiert);
    zeigeZwerge(neueIds);
    zeigeTafel();
  }

  /* ---------- Lieferung annehmen ---------- */
  function annehmen(text) {
    const roh = String(text || '').trim();
    const code = roh.startsWith(ZI.QR_PREFIX) ? roh.slice(ZI.QR_PREFIX.length) : roh;
    const s = ZI.Stand.ausCode(code);
    if (!s) return null;
    const id = String(s.id); // eine id pro Kind – auch wenn es den Zwerg wechselt
    const alt = insel.zwerge[id];
    const altStand = alt ? ZI.Stand.ausCode(alt.code) : null;
    // Ein älterer Code (weniger Fortschritt) überschreibt nie einen neueren
    const fortschrittAlt = altStand ? altStand.coreCount(KAP) * 100 + altStand.gems() : -1;
    const fortschrittNeu = s.coreCount(KAP) * 100 + s.gems();
    if (!alt || fortschrittNeu >= fortschrittAlt) insel.zwerge[id] = { code: s.code(), erst: alt ? alt.erst : Date.now(), zeit: Date.now() };
    sichern();
    return { id, stand: s, neu: !alt };
  }

  /* ---------- Scanner ---------- */
  function oeffneScanner() {
    const video = h('video', { playsinline: 'true', muted: 'true', autoplay: 'true' });
    video.muted = true;
    const liste = h('div', { class: 'scan-liste' }, h('div', { class: 'klein', style: { color: 'var(--tinte-hell)' } }, 'Haltet den QR-Code vor die Kamera.'));
    const canvas = document.createElement('canvas');
    const ctx2 = canvas.getContext('2d', { willReadFrequently: true });
    let stream = null; let laeuft = true;
    const zuletzt = {};
    const neueIds = [];
    let anzahl = 0;

    const f = ZI.fenster([
      h('h2', null, 'Lieferungen scannen'),
      h('div', { class: 'scanner' }, video, liste),
      h('div', { class: 'knopf-reihe' }, h('button', { class: 'knopf', onclick: schliessen }, 'Fertig – Dorf bauen!')),
    ]);
    f.el.classList.add('breit');

    function schliessen() {
      laeuft = false;
      if (stream) stream.getTracks().forEach((t) => t.stop());
      f.schliessen();
      allesZeigen(true, neueIds);
    }

    function schleife() {
      if (!laeuft) return;
      if (video.readyState >= 2 && video.videoWidth) {
        const w = 640; const hh = Math.round((video.videoHeight / video.videoWidth) * w);
        canvas.width = w; canvas.height = hh;
        ctx2.drawImage(video, 0, 0, w, hh);
        const bildDaten = ctx2.getImageData(0, 0, w, hh);
        const erg = window.jsQR(bildDaten.data, w, hh, { inversionAttempts: 'dontInvert' });
        if (erg && erg.data && (!zuletzt[erg.data] || Date.now() - zuletzt[erg.data] > 4000)) {
          zuletzt[erg.data] = Date.now();
          const a = annehmen(erg.data);
          if (a) {
            anzahl++;
            if (!neueIds.includes(a.id)) neueIds.push(a.id);
            const z = ZI.ZWERGE.find((d) => d.nr === a.stand.zwerg);
            ZI.ton.richtig();
            if (liste.firstChild && liste.firstChild.classList && liste.firstChild.classList.contains('klein')) ZI.setze(liste, );
            liste.prepend(h('div', { class: 'scan-eintrag' }, bild(z.datei, z.name),
              h('div', null, h('b', null, z.name), ' · ' + a.stand.coreCount(KAP) + ' Material, ' + a.stand.gems() + ' Edelsteine')));
          } else {
            ZI.ton.falsch(); ZI.meldung('Dieser QR-Code gehört nicht zur Zwergeninsel.');
          }
        }
      }
      requestAnimationFrame(schleife);
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      ZI.setze(liste, h('div', { class: 'rueckmeldung schlecht' }, 'Auf diesem Gerät gibt es keinen Kamerazugriff. Nutzt „Code eintippen“.'));
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } }, audio: false })
      .then((s) => { stream = s; video.srcObject = s; video.play().catch(() => {}); schleife(); })
      .catch(() => {
        ZI.setze(liste, h('div', { class: 'rueckmeldung schlecht' }, 'Die Kamera konnte nicht geöffnet werden. Erlaubt den Kamerazugriff im Browser oder nutzt „Code eintippen“.'));
      });
  }

  /* ---------- Code eintippen ---------- */
  function oeffneCodeEingabe() {
    const eingabe = h('input', { class: 'eingabe', maxlength: '11', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', placeholder: 'XXXXX-XXXXX', 'aria-label': 'Zwergenpass-Code' });
    const rueck = h('div');
    const neueIds = [];
    eingabe.addEventListener('input', () => {
      let v = eingabe.value.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 10);
      if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
      eingabe.value = v;
    });
    const ok = () => {
      const a = annehmen(eingabe.value);
      if (!a) { ZI.ton.falsch(); ZI.setze(rueck, h('div', { class: 'rueckmeldung schlecht' }, 'Der Code stimmt nicht. Bitte jedes Zeichen prüfen.')); return; }
      ZI.ton.richtig();
      if (!neueIds.includes(a.id)) neueIds.push(a.id);
      const z = ZI.ZWERGE.find((d) => d.nr === a.stand.zwerg);
      ZI.setze(rueck, h('div', { class: 'rueckmeldung gut' }, z.name + ' hat geliefert: ' + a.stand.coreCount(KAP) + ' Material, ' + a.stand.gems() + ' Edelsteine.'));
      eingabe.value = ''; eingabe.focus();
    };
    eingabe.addEventListener('keydown', (e) => { if (e.key === 'Enter') ok(); });
    const f = ZI.fenster([
      h('h2', null, 'Code eintippen'),
      h('p', { style: { margin: 0 } }, 'Den Code vom Zwergenpass eingeben. Ihr könnt mehrere Codes nacheinander eintippen.'),
      eingabe, rueck,
      h('div', { class: 'knopf-reihe' },
        h('button', { class: 'knopf holz', onclick: ok }, 'Liefern'),
        h('button', { class: 'knopf', onclick: () => { f.schliessen(); allesZeigen(true, neueIds); } }, 'Fertig – Dorf bauen!')),
    ]);
    setTimeout(() => eingabe.focus(), 200);
  }

  /* ---------- Zwergenrat ---------- */
  function oeffneRat() {
    const [a, b] = ZI.RATSFRAGE_K1.optionen.map((id) => ZI.GEBAEUDE.find((g) => g.id === id));
    const stimmen = { [a.id]: 0, [b.id]: 0 };
    let sek = 5 * 60; let uhrTimer = null;
    const uhr = h('div', { class: 'uhr' }, '5:00');
    const uhrKnopf = h('button', { class: 'knopf holz klein' }, 'Redezeit starten');
    const formatiere = () => { uhr.textContent = Math.floor(sek / 60) + ':' + String(sek % 60).padStart(2, '0'); };
    uhrKnopf.addEventListener('click', () => {
      if (uhrTimer) { clearInterval(uhrTimer); uhrTimer = null; uhrKnopf.textContent = 'Weiter'; return; }
      uhrKnopf.textContent = 'Pause';
      uhrTimer = setInterval(() => { sek = Math.max(0, sek - 1); formatiere(); if (!sek) { clearInterval(uhrTimer); uhrTimer = null; ZI.ton.fanfare(); uhrKnopf.textContent = 'Zeit ist um'; } }, 1000);
    });

    function optionKarte(g) {
      const zahl = h('span', null, '0');
      const aendern = (d) => { stimmen[g.id] = Math.max(0, stimmen[g.id] + d); zahl.textContent = String(stimmen[g.id]); ZI.ton.plopp(); };
      return h('div', { class: 'rat-option pergament auf-pergament' },
        h('div', { class: 'bild' }, bild(g.id, g.name)),
        h('h3', null, g.name),
        h('div', { class: 'stimmen' },
          h('button', { class: 'rund', 'aria-label': 'Stimme weniger für ' + g.name, onclick: () => aendern(-1) }, '−'),
          zahl,
          h('button', { class: 'rund gold', 'aria-label': 'Stimme mehr für ' + g.name, onclick: () => aendern(1) }, '+')),
        h('button', { class: 'knopf', onclick: () => entscheiden(g) }, 'Der Rat wählt: ' + g.name));
    }

    const rat = h('div', { class: 'rat' },
      ZI.hintergrund('zwergenrat-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.35)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Insel', onclick: () => { clearInterval(uhrTimer); rat.remove(); } }, icon.zurueck()),
        h('div', { class: 'titel' }, 'Der Zwergenrat tagt'),
        h('div', { class: 'spacer' }), uhr, uhrKnopf),
      h('div', { class: 'rat-inhalt' },
        h('div', { class: 'rat-frage pergament' }, ZI.RATSFRAGE_K1.frage),
        optionKarte(a), optionKarte(b),
        h('div', { class: 'rat-regeln pergament auf-pergament' },
          h('h3', null, 'Ratsregeln'),
          h('ul', null, ZI.RATSREGELN.map((r) => h('li', null, r))),
          h('h3', null, 'So kannst du anfangen'),
          h('ul', null, ZI.SATZANFAENGE.map((r) => h('li', null, r))),
          insel.rat ? h('p', { style: { margin: 0 } }, h('b', null, 'Bisherige Entscheidung: '), ZI.GEBAEUDE.find((g) => g.id === insel.rat).name) : null)));
    document.body.appendChild(rat);

    function entscheiden(g) {
      insel.rat = g.id; sichern();
      clearInterval(uhrTimer);
      rat.remove();
      ZI.ton.fanfare();
      ZI.meldung('Der Zwergenrat hat entschieden: Zuerst wird ' + (g.id === 'werkstatt' ? 'die Werkstatt' : 'die Hügelhütte') + ' gebaut.', 4000);
      allesZeigen(false);
    }
  }

  /* ---------- Kapitel geschafft ---------- */
  function feiern() {
    insel.gefeiert = true; sichern();
    ZI.ton.fanfare();
    const f = ZI.fenster([
      h('div', { style: { width: '100%', borderRadius: '14px', overflow: 'hidden' } }, bild('fest-szene', 'Fest im Zwergendorf')),
      h('h2', null, 'Kapitel 1 geschafft!'),
      h('p', { style: { margin: 0, fontSize: '22px' } }, 'Euer Dorf steht! Mit diesem Runenwort öffnet ihr in der Schmiede das nächste Kapitel:'),
      h('div', { class: 'runenwort' }, ZI.KAPITEL[1].runenwort),
      h('button', { class: 'knopf', onclick: () => f.schliessen() }, 'Hurra!'),
    ]);
    f.el.classList.add('breit');
  }

  /* ---------- Einstellungen ---------- */
  function oeffneEinstellungen() {
    const zahl = h('input', { type: 'number', min: '1', max: '40', value: String(insel.klassengroesse), 'aria-label': 'Anzahl Kinder' });
    const tabelle = h('table', { class: 'lieferliste' },
      h('thead', null, h('tr', null, h('th', null, 'Zwerg'), h('th', null, 'Hauptstollen'), h('th', null, 'Edelsteine'), h('th', null, 'Zuletzt'), h('th', null, ''))),
      h('tbody', null, Object.entries(insel.zwerge).sort((x, y) => y[1].zeit - x[1].zeit).map(([id, e]) => {
        const s = ZI.Stand.ausCode(e.code); if (!s) return null;
        const z = ZI.ZWERGE.find((d) => d.nr === s.zwerg);
        return h('tr', null,
          h('td', null, bild(z.datei, z.name), ' ', z.name),
          h('td', null, s.coreCount(KAP) + ' / 3'),
          h('td', null, String(s.gems())),
          h('td', null, new Date(e.zeit).toLocaleDateString('de-DE') + ' ' + new Date(e.zeit).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })),
          h('td', null, h('button', { class: 'knopf holz klein', onclick: () => { delete insel.zwerge[id]; sichern(); f.schliessen(); allesZeigen(false); oeffneEinstellungen(); } }, 'Entfernen')));
      })));
    const datei = h('input', { type: 'file', accept: 'application/json,.json', style: { display: 'none' } });
    datei.addEventListener('change', () => {
      const d = datei.files && datei.files[0]; if (!d) return;
      d.text().then((t) => {
        try { const neu = JSON.parse(t); if (!neu || typeof neu.zwerge !== 'object') throw new Error(); insel = Object.assign(leer(), neu); sichern(); f.schliessen(); allesZeigen(false); ZI.meldung('Insel geladen.'); }
        catch (e) { ZI.meldung('Diese Datei ist keine Insel-Sicherung.'); }
      });
    });
    const f = ZI.fenster([
      h('h2', null, 'Einstellungen'),
      h('div', { class: 'einstellung' }, 'Kinder in der Klasse:', zahl,
        h('button', { class: 'knopf klein', onclick: () => { const n = parseInt(zahl.value, 10); if (n > 0 && n <= 40) { insel.klassengroesse = n; sichern(); allesZeigen(true); ZI.meldung('Gespeichert.'); } } }, 'Übernehmen')),
      h('p', { style: { margin: 0, fontSize: '16px', color: 'var(--tinte-hell)' } }, 'Das Dorf ist fertig, wenn jedes Kind den Hauptstollen geschafft hat (3 Material pro Kind). Fehlen Kinder länger, die Zahl einfach verkleinern.'),
      h('h3', { style: { fontSize: '24px', alignSelf: 'flex-start' } }, 'Lieferungen (' + Object.keys(insel.zwerge).length + ')'),
      Object.keys(insel.zwerge).length ? tabelle : h('p', { style: { margin: 0 } }, 'Noch keine Lieferungen.'),
      h('div', { class: 'knopf-reihe' },
        h('button', { class: 'knopf holz klein', onclick: sichernAlsDatei }, 'Insel sichern (Datei)'),
        h('button', { class: 'knopf holz klein', onclick: () => datei.click() }, 'Insel laden'),
        h('button', { class: 'knopf holz klein', onclick: () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); } }, 'Vollbild'),
        h('button', { class: 'knopf holz klein', onclick: zuruecksetzen }, 'Insel zurücksetzen')),
      datei,
      h('button', { class: 'knopf', onclick: () => f.schliessen() }, 'Schließen'),
    ], { schliessbar: true });
    f.el.classList.add('breit');

    function zuruecksetzen() {
      const g = ZI.fenster([
        h('h2', null, 'Wirklich alles zurücksetzen?'),
        h('p', { style: { margin: 0 } }, 'Alle Lieferungen und Gebäude werden gelöscht. Sichern Sie die Insel vorher als Datei, wenn Sie sie behalten möchten.'),
        h('div', { class: 'knopf-reihe' },
          h('button', { class: 'knopf', onclick: () => g.schliessen() }, 'Abbrechen'),
          h('button', { class: 'knopf holz', onclick: () => { insel = leer(); sichern(); g.schliessen(); f.schliessen(); allesZeigen(false); } }, 'Ja, zurücksetzen')),
      ]);
    }
  }

  function sichernAlsDatei() {
    const blob = new Blob([JSON.stringify(insel, null, 1)], { type: 'application/json' });
    const a = h('a', { href: URL.createObjectURL(blob), download: 'zwergeninsel-' + new Date().toISOString().slice(0, 10) + '.json' });
    document.body.appendChild(a); a.click(); a.remove();
  }

  allesZeigen(false);
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
