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
      antwort: 'Merle: „Das stimmt, aber nicht alle können schon schwimmen. Manche hätten Angst.“', art: 'Ja, aber …' },
    { vorher: 'Lea: „Wir sollten einen Schwimmtag machen, weil Schwimmen gesund ist.“',
      antwort: 'Ben: „Ich habe übrigens neue Fußballschuhe.“', art: 'Themenwechsel' },
    { vorher: 'Mats: „Wir brauchen einen Klassenrat, weil wir dann Streit besser klären können.“',
      antwort: 'Selin: „Genau, und jeder kann dort auch eigene Ideen vorschlagen.“', art: 'Ja, und …' },
    { vorher: 'Mats: „Wir brauchen einen Klassenrat, weil wir dann Streit besser klären können.“',
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
    { vorher: 'Paul: „Ich finde, wir sollten in der Pause Fußball und Basketball abwechselnd spielen, damit alle mal drankommen.“',
      optionen: [
        { text: '„Du sagst, dass wir abwechseln sollten, damit alle drankommen. Das finde ich fair.“', ok: true,
          info: 'Genau! Du wiederholst Pauls Gedanken und gehst darauf ein.' },
        { text: '„Du willst also, dass nur noch Fußball gespielt wird?“', ok: false,
          info: 'Das hat Paul nicht gesagt. Seine Aussage wird verdreht.' },
        { text: '„Ich finde, wir sollten lieber Tischtennis spielen.“', ok: false,
          info: 'Diese Antwort geht gar nicht auf Paul ein.' }] },
    { vorher: 'Leonie: „Ich bin gegen Hausaufgaben am Wochenende, weil man dann Zeit für die Familie braucht.“',
      optionen: [
        { text: '„Du bist also gegen alle Hausaufgaben?“', ok: false,
          info: 'Leonie spricht nur vom Wochenende. Die Antwort übertreibt.' },
        { text: '„Du meinst, am Wochenende soll Zeit für die Familie sein. Aber manche üben am Wochenende gern.“', ok: true,
          info: 'Richtig! Erst zeigen, dass man zugehört hat, dann ein Gegenargument.' },
        { text: '„Du machst doch sowieso nie Hausaufgaben!“', ok: false,
          info: 'Das ist ein Angriff auf Leonie und kein Argument.' }] },
    { vorher: 'Karim: „Wir sollten an den Weißenhäuser Strand fahren, weil man dort viel draußen unternehmen kann.“',
      optionen: [
        { text: '„Am Strand ist es doch immer langweilig.“', ok: false,
          info: 'Die Antwort macht Karims Idee schlecht, ohne auf seinen Grund einzugehen.' },
        { text: '„Letztes Jahr war ich übrigens in Italien.“', ok: false,
          info: 'Das ist ein Themenwechsel.' },
        { text: '„Du sagst, dass man dort viel draußen machen kann. Was denn zum Beispiel?“', ok: true,
          info: 'Super! Nachfragen zeigt, dass du wirklich zuhörst.' }] },
    { vorher: 'Sara: „Wir brauchen mehr Bücher in der Klasse, weil dann jeder etwas Spannendes zu lesen findet.“',
      optionen: [
        { text: '„Du findest, dass dann jeder etwas Spannendes findet. Wir könnten Bücher von zu Hause mitbringen.“', ok: true,
          info: 'Genau! Du nimmst Saras Gedanken auf und machst einen Vorschlag dazu.' },
        { text: '„Du willst also, dass wir den ganzen Tag nur lesen?“', ok: false,
          info: 'Das hat Sara nicht gesagt. Ihre Aussage wird verdreht.' },
        { text: '„Bücher sind doch voll langweilig.“', ok: false,
          info: 'Das macht Saras Idee schlecht, ohne Begründung.' }] },
    { vorher: 'Merle: „Ich möchte keinen Schulhund, weil manche Kinder Angst vor Hunden haben.“',
      optionen: [
        { text: '„Du magst halt einfach keine Tiere.“', ok: false,
          info: 'Das unterstellt Merle etwas, das sie nicht gesagt hat.' },
        { text: '„Hunde sind die besten Haustiere der Welt.“', ok: false,
          info: 'Die Antwort geht nicht auf Merles Grund ein.' },
        { text: '„Du sagst, dass manche Kinder Angst haben. Das sollten wir ernst nehmen.“', ok: true,
          info: 'Richtig! Du nimmst Merles Grund ernst.' }] },
    { vorher: 'Finn: „In der Mensa sollte es öfter Gemüse geben, weil das gesund ist.“',
      optionen: [
        { text: '„Du meinst, Gemüse ist gesund. Stimmt, aber es muss auch schmecken, sonst isst es keiner.“', ok: true,
          info: 'Genau! Du knüpfst an und bringst ein faires Gegenargument.' },
        { text: '„Du willst also, dass es nie wieder Fleisch gibt?“', ok: false,
          info: 'Das hat Finn nicht gesagt. Seine Aussage wird übertrieben.' },
        { text: '„Ich esse sowieso lieber Pizza.“', ok: false,
          info: 'Diese Antwort geht nicht auf Finn ein.' }] },
  ];

  /* Station 3: Überzeug den Inselrat – Einwände entkräften */
  ZI.INSELRAT = [
    { meinung: 'Du möchtest: Wir bauen eine Hängebrücke hinüber zum Leuchtturm.',
      einwaende: [
        { wer: 'Grimbart', datei: 'zwerg-11-grimbart', einwand: '„Eine Hängebrücke wackelt. Da fällt doch jemand ins Wasser!“',
          optionen: [
            { text: '„Das stimmt, sie kann wackeln. Darum bekommt sie hohe Geländer, und es dürfen immer nur drei Zwerge gleichzeitig hinüber.“', ok: true,
              info: 'Stark! Du nimmst die Sorge ernst und zeigst eine Lösung.' },
            { text: '„Ach, das ist doch egal.“', ok: false, info: 'Damit wischst du den Einwand nur weg. Grimbart ist nicht überzeugt.' },
            { text: '„Du hast ja keine Ahnung!“', ok: false, info: 'Unhöflich – so überzeugst du niemanden.' }] },
        { wer: 'Amara', datei: 'zwerg-10-amara', einwand: '„Dafür brauchen wir doch viel zu viel Holz.“',
          optionen: [
            { text: '„Wir wollen aber trotzdem!“', ok: false, info: 'Das ist nur ein Wunsch, keine Antwort auf den Einwand.' },
            { text: '„Wir nehmen das Treibholz vom Strand. Davon liegt genug herum, und wir müssen keinen Baum fällen.“', ok: true,
              info: 'Genau! Du entkräftest den Einwand mit einer Tatsache.' },
            { text: '„Holz ist nicht so wichtig.“', ok: false, info: 'Eine Behauptung ohne Begründung überzeugt nicht.' }] },
        { wer: 'Grimbart', datei: 'zwerg-11-grimbart', einwand: '„Zum Leuchtturm kann man doch auch mit dem Boot fahren.“',
          optionen: [
            { text: '„Boote sind doof.“', ok: false, info: 'Das beantwortet den Einwand nicht.' },
            { text: '„Ich mag eben keine Boote.“', ok: false, info: 'Das ist nur deine Vorliebe, kein Gegenargument.' },
            { text: '„Bei Sturm kann kein Boot fahren. Über die Brücke kommt der Leuchtturmwärter aber immer hin, zum Beispiel auch nachts bei Wellen.“', ok: true,
              info: 'Super! Mit einem Beispiel ist dein Gegenargument besonders stark.' }] },
      ] },
    { meinung: 'Du möchtest: Auf der Insel soll es jedes Jahr ein Strandfest geben.',
      einwaende: [
        { wer: 'Amara', datei: 'zwerg-10-amara', einwand: '„Dann wird ja einen ganzen Tag lang nicht gearbeitet!“',
          optionen: [
            { text: '„Ein Arbeitstag fällt aus, aber beim Fest arbeiten wir auch: Wir bauen Stände, kochen und planen zusammen.“', ok: true,
              info: 'Stark! Du gibst zu, was stimmt, und zeigst, was man trotzdem schafft.' },
            { text: '„Umso besser, dann haben wir frei!“', ok: false, info: 'Damit bestätigst du Amaras Sorge.' },
            { text: '„Das ist mir egal.“', ok: false, info: 'So nimmst du den Einwand nicht ernst.' }] },
        { wer: 'Grimbart', datei: 'zwerg-11-grimbart', einwand: '„Nicht alle Zwerge können gut tanzen.“',
          optionen: [
            { text: '„Doch, alle können das!“', ok: false, info: 'Eine bloße Behauptung überzeugt nicht.' },
            { text: '„Das muss auch keiner. Es gibt Musik, Wettrennen, Sandburgen und Geschichten am Feuer. Jeder findet etwas.“', ok: true,
              info: 'Genau! Du zeigst, dass der Einwand nicht zutrifft.' },
            { text: '„Dann sollen die eben in der Mine bleiben.“', ok: false, info: 'Das schließt Zwerge aus – kein gutes Argument.' }] },
        { wer: 'Amara', datei: 'zwerg-10-amara', einwand: '„Und wer räumt danach den ganzen Strand auf?“',
          optionen: [
            { text: '„Das machen die Möwen.“', ok: false, info: 'So schiebst du die Arbeit einfach weg.' },
            { text: '„Es bleibt doch gar kein Müll liegen.“', ok: false, info: 'Das wird Amara kaum glauben.' },
            { text: '„Wir machen einen Aufräumplan: Jeder Stamm übernimmt ein Stück Strand.“', ok: true,
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
        { text: '„Aber ich finde Uniformen hässlich.“', ok: false, info: 'Das ist nur dein Geschmack – kein Gegenargument zur Begründung.' }] },
    { argument: '„Der Freitag sollte schulfrei sein, weil wir uns dann besser erholen können.“',
      optionen: [
        { text: '„Ja, und dann hätten wir ein langes Wochenende.“', ok: false, info: 'Das stützt die Meinung – es ist kein Gegenargument.' },
        { text: '„Aber dann müssten wir an den anderen Tagen viel länger in der Schule bleiben.“', ok: true, info: 'Genau! Ein Nachteil, an den man denken muss.' },
        { text: '„Aber ich gehe freitags gern zur Schule.“', ok: false, info: 'Das sagt nur, was du magst. Ein Gegenargument zeigt einen Nachteil für alle.' }] },
    { argument: '„Wir sollten in der 5. Klasse viel mit iPads arbeiten, weil man damit gut recherchieren kann.“',
      optionen: [
        { text: '„Aber ich arbeite lieber mit Papier.“', ok: false, info: 'Das ist nur deine Vorliebe – kein Nachteil, der für alle gilt.' },
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
        { text: '„Aber ich bin morgens immer schon wach.“', ok: false, info: 'Das gilt nur für dich – viele andere sind morgens müde.' },
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
    'Ich finde, wir sollten am Strand ein Laternenfest feiern, weil dann alle Stämme zusammenkommen.',
    'Ich bin dagegen, denn im Dunkeln stolpert man am Strand über die Steine.',
    'Du sagst, dass man stolpern könnte. Wir könnten aber den Weg mit Laternen beleuchten.',
    'Ich schlage vor, dass wir schon bei Sonnenuntergang anfangen.',
    'Das finde ich gut, weil es dann noch ein bisschen hell ist.',
    'Was ist mit Zwergen, die abends lieber in ihrer Hütte bleiben?',
    'Die müssen ja nicht kommen. Das Fest ist freiwillig.',
    'Ich fasse zusammen: Ein Laternenfest bei Sonnenuntergang, mit hellem Weg und freiwillig.',
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
  ZI.GEBAEUDE.push({ id: 'schiff', name: 'Schiff', kapitel: 3, x: 14, y: 82, w: 15 });
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
