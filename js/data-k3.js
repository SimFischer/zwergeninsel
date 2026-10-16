/* Zwergeninsel – Inhalte für Kapitel 3: Das Inselfest
   Schwerpunkt: zuhören, anknüpfen, Gegenargumente und Einwände */

(function () {
  const ZI = window.ZI;

  /* =========================================================
     HAUPTSTOLLEN
     ========================================================= */

  /* Station 1: Ja, und – ja, aber? Wie reagiert jemand auf einen Beitrag?
     Nach Kreuz (Friedrich Deutsch 5–10, Nr. 88): Konsens und Kontroverse */
  ZI.ARTEN = ['Ja, und …', 'Ja, aber …', 'Themenwechsel'];
  ZI.ARTEN_INFO = {
    'Ja, und …': 'Ja, und …: Jemand stimmt zu und ergänzt einen weiteren Grund.',
    'Ja, aber …': 'Ja, aber …: Jemand nimmt den Beitrag ernst und bringt ein Gegenargument.',
    Themenwechsel: 'Themenwechsel: Die Antwort hat mit dem Beitrag nichts zu tun.',
  };
  ZI.JA_UND = [
    { vorher: 'Lea: „Wir sollten einen Schwimmtag machen, weil Schwimmen gesund ist.“',
      antwort: 'Tom: „Ja, und außerdem werden wir dabei sicherer im Wasser.“', art: 'Ja, und …' },
    { vorher: 'Lea: „Wir sollten einen Schwimmtag machen, weil Schwimmen gesund ist.“',
      antwort: 'Emma: „Das stimmt, aber nicht alle können schon schwimmen. Manche hätten Angst.“', art: 'Ja, aber …' },
    { vorher: 'Lea: „Wir sollten einen Schwimmtag machen, weil Schwimmen gesund ist.“',
      antwort: 'Ben: „Ich habe übrigens neue Fußballschuhe.“', art: 'Themenwechsel' },
    { vorher: 'Jonas: „Wir brauchen einen Klassenrat, weil wir dann Streit besser klären können.“',
      antwort: 'Mia: „Genau, und jeder kann dort auch eigene Ideen vorschlagen.“', art: 'Ja, und …' },
    { vorher: 'Jonas: „Wir brauchen einen Klassenrat, weil wir dann Streit besser klären können.“',
      antwort: 'Paul: „Ich verstehe das, aber ein Klassenrat kostet jede Woche Unterrichtszeit.“', art: 'Ja, aber …' },
    { vorher: 'Sara: „Handys sollten in der Pause erlaubt sein, weil man dann die Eltern erreichen kann.“',
      antwort: 'Ali: „Das stimmt zwar, aber dann spielen viele nur noch am Handy statt zusammen.“', art: 'Ja, aber …' },
    { vorher: 'Sara: „Handys sollten in der Pause erlaubt sein, weil man dann die Eltern erreichen kann.“',
      antwort: 'Nele: „Ja, und im Notfall ist man auch schneller erreichbar.“', art: 'Ja, und …' },
    { vorher: 'Sara: „Handys sollten in der Pause erlaubt sein, weil man dann die Eltern erreichen kann.“',
      antwort: 'Finn: „Was gibt es heute eigentlich zum Mittagessen?“', art: 'Themenwechsel' },
  ];

  /* Station 2: Wer hört zu? Die Antwort finden, die wirklich anknüpft */
  ZI.ZUHOEREN = [
    { vorher: 'Ole: „Ich finde, wir sollten in der Pause Fußball und Basketball abwechselnd spielen, damit alle mal drankommen.“',
      optionen: [
        { text: '„Du sagst, dass wir abwechseln sollten, damit alle drankommen. Das finde ich fair.“', ok: true,
          info: 'Genau! Du wiederholst Oles Gedanken und gehst darauf ein.' },
        { text: '„Du willst also, dass nur noch Fußball gespielt wird?“', ok: false,
          info: 'Das hat Ole nicht gesagt. Seine Aussage wird verdreht.' },
        { text: '„Ich finde, wir sollten lieber Tischtennis spielen.“', ok: false,
          info: 'Diese Antwort geht gar nicht auf Ole ein.' }] },
    { vorher: 'Hilda: „Ich bin gegen Hausaufgaben am Wochenende, weil man dann Zeit für die Familie braucht.“',
      optionen: [
        { text: '„Du bist also gegen alle Hausaufgaben?“', ok: false,
          info: 'Hilda spricht nur vom Wochenende. Die Antwort übertreibt.' },
        { text: '„Du meinst, am Wochenende soll Zeit für die Familie sein. Aber manche üben am Wochenende gern.“', ok: true,
          info: 'Richtig! Erst zeigen, dass man zugehört hat, dann ein Gegenargument.' },
        { text: '„Du machst doch sowieso nie Hausaufgaben!“', ok: false,
          info: 'Das ist ein Angriff auf Hilda und kein Argument.' }] },
    { vorher: 'Tarek: „Wir sollten an den Weißenhäuser Strand fahren, weil man dort viel draußen unternehmen kann.“',
      optionen: [
        { text: '„Am Strand ist es doch immer langweilig.“', ok: false,
          info: 'Die Antwort macht Tareks Idee schlecht, ohne auf seinen Grund einzugehen.' },
        { text: '„Letztes Jahr war ich übrigens in Italien.“', ok: false,
          info: 'Das ist ein Themenwechsel.' },
        { text: '„Du sagst, dass man dort viel draußen machen kann. Was denn zum Beispiel?“', ok: true,
          info: 'Super! Nachfragen zeigt, dass du wirklich zuhörst.' }] },
    { vorher: 'Lina: „Wir brauchen mehr Bücher in der Klasse, weil dann jeder etwas Spannendes zu lesen findet.“',
      optionen: [
        { text: '„Du findest, dass dann jeder etwas Spannendes findet. Wir könnten Bücher von zu Hause mitbringen.“', ok: true,
          info: 'Genau! Du nimmst Linas Gedanken auf und machst einen Vorschlag dazu.' },
        { text: '„Du willst also, dass wir den ganzen Tag nur lesen?“', ok: false,
          info: 'Das hat Lina nicht gesagt. Ihre Aussage wird verdreht.' },
        { text: '„Bücher sind doch voll langweilig.“', ok: false,
          info: 'Das macht Linas Idee schlecht, ohne Begründung.' }] },
    { vorher: 'Kira: „Ich möchte keinen Schulhund, weil manche Kinder Angst vor Hunden haben.“',
      optionen: [
        { text: '„Du magst halt einfach keine Tiere.“', ok: false,
          info: 'Das unterstellt Kira etwas, das sie nicht gesagt hat.' },
        { text: '„Hunde sind die besten Haustiere der Welt.“', ok: false,
          info: 'Die Antwort geht nicht auf Kiras Grund ein.' },
        { text: '„Du sagst, dass manche Kinder Angst haben. Das sollten wir ernst nehmen.“', ok: true,
          info: 'Richtig! Du nimmst Kiras Grund ernst.' }] },
    { vorher: 'Fenno: „In der Mensa sollte es öfter Gemüse geben, weil das gesund ist.“',
      optionen: [
        { text: '„Du meinst, Gemüse ist gesund. Stimmt, aber es muss auch schmecken, sonst isst es keiner.“', ok: true,
          info: 'Genau! Du knüpfst an und bringst ein faires Gegenargument.' },
        { text: '„Du willst also, dass es nie wieder Fleisch gibt?“', ok: false,
          info: 'Das hat Fenno nicht gesagt. Seine Aussage wird übertrieben.' },
        { text: '„Ich esse sowieso lieber Pizza.“', ok: false,
          info: 'Diese Antwort geht nicht auf Fenno ein.' }] },
  ];

  /* Station 3: Überzeug den Inselrat – Einwände entkräften */
  ZI.INSELRAT = [
    { meinung: 'Du möchtest: Unsere Klasse soll einen Waldausflug machen.',
      einwaende: [
        { wer: 'Grimbart', datei: 'zwerg-11-grimbart', einwand: '„Im Wald ist es gefährlich. Man kann sich verlaufen!“',
          optionen: [
            { text: '„Das stimmt, aber wenn wir in Gruppen mit Erwachsenen gehen und einen festen Treffpunkt haben, verläuft sich niemand.“', ok: true,
              info: 'Stark! Du nimmst die Sorge ernst und zeigst eine Lösung.' },
            { text: '„Ach, das ist doch egal.“', ok: false, info: 'Damit wischst du den Einwand nur weg. Grimbart ist nicht überzeugt.' },
            { text: '„Sie haben ja keine Ahnung!“', ok: false, info: 'Unhöflich – so überzeugst du niemanden.' }] },
        { wer: 'Amara', datei: 'zwerg-10-amara', einwand: '„So ein Ausflug kostet doch viel Geld.“',
          optionen: [
            { text: '„Wir wollen aber trotzdem!“', ok: false, info: 'Das ist nur ein Wunsch, keine Antwort auf den Einwand.' },
            { text: '„In den Wald zu gehen kostet fast nichts. Wir brauchen nur unser Picknick.“', ok: true,
              info: 'Genau! Du entkräftest den Einwand mit einer Tatsache.' },
            { text: '„Geld ist nicht so wichtig.“', ok: false, info: 'Eine Behauptung ohne Begründung überzeugt nicht.' }] },
        { wer: 'Grimbart', datei: 'zwerg-11-grimbart', einwand: '„Lernen kann man doch nur im Klassenzimmer.“',
          optionen: [
            { text: '„Im Klassenzimmer ist es auch doof.“', ok: false, info: 'Das beantwortet den Einwand nicht.' },
            { text: '„Lernen ist sowieso langweilig.“', ok: false, info: 'Damit gibst du Grimbart eher recht.' },
            { text: '„Im Wald lernen wir sogar besonders viel, zum Beispiel, welche Tiere dort leben und wie Bäume wachsen.“', ok: true,
              info: 'Super! Mit einem Beispiel ist dein Gegenargument besonders stark.' }] },
      ] },
    { meinung: 'Du möchtest: An unserer Schule soll es einen Kreativtag geben.',
      einwaende: [
        { wer: 'Amara', datei: 'zwerg-10-amara', einwand: '„Dann fällt ja ein ganzer Tag Unterricht aus!“',
          optionen: [
            { text: '„Ein Tag fällt aus, aber an diesem Tag lernen wir auch: Wir planen, messen und arbeiten im Team.“', ok: true,
              info: 'Stark! Du gibst zu, was stimmt, und zeigst, was man trotzdem lernt.' },
            { text: '„Umso besser, dann haben wir frei!“', ok: false, info: 'Damit bestätigst du Amaras Sorge.' },
            { text: '„Das ist mir egal.“', ok: false, info: 'So nimmst du den Einwand nicht ernst.' }] },
        { wer: 'Grimbart', datei: 'zwerg-11-grimbart', einwand: '„Nicht alle Kinder können gut basteln.“',
          optionen: [
            { text: '„Doch, alle können das!“', ok: false, info: 'Eine bloße Behauptung überzeugt nicht.' },
            { text: '„Das muss auch keiner. Es gibt Musik, Theater, Malen oder Bauen. Jeder findet etwas.“', ok: true,
              info: 'Genau! Du zeigst, dass der Einwand nicht zutrifft.' },
            { text: '„Dann sollen die eben zu Hause bleiben.“', ok: false, info: 'Das schließt Kinder aus – kein gutes Argument.' }] },
        { wer: 'Amara', datei: 'zwerg-10-amara', einwand: '„Und wer räumt danach das ganze Chaos auf?“',
          optionen: [
            { text: '„Die Hausmeister natürlich.“', ok: false, info: 'So schiebst du die Arbeit anderen zu.' },
            { text: '„Es gibt doch gar kein Chaos.“', ok: false, info: 'Das wird Amara kaum glauben.' },
            { text: '„Wir machen einen Aufräumplan, so wie bei unseren Klassendiensten. Dann hilft jeder mit.“', ok: true,
              info: 'Super! Ein konkreter Plan überzeugt.' }] },
      ] },
  ];

  /* =========================================================
     TIEFE STOLLEN
     ========================================================= */

  /* Tiefer Stollen 1: Gegenargument-Schmiede */
  ZI.GEGENARGUMENTE = [
    { argument: '„Wir sollten Schuluniformen tragen, weil dann niemand wegen seiner Kleidung geärgert wird.“',
      optionen: [
        { text: '„Aber mit Uniformen kann niemand mehr zeigen, was ihm gefällt.“', ok: true, info: 'Ein echtes Gegenargument: Es spricht gegen die Meinung.' },
        { text: '„Und außerdem sieht das richtig schick aus.“', ok: false, info: 'Das stützt die Meinung – es ist kein Gegenargument.' },
        { text: '„Uniformen sind meistens blau.“', ok: false, info: 'Das hat mit der Frage nichts zu tun.' }] },
    { argument: '„Der Freitag sollte schulfrei sein, weil wir uns dann besser erholen können.“',
      optionen: [
        { text: '„Ja, und dann hätten wir ein langes Wochenende.“', ok: false, info: 'Das stützt die Meinung – es ist kein Gegenargument.' },
        { text: '„Aber dann müssten wir an den anderen Tagen viel länger in der Schule bleiben.“', ok: true, info: 'Genau! Ein Nachteil, an den man denken muss.' },
        { text: '„Freitag ist mein Lieblingstag.“', ok: false, info: 'Das ist nur deine Vorliebe.' }] },
    { argument: '„Wir sollten in der 5. Klasse viel mit iPads arbeiten, weil man damit gut recherchieren kann.“',
      optionen: [
        { text: '„Mein Bruder hat auch ein iPad.“', ok: false, info: 'Das spricht weder dafür noch dagegen.' },
        { text: '„Und man kann damit auch Videos schauen.“', ok: false, info: 'Das ist kein Gegenargument.' },
        { text: '„Aber wer nur auf dem Bildschirm arbeitet, übt weniger, mit der Hand zu schreiben.“', ok: true, info: 'Richtig! Ein Gegenargument mit einem wichtigen Nachteil.' }] },
    { argument: '„Haustiere sollten in der Schule erlaubt sein, weil sie die Kinder beruhigen.“',
      optionen: [
        { text: '„Aber manche Kinder sind allergisch gegen Tierhaare.“', ok: true, info: 'Genau! Ein Gegenargument, das man ernst nehmen muss.' },
        { text: '„Ja, und Tiere sind süß.“', ok: false, info: 'Das stützt die Meinung und ist nur ein Gefühl.' },
        { text: '„Du willst doch nur deine Katze mitbringen!“', ok: false, info: 'Das ist ein Angriff auf die Person, kein Argument.' }] },
    { argument: '„Die Schule sollte erst um 9:30 Uhr beginnen, weil wir dann ausgeschlafen sind.“',
      optionen: [
        { text: '„Und dann kann man in Ruhe frühstücken.“', ok: false, info: 'Das stützt die Meinung – es ist kein Gegenargument.' },
        { text: '„Ich stehe sowieso immer früh auf.“', ok: false, info: 'Das gilt nur für dich und spricht nicht gegen die Meinung.' },
        { text: '„Aber dann ist die Schule erst spät aus, und für Hobbys bleibt weniger Zeit.“', ok: true, info: 'Stark! Ein Nachteil für alle Kinder.' }] },
  ];

  /* Tiefer Stollen 2: Wer überzeugt wen? – situationsbedingt argumentieren
     Nach den Situationskarten aus dem Unterrichtsmaterial (Hund, Sommercamp, Taschengeld) */
  ZI.SITUATIONEN = [
    { situation: 'Du wünschst dir einen Hund. Dein Vater macht sich Sorgen, dass er sich am Ende allein um den Hund kümmern muss.',
      optionen: [
        { text: '„Ich gehe jeden Morgen und jeden Nachmittag mit dem Hund raus. Das schreiben wir in einen Plan.“', ok: true,
          info: 'Das überzeugt deinen Vater, weil es genau auf seine Sorge eingeht.' },
        { text: '„Hunde sind so süß!“', ok: false, info: 'Das beantwortet die Sorge deines Vaters nicht.' },
        { text: '„Alle in meiner Klasse haben einen Hund.“', ok: false, info: 'Was andere haben, ist kein Grund für deinen Vater.' }] },
    { situation: 'Du möchtest ins Sommercamp statt in den Familienurlaub. Deine Mutter freut sich sehr auf die gemeinsame Zeit.',
      optionen: [
        { text: '„Urlaub mit euch ist sowieso langweilig.“', ok: false, info: 'Das verletzt deine Mutter – so überzeugst du sie nicht.' },
        { text: '„Ich verstehe, dass du dich freust. Wir könnten dafür im Herbst einen Ausflug machen, nur wir beide.“', ok: true,
          info: 'Genau! Du nimmst ihre Gefühle ernst und machst einen Vorschlag.' },
        { text: '„Im Camp gibt es keine Eltern, das ist super.“', ok: false, info: 'Das wird deine Mutter eher traurig machen.' }] },
    { situation: 'Du möchtest mehr Taschengeld. Deine Oma findet, man muss lernen, mit Geld umzugehen.',
      optionen: [
        { text: '„Andere bekommen viel mehr.“', ok: false, info: 'Das geht nicht auf Omas Gedanken ein.' },
        { text: '„Ich will mir einfach mehr kaufen.“', ok: false, info: 'Damit zeigst du gerade nicht, dass du mit Geld umgehen kannst.' },
        { text: '„Ich schreibe auf, wofür ich mein Geld ausgebe, und spare jeden Monat einen Teil.“', ok: true,
          info: 'Das überzeugt Oma, weil du zeigst, dass du gut mit Geld umgehst.' }] },
    { situation: 'Ihr möchtet euren Klassenraum neu gestalten. Die Schulleiterin achtet besonders darauf, dass nichts kaputtgeht.',
      optionen: [
        { text: '„Wir benutzen nur Klebestreifen ohne Spuren und räumen alles ordentlich auf.“', ok: true,
          info: 'Genau! Du gehst auf das ein, was der Schulleiterin wichtig ist.' },
        { text: '„Unser Raum ist total hässlich.“', ok: false, info: 'Das erklärt nicht, warum nichts kaputtgeht.' },
        { text: '„Andere Klassen dürfen das auch.“', ok: false, info: 'Das geht nicht auf ihre Sorge ein.' }] },
  ];

  /* =========================================================
     BONUS: Sprecherwechsel
     Nach Brüning (Friedrich Deutsch 5–10, Nr. 88): glatter Wechsel statt Unterbrechung
     ========================================================= */
  ZI.SPRECHERWECHSEL = [
    'Ich finde, wir sollten einen Kuscheltiertag machen, weil sich dann alle wohlfühlen.',
    'Ich bin dagegen, denn dann spielen alle nur mit ihren Kuscheltieren.',
    'Du sagst, dass alle nur spielen würden. Wir könnten aber Regeln aufstellen.',
    'Ich schlage vor, dass wir die Kuscheltiere nur in der Lesezeit benutzen.',
    'Das finde ich gut, weil man beim Lesen gern etwas im Arm hat.',
    'Was ist mit Kindern, die kein Kuscheltier mitbringen möchten?',
    'Die müssen ja auch keins mitbringen. Es ist freiwillig.',
    'Ich fasse zusammen: Ein Kuscheltiertag mit Regeln und freiwillig.',
    'Dann stimmen wir doch einfach ab, oder?',
    'Wer ist dafür? Bitte meldet euch.',
  ];

  /* Tipps der Meisterin */
  Object.assign(ZI.TIPPS, {
    jaund: '„Ja, und …“ heißt: zustimmen und ergänzen. „Ja, aber …“ heißt: ernst nehmen und widersprechen. Passt die Antwort gar nicht, ist es ein Themenwechsel.',
    zuhoeren: 'Wer zuhört, wiederholt richtig, was der andere gesagt hat: „Du sagst, dass …“. Achtung bei Antworten, die etwas verdrehen oder übertreiben!',
    inselrat: 'Nimm den Einwand ernst: „Das stimmt, aber …“. Dann zeig eine Lösung oder ein Beispiel.',
    gegen: 'Ein Gegenargument spricht GEGEN die Meinung. Sätze mit „und außerdem“ stützen die Meinung eher.',
    situation: 'Überleg: Was ist der Person wichtig? Was macht ihr Sorgen? Das beste Argument geht genau darauf ein.',
    meister3: 'Partner A sagt die Meinung mit Begründung. Partner B wiederholt sie („Du sagst, dass …“) und bringt ein Gegenargument („Aber …“).',
  });

  ZI.KAPITEL[2].fertig = true;

  /* Insel: das Schiff kommt dazu, Bauplan und Ratsfrage für Kapitel 3 */
  ZI.GEBAEUDE.push({ id: 'schiff', name: 'Schiff', kapitel: 3, x: 90, y: 95, w: 13 });
  ZI.BAUPLAN.push([
    { anteil: 0, gebaeude: 'leuchtturm' },
    { anteil: 0.5, rat: ['festhalle', 'schiff'] },
    { anteil: 1.0, rat: ['festhalle', 'schiff'] },
  ]);
  ZI.RATSFRAGE.push({
    frage: 'Was bauen wir zuerst: die Festhalle oder das Schiff?',
    optionen: ['festhalle', 'schiff'],
  });
})();
