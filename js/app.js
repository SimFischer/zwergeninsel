/* Zwergeninsel – Schüler-App (Schmiede) */
(function () {
  const ZI = window.ZI;
  const { h, bild, icon, mischen, zufall, speicher, sitzung } = ZI;
  /* Alte Daten früherer Versionen vom Gerät entfernen (sie lagen dauerhaft im Browser) */
  try { Object.keys(localStorage).filter((k) => /^zi-(aktiv|botschaft|stamm|rueckblick)/.test(k)).forEach((k) => localStorage.removeItem(k)); } catch (e) { /* egal */ }
  const app = document.getElementById('app');

  let stand = null;                 // aktueller Spielstand (ZI.Stand)
  let testmodus = sessionStorage.getItem('zi-test') === '1';
  let K = 0;                        // aktuelles Kapitel (0 = Kapitel 1)
  let aktStation = null;            // { k, art: 'kern' | 'tief' | 'bonus', i }
  let fehlerZaehler = 0;            // Fehler in der laufenden Station (0 = goldene Krone)
  let kombo = 0;                    // richtige Antworten hintereinander
  /* Jede richtige oder falsche Antwort läuft über diese Klänge – so zählen wir Kombo und Fehler mit */
  const tonRichtig = ZI.ton.richtig.bind(ZI.ton);
  const tonFalsch = ZI.ton.falsch.bind(ZI.ton);
  ZI.ton.richtig = () => { kombo++; zeigeKombo(); tonRichtig(); };
  ZI.ton.falsch = () => { fehlerZaehler++; kombo = 0; zeigeKombo(); tonFalsch(); };
  function zeigeKombo() {
    const el = document.querySelector('.kombo');
    const glut = document.querySelector('.glut-flackern');
    if (glut) glut.style.setProperty('--glut', String(Math.min(1, kombo / 6)));
    if (!el) return;
    if (kombo >= 3) {
      el.hidden = false;
      ZI.setze(el, ZI.bildOder('flamme', '', null, 'kombo-flamme'), h('span', null, 'Kombo ×' + kombo));
      el.classList.remove('puls'); void el.offsetWidth; el.classList.add('puls');
      if (kombo % 5 === 0) { ZI.konfetti(40); ZI.meldung('Unglaublich! ' + kombo + ' richtig hintereinander!'); }
    } else el.hidden = true;
  }
  const AKTIV_KEY = 'zi-aktiv';
  const MAX_ALTER = 4 * 60 * 60 * 1000; // nach 4 Stunden wird der Stand nicht mehr angeboten

  const ROHSTOFF = [
    { datei: 'holz', name: 'Holz' },
    { datei: 'stein', name: 'Stein' },
    { datei: 'eisen', name: 'Eisen' },
  ];

  /* ---------- Speichern ---------- */
  function speichern() {
    if (stand) sitzung.schreiben(AKTIV_KEY, { code: stand.code(), zeit: Date.now() });
  }
  function gespeicherterStand() {
    const g = sitzung.lesen(AKTIV_KEY, null);
    if (!g || !g.code || Date.now() - g.zeit > MAX_ALTER) return null;
    return ZI.Stand.ausCode(g.code);
  }
  function abmelden() {
    try { sessionStorage.clear(); } catch (e) { /* egal */ }
    testmodus = false;
    stand = null;
    zeigeAbschied();
  }
  function zeigeAbschied() {
    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('titel-hintergrund', 'hg-ersatz-titel', 'rgba(20,12,8,0.35)'),
      h('div', { class: 'start-mitte' },
        h('div', { class: 'pergament auf-pergament abschied' },
          h('h2', null, 'Gut geschmiedet!'),
          h('p', null, 'Dein Spielstand steckt in deinem Zwergenpass auf der Karte. Auf diesem iPad ist nichts mehr von dir gespeichert.'),
          h('p', null, h('b', null, 'Schließe jetzt diesen Tab.'), ' Dann ist das iPad frei für die nächste Klasse.'),
          h('button', { class: 'knopf holz', onclick: zeigeStart }, 'Zurück zum Start')))));
  }

  /* Fortschritt eintragen und neu freigeschaltete Zwerge feiern */
  function fortschritt(aenderung, danach) {
    const vorher = stand.freieZwerge();
    const seitenVorher = wissenFrei(stand);
    const abzeichenVorher = abzeichenFrei(stand);
    const rangVorher = ZI.rang(stand);
    aenderung(stand);
    speichern();
    const neu = stand.freieZwerge().filter((n) => !vorher.includes(n));
    const neueSeiten = wissenFrei(stand).filter((w) => !seitenVorher.includes(w));
    const neueAbzeichen = abzeichenFrei(stand).filter((a) => !abzeichenVorher.includes(a));
    const rangNeu = ZI.rang(stand);
    zeigeErfolge(rangNeu.nr > rangVorher.nr ? rangNeu : null, neueAbzeichen, neueSeiten,
      () => zeigeFreischaltungen(neu, danach));
  }

  /* ---------- Zwergen-Wissensbuch ---------- */
  function wissenFrei(s) {
    return ZI.WISSEN.filter((w) => (w.art === 'bau' ? s.hatBau(w.bit) : w.art === 'kern' ? s.hatKern(w.k, w.i) : s.hatTief(w.k, w.i)));
  }
  function seitenKarte(w, frei) {
    if (!frei) {
      const st = w.art === 'bau' ? ZI.bauUebung(w.bau) : INHALT[w.k] && INHALT[w.k][w.art][w.i];
      return h('div', { class: 'seite gesperrt' },
        h('div', { class: 'seite-kopf' }, icon.schloss(), h('span', null, '???')),
        h('p', null, 'Schaffe „' + (st ? st.name : '…') + '“, dann erscheint hier ein Merksatz.'));
    }
    return h('div', { class: 'seite' },
      h('div', { class: 'seite-kopf' }, icon.buch(), h('h3', null, w.titel)),
      h('p', null, w.text),
      h('div', { class: 'seite-beispiel' }, w.beispiel),
      h('button', { class: 'rund klein-rund', 'aria-label': 'Seite vorlesen', onclick: () => ZI.vorlesen(w.titel + '. ' + w.text + ' ' + w.beispiel.replace(/\n/g, ' ')) }, icon.vorlesen()));
  }
  function zeigeWissensbuch() {
    const frei = wissenFrei(stand);
    let k = letzterReiter || 0;
    const reiter = h('div', { class: 'reiter', role: 'tablist' });
    const seiten = h('div', { class: 'seiten' });
    function zeichne() {
      ZI.setze(reiter, ...ZI.KAPITEL.map((kap, i) => {
        const b = h('button', { class: i === k ? 'aktiv' : '', role: 'tab', 'aria-selected': String(i === k) }, 'Kapitel ' + kap.nr);
        b.addEventListener('click', () => { k = i; zeichne(); });
        return b;
      }));
      ZI.setze(seiten, ...ZI.WISSEN.filter((w) => w.k === k).map((w) => seitenKarte(w, frei.includes(w))));
    }
    zeichne();
    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('stollen-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.45)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Halle', onclick: () => zeigeHalle() }, icon.zurueck()),
        h('div', null,
          h('div', { class: 'titel titel-mit-bild' }, ZI.bildOder('buch-offen', '', null, 'titel-bild'), 'Zwergen-Wissensbuch'),
          h('div', { class: 'untertitel' }, frei.length + ' von ' + ZI.WISSEN.length + ' Seiten gefunden'))),
      h('div', { class: 'screen-scroll', style: { position: 'relative', zIndex: 2 } },
        h('div', { class: 'halle-inhalt' }, reiter, h('div', { class: 'pergament auf-pergament stollen' }, seiten)))));
  }

  /* ---------- Meisterin Hammerlind macht es vor ---------- */
  function zeigeVormachen(v, weiter) {
    let n = 0;
    const liste = h('div', { class: 'vormach-liste' });
    const blase = h('div', { class: 'vormach-blase', role: 'status', 'aria-live': 'polite' });
    const knopf = h('button', { class: 'knopf' }, 'Weiter');
    function zeile(z) {
      const istTeil = ['these', 'begruendung', 'beispiel'].includes(z.art);
      if (istTeil) return h('div', { class: 'teil teil-' + z.art }, h('span', { class: 'teil-name' }, z.marke), h('span', null, z.text));
      return h('div', { class: 'vormach-zeile ' + z.art }, h('span', null, z.text), z.marke ? h('span', { class: 'marke-' + z.art }, z.marke) : null);
    }
    function schritt() {
      const st = v.schritte[n];
      blase.textContent = st.sagt;
      if (st.zeigt) liste.appendChild(zeile(st.zeigt));
      knopf.textContent = n + 1 < v.schritte.length ? 'Weiter' : 'Jetzt du!';
      ZI.ton.plopp();
    }
    knopf.addEventListener('click', () => {
      n++;
      if (n < v.schritte.length) schritt();
      else { window.speechSynthesis && window.speechSynthesis.cancel(); f.schliessen(); weiter(); }
    });
    const f = ZI.fenster([
      h('div', { class: 'vormach-kopf' },
        h('div', { class: 'vormach-bild' }, bild('meisterin-erklaert', 'Meisterin Hammerlind')),
        h('div', null,
          h('div', { style: { fontSize: '16px', color: 'var(--tinte-hell)' } }, 'Meisterin Hammerlind macht es vor'),
          h('h2', { style: { fontSize: '30px' } }, v.titel))),
      h('div', { class: 'meinung', style: { alignSelf: 'stretch', textAlign: 'left' } }, v.kopf),
      liste,
      h('div', { class: 'vormach-sagt' },
        h('button', { class: 'rund', 'aria-label': 'Vorlesen', onclick: () => ZI.vorlesen(blase.textContent) }, icon.vorlesen()),
        blase),
      h('div', { class: 'knopf-reihe' },
        h('button', { class: 'knopf holz klein', onclick: () => { window.speechSynthesis && window.speechSynthesis.cancel(); f.schliessen(); weiter(); } }, 'Überspringen'),
        knopf),
    ]);
    f.el.classList.add('vormach');
    schritt();
  }

  function zeigeFreischaltungen(liste, danach) {
    if (!liste.length) { danach && danach(); return; }
    const z = ZI.ZWERGE.find((d) => d.nr === liste[0]);
    ZI.ton.fanfare(); ZI.konfetti();
    const f = ZI.fenster([
      bild('truhe-offen', 'Offene Schatztruhe', 'truhe-klein'),
      h('h2', null, 'Neuer Zwerg freigeschaltet!'),
      h('div', { class: 'gross-bild strahlen' }, bild(z.datei, z.name)),
      h('div', { style: { fontSize: '26px', fontFamily: 'var(--titel)' } }, z.name + ' · ' + z.rolle),
      h('p', { style: { margin: 0 } }, 'Du kannst jetzt in deiner Zwergen-Sammlung zu ' + z.name + ' wechseln.'),
      h('div', { class: 'knopf-reihe' },
        h('button', { class: 'knopf holz', onclick: () => { stand.zwerg = z.nr; speichern(); f.schliessen(); zeigeFreischaltungen(liste.slice(1), danach); } }, 'Gleich wechseln'),
        h('button', { class: 'knopf', onclick: () => { f.schliessen(); zeigeFreischaltungen(liste.slice(1), danach); } }, 'Weiter')),
    ]);
  }

  function zeige(screen) {
    window.speechSynthesis && window.speechSynthesis.cancel();
    ZI.setze(app, screen);
    window.scrollTo(0, 0);
  }

  function aktuellerZwerg() { return ZI.ZWERGE.find((z) => z.nr === stand.zwerg); }

  /* ---------- Gemeinsame Bausteine ---------- */
  function tonKnopf() {
    const b = h('button', { class: 'rund', 'aria-label': 'Ton an oder aus' }, ZI.ton.an ? icon.ton() : icon.stumm());
    b.addEventListener('click', () => { const an = ZI.ton.umschalten(); ZI.setze(b, an ? icon.ton() : icon.stumm()); });
    return b;
  }
  function zaehler(datei, name, wert) {
    return h('div', { class: 'zaehler', 'aria-label': name + ': ' + wert }, bild(datei, name), String(wert));
  }
  function avatar(nr, huepfen) {
    const z = ZI.ZWERGE.find((d) => d.nr === nr);
    return h('div', { class: 'avatar' + (huepfen ? ' huepfen' : '') }, bild(z.datei, z.name));
  }
  function bestaetigen(text, jaText, ja) {
    const f = ZI.fenster([
      h('h2', null, text),
      h('div', { class: 'knopf-reihe' },
        h('button', { class: 'knopf holz', onclick: () => f.schliessen() }, 'Nein'),
        h('button', { class: 'knopf', onclick: () => { f.schliessen(); ja(); } }, jaText)),
    ]);
  }

  /* =========================================================
     START
     ========================================================= */
  function zeigeStart() {
    const alt = gespeicherterStand();
    const knoepfe = h('div', { class: 'start-knoepfe' },
      h('button', { class: 'knopf', onclick: () => zeigeWahl(true) }, 'Neuer Zwerg'),
      h('button', { class: 'knopf holz', onclick: zeigePassEingabe }, 'Ich habe einen Zwergenpass'));

    let weiter = null;
    if (alt) {
      const z = ZI.ZWERGE.find((d) => d.nr === alt.zwerg);
      weiter = h('button', { class: 'pergament weiter-karte', style: { border: '3px solid #8a6438' },
        onclick: () => { stand = alt; zeigeHalle(); } },
        avatar(alt.zwerg),
        h('div', { style: { textAlign: 'left' } },
          h('div', { style: { fontFamily: 'var(--titel)', fontSize: '24px' } }, 'Weiterspielen als ' + z.name),
          h('div', { style: { fontSize: '16px', color: 'var(--tinte-hell)' } }, 'Nur, wenn das dein Zwerg ist!')));
    }

    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('titel-hintergrund', 'hg-ersatz-titel', 'rgba(20,12,8,0.15)'),
      h('div', { class: 'start-mitte' },
        h('div', { class: 'logo' }, 'Zwergeninsel'),
        h('div', { class: 'logo-unter' }, 'Schmiede Argumente – baut gemeinsam euer Dorf!'),
        weiter, knoepfe),
      h('div', { class: 'fusszeile' },
        h('button', { onclick: zeigeTestmodus }, testmodus ? 'Testmodus ist an (antippen zum Ausschalten)' : 'Für Lehrkräfte: Testmodus'))));
  }

  function zeigeTestmodus() {
    if (testmodus) { testmodus = false; sessionStorage.removeItem('zi-test'); zeigeStart(); return; }
    const f = ZI.fenster([
      h('h2', null, 'Testmodus'),
      h('p', null, 'Im Testmodus sind alle Stollen und das Bonusspiel sofort offen, damit Sie alles ausprobieren können. Der Modus gilt nur, bis die App geschlossen wird.'),
      h('div', { class: 'knopf-reihe' },
        h('a', { class: 'knopf moos klein', href: 'insel.html', style: { textDecoration: 'none' } }, 'Zur Insel (Board)'),
        h('a', { class: 'knopf moos klein', href: 'karten.html', style: { textDecoration: 'none' } }, 'Zwergenpass-Karten drucken'),
        h('a', { class: 'knopf moos klein', href: 'lehrkraft.html', style: { textDecoration: 'none' } }, 'Stundenverlauf & Spickzettel')),
      h('div', { class: 'knopf-reihe' },
        h('button', { class: 'knopf holz', onclick: () => f.schliessen() }, 'Abbrechen'),
        h('button', { class: 'knopf', onclick: () => { testmodus = true; sessionStorage.setItem('zi-test', '1'); f.schliessen(); zeigeStart(); } }, 'Testmodus an')),
    ]);
  }

  /* =========================================================
     ZWERG WÄHLEN / SAMMLUNG
     ========================================================= */
  function zeigeWahl(neu) {
    const probe = neu ? new ZI.Stand() : stand;
    let gewaehlt = neu ? null : stand.zwerg;
    const weiterKnopf = h('button', { class: 'knopf', disabled: neu ? true : null }, neu ? 'Diesen Zwerg nehmen' : 'Fertig');

    const raster = h('div', { class: 'zwerg-raster' });
    const karten = ZI.ZWERGE.map((z) => {
      const frei = probe.zwergFrei(z.nr);
      const karte = h('button', { class: 'zwerg-karte pergament auf-pergament' + (frei ? '' : ' gesperrt') + (z.nr === gewaehlt ? ' gewaehlt' : ''),
        'aria-label': frei ? z.name + ', ' + z.rolle : z.name + ', gesperrt. ' + z.bedingung },
        h('div', { class: 'bild' }, bild(z.datei, z.name)),
        h('div', { class: 'name' }, frei ? z.name : '???'),
        frei ? h('div', { class: 'rolle' }, z.rolle) : h('div', { class: 'bedingung' }, z.bedingung),
        frei ? null : h('div', { class: 'schloss', style: { color: 'var(--tinte)' } }, icon.schloss()));
      karte.addEventListener('click', () => {
        if (!frei) { ZI.meldung(z.bedingung); ZI.ton.falsch(); return; }
        gewaehlt = z.nr; ZI.ton.plopp();
        karten.forEach((k) => k.classList.remove('gewaehlt'));
        karte.classList.add('gewaehlt');
        weiterKnopf.disabled = false;
      });
      return karte;
    });
    raster.append(...karten);

    weiterKnopf.addEventListener('click', () => {
      if (!gewaehlt) return;
      if (neu) {
        const nr = gewaehlt;
        waehleKarte(null, (karte) => {
          stand = new ZI.Stand({ zwerg: nr, id: karte });
          speichern();
          zeigeHalle(true);
        }, () => zeigeWahl(true));
      } else {
        stand.zwerg = gewaehlt; speichern(); zeigeHalle();
      }
    });

    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('stollen-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.45)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück', onclick: () => (neu ? zeigeStart() : zeigeHalle()) }, icon.zurueck()),
        h('div', null,
          h('div', { class: 'titel' }, neu ? 'Wähle deinen Zwerg' : 'Deine Zwergen-Sammlung'),
          h('div', { class: 'untertitel' }, neu ? 'Vier Zwerge warten auf dich. Acht weitere kannst du freischalten.' : probe.freieZwerge().length + ' von 12 Zwergen freigeschaltet')),
        h('div', { class: 'spacer' }), weiterKnopf),
      h('div', { class: 'screen-scroll', style: { position: 'relative', zIndex: 2 } }, raster)));
  }

  /* =========================================================
     ZWERGENPASS EINGEBEN
     ========================================================= */
  function zeigePassEingabe() {
    const eingabe = h('input', { class: 'eingabe', maxlength: '14', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', inputmode: 'text', placeholder: 'XXXX-XXXX-XXXX', 'aria-label': 'Zwergenpass-Code' });
    const hinweis = h('div', { class: 'rueckmeldung tipp', style: { display: 'none' } });
    eingabe.addEventListener('input', () => {
      eingabe.value = ZI.formatiereCode(eingabe.value);
      hinweis.style.display = 'none';
    });
    const pruefen = () => {
      const s = ZI.Stand.ausCode(eingabe.value);
      if (!s) {
        ZI.ton.falsch();
        hinweis.style.display = '';
        hinweis.textContent = 'Dieser Code stimmt nicht. Prüfe jedes Zeichen. Im Zwergenpass gibt es keine 0, 1, I oder O.';
        return;
      }
      stand = s; speichern(); ZI.ton.richtig();
      const z = aktuellerZwerg();
      const f = ZI.fenster([
        h('div', { class: 'gross-bild' }, bild(z.datei, z.name)),
        h('h2', null, 'Willkommen zurück, ' + z.name + '!'),
        h('p', { style: { margin: 0 } }, 'Dein Fortschritt ist wieder da.'),
        h('button', { class: 'knopf', onclick: () => { f.schliessen(); zeigeHalle(); } }, 'Zur Schmiede'),
      ]);
    };
    eingabe.addEventListener('keydown', (e) => { if (e.key === 'Enter') pruefen(); });

    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('stollen-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.45)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück', onclick: zeigeStart }, icon.zurueck()),
        h('div', { class: 'titel' }, 'Zwergenpass eingeben')),
      h('div', { class: 'start-mitte' },
        h('div', { class: 'pergament pass-karte auf-pergament' },
          h('div', { style: { display: 'flex', gap: '14px', alignItems: 'center' } },
            h('div', { style: { width: '120px', flex: 'none' } }, bild('zwergenpass-karte', 'Zwergenpass')),
            h('p', { style: { margin: 0, fontSize: '20px' } }, 'Tippe den Code von deiner Zwergenpass-Karte ein. Groß- oder Kleinschreibung ist egal.')),
          eingabe, hinweis,
          h('button', { class: 'knopf', onclick: pruefen }, 'Zwerg zurückholen')))));
    setTimeout(() => eingabe.focus(), 300);
  }

  /* =========================================================
     HALLE – Übersicht über Kapitel und Stollen
     ========================================================= */
  /* Was in welchem Kapitel zu tun ist. start() setzt vorher das aktuelle Kapitel K. */
  const INHALT = [
    { // Kapitel 1
      kern: [
        { name: 'Stumpf oder scharf?', info: 'Finde die Begründung, die wirklich erklärt, warum.', icon: ['icon-stumpf-scharf', 'axt-scharf'], spiel: () => spielStumpfScharf(), vor: 'k1s1' },
        { name: 'Erz oder Schlacke?', info: 'Sortiere: Welche Begründung passt zur Meinung?', icon: ['icon-erz-schlacke', 'eisen-roh'], spiel: () => spielErz(), vor: 'k1s2' },
        { name: 'Weil-Denn-Amboss', info: 'Bau Begründungssätze mit weil, da und denn.', icon: ['icon-weil-denn', 'runenplatte'], spiel: () => spielWeilDenn(), vor: 'k1s3' },
      ],
      tief: [
        { name: 'Fehlerjagd', info: 'Der Fehlerkobold hat Sätze verbogen. Finde den richtigen.', icon: ['icon-fehlerjagd', 'kobold-frech'], spiel: () => spielFehlerjagd() },
        { name: 'Beispiel-Edelstein', info: 'Finde das Beispiel, das die Begründung stützt.', icon: ['icon-beispiel', 'edelstein'], spiel: () => spielBeispiele() },
        { name: 'Meisterstück', info: 'Argumentiere laut – dein Partner prüft.', icon: ['icon-meisterstueck', 'meisterin-erklaert'], spiel: () => spielMeisterstueck(1) },
      ],
      bonus: { name: 'Funkenregen', info: 'Fang die scharfen Begründungen, bevor sie verglühen! Bis zu 3 Sterne.', icon: ['icon-funkenregen', 'stern'], spiel: () => spielFunkenregen(ZI.FUNKENREGEN, 'Funkenregen', 'Oben steht eine Meinung. Von oben regnen Begründungen. Tippe nur die scharfen Begründungen an! Stumpfe kosten einen Punkt.') },
    },
    { // Kapitel 2
      kern: [
        { name: 'Argument-Puzzle', info: 'Setz Meinung, Begründung und Beispiel richtig zusammen.', icon: ['icon-puzzle', 'pergament'], spiel: () => spielPuzzle(), vor: 'k2s1' },
        { name: 'Motor oder Bremse?', info: 'Was bringt ein Gespräch weiter, was stoppt es?', icon: ['icon-motor-bremse', 'schleifstein'], spiel: () => spielMotor(), vor: 'k2s2' },
        { name: 'Hör-Stollen', info: 'Hör genau zu und finde Begründung und Beispiel.', icon: ['icon-hoeren', 'laterne'], spiel: () => spielHoeren(), vor: 'k2s3' },
      ],
      tief: [
        { name: 'Kobold-Kampf', info: 'Der Fehlerkobold ist zurück! Besiege ihn mit allem, was du kannst.', icon: ['icon-kobold-kampf', 'kobold-chaos'], spiel: () => spielBoss() },
        { name: 'Argument-Kette', info: 'Welche Stützen machen ein Argument stärker?', icon: ['icon-kette', 'eisen-gluehend'], spiel: () => spielKette() },
        { name: 'Meisterstück II', info: 'Laut argumentieren mit Meinung, Begründung und Beispiel.', icon: ['icon-meisterstueck2', 'meisterin-jubelt'], spiel: () => spielMeisterstueck(2) },
      ],
      bonus: { name: 'Beispiel-Regen', info: 'Fang die Beispiele, die wirklich passen! Bis zu 3 Sterne.', icon: ['icon-beispielregen', 'edelstein'], spiel: () => spielFunkenregen(ZI.BEISPIELREGEN, 'Beispiel-Regen', 'Oben stehen eine Meinung und eine Begründung. Von oben regnen Beispiele. Tippe nur die Beispiele an, die zur Begründung passen! Unpassende kosten einen Punkt.') },
    },
    { // Kapitel 3
      kern: [
        { name: 'Ja, und – ja, aber?', info: 'Wie reagiert jemand auf einen Beitrag?', icon: ['icon-ja-und', 'zwerg-04-lina'], spiel: () => spielJaUnd(), vor: 'k3s1' },
        { name: 'Wer hört zu?', info: 'Finde die Antwort, die wirklich anknüpft.', icon: ['icon-zuhoeren', 'meisterin-tipp'], spiel: () => spielZuhoeren(), vor: 'k3s2' },
        { name: 'Überzeug den Inselrat', info: 'Entkräfte die Einwände des Inselrats.', icon: ['icon-inselrat', 'zwerg-11-grimbart'], spiel: () => spielInselrat(), vor: 'k3s3' },
      ],
      tief: [
        { name: 'Gegenargument-Schmiede', info: 'Finde das Argument, das dagegen spricht.', icon: ['icon-gegenargument', 'axt-scharf'], spiel: () => spielGegenargument() },
        { name: 'Wer überzeugt wen?', info: 'Das beste Argument passt zur Person.', icon: ['icon-situation', 'zwerg-10-amara'], spiel: () => spielSituation() },
        { name: 'Streitgespräch', info: 'Zu zweit: Meinung, Zuhören und Gegenargument.', icon: ['icon-streitgespraech', 'meisterin-jubelt'], spiel: () => spielMeisterstueck(3) },
      ],
      bonus: { name: 'Sprecherwechsel', info: 'Steig im richtigen Moment ein – ohne zu unterbrechen. Bis zu 3 Sterne.', icon: ['icon-sprecherwechsel', 'stern'], spiel: () => spielSprecherwechsel() },
    },
  ];

  function kapitelOffen(k) {
    if (k === 0) return true;
    return !!INHALT[k] && ZI.KAPITEL[k].fertig && stand.offen >= k;
  }
  let letzterReiter = null;

  function zeigeHalle(begruessen) {
    if (!stand.karte) { // alte Pässe ohne Kartennummer: einmal nachfragen
      waehleKarte(null, (n) => { stand.id = n; speichern(); zeigeHalle(begruessen); }, () => zeigeStart());
      return;
    }
    const z = aktuellerZwerg();
    if (letzterReiter === null || !kapitelOffen(letzterReiter)) {
      letzterReiter = 0;
      for (let k = 0; k < ZI.KAPITEL.length; k++) if (kapitelOffen(k)) letzterReiter = k;
    }
    let aktiverReiter = letzterReiter;

    const inhalt = h('div', { class: 'halle-inhalt' });
    const reiter = h('div', { class: 'reiter', role: 'tablist' });
    const kapitelBox = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '18px' } });

    function stationKarte(def, k, geschafft, gesperrt, sperrText, i, rohstoff, art, idx) {
      const krone = art === 'kern' && stand.hatKrone(k, idx);
      const b = h('button', { class: 'station' + (geschafft ? ' geschafft' : '') + (gesperrt ? ' gesperrt' : '') + (krone ? ' gekroent' : '') },
        krone ? h('div', { class: 'krone-marke', 'aria-label': 'Goldene Krone: fehlerfrei geschafft' }, ZI.bildOder('krone', 'Krone', icon.krone())) : null,
        h('div', { class: 'icon' }, bild(def.icon, def.name)),
        h('div', null,
          h('div', { class: 'st-name' }, (i !== undefined ? i + 1 + '. ' : '') + def.name),
          h('div', { class: 'st-info' }, gesperrt ? sperrText : def.info),
          rohstoff && !gesperrt ? h('div', { class: 'st-info', style: { fontWeight: 700 } }, 'Bringt: ' + rohstoff) : null),
        geschafft ? h('div', { class: 'haken' }, icon.haken()) : null,
        gesperrt ? h('div', { class: 'schloss', style: { top: '8px', right: '8px', width: '28px', height: '28px' } }, icon.schloss()) : null);
      b.addEventListener('click', () => {
        if (gesperrt) { ZI.meldung(sperrText); ZI.ton.falsch(); return; }
        K = k; letzterReiter = k; aktStation = { k, art, i: idx };
        if (def.vor && ZI.VORMACHEN[def.vor]) zeigeVormachen(ZI.VORMACHEN[def.vor], def.spiel); else def.spiel();
      });
      return b;
    }

    function kapitelInhalt(k) {
      const inh = INHALT[k];
      const tiefOffen = stand.coreCount(k) === 3 || testmodus;
      const sterne = stand.bonus[k];
      return [
        h('section', { class: 'pergament stollen auf-pergament' },
          h('h2', null, 'Hauptstollen'),
          h('p', { class: 'erklaer' }, 'Diese drei Stationen schafft jede und jeder. Jede bringt Baumaterial für unser Dorf.'),
          h('div', { class: 'stationen' }, inh.kern.map((d, i) => stationKarte(d, k, stand.hatKern(k, i), false, '', i, ROHSTOFF[i].name, 'kern', i)))),
        h('section', { class: 'pergament stollen auf-pergament' },
          h('h2', null, 'Tiefe Stollen'),
          h('p', { class: 'erklaer' }, 'Für Meisterschmiede: Jeder Stollen bringt ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine. Daraus wird Schmuck für unser Dorf.'),
          h('div', { class: 'stationen' }, inh.tief.map((d, i) => stationKarte(d, k, stand.hatTief(k, i), !tiefOffen, 'Schaffe zuerst den Hauptstollen.', undefined, null, 'tief', i)))),
        gebaeudeStollen(k),
        h('section', { class: 'pergament stollen auf-pergament' },
          h('h2', null, 'Bonusinsel'),
          h('div', { class: 'stationen' },
            stationKarte(inh.bonus, k, sterne > 0, !tiefOffen, 'Schaffe zuerst den Hauptstollen.', undefined, null, 'bonus', 0),
            h('div', { class: 'st-info', style: { alignSelf: 'center', fontSize: '18px' } }, 'Deine Sterne: ' + '★'.repeat(sterne) + '☆'.repeat(3 - sterne)))),
        h('section', { class: 'pergament stollen auf-pergament rueckblick-abschnitt' },
          h('div', null,
            h('h2', null, 'Rückblick: Was kann ich schon?'),
            h('p', { class: 'erklaer' }, tiefOffen ? 'Schätz dich selbst ein. Wo du noch unsicher bist, zeigt dir Meisterin Hammerlind, was du üben kannst.' : 'Öffnet sich, wenn du den Hauptstollen geschafft hast.')),
          h('button', { class: 'knopf' + (tiefOffen ? '' : ' holz'), disabled: tiefOffen ? null : true, onclick: () => zeigeRueckblick(k) }, 'Selbst einschätzen')),
      ];
    }

    function gebaeudeStollen(k) {
      const liste = ZI.BAU_UEBUNGEN.filter((u) => u.kapitel === k);
      if (!liste.length) return null;
      const steht = gebauteGebaeude();
      return h('section', { class: 'pergament stollen auf-pergament' },
        h('h2', null, 'Gebäude-Stollen'),
        h('p', { class: 'erklaer' }, 'Jedes Gebäude, das eure Klasse baut, öffnet hier eine neue Übung. Was zuerst gebaut wird, entscheidet der Zwergenrat.'),
        h('div', { class: 'stationen' }, liste.map((u) => {
          const g = ZI.GEBAEUDE.find((x) => x.id === u.id);
          const frei = testmodus || steht.includes(u.id) || stand.hatBau(u.bit);
          const def = { name: u.name, info: u.schwerpunkt, icon: [u.id, u.id + '-ruine'], spiel: () => spielBau(u) };
          return stationKarte(def, k, stand.hatBau(u.bit), !frei,
            'Öffnet sich mit: ' + (g ? g.name : u.id), undefined, null, 'bau', u.bit);
        })));
    }

    function kapitelGesperrt(k) {
      const kap = ZI.KAPITEL[k];
      if (stand.offen >= k) {
        return h('section', { class: 'pergament stollen auf-pergament' },
          h('h2', null, 'Kapitel ' + kap.nr + ': ' + kap.titel),
          h('p', { class: 'erklaer' }, 'Dieses Kapitel wird gerade noch geschmiedet. Bald geht es hier weiter!'));
      }
      return h('section', { class: 'pergament stollen auf-pergament' },
        h('h2', null, icon.schloss(), 'Kapitel ' + kap.nr + ': ' + kap.titel),
        h('p', { class: 'erklaer' }, 'Dieses Kapitel öffnet sich, wenn eure Klasse auf der Insel genug gebaut hat. Dann zeigt das Board eine neue Inselbotschaft.'),
        h('button', { class: 'knopf', style: { marginTop: '6px' }, onclick: () => botschaftEingeben(() => zeigeHalle()) }, 'Inselbotschaft eintippen'));
    }

    function zeichneReiter() {
      ZI.setze(reiter, ...ZI.KAPITEL.map((kap, k) => {
        const b = h('button', { class: k === aktiverReiter ? 'aktiv' : '', role: 'tab', 'aria-selected': String(k === aktiverReiter) },
          kapitelOffen(k) ? null : icon.schloss(), 'Kapitel ' + kap.nr + ' · ' + kap.titel);
        b.addEventListener('click', () => { aktiverReiter = k; letzterReiter = k; zeichneReiter(); });
        return b;
      }));
      ZI.setze(kapitelBox, ...(kapitelOffen(aktiverReiter) ? kapitelInhalt(aktiverReiter) : [kapitelGesperrt(aktiverReiter)]));
    }
    zeichneReiter();
    inhalt.append(botschaftLeiste(), reiter, kapitelBox);

    const rang = ZI.rang(stand);
    const rohstoffe = ROHSTOFF.map((r, i) => zaehler(r.datei, r.name, [0, 1, 2].filter((k) => stand.hatKern(k, i)).length));

    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('stollen-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.35)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', style: { width: '64px', height: '64px', padding: 0, background: 'none', boxShadow: 'none' }, 'aria-label': 'Zwergen-Sammlung öffnen', onclick: () => zeigeWahl(false) }, avatar(stand.zwerg, true)),
        h('div', { class: 'rang-box' },
          h('div', { class: 'titel' }, z.name),
          h('div', { class: 'untertitel' }, (testmodus ? 'Testmodus · ' : '') + rang.name),
          h('div', { class: 'rang-balken', 'aria-label': rang.naechsterName ? 'Noch ' + (rang.naechsterAb - rang.punkte) + ' Punkte bis ' + rang.naechsterName : 'Höchster Rang erreicht' },
            h('div', { style: { width: (rang.naechsterAb ? ((rang.punkte - rang.ab) / (rang.naechsterAb - rang.ab)) * 100 : 100) + '%' } }))),
        h('div', { class: 'spacer' }),
        ...rohstoffe,
        zaehler('edelstein', 'Edelsteine', stand.gems()),
        h('button', { class: 'rund', 'aria-label': 'Zwergen-Wissensbuch öffnen', onclick: zeigeWissensbuch }, icon.buch()),
        h('button', { class: 'rund', 'aria-label': 'Abzeichen-Album öffnen', onclick: zeigeAlbum }, icon.album()),
        musikKnopf(),
        tonKnopf(),
        h('button', { class: 'knopf', onclick: zeigeLieferung }, 'Lieferung')),
      h('div', { class: 'screen-scroll', style: { position: 'relative', zIndex: 2 } }, inhalt)));

    if (begruessen) {
      const f = ZI.fenster([
        h('div', { class: 'gross-bild' }, bild('meisterin-erklaert', 'Meisterin Hammerlind')),
        h('h2', null, 'Willkommen, ' + z.name + '!'),
        h('p', { style: { margin: 0, fontSize: '21px' } }, 'Ich bin Meisterin Hammerlind. Unser Clan ist auf dieser Insel gestrandet. Hier in der Schmiede schmieden wir Argumente – und mit jedem Argument bekommt die Klasse Baumaterial für unser Dorf.'),
        h('p', { style: { margin: 0, fontSize: '21px' } }, 'Am Ende der Stunde lieferst du dein Material ab und bekommst deinen Zwergenpass.'),
        h('button', { class: 'knopf', onclick: () => f.schliessen() }, 'Los geht’s!'),
      ]);
      ZI.vorlesen('Willkommen! Ich bin Meisterin Hammerlind. Hier in der Schmiede schmieden wir Argumente.');
    }
  }

  /* =========================================================
     SPIEL-RAHMEN mit Bühne (Amboss, Hammer, Meisterin)
     ========================================================= */
  function buehne(werkstueck) {
    const blase = h('div', { class: 'meisterin-blase pergament', role: 'status', 'aria-live': 'polite' });
    const meisterinBox = h('div', { class: 'meisterin' }, bild('meisterin-erklaert', 'Meisterin Hammerlind'));
    let wsDatei = werkstueck;
    const ws = h('div', { class: 'werkstueck' }, bild(werkstueck, 'Werkstück'));
    const hammer = h('div', { class: 'hammer' }, bild('hammer', 'Hammer'));
    const platz = h('div', { class: 'amboss-platz' },
      h('div', { class: 'amboss' }, bild('amboss', 'Amboss')), ws, hammer);
    const el = h('div', { class: 'buehne' }, blase, h('div', { class: 'meisterin-reihe' }, meisterinBox, platz));

    return {
      el,
      sage(text, pose) {
        blase.textContent = text;
        ZI.setze(meisterinBox, bild('meisterin-' + (pose || 'erklaert'), 'Meisterin Hammerlind'));
      },
      person(datei) {
        platz.classList.add('person');
        if (datei === wsDatei) return;
        wsDatei = datei;
        ws.classList.remove('neu'); void ws.offsetWidth;
        ZI.setze(ws, bild(datei, 'Ratsmitglied'));
        ws.classList.add('neu');
      },
      werkstueck(datei) {
        platz.classList.remove('person');
        if (datei === wsDatei) return;
        wsDatei = datei;
        ws.classList.remove('neu'); void ws.offsetWidth;
        ZI.setze(ws, bild(datei, 'Werkstück'));
        ws.classList.add('neu');
      },
      schlag(danach) {
        hammer.classList.remove('schlag'); void hammer.offsetWidth;
        hammer.classList.add('schlag');
        setTimeout(() => {
          ZI.ton.amboss();
          const r = platz.getBoundingClientRect();
          ZI.funken(platz, r.width / 2, r.height * 0.45, 22);
          const b = h('div', { class: 'blitz' }); platz.appendChild(b); setTimeout(() => b.remove(), 520);
          danach && danach();
        }, 300);
      },
    };
  }

  function spielRahmen({ titel, anzahl, aufgabe, bue }) {
    fehlerZaehler = 0; kombo = 0;
    const pips = h('div', { class: 'fortschritt', 'aria-hidden': 'true' });
    const setze = (fertig) => {
      ZI.setze(pips, ...Array.from({ length: anzahl }, (_, i) => h('span', { class: i < fertig ? 'voll' : i === fertig ? 'jetzt' : '' })));
    };
    setze(0);
    const screen = h('div', { class: 'screen' },
      ZI.hintergrund('schmiede-hintergrund', 'hg-ersatz-schmiede', 'rgba(20,12,8,0.2)'),
      h('div', { class: 'glut-flackern', 'aria-hidden': 'true' }),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Halle', onclick: () => bestaetigen('Station verlassen?', 'Ja, verlassen', () => zeigeHalle()) }, icon.zurueck()),
        h('div', null, h('div', { class: 'titel' }, titel), pips),
        h('div', { class: 'spacer' }),
        h('div', { class: 'kombo', hidden: true, 'aria-live': 'polite' }),
        tonKnopf()),
      h('div', { class: 'spiel' }, aufgabe, bue.el));
    zeige(screen);
    return { fortschritt: setze };
  }

  function aufgabenKopf(frageText, vorleseText, tippText, bue) {
    return h('div', { class: 'frage' },
      h('button', { class: 'rund', 'aria-label': 'Vorlesen', onclick: () => ZI.vorlesen(typeof vorleseText === 'function' ? vorleseText() : vorleseText) }, icon.vorlesen()),
      h('button', { class: 'rund gold', 'aria-label': 'Laterne: Tipp anzeigen', onclick: () => { bue.sage(tippText, 'tipp'); ZI.vorlesen(tippText); } }, icon.laterne()),
      h('span', null, frageText));
  }

  /* Station oder Stollen geschafft */
  function geschafft({ titel, text, datei, alt, eintragen }) {
    ZI.ton.fanfare();
    ZI.konfetti();
    const st = aktStation;
    const krone = st && st.art === 'kern' && fehlerZaehler === 0;
    const schonKrone = krone && stand.hatKrone(st.k, st.i);
    const z = aktuellerZwerg();
    const f = ZI.fenster([
      h('div', { class: 'geschafft-reihe' },
        h('div', { class: 'gross-bild strahlen' }, bild(datei, alt)),
        h('div', { class: 'huepf-zwerg' }, bild([z.datei + '-jubel', z.datei], z.name))),
      h('h2', null, titel),
      h('p', { style: { margin: 0, fontSize: '21px' } }, text),
      krone ? h('div', { class: 'krone-info' }, ZI.bildOder('krone', 'Krone', icon.krone()), h('span', null, schonKrone ? 'Wieder fehlerfrei – deine goldene Krone glänzt!' : 'Ganz ohne Fehler! Dafür bekommst du eine goldene Krone.')) : null,
      h('button', { class: 'knopf', onclick: () => { f.schliessen(); fortschritt((s) => { eintragen(s); if (krone) s.setzeKrone(st.k, st.i); }, () => zeigeHalle()); } }, 'Zurück zur Halle'),
    ]);
  }

  /* ---------- Ränge und Abzeichen ---------- */
  function abzeichenFrei(s) {
    const x = { wissen: wissenFrei(s).length };
    return ZI.ABZEICHEN.filter((a) => a.test(s, x));
  }
  function medaille(a, frei) {
    const name = ZI.abzeichenName(a, stand);
    return h('div', { class: 'medaille ' + a.stufe + (frei ? '' : ' gesperrt') },
      h('div', { class: 'medaille-rund' + (frei ? ' mit-bild' : '') }, frei ? ZI.bildOder('abzeichen-' + a.id, name, h('span', { class: 'medaille-symbol' }, icon[a.symbol]())) : h('span', null, '?')),
      h('div', { class: 'medaille-name' }, frei ? name : '???'),
      h('div', { class: 'medaille-text' }, a.text));
  }
  /* Alle Belohnungen einer Station in EINEM Fenster: Wissensbuch, Rang, Abzeichen */
  function zeigeErfolge(neuerRang, abzeichen, seiten, danach) {
    seiten = seiten || [];
    if (!neuerRang && !abzeichen.length && !seiten.length) { danach && danach(); return; }
    if (neuerRang || abzeichen.length) { ZI.ton.fanfare(); ZI.konfetti(120); }
    const f = ZI.fenster([
      seiten.length ? h('div', { class: 'belohnung-seiten' },
        h('h2', { style: { fontSize: '26px' } }, seiten.length === 1 ? 'Neue Seite im Wissensbuch!' : seiten.length + ' neue Seiten im Wissensbuch!'),
        ...seiten.map((w) => seitenKarte(w, true))) : null,
      neuerRang ? h('div', { class: 'rang-neu' },
        h('div', { style: { fontSize: '18px', color: 'var(--tinte-hell)' } }, 'Neuer Rang!'),
        h('h2', null, neuerRang.name),
        h('div', { class: 'rang-emblem-reihe' },
          ZI.bildOder('rang-' + (neuerRang.nr + 1), neuerRang.name, null, 'rang-emblem'),
          h('div', { class: 'huepf-zwerg gross' }, bild([aktuellerZwerg().datei + '-jubel', aktuellerZwerg().datei], aktuellerZwerg().name)))) : null,
      abzeichen.length ? h('h2', { style: { fontSize: '28px' } }, abzeichen.length === 1 ? 'Neues Abzeichen!' : abzeichen.length + ' neue Abzeichen!') : null,
      abzeichen.length ? h('div', { class: 'medaillen' }, abzeichen.map((a) => medaille(a, true))) : null,
      h('div', { class: 'fenster-fuss' }, h('button', { class: 'knopf', onclick: () => { f.schliessen(); danach && danach(); } }, 'Weiter')),
    ]);
    const teile = (seiten.length ? 1 : 0) + (neuerRang ? 1 : 0) + (abzeichen.length ? 1 : 0);
    if (teile > 1) f.el.classList.add('erfolge-kompakt');
  }
  function zeigeAlbum() {
    const frei = abzeichenFrei(stand);
    const rang = ZI.rang(stand);
    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('stollen-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.45)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Halle', onclick: () => zeigeHalle() }, icon.zurueck()),
        h('div', null,
          h('div', { class: 'titel' }, 'Abzeichen-Album'),
          h('div', { class: 'untertitel' }, frei.length + ' von ' + ZI.ABZEICHEN.length + ' Abzeichen · Rang: ' + rang.name))),
      h('div', { class: 'screen-scroll', style: { position: 'relative', zIndex: 2 } },
        h('div', { class: 'halle-inhalt' },
          h('section', { class: 'pergament auf-pergament stollen' },
            h('div', { class: 'rang-kopf' }, ZI.bildOder('rang-' + (rang.nr + 1), rang.name, null, 'rang-emblem'), h('h2', null, 'Dein Rang: ' + rang.name)),
            h('p', { class: 'erklaer' }, rang.naechsterName ? 'Noch ' + (rang.naechsterAb - rang.punkte) + ' Punkte bis „' + rang.naechsterName + '“. Punkte gibt es für jede Station, jeden Tiefen Stollen, jeden Bonusstern und jede goldene Krone.' : 'Du hast den höchsten Rang erreicht!'),
            h('div', { class: 'rang-leiter' }, ZI.RAENGE.map((r, i) => h('div', { class: 'stufe' + (i <= rang.nr ? ' erreicht' : '') + (i === rang.nr ? ' jetzt' : '') },
              h('span', { class: 'stufe-punkte' }, String(r.ab)), h('span', null, aktuellerZwerg().w ? r.w : r.m))))),
          h('section', { class: 'pergament auf-pergament stollen' },
            h('h2', null, 'Abzeichen'),
            h('div', { class: 'medaillen' }, ZI.ABZEICHEN.map((a) => medaille(a, frei.includes(a)))))))));
  }
  function musikKnopf() {
    const b = h('button', { class: 'rund' + (ZI.musik.an ? ' gold' : ''), 'aria-label': 'Musik an oder aus', 'aria-pressed': String(ZI.musik.an) }, icon.musik());
    b.addEventListener('click', () => { const an = ZI.musik.umschalten(); b.classList.toggle('gold', an); b.setAttribute('aria-pressed', String(an)); });
    return b;
  }

  /* =========================================================
     Auswahlspiel: eine richtige Antwort aus mehreren
     (Stumpf oder scharf? · Fehlerjagd · Beispiel-Edelstein)
     ========================================================= */
  function auswahlSpiel({ titel, frageText, items, tipp, wsVorher, wsNachher, start, ende, boss, fest, leiste }) {
    const L = leiste || (boss ? { text: 'Kobold-Kraft', wachsen: false } : null);
    const breite = (n) => ((L && L.wachsen ? n : items.length - n) / items.length) * 100 + '%';
    const bue = buehne(wsVorher);
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel, anzahl: items.length, aufgabe: box, bue });
    let nr = 0;
    bue.sage(start, 'erklaert');

    function zeigeItem() {
      const it = items[nr];
      if (it.ws) bue.person(it.ws); else if (/^kobold/.test(wsVorher)) bue.person(wsVorher); else bue.werkstueck(wsVorher);
      let fehler = 0;
      let geloest = false;
      const rueck = h('div');
      const optEls = [];
      const weiter = h('button', { class: 'knopf', style: { display: 'none', alignSelf: 'flex-end' } }, nr + 1 < items.length ? 'Weiter' : 'Fertig!');
      weiter.addEventListener('click', () => {
        nr++;
        rahmen.fortschritt(nr);
        if (nr < items.length) zeigeItem(); else ende();
      });
      const opts = fest ? it.optionen.slice() : mischen(it.optionen);
      opts.forEach((o) => {
        const b = h('button', { class: 'option' }, o.text);
        b.addEventListener('click', () => {
          if (geloest || b.classList.contains('weg')) return;
          if (o.ok) {
            geloest = true;
            b.classList.add('richtig');
            ZI.ton.richtig();
            const lob = zufall(ZI.LOB);
            ZI.setze(rueck, h('div', { class: 'rueckmeldung gut' }, h('b', null, lob + ' '), o.info || ''));
            bue.sage(lob, 'jubelt');
            bue.schlag(() => { if (!it.ws) bue.werkstueck(boss ? (nr + 1 < items.length ? 'kobold-frech' : wsNachher) : wsNachher); });
            if (kraft) kraft.querySelector('.balken div').style.width = breite(nr + 1);
            optEls.forEach((x) => { if (x !== b) x.classList.add('weg'); });
            weiter.style.display = '';
          } else {
            fehler++;
            b.classList.remove('falsch'); void b.offsetWidth; b.classList.add('falsch');
            ZI.ton.falsch();
            ZI.setze(rueck, h('div', { class: 'rueckmeldung schlecht' }, o.info || zufall(ZI.TROST)));
            bue.sage(boss ? 'Der Kobold kichert! Lass dich nicht ärgern – versuch es noch einmal.' : (L && L.wachsen ? 'Hm, das überzeugt noch nicht. Versuch es anders.' : zufall(ZI.TROST)), 'ermutigt');
            setTimeout(() => b.classList.add('weg'), 450);
            if (fehler >= 2) {
              bue.sage('Ich helfe dir: Eine Möglichkeit bleibt übrig. Lies sie dir genau durch.', 'tipp');
              optEls.forEach((x, i) => { if (!opts[i].ok) x.classList.add('weg'); });
            }
          }
        });
        optEls.push(b);
      });
      const vorlese = () => [it.frage || '', it.vorher || '', it.kopf || '', ...opts.map((o) => o.text)].join('. ');
      const kraft = L ? h('div', { class: 'boss-leiste', 'aria-label': L.text },
        h('span', null, L.text), h('div', { class: 'balken ' + (L.wachsen ? 'ueberzeugung' : 'boss') }, h('div', { style: { width: breite(nr) } }))) : null;
      ZI.setze(box,
        kraft,
        aufgabenKopf(it.frage || frageText, vorlese, tipp, bue),
        it.vorher ? h('div', { class: 'zitat' }, it.vorher) : null,
        it.kopf ? h('div', { class: 'meinung' }, it.kopf) : null,
        h('div', { class: 'optionen' }, optEls),
        rueck, weiter);
    }
    zeigeItem();
  }

  /* Station 1 */
  function spielStumpfScharf() {
    auswahlSpiel({
      titel: 'Stumpf oder scharf?',
      frageText: 'Welche Begründung ist scharf wie eine gute Axt?',
      items: mischen(ZI.STUMPF_SCHARF).slice(0, 6).map((it) => ({ kopf: it.meinung, optionen: it.optionen.map((o) => ({ text: o.text, ok: o.scharf, info: o.info })) })),
      tipp: ZI.TIPPS.stumpf,
      wsVorher: 'axt-stumpf', wsNachher: 'axt-scharf',
      start: 'Eine scharfe Begründung erklärt, WARUM. Eine stumpfe sagt nur dasselbe noch einmal.',
      ende: () => geschafft({ titel: 'Station geschafft!', text: 'Du hast alle Äxte geschärft. Dafür bekommt das Dorf Holz.', datei: 'holz', alt: 'Holz',
        eintragen: (s) => s.setzeKern(K, 0) }),
    });
  }

  /* Tiefer Stollen 1 */
  function spielFehlerjagd() {
    auswahlSpiel({
      titel: 'Fehlerjagd',
      frageText: 'Der Fehlerkobold hat zwei Sätze verbogen. Welcher Satz ist richtig?',
      items: mischen(ZI.FEHLERJAGD).slice(0, 5).map((it) => ({ kopf: '', optionen: it.saetze.map((o) => ({ text: o.text, ok: o.ok, info: o.info })) })),
      tipp: ZI.TIPPS.fehler,
      wsVorher: 'kobold-chaos', wsNachher: 'kobold-besiegt',
      start: 'Achtung, der Fehlerkobold war hier! Prüfe Komma und Verb.',
      ende: () => geschafft({ titel: 'Kobold besiegt!', text: 'Du hast alle Fehler gefunden. Dafür bekommst du ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine.', datei: 'edelstein', alt: 'Edelstein',
        eintragen: (s) => s.setzeTief(K, 0) }),
    });
  }

  /* Tiefer Stollen 2 */
  function spielBeispiele() {
    auswahlSpiel({
      titel: 'Beispiel-Edelstein',
      frageText: 'Welches Beispiel macht das Argument noch stärker?',
      items: mischen(ZI.BEISPIELE).slice(0, 4).map((it) => ({ kopf: it.argument, optionen: it.optionen })),
      tipp: ZI.TIPPS.beispiel,
      wsVorher: 'eisen-roh', wsNachher: 'edelstein',
      start: 'Ein gutes Beispiel zeigt, dass deine Begründung stimmt – wie ein Edelstein im Griff deiner Axt.',
      ende: () => geschafft({ titel: 'Stollen geschafft!', text: 'Du kennst dich mit Beispielen aus. Dafür bekommst du ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine.', datei: 'edelstein', alt: 'Edelstein',
        eintragen: (s) => s.setzeTief(K, 1) }),
    });
  }

  /* =========================================================
     Sortierspiel: jede Karte in eine von zwei Gruppen
     (Erz oder Schlacke? · Motor oder Bremse?)
     ========================================================= */
  function sortierSpiel({ titel, runden, jaText: jaT, neinText: neinT, frageText: frageT, tipp, start, wsVorher, wsNachher, rundeFertig: rundeF, falschJa: falschJ, falschNein: falschN, ende }) {
    const bue = buehne(wsVorher);
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel, anzahl: runden.length, aufgabe: box, bue });
    bue.sage(start, 'erklaert');
    let r = 0;

    function runde() {
      const rd = runden[r];
      // eine Runde darf eigene Beschriftungen haben (z. B. „begründet / nicht begründet“)
      const jaText = rd.jaText || jaT; const neinText = rd.neinText || neinT; const frageText = rd.frage || frageT;
      const falschJa = rd.falschJa || falschJ; const falschNein = rd.falschNein || falschN; const rundeFertig = rd.rundeFertig || rundeF;
      const karten = mischen(rd.karten);
      let i = 0;
      bue.werkstueck(wsVorher);
      const karteBox = h('div');
      const rueck = h('div');
      const koerbe = h('div', { class: 'koerbe' });
      const knoepfe = h('div', { class: 'erz-knoepfe' });
      const jaKnopf = h('button', { class: 'knopf' }, jaText);
      const neinKnopf = h('button', { class: 'knopf schlacke' }, neinText);
      knoepfe.append(jaKnopf, neinKnopf);
      let sperre = false;

      const zeigeKarte = () => ZI.setze(karteBox, h('div', { class: 'erz-karte' }, karten[i].text));
      function antwort(alsJa) {
        if (sperre) return;
        const g = karten[i];
        const karte = karteBox.firstChild;
        if (alsJa === g.ja) {
          sperre = true;
          ZI.ton.richtig();
          ZI.setze(rueck, h('div', { class: 'rueckmeldung gut' }, g.info));
          bue.sage(zufall(ZI.LOB), 'jubelt');
          koerbe.appendChild(h('span', { class: 'marke' + (g.ja ? '' : ' grau') }, (g.ja ? jaText : neinText) + ': ' + g.text.replace('… ', '').slice(0, 60) + (g.text.length > 62 ? '…' : '')));
          karte.classList.add(g.ja ? 'weg-erz' : 'weg-schlacke');
          if (g.ja) bue.schlag();
          setTimeout(() => {
            sperre = false; i++;
            if (i < karten.length) { zeigeKarte(); ZI.setze(rueck); return; }
            bue.werkstueck(wsNachher);
            bue.sage(rundeFertig, 'jubelt');
            r++; rahmen.fortschritt(r);
            ZI.setze(knoepfe, h('button', { class: 'knopf', style: { gridColumn: 'span 2' }, onclick: () => (r < runden.length ? runde() : ende()) },
              r < runden.length ? 'Weiter' : 'Fertig!'));
          }, 900);
        } else {
          ZI.ton.falsch();
          karte.style.animation = 'wackeln 0.4s';
          setTimeout(() => { karte.style.animation = ''; }, 420);
          ZI.setze(rueck, h('div', { class: 'rueckmeldung schlecht' }, g.info));
          bue.sage(alsJa ? falschJa : falschNein, 'ermutigt');
        }
      }
      jaKnopf.addEventListener('click', () => antwort(true));
      neinKnopf.addEventListener('click', () => antwort(false));

      ZI.setze(box,
        aufgabenKopf(frageText, () => rd.kopf + ' ' + karten[i].text, tipp, bue),
        h('div', { class: 'meinung' }, rd.kopf),
        karteBox, knoepfe, rueck, koerbe);
      zeigeKarte();
    }
    runde();
  }

  /* Kapitel 1, Station 2 */
  function spielErz() {
    sortierSpiel({
      titel: 'Erz oder Schlacke?',
      runden: [ZI.zufall(ZI.BEGRUENDET_RUNDEN)].concat(mischen(ZI.ERZ_SCHLACKE).slice(0, 2).map((rd) => ({ kopf: rd.meinung, karten: rd.gruende.map((g) => ({ text: g.text, ja: g.erz, info: g.info })) }))),
      jaText: 'Erz', neinText: 'Schlacke',
      frageText: 'Passt die Begründung zur Meinung? Erz oder Schlacke?',
      tipp: ZI.TIPPS.erz,
      start: 'Zuerst prüfen wir: Ist eine Meinung überhaupt begründet? Danach trennen wir Erz – passende Begründungen – von Schlacke.',
      wsVorher: 'eisen-roh', wsNachher: 'eisen-gluehend',
      rundeFertig: 'Das Erz glüht! Diese Meinung ist gut begründet.',
      falschJa: 'Hm, passt dieser Grund wirklich zur Meinung?',
      falschNein: 'Schau noch einmal: Erklärt dieser Grund nicht doch etwas?',
      ende: () => geschafft({ titel: 'Station geschafft!', text: 'Du hast das ganze Erz sortiert. Dafür bekommt das Dorf Stein.', datei: 'stein', alt: 'Stein', eintragen: (s) => s.setzeKern(K, 1) }),
    });
  }

  /* Kapitel 2, Station 2 */
  function spielMotor() {
    sortierSpiel({
      titel: 'Motor oder Bremse?',
      runden: mischen(ZI.MOTOR_BREMSE).slice(0, 2).map((rd) => ({ kopf: rd.thema, karten: rd.beitraege.map((g) => ({ text: g.text, ja: g.motor, info: g.info })) })),
      jaText: 'Motor', neinText: 'Bremse',
      frageText: 'Bringt dieser Beitrag das Gespräch weiter (Motor) oder stoppt er es (Bremse)?',
      tipp: ZI.TIPPS.motor,
      start: 'Im Zwergenrat wird viel geredet. Manche Beiträge treiben das Gespräch an wie ein Motor, andere bremsen es.',
      wsVorher: 'schleifstein', wsNachher: 'schleifstein',
      rundeFertig: 'Das Gespräch läuft wieder rund!',
      falschJa: 'Hilft dieser Beitrag dem Gespräch wirklich weiter?',
      falschNein: 'Schau genau: Bringt dieser Beitrag das Gespräch nicht doch voran?',
      ende: () => geschafft({ titel: 'Station geschafft!', text: 'Du erkennst Motoren und Bremsen. Dafür bekommt das Dorf Stein.', datei: 'stein', alt: 'Stein', eintragen: (s) => s.setzeKern(K, 1) }),
    });
  }

  /* =========================================================
     Station 3: Weil-Denn-Amboss
     ========================================================= */
  function spielWeilDenn() {
    const items = mischen(ZI.WEIL_DENN).slice(0, 6);
    const bue = buehne('eisen-roh');
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel: 'Weil-Denn-Amboss', anzahl: items.length, aufgabe: box, bue });
    bue.sage(ZI.TIPPS.weil, 'erklaert');
    let nr = 0;
    let muendlichGesagt = false;

    function item() {
      const it = items[nr];
      let gelegt = [];
      let vorrat = mischen(it.kacheln);
      let fehler = 0;
      let fertig = false;
      bue.werkstueck('eisen-roh');
      const zeile = h('div', { class: 'satzzeile', 'aria-label': 'Dein Satz' });
      const vorratBox = h('div', { class: 'vorrat', 'aria-label': 'Wortbausteine' });
      const rueck = h('div');
      const weiter = h('button', { class: 'knopf', style: { display: 'none', alignSelf: 'flex-end' } }, nr + 1 < items.length ? 'Weiter' : 'Fertig!');
      weiter.addEventListener('click', () => {
        nr++; rahmen.fortschritt(nr);
        if (nr < items.length) item();
        else geschafft({ titel: 'Station geschafft!', text: 'Deine Begründungssätze sitzen. Dafür bekommt das Dorf Eisen.', datei: 'eisen', alt: 'Eisen', eintragen: (s) => s.setzeKern(K, 2) });
      });

      function zeichne(markiereVerb) {
        ZI.setze(zeile, 
          h('div', { class: 'platte fest' }, it.haupt),
          h('div', { class: 'platte bindewort' }, it.bindewort),
          ...gelegt.map((w, i) => {
            const b = h('button', { class: 'platte' + (markiereVerb && w === it.verb ? ' verb-markiert' : '') }, w);
            b.addEventListener('click', () => { if (fertig) return; gelegt.splice(i, 1); vorrat.push(w); ZI.ton.plopp(); ZI.setze(rueck, ); zeichne(); });
            return b;
          }),
          ...vorrat.map(() => h('div', { class: 'platte leer', 'aria-hidden': 'true' })));
        ZI.setze(vorratBox, ...vorrat.map((w, i) => {
          const b = h('button', { class: 'platte' }, w);
          b.addEventListener('click', () => {
            if (fertig) return;
            vorrat.splice(i, 1); gelegt.push(w); ZI.ton.plopp(); zeichne();
            if (!vorrat.length) pruefen();
          });
          return b;
        }));
        if (!vorrat.length && !fertig) ZI.setze(vorratBox, h('span', { style: { fontSize: '17px', color: 'var(--tinte-hell)' } }, 'Tippe einen Baustein im Satz an, um ihn zurückzulegen.'));
      }

      function pruefen() {
        const ok = it.loesungen.some((l) => l.join('|') === gelegt.join('|'));
        if (ok) {
          fertig = true;
          ZI.ton.richtig();
          const satz = it.haupt + ' ' + it.bindewort + ' ' + gelegt.join(' ');
          ZI.setze(rueck, h('div', { class: 'rueckmeldung gut' }, h('b', null, zufall(ZI.LOB) + ' '), satz));
          bue.sage(it.bindewort === 'denn' ? 'Richtig: Nach „denn“ steht das Verb an zweiter Stelle.' : 'Richtig: Nach „' + it.bindewort + '“ steht das Verb am Ende.', 'jubelt');
          bue.werkstueck('eisen-gluehend');
          setTimeout(() => bue.schlag(() => bue.werkstueck('hammer')), 400);
          zeichne(true);
          ZI.setze(vorratBox, );
          weiter.style.display = '';
          if (!muendlichGesagt && it.bindewort === 'weil') {
            muendlichGesagt = true;
            setTimeout(() => bue.sage(ZI.TIPPS.weilMuendlich, 'tipp'), 2600);
          }
          return;
        }
        fehler++;
        ZI.ton.falsch();
        const pos = gelegt.indexOf(it.verb);
        let text;
        if (it.bindewort === 'denn' && pos !== 1) text = 'Nach „denn“ kommt ein ganz normaler Satz: Das Verb „' + it.verb.replace('.', '') + '“ steht an zweiter Stelle.';
        else if (it.bindewort !== 'denn' && pos !== gelegt.length - 1) text = 'Nach „' + it.bindewort + '“ wandert das gebeugte Verb „' + it.verb.replace('.', '') + '“ ganz ans Ende.';
        else text = 'Das Verb steht richtig! Aber die anderen Wörter klingen noch holprig. Sprich den Satz einmal leise vor dich hin.';
        if (fehler >= 2) {
          gelegt = it.loesungen[0].slice(); vorrat = [];
          fertig = true;
          ZI.setze(rueck, h('div', { class: 'rueckmeldung tipp' }, 'So klingt der Satz richtig. Lies ihn einmal laut vor: ', h('b', null, it.haupt + ' ' + it.bindewort + ' ' + gelegt.join(' '))));
          bue.sage('Ich habe dir den Satz einmal vorgemacht. Schau, wo das Verb steht.', 'tipp');
          bue.werkstueck('eisen-gluehend');
          zeichne(true); ZI.setze(vorratBox, );
          weiter.style.display = '';
          return;
        }
        ZI.setze(rueck, h('div', { class: 'rueckmeldung schlecht' }, text));
        bue.sage('Fast! Das Verb ist leuchtend markiert.', 'ermutigt');
        zeichne(true);
      }

      ZI.setze(box, 
        aufgabenKopf('Bau den Begründungssatz. Tippe die Bausteine in der richtigen Reihenfolge an.', () => it.haupt + ' ' + it.bindewort + ' … Bausteine: ' + it.kacheln.join(', '), ZI.TIPPS.weil, bue),
        zeile, vorratBox, rueck, weiter);
      zeichne();
    }
    item();
  }

  /* =========================================================
     Tiefer Stollen 3: Meisterstück (mündlich mit Partner)
     ========================================================= */
  function spielMeisterstueck(stufe) {
    const zwei = stufe === 2;
    const drei = stufe === 3;
    const tippText = drei ? ZI.TIPPS.meister3 : zwei ? ZI.TIPPS.meister2 : ZI.TIPPS.meister;
    const bue = buehne('eisen-roh');
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel: drei ? 'Streitgespräch' : zwei ? 'Meisterstück II' : 'Meisterstück', anzahl: 4, aufgabe: box, bue });
    let thema = null; let satz = null;

    function schritt1() {
      rahmen.fortschritt(0);
      bue.sage(drei ? 'Für das Streitgespräch braucht ihr zwei: Partner A und Partner B. Wählt zuerst ein Thema.' : 'Für ein Meisterstück brauchst du eine Partnerin oder einen Partner. Wähle zuerst ein Thema.', 'erklaert');
      const angebot = mischen(ZI.MEISTER_THEMEN).slice(0, 4);
      ZI.setze(box, 
        aufgabenKopf('Worüber möchtest du argumentieren?', angebot.map((t) => t.frage).join(' '), tippText, bue),
        h('div', { class: 'themen' }, angebot.map((t) => h('button', { class: 'option', onclick: () => { thema = t; ZI.ton.plopp(); schritt2(); } }, t.frage))));
    }
    function schritt2() {
      rahmen.fortschritt(1);
      bue.sage(drei ? 'Partner A: Bist du dafür oder dagegen? Partner B vertritt dann die andere Seite.' : 'Bist du dafür oder dagegen? Beides ist erlaubt – Hauptsache, du begründest gut.', 'erklaert');
      ZI.setze(box, 
        aufgabenKopf('Deine Meinung:', thema.frage, tippText, bue),
        h('div', { class: 'meinung' }, thema.frage),
        h('div', { class: 'erz-knoepfe' },
          h('button', { class: 'knopf moos', onclick: () => { satz = thema.dafuer; schritt3(); } }, 'Dafür'),
          h('button', { class: 'knopf holz', onclick: () => { satz = thema.dagegen; schritt3(); } }, 'Dagegen')));
    }
    function schritt3() {
      rahmen.fortschritt(2);
      bue.werkstueck('eisen-gluehend');
      if (drei) {
        bue.sage('Partner A sagt die Meinung mit Begründung. Partner B hört zu, wiederholt sie und widerspricht freundlich.', 'tipp');
        ZI.setze(box,
          aufgabenKopf('Führt das Streitgespräch. Lasst euch ausreden!', satz + ' Partner B: Du sagst, dass … Aber …', tippText, bue),
          h('div', { class: 'teile' },
            h('div', { class: 'teil teil-these' }, h('span', { class: 'teil-name' }, 'A'), h('span', null, satz)),
            h('div', { class: 'teil teil-begruendung' }, h('span', { class: 'teil-name' }, 'B'), h('span', null, '„Du sagst, dass … Aber ich finde, dass …, weil …“'))),
          h('p', { style: { margin: 0, fontSize: '19px' } }, 'Wenn ihr mögt, antwortet A noch einmal: „Ja, aber …“ oder „Da hast du recht, …“'),
          h('button', { class: 'knopf', style: { alignSelf: 'flex-end' }, onclick: schritt4 }, 'Wir haben gesprochen – jetzt prüfen'));
        return;
      }
      bue.sage(zwei ? 'Diesmal brauchst du alle drei Teile: deine Meinung, eine Begründung und ein passendes Beispiel („Zum Beispiel …“).'
        : 'Überlege dir eine Begründung, die erklärt, WARUM. Wenn du magst, denk dir auch ein Beispiel aus: „Zum Beispiel …“', 'tipp');
      ZI.setze(box, 
        aufgabenKopf('Bereite dich vor. Dann sag deinen Satz laut zu deinem Partner.', satz, tippText, bue),
        h('div', { class: 'sprechblase-gross' }, satz, zwei ? h('div', { style: { marginTop: '10px', color: 'var(--tinte-hell)' } }, 'Zum Beispiel …') : null),
        h('p', { style: { margin: 0, fontSize: '19px' } }, 'Sprich in ganzen Sätzen. Dein Partner hört genau zu und prüft danach ' + (zwei ? 'vier' : 'drei') + ' Dinge.'),
        h('button', { class: 'knopf', style: { alignSelf: 'flex-end' }, onclick: schritt4 }, 'Ich habe es gesagt – iPad weitergeben'));
    }
    function schritt4() {
      rahmen.fortschritt(3);
      bue.sage(drei ? 'Prüft jetzt gemeinsam, was geklappt hat. Seid ehrlich – das hilft am meisten.' : 'Jetzt bist du dran, Partnerin oder Partner! Was hast du gehört? Sei ehrlich – das hilft am meisten.', 'erklaert');
      const punkte = drei ? [
        'A hat eine Meinung mit Begründung gesagt.',
        'B hat wiederholt, was A gesagt hat („Du sagst, dass …“).',
        'B hat ein Gegenargument gebracht („Aber …“).',
        'Wir haben uns ausreden lassen und sind freundlich geblieben.',
      ] : [
        'Ich habe die Meinung gehört („Ich finde, dass …“).',
        'Ich habe eine Begründung mit weil, da oder denn gehört.',
        'Die Begründung hat erklärt, WARUM – sie war scharf.',
      ];
      if (zwei) punkte.push('Ich habe ein Beispiel gehört, das zur Begründung passt („Zum Beispiel …“).');
      const an = punkte.map(() => false);
      const liste = h('div', { class: 'checkliste' });
      const fertigKnopf = h('button', { class: 'knopf', style: { alignSelf: 'flex-end' } }, 'Fertig geprüft');
      function zeichne() {
        ZI.setze(liste, ...punkte.map((p, i) => h('button', { class: 'check' + (an[i] ? ' an' : ''), 'aria-pressed': String(an[i]),
          onclick: () => { an[i] = !an[i]; ZI.ton.plopp(); zeichne(); } }, h('span', { class: 'kasten' }, an[i] ? icon.haken() : null), p)));
      }
      zeichne();
      fertigKnopf.addEventListener('click', () => {
        if (an.every(Boolean)) {
          bue.schlag(() => bue.werkstueck('axt-scharf'));
          setTimeout(() => geschafft({ titel: drei ? 'Starkes Streitgespräch!' : 'Meisterstück!', text: (drei ? 'Ihr habt zugehört, angeknüpft und widersprochen – wie echte Ratsmitglieder.' : 'Ein echtes Meisterstück – laut und gut begründet.') + ' Dafür bekommst du ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine.', datei: 'edelstein', alt: 'Edelstein',
            eintragen: (s) => s.setzeTief(K, 2) }), 900);
        } else {
          ZI.ton.falsch();
          bue.sage('Noch nicht ganz! Sagt euch, was gefehlt hat. Dann versucht es noch einmal.', 'ermutigt');
          box.appendChild(h('div', { class: 'rueckmeldung tipp' }, 'Gebt das iPad zurück. Probiert den Satz noch einmal – mit dem, was gefehlt hat.'));
          fertigKnopf.textContent = 'Noch einmal versuchen';
          fertigKnopf.onclick = null;
          fertigKnopf.addEventListener('click', schritt3, { once: true });
        }
      }, { once: true });
      ZI.setze(box, 
        aufgabenKopf(drei ? 'Gemeinsamer Check: Tippt an, was geklappt hat.' : 'Partner-Check: Tippe an, was du gehört hast.', punkte.join(' '), 'Hör genau hin. Fehlt etwas, sag es freundlich: „Mir hat noch gefehlt, …“', bue),
        h('div', { class: 'sprechblase-gross', style: { fontSize: '20px' } }, satz),
        liste, fertigKnopf);
    }
    schritt1();
  }

  /* =========================================================
     KAPITEL 2 – neue Spiele
     ========================================================= */

  /* Hilfe: Auswahl mit Rückmeldung, die sich mehrere Spiele teilen.
     Ruft fertig() auf, sobald die richtige Antwort angetippt wurde. */
  function optionenListe(optionen, { bue, rueck, falschText, fertig }) {
    const opts = mischen(optionen);
    let fehler = 0; let geloest = false;
    const els = opts.map((o) => {
      const b = h('button', { class: 'option' }, o.text);
      b.addEventListener('click', () => {
        if (geloest || b.classList.contains('weg')) return;
        if (o.ok) {
          geloest = true; b.classList.add('richtig'); ZI.ton.richtig();
          els.forEach((x) => { if (x !== b) x.classList.add('weg'); });
          fertig(o);
        } else {
          fehler++;
          b.classList.remove('falsch'); void b.offsetWidth; b.classList.add('falsch');
          ZI.ton.falsch();
          ZI.setze(rueck, h('div', { class: 'rueckmeldung schlecht' }, o.info || falschText || zufall(ZI.TROST)));
          bue.sage(zufall(ZI.TROST), 'ermutigt');
          setTimeout(() => b.classList.add('weg'), 450);
          if (fehler >= 2) { els.forEach((x, i) => { if (!opts[i].ok) x.classList.add('weg'); }); bue.sage('Ich helfe dir: Eine Möglichkeit bleibt übrig.', 'tipp'); }
        }
      });
      return b;
    });
    return { el: h('div', { class: 'optionen' }, els), texte: opts.map((o) => o.text) };
  }

  function teilZeile(art, text) {
    const namen = { these: 'Meinung', begruendung: 'Begründung', beispiel: 'Beispiel' };
    return h('div', { class: 'teil teil-' + art }, h('span', { class: 'teil-name' }, namen[art]), h('span', null, text));
  }

  /* Station 1: Argument-Puzzle */
  function spielPuzzle() {
    const schritte = [];
    mischen(ZI.PUZZLE).slice(0, 2).forEach((puzzle) => mischen(puzzle).forEach((arg) => schritte.push({ arg, puzzle })));
    const bue = buehne('runenplatte');
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel: 'Argument-Puzzle', anzahl: schritte.length, aufgabe: box, bue });
    bue.sage('Der Fehlerkobold hat drei Argumente auseinandergerissen. Setz sie wieder zusammen: Meinung, Begründung, Beispiel.', 'erklaert');
    let nr = 0;

    function schritt() {
      const { arg, puzzle } = schritte[nr];
      bue.werkstueck('runenplatte');
      const teile = h('div', { class: 'teile' }, teilZeile('these', arg.these));
      const rueck = h('div');
      const bereich = h('div');
      const weiter = h('button', { class: 'knopf', style: { display: 'none', alignSelf: 'flex-end' } }, nr + 1 < schritte.length ? 'Nächstes Argument' : 'Fertig!');
      weiter.addEventListener('click', () => { nr++; rahmen.fortschritt(nr); if (nr < schritte.length) schritt(); else ende(); });

      function waehle(art) {
        const frage = art === 'begruendung' ? 'Welche Begründung gehört zu dieser Meinung?' : 'Welches Beispiel passt dazu?';
        const liste = optionenListe(puzzle.map((a) => ({
          text: a[art], ok: a === arg,
          info: art === 'begruendung' ? 'Diese Begründung gehört zu einer anderen Meinung.' : 'Dieses Beispiel gehört zu einem anderen Argument.',
        })), { bue, rueck, fertig: () => {
          teile.appendChild(teilZeile(art, arg[art]));
          ZI.setze(rueck);
          if (art === 'begruendung') { bue.sage('Richtig! Jetzt fehlt noch das Beispiel.', 'jubelt'); waehle('beispiel'); }
          else {
            bue.sage(zufall(ZI.LOB) + ' Das Argument ist vollständig.', 'jubelt');
            bue.schlag(() => bue.werkstueck('axt-scharf'));
            ZI.setze(bereich);
            weiter.style.display = '';
          }
        } });
        ZI.setze(bereich, h('div', { class: 'frage', style: { fontWeight: 700 } }, frage), liste.el);
        kopf.vorlese = () => arg.these + ' ' + frage + ' ' + liste.texte.join('. ');
      }
      const kopf = { vorlese: () => arg.these };
      ZI.setze(box, aufgabenKopf('Setz das Argument zusammen.', () => kopf.vorlese(), ZI.TIPPS.puzzle, bue), teile, bereich, rueck, weiter);
      waehle('begruendung');
    }
    function ende() {
      geschafft({ titel: 'Station geschafft!', text: 'Alle Argumente sind wieder ganz. Dafür bekommt das Dorf Holz.', datei: 'holz', alt: 'Holz', eintragen: (s) => s.setzeKern(K, 0) });
    }
    schritt();
  }

  /* Station 3: Hör-Stollen */
  function spielHoeren() {
    const items = mischen(ZI.HOEREN).slice(0, 5);
    const bue = buehne('eisen-roh');
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel: 'Hör-Stollen', anzahl: items.length, aufgabe: box, bue });
    const kannVorlesen = 'speechSynthesis' in window;
    bue.sage(kannVorlesen ? 'Hier unten im Stollen ist es dunkel. Du kannst nichts lesen – nur hören. Tippe auf „Anhören“.' : 'Bitte deinen Partner, dir den Text vorzulesen. Schau dabei nicht hin!', 'erklaert');
    let nr = 0;

    function item() {
      const it = items[nr];
      let q = 0;
      bue.werkstueck('eisen-roh');
      const rueck = h('div');
      const bereich = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } });
      const textBox = h('div', { class: 'sprechblase-gross', hidden: true }, it.text);
      const anhoeren = h('button', { class: 'knopf gross-hoeren' }, icon.vorlesen(), 'Anhören');
      anhoeren.addEventListener('click', () => { ZI.vorlesen(it.text); anhoeren.classList.add('gehoert'); });
      const textZeigen = h('button', { class: 'knopf holz klein' }, kannVorlesen ? 'Kein Ton? Text zeigen' : 'Text für den Partner zeigen');
      textZeigen.addEventListener('click', () => { textBox.hidden = !textBox.hidden; });
      const weiter = h('button', { class: 'knopf', style: { display: 'none', alignSelf: 'flex-end' } }, nr + 1 < items.length ? 'Weiter' : 'Fertig!');
      weiter.addEventListener('click', () => { nr++; rahmen.fortschritt(nr); if (nr < items.length) item(); else ende(); });

      function frage() {
        const f = it.fragen[q];
        const liste = optionenListe(f.optionen, { bue, rueck, falschText: 'Das hast du so nicht gehört. Hör noch einmal hin!', fertig: () => {
          ZI.setze(rueck, h('div', { class: 'rueckmeldung gut' }, zufall(ZI.LOB)));
          q++;
          if (q < it.fragen.length) { bue.sage('Gut zugehört! Noch eine Frage.', 'jubelt'); setTimeout(() => { ZI.setze(rueck); frage(); }, 900); }
          else { bue.sage('Du hast genau zugehört!', 'jubelt'); bue.schlag(() => bue.werkstueck('eisen-gluehend')); weiter.style.display = ''; }
        } });
        ZI.setze(bereich, h('div', { class: 'frage', style: { fontWeight: 700, fontSize: '22px' } }, f.frage), liste.el);
      }
      ZI.setze(box,
        aufgabenKopf('Hör dir das Argument an. Danach beantwortest du Fragen dazu.', () => it.text, ZI.TIPPS.hoeren, bue),
        h('div', { style: { display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' } }, anhoeren, textZeigen),
        textBox, bereich, rueck, weiter);
      frage();
    }
    function ende() {
      geschafft({ titel: 'Station geschafft!', text: 'Du bist ein echter Zuhör-Zwerg. Dafür bekommt das Dorf Eisen.', datei: 'eisen', alt: 'Eisen', eintragen: (s) => s.setzeKern(K, 2) });
    }
    item();
  }

  /* Tiefer Stollen 1: Kobold-Kampf (gemischte Aufgaben aus Kapitel 1 und 2) */
  function spielBoss() {
    const teile = ['Meinung', 'Begründung', 'Beispiel'];
    const aufgaben = [
      ...mischen(ZI.STUMPF_SCHARF).slice(0, 2).map((it) => ({ frage: 'Welche Begründung ist scharf?', kopf: it.meinung,
        optionen: it.optionen.map((o) => ({ text: o.text, ok: o.scharf, info: o.info })) })),
      ...mischen(ZI.FEHLERJAGD).slice(0, 2).map((it) => ({ frage: 'Welcher Satz ist richtig?', kopf: '',
        optionen: it.saetze.map((o) => ({ text: o.text, ok: o.ok, info: o.info })) })),
      ...mischen(ZI.TEIL_ERKENNEN).slice(0, 3).map((it) => ({ frage: 'Welcher Teil des Arguments ist das?', kopf: it.satz,
        optionen: teile.map((t) => ({ text: t, ok: t === it.teil, info: ZI.TEIL_INFO[t] })) })),
      ...mischen(ZI.BEISPIELE).slice(0, 1).map((it) => ({ frage: 'Welches Beispiel passt?', kopf: it.argument, optionen: it.optionen })),
    ];
    auswahlSpiel({
      titel: 'Kobold-Kampf',
      frageText: 'Besiege den Fehlerkobold!',
      items: mischen(aufgaben),
      tipp: ZI.TIPPS.boss,
      wsVorher: 'kobold-chaos', wsNachher: 'kobold-besiegt',
      start: 'Da ist er wieder, der Fehlerkobold! Jede richtige Antwort ist ein Hammerschlag. Nach acht Treffern gibt er auf.',
      boss: true,
      ende: () => geschafft({ titel: 'Kobold besiegt!', text: 'Der Fehlerkobold gibt auf und verspricht, nie wieder Argumente durcheinanderzubringen. Dafür bekommst du ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine.', datei: 'kobold-besiegt', alt: 'Besiegter Kobold',
        eintragen: (s) => s.setzeTief(K, 0) }),
    });
  }

  /* Tiefer Stollen 2: Argument-Kette */
  function spielKette() {
    const items = mischen(ZI.KETTEN).slice(0, 3);
    const bue = buehne('eisen-roh');
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel: 'Argument-Kette', anzahl: items.length, aufgabe: box, bue });
    bue.sage('Ein starkes Argument hat Stützen – wie Glieder einer Kette. Suche die zwei Sätze, die das Hauptargument stützen.', 'erklaert');
    let nr = 0;

    function item() {
      const it = items[nr];
      const karten = mischen(it.stuetzen);
      const gewaehlt = new Set();
      let versuche = 0; let fertig = false;
      bue.werkstueck('eisen-roh');
      const rueck = h('div');
      const liste = h('div', { class: 'checkliste' });
      const pruefKnopf = h('button', { class: 'knopf', style: { alignSelf: 'flex-end' }, disabled: true }, 'Prüfen');
      const weiter = h('button', { class: 'knopf', style: { display: 'none', alignSelf: 'flex-end' } }, nr + 1 < items.length ? 'Weiter' : 'Fertig!');
      weiter.addEventListener('click', () => { nr++; rahmen.fortschritt(nr); if (nr < items.length) item(); else ende(); });

      function zeichne(markiereLoesung) {
        ZI.setze(liste, ...karten.map((k, i) => {
          const an = gewaehlt.has(i);
          const kl = 'check' + (an ? ' an' : '') + (markiereLoesung && k.ok ? ' an' : '');
          return h('button', { class: kl, 'aria-pressed': String(an), onclick: () => {
            if (fertig) return;
            if (an) gewaehlt.delete(i); else if (gewaehlt.size < 2) gewaehlt.add(i); else { ZI.meldung('Wähle genau zwei Stützen.'); return; }
            ZI.ton.plopp(); pruefKnopf.disabled = gewaehlt.size !== 2; zeichne();
          } }, h('span', { class: 'kasten' }, an || (markiereLoesung && k.ok) ? icon.haken() : null), k.text);
        }));
      }
      pruefKnopf.addEventListener('click', () => {
        const falsche = [...gewaehlt].filter((i) => !karten[i].ok);
        if (!falsche.length) {
          fertig = true; ZI.ton.richtig();
          ZI.setze(rueck, h('div', { class: 'rueckmeldung gut' }, h('b', null, zufall(ZI.LOB) + ' '), 'Beide Sätze stützen das Hauptargument und bauen darauf auf.'));
          bue.sage('Die Kette hält! So wird ein Argument richtig stark.', 'jubelt');
          bue.schlag(() => bue.werkstueck('eisen-gluehend'));
          pruefKnopf.style.display = 'none'; weiter.style.display = '';
          return;
        }
        versuche++; ZI.ton.falsch();
        ZI.setze(rueck, h('div', { class: 'rueckmeldung schlecht' }, falsche.map((i) => h('div', null, '„' + karten[i].text + '“ – ' + karten[i].info))));
        falsche.forEach((i) => gewaehlt.delete(i));
        pruefKnopf.disabled = true;
        if (versuche >= 2) {
          fertig = true;
          bue.sage('Ich zeige dir die beiden Stützen. Lies sie dir genau durch.', 'tipp');
          zeichne(true); pruefKnopf.style.display = 'none'; weiter.style.display = '';
          return;
        }
        bue.sage('Fast! Ein Satz mit „außerdem“ bringt meist ein neues Argument.', 'ermutigt');
        zeichne();
      });
      ZI.setze(box,
        aufgabenKopf('Welche zwei Sätze stützen das Hauptargument?', () => it.meinung + ' ' + it.haupt + ' ' + karten.map((k) => k.text).join('. '), ZI.TIPPS.kette, bue),
        h('div', { class: 'teile' }, teilZeile('these', it.meinung), teilZeile('begruendung', it.haupt)),
        liste, pruefKnopf, rueck, weiter);
      zeichne();
    }
    function ende() {
      geschafft({ titel: 'Stollen geschafft!', text: 'Deine Argument-Ketten halten. Dafür bekommst du ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine.', datei: 'edelstein', alt: 'Edelstein', eintragen: (s) => s.setzeTief(K, 1) });
    }
    item();
  }

  /* =========================================================
     KAPITEL 3 – neue Spiele
     ========================================================= */

  /* Station 1: Ja, und – ja, aber? */
  function spielJaUnd() {
    auswahlSpiel({
      titel: 'Ja, und – ja, aber?',
      frageText: 'Wie reagiert die zweite Person?',
      items: mischen(ZI.JA_UND).slice(0, 6).map((it) => ({ vorher: it.vorher, kopf: it.antwort,
        optionen: ZI.ARTEN.map((a) => ({ text: a, ok: a === it.art, info: ZI.ARTEN_INFO[a] })) })),
      fest: true,
      tipp: ZI.TIPPS.jaund,
      wsVorher: 'eisen-roh', wsNachher: 'eisen-gluehend',
      start: 'Im Zwergenrat antworten alle aufeinander. Manche stimmen zu und ergänzen, manche widersprechen – und manche reden über etwas ganz anderes.',
      ende: () => geschafft({ titel: 'Station geschafft!', text: 'Du erkennst, wie man auf andere eingeht. Dafür bekommt das Dorf Holz.', datei: 'holz', alt: 'Holz', eintragen: (s) => s.setzeKern(K, 0) }),
    });
  }

  /* Station 2: Wer hört zu? */
  function spielZuhoeren() {
    auswahlSpiel({
      titel: 'Wer hört zu?',
      frageText: 'Welche Antwort zeigt, dass jemand wirklich zugehört hat?',
      items: mischen(ZI.ZUHOEREN).slice(0, 6).map((it) => ({ vorher: it.vorher, optionen: it.optionen })),
      tipp: ZI.TIPPS.zuhoeren,
      wsVorher: 'eisen-roh', wsNachher: 'axt-scharf',
      start: 'Gute Zuhörer wiederholen richtig, was der andere gesagt hat, und gehen darauf ein. Pass auf Antworten auf, die etwas verdrehen!',
      ende: () => geschafft({ titel: 'Station geschafft!', text: 'Du bist ein echter Zuhör-Profi. Dafür bekommt das Dorf Stein.', datei: 'stein', alt: 'Stein', eintragen: (s) => s.setzeKern(K, 1) }),
    });
  }

  /* Station 3: Überzeug den Inselrat */
  function spielInselrat() {
    const items = [];
    mischen(ZI.INSELRAT).slice(0, 2).forEach((fall) => fall.einwaende.forEach((e) => items.push({
      frage: e.wer + ' hat einen Einwand. Was antwortest du?', vorher: fall.meinung, kopf: e.wer + ': ' + e.einwand, ws: e.datei, optionen: e.optionen })));
    auswahlSpiel({
      titel: 'Überzeug den Inselrat',
      frageText: 'Was antwortest du?',
      items,
      tipp: ZI.TIPPS.inselrat,
      wsVorher: 'eisen-roh', wsNachher: 'eisen-roh',
      leiste: { text: 'Überzeugung', wachsen: true },
      start: 'Der Inselrat muss deinen Vorschlag erst genehmigen. Grimbart und Amara haben Einwände. Antworte so, dass du sie überzeugst!',
      ende: () => geschafft({ titel: 'Der Inselrat ist überzeugt!', text: 'Du hast alle Einwände entkräftet. Dafür bekommt das Dorf Eisen.', datei: 'eisen', alt: 'Eisen', eintragen: (s) => s.setzeKern(K, 2) }),
    });
  }

  /* Tiefer Stollen 1: Gegenargument-Schmiede */
  function spielGegenargument() {
    auswahlSpiel({
      titel: 'Gegenargument-Schmiede',
      frageText: 'Welcher Satz ist ein echtes Gegenargument?',
      items: mischen(ZI.GEGENARGUMENTE).slice(0, 5).map((it) => ({ kopf: it.argument, optionen: it.optionen })),
      tipp: ZI.TIPPS.gegen,
      wsVorher: 'eisen-gluehend', wsNachher: 'axt-scharf',
      start: 'Ein Gegenargument spricht gegen eine Meinung. Wer Gegenargumente kennt, kann besser mitdiskutieren – und seine eigene Meinung prüfen.',
      ende: () => geschafft({ titel: 'Stollen geschafft!', text: 'Du schmiedest starke Gegenargumente. Dafür bekommst du ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine.', datei: 'edelstein', alt: 'Edelstein', eintragen: (s) => s.setzeTief(K, 0) }),
    });
  }

  /* Tiefer Stollen 2: Wer überzeugt wen? */
  function spielSituation() {
    auswahlSpiel({
      titel: 'Wer überzeugt wen?',
      frageText: 'Welches Argument überzeugt diese Person am besten?',
      items: mischen(ZI.SITUATIONEN).slice(0, 4).map((it) => ({ kopf: it.situation, optionen: it.optionen })),
      tipp: ZI.TIPPS.situation,
      wsVorher: 'truhe-zu', wsNachher: 'truhe-offen',
      start: 'Nicht jedes Argument überzeugt jeden. Überleg, was der Person wichtig ist.',
      ende: () => geschafft({ titel: 'Stollen geschafft!', text: 'Du weißt, wie man verschiedene Menschen überzeugt. Dafür bekommst du ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine.', datei: 'edelstein', alt: 'Edelstein', eintragen: (s) => s.setzeTief(K, 1) }),
    });
  }

  /* BONUS Kapitel 3: Sprecherwechsel – im richtigen Moment einsteigen */
  function spielSprecherwechsel() {
    const saetze = ZI.SPRECHERWECHSEL.slice();
    const sprecher = ZI.mischen(ZI.ZWERGE.slice(0, 8));
    let nr = 0; let treffer = 0; let laeuft = false;
    let zustand = 'warten'; // spricht | fenster | vorbei
    let timer = null;
    const blase = h('div', { class: 'sw-blase pergament', 'aria-live': 'polite' });
    const sprecherBild = h('div', { class: 'sw-sprecher' });
    const ergebnis = h('div', { class: 'sw-ergebnis' });
    const punktEl = h('span', null, '0');
    const knopf = h('button', { class: 'knopf sw-knopf', disabled: true }, 'Jetzt bin ich dran!');
    const zaehlerEl = h('div', { class: 'punktstand' }, h('span', null, '1'), ' / ' + saetze.length);

    function runde() {
      if (nr >= saetze.length) return ende();
      zaehlerEl.firstChild.textContent = String(nr + 1);
      const z = sprecher[nr % sprecher.length];
      ZI.setze(sprecherBild, bild(z.datei, z.name), h('div', { class: 'sw-name' }, z.name));
      ZI.setze(ergebnis);
      const woerter = saetze[nr].split(' ');
      let i = 0; zustand = 'spricht'; blase.textContent = '';
      knopf.disabled = false;
      const tempo = 330 + Math.random() * 120;
      const tick = () => {
        if (!laeuft) return;
        if (i < woerter.length) {
          blase.textContent += (i ? ' ' : '') + woerter[i]; i++;
          timer = setTimeout(tick, tempo + (woerter[i - 1].endsWith(',') ? 260 : 0));
        } else {
          zustand = 'fenster';
          blase.classList.add('fertig');
          timer = setTimeout(() => { if (zustand === 'fenster') bewerte('zuspaet'); }, 1600);
        }
      };
      blase.classList.remove('fertig');
      timer = setTimeout(tick, 600);
    }

    function bewerte(art) {
      clearTimeout(timer);
      zustand = 'vorbei'; knopf.disabled = true;
      if (art === 'glatt') { treffer++; punktEl.textContent = String(treffer); ZI.ton.richtig(); ZI.setze(ergebnis, h('div', { class: 'rueckmeldung gut' }, h('b', null, 'Glatter Wechsel! '), 'Du hast gewartet, bis der Satz zu Ende war.')); }
      else if (art === 'frueh') { ZI.ton.falsch(); ZI.setze(ergebnis, h('div', { class: 'rueckmeldung schlecht' }, h('b', null, 'Unterbrochen! '), 'Der Satz war noch nicht fertig.')); }
      else { ZI.setze(ergebnis, h('div', { class: 'rueckmeldung tipp' }, h('b', null, 'Zu lange gewartet. '), 'Das Gespräch ist ins Stocken geraten.')); }
      nr++;
      setTimeout(() => { if (laeuft) runde(); }, 1700);
    }

    knopf.addEventListener('click', () => {
      if (zustand === 'spricht') bewerte('frueh');
      else if (zustand === 'fenster') bewerte('glatt');
    });

    function ende() {
      laeuft = false;
      const sterne = treffer >= 9 ? 3 : treffer >= 7 ? 2 : treffer >= 5 ? 1 : 0;
      const vorher = stand.bonus[K];
      ZI.ton.fanfare();
      const f = ZI.fenster([
        h('div', { class: 'gross-bild strahlen' }, bild('stern', 'Stern')),
        h('h2', null, treffer + ' von ' + saetze.length + ' glatten Wechseln!'),
        h('div', { style: { fontSize: '48px', color: 'var(--gold-dunkel)', letterSpacing: '6px' } }, '★'.repeat(sterne) + '☆'.repeat(3 - sterne)),
        h('p', { style: { margin: 0 } }, 'Im echten Gespräch zeigen wir mit Blicken, Melden oder einem kurzen „Darf ich?“, dass wir etwas sagen möchten.'),
        h('div', { class: 'knopf-reihe' },
          h('button', { class: 'knopf holz', onclick: () => { f.schliessen(); spielSprecherwechsel(); } }, 'Nochmal'),
          h('button', { class: 'knopf', onclick: () => { f.schliessen(); if (sterne > vorher) fortschritt((s) => { s.bonus[K] = sterne; }, () => zeigeHalle()); else zeigeHalle(); } }, 'Zur Halle'))]);
    }

    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('zwergenrat-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.35)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Halle', onclick: () => { laeuft = false; clearTimeout(timer); zeigeHalle(); } }, icon.zurueck()),
        h('div', { class: 'titel' }, 'Sprecherwechsel'),
        h('div', { class: 'spacer' }), zaehlerEl, h('div', { class: 'zaehler', 'aria-label': 'Glatte Wechsel' }, bild('stern', 'Punkte'), punktEl), tonKnopf()),
      h('div', { class: 'sw-buehne' }, h('div', { class: 'sw-reihe' }, sprecherBild, blase), ergebnis, knopf)));

    const f = ZI.fenster([
      h('div', { class: 'gross-bild' }, bild('meisterin-erklaert', 'Meisterin Hammerlind')),
      h('h2', null, 'Sprecherwechsel'),
      h('p', { style: { margin: 0, fontSize: '21px' } }, 'Im Zwergenrat spricht immer einer nach dem anderen. Tippe auf „Jetzt bin ich dran!“, sobald der Satz zu Ende ist – aber nicht vorher, sonst unterbrichst du.'),
      h('button', { class: 'knopf', onclick: () => { f.schliessen(); laeuft = true; runde(); } }, 'Start!')]);
  }

  /* =========================================================
     BONUS: Funkenregen
     ========================================================= */
  function spielFunkenregen(pool, titel, intro) {
    const DAUER = 60;
    const runden = mischen(pool);
    let punkte = 0; let zeit = DAUER; let laeuft = false;
    let timer = null; let spawner = null;
    const punktEl = h('div', { class: 'punktstand' }, '0');
    const zeitEl = h('div', { class: 'punktstand' }, DAUER + ' s');
    const meinungEl = h('div', { class: 'arena-meinung pergament' });
    const arena = h('div', { class: 'arena' }, meinungEl);

    function rundeNr() { return Math.min(runden.length - 1, Math.floor((DAUER - zeit) / (DAUER / runden.length))); }
    let aktuelleRunde = -1;

    function funke() {
      const rd = runden[rundeNr()];
      const scharf = Math.random() < 0.55;
      const sichtbar = [...arena.querySelectorAll('.spark')].map((x) => x.textContent);
      const auswahl = (scharf ? rd.scharf : rd.stumpf).map((t) => '… ' + t).filter((t) => !sichtbar.includes(t));
      if (!auswahl.length) return;
      const text = zufall(auswahl);
      const b = h('button', { class: 'spark' }, text);
      const breite = arena.clientWidth;
      b.style.left = Math.max(8, Math.random() * (breite - 280)) + 'px';
      const fall = Math.max(4.2, 7.5 - (DAUER - zeit) * 0.05);
      b.style.animationDuration = fall + 's';
      b.addEventListener('animationend', () => b.remove());
      b.addEventListener('click', () => {
        if (!laeuft || b.dataset.weg) return;
        b.dataset.weg = '1';
        const r = b.getBoundingClientRect(); const a = arena.getBoundingClientRect();
        if (scharf) {
          punkte++; ZI.ton.plopp();
          ZI.funken(arena, r.left - a.left + r.width / 2, r.top - a.top + r.height / 2, 12);
          b.style.top = (r.top - a.top) + 'px'; b.style.transform = 'none';
          b.classList.add('gefangen');
        } else {
          punkte = Math.max(0, punkte - 1); ZI.ton.falsch();
          b.style.top = (r.top - a.top) + 'px'; b.style.transform = 'none';
          b.classList.add('zisch');
        }
        b.style.animationDuration = '0.45s';
        punktEl.textContent = String(punkte);
      });
      arena.appendChild(b);
    }

    function tick() {
      zeit--;
      zeitEl.textContent = zeit + ' s';
      const rn = rundeNr();
      if (rn !== aktuelleRunde) {
        aktuelleRunde = rn;
        arena.querySelectorAll('.spark').forEach((s) => s.remove());
        meinungEl.textContent = runden[rn].meinung;
      }
      if (zeit <= 0) ende();
    }

    function starten() {
      laeuft = true; aktuelleRunde = 0; meinungEl.textContent = runden[0].meinung;
      timer = setInterval(tick, 1000);
      const plane = () => { if (!laeuft) return; funke(); spawner = setTimeout(plane, Math.max(650, 1250 - (DAUER - zeit) * 10)); };
      plane();
    }

    function ende() {
      laeuft = false; clearInterval(timer); clearTimeout(spawner);
      arena.querySelectorAll('.spark').forEach((s) => s.remove());
      const sterne = punkte >= 20 ? 3 : punkte >= 14 ? 2 : punkte >= 8 ? 1 : 0;
      const vorher = stand.bonus[K];
      ZI.ton.fanfare();
      const f = ZI.fenster([
        h('div', { class: 'gross-bild strahlen' }, bild('stern', 'Stern')),
        h('h2', null, punkte + ' Funken gefangen!'),
        h('div', { style: { fontSize: '48px', color: 'var(--gold-dunkel)', letterSpacing: '6px' } }, '★'.repeat(sterne) + '☆'.repeat(3 - sterne)),
        h('p', { style: { margin: 0 } }, sterne > vorher ? 'Neuer Rekord! Jeder Stern ist ein Edelstein für dein Dorf.' : 'Ab 8 Funken gibt es 1 Stern, ab 14 Funken 2 und ab 20 Funken 3 Sterne.'),
        h('div', { class: 'knopf-reihe' },
          h('button', { class: 'knopf holz', onclick: () => { f.schliessen(); spielFunkenregen(pool, titel, intro); } }, 'Nochmal'),
          h('button', { class: 'knopf', onclick: () => { f.schliessen(); if (sterne > vorher) fortschritt((s) => { s.bonus[K] = sterne; }, () => zeigeHalle()); else zeigeHalle(); } }, 'Zur Halle'))]);
    }

    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('vulkan-hintergrund', 'hg-ersatz-vulkan', 'rgba(20,12,8,0.3)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Halle', onclick: () => { laeuft = false; clearInterval(timer); clearTimeout(spawner); zeigeHalle(); } }, icon.zurueck()),
        h('div', { class: 'titel' }, titel),
        h('div', { class: 'spacer' }), h('div', { class: 'zaehler', 'aria-label': 'Punkte' }, bild('stern', 'Punkte'), punktEl), zeitEl, tonKnopf()),
      arena));

    const f = ZI.fenster([
      h('div', { class: 'gross-bild' }, bild('meisterin-tipp', 'Meisterin Hammerlind')),
      h('h2', null, titel),
      h('p', { style: { margin: 0, fontSize: '21px' } }, intro),
      h('button', { class: 'knopf', onclick: () => { f.schliessen(); starten(); } }, 'Start!')]);
  }

  /* =========================================================
     LIEFERUNG & ZWERGENPASS
     ========================================================= */
  /* =========================================================
     RÜCKBLICK – Selbsteinschätzung mit Übungstipp
     ========================================================= */
  function rueckblickSpeicher() { return 'zi-rueckblick-' + (stand.karte || stand.id); }
  function starteUebung(k, art, i) {
    const def = INHALT[k] && INHALT[k][art] && INHALT[k][art][i];
    if (!def) return;
    K = k; letzterReiter = k; aktStation = { k, art, i };
    def.spiel();
  }
  function zeigeRueckblick(k) {
    const werte = sitzung.lesen(rueckblickSpeicher(), {});
    const liste = ZI.ICH_KANN[k] || [];
    const box = h('div', { class: 'rueckblick-liste' });
    const ziel = h('div');
    function zeichne() {
      ZI.setze(box, ...liste.map((it, n) => {
        const key = k + '-' + n; const w = werte[key];
        const def = INHALT[k][it.uebung.art][it.uebung.i];
        const offen = it.uebung.art === 'kern' || stand.coreCount(k) === 3 || testmodus;
        return h('div', { class: 'rueckblick-zeile pergament auf-pergament' + (w ? ' w' + w : '') },
          h('div', { class: 'rueckblick-text' }, it.text),
          h('div', { class: 'rueckblick-wahl', role: 'radiogroup', 'aria-label': it.text },
            ZI.EINSCHAETZUNG.map((e) => h('button', { class: 'einschaetzung ' + e.klasse + (w === e.wert ? ' gewaehlt' : ''), role: 'radio', 'aria-checked': String(w === e.wert),
              onclick: () => { werte[key] = e.wert; sitzung.schreiben(rueckblickSpeicher(), werte); ZI.ton.plopp(); zeichne(); } }, e.text))),
          w && w < 3 ? h('div', { class: 'rueckblick-tipp' },
            h('span', null, w === 1 ? 'Übe noch einmal: ' : 'Zum Festigen: ', h('b', null, '„' + def.name + '“')),
            offen ? h('button', { class: 'knopf klein', onclick: () => starteUebung(k, it.uebung.art, it.uebung.i) }, 'Jetzt üben') : null) : null);
      }));
      const ueben = liste.map((it, n) => ({ it, w: werte[k + '-' + n] })).filter((x) => x.w === 1);
      const alle = liste.every((it, n) => werte[k + '-' + n]);
      ZI.setze(ziel, alle ? h('div', { class: 'rueckblick-ziel pergament auf-pergament' },
        h('div', { class: 'rueckblick-meisterin' }, bild('meisterin-ermutigt', 'Meisterin Hammerlind')),
        h('div', null,
          h('h3', { style: { margin: '0 0 4px' } }, 'Mein Ziel'),
          h('p', { style: { margin: 0 } }, ueben.length ? 'Als Nächstes übe ich: ' + INHALT[k][ueben[0].it.uebung.art][ueben[0].it.uebung.i].name + '. Dann kann ich bald sagen: „' + ueben[0].it.text + '“'
            : 'Stark! Du fühlst dich überall schon sicher. Hilf doch jemandem, der noch übt.'))) : null);
    }
    zeichne();
    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('stollen-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.45)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Halle', onclick: () => zeigeHalle() }, icon.zurueck()),
        h('div', null, h('div', { class: 'titel' }, 'Rückblick · Kapitel ' + ZI.KAPITEL[k].nr), h('div', { class: 'untertitel' }, 'Wie sicher bist du? Sei ehrlich – niemand sonst sieht das.')),
        h('div', { class: 'spacer' })),
      h('div', { class: 'screen-scroll', style: { position: 'relative', zIndex: 2 } }, h('div', { class: 'rueckblick' }, box, ziel))));
  }

  /* =========================================================
     INSELBOTSCHAFT – vom Board, sagt der Schmiede, was gebaut ist
     ========================================================= */
  const BOTSCHAFT_GILT = 8 * 60 * 60 * 1000; // gilt einen Schultag lang – nicht für die nächste Klasse am nächsten Tag
  function botschaftJetzt() {
    const b = sitzung.lesen('zi-botschaft', null);
    if (!b || !b.zeit || Date.now() - b.zeit > BOTSCHAFT_GILT) return null;
    return b;
  }
  function gebauteGebaeude() {
    const b = botschaftJetzt();
    if (!b) return [];
    return ZI.BAU_UEBUNGEN.filter((u) => b.bau & (1 << u.bit)).map((u) => u.id);
  }
  function botschaftLeiste() {
    const b = botschaftJetzt();
    const anzahl = b ? ZI.BAU_UEBUNGEN.filter((u) => b.bau & (1 << u.bit)).length : 0;
    return h('div', { class: 'botschaft-leiste pergament auf-pergament' + (b ? ' ok' : '') },
      h('div', { class: 'botschaft-text' },
        b ? h('span', null, 'Inselbotschaft ', h('b', null, b.wort), ' · ' + (anzahl === 1 ? '1 Gebäude-Stollen offen' : anzahl + ' Gebäude-Stollen offen'))
          : h('span', null, h('b', null, 'Inselbotschaft: '), 'Tippe das Silbenwort vom Board ein. Dann öffnen sich die Gebäude-Stollen.')),
      h('button', { class: 'knopf klein' + (b ? ' holz' : ''), onclick: () => botschaftEingeben(() => zeigeHalle()) }, b ? 'Neue Botschaft' : 'Eintippen'),
      h('button', { class: 'knopf holz klein', onclick: stammesratEingeben }, 'Stammesrat'));
  }
  function botschaftEingeben(danach) {
    const eingabe = h('input', { class: 'eingabe botschaft-eingabe', maxlength: '12', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', placeholder: 'z. B. BOKAMI', 'aria-label': 'Inselbotschaft' });
    const hinweis = h('div');
    const pruefen = () => {
      const roh = eingabe.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
      // alte Runenwörter öffnen weiterhin ihr Kapitel
      const alt = ZI.KAPITEL.findIndex((kap) => kap.runenwort && kap.runenwort === roh);
      const b = ZI.botschaft.lese(roh);
      if (!b && alt < 0) {
        ZI.ton.falsch();
        ZI.setze(hinweis, h('div', { class: 'rueckmeldung schlecht' }, 'Diese Botschaft stimmt nicht. Schau genau aufs Board: drei Silben, zum Beispiel „BO KA MI“.'));
        return;
      }
      const kapitel = b ? b.kapitel : alt;
      if (b) sitzung.schreiben('zi-botschaft', { wort: roh, kapitel: b.kapitel, bau: b.bau, zeit: Date.now() });
      f.schliessen();
      const neuKapitel = kapitel > stand.offen && ZI.KAPITEL[kapitel] && ZI.KAPITEL[kapitel].fertig;
      ZI.ton.fanfare();
      const gebaut = b ? ZI.BAU_UEBUNGEN.filter((u) => b.bau & (1 << u.bit)) : [];
      const fertig = () => {
        if (neuKapitel) { letzterReiter = kapitel; ZI.meldung('Kapitel ' + ZI.KAPITEL[kapitel].nr + ' ist offen!', 3500); }
        else if (gebaut.length) ZI.meldung('Die Botschaft ist angekommen! ' + gebaut.length + (gebaut.length === 1 ? ' Gebäude-Stollen ist' : ' Gebäude-Stollen sind') + ' offen.', 3500);
        else ZI.meldung('Die Botschaft ist angekommen!', 2500);
        danach && danach();
      };
      if (neuKapitel) fortschritt((s) => { s.offen = Math.max(s.offen, kapitel); }, fertig); else fertig();
    };
    eingabe.addEventListener('keydown', (e) => { if (e.key === 'Enter') pruefen(); });
    const f = ZI.fenster([
      h('h2', null, 'Inselbotschaft'),
      h('p', { style: { margin: 0 } }, 'Auf dem Board steht ein Wort aus drei Silben. Es verrät der Schmiede, was eure Klasse schon gebaut hat.'),
      eingabe, hinweis,
      h('div', { class: 'knopf-reihe' },
        h('button', { class: 'knopf holz', onclick: () => f.schliessen() }, 'Abbrechen'),
        h('button', { class: 'knopf', onclick: pruefen }, 'Prüfen')),
    ]);
    setTimeout(() => eingabe.focus(), 150);
  }

  /* ---------- Stammesrat: Rolle im kleinen Rat ---------- */
  function stammesratEingeben() {
    const alt = sitzung.lesen('zi-stamm', null);
    if (alt && Date.now() - alt.zeit < 90 * 60 * 1000) { zeigeStammesrat(alt); return; }
    const eingabe = h('input', { class: 'eingabe botschaft-eingabe', maxlength: '12', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', placeholder: 'z. B. KOMIDA', 'aria-label': 'Stammescode' });
    const hinweis = h('div');
    const pruefen = () => {
      const roh = eingabe.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
      const c = ZI.stammescode.lese(roh);
      if (!c) { ZI.ton.falsch(); ZI.setze(hinweis, h('div', { class: 'rueckmeldung schlecht' }, 'Dieser Stammescode stimmt nicht. Er steht am Board bei den Stammesräten.')); return; }
      if (!stand.karte || stand.karte > c.n) { ZI.ton.falsch(); ZI.setze(hinweis, h('div', { class: 'rueckmeldung schlecht' }, 'Deine Kartennummer kommt in diesem Rat nicht vor. Frag deine Lehrkraft.')); return; }
      const daten = { wort: roh, ...c, zeit: Date.now() };
      sitzung.schreiben('zi-stamm', daten);
      f.schliessen(); ZI.ton.fanfare();
      zeigeStammesrat(daten);
    };
    eingabe.addEventListener('keydown', (e) => { if (e.key === 'Enter') pruefen(); });
    const f = ZI.fenster([
      h('h2', null, 'Stammesrat'),
      h('p', { style: { margin: 0 } }, 'Am Board steht der Stammescode aus drei Silben. Damit erfährst du, in welchem Stamm du bist und welche Rolle du hast.'),
      eingabe, hinweis,
      h('div', { class: 'knopf-reihe' },
        h('button', { class: 'knopf holz', onclick: () => f.schliessen() }, 'Abbrechen'),
        h('button', { class: 'knopf', onclick: pruefen }, 'Prüfen')),
    ]);
    setTimeout(() => eingabe.focus(), 150);
  }
  function zeigeStammesrat(c) {
    const staemme = ZI.stammesEinteilung(c.n, c.seed);
    const g = staemme.find((x) => x.mitglieder.some((m) => m.karte === stand.karte));
    if (!g) { sitzung.loeschen('zi-stamm'); stammesratEingeben(); return; }
    const ich = g.mitglieder.find((m) => m.karte === stand.karte);
    const rolle = ich.rolle;
    const t = ZI.STAMMES_THEMEN[c.thema];
    const rf = t.frage ? ZI.ratsfrageNach(t.frage) : null;
    const dreier = g.mitglieder.length < 4;
    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('zwergenrat-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.45)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Halle', onclick: () => zeigeHalle() }, icon.zurueck()),
        h('div', null, h('div', { class: 'titel' }, 'Stammesrat der ' + g.name), h('div', { class: 'untertitel' }, 'Stammescode ' + c.wort.match(/../g).join(' '))),
        h('div', { class: 'spacer' }),
        h('button', { class: 'knopf holz klein', onclick: () => { sitzung.loeschen('zi-stamm'); stammesratEingeben(); } }, 'Neuer Code')),
      h('div', { class: 'screen-scroll', style: { position: 'relative', zIndex: 2 } },
        h('div', { class: 'stammesrat-ipad' },
          h('div', { class: 'rollenkarte pergament auf-pergament', style: { borderColor: g.farbe } },
            h('div', { class: 'rollenkarte-zeichen', 'aria-hidden': 'true' }, rolle.zeichen),
            h('div', null,
              h('div', { class: 'klein' }, 'Deine Rolle'),
              h('h2', { style: { margin: 0, color: g.farbe } }, rolle.name),
              h('p', { style: { margin: '4px 0 0', fontSize: '20px' } }, rolle.aufgabe + (dreier && rolle.id === 'aelteste' ? ' Ihr seid nur drei – achte auch auf die Zeit.' : '')),
              h('button', { class: 'knopf-link', onclick: () => ZI.vorlesen(rolle.name + '. ' + rolle.aufgabe) }, 'Vorlesen'))),
          h('div', { class: 'pergament auf-pergament stamm-box' },
            h('h3', null, 'Euer Thema'),
            h('div', { class: 'meinung' }, ZI.themaText(t)),
            rf ? h('div', { class: 'stamm-optionen' }, rf.optionen.map((id) => {
              const geb = ZI.GEBAEUDE.find((x) => x.id === id); const u = ZI.bauUebung(id);
              return h('div', { class: 'stamm-option' }, h('div', { class: 'stamm-option-bild' }, bild(id, geb.name)),
                h('div', null, h('b', null, geb.name), u ? h('div', { class: 'klein' }, 'schaltet frei: „' + u.name + '“') : null));
            })) : null),
          h('div', { class: 'stamm-spalten' },
            h('div', { class: 'pergament auf-pergament stamm-box' },
              h('h3', null, 'Deine Sätze als ' + rolle.name),
              h('ul', { class: 'saetze' }, rolle.saetze.map((x) => h('li', null, x)))),
            h('div', { class: 'pergament auf-pergament stamm-box' },
              h('h3', null, 'Für alle im Stamm'),
              h('ul', { class: 'saetze' }, ZI.ALLE_SAETZE.map((x) => h('li', null, x))))),
          h('div', { class: 'pergament auf-pergament stamm-box' },
            h('h3', null, 'Dein Stamm'),
            h('div', { class: 'stamm-liste' }, g.mitglieder.map((m) => h('div', { class: 'stamm-person' + (m.karte === stand.karte ? ' ich' : '') },
              h('b', null, 'Karte ' + m.karte), h('span', null, m.rolle.zeichen + ' ' + m.rolle.name + (m.karte === stand.karte ? ' (du)' : ''))))),
            h('p', { class: 'klein', style: { margin: '8px 0 0' } }, 'Setzt euch zusammen. Jeder sagt mindestens einmal seine Meinung mit Begründung.'))))));
  }

  /* ---------- Begründungshand: die zwei stärksten von fünf Begründungen wählen ---------- */
  function spielHand(u, ende) {
    const items = mischen(u.items).slice(0, 3);
    const bue = buehne('eisen-roh');
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel: u.name, anzahl: items.length, aufgabe: box, bue });
    bue.sage(u.start, 'erklaert');
    let nr = 0;
    function item() {
      const it = items[nr];
      const karten = mischen(it.begruendungen);
      const gewaehlt = new Set();
      let versuche = 0; let fertig = false;
      bue.werkstueck('eisen-roh');
      const rueck = h('div');
      const liste = h('div', { class: 'checkliste hand-liste' });
      const pruefKnopf = h('button', { class: 'knopf', style: { alignSelf: 'flex-end' }, disabled: true }, 'Prüfen');
      const weiter = h('button', { class: 'knopf', style: { display: 'none', alignSelf: 'flex-end' } }, nr + 1 < items.length ? 'Weiter' : 'Fertig!');
      weiter.addEventListener('click', () => { nr++; rahmen.fortschritt(nr); if (nr < items.length) item(); else ende(); });
      function zeichne(loesung) {
        ZI.setze(liste, ...karten.map((k, i) => {
          const an = gewaehlt.has(i) || (loesung && k.ok);
          return h('button', { class: 'check' + (an ? ' an' : ''), 'aria-pressed': String(an), onclick: () => {
            if (fertig) return;
            if (gewaehlt.has(i)) gewaehlt.delete(i); else if (gewaehlt.size < 2) gewaehlt.add(i); else { ZI.meldung('Wähle genau zwei Begründungen.'); return; }
            ZI.ton.plopp(); pruefKnopf.disabled = gewaehlt.size !== 2; zeichne();
          } }, h('span', { class: 'finger', 'aria-hidden': 'true' }, String(i + 1)), h('span', { class: 'kasten' }, an ? icon.haken() : null), k.text);
        }));
      }
      pruefKnopf.addEventListener('click', () => {
        const falsche = [...gewaehlt].filter((i) => !karten[i].ok);
        if (!falsche.length) {
          fertig = true; ZI.ton.richtig();
          ZI.setze(rueck, h('div', { class: 'rueckmeldung gut' }, h('b', null, zufall(ZI.LOB) + ' '), 'Das sind die zwei stärksten Begründungen: wichtig und für viele gültig.'));
          bue.sage('Mit diesen zwei Fingern der Begründungshand überzeugst du am meisten.', 'jubelt');
          bue.schlag(() => bue.werkstueck('eisen-gluehend'));
          pruefKnopf.style.display = 'none'; weiter.style.display = '';
          return;
        }
        versuche++; ZI.ton.falsch();
        ZI.setze(rueck, h('div', { class: 'rueckmeldung schlecht' }, falsche.map((i) => h('div', null, '„' + karten[i].text + '“ – ' + karten[i].info))));
        falsche.forEach((i) => gewaehlt.delete(i));
        pruefKnopf.disabled = true;
        if (versuche >= 2) {
          fertig = true;
          bue.sage('Ich zeige dir die zwei stärksten. Lies genau, warum sie mehr überzeugen.', 'tipp');
          zeichne(true); pruefKnopf.style.display = 'none'; weiter.style.display = '';
          return;
        }
        bue.sage('Fast! Frag dich: Gilt die Begründung nur für mich – oder für viele?', 'ermutigt');
        zeichne();
      });
      ZI.setze(box,
        aufgabenKopf(u.frage, () => it.meinung + ' ' + karten.map((k, i) => (i + 1) + '. ' + k.text).join(' '), u.tipp, bue),
        h('div', { class: 'hand-kopf' }, h('span', { class: 'hand-symbol', 'aria-hidden': 'true' }, '✋'), h('div', { class: 'meinung' }, it.meinung)),
        liste, rueck, pruefKnopf, weiter);
      zeichne();
    }
    item();
  }

  /* ---------- Gebäude-Übung spielen ---------- */
  function spielBau(u) {
    const g = ZI.GEBAEUDE.find((x) => x.id === u.id);
    const ende = () => geschafft({ titel: 'Gebäude-Stollen geschafft!', text: 'Du hast „' + u.name + '“ gemeistert. Dafür gibt es einen Rangpunkt und eine neue Seite im Wissensbuch.',
      datei: u.id, alt: g ? g.name : u.name, eintragen: (s) => s.setzeBau(u.bit) });
    if (u.typ === 'hand') { spielHand(u, ende); return; }
    if (u.typ === 'sortier') {
      sortierSpiel({
        titel: u.name, frageText: u.frage, tipp: u.tipp, start: u.start,
        runden: mischen(u.runden).slice(0, 2).map((rd) => ({ kopf: rd.kopf, karten: rd.karten })),
        jaText: u.jaText, neinText: u.neinText,
        wsVorher: 'eisen-roh', wsNachher: 'eisen-gluehend',
        rundeFertig: u.rundeFertig, falschJa: u.falschJa, falschNein: u.falschNein, ende,
      });
      return;
    }
    auswahlSpiel({
      titel: u.name, frageText: u.frage, tipp: u.tipp, start: u.start,
      items: mischen(u.items).slice(0, 5).map((it) => ({ kopf: it.kopf, optionen: it.optionen })),
      wsVorher: 'eisen-roh', wsNachher: 'eisen-gluehend', ende,
    });
  }

  /* ---------- Kartennummer wählen (steht auf der Zwergenpass-Karte) ---------- */
  function waehleKarte(aktuell, fertig, zurueck) {
    const knoepfe = [];
    for (let n = 1; n <= 32; n++) {
      knoepfe.push(h('button', { class: 'karten-nr' + (n === aktuell ? ' gewaehlt' : ''), 'aria-label': 'Karte ' + n,
        onclick: () => {
          ZI.ton.plopp();
          const f = ZI.fenster([
            h('div', { class: 'karten-nr-gross' }, String(n)),
            h('h2', null, 'Steht die ' + n + ' auf deiner Karte?'),
            h('p', { style: { margin: 0 } }, 'Mit dieser Nummer kommt dein Material auf die Insel. Nimm immer dieselbe Nummer.'),
            h('div', { class: 'knopf-reihe' },
              h('button', { class: 'knopf holz', onclick: () => f.schliessen() }, 'Nein'),
              h('button', { class: 'knopf', onclick: () => { f.schliessen(); fertig(n); } }, 'Ja, das ist meine Nummer')),
          ]);
        } }, String(n)));
    }
    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('stollen-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.45)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück', onclick: zurueck }, icon.zurueck()),
        h('div', null,
          h('div', { class: 'titel' }, 'Deine Kartennummer'),
          h('div', { class: 'untertitel' }, 'Welche Nummer steht oben auf deiner Zwergenpass-Karte?')),
        h('div', { class: 'spacer' })),
      h('div', { class: 'screen-scroll', style: { position: 'relative', zIndex: 2 } },
        h('div', { class: 'karten-raster pergament auf-pergament' }, knoepfe))));
  }

  /* =========================================================
     LIEFERUNG & ZWERGENPASS
     ========================================================= */
  function zeigeLieferung() {
    if (!stand.karte) {
      waehleKarte(null, (n) => { stand.id = n; speichern(); zeigeLieferung(); }, () => zeigeHalle());
      return;
    }
    const code = stand.code();
    const schein = stand.lieferCode();
    const z = aktuellerZwerg();
    const material = stand.coreCount(stand.offen);
    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('stollen-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.45)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Halle', onclick: () => zeigeHalle() }, icon.zurueck()),
        h('div', null, h('div', { class: 'titel' }, 'Lieferung & Zwergenpass'), h('div', { class: 'untertitel' }, z.name)),
        h('div', { class: 'spacer' })),
      h('div', { class: 'screen-scroll', style: { position: 'relative', zIndex: 2, display: 'flex' } },
        h('div', { class: 'lieferung' },
          h('div', { class: 'pergament lieferschein auf-pergament' },
            h('div', { class: 'lieferschein-kopf' },
              h('div', { class: 'lieferschein-bild' }, bild(z.datei, z.name)),
              h('div', null,
                h('h2', { style: { fontSize: '30px', margin: 0 } }, 'Lieferschein'),
                h('div', { class: 'klein' }, 'Kapitel ' + (stand.offen + 1) + ' · ' + material + ' Material' + (stand.deepCount(stand.offen) ? ' · ' + stand.deepCount(stand.offen) + ' Tiefe Stollen' : '')))),
            h('div', { class: 'schein-zeile' },
              h('div', { class: 'schein-karte' }, h('span', null, 'Karte'), h('b', null, String(stand.karte))),
              h('div', { class: 'schein-code', 'aria-label': 'Lieferschein: ' + schein.split('').join(' ') },
                ...schein.split('').map((c) => h('span', null, c)))),
            h('p', { class: 'schein-text' }, 'Sag deiner Lehrkraft: „Karte ' + stand.karte + ': ' + schein.split('').join(' ') + '“ – oder tipp es selbst an der Insel ein.'),
            h('button', { class: 'knopf-link', onclick: () => waehleKarte(stand.karte, (n) => { stand.id = n; speichern(); zeigeLieferung(); }, () => zeigeLieferung()) }, 'Falsche Kartennummer?')),
          h('div', { class: 'pergament pass-karte auf-pergament' },
            h('h2', { style: { fontSize: '26px' } }, 'Dein Zwergenpass'),
            h('div', { class: 'pass-code', 'aria-label': 'Code: ' + code.split('').join(' ') }, code),
            h('ol', { class: 'schritte' },
              h('li', null, 'Schreib den Code genau ab – auf deine Karte mit der Nummer ' + stand.karte + '.'),
              h('li', null, 'Nächste Stunde tippst du ihn ein und spielst weiter.')),
            h('div', { class: 'knopf-reihe' },
              h('button', { class: 'knopf holz', onclick: () => zeigeHalle() }, 'Weiterschmieden'),
              h('button', { class: 'knopf', onclick: () => bestaetigen('Hast du deinen Code aufgeschrieben?', 'Ja, abmelden', abmelden) }, 'Fertig für heute')))))));
  }

  /* ---------- Los ---------- */
  zeigeStart();

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
