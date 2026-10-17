/* Zwergeninsel – Inhalte für Kapitel 2: Das Dorf wächst
   Schwerpunkt: These, Begründung, Beispiel und Gesprächsregeln */

(function () {
  const ZI = window.ZI;

  /* =========================================================
     HAUPTSTOLLEN
     ========================================================= */

  /* Station 1: Argument-Puzzle – These, Begründung und Beispiel zusammensetzen.
     Pro Puzzle drei Argumente, deren Teile durcheinandergeraten sind. */
  ZI.PUZZLE = [
    [
      { these: 'Mein Fahrrad ist das beste Verkehrsmittel für den Schulweg,',
        begruendung: '… weil ich damit schneller bin als mit dem Bus.',
        beispiel: 'Während die anderen noch an der Haltestelle warten, bin ich schon zu Hause.' },
      { these: 'Mein Füller ist der beste Stift,',
        begruendung: '… weil er beim Schreiben nicht schmiert.',
        beispiel: 'Seit ich ihn habe, sieht mein Heft viel ordentlicher aus.' },
      { these: 'Mein Schulrucksack ist der beste,',
        begruendung: '… denn er hat viele Fächer für alle meine Sachen.',
        beispiel: 'Für meine Mathesachen habe ich zum Beispiel ein eigenes Fach.' },
    ],
    [
      { these: 'Wir sollten einen Waldausflug machen,',
        begruendung: '… weil wir draußen viel über die Natur lernen.',
        beispiel: 'Wir könnten zum Beispiel Spuren von Tieren suchen und bestimmen.' },
      { these: 'Es sollte einen Kreativtag geben,',
        begruendung: '… weil jeder zeigen kann, was er gut kann.',
        beispiel: 'Wer gut malt, gestaltet zum Beispiel ein Plakat, und wer gern baut, bastelt ein Modell.' },
      { these: 'Wir sollten eine Schulübernachtung machen,',
        begruendung: '… weil wir uns als neue Klasse besser kennenlernen.',
        beispiel: 'Beim gemeinsamen Abendessen erzählt zum Beispiel jeder etwas von sich.' },
    ],
  ];

  /* Station 2: Motor oder Bremse? – Beiträge aus Klassengesprächen sortieren */
  ZI.MOTOR_BREMSE = [
    {
      thema: 'Gespräch: Wie verteilen wir die Klassendienste?',
      beitraege: [
        { text: 'Sören: „Ich finde den Vorschlag gut, weil man dann nicht so oft dran ist.“', motor: true,
          info: 'Motor! Sören sagt seine Meinung und begründet sie.' },
        { text: 'Kerstin: „Eine bessere Idee habt ihr nicht? Das ist total blöd.“', motor: false,
          info: 'Bremse! Kerstin macht den Vorschlag schlecht, ohne zu sagen, warum.' },
        { text: 'Luca: „Vielleicht bist du einfach zu langsam.“', motor: false,
          info: 'Bremse! Das ist ein Angriff auf die Person, kein Argument.' },
        { text: 'Sven: „Ich habe eine andere Idee: Jeder räumt seinen eigenen Müll weg.“', motor: true,
          info: 'Motor! Sven bringt einen neuen Vorschlag ins Gespräch.' },
        { text: 'Maike: „Darüber will ich gar nicht reden.“', motor: false,
          info: 'Bremse! Wer nicht mitredet, bringt das Gespräch nicht weiter.' },
        { text: 'Gina: „Ich fasse mal zusammen: Es gibt jetzt zwei Vorschläge.“', motor: true,
          info: 'Motor! Zusammenfassen hilft allen, den Überblick zu behalten.' },
      ],
    },
    {
      thema: 'Gespräch: Sollte es längere Pausen geben?',
      beitraege: [
        { text: 'Tim: „Du sagst, dass wir dann später nach Hause kommen. Das stimmt, aber …“', motor: true,
          info: 'Motor! Tim knüpft an das an, was vorher gesagt wurde.' },
        { text: 'Paula ruft dazwischen: „Nein, nein, nein! Das ist Quatsch!“', motor: false,
          info: 'Bremse! Dazwischenrufen unterbricht die anderen.' },
        { text: 'Emre: „Kannst du noch einmal erklären, wie du das meinst?“', motor: true,
          info: 'Motor! Nachfragen zeigt, dass Emre wirklich verstehen will.' },
        { text: 'Jonas: „Ich rede jetzt, seid alle leise!“', motor: false,
          info: 'Bremse! Jonas bestimmt über die anderen, statt sich zu melden.' },
        { text: 'Mia: „Lea hat noch gar nichts gesagt. Was meinst du, Lea?“', motor: true,
          info: 'Motor! Mia bezieht jemanden ein, der noch nichts gesagt hat.' },
        { text: 'Ben: „Übrigens, habt ihr gestern das Fußballspiel gesehen?“', motor: false,
          info: 'Bremse! Ben wechselt das Thema.' },
      ],
    },
  ];

  /* Station 3: Hör-Stollen – zuhören und verstehen.
     Das iPad liest vor, der Text bleibt verborgen. */
  ZI.HOEREN = [
    { text: 'Ich finde, dass wir einen Schulgarten anlegen sollten, weil wir dort lernen, wie Gemüse wächst. Zum Beispiel könnten wir Tomaten pflanzen und sie im Sommer ernten.',
      fragen: [
        { frage: 'Welche Begründung hast du gehört?', optionen: [
          { text: 'Weil wir dort lernen, wie Gemüse wächst.', ok: true },
          { text: 'Weil Gärten schön aussehen.', ok: false },
          { text: 'Weil wir dort in der Pause spielen können.', ok: false }] },
        { frage: 'Welches Beispiel hast du gehört?', optionen: [
          { text: 'Blumen für den Muttertag pflücken.', ok: false },
          { text: 'Tomaten pflanzen und im Sommer ernten.', ok: true },
          { text: 'Einen Apfelbaum pflanzen.', ok: false }] },
      ] },
    { text: 'Ich bin der Meinung, dass jede Klasse ein Aquarium haben sollte, denn so lernen wir, Verantwortung zu übernehmen. Zum Beispiel müsste jeden Morgen jemand die Fische füttern.',
      fragen: [
        { frage: 'Was war die Meinung?', optionen: [
          { text: 'Jede Klasse sollte ein Aquarium haben.', ok: true },
          { text: 'Jede Klasse sollte einen Schulhund haben.', ok: false },
          { text: 'Fische sollte man nicht in der Schule halten.', ok: false }] },
        { frage: 'Welche Begründung hast du gehört?', optionen: [
          { text: 'Denn Fische sind leise.', ok: false },
          { text: 'Denn Fische sind bunt und schön.', ok: false },
          { text: 'Denn so lernen wir, Verantwortung zu übernehmen.', ok: true }] },
      ] },
    { text: 'Ich finde, dass wir mehr vorlesen sollten, weil man dabei neue Wörter lernt. Zum Beispiel habe ich durch ein Abenteuerbuch das Wort Kompass kennengelernt.',
      fragen: [
        { frage: 'Welche Begründung hast du gehört?', optionen: [
          { text: 'Weil Vorlesen Spaß macht.', ok: false },
          { text: 'Weil man dabei neue Wörter lernt.', ok: true },
          { text: 'Weil Bücher spannend sind.', ok: false }] },
        { frage: 'Welches Wort wurde im Beispiel genannt?', optionen: [
          { text: 'Kompass', ok: true },
          { text: 'Schatzkarte', ok: false },
          { text: 'Abenteuer', ok: false }] },
      ] },
    { text: 'Ich bin der Meinung, dass man mit dem Fahrrad zur Schule fahren sollte, weil das gut für die Umwelt ist. Ein Fahrrad stößt zum Beispiel keine Abgase aus, ein Auto schon.',
      fragen: [
        { frage: 'Was war die Meinung?', optionen: [
          { text: 'Man sollte mit dem Bus zur Schule fahren.', ok: false },
          { text: 'Man sollte zu Fuß zur Schule gehen.', ok: false },
          { text: 'Man sollte mit dem Fahrrad zur Schule fahren.', ok: true }] },
        { frage: 'Welches Beispiel hast du gehört?', optionen: [
          { text: 'Ein Fahrrad stößt keine Abgase aus.', ok: true },
          { text: 'Mit dem Fahrrad ist man schneller.', ok: false },
          { text: 'Fahrradfahren hält fit.', ok: false }] },
      ] },
    { text: 'Ich finde, dass die Pause länger sein sollte, weil wir uns dann besser erholen können. Zum Beispiel könnte ich nach dem Fangenspielen noch in Ruhe frühstücken.',
      fragen: [
        { frage: 'Welche Begründung hast du gehört?', optionen: [
          { text: 'Weil wir uns dann besser erholen können.', ok: true },
          { text: 'Weil der Unterricht dann kürzer ist.', ok: false },
          { text: 'Weil der Schulhof so groß ist.', ok: false }] },
        { frage: 'Welches Beispiel hast du gehört?', optionen: [
          { text: 'Mehr Zeit zum Fußballspielen.', ok: false },
          { text: 'Nach dem Fangenspielen in Ruhe frühstücken.', ok: true },
          { text: 'Mit Freunden reden.', ok: false }] },
      ] },
  ];

  /* =========================================================
     TIEFE STOLLEN
     ========================================================= */

  /* Für den Boss: Welcher Teil des Arguments ist das? */
  ZI.TEIL_ERKENNEN = [
    { satz: '„Ich finde, dass wir einen Schwimmtag machen sollten.“', teil: 'These' },
    { satz: '„… weil man beim Schwimmen den ganzen Körper trainiert.“', teil: 'Begründung' },
    { satz: '„Zum Beispiel werden beim Kraulen Arme und Beine kräftiger.“', teil: 'Beispiel' },
    { satz: '„Ich bin der Meinung, dass Haustiere in die Schule dürfen.“', teil: 'These' },
    { satz: '„… denn Tiere können Kinder beruhigen.“', teil: 'Begründung' },
    { satz: '„Meine Nachbarin hat zum Beispiel erzählt, dass ihr Hund sie nach einem Streit tröstet.“', teil: 'Beispiel' },
  ];
  ZI.TEIL_INFO = {
    These: 'Die These ist die Meinung: „Ich finde, dass …“',
    'Begründung': 'Die Begründung sagt, warum: „… weil …“ oder „… denn …“',
    Beispiel: 'Das Beispiel macht die Begründung anschaulich: „Zum Beispiel …“',
  };

  /* Tiefer Stollen 2: Argument-Kette – welche Stützen gehören zu diesem Argument?
     Nach Kreuz (Friedrich Deutsch 5–10, Nr. 88): Reihe, Kette und Gegenargument */
  ZI.KETTEN = [
    { meinung: 'Wir möchten keine Kaninchen im Klassenzimmer,',
      haupt: '… weil Kaninchen dreimal am Tag gefüttert werden müssen.',
      stuetzen: [
        { text: 'Das Füttern braucht vor und nach der Schule viel Zeit.', ok: true },
        { text: 'Auch am Wochenende und in den Ferien muss jemand zum Füttern kommen.', ok: true },
        { text: 'Kaninchen haben lange Ohren.', ok: false, info: 'Das stimmt, stützt das Argument aber nicht.' },
        { text: 'Außerdem brauchen Kaninchen Auslauf auf der Wiese.', ok: false, info: 'Das ist ein neues Argument und keine Stütze für das Füttern.' },
      ] },
    { meinung: 'Wir sollten eine Schulübernachtung machen,',
      haupt: '… weil wir uns als neue Klasse besser kennenlernen.',
      stuetzen: [
        { text: 'Die Turnhalle ist sehr groß.', ok: false, info: 'Das hat mit dem Kennenlernen nichts zu tun.' },
        { text: 'Beim Abendessen erzählt jeder etwas von sich.', ok: true },
        { text: 'Bei Spielen am Abend arbeiten Kinder zusammen, die sonst wenig miteinander reden.', ok: true },
        { text: 'Außerdem macht so eine Nacht einfach Spaß.', ok: false, info: 'Das ist ein neues Argument und keine Stütze für das Kennenlernen.' },
      ] },
    { meinung: 'Kinder sollten jeden Tag Sport machen,',
      haupt: '… weil Bewegung gesund ist.',
      stuetzen: [
        { text: 'Das Herz wird durch Bewegung kräftiger.', ok: true },
        { text: 'Außerdem lernt man im Team, fair zu sein.', ok: false, info: 'Das ist ein neues Argument (Fairness) und keine Stütze für die Gesundheit.' },
        { text: 'Fußball ist mein Lieblingssport.', ok: false, info: 'Das ist nur deine Vorliebe und stützt das Argument nicht.' },
        { text: 'Wer sich viel bewegt, schläft nachts besser.', ok: true },
      ] },
  ];

  /* =========================================================
     BONUS: Beispiel-Regen
     ========================================================= */
  ZI.BEISPIELREGEN = [
    { meinung: 'Wir sollten einen Schulgarten anlegen, weil wir dort viel über Pflanzen lernen.',
      scharf: ['zum Beispiel, wie aus Samen Sonnenblumen wachsen', 'zum Beispiel, welche Blumen Bienen mögen',
               'zum Beispiel, wie viel Wasser Tomaten brauchen', 'zum Beispiel, wann man Möhren erntet'],
      stumpf: ['zum Beispiel ist Grün meine Lieblingsfarbe', 'zum Beispiel hat mein Opa einen Rasenmäher',
               'zum Beispiel spiele ich gern draußen', 'zum Beispiel ist die Schule alt'] },
    { meinung: 'Wir sollten weniger Plastik benutzen, weil Plastikmüll der Natur schadet.',
      scharf: ['zum Beispiel landen Plastiktüten im Meer', 'zum Beispiel verschlucken Vögel kleine Plastikteile',
               'zum Beispiel liegen Plastikflaschen im Wald herum', 'zum Beispiel verrottet eine Plastikflasche jahrhundertelang nicht'],
      stumpf: ['zum Beispiel ist meine Trinkflasche blau', 'zum Beispiel gibt es Spielzeug aus Plastik',
               'zum Beispiel mag ich Eis', 'zum Beispiel ist Plastik leicht'] },
    { meinung: 'Wir sollten in der Pause draußen sein, weil Bewegung beim Lernen hilft.',
      scharf: ['zum Beispiel kann ich nach dem Fangen besser aufpassen', 'zum Beispiel bin ich nach dem Toben wieder wach',
               'zum Beispiel ist mein Kopf nach frischer Luft klarer', 'zum Beispiel arbeitet unsere Klasse nach dem Hofspiel ruhiger'],
      stumpf: ['zum Beispiel ist der Schulhof groß', 'zum Beispiel regnet es oft im Herbst',
               'zum Beispiel habe ich neue Schuhe', 'zum Beispiel klingelt die Glocke laut'] },
  ];

  /* =========================================================
     Tipps der Meisterin für Kapitel 2
     ========================================================= */
  Object.assign(ZI.TIPPS, {
    puzzle: 'Ein Argument hat drei Teile: Die These ist die Meinung. Die Begründung sagt, warum. Das Beispiel zeigt es ganz genau.',
    motor: 'Ein Motor bringt das Gespräch weiter: begründen, nachfragen, anknüpfen, andere einbeziehen. Eine Bremse stoppt es: auslachen, dazwischenrufen, Thema wechseln.',
    hoeren: 'Hör genau hin. Achte auf die Wörter „weil“, „denn“ und „zum Beispiel“. Danach kommt das, was du suchst. Du darfst so oft anhören, wie du willst.',
    kette: 'Eine Stütze baut auf dem Hauptargument auf und erklärt es genauer. Ein Satz mit „außerdem“ ist meist ein neues Argument.',
    boss: 'Der Kobold mischt alles durcheinander. Lies jede Aufgabe genau und nimm dir Zeit.',
    meister2: 'Diesmal mit allen drei Teilen: These („Ich finde, dass …“), Begründung („weil …“) und ein Beispiel („Zum Beispiel …“).',
  });

  ZI.KAPITEL[1].fertig = true;

  /* Insel: Bauplan und Ratsfrage für Kapitel 2 */
  ZI.BAUPLAN = [ZI.BAUPLAN_K1, [
    { anteil: 0, gebaeude: 'ratsplatz' },
    { anteil: 0.3, gebaeude: 'bibliothek' },
    { anteil: 0.65, rat: ['brunnen', 'muehle'] },
    { anteil: 1.0, rat: ['brunnen', 'muehle'] },
  ]];
  ZI.RATSFRAGE = [ZI.RATSFRAGE_K1, {
    frage: 'Was bauen wir zuerst: den Brunnen oder die Mühle?',
    optionen: ['brunnen', 'muehle'],
  }];
})();
