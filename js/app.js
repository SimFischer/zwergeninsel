/* Zwergeninsel – Schüler-App (Schmiede) */
(function () {
  const ZI = window.ZI;
  const { h, bild, icon, mischen, zufall, speicher } = ZI;
  const app = document.getElementById('app');

  let stand = null;                 // aktueller Spielstand (ZI.Stand)
  let testmodus = sessionStorage.getItem('zi-test') === '1';
  const KAP = 0;                    // Kapitel 1 (Index 0)
  const AKTIV_KEY = 'zi-aktiv';
  const MAX_ALTER = 4 * 60 * 60 * 1000; // nach 4 Stunden wird der Stand nicht mehr angeboten

  const ROHSTOFF = [
    { datei: 'holz', name: 'Holz' },
    { datei: 'stein', name: 'Stein' },
    { datei: 'eisen', name: 'Eisen' },
  ];

  /* ---------- Speichern ---------- */
  function speichern() {
    if (stand) speicher.schreiben(AKTIV_KEY, { code: stand.code(), zeit: Date.now() });
  }
  function gespeicherterStand() {
    const g = speicher.lesen(AKTIV_KEY, null);
    if (!g || !g.code || Date.now() - g.zeit > MAX_ALTER) return null;
    return ZI.Stand.ausCode(g.code);
  }
  function abmelden() {
    speicher.loeschen(AKTIV_KEY);
    stand = null;
    zeigeStart();
  }

  /* Fortschritt eintragen und neu freigeschaltete Zwerge feiern */
  function fortschritt(aenderung, danach) {
    const vorher = stand.freieZwerge();
    aenderung(stand);
    speichern();
    const neu = stand.freieZwerge().filter((n) => !vorher.includes(n));
    zeigeFreischaltungen(neu, danach);
  }

  function zeigeFreischaltungen(liste, danach) {
    if (!liste.length) { danach && danach(); return; }
    const z = ZI.ZWERGE.find((d) => d.nr === liste[0]);
    ZI.ton.fanfare();
    const f = ZI.fenster([
      h('div', { style: { width: '120px' } }, bild('truhe-offen', 'Offene Schatztruhe')),
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
  function avatar(nr) {
    const z = ZI.ZWERGE.find((d) => d.nr === nr);
    return h('div', { class: 'avatar' }, bild(z.datei, z.name));
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
        h('a', { class: 'knopf moos klein', href: 'karten.html', style: { textDecoration: 'none' } }, 'Zwergenpass-Karten drucken')),
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
        stand = new ZI.Stand({ zwerg: gewaehlt });
        speichern();
        zeigeHalle(true);
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
    const eingabe = h('input', { class: 'eingabe', maxlength: '11', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', inputmode: 'text', placeholder: 'XXXXX-XXXXX', 'aria-label': 'Zwergenpass-Code' });
    const hinweis = h('div', { class: 'rueckmeldung tipp', style: { display: 'none' } });
    eingabe.addEventListener('input', () => {
      let v = eingabe.value.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 10);
      if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
      eingabe.value = v;
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
  const KERN = [
    { name: 'Stumpf oder scharf?', info: 'Finde die Begründung, die wirklich erklärt, warum.', icon: 'axt-scharf', start: () => spielStumpfScharf() },
    { name: 'Erz oder Schlacke?', info: 'Sortiere: Welche Begründung passt zur Meinung?', icon: 'eisen-roh', start: () => spielErz() },
    { name: 'Weil-Denn-Amboss', info: 'Bau Begründungssätze mit weil, da und denn.', icon: 'runenplatte', start: () => spielWeilDenn() },
  ];
  const TIEF = [
    { name: 'Fehlerjagd', info: 'Der Fehlerkobold hat Sätze verbogen. Finde den richtigen.', icon: 'kobold-frech', start: () => spielFehlerjagd() },
    { name: 'Beispiel-Edelstein', info: 'Finde das Beispiel, das die Begründung stützt.', icon: 'edelstein', start: () => spielBeispiele() },
    { name: 'Meisterstück', info: 'Argumentiere laut – dein Partner prüft.', icon: 'meisterin-erklaert', start: () => spielMeisterstueck() },
  ];

  function zeigeHalle(begruessen) {
    const z = aktuellerZwerg();
    const kernFertig = stand.coreCount(KAP) === 3;
    const tiefOffen = kernFertig || testmodus;
    let aktiverReiter = 0;

    const inhalt = h('div', { class: 'halle-inhalt' });
    const reiter = h('div', { class: 'reiter', role: 'tablist' });
    const kapitelBox = h('div');

    function stationKarte(def, geschafft, gesperrt, sperrText, i, rohstoff) {
      const b = h('button', { class: 'station' + (geschafft ? ' geschafft' : '') + (gesperrt ? ' gesperrt' : '') },
        h('div', { class: 'icon' }, bild(def.icon, def.name)),
        h('div', null,
          h('div', { class: 'st-name' }, (i !== undefined ? i + 1 + '. ' : '') + def.name),
          h('div', { class: 'st-info' }, gesperrt ? sperrText : def.info),
          rohstoff && !gesperrt ? h('div', { class: 'st-info', style: { fontWeight: 700 } }, 'Bringt: ' + rohstoff) : null),
        geschafft ? h('div', { class: 'haken' }, icon.haken()) : null,
        gesperrt ? h('div', { class: 'schloss', style: { top: '8px', right: '8px', width: '28px', height: '28px' } }, icon.schloss()) : null);
      b.addEventListener('click', () => { if (gesperrt) { ZI.meldung(sperrText); ZI.ton.falsch(); return; } def.start(); });
      return b;
    }

    function kapitel1() {
      return [
        h('section', { class: 'pergament stollen auf-pergament' },
          h('h2', null, 'Hauptstollen'),
          h('p', { class: 'erklaer' }, 'Diese drei Stationen schafft jede und jeder. Jede bringt Baumaterial für unser Dorf.'),
          h('div', { class: 'stationen' }, KERN.map((d, i) => stationKarte(d, stand.hatKern(KAP, i), false, '', i, ROHSTOFF[i].name)))),
        h('section', { class: 'pergament stollen auf-pergament' },
          h('h2', null, 'Tiefe Stollen'),
          h('p', { class: 'erklaer' }, 'Für Meisterschmiede: Jeder Stollen bringt ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine. Daraus wird Schmuck für unser Dorf.'),
          h('div', { class: 'stationen' }, TIEF.map((d, i) => stationKarte(d, stand.hatTief(KAP, i), !tiefOffen, 'Schaffe zuerst den Hauptstollen.')))),
        h('section', { class: 'pergament stollen auf-pergament' },
          h('h2', null, 'Bonusinsel'),
          h('div', { class: 'stationen' },
            stationKarte({ name: 'Funkenregen', info: 'Fang die scharfen Begründungen, bevor sie verglühen! Bis zu 3 Sterne.', icon: 'stern', start: () => spielFunkenregen() },
              stand.bonus[KAP] > 0, !tiefOffen, 'Schaffe zuerst den Hauptstollen.'),
            h('div', { class: 'st-info', style: { alignSelf: 'center', fontSize: '18px' } }, 'Deine Sterne: ' + '★'.repeat(stand.bonus[KAP]) + '☆'.repeat(3 - stand.bonus[KAP])))),
      ];
    }

    function kapitelGesperrt(k) {
      const kap = ZI.KAPITEL[k];
      if (stand.offen >= k) {
        return h('section', { class: 'pergament stollen auf-pergament' },
          h('h2', null, 'Kapitel ' + kap.nr + ': ' + kap.titel),
          h('p', { class: 'erklaer' }, 'Dieses Kapitel wird gerade noch geschmiedet. Bald geht es hier weiter!'));
      }
      const eingabe = h('input', { class: 'eingabe', style: { fontSize: '30px' }, autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', 'aria-label': 'Runenwort' });
      return h('section', { class: 'pergament stollen auf-pergament' },
        h('h2', null, icon.schloss(), 'Kapitel ' + kap.nr + ': ' + kap.titel),
        h('p', { class: 'erklaer' }, 'Dieses Kapitel öffnet sich, wenn eure Klasse auf der Insel genug gebaut hat. Dann zeigt euch die Insel ein Runenwort.'),
        eingabe,
        h('button', { class: 'knopf', style: { marginTop: '12px' }, onclick: () => {
          if (eingabe.value.trim().toUpperCase() === kap.runenwort) {
            fortschritt((s) => { s.offen = Math.max(s.offen, k); }, () => { ZI.ton.fanfare(); zeigeHalle(); });
          } else { ZI.ton.falsch(); ZI.meldung('Das ist nicht das richtige Runenwort.'); }
        } }, 'Runenwort prüfen'));
    }

    function zeichneReiter() {
      ZI.setze(reiter, ...ZI.KAPITEL.map((kap, k) => {
        const b = h('button', { class: k === aktiverReiter ? 'aktiv' : '', role: 'tab', 'aria-selected': String(k === aktiverReiter) },
          'Kapitel ' + kap.nr + ' · ' + kap.titel);
        b.addEventListener('click', () => { aktiverReiter = k; zeichneReiter(); });
        return b;
      }));
      ZI.setze(kapitelBox, ...(aktiverReiter === 0 ? kapitel1() : [kapitelGesperrt(aktiverReiter)]));
    }
    zeichneReiter();
    inhalt.append(reiter, kapitelBox);

    const rohstoffe = ROHSTOFF.map((r, i) => zaehler(r.datei, r.name, stand.hatKern(KAP, i) ? 1 : 0));

    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('stollen-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.35)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', style: { width: '64px', height: '64px', padding: 0, background: 'none', boxShadow: 'none' }, 'aria-label': 'Zwergen-Sammlung öffnen', onclick: () => zeigeWahl(false) }, avatar(stand.zwerg)),
        h('div', null,
          h('div', { class: 'titel' }, z.name),
          h('div', { class: 'untertitel' }, testmodus ? 'Testmodus · Sammlung: Bild antippen' : 'Sammlung: Bild antippen')),
        h('div', { class: 'spacer' }),
        ...rohstoffe,
        zaehler('edelstein', 'Edelsteine', stand.gems()),
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
      werkstueck(datei) {
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
    const f = ZI.fenster([
      h('div', { class: 'gross-bild strahlen' }, bild(datei, alt)),
      h('h2', null, titel),
      h('p', { style: { margin: 0, fontSize: '21px' } }, text),
      h('button', { class: 'knopf', onclick: () => { f.schliessen(); fortschritt(eintragen, () => zeigeHalle()); } }, 'Zurück zur Halle'),
    ]);
  }

  /* =========================================================
     Auswahlspiel: eine richtige Antwort aus mehreren
     (Stumpf oder scharf? · Fehlerjagd · Beispiel-Edelstein)
     ========================================================= */
  function auswahlSpiel({ titel, frageText, items, tipp, wsVorher, wsNachher, start, ende }) {
    const bue = buehne(wsVorher);
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel, anzahl: items.length, aufgabe: box, bue });
    let nr = 0;
    bue.sage(start, 'erklaert');

    function zeigeItem() {
      const it = items[nr];
      bue.werkstueck(wsVorher);
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
      const opts = mischen(it.optionen);
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
            bue.schlag(() => bue.werkstueck(wsNachher));
            optEls.forEach((x) => { if (x !== b) x.classList.add('weg'); });
            weiter.style.display = '';
          } else {
            fehler++;
            b.classList.remove('falsch'); void b.offsetWidth; b.classList.add('falsch');
            ZI.ton.falsch();
            ZI.setze(rueck, h('div', { class: 'rueckmeldung schlecht' }, o.info || zufall(ZI.TROST)));
            bue.sage(zufall(ZI.TROST), 'ermutigt');
            setTimeout(() => b.classList.add('weg'), 450);
            if (fehler >= 2) {
              bue.sage('Ich helfe dir: Eine Möglichkeit bleibt übrig. Lies sie dir genau durch.', 'tipp');
              optEls.forEach((x, i) => { if (!opts[i].ok) x.classList.add('weg'); });
            }
          }
        });
        optEls.push(b);
      });
      const vorlese = () => [it.kopf || '', ...opts.map((o) => o.text)].join('. ');
      ZI.setze(box, 
        aufgabenKopf(frageText, vorlese, tipp, bue),
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
      items: mischen(ZI.STUMPF_SCHARF).map((it) => ({ kopf: it.meinung, optionen: it.optionen.map((o) => ({ text: o.text, ok: o.scharf, info: o.info })) })),
      tipp: ZI.TIPPS.stumpf,
      wsVorher: 'axt-stumpf', wsNachher: 'axt-scharf',
      start: 'Eine scharfe Begründung erklärt, WARUM. Eine stumpfe sagt nur dasselbe noch einmal.',
      ende: () => geschafft({ titel: 'Station geschafft!', text: 'Du hast alle Äxte geschärft. Dafür bekommt das Dorf Holz.', datei: 'holz', alt: 'Holz',
        eintragen: (s) => s.setzeKern(KAP, 0) }),
    });
  }

  /* Tiefer Stollen 1 */
  function spielFehlerjagd() {
    auswahlSpiel({
      titel: 'Fehlerjagd',
      frageText: 'Der Fehlerkobold hat zwei Sätze verbogen. Welcher Satz ist richtig?',
      items: mischen(ZI.FEHLERJAGD).map((it) => ({ kopf: '', optionen: it.saetze.map((o) => ({ text: o.text, ok: o.ok, info: o.info })) })),
      tipp: ZI.TIPPS.fehler,
      wsVorher: 'kobold-chaos', wsNachher: 'kobold-besiegt',
      start: 'Achtung, der Fehlerkobold war hier! Prüfe Komma und Verb.',
      ende: () => geschafft({ titel: 'Kobold besiegt!', text: 'Du hast alle Fehler gefunden. Dafür bekommst du ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine.', datei: 'edelstein', alt: 'Edelstein',
        eintragen: (s) => s.setzeTief(KAP, 0) }),
    });
  }

  /* Tiefer Stollen 2 */
  function spielBeispiele() {
    auswahlSpiel({
      titel: 'Beispiel-Edelstein',
      frageText: 'Welches Beispiel macht das Argument noch stärker?',
      items: mischen(ZI.BEISPIELE).map((it) => ({ kopf: it.argument, optionen: it.optionen })),
      tipp: ZI.TIPPS.beispiel,
      wsVorher: 'eisen-roh', wsNachher: 'edelstein',
      start: 'Ein gutes Beispiel zeigt, dass deine Begründung stimmt – wie ein Edelstein im Griff deiner Axt.',
      ende: () => geschafft({ titel: 'Stollen geschafft!', text: 'Du kennst dich mit Beispielen aus. Dafür bekommst du ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine.', datei: 'edelstein', alt: 'Edelstein',
        eintragen: (s) => s.setzeTief(KAP, 1) }),
    });
  }

  /* =========================================================
     Station 2: Erz oder Schlacke?
     ========================================================= */
  function spielErz() {
    const runden = mischen(ZI.ERZ_SCHLACKE);
    const bue = buehne('eisen-roh');
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel: 'Erz oder Schlacke?', anzahl: runden.length, aufgabe: box, bue });
    bue.sage('Erz sind Begründungen, die zur Meinung passen. Schlacke werfen wir weg.', 'erklaert');
    let r = 0;

    function runde() {
      const rd = runden[r];
      const gruende = mischen(rd.gruende);
      let i = 0;
      bue.werkstueck('eisen-roh');
      const karteBox = h('div');
      const rueck = h('div');
      const koerbe = h('div', { class: 'koerbe' });
      const knoepfe = h('div', { class: 'erz-knoepfe' });
      const erzKnopf = h('button', { class: 'knopf' }, 'Erz');
      const schlackeKnopf = h('button', { class: 'knopf schlacke' }, 'Schlacke');
      knoepfe.append(erzKnopf, schlackeKnopf);
      let sperre = false;

      function zeigeGrund() {
        const g = gruende[i];
        ZI.setze(karteBox, h('div', { class: 'erz-karte' }, g.text));
      }
      function antwort(alsErz) {
        if (sperre) return;
        const g = gruende[i];
        const karte = karteBox.firstChild;
        if (alsErz === g.erz) {
          sperre = true;
          ZI.ton.richtig();
          ZI.setze(rueck, h('div', { class: 'rueckmeldung gut' }, g.info));
          bue.sage(zufall(ZI.LOB), 'jubelt');
          koerbe.appendChild(h('span', { class: 'marke' + (g.erz ? '' : ' grau') }, (g.erz ? 'Erz: ' : 'Schlacke: ') + g.text.replace('… ', '')));
          karte.classList.add(g.erz ? 'weg-erz' : 'weg-schlacke');
          if (g.erz) bue.schlag();
          setTimeout(() => {
            sperre = false; i++;
            if (i < gruende.length) { zeigeGrund(); ZI.setze(rueck, ); return; }
            bue.werkstueck('eisen-gluehend');
            bue.sage('Das Erz glüht! Diese Meinung ist gut begründet.', 'jubelt');
            r++; rahmen.fortschritt(r);
            ZI.setze(knoepfe, h('button', { class: 'knopf', style: { gridColumn: 'span 2' }, onclick: () => {
              if (r < runden.length) runde();
              else geschafft({ titel: 'Station geschafft!', text: 'Du hast das ganze Erz sortiert. Dafür bekommt das Dorf Stein.', datei: 'stein', alt: 'Stein', eintragen: (s) => s.setzeKern(KAP, 1) });
            } }, r < runden.length ? 'Nächste Meinung' : 'Fertig!'));
          }, 900);
        } else {
          ZI.ton.falsch();
          karte.classList.remove('falsch'); void karte.offsetWidth;
          karte.style.animation = 'wackeln 0.4s';
          setTimeout(() => { karte.style.animation = ''; }, 420);
          ZI.setze(rueck, h('div', { class: 'rueckmeldung schlecht' }, g.info));
          bue.sage(alsErz ? 'Hm, passt dieser Grund wirklich zur Meinung?' : 'Schau noch einmal: Erklärt dieser Grund nicht doch etwas?', 'ermutigt');
        }
      }
      erzKnopf.addEventListener('click', () => antwort(true));
      schlackeKnopf.addEventListener('click', () => antwort(false));

      ZI.setze(box, 
        aufgabenKopf('Passt die Begründung zur Meinung? Erz oder Schlacke?', () => rd.meinung + ' ' + gruende[i].text, ZI.TIPPS.erz, bue),
        h('div', { class: 'meinung' }, rd.meinung),
        karteBox, knoepfe, rueck, koerbe);
      zeigeGrund();
    }
    runde();
  }

  /* =========================================================
     Station 3: Weil-Denn-Amboss
     ========================================================= */
  function spielWeilDenn() {
    const items = mischen(ZI.WEIL_DENN);
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
        else geschafft({ titel: 'Station geschafft!', text: 'Deine Begründungssätze sitzen. Dafür bekommt das Dorf Eisen.', datei: 'eisen', alt: 'Eisen', eintragen: (s) => s.setzeKern(KAP, 2) });
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
  function spielMeisterstueck() {
    const bue = buehne('eisen-roh');
    const box = h('div', { class: 'aufgabe pergament auf-pergament' });
    const rahmen = spielRahmen({ titel: 'Meisterstück', anzahl: 4, aufgabe: box, bue });
    let thema = null; let satz = null;

    function schritt1() {
      rahmen.fortschritt(0);
      bue.sage('Für ein Meisterstück brauchst du eine Partnerin oder einen Partner. Wähle zuerst ein Thema.', 'erklaert');
      const angebot = mischen(ZI.MEISTER_THEMEN).slice(0, 4);
      ZI.setze(box, 
        aufgabenKopf('Worüber möchtest du argumentieren?', angebot.map((t) => t.frage).join(' '), ZI.TIPPS.meister, bue),
        h('div', { class: 'themen' }, angebot.map((t) => h('button', { class: 'option', onclick: () => { thema = t; ZI.ton.plopp(); schritt2(); } }, t.frage))));
    }
    function schritt2() {
      rahmen.fortschritt(1);
      bue.sage('Bist du dafür oder dagegen? Beides ist erlaubt – Hauptsache, du begründest gut.', 'erklaert');
      ZI.setze(box, 
        aufgabenKopf('Deine Meinung:', thema.frage, ZI.TIPPS.meister, bue),
        h('div', { class: 'meinung' }, thema.frage),
        h('div', { class: 'erz-knoepfe' },
          h('button', { class: 'knopf moos', onclick: () => { satz = thema.dafuer; schritt3(); } }, 'Dafür'),
          h('button', { class: 'knopf holz', onclick: () => { satz = thema.dagegen; schritt3(); } }, 'Dagegen')));
    }
    function schritt3() {
      rahmen.fortschritt(2);
      bue.werkstueck('eisen-gluehend');
      bue.sage('Überlege dir eine Begründung, die erklärt, WARUM. Wenn du magst, denk dir auch ein Beispiel aus: „Zum Beispiel …“', 'tipp');
      ZI.setze(box, 
        aufgabenKopf('Bereite dich vor. Dann sag deinen Satz laut zu deinem Partner.', satz, ZI.TIPPS.meister, bue),
        h('div', { class: 'sprechblase-gross' }, satz),
        h('p', { style: { margin: 0, fontSize: '19px' } }, 'Sprich in ganzen Sätzen. Dein Partner hört genau zu und prüft danach drei Dinge.'),
        h('button', { class: 'knopf', style: { alignSelf: 'flex-end' }, onclick: schritt4 }, 'Ich habe es gesagt – iPad weitergeben'));
    }
    function schritt4() {
      rahmen.fortschritt(3);
      bue.sage('Jetzt bist du dran, Partnerin oder Partner! Was hast du gehört? Sei ehrlich – das hilft am meisten.', 'erklaert');
      const punkte = [
        'Ich habe die Meinung gehört („Ich finde, dass …“).',
        'Ich habe eine Begründung mit weil, da oder denn gehört.',
        'Die Begründung hat erklärt, WARUM – sie war scharf.',
      ];
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
          setTimeout(() => geschafft({ titel: 'Meisterstück!', text: 'Ein echtes Meisterstück – laut und gut begründet. Dafür bekommst du ' + ZI.GEMS_PRO_STOLLEN + ' Edelsteine.', datei: 'edelstein', alt: 'Edelstein',
            eintragen: (s) => s.setzeTief(KAP, 2) }), 900);
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
        aufgabenKopf('Partner-Check: Tippe an, was du gehört hast.', punkte.join(' '), 'Hör genau hin. Fehlt etwas, sag es freundlich: „Mir hat noch gefehlt, …“', bue),
        h('div', { class: 'sprechblase-gross', style: { fontSize: '20px' } }, satz),
        liste, fertigKnopf);
    }
    schritt1();
  }

  /* =========================================================
     BONUS: Funkenregen
     ========================================================= */
  function spielFunkenregen() {
    const DAUER = 60;
    const runden = mischen(ZI.FUNKENREGEN);
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
      const vorher = stand.bonus[KAP];
      ZI.ton.fanfare();
      const f = ZI.fenster([
        h('div', { class: 'gross-bild strahlen' }, bild('stern', 'Stern')),
        h('h2', null, punkte + ' scharfe Funken gefangen!'),
        h('div', { style: { fontSize: '48px', color: 'var(--gold-dunkel)', letterSpacing: '6px' } }, '★'.repeat(sterne) + '☆'.repeat(3 - sterne)),
        h('p', { style: { margin: 0 } }, sterne > vorher ? 'Neuer Rekord! Jeder Stern ist ein Edelstein für dein Dorf.' : 'Ab 8 Funken gibt es 1 Stern, ab 14 Funken 2 und ab 20 Funken 3 Sterne.'),
        h('div', { class: 'knopf-reihe' },
          h('button', { class: 'knopf holz', onclick: () => { f.schliessen(); spielFunkenregen(); } }, 'Nochmal'),
          h('button', { class: 'knopf', onclick: () => { f.schliessen(); if (sterne > vorher) fortschritt((s) => { s.bonus[KAP] = sterne; }, () => zeigeHalle()); else zeigeHalle(); } }, 'Zur Halle'))]);
    }

    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('vulkan-hintergrund', 'hg-ersatz-vulkan', 'rgba(20,12,8,0.3)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück', onclick: () => { laeuft = false; clearInterval(timer); clearTimeout(spawner); zeigeHalle(); } }, icon.zurueck()),
        h('div', { class: 'titel' }, 'Funkenregen'),
        h('div', { class: 'spacer' }), h('div', { class: 'zaehler', 'aria-label': 'Punkte' }, bild('stern', 'Punkte'), punktEl), zeitEl, tonKnopf()),
      arena));

    const f = ZI.fenster([
      h('div', { class: 'gross-bild' }, bild('meisterin-tipp', 'Meisterin Hammerlind')),
      h('h2', null, 'Funkenregen'),
      h('p', { style: { margin: 0, fontSize: '21px' } }, 'Oben steht eine Meinung. Von oben regnen Begründungen. Tippe nur die scharfen Begründungen an! Stumpfe kosten einen Punkt.'),
      h('button', { class: 'knopf', onclick: () => { f.schliessen(); starten(); } }, 'Start!')]);
  }

  /* =========================================================
     LIEFERUNG & ZWERGENPASS
     ========================================================= */
  function zeigeLieferung() {
    const code = stand.code();
    let qrEl;
    try {
      const qr = window.qrcode(0, 'M');
      qr.addData(ZI.QR_PREFIX + code.replace('-', ''));
      qr.make();
      qrEl = h('div', { class: 'qr-feld', html: qr.createSvgTag({ cellSize: 8, margin: 2, scalable: true, alt: 'QR-Code für die Lieferung' }) });
    } catch (e) {
      qrEl = h('div', { class: 'qr-feld' }, 'QR-Code nicht verfügbar');
    }
    const z = aktuellerZwerg();
    zeige(h('div', { class: 'screen' },
      ZI.hintergrund('stollen-hintergrund', 'hg-ersatz-stollen', 'rgba(20,12,8,0.45)'),
      h('div', { class: 'leiste' },
        h('button', { class: 'rund', 'aria-label': 'Zurück zur Halle', onclick: () => zeigeHalle() }, icon.zurueck()),
        h('div', null, h('div', { class: 'titel' }, 'Lieferung & Zwergenpass'), h('div', { class: 'untertitel' }, z.name)),
        h('div', { class: 'spacer' })),
      h('div', { class: 'screen-scroll', style: { position: 'relative', zIndex: 2, display: 'flex' } },
        h('div', { class: 'lieferung' },
          qrEl,
          h('div', { class: 'pergament pass-karte auf-pergament' },
            h('h2', { style: { fontSize: '30px' } }, 'Dein Zwergenpass'),
            h('div', { class: 'pass-code', 'aria-label': 'Code: ' + code.split('').join(' ') }, code),
            h('ol', { class: 'schritte' },
              h('li', null, 'Zeig den QR-Code deiner Lehrkraft. So kommt dein Material auf die Insel.'),
              h('li', null, 'Schreib den Code genau ab – auf deine Zwergenpass-Karte. Streich den alten Code durch.'),
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
