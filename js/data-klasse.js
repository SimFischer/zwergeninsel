/* Zwergeninsel – angepasst an den Unterricht der 5a (UE „Meinung begründen“, Sept./Okt. 2026)
   Begriffe wie im Unterricht: Meinung – Begründung – Beispiel, Echo-Spiel „Du sagst, dass … Dazu denke ich, dass …“,
   gebeugtes Verb, Begründungshand (Deutschbuch 5, S. 58–65). Keine Namen aus der Klasse. */

(function () {
  const ZI = window.ZI;

  /* ---------- Gesprächsregeln wie auf dem Beobachtungsbogen zum Echo-Spiel ---------- */
  ZI.RATSREGELN = [
    'Wir hören zu und wiederholen die Meinung des anderen in eigenen Worten.',
    'Wir verhalten uns respektvoll.',
    'Wir begründen unsere Meinung.',
    'Wir zeigen mit Blickkontakt, dass wir zuhören.',
    'Wir unterbrechen niemanden.',
  ];
  ZI.SATZANFAENGE = [
    'Ich finde, dass …, weil …',
    'Du sagst, dass … Dazu denke ich, dass …',
    'Ich kann dein Argument nachvollziehen. Aber …',
    'Am wichtigsten finde ich, dass …',
  ];
  /* Satzanfänge für die Diskussion im Stamm und im Rat */
  ZI.DISKUSSION_SAETZE = [
    '„Ich finde …, weil …“',
    '„Ein Argument dafür ist …“',
    '„Dagegen spricht …“',
    '„Du sagst, dass … Ich denke dazu …“',
    '„Ich verstehe dein Argument, aber …“',
  ];
  ZI.ALLE_SAETZE = [
    'Ich finde, dass …, weil …',
    'Du sagst, dass … Dazu denke ich, dass …',
    'Wenn ich dich richtig verstanden habe, …',
    'Ich kann dein Argument nachvollziehen. Aber …',
  ];
  const rolle = (id) => ZI.STAMMES_ROLLEN.find((r) => r.id === id);
  rolle('bote').saetze = ['Unser Stamm ist für …, weil …', 'Am wichtigsten finden wir, dass …', 'Wir waren uns nicht einig: Einerseits …, andererseits …'];
  rolle('gedaechtnis').saetze = ['Du hast gesagt, dass …', 'Bis jetzt haben wir gesagt, dass …', 'Auf der einen Seite …, auf der anderen Seite …'];

  /* ---------- Begründet oder nicht? (Stunde 7: Sitzordnung) ---------- */
  ZI.BEGRUENDET_RUNDEN = [
    { kopf: 'Thema: Wie soll unsere Sitzordnung aussehen?', jaText: 'begründet', neinText: 'nicht begründet',
      frage: 'Ist diese Meinung begründet?',
      falschJa: 'Sagt die Person wirklich, WARUM? Oder nur, WAS sie möchte?',
      falschNein: 'Schau genau: Steht da ein „weil“, „da“ oder „denn“ mit einem echten Grund?',
      rundeFertig: 'Alles sortiert! Nur eine begründete Meinung kann andere überzeugen.',
      karten: [
        { text: 'Ich bin dafür, dass sich jeder selbst seinen Platz aussuchen darf.', ja: false, info: 'Nicht begründet: Die Person sagt nur, was sie möchte.' },
        { text: 'Ich finde, wir sollten über die Sitzordnung diskutieren. Denn so kann jeder seine Wünsche einbringen.', ja: true, info: 'Begründet: „Denn so kann jeder …“ nennt den Grund.' },
        { text: 'Eine Auslosung wäre fair, weil dann der Zufall entscheidet und sich keiner benachteiligt fühlen muss.', ja: true, info: 'Begründet mit „weil“ und einem echten Grund.' },
        { text: 'Unser Lehrer sollte die Sitzordnung bestimmen, da er uns alle am besten kennt.', ja: true, info: 'Begründet mit „da“.' },
        { text: 'Ich bin der Meinung, dass wir die Sitzordnung alle zwei Monate neu auslosen sollten.', ja: false, info: 'Nicht begründet: Warum alle zwei Monate? Das fehlt.' },
        { text: 'Ich bin für Gruppentische. Das finde ich einfach am besten.', ja: false, info: 'Nicht begründet: „Finde ich am besten“ erklärt nicht, warum.' },
      ] },
    { kopf: 'Thema: Sollte es längere Pausen geben, dafür aber später Schulschluss?', jaText: 'begründet', neinText: 'nicht begründet',
      frage: 'Ist diese Meinung begründet?',
      falschJa: 'Sagt die Person wirklich, WARUM?',
      falschNein: 'Schau genau: Steht da ein echter Grund?',
      rundeFertig: 'Alles sortiert! Nur eine begründete Meinung kann andere überzeugen.',
      karten: [
        { text: 'Ich bin für längere Pausen, weil wir uns dann besser erholen können.', ja: true, info: 'Begründet mit „weil“.' },
        { text: 'Längere Pausen wären super.', ja: false, info: 'Nicht begründet: Warum wären sie super?' },
        { text: 'Ich bin dagegen, denn dann komme ich zu spät zum Training.', ja: true, info: 'Begründet mit „denn“.' },
        { text: 'Ich will auf keinen Fall später nach Hause.', ja: false, info: 'Nicht begründet: Nur ein Wunsch, kein Grund.' },
        { text: 'Längere Pausen sind gut, da wir dann mehr Zeit zum Frühstücken haben.', ja: true, info: 'Begründet mit „da“.' },
        { text: 'Ich finde die Idee blöd.', ja: false, info: 'Nicht begründet – und eine Gesprächsbremse.' },
      ] },
  ];

  /* ---------- Erz oder Schlacke: Klassendienste (Arbeitsblatt, Aufgabe 4) ---------- */
  ZI.ERZ_SCHLACKE.push({
    meinung: 'Die Klasse 5a sollte sich auf eine Regelung der Klassendienste einigen, …',
    gruende: [
      { text: '… weil ohne Regelung der Klassenraum schnell chaotisch wird.', erz: true, info: 'Erz! Ein klarer Grund, warum man eine Regelung braucht.' },
      { text: '… weil die Eltern und Lehrer den Dienst sonst nicht übernehmen.', erz: false, info: 'Schlacke. Das hat niemand vor – kein Grund für eine Regelung.' },
      { text: '… weil dadurch der Dienst gerecht und fair verteilt werden kann.', erz: true, info: 'Erz! Gerechtigkeit ist ein starker Grund.' },
      { text: '… weil die meisten den Dienst sowieso gern freiwillig übernehmen.', erz: false, info: 'Schlacke. Wenn alle es freiwillig machen, bräuchte man gar keine Regelung.' },
      { text: '… weil wir als Klasse selbst für die Ordnung verantwortlich sind.', erz: true, info: 'Erz! Verantwortung ist ein guter Grund.' },
    ],
  });

  /* ---------- Wer hört zu? Das Missverständnis aus Stunde 5 ---------- */
  ZI.ZUHOEREN.push({
    vorher: 'Nele: „Ich finde, wir sollten weniger Hausaufgaben bekommen, weil man nachmittags auch Zeit für Freunde und Hobbys braucht.“',
    optionen: [
      { text: '„Wenn wir gar keine Hausaufgaben mehr hätten, würden wir vieles nicht üben.“', ok: false, info: 'Genau so hat Ben geantwortet – und Nele falsch verstanden. Sie hat „weniger“ gesagt, nicht „keine“.' },
      { text: '„Du sagst, dass wir weniger Hausaufgaben bekommen sollten, weil wir Zeit für Freunde brauchen. Dazu denke ich, dass …“', ok: true, info: 'Richtig! Erst wiederholen, dann die eigene Meinung – so entsteht kein Missverständnis.' },
      { text: '„Du willst also die Hausaufgaben abschaffen?“', ok: false, info: 'Das verdreht Neles Meinung. Sie will weniger, nicht keine.' },
    ],
  });
  ZI.VORMACHEN.k3s2 = {
    titel: 'Wer hört zu?',
    kopf: 'Nele: „Ich finde, wir sollten weniger Hausaufgaben bekommen, weil man nachmittags auch Zeit für Freunde und Hobbys braucht.“',
    schritte: [
      { sagt: 'Erinnerst du dich an Ben? Er hat geantwortet, als wolle Nele gar keine Hausaufgaben mehr. Das hat sie nicht gesagt.',
        zeigt: { text: '„Wenn wir gar keine Hausaufgaben mehr hätten …“', art: 'schlecht', marke: 'verdreht' } },
      { sagt: 'Mit dem Echo-Spiel wäre das nicht passiert: zuerst genau wiederholen, dann die eigene Meinung.',
        zeigt: { text: '„Du sagst, dass wir weniger Hausaufgaben bekommen sollten … Dazu denke ich, dass …“', art: 'gut', marke: 'Echo' } },
    ],
  };

  /* ---------- Gebäude-Übung der Mühle wird zur Begründungshand ---------- */
  const muehle = ZI.BAU_UEBUNGEN.find((u) => u.id === 'muehle');
  Object.assign(muehle, {
    name: 'Die Begründungshand', typ: 'hand',
    schwerpunkt: 'Aus fünf Begründungen die zwei stärksten auswählen',
    frage: 'Tippe die zwei stärksten Begründungen an.',
    start: 'Die Mühle mahlt deine Begründungshand: Fünf Finger, fünf Begründungen. Übrig bleiben die zwei stärksten.',
    tipp: 'Starke Begründungen sind wichtig und gelten für viele. Schwach sind Begründungen, die nur für dich gelten, nebensächlich sind oder nicht zur Meinung passen.',
    items: [
      { meinung: 'Ich bin für einen Ausflug in den Kletterpark.', begruendungen: [
        { text: '… weil wir uns beim Klettern gegenseitig helfen und so als Klasse zusammenwachsen.', ok: true },
        { text: '… weil man lernt, mutig zu sein, und stolz ist, wenn man es geschafft hat.', ok: true },
        { text: '… weil ich gern klettere.', ok: false, info: 'Das gilt nur für dich, nicht für die ganze Klasse.' },
        { text: '… weil es dort einen Kiosk gibt.', ok: false, info: 'Das ist nebensächlich.' },
        { text: '… weil mein Cousin dort schon war.', ok: false, info: 'Was dein Cousin gemacht hat, ist kein Grund für die Klasse.' }] },
      { meinung: 'Ich finde, dass wir eine Schulübernachtung machen sollten.', begruendungen: [
        { text: '… weil ich gern in meinem Schlafsack schlafe.', ok: false, info: 'Das gilt nur für dich.' },
        { text: '… weil wir uns als neue Klasse dabei besser kennenlernen.', ok: true },
        { text: '… weil wir dann lange wach bleiben dürfen.', ok: false, info: 'Das ist nur ein Wunsch – kein guter Grund für die Klasse.' },
        { text: '… weil wir gemeinsam etwas erleben, an das wir uns lange erinnern.', ok: true },
        { text: '… weil es dann Pizza geben könnte.', ok: false, info: 'Das ist nebensächlich.' }] },
      { meinung: 'Ich finde, dass es einen Schwimmtag geben sollte.', begruendungen: [
        { text: '… weil man sicherer im Wasser wird, was im Sommer wichtig ist.', ok: true },
        { text: '… weil ich eine neue Badehose habe.', ok: false, info: 'Das gilt nur für dich.' },
        { text: '… weil es im Schwimmbad eine Rutsche gibt.', ok: false, info: 'Das ist nebensächlich.' },
        { text: '… weil Schwimmen den ganzen Körper trainiert.', ok: true },
        { text: '… weil wir dann keinen Unterricht haben.', ok: false, info: 'Das ist kein guter Grund – es klingt nach „frei haben“.' }] },
      { meinung: 'Ich bin dafür, dass Haustiere in der Schule erlaubt sind.', begruendungen: [
        { text: '… weil meine Katze sonst allein ist.', ok: false, info: 'Das gilt nur für dich.' },
        { text: '… weil Tiere viele Kinder beruhigen.', ok: true },
        { text: '… weil viele Kinder zu Hause ein Haustier haben.', ok: false, info: 'Das erklärt nicht, warum Tiere in die Schule sollen.' },
        { text: '… weil wir lernen, Verantwortung für ein Lebewesen zu übernehmen.', ok: true },
        { text: '… weil ein Hamster süß aussieht.', ok: false, info: 'Das ist nur ein Gefühl und nebensächlich.' }] },
      { meinung: 'Ich finde, dass wir einen Waldausflug machen sollten.', begruendungen: [
        { text: '… weil wir dort Tiere beobachten und viel über die Natur lernen.', ok: true },
        { text: '… weil wir im Wald picknicken können.', ok: false, info: 'Das ist nebensächlich.' },
        { text: '… weil ich gern Stöcke sammle.', ok: false, info: 'Das gilt nur für dich.' },
        { text: '… weil frische Luft und Bewegung allen guttun.', ok: true },
        { text: '… weil der Wald nicht weit weg ist.', ok: false, info: 'Das sagt nur, dass es möglich ist – nicht, warum es gut ist.' }] },
    ],
    wissen: { titel: 'Die Begründungshand', text: 'Sammle fünf Begründungen – für jeden Finger eine. Dann wählst du die zwei stärksten aus: Sie sind wichtig und gelten für viele.', beispiel: 'Schwach: … weil ich gern klettere.\nStark: … weil wir uns beim Klettern gegenseitig helfen.' },
  });
  const seite = ZI.WISSEN.find((w) => w.art === 'bau' && w.bau === 'muehle');
  if (seite) Object.assign(seite, muehle.wissen);

  /* ---------- Themen der 5a (Stunde 1, 4, 7 und Themenwahl aus Stunde 12) ---------- */
  const neueThemen = [
    ['Sollte unsere Klasse einen Ausflug in den Kletterpark machen?', 'unsere Klasse einen Ausflug in den Kletterpark machen sollte', 'unsere Klasse keinen Ausflug in den Kletterpark machen sollte'],
    ['Sollte es längere Pausen geben, dafür aber später Schulschluss?', 'es längere Pausen und dafür später Schulschluss geben sollte', 'es keine längeren Pausen mit späterem Schulschluss geben sollte'],
    ['Sollte Handball anstatt Fußball gespielt werden?', 'in der Pause Handball anstatt Fußball gespielt werden sollte', 'in der Pause weiter Fußball gespielt werden sollte'],
    ['Sollte es einen schulinternen Fußballverein geben?', 'es einen schulinternen Fußballverein geben sollte', 'es keinen schulinternen Fußballverein geben sollte'],
    ['Sollte es einen Kunsttag geben?', 'es einen Kunsttag geben sollte', 'es keinen Kunsttag geben sollte'],
  ];
  neueThemen.forEach(([frage, dafuer, dagegen]) => {
    if (!ZI.MEISTER_THEMEN.some((t) => t.frage === frage)) {
      ZI.MEISTER_THEMEN.push({ frage, dafuer: 'Ich finde, dass ' + dafuer + ', weil …', dagegen: 'Ich finde, dass ' + dagegen + ', weil …' });
    }
  });

  /* ---------- Rückblick: Ich-kann-Sätze wie im Unterricht ---------- */
  ZI.ICH_KANN[0].splice(1, 0, { text: 'Ich erkenne, ob eine Meinung begründet ist oder nicht.', uebung: { art: 'kern', i: 1 } });
  ZI.ICH_KANN[1].splice(2, 0, { text: 'Ich kann im Echo-Spiel wiederholen, was der andere gesagt hat.', uebung: { art: 'kern', i: 2 } });
  ZI.ICH_KANN[2].push({ text: 'Ich kann ein Argument der anderen Seite nachvollziehen und nennen.', uebung: { art: 'tief', i: 0 } });

  /* ---------- Inselrätsel: Wahr oder falsch? (Lernerfolgskontrolle) ---------- */
  ZI.RICHTIG_FALSCH = [
    { satz: 'Ich stütze meine Meinung durch Begründungen.', ok: true, info: 'Richtig: Die Begründung stützt die Meinung.' },
    { satz: 'Meine Beispiele werden durch Begründungen belegt.', ok: false, info: 'Falsch: Umgekehrt! Das Beispiel macht die Begründung anschaulich.' },
    { satz: 'Mein stärkstes Argument nenne ich am besten zum Schluss.', ok: true, info: 'Richtig: Das Stärkste zuletzt – dann bleibt es im Kopf.' },
    { satz: 'Gegenargumente sind Argumente, die gegen meine Meinung sprechen.', ok: true, info: 'Richtig.' },
    { satz: 'Argumente sind Begründungen für eine Meinung.', ok: true, info: 'Richtig: Ein Argument ist eine Begründung.' },
    { satz: 'Begründungen kann ich mit „weil“, „da“ oder „denn“ einleiten.', ok: true, info: 'Richtig – und vor dem Bindewort steht ein Komma.' },
    { satz: 'Das Wichtigste ist, dass meine Argumente mich selbst überzeugen.', ok: false, info: 'Falsch: Sie sollen die anderen überzeugen.' },
    { satz: 'Nach „denn“ steht das gebeugte Verb am Ende.', ok: false, info: 'Falsch: Nach „denn“ steht es an zweiter Stelle. Am Ende steht es nach „weil“ und „da“.' },
    { satz: 'Im Echo-Spiel wiederhole ich zuerst, was der andere gesagt hat.', ok: true, info: 'Richtig: „Du sagst, dass … Dazu denke ich, dass …“' },
  ];
  const original = ZI.raetselFragen;
  ZI.raetselFragen = function (bisKapitel, anzahl) {
    const fragen = original(bisKapitel, anzahl);
    const rf = ZI.mischen(ZI.RICHTIG_FALSCH).slice(0, 2).map((x) => ({
      frage: 'Richtig oder falsch?', kopf: x.satz, fest: true,
      optionen: [{ text: 'Richtig', ok: x.ok }, { text: 'Falsch', ok: !x.ok }], info: x.info }));
    return ZI.mischen(fragen.slice(0, Math.max(0, anzahl - 2)).concat(rf));
  };
})();
