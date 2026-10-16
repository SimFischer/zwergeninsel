/* Zwergeninsel – Ränge, Abzeichen und Inselrätsel */

(function () {
  const ZI = window.ZI;

  /* Zwerginnen bekommen weibliche Rangbezeichnungen */
  [2, 4, 5, 8, 10, 12].forEach((nr) => { const z = ZI.ZWERGE.find((d) => d.nr === nr); if (z) z.w = true; });

  /* =========================================================
     RÄNGE
     Punkte: jede geschaffte Station, jeder Tiefe Stollen, jeder Bonusstern
     und jede goldene Krone zählt 1 Punkt (höchstens 36).
     ========================================================= */
  ZI.RAENGE = [
    { ab: 0, m: 'Lehrling', w: 'Lehrling' },
    { ab: 3, m: 'Funkenschläger', w: 'Funkenschlägerin' },
    { ab: 7, m: 'Geselle', w: 'Gesellin' },
    { ab: 12, m: 'Erzkenner', w: 'Erzkennerin' },
    { ab: 18, m: 'Altgeselle', w: 'Altgesellin' },
    { ab: 25, m: 'Meisterschmied', w: 'Meisterschmiedin' },
    { ab: 32, m: 'Großmeister', w: 'Großmeisterin' },
  ];
  ZI.rangPunkte = (s) => s.coreTotal() + s.deepTotal() + s.bonusTotal() + s.kronenTotal();
  ZI.rang = function (s) {
    const p = ZI.rangPunkte(s);
    let nr = 0;
    ZI.RAENGE.forEach((r, i) => { if (p >= r.ab) nr = i; });
    const z = ZI.ZWERGE.find((d) => d.nr === s.zwerg);
    const r = ZI.RAENGE[nr]; const naechster = ZI.RAENGE[nr + 1];
    return { nr, name: z && z.w ? r.w : r.m, punkte: p, ab: r.ab, naechsterAb: naechster ? naechster.ab : null,
      naechsterName: naechster ? (z && z.w ? naechster.w : naechster.m) : null };
  };

  /* =========================================================
     ABZEICHEN
     stufe: bronze | silber | gold · symbol: siehe ZI.abzeichenSymbol
     ========================================================= */
  ZI.ABZEICHEN = [
    { id: 'funke', name: 'Erster Funke', text: 'Die erste Station geschafft.', stufe: 'bronze', symbol: 'flamme',
      test: (s) => s.coreTotal() + s.deepTotal() >= 1 },
    { id: 'k1', name: 'Gestrandet', text: 'Den Hauptstollen in Kapitel 1 geschafft.', stufe: 'bronze', symbol: 'hammer',
      test: (s) => s.coreCount(0) === 3 },
    { id: 'k2', name: 'Dorfbaumeister', text: 'Den Hauptstollen in Kapitel 2 geschafft.', stufe: 'silber', symbol: 'hammer',
      test: (s) => s.coreCount(1) === 3 },
    { id: 'k3', name: 'Festredner', text: 'Den Hauptstollen in Kapitel 3 geschafft.', stufe: 'gold', symbol: 'hammer',
      test: (s) => s.coreCount(2) === 3 },
    { id: 'fehler', name: 'Fehlerjäger', text: 'Die Fehlerjagd geschafft.', stufe: 'bronze', symbol: 'lupe',
      test: (s) => s.hatTief(0, 0) },
    { id: 'kobold', name: 'Kobold-Bezwinger', text: 'Den Fehlerkobold im Kobold-Kampf besiegt.', stufe: 'silber', symbol: 'schild',
      test: (s) => s.hatTief(1, 0) },
    { id: 'rede', name: 'Redemeister', text: 'Alle drei Meisterstücke laut gemeistert.', stufe: 'gold', symbol: 'sprechblase',
      test: (s) => s.hatTief(0, 2) && s.hatTief(1, 2) && s.hatTief(2, 2) },
    { id: 'ohr', name: 'Zuhör-Profi', text: 'Hör-Stollen und „Wer hört zu?“ geschafft.', stufe: 'silber', symbol: 'ohr',
      test: (s) => s.hatKern(1, 2) && s.hatKern(2, 1) },
    { id: 'rat', name: 'Ratsüberzeuger', text: 'Den Inselrat überzeugt.', stufe: 'silber', symbol: 'sprechblase',
      test: (s) => s.hatKern(2, 2) },
    { id: 'krone1', name: 'Goldene Krone', text: 'Eine Station ganz ohne Fehler geschafft.', stufe: 'bronze', symbol: 'krone',
      test: (s) => s.kronenTotal() >= 1 },
    { id: 'krone5', name: 'Kronenschmied', text: 'Fünf goldene Kronen gesammelt.', stufe: 'silber', symbol: 'krone',
      test: (s) => s.kronenTotal() >= 5 },
    { id: 'krone9', name: 'Goldene Hand', text: 'Alle neun Hauptstollen-Stationen fehlerfrei.', stufe: 'gold', symbol: 'krone',
      test: (s) => s.kronenTotal() === 9 },
    { id: 'stern3', name: 'Sternenfänger', text: '3 Sterne in einem Bonusspiel.', stufe: 'silber', symbol: 'stern',
      test: (s) => s.bonusMax() === 3 },
    { id: 'stern9', name: 'Sternenhimmel', text: 'In allen drei Bonusspielen 3 Sterne.', stufe: 'gold', symbol: 'stern',
      test: (s) => s.bonusTotal() === 9 },
    { id: 'gems', name: 'Edelstein-Schatz', text: '30 Edelsteine gesammelt.', stufe: 'silber', symbol: 'edelstein',
      test: (s) => s.gems() >= 30 },
    { id: 'buch', name: 'Bücherwurm', text: 'Alle Seiten im Wissensbuch gefunden.', stufe: 'gold', symbol: 'buch',
      test: (s, x) => x.wissen === ZI.WISSEN.length },
    { id: 'freunde', name: 'Zwergenfreund', text: 'Acht Zwerge freigeschaltet.', stufe: 'silber', symbol: 'helm',
      test: (s) => s.freieZwerge().length >= 8 },
    { id: 'clan', name: 'Der ganze Clan', text: 'Alle zwölf Zwerge freigeschaltet.', stufe: 'gold', symbol: 'helm',
      test: (s) => s.freieZwerge().length === 12 },
  ];

  /* =========================================================
     INSELRÄTSEL – Wiederholung zum Stundenbeginn am Board
     Fragen werden aus den Aufgaben der bisherigen Kapitel gezogen.
     ========================================================= */
  ZI.raetselFragen = function (bisKapitel, anzahl) {
    const pool = [];
    const mische = ZI.mischen;
    const nimm = (arr, n, f) => mische(arr).slice(0, n).forEach((x) => pool.push(f(x)));
    // Kapitel 1
    nimm(ZI.STUMPF_SCHARF, 3, (it) => ({ frage: 'Welche Begründung ist scharf?', kopf: it.meinung,
      optionen: it.optionen.map((o) => ({ text: o.text, ok: o.scharf })), info: 'Eine scharfe Begründung erklärt, WARUM.' }));
    nimm(ZI.FEHLERJAGD, 3, (it) => ({ frage: 'Welcher Satz ist richtig geschmiedet?', kopf: '',
      optionen: it.saetze.map((o) => ({ text: o.text, ok: o.ok })), info: 'Komma vor weil, da, denn – und das Verb an die richtige Stelle.' }));
    nimm(ZI.BEISPIELE, 2, (it) => ({ frage: 'Welches Beispiel passt?', kopf: it.argument,
      optionen: it.optionen.map((o) => ({ text: o.text, ok: o.ok })), info: 'Ein gutes Beispiel zeigt, dass die Begründung stimmt.' }));
    if (bisKapitel >= 1) {
      nimm(ZI.TEIL_ERKENNEN, 3, (it) => ({ frage: 'Welcher Teil des Arguments ist das?', kopf: it.satz,
        optionen: ['These', 'Begründung', 'Beispiel'].map((t) => ({ text: t, ok: t === it.teil })), info: ZI.TEIL_INFO[it.teil] }));
      const beitraege = [];
      ZI.MOTOR_BREMSE.forEach((g) => g.beitraege.forEach((b) => beitraege.push(b)));
      nimm(beitraege, 3, (b) => ({ frage: 'Gesprächsmotor oder Gesprächsbremse?', kopf: b.text,
        optionen: [{ text: 'Motor', ok: b.motor }, { text: 'Bremse', ok: !b.motor }], info: b.info, fest: true }));
    }
    if (bisKapitel >= 2) {
      nimm(ZI.JA_UND, 3, (it) => ({ frage: 'Wie reagiert die zweite Person?', kopf: it.vorher + '\n' + it.antwort,
        optionen: ZI.ARTEN.map((a) => ({ text: a, ok: a === it.art })), info: ZI.ARTEN_INFO[it.art], fest: true }));
      nimm(ZI.GEGENARGUMENTE, 2, (it) => ({ frage: 'Welcher Satz ist ein Gegenargument?', kopf: it.argument,
        optionen: it.optionen.map((o) => ({ text: o.text, ok: o.ok })), info: 'Ein Gegenargument spricht gegen die Meinung.' }));
    }
    // aktuelle Kapitel stärker gewichten: die letzten Einträge zuerst mischen, dann auffüllen
    return mische(pool).slice(0, anzahl).map((f) => (f.fest ? f : Object.assign(f, { optionen: mische(f.optionen) })));
  };

  /* =========================================================
     AUFTRAG DES TAGES – ein Klassenziel für die Stunde
     wert(staende): aktueller Gesamtwert der Klasse; Ziel = Zuwachs seit Start
     ========================================================= */
  ZI.AUFTRAEGE = [
    { id: 'liefern', text: (z) => 'Heute liefern mindestens ' + z + ' Zwerge ihr Material ab.', ziel: (n) => Math.max(5, Math.round(n * 0.75)),
      einheit: 'Lieferungen', liefernZaehlen: true },
    { id: 'tief', text: (z) => 'Heute schaffen wir zusammen ' + z + ' Tiefe Stollen.', ziel: (n) => Math.max(4, Math.round(n * 0.4)),
      einheit: 'Tiefe Stollen', wert: (st) => st.reduce((a, s) => a + s.deepTotal(), 0) },
    { id: 'meister', text: (z) => 'Heute zeigen wir ' + z + ' Meisterstücke.', ziel: (n) => Math.max(3, Math.round(n * 0.25)),
      einheit: 'Meisterstücke', wert: (st) => st.reduce((a, s) => a + [0, 1, 2].filter((k) => s.hatTief(k, 2)).length, 0) },
    { id: 'kronen', text: (z) => 'Heute schmieden wir ' + z + ' goldene Kronen.', ziel: (n) => Math.max(4, Math.round(n * 0.35)),
      einheit: 'Kronen', wert: (st) => st.reduce((a, s) => a + s.kronenTotal(), 0) },
    { id: 'gems', text: (z) => 'Heute sammeln wir ' + z + ' Edelsteine.', ziel: (n) => Math.max(15, Math.round(n * 1.5)),
      einheit: 'Edelsteine', wert: (st) => st.reduce((a, s) => a + s.gems(), 0) },
  ];
  /* Sonder-Schmuck für erfüllte Aufträge */
  ZI.SONDERSCHMUCK = [
    { id: 'statue', name: 'Ehrenstatue', x: 47, y: 86, w: 5 },
    { id: 'kristall-laterne', name: 'Kristall-Laterne', x: 34, y: 76, w: 3.5 },
    { id: 'fahne', name: 'Siegesfahne', x: 60, y: 30, w: 4 },
    { id: 'gemuesegarten', name: 'Festgarten', x: 30, y: 30, w: 7 },
    { id: 'ziegen', name: 'Inselziegen', x: 78, y: 70, w: 6 },
    { id: 'wegweiser', name: 'Wegweiser', x: 66, y: 86, w: 4 },
  ];
})();
