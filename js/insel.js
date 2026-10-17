/* Zwergeninsel – Insel-Ansicht für das Board (Lehrer-iPad oder PC am Smartboard) */
(function () {
  const ZI = window.ZI;
  const { h, bild, icon, speicher } = ZI;
  const KEY = 'zi-insel';

  const leer = () => ({ klassengroesse: 27, kapitel: 0, zwerge: {}, gebaut: [], schmuck: 0, rat: {}, gefeiert: [], geschenke: 0, auftrag: null, sonder: 0, nacht: false });
  function aufbereiten(roh) {
    const i = Object.assign(leer(), roh || {});
    if (typeof i.rat === 'string') i.rat = { 0: i.rat };          // ältere Speicherstände
    if (!i.rat || typeof i.rat !== 'object') i.rat = {};
    if (i.gefeiert === true) i.gefeiert = [0];
    if (!Array.isArray(i.gefeiert)) i.gefeiert = [];
    return i;
  }
  let insel = aufbereiten(speicher.lesen(KEY, {}));
  const sichern = () => speicher.schreiben(KEY, insel);
  const kap = () => Math.min(insel.kapitel || 0, ZI.BAUPLAN.length - 1);

  /* ---------- Berechnungen ---------- */
  function staende() {
    return Object.values(insel.zwerge).map((e) => ZI.Stand.ausCode(e.code)).filter(Boolean);
  }
  function material(k = kap()) { return staende().reduce((a, s) => a + s.coreCount(k), 0); }
  function ziel() { return Math.max(1, insel.klassengroesse * 3); }
  function edelsteine() { return staende().reduce((a, s) => a + s.gems(), 0); }

  /* Bauplan auflösen: Ratsentscheidung bestimmt die Reihenfolge */
  function bauplan(k = kap()) {
    let ratNr = 0;
    return ZI.BAUPLAN[k].map((schritt) => {
      if (!schritt.rat) return { anteil: schritt.anteil, gebaeude: schritt.gebaeude };
      const [a, b] = schritt.rat;
      const erst = insel.rat[k] || a;
      const zweit = erst === a ? b : a;
      return { anteil: schritt.anteil, gebaeude: ratNr++ === 0 ? erst : zweit };
    });
  }
  function sollGebaut() {
    const liste = [];
    for (let k = 0; k < kap(); k++) liste.push(...bauplan(k).map((s) => s.gebaeude)); // frühere Kapitel: alles steht
    const m = material();
    if (m > 0) liste.push(...bauplan().filter((s) => m / ziel() >= s.anteil - 1e-9).map((s) => s.gebaeude));
    return liste;
  }
  function kapitelFertig() { return material() / ziel() >= 1 - 1e-9; }
  function naechstesKapitelBereit() { const n = kap() + 1; return !!ZI.BAUPLAN[n] && ZI.KAPITEL[n] && ZI.KAPITEL[n].fertig; }
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
  grundBild.addEventListener('load', () => grund.classList.add('mit-bild'), { once: true });
  grund.appendChild(grundBild);
  buehne.appendChild(grund);
  const bauEls = {};
  /* Wo Rauch aufsteigt (Position im Gebäudebild in Prozent) */
  const RAUCH = { lagerfeuer: [50, 30], huette1: [74, 8], huette2: [62, 10], huette3: [55, 12], werkstatt: [70, 6], festhalle: [50, 6] };
  ZI.GEBAEUDE.slice().sort((a, b) => a.y - b.y).forEach((g) => {
    const el = h('div', { class: 'bau', style: { left: g.x + '%', top: g.y + '%', width: g.w + '%' } },
      h('div', { class: 'ruine' }, ZI.bildOder(g.id + '-ruine', g.name + ' (Ruine)', null)),
      h('div', { class: 'fertig', style: { display: 'none' } }, bild(g.id, g.name)),
      RAUCH[g.id] ? h('div', { class: 'rauch', style: { left: RAUCH[g.id][0] + '%', top: RAUCH[g.id][1] + '%' }, 'aria-hidden': 'true' }, h('span'), h('span'), h('span')) : null);
    bauEls[g.id] = el;
    buehne.appendChild(el);
  });
  const zwergSchicht = h('div');
  const schmuckSchicht = h('div');
  const sonderSchicht = h('div');
  /* Lebendige Insel: Wolken, Möwen und Nacht */
  const wolken = h('div', { class: 'wolken', 'aria-hidden': 'true' }, [1, 2, 3].map((n) => {
    const sp = h('span');
    const img = h('img', { src: ZI.BILD('wolke-' + n), alt: '' });
    img.addEventListener('load', () => sp.classList.add('mit-bild'), { once: true });
    img.addEventListener('error', () => img.remove(), { once: true });
    sp.appendChild(img);
    return sp;
  }));
  const moewen = h('div', { class: 'moewen', 'aria-hidden': 'true' }, moewe(), moewe(), moewe());
  /* Tiere auf der Insel – erscheinen erst, wenn ihre Bilder da sind */
  const TIERE = [
    { datei: 'krabbe', klasse: 'tier-krabbe', x: 30, y: 89, w: 3 },
    { datei: 'schildkroete', klasse: 'tier-schildkroete', x: 70, y: 90, w: 4 },
    { datei: 'huhn', klasse: 'tier-huhn', x: 44, y: 58, w: 2.4 },
    { datei: 'huhn', klasse: 'tier-huhn zwei', x: 47, y: 60, w: 2.2 },
    { datei: 'hase', klasse: 'tier-hase', x: 63, y: 70, w: 2.6 },
    { datei: 'schmetterling', klasse: 'tier-schmetterling', x: 34, y: 56, w: 2 },
    { datei: 'delfin', klasse: 'tier-delfin', x: 12, y: 82, w: 6 },
    { datei: 'delfin', klasse: 'tier-delfin zwei', x: 92, y: 60, w: 5 },
  ];
  const tiere = h('div', { class: 'tiere', 'aria-hidden': 'true' }, TIERE.map((t) =>
    h('div', { class: 'tier ' + t.klasse, style: { left: t.x + '%', top: t.y + '%', width: t.w + '%' } }, ZI.bildOder(t.datei, '', null))));
  const nachtSchicht = h('div', { class: 'nacht-schicht', 'aria-hidden': 'true' });
  buehne.append(schmuckSchicht, sonderSchicht, tiere, zwergSchicht, moewen, wolken, nachtSchicht);
  function moeweSvg(geschenk) {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 60 40'); s.setAttribute('class', 'moewe-svg');
    s.innerHTML = '<path d="M2 18 Q15 4 30 18 Q45 4 58 18" fill="none" stroke="#fffaf0" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M2 18 Q15 4 30 18 Q45 4 58 18" fill="none" stroke="#3a2617" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>' +
      (geschenk ? '<line x1="30" y1="18" x2="30" y2="26" stroke="#3a2617" stroke-width="1.5"/><rect x="23" y="26" width="14" height="12" rx="2" fill="#c2533a" stroke="#3a2617" stroke-width="1.5"/><rect x="28.5" y="26" width="3" height="12" fill="#ffd56e"/>' : '');
    return s;
  }
  /* Möwe aus zwei Bildern (Flügel oben/unten); fehlen sie, wird sie gezeichnet */
  function moewe(geschenk) {
    const box = h('div', { class: 'moewe' + (geschenk ? ' mit-geschenk' : '') });
    const ersatz = () => { if (!box.dataset.ersatz) { box.dataset.ersatz = '1'; ZI.setze(box, moeweSvg(geschenk)); } };
    const a = h('img', { src: ZI.BILD(geschenk ? 'moewe-geschenk' : 'moewe-oben'), alt: '', class: 'fluegel-a' });
    a.addEventListener('error', ersatz, { once: true });
    box.appendChild(a);
    if (!geschenk) {
      const b = h('img', { src: ZI.BILD('moewe-unten'), alt: '', class: 'fluegel-b' });
      b.addEventListener('error', () => { b.remove(); box.classList.add('ein-bild'); }, { once: true });
      box.appendChild(b);
    }
    return box;
  }
  function moeweMitGeschenk(behaelter) {
    const m = h('div', { class: 'moewe-flug', 'aria-hidden': 'true' }, moewe(true));
    (behaelter || buehne).appendChild(m);
    setTimeout(() => { ZI.ton.plopp(); }, 2600);
    setTimeout(() => m.remove(), 4200);
  }

  const tafel = h('div', { class: 'tafel pergament auf-pergament' });
  const unterTitel = h('div', { class: 'unter' });
  const titel = h('div', { class: 'insel-titel' }, h('h1', null, 'Die Zwergeninsel'), unterTitel);
  const knoepfe = h('div', { class: 'insel-knoepfe' },
    h('button', { class: 'knopf', onclick: oeffneLieferungen }, icon.tastatur(), 'Lieferungen'),
    h('button', { class: 'knopf holz', onclick: oeffneRat }, 'Zwergenrat'),
    h('button', { class: 'knopf holz', onclick: oeffneRaetsel }, 'Inselrätsel'),
    h('button', { class: 'knopf holz', onclick: oeffneAuftrag }, 'Auftrag'),
    h('button', { class: 'rund', 'aria-label': 'Tag oder Nacht', onclick: () => { insel.nacht = !insel.nacht; sichern(); zeigeNacht(); } }, icon.mond()),
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
      el.classList.toggle('gesperrt', g.kapitel > kap() + 1);
      el.classList.toggle('mit-rauch', ist);
    });
    if (!animiert) { insel.gebaut = soll.slice(); sichern(); return; }
    neu.forEach((id, i) => setTimeout(() => baue(id), 900 * i + 300));
    if (kapitelFertig() && !insel.gefeiert.includes(kap())) {
      insel.gefeiert.push(kap());
      setTimeout(feiern, 900 * neu.length + 2200);
    }
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
      el.classList.add('mit-rauch');
      ZI.ton.fanfare();
      ZI.meldung(g.name + ' ist fertig gebaut!', 3200);
    }, 450);
  }

  function zeigeSchmuck(animiert) {
    const anzahl = Math.min(ZI.SCHMUCK.length, Math.floor((edelsteine() + (insel.geschenke || 0) * 5) / ZI.SCHMUCK_PRO));
    ZI.setze(sonderSchicht, ...ZI.SONDERSCHMUCK.slice(0, insel.sonder || 0).map((s) =>
      h('div', { class: 'schmuck sonder' + (/laterne/.test(s.id) ? ' lampe' : ''), style: { left: s.x + '%', top: s.y + '%', width: s.w + '%', animation: 'none' } }, ZI.bildOder([s.id, s.alt], s.name, null))));
    ZI.setze(schmuckSchicht, ...ZI.SCHMUCK.slice(0, anzahl).map((s, i) => {
      const el = h('div', { class: 'schmuck' + (/laterne/.test(s.id) ? ' lampe' : ''), style: { left: s.x + '%', top: s.y + '%', width: s.w + '%' } }, ZI.bildOder(s.id, s.name, null));
      if (!animiert || i < insel.schmuck) el.style.animation = 'none';
      return el;
    }));
    if (animiert && anzahl > insel.schmuck) ZI.meldung('Neuer Schmuck fürs Dorf: ' + ZI.SCHMUCK[anzahl - 1].name + '!', 3000);
    insel.schmuck = anzahl; sichern();
  }

  /* Gelieferte Zwerge stehen um das Lagerfeuer */
  const PLAETZE = [[34, 55], [44, 55], [37, 59], [42, 59], [31, 52], [47, 52],
    [64, 83], [68, 81], [77, 82], [27, 79], [31, 81], [19, 68], [29, 67], [36, 73], [45, 72],
    [57, 66], [67, 65], [44, 47], [55, 47], [16, 48], [26, 48], [25, 31], [64, 40], [74, 40],
    [79, 52], [89, 54], [43, 24], [52, 24], [72, 19], [85, 69], [60, 85], [22, 84]];
  function platz(i) {
    if (i < PLAETZE.length) return { x: PLAETZE[i][0], y: PLAETZE[i][1] };
    i -= PLAETZE.length;
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

  function tafelZu() { return !!ZI.speicher.lesen('zi-tafel-zu', true); }
  function zeigeTafel() {
    const k = kap();
    const m = material(); const zl = ziel();
    const n = naechstes();
    const gems = edelsteine();
    const anteil = Math.min(100, Math.round((m / zl) * 100));
    const nk = ZI.KAPITEL[k + 1];
    unterTitel.textContent = 'Kapitel ' + ZI.KAPITEL[k].nr + ' · ' + ZI.KAPITEL[k].titel;
    let status;
    if (n) status = h('div', { class: 'klein' }, 'Als Nächstes: ', h('b', null, n.gebaeude.name), ' – noch ' + n.bedarf + ' Lieferung' + (n.bedarf === 1 ? '' : 'en') + '.');
    else if (nk) status = h('div', { class: 'klein' }, h('b', null, 'Kapitel ' + ZI.KAPITEL[k].nr + ' geschafft! '), 'Runenwort für Kapitel ' + nk.nr + ': ', h('b', null, nk.runenwort),
      naechstesKapitelBereit() ? h('div', { style: { marginTop: '8px' } }, h('button', { class: 'knopf klein', onclick: kapitelWeiter }, 'Kapitel ' + nk.nr + ' beginnen')) : null);
    else status = h('div', { class: 'klein' }, h('b', null, 'Das ganze Dorf steht!'));
    const zu = tafelZu();
    tafel.classList.toggle('zu', zu);
    ZI.setze(tafel,
      h('div', { class: 'tafel-kopf' },
        h('h2', { style: { fontSize: '26px' } }, 'Baumaterial'),
        h('button', { class: 'tafel-klapp', 'aria-label': zu ? 'Tafel aufklappen' : 'Tafel einklappen', 'aria-expanded': String(!zu),
          onclick: () => { ZI.speicher.schreiben('zi-tafel-zu', !zu); zeigeTafel(); } }, zu ? '▾' : '▴')),
      h('div', null, h('span', { class: 'zahl' }, String(m)), h('span', { style: { fontSize: '22px' } }, ' von ' + zl)),
      h('div', { class: 'balken', role: 'progressbar', 'aria-valuenow': String(anteil), 'aria-valuemin': '0', 'aria-valuemax': '100' }, h('div', { style: { width: anteil + '%' } })),
      status,
      zu ? null : auftragAnzeige(),
      zu ? null : h('div', { class: 'zeile' }, bild('edelstein', 'Edelsteine'), gems + ' Edelsteine · ' + insel.schmuck + ' Schmuckstücke' + (insel.geschenke ? ' · ' + insel.geschenke + ' Möwengeschenke' : '')),
      zu ? null : h('div', { class: 'zeile' }, bild('zwerg-01-brumm', 'Zwerge'), Object.keys(insel.zwerge).length + ' von ' + insel.klassengroesse + ' Zwergen haben geliefert'),
      m === 0 && !zu ? h('div', { class: 'klein' }, 'Jede geschaffte Station im Hauptstollen ' + (k > 0 ? 'von Kapitel ' + ZI.KAPITEL[k].nr + ' ' : '') + 'bringt 1 Material. Am Ende der Stunde tippt ihr die Lieferscheine ein.') : null);
  }

  function kapitelWeiter() {
    if (!naechstesKapitelBereit()) return;
    insel.kapitel = kap() + 1; sichern();
    ZI.ton.fanfare();
    ZI.meldung('Kapitel ' + ZI.KAPITEL[kap()].nr + ' beginnt: ' + ZI.KAPITEL[kap()].titel + '!', 3500);
    allesZeigen(false);
  }

  function allesZeigen(animiert, neueIds) {
    zeigeGebaeude(animiert);
    zeigeSchmuck(animiert);
    zeigeZwerge(neueIds);
    pruefeAuftrag(animiert);
    zeigeTafel();
    zeigeNacht();
  }
  function zeigeNacht() { screen.classList.toggle('nacht', !!insel.nacht); }

  /* ---------- Auftrag des Tages ---------- */
  const heute = () => new Date().toISOString().slice(0, 10);
  function auftragWert(a) {
    const def = ZI.AUFTRAEGE.find((d) => d.id === a.typ);
    if (!def) return 0;
    if (def.liefernZaehlen) return Object.values(insel.zwerge).filter((e) => e.zeit >= a.start).length;
    return def.wert(staende()) - a.basis;
  }
  function auftragAnzeige() {
    const a = insel.auftrag;
    if (!a || a.tag !== heute()) return null;
    const def = ZI.AUFTRAEGE.find((d) => d.id === a.typ);
    const w = Math.min(a.ziel, Math.max(0, auftragWert(a)));
    return h('div', { class: 'auftrag-box' + (a.erledigt ? ' erledigt' : '') },
      h('div', { class: 'auftrag-titel' }, ZI.bildOder('auftrag-rolle', '', null, 'auftrag-bild'), a.erledigt ? 'Auftrag erfüllt!' : 'Auftrag des Tages'),
      h('div', { class: 'klein' }, def.text(a.ziel)),
      h('div', { class: 'balken' }, h('div', { style: { width: (w / a.ziel) * 100 + '%' } })),
      h('div', { class: 'klein' }, w + ' von ' + a.ziel + ' ' + def.einheit));
  }
  function pruefeAuftrag(animiert) {
    const a = insel.auftrag;
    if (!a || a.erledigt || a.tag !== heute()) return;
    if (auftragWert(a) >= a.ziel) {
      a.erledigt = true;
      insel.sonder = Math.min(ZI.SONDERSCHMUCK.length, (insel.sonder || 0) + 1);
      sichern();
      zeigeSchmuck(false);
      if (animiert) setTimeout(() => {
        ZI.feuerwerk(7000); ZI.ton.fanfare();
        const sonder = ZI.SONDERSCHMUCK[insel.sonder - 1];
        ZI.meldung('Auftrag erfüllt! Als Belohnung steht jetzt ' + (sonder ? sonder.name : 'etwas Besonderes') + ' im Dorf.', 5000);
      }, 1500);
    }
  }
  function oeffneAuftrag() {
    const n = insel.klassengroesse;
    const a = insel.auftrag;
    const laeuft = a && a.tag === heute();
    const vorschlaege = ZI.mischen(ZI.AUFTRAEGE).slice(0, 3);
    const f = ZI.fenster([
      h('h2', null, 'Auftrag des Tages'),
      laeuft ? h('div', { style: { alignSelf: 'stretch' } }, auftragAnzeige()) : null,
      h('p', { style: { margin: 0 } }, laeuft ? 'Ihr könnt den Auftrag auch tauschen:' : 'Wählt ein gemeinsames Ziel für heute. Schafft es die Klasse, gibt es ein Feuerwerk und ein besonderes Stück fürs Dorf.'),
      h('div', { class: 'auftrag-wahl' }, vorschlaege.map((d) => {
        const ziel = d.ziel(n);
        return h('button', { class: 'option', onclick: () => {
          insel.auftrag = { typ: d.id, ziel, tag: heute(), start: Date.now(), basis: d.wert ? d.wert(staende()) : 0, erledigt: false };
          sichern(); f.schliessen(); ZI.ton.fanfare(); allesZeigen(false); ZI.meldung('Neuer Auftrag: ' + d.text(ziel), 4000);
        } }, d.text(ziel));
      })),
      h('button', { class: 'knopf holz', onclick: () => f.schliessen() }, 'Schließen'),
    ], { schliessbar: true });
    f.el.classList.add('breit');
  }

  /* ---------- Inselrätsel zum Stundenbeginn ---------- */
  function oeffneRaetsel() {
    const fragen = ZI.raetselFragen(kap(), 5);
    let nr = 0; let treffer = 0;
    const buchst = ['A', 'B', 'C', 'D'];
    const inhalt = h('div', { class: 'raetsel-inhalt' });
    const zaehlerEl = h('div', { class: 'uhr' });
    const ui = h('div', { class: 'rat raetsel' },
      ZI.hintergrund('titel-hintergrund', 'hg-ersatz-titel', 'rgba(20,12,8,0.45)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Insel', onclick: () => ui.remove() }, icon.zurueck()),
        h('div', { class: 'titel' }, 'Inselrätsel'),
        h('div', { class: 'spacer' }), zaehlerEl),
      inhalt);
    document.body.appendChild(ui);

    function frage() {
      const f = fragen[nr];
      zaehlerEl.textContent = 'Frage ' + (nr + 1) + ' von ' + fragen.length;
      const opts = f.optionen.map((o, i) => h('div', { class: 'raetsel-option' }, h('span', { class: 'buchstabe' }, buchst[i]), h('span', null, o.text)));
      const loesen = h('button', { class: 'knopf' }, 'Auflösen');
      const unten = h('div', { class: 'knopf-reihe' }, loesen);
      loesen.addEventListener('click', () => {
        f.optionen.forEach((o, i) => opts[i].classList.add(o.ok ? 'richtig' : 'weg'));
        ZI.ton.richtig();
        ZI.setze(unten,
          h('div', { class: 'rueckmeldung tipp', style: { flexBasis: '100%' } }, f.info || ''),
          h('button', { class: 'knopf moos', onclick: () => { treffer++; insel.geschenke = (insel.geschenke || 0) + 1; sichern(); moewe(); weiter(); } }, 'Die meisten hatten recht'),
          h('button', { class: 'knopf holz', onclick: weiter }, 'Noch nicht ganz'));
      });
      ZI.setze(inhalt,
        h('div', { class: 'raetsel-karte pergament auf-pergament' },
          h('div', { class: 'frage', style: { fontSize: '26px', color: 'var(--tinte-hell)' } },
            h('button', { class: 'rund', 'aria-label': 'Vorlesen', onclick: () => ZI.vorlesen(f.frage + ' ' + (f.kopf || '') + ' ' + f.optionen.map((o, i) => buchst[i] + ': ' + o.text).join('. ')) }, icon.vorlesen()),
            h('span', null, f.frage)),
          f.kopf ? h('div', { class: 'meinung', style: { fontSize: 'clamp(24px, 2.4vw, 38px)', whiteSpace: 'pre-line' } }, f.kopf) : null,
          h('div', { class: 'raetsel-optionen' }, opts),
          h('p', { class: 'klein', style: { margin: 0, fontSize: '18px', color: 'var(--tinte-hell)' } }, 'Zeigt mit den Fingern: 1 Finger für A, 2 für B, 3 für C.'),
          unten));
    }
    function moewe() { moeweMitGeschenk(ui); ZI.meldung('Eine Möwe bringt ein Geschenk zur Insel!', 2200); }
    function weiter() {
      nr++;
      if (nr < fragen.length) { setTimeout(frage, 300); return; }
      ZI.ton.fanfare(); if (treffer >= 4) ZI.konfetti(120);
      ZI.setze(inhalt, h('div', { class: 'raetsel-karte pergament auf-pergament', style: { alignItems: 'center', textAlign: 'center' } },
        h('h2', { style: { fontSize: '44px' } }, treffer + ' von ' + fragen.length + ' richtig!'),
        h('p', { style: { margin: 0, fontSize: '24px' } }, treffer ? 'Die Möwen haben ' + treffer + ' Geschenk' + (treffer === 1 ? '' : 'e') + ' zur Insel gebracht. Jedes Geschenk hilft beim Schmücken des Dorfs.' : 'Nächstes Mal bringen die Möwen bestimmt Geschenke!'),
        h('button', { class: 'knopf', onclick: () => { ui.remove(); allesZeigen(true); } }, 'Zur Insel')));
    }
    frage();
  }

  /* ---------- Lieferung annehmen ---------- */
  /* Lieferschein (4 Zeichen) in den Stand der Karte einrechnen */
  function annehmenSchein(info, erzwingen) {
    const key = 'karte-' + info.karte;
    const alt = insel.zwerge[key];
    const altStand = alt ? ZI.Stand.ausCode(alt.code) : null;
    if (altStand && altStand.zwerg !== info.zwerg && !erzwingen) return { konflikt: true, altZwerg: altStand.zwerg, info };
    const s = altStand || new ZI.Stand({ id: info.karte });
    s.id = info.karte; s.zwerg = info.zwerg;
    const k = info.kapitel;
    s.kern[k] |= info.kern; s.tief[k] |= info.tief; s.bonus[k] = Math.max(s.bonus[k], info.bonus);
    s.offen = Math.max(s.offen, k);
    insel.zwerge[key] = { code: s.code(), erst: alt ? alt.erst : Date.now(), zeit: Date.now(), tag: heute(), karte: info.karte };
    sichern();
    return { id: key, stand: s, neu: !alt, vorher: alt ? Object.assign({}, alt) : null, info };
  }
  /* ganzer Zwergenpass (12 Zeichen) – falls jemand den langen Code nennt */
  function annehmenPass(text) {
    const s = ZI.Stand.ausCode(text);
    if (!s) return null;
    if (!s.karte) {
      const id = String(s.id); const alt = insel.zwerge[id];
      insel.zwerge[id] = { code: s.code(), erst: alt ? alt.erst : Date.now(), zeit: Date.now(), tag: heute() };
      sichern();
      return { id, stand: s, neu: !alt, vorher: alt ? Object.assign({}, alt) : null };
    }
    let erg = null;
    for (let k = 0; k <= s.offen; k++) {
      erg = annehmenSchein({ karte: s.karte, zwerg: s.zwerg, kapitel: k, kern: s.kern[k], tief: s.tief[k], bonus: s.bonus[k] }, true) || erg;
    }
    return erg;
  }
  function kartenNr(id, e) { return e && e.karte ? e.karte : null; }

  /* ---------- Lieferungen eintippen (Tastatur oder Bildschirmtastatur) ---------- */
  const ZEICHEN = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  function oeffneLieferungen() {
    const neueIds = [];
    let puffer = '';
    let letzte = null; // für „Rückgängig“
    const kaesten = [0, 1, 2, 3].map(() => h('div', { class: 'schein-kasten' }));
    const anzeige = h('div', { class: 'schein-eingabe', 'aria-live': 'polite' }, ...kaesten);
    const rueck = h('div', { class: 'liefer-rueck' }, h('div', { class: 'klein' }, 'Tippt die 4 Zeichen vom Lieferschein ein. Nach dem 4. Zeichen wird sofort geliefert.'));
    const raster = h('div', { class: 'liefer-raster' });
    const zaehler = h('div', { class: 'liefer-zaehler' });
    const tasten = h('div', { class: 'schein-tasten' },
      ...ZEICHEN.split('').map((c) => h('button', { class: 'schein-taste', onclick: () => tippe(c) }, c)),
      h('button', { class: 'schein-taste breit', 'aria-label': 'Löschen', onclick: loesche }, '⌫'));

    function zeigePuffer() { kaesten.forEach((k, i) => { k.textContent = puffer[i] || ''; k.classList.toggle('voll', !!puffer[i]); }); }
    function tippe(c) {
      c = String(c).toUpperCase();
      if (!ZEICHEN.includes(c)) { if (/^[01IO]$/.test(c)) ZI.meldung('Im Lieferschein gibt es keine 0, 1, I oder O.', 2000); return; }
      if (puffer.length >= 4) puffer = ''; // offene Rückfrage: neuer Code beginnt
      puffer += c; zeigePuffer(); ZI.ton.klick && ZI.ton.klick();
      if (puffer.length === 4) setTimeout(pruefe, 120);
    }
    function loesche() { puffer = puffer.slice(0, -1); zeigePuffer(); }

    function pruefe() {
      const info = ZI.Stand.ausLieferCode(puffer);
      if (!info) {
        ZI.ton.falsch();
        anzeige.classList.remove('wackeln'); void anzeige.offsetWidth; anzeige.classList.add('wackeln');
        ZI.setze(rueck, h('div', { class: 'rueckmeldung schlecht' }, '„' + puffer + '“ ist kein gültiger Lieferschein. Bitte noch einmal vorlesen lassen.'));
        puffer = ''; setTimeout(zeigePuffer, 500);
        return;
      }
      const erg = annehmenSchein(info, false);
      if (erg.konflikt) { frageKonflikt(erg); return; }
      gelungen(erg);
    }
    function frageKonflikt(erg) {
      const alt = ZI.ZWERGE.find((d) => d.nr === erg.altZwerg); const neu = ZI.ZWERGE.find((d) => d.nr === erg.info.zwerg);
      ZI.ton.falsch();
      ZI.setze(rueck, h('div', { class: 'rueckmeldung tipp' },
        h('div', null, h('b', null, 'Karte ' + erg.info.karte + ':'), ' Bisher war das ' + alt.name + ', jetzt kommt ' + neu.name + '. Hat das Kind den Zwerg gewechselt?'),
        h('div', { class: 'knopf-reihe', style: { justifyContent: 'flex-start', marginTop: '8px' } },
          h('button', { class: 'knopf klein', onclick: () => gelungen(annehmenSchein(erg.info, true)) }, 'Ja, übernehmen'),
          h('button', { class: 'knopf holz klein', onclick: () => { puffer = ''; zeigePuffer(); ZI.setze(rueck, h('div', { class: 'klein' }, 'Abgebrochen. Bitte die Kartennummer prüfen.')); } }, 'Nein, abbrechen'))));
    }
    function gelungen(erg) {
      ZI.ton.richtig();
      if (!neueIds.includes(erg.id)) neueIds.push(erg.id);
      letzte = erg;
      const z = ZI.ZWERGE.find((d) => d.nr === erg.stand.zwerg);
      const i = erg.info;
      const teile = [i.kapitel !== kap() ? 'Kapitel ' + (i.kapitel + 1) : null, ZI.Stand.bits(i.kern) + ' Material', i.tief ? ZI.Stand.bits(i.tief) + ' Tiefe Stollen' : null].filter(Boolean);
      ZI.setze(rueck, h('div', { class: 'liefer-ok' },
        h('div', { class: 'liefer-ok-bild' }, bild(z.datei, z.name)),
        h('div', null, h('div', { class: 'liefer-ok-titel' }, 'Karte ' + i.karte + ' · ' + z.name), h('div', null, teile.join(' · '))),
        h('button', { class: 'knopf holz klein', onclick: rueckgaengig }, 'Rückgängig')));
      puffer = ''; zeigePuffer(); zeigeRaster();
    }
    function rueckgaengig() {
      if (!letzte) return;
      if (letzte.vorher) insel.zwerge[letzte.id] = letzte.vorher; else delete insel.zwerge[letzte.id];
      const pos = neueIds.indexOf(letzte.id); if (pos >= 0 && !letzte.vorher) neueIds.splice(pos, 1);
      sichern(); letzte = null; zeigeRaster();
      ZI.setze(rueck, h('div', { class: 'klein' }, 'Rückgängig gemacht.'));
    }
    function zeigeRaster() {
      const max = Math.max(insel.klassengroesse, ...Object.values(insel.zwerge).map((e) => e.karte || 0));
      let heuteZahl = 0;
      const zellen = [];
      for (let n = 1; n <= Math.min(32, max); n++) {
        const e = insel.zwerge['karte-' + n];
        const da = e && e.tag === heute();
        if (da) heuteZahl++;
        zellen.push(h('div', { class: 'liefer-zelle' + (da ? ' da' : e ? ' frueher' : ''), title: da ? 'heute geliefert' : e ? 'früher geliefert' : 'noch nie geliefert' }, String(n)));
      }
      ZI.setze(raster, ...zellen);
      zaehler.textContent = heuteZahl + ' von ' + insel.klassengroesse + ' Karten heute geliefert';
    }
    function langerCode() {
      const eingabe = h('input', { class: 'eingabe', maxlength: '14', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', placeholder: 'XXXX-XXXX-XXXX', 'aria-label': 'Zwergenpass-Code' });
      eingabe.addEventListener('input', () => { eingabe.value = ZI.formatiereCode(eingabe.value); });
      const hin = h('div');
      const ok = () => {
        const erg = annehmenPass(eingabe.value);
        if (!erg) { ZI.ton.falsch(); ZI.setze(hin, h('div', { class: 'rueckmeldung schlecht' }, 'Der Code stimmt nicht.')); return; }
        g.schliessen(); if (!erg.info) erg.info = { karte: erg.stand.karte || '–', kapitel: kap(), kern: erg.stand.kern[kap()], tief: erg.stand.tief[kap()] };
        gelungen(erg);
      };
      eingabe.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') ok(); });
      const g = ZI.fenster([h('h2', null, 'Langen Zwergenpass eintippen'), eingabe, hin,
        h('div', { class: 'knopf-reihe' }, h('button', { class: 'knopf holz', onclick: () => g.schliessen() }, 'Abbrechen'), h('button', { class: 'knopf', onclick: ok }, 'Liefern'))]);
      setTimeout(() => eingabe.focus(), 150);
    }
    function taste(e) {
      if (document.querySelectorAll('.fenster').length > 1) return; // anderes Fenster obenauf
      if (e.key === 'Backspace') { e.preventDefault(); loesche(); return; }
      if (e.key === 'Escape') { schliessen(); return; }
      if (e.key.length === 1 && /[0-9a-z]/i.test(e.key)) { e.preventDefault(); tippe(e.key); }
    }
    function schliessen() { document.removeEventListener('keydown', taste); f.schliessen(); allesZeigen(true, neueIds); }

    const f = ZI.fenster([
      h('div', { class: 'liefer-kopf' }, h('h2', { style: { margin: 0 } }, 'Lieferungen'), zaehler),
      h('div', { class: 'liefer-fenster' },
        h('div', { class: 'liefer-links' }, anzeige, rueck, tasten),
        h('div', { class: 'liefer-rechts' },
          h('div', { class: 'klein' }, 'Grün: heute geliefert'),
          raster,
          h('button', { class: 'knopf-link', onclick: langerCode }, 'Langen Zwergenpass-Code eintippen'))),
      h('div', { class: 'knopf-reihe' }, h('button', { class: 'knopf', onclick: schliessen }, 'Fertig – Dorf bauen!')),
    ]);
    f.el.classList.add('breit', 'liefer-dialog');
    document.addEventListener('keydown', taste);
    zeigePuffer(); zeigeRaster();
  }

  /* ---------- Zwergenrat ---------- */
  function oeffneRat() {
    const RF = ZI.RATSFRAGE[kap()];
    const [a, b] = RF.optionen.map((id) => ZI.GEBAEUDE.find((g) => g.id === id));
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
        h('div', { class: 'rat-frage pergament' }, RF.frage),
        optionKarte(a), optionKarte(b),
        h('div', { class: 'rat-regeln pergament auf-pergament' },
          h('h3', null, 'Ratsregeln'),
          h('ul', null, ZI.RATSREGELN.map((r) => h('li', null, r))),
          h('h3', null, 'So kannst du anfangen'),
          h('ul', null, ZI.SATZANFAENGE.map((r) => h('li', null, r))),
          insel.rat[kap()] ? h('p', { style: { margin: 0 } }, h('b', null, 'Bisherige Entscheidung: '), ZI.GEBAEUDE.find((g) => g.id === insel.rat[kap()]).name) : null)));
    document.body.appendChild(rat);

    function entscheiden(g) {
      insel.rat[kap()] = g.id; sichern();
      clearInterval(uhrTimer);
      rat.remove();
      ZI.ton.fanfare();
      ZI.meldung('Der Zwergenrat hat entschieden: Zuerst wird ' + g.name + ' gebaut.', 4000);
      allesZeigen(false);
    }
  }

  /* ---------- Kapitel geschafft ---------- */
  function feiern() {
    const k = kap();
    ZI.ton.fanfare();
    ZI.feuerwerk(8000);
    if (!ZI.KAPITEL[k + 1] && bauEls.schiff) { bauEls.schiff.classList.remove('segelt'); void bauEls.schiff.offsetWidth; bauEls.schiff.classList.add('segelt'); }
    const nk = ZI.KAPITEL[k + 1];
    const f = ZI.fenster([
      h('div', { style: { width: '100%', borderRadius: '14px', overflow: 'hidden' } }, bild('fest-szene', 'Fest im Zwergendorf')),
      h('h2', null, 'Kapitel ' + ZI.KAPITEL[k].nr + ' geschafft!'),
      nk ? h('p', { style: { margin: 0, fontSize: '22px' } }, 'Euer Dorf wächst! Mit diesem Runenwort öffnet ihr in der Schmiede Kapitel ' + nk.nr + ':') : h('p', { style: { margin: 0, fontSize: '22px' } }, 'Das ganze Dorf steht. Was für eine Leistung, 5a!'),
      nk ? h('div', { class: 'runenwort' }, nk.runenwort) : null,
      h('div', { class: 'knopf-reihe' },
        h('button', { class: 'knopf holz', onclick: () => f.schliessen() }, 'Hurra!'),
        naechstesKapitelBereit() ? h('button', { class: 'knopf', onclick: () => { f.schliessen(); kapitelWeiter(); } }, 'Kapitel ' + nk.nr + ' beginnen') : null),
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
          h('td', null, s.coreCount(kap()) + ' / 3'),
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
      h('p', { style: { margin: 0, fontSize: '16px', color: 'var(--tinte-hell)' } }, 'Ein Kapitel ist geschafft, wenn jedes Kind den Hauptstollen geschafft hat (3 Material pro Kind). Fehlen Kinder länger, die Zahl einfach verkleinern.'),
      h('div', { class: 'einstellung' }, 'Kapitel auf der Insel:',
        ZI.BAUPLAN.map((_, k) => h('button', { class: 'knopf klein' + (k === kap() ? '' : ' holz'), 'aria-pressed': String(k === kap()),
          onclick: () => { insel.kapitel = k; sichern(); f.schliessen(); allesZeigen(false); ZI.meldung('Die Insel zeigt jetzt Kapitel ' + (k + 1) + '.'); } }, 'Kapitel ' + (k + 1)))),
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
