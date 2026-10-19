/* =========================================================
   MEHR ABWECHSLUNG
   Zusätzliche Aufgaben für alle Stationen, damit Kinder beim
   zweiten und dritten Durchgang Neues sehen.
   Schulfragen mit Kindernamen, Inselfragen mit Zwergen.
   ========================================================= */
(function () {
  const ZI = window.ZI;
  const G = { wer: 'Grimbart', datei: 'zwerg-11-grimbart' };
  const A = { wer: 'Amara', datei: 'zwerg-10-amara' };
  const einwand = (w, text, optionen) => Object.assign({ einwand: text, optionen }, w);

  /* ---------- KAPITEL 1 ---------- */

  ZI.STUMPF_SCHARF.push(
    { meinung: 'Ich finde, dass man genug schlafen sollte, …',
      optionen: [
        { text: '… weil man ausgeschlafen besser lernen kann.', scharf: true, info: 'Stark! Du sagst, WARUM Schlaf hilft.' },
        { text: '… weil Schlafen eben wichtig ist.', scharf: false, info: 'Warum ist es wichtig? Das fehlt noch.' },
        { text: '… weil Kinder abends oft müde sind.', scharf: false, info: 'Das sagt nur, dass man müde ist – nicht, wofür Schlaf gut ist.' }] },
    { meinung: 'Ich finde, dass man mit dem Fahrrad zur Schule fahren sollte, …',
      optionen: [
        { text: '… weil Fahrradfahren gut ist.', scharf: false, info: 'Was genau ist daran gut? Das fehlt noch.' },
        { text: '… weil man sich dabei bewegt und fit bleibt.', scharf: true, info: 'Stark! Ein echter Grund.' },
        { text: '… weil die meisten Kinder ein Fahrrad haben.', scharf: false, info: 'Dass viele eins haben, ist noch kein Grund, damit zur Schule zu fahren.' }] },
    { meinung: 'Ich finde, dass wir eine Leseecke einrichten sollten, …',
      optionen: [
        { text: '… weil eine Leseecke toll wäre.', scharf: false, info: 'Das sagt nur noch einmal die Meinung.' },
        { text: '… weil wir viele Bücher im Regal haben.', scharf: false, info: 'Bücher gibt es schon – das erklärt nicht, wozu eine Leseecke gut ist.' },
        { text: '… weil man dort ungestört lesen kann.', scharf: true, info: 'Stark! Jetzt weiß man, wofür die Ecke gut ist.' }] },
  );

  ZI.ERZ_SCHLACKE.push(
    { meinung: 'Wir sollten eine Leseecke einrichten, …',
      gruende: [
        { text: '… weil man sich dort in Ruhe auf ein Buch konzentrieren kann.', erz: true, info: 'Erz! Ein klarer Grund für die Leseecke.' },
        { text: '… weil man dort heimlich quatschen kann.', erz: false, info: 'Schlacke. Das passt nicht zum Ziel einer Leseecke.' },
        { text: '… weil wir dann mehr Lust aufs Lesen bekommen.', erz: true, info: 'Erz! Ein guter Grund.' },
        { text: '… weil die Nachbarklasse grüne Vorhänge hat.', erz: false, info: 'Schlacke. Das hat mit unserer Leseecke nichts zu tun.' },
        { text: '… weil man dort nach einer anstrengenden Stunde zur Ruhe kommt.', erz: true, info: 'Erz! Auch das ist ein echter Grund.' }] },
    { meinung: 'Es sollte Wasserspender in der Schule geben, …',
      gruende: [
        { text: '… weil viele Kinder sonst zu wenig trinken.', erz: true, info: 'Erz! Ein klarer Grund.' },
        { text: '… weil Wasser billiger ist als Saft.', erz: false, info: 'Schlacke. Das stimmt, erklärt aber nicht, warum die Schule Spender braucht.' },
        { text: '… weil wir dann weniger Plastikflaschen brauchen.', erz: true, info: 'Erz! Gut für die Umwelt.' },
        { text: '… weil man mit genug Wasser besser denken kann.', erz: true, info: 'Erz! Trinken hilft beim Lernen.' },
        { text: '… weil es zu Hause auch einen Wasserhahn gibt.', erz: false, info: 'Schlacke. Das ist kein Grund für Wasserspender in der Schule.' }] },
    { meinung: 'Wir sollten einmal im Monat draußen Unterricht machen, …',
      gruende: [
        { text: '… weil wir draußen nicht still sitzen müssen.', erz: false, info: 'Schlacke. Das klingt nach Pause, nicht nach Lernen.' },
        { text: '… weil frische Luft uns wach macht.', erz: true, info: 'Erz! Ein guter Grund.' },
        { text: '… weil wir draußen Dinge direkt beobachten können.', erz: true, info: 'Erz! Draußen sieht man Pflanzen und Tiere echt.' },
        { text: '… weil die Lehrkraft draußen nicht alles sieht.', erz: false, info: 'Schlacke. Das ist kein guter Grund für Unterricht draußen.' },
        { text: '… weil Abwechslung Spaß beim Lernen macht.', erz: true, info: 'Erz! Auch das überzeugt.' }] },
  );

  ZI.WEIL_DENN.push(
    { haupt: 'Ich trinke ein Glas Wasser,', bindewort: 'weil', kacheln: ['ich', 'großen Durst', 'habe.'], verb: 'habe.', loesungen: [['ich', 'großen Durst', 'habe.']] },
    { haupt: 'Wir machen das Fenster auf,', bindewort: 'denn', kacheln: ['die Luft', 'ist', 'stickig.'], verb: 'ist', loesungen: [['die Luft', 'ist', 'stickig.']] },
    { haupt: 'Ich übe die Wörter noch einmal,', bindewort: 'da', kacheln: ['wir', 'morgen', 'ein Diktat', 'schreiben.'], verb: 'schreiben.', loesungen: [['wir', 'morgen', 'ein Diktat', 'schreiben.']] },
    { haupt: 'Paul lacht laut,', bindewort: 'denn', kacheln: ['der Film', 'ist', 'sehr lustig.'], verb: 'ist', loesungen: [['der Film', 'ist', 'sehr lustig.']] },
  );

  ZI.FUNKENREGEN.push(
    { meinung: 'Wir sollten eine Leseecke einrichten, …',
      scharf: ['weil man dort in Ruhe lesen kann', 'weil wir dann mehr Bücher entdecken', 'weil man sich dort ausruhen kann', 'weil Lesen die Fantasie anregt'],
      stumpf: ['weil eine Leseecke gut ist', 'weil dann weniger Hausaufgaben kommen', 'weil ich das will', 'weil die Nachbarklasse auch eine hat'] },
    { meinung: 'Wir sollten mit dem Fahrrad zur Schule fahren, …',
      scharf: ['weil Radfahren fit hält', 'weil man dabei frische Luft bekommt', 'weil man nicht auf den Bus warten muss', 'weil ein Fahrrad keine Abgase macht'],
      stumpf: ['weil mein Rad neu ist', 'weil Radfahren eben gut ist', 'weil Fahrräder günstig sind', 'weil man das so macht'] },
    { meinung: 'Wir sollten einen Klassenrat haben, …',
      scharf: ['weil wir Streit fair klären können', 'weil jeder mitbestimmen darf', 'weil wir lernen, einander zuzuhören', 'weil dort gute Ideen gesammelt werden'],
      stumpf: ['weil die Nachbarklasse auch einen hat', 'weil das wichtig ist', 'weil wir dann eine Stunde weniger Mathe haben', 'weil man im Kreis sitzen darf'] },
  );

  /* ---------- KAPITEL 2 ---------- */

  ZI.FEHLERJAGD.push(
    { saetze: [
      { text: 'Ich trage einen Helm, weil er meinen Kopf schützt.', ok: true },
      { text: 'Ich trage einen Helm, weil er schützt meinen Kopf.', ok: false, info: 'Nach „weil“ steht das Verb am Ende: weil er meinen Kopf schützt.' },
      { text: 'Ich trage einen Helm weil er meinen Kopf schützt.', ok: false, info: 'Vor „weil“ fehlt das Komma.' }] },
    { saetze: [
      { text: 'Wir lüften den Raum, denn die Luft stickig ist.', ok: false, info: 'Nach „denn“ steht das Verb an zweiter Stelle: denn die Luft ist stickig.' },
      { text: 'Wir lüften den Raum, denn die Luft ist stickig.', ok: true },
      { text: 'Wir lüften den Raum denn die Luft ist stickig.', ok: false, info: 'Vor „denn“ fehlt das Komma.' }] },
    { saetze: [
      { text: 'Merle übt jeden Tag da sie bald einen Auftritt hat.', ok: false, info: 'Vor „da“ fehlt das Komma.' },
      { text: 'Merle übt jeden Tag, da sie hat bald einen Auftritt.', ok: false, info: 'Nach „da“ steht das Verb am Ende: da sie bald einen Auftritt hat.' },
      { text: 'Merle übt jeden Tag, da sie bald einen Auftritt hat.', ok: true }] },
  );

  ZI.BEISPIELE.push(
    { argument: 'Ich finde, dass wir Wasserspender in der Schule brauchen, weil man beim Lernen genug trinken muss.',
      optionen: [
        { text: 'Zum Beispiel kann ich mich nach einem Glas Wasser wieder besser konzentrieren.', ok: true, info: 'Richtig! Das Beispiel zeigt, wie Trinken beim Lernen hilft.' },
        { text: 'Zum Beispiel ist Leitungswasser in Deutschland sauber.', ok: false, info: 'Das stimmt, zeigt aber nicht, wie Trinken beim Lernen hilft.' },
        { text: 'Zum Beispiel haben viele Kinder eine Trinkflasche dabei.', ok: false, info: 'Das zeigt nicht, dass Trinken beim Lernen wichtig ist.' }] },
    { argument: 'Ich finde, dass wir einen Klassenrat brauchen, weil wir dort Streit fair klären können.',
      optionen: [
        { text: 'Zum Beispiel sitzen wir im Klassenrat im Kreis.', ok: false, info: 'Der Sitzkreis zeigt nicht, dass Streit fair geklärt wird.' },
        { text: 'Zum Beispiel konnten im Klassenrat beide Seiten in Ruhe erzählen, wie der Streit um den Ball war.', ok: true, info: 'Richtig! So sieht faires Klären aus.' },
        { text: 'Zum Beispiel gab es letzte Woche Streit um den Fußball.', ok: false, info: 'Das zeigt nur den Streit – nicht, wie der Klassenrat ihn fair klärt.' }] },
    { argument: 'Ich finde, dass man einen Fahrradhelm tragen sollte, weil er den Kopf schützt.',
      optionen: [
        { text: 'Zum Beispiel tragen viele Profi-Radfahrer einen Helm.', ok: false, info: 'Dass viele ihn tragen, zeigt noch nicht, dass er den Kopf schützt.' },
        { text: 'Zum Beispiel muss ein Helm gut passen.', ok: false, info: 'Ein Tipp zum Helm – aber kein Beispiel dafür, dass er schützt.' },
        { text: 'Zum Beispiel ist meine Cousine gestürzt, und der Helm hat ihren Kopf geschützt.', ok: true, info: 'Richtig! Ein Erlebnis, das die Begründung zeigt.' }] },
    { argument: 'Ich finde, dass wir eine Leseecke einrichten sollten, weil man dort in Ruhe lesen kann.',
      optionen: [
        { text: 'Zum Beispiel kann man sich dort mit einem Buch zurückziehen, wenn am Gruppentisch diskutiert wird.', ok: true, info: 'Richtig! Man kann es sich genau vorstellen.' },
        { text: 'Zum Beispiel gibt es in der Bücherei viele spannende Bücher.', ok: false, info: 'Das zeigt nicht, dass man in der Leseecke RUHE hat.' },
        { text: 'Zum Beispiel könnte die Leseecke bunte Kissen haben.', ok: false, info: 'Das beschreibt die Ecke – nicht, dass man dort in Ruhe lesen kann.' }] },
  );

  ZI.PUZZLE.push(
    [
      { these: 'Wir sollten eine Leseecke einrichten,', begruendung: '… weil man sich dort in Ruhe zurückziehen kann.', beispiel: 'Zum Beispiel kann man dort lesen, wenn es in der Klasse laut ist.' },
      { these: 'Kinder sollten mit dem Fahrrad zur Schule fahren,', begruendung: '… denn Radfahren hält fit.', beispiel: 'Wer jeden Tag fährt, kommt zum Beispiel beim Sportfest weniger aus der Puste.' },
      { these: 'Wir brauchen einen Klassenrat,', begruendung: '… weil dort jeder seine Meinung sagen darf.', beispiel: 'Letzte Woche durfte zum Beispiel jede Gruppe ihre Idee für den Ausflug vorstellen.' },
    ],
    [
      { these: 'Es sollte Wasserspender in der Schule geben,', begruendung: '… weil man beim Lernen genug trinken muss.', beispiel: 'Wer zu wenig trinkt, bekommt zum Beispiel leichter Kopfschmerzen.' },
      { these: 'Unsere Klasse sollte Pflanzen bekommen,', begruendung: '… da Pflanzen den Raum freundlicher machen.', beispiel: 'Eine Grünlilie auf der Fensterbank macht den Raum zum Beispiel gleich viel bunter.' },
      { these: 'Wir sollten öfter draußen Unterricht machen,', begruendung: '… weil frische Luft wach macht.', beispiel: 'Nach der Stunde im Schulgarten waren zum Beispiel alle viel munterer.' },
    ],
    [
      { these: 'Wir sollten Klassendienste haben,', begruendung: '… weil dann alle Verantwortung übernehmen.', beispiel: 'Der Tafeldienst sorgt zum Beispiel dafür, dass die Tafel morgens sauber ist.' },
      { these: 'Es sollte einen Vorlesetag geben,', begruendung: '… denn beim Zuhören lernen wir neue Wörter.', beispiel: 'In Abenteuergeschichten hören wir zum Beispiel Wörter wie „Kompass“ oder „Proviant“.' },
      { these: 'Wir sollten Müll trennen,', begruendung: '… weil man aus altem Material Neues herstellen kann.', beispiel: 'Aus alten Flaschen wird zum Beispiel neues Glas gemacht.' },
    ],
  );

  ZI.MOTOR_BREMSE.push(
    { thema: 'Gespräch: Sollen wir in der Klasse eine Leseecke einrichten?',
      beitraege: [
        { text: 'Selin: „Ich bin für eine Leseecke, weil man dort in Ruhe lesen kann.“', motor: true, info: 'Motor! Eine Meinung mit Begründung.' },
        { text: 'Finn ruft dazwischen: „Lesen ist langweilig!“', motor: false, info: 'Bremse! Dazwischenrufen ohne Grund.' },
        { text: 'Sara: „Du sagst, dass man dort in Ruhe lesen kann. Wir könnten auch Kissen hineinlegen.“', motor: true, info: 'Motor! Sara wiederholt und ergänzt.' },
        { text: 'Tom dreht sich weg und malt in sein Heft.', motor: false, info: 'Bremse! Wer nicht mitmacht, hilft dem Gespräch nicht.' },
        { text: 'Leonie: „Die Ecke könnte neben das Fenster, da ist es hell.“', motor: true, info: 'Motor! Ein konkreter Vorschlag mit Grund.' },
        { text: 'Noah: „Das bringt doch eh nichts.“', motor: false, info: 'Bremse! Abwerten ohne Begründung.' }] },
    { thema: 'Gespräch: Was macht unsere Klasse beim Schulfest?',
      beitraege: [
        { text: 'Karim: „Ich schlage einen Waffelstand vor, denn Waffeln mögen fast alle.“', motor: true, info: 'Motor! Ein Vorschlag mit Begründung.' },
        { text: 'Lea: „Immer will Karim bestimmen.“', motor: false, info: 'Bremse! Lea greift Karim an statt seinen Vorschlag.' },
        { text: 'Merle: „Ich habe eine Frage: Wer würde den Teig mitbringen?“', motor: true, info: 'Motor! Nachfragen bringt das Gespräch weiter.' },
        { text: 'Ali tippt die ganze Zeit mit dem Stift auf den Tisch.', motor: false, info: 'Bremse! Das stört alle beim Zuhören.' },
        { text: 'Clara: „Ich habe noch eine Idee: Dosenwerfen. Das kostet fast nichts.“', motor: true, info: 'Motor! Eine neue Idee mit Grund.' },
        { text: 'Paul: „Ist mir egal, macht doch, was ihr wollt.“', motor: false, info: 'Bremse! So hilft Paul nicht bei der Entscheidung.' }] },
    { thema: 'Gespräch: Wie schmücken wir unseren Klassenraum?',
      beitraege: [
        { text: 'Lotta: „Ich finde, wir sollten unsere eigenen Bilder aufhängen, weil der Raum dann zu uns passt.“', motor: true, info: 'Motor! Eine Meinung mit Begründung.' },
        { text: 'Milan lacht: „Deine Bilder will doch keiner sehen.“', motor: false, info: 'Bremse! Auslachen verletzt und bringt nichts.' },
        { text: 'Mats: „Ich stimme Lotta zu. Wir könnten jeden Monat neue Bilder aufhängen.“', motor: true, info: 'Motor! Mats stimmt zu und ergänzt.' },
        { text: 'Selin erzählt ihrer Nachbarin laut vom Wochenende.', motor: false, info: 'Bremse! Nebengespräche lenken alle ab.' },
        { text: 'Anton: „Lasst uns abstimmen, damit alle mitentscheiden.“', motor: true, info: 'Motor! Anton hilft, zu einer Lösung zu kommen.' },
        { text: 'Finn: „Nein! Nein! Nein!“', motor: false, info: 'Bremse! Nur „Nein“ sagen ist kein Argument.' }] },
    { thema: 'Gespräch: Brauchen wir eine Regel fürs Ausleihen von Stiften?',
      beitraege: [
        { text: 'Merle: „Ja, denn oft bekommt man ausgeliehene Stifte nicht zurück.“', motor: true, info: 'Motor! Eine Meinung mit Begründung.' },
        { text: 'Noah: „Ich verleihe meine Stifte nie, fertig.“', motor: false, info: 'Bremse! „Fertig“ beendet das Gespräch, statt etwas zu erklären.' },
        { text: 'Leonie: „Du meinst also, dass Stifte verloren gehen. Wir könnten eine Ausleihliste machen.“', motor: true, info: 'Motor! Leonie wiederholt und macht einen Vorschlag.' },
        { text: 'Karim unterbricht Leonie mitten im Satz.', motor: false, info: 'Bremse! Unterbrechen stört das Gespräch.' },
        { text: 'Sara: „Wer hat noch eine Idee? Paul, du hast noch nichts gesagt.“', motor: true, info: 'Motor! Sara achtet darauf, dass alle zu Wort kommen.' },
        { text: 'Tom: „Das ist voll die dumme Frage.“', motor: false, info: 'Bremse! Abwerten ohne Grund.' }] },
  );

  ZI.HOEREN.push(
    { text: 'Ich finde, dass es in jeder Klasse Pflanzen geben sollte, weil sie den Raum gemütlich machen. Zum Beispiel hat unsere Nachbarklasse eine große Palme, und alle sitzen gern daneben.',
      fragen: [
        { frage: 'Welche Begründung hast du gehört?', optionen: [
          { text: 'Weil Pflanzen billig sind.', ok: false },
          { text: 'Weil sie den Raum gemütlich machen.', ok: true },
          { text: 'Weil man sie gießen muss.', ok: false }] },
        { frage: 'Was hat die Nachbarklasse?', optionen: [
          { text: 'Einen Kaktus.', ok: false },
          { text: 'Ein Aquarium.', ok: false },
          { text: 'Eine große Palme.', ok: true }] }] },
    { text: 'Ich bin der Meinung, dass wir einen Spieleschrank für Regenpausen brauchen, denn bei Regen wissen viele nicht, was sie machen sollen. Zum Beispiel könnten wir dann Uno oder Mikado spielen.',
      fragen: [
        { frage: 'Welche Begründung hast du gehört?', optionen: [
          { text: 'Denn bei Regen wissen viele nicht, was sie machen sollen.', ok: true },
          { text: 'Denn Spiele sind teuer.', ok: false },
          { text: 'Denn der Schrank ist schön.', ok: false }] },
        { frage: 'Welche Spiele wurden genannt?', optionen: [
          { text: 'Schach und Memory.', ok: false },
          { text: 'Uno und Mikado.', ok: true },
          { text: 'Fußball und Fangen.', ok: false }] }] },
    { text: 'Ich finde, dass wir jeden Morgen fünf Minuten Bewegungspause machen sollten, weil wir danach besser aufpassen. Zum Beispiel könnten wir zur Musik hüpfen oder uns strecken.',
      fragen: [
        { frage: 'Welche Begründung hast du gehört?', optionen: [
          { text: 'Weil Musik laut ist.', ok: false },
          { text: 'Weil morgens Sport ist.', ok: false },
          { text: 'Weil wir danach besser aufpassen.', ok: true }] },
        { frage: 'Wie lange soll die Bewegungspause dauern?', optionen: [
          { text: 'Fünf Minuten.', ok: true },
          { text: 'Eine ganze Stunde.', ok: false },
          { text: 'Zwei Minuten.', ok: false }] }] },
  );

  ZI.KETTEN.push(
    { meinung: 'Wir sollten eine Leseecke einrichten,', haupt: '… weil man dort in Ruhe lesen kann.',
      stuetzen: [
        { text: 'Am Gruppentisch ist es oft zu laut zum Lesen.', ok: true },
        { text: 'In unserem Regal stehen viele Bücher.', ok: false, info: 'Bücher gibt es schon – das zeigt nicht, dass man in der Ecke RUHE hat.' },
        { text: 'In einer gemütlichen Ecke kann man sich besser auf die Geschichte konzentrieren.', ok: true },
        { text: 'Außerdem könnten wir dort auch spielen.', ok: false, info: 'Das ist ein neues Argument (Spielen) und keine Stütze.' }] },
    { meinung: 'Wir sollten mit dem Fahrrad zur Schule fahren,', haupt: '… weil Radfahren gesund ist.',
      stuetzen: [
        { text: 'Viele Kinder haben ein Fahrrad.', ok: false, info: 'Das zeigt nicht, dass Radfahren gesund ist.' },
        { text: 'Beim Radfahren werden die Beinmuskeln kräftiger.', ok: true },
        { text: 'Außerdem spart man Geld für den Bus.', ok: false, info: 'Das ist ein neues Argument (Geld) und keine Stütze.' },
        { text: 'Wer sich viel bewegt, ist seltener krank.', ok: true }] },
    { meinung: 'Wir brauchen Wasserspender in der Schule,', haupt: '… weil wir dann genug trinken.',
      stuetzen: [
        { text: 'Viele Kinder vergessen ihre Trinkflasche zu Hause.', ok: true },
        { text: 'Leitungswasser ist in Deutschland sauber.', ok: false, info: 'Das stimmt, zeigt aber nicht, dass wir dann mehr trinken.' },
        { text: 'Außerdem gibt es dann weniger Plastikflaschen.', ok: false, info: 'Das ist ein neues Argument (Umwelt) und keine Stütze.' },
        { text: 'Am Wasserspender kann man die Flasche jederzeit auffüllen.', ok: true }] },
  );

  ZI.BEISPIELREGEN.push(
    { meinung: 'Wir sollten eine Leseecke einrichten, weil man dort zur Ruhe kommt.',
      scharf: ['zum Beispiel kann ich mich dort nach dem Sport ausruhen', 'zum Beispiel kann man dort leise ein Comic lesen', 'zum Beispiel ist es dort ruhiger als am Gruppentisch', 'zum Beispiel kann ich dort nach einem Streit durchatmen'],
      stumpf: ['zum Beispiel gibt es in der Bücherei viele Bücher', 'zum Beispiel könnten wir bunte Kissen hinlegen', 'zum Beispiel lese ich gern Abenteuerbücher', 'zum Beispiel hat die Nachbarklasse auch eine'] },
    { meinung: 'Wir sollten mit dem Fahrrad zur Schule fahren, weil das gut für die Umwelt ist.',
      scharf: ['zum Beispiel macht ein Fahrrad keine Abgase', 'zum Beispiel braucht ein Rad kein Benzin', 'zum Beispiel stehen dann weniger Autos vor der Schule', 'zum Beispiel bleibt die Luft auf dem Schulweg sauberer'],
      stumpf: ['zum Beispiel hält Radfahren fit', 'zum Beispiel macht Radfahren Spaß', 'zum Beispiel ist man mit dem Rad oft schneller', 'zum Beispiel ist man mit dem Rad an der frischen Luft'] },
    { meinung: 'Wir brauchen einen Klassenrat, weil wir dort Streit fair klären können.',
      scharf: ['zum Beispiel darf dort jede Seite erzählen, was passiert ist', 'zum Beispiel finden wir dort zusammen eine Lösung', 'zum Beispiel hört man sich dort gegenseitig zu', 'zum Beispiel einigen wir uns dort auf neue Pausenregeln'],
      stumpf: ['zum Beispiel sitzen wir dabei im Kreis', 'zum Beispiel findet er jeden Freitag statt', 'zum Beispiel gibt es viel Streit um den Ball', 'zum Beispiel leitet die Lehrerin den Rat'] },
  );

  /* ---------- KAPITEL 3 ---------- */

  ZI.JA_UND.push(
    { vorher: 'Merle: „Wir sollten eine Leseecke einrichten, weil man dort in Ruhe lesen kann.“',
      antwort: 'Finn: „Ja, und wir könnten dort jede Woche ein Buch der Woche vorstellen.“', art: 'Ja, und …' },
    { vorher: 'Merle: „Wir sollten eine Leseecke einrichten, weil man dort in Ruhe lesen kann.“',
      antwort: 'Lotta: „Das stimmt, aber dann haben wir weniger Platz für die Gruppentische.“', art: 'Ja, aber …' },
    { vorher: 'Merle: „Wir sollten eine Leseecke einrichten, weil man dort in Ruhe lesen kann.“',
      antwort: 'Noah: „Habt ihr gestern das Fußballspiel gesehen?“', art: 'Themenwechsel' },
  );

  ZI.ZUHOEREN.push(
    { vorher: 'Leonie: „Ich finde, wir sollten öfter draußen Unterricht machen, weil frische Luft wach macht.“',
      optionen: [
        { text: '„Du willst also nie mehr im Klassenraum sitzen?“', ok: false, info: 'Das hat Leonie nicht gesagt. Sie hat „öfter“ gesagt, nicht „immer“.' },
        { text: '„Du sagst, dass frische Luft wach macht. Das stimmt, aber bei Regen geht das nicht.“', ok: true, info: 'Richtig! Du wiederholst Leonies Grund und antwortest darauf.' },
        { text: '„Ich war am Wochenende im Wald.“', ok: false, info: 'Diese Antwort geht nicht auf Leonie ein.' }] },
    { vorher: 'Karim: „Ich möchte, dass wir in Kunst auch mal mit Ton arbeiten, weil man dann etwas zum Anfassen herstellt.“',
      optionen: [
        { text: '„Malen findest du also doof?“', ok: false, info: 'Das unterstellt Karim etwas, das er nicht gesagt hat.' },
        { text: '„Ton macht doch nur Dreck.“', ok: false, info: 'Die Antwort geht nicht auf Karims Grund ein.' },
        { text: '„Du sagst, dass man mit Ton etwas zum Anfassen herstellt. Dazu denke ich, dass …“', ok: true, info: 'Richtig! Erst wiederholen, dann die eigene Meinung.' }] },
    { vorher: 'Selin: „Wir sollten die Klassendienste jede Woche wechseln, weil sonst immer dieselben den unbeliebten Dienst haben.“',
      optionen: [
        { text: '„Du sagst, dass sonst immer dieselben den unbeliebten Dienst haben. Ich finde, alle zwei Wochen reicht auch.“', ok: true, info: 'Richtig! Du zeigst, dass du Selin verstanden hast.' },
        { text: '„Du willst also gar keine Dienste mehr machen?“', ok: false, info: 'Das hat Selin nicht gesagt. Ihre Aussage wird verdreht.' },
        { text: '„Selin, du machst deinen Dienst doch eh nie richtig.“', ok: false, info: 'Das ist ein Angriff auf Selin und kein Argument.' }] },
  );

  ZI.INSELRAT.push(
    { meinung: 'Du möchtest: Wir bauen einen Spielplatz für die Zwergenkinder neben der Festhalle.',
      einwaende: [
        einwand(G, '„Ein Spielplatz ist viel zu laut. Dann kann in der Festhalle keiner mehr in Ruhe essen.“', [
          { text: '„Das stimmt, Kinder sind laut. Darum bauen wir ihn hinter die Hecke, und während der Feste ist Spielpause.“', ok: true, info: 'Stark! Du nimmst die Sorge ernst und zeigst eine Lösung.' },
          { text: '„Laut ist doch lustig!“', ok: false, info: 'So nimmst du Grimbarts Sorge nicht ernst.' },
          { text: '„Dann esst ihr eben woanders.“', ok: false, info: 'Unfreundlich – so überzeugst du niemanden.' }]),
        einwand(A, '„Wer soll den Spielplatz denn bauen? Alle haben schon genug zu tun.“', [
          { text: '„Irgendwer wird das schon machen.“', ok: false, info: 'Das beantwortet die Frage nicht.' },
          { text: '„Bauen macht doch Spaß.“', ok: false, info: 'Das sagt nicht, wer die Zeit dafür hat.' },
          { text: '„Wir bauen ihn an zwei Nachmittagen zusammen. Die Kinder helfen mit und tragen kleine Bretter.“', ok: true, info: 'Genau! Ein klarer Plan entkräftet den Einwand.' }]),
        einwand(G, '„Auf einer Schaukel kann man sich doch wehtun.“', [
          { text: '„Wer hinfällt, ist selbst schuld.“', ok: false, info: 'Das ist unfreundlich und keine Lösung.' },
          { text: '„Wir legen Sand unter die Schaukel. Dann ist es weich, wenn jemand herunterfällt, so wie auf vielen Spielplätzen.“', ok: true, info: 'Super! Lösung und Beispiel zusammen überzeugen.' },
          { text: '„Ach, Schaukeln sind total sicher.“', ok: false, info: 'Eine bloße Behauptung überzeugt nicht.' }]),
      ] },
    { meinung: 'Du möchtest: Jeden Abend soll ein anderer Stamm am Lagerfeuer eine Geschichte erzählen.',
      einwaende: [
        einwand(A, '„Manche Zwerge trauen sich nicht, vor allen zu erzählen.“', [
          { text: '„Das verstehe ich. Darum erzählt immer der ganze Stamm zusammen, und jeder darf auch nur einen Satz sagen.“', ok: true, info: 'Stark! Du nimmst die Sorge ernst und findest eine Lösung für alle.' },
          { text: '„Dann müssen die sich eben trauen.“', ok: false, info: 'Das setzt andere unter Druck und nimmt die Sorge nicht ernst.' },
          { text: '„Erzählen ist doch ganz leicht.“', ok: false, info: 'Für dich vielleicht – Amara ist nicht überzeugt.' }]),
        einwand(G, '„Wir kennen doch schon alle alten Geschichten.“', [
          { text: '„Alte Geschichten sind langweilig.“', ok: false, info: 'Damit gibst du Grimbart eher recht.' },
          { text: '„Wir können auch neue erzählen, zum Beispiel, was wir heute in der Mine erlebt haben.“', ok: true, info: 'Super! Mit einem Beispiel ist dein Gegenargument stark.' },
          { text: '„Dann erzählen wir sie eben noch mal, egal.“', ok: false, info: 'So nimmst du den Einwand nicht ernst.' }]),
        einwand(A, '„Dann gehen alle viel zu spät ins Bett.“', [
          { text: '„Schlaf ist nicht so wichtig.“', ok: false, info: 'Damit machst du Amara nur noch mehr Sorgen.' },
          { text: '„Das ist mir egal.“', ok: false, info: 'So nimmst du den Einwand nicht ernst.' },
          { text: '„Jede Geschichte dauert höchstens zehn Minuten. Wenn der Mond über dem Leuchtturm steht, ist Schluss.“', ok: true, info: 'Genau! Eine klare Regel beruhigt.' }]),
      ] },
    { meinung: 'Du möchtest: Wir pflanzen einen Obstgarten hinter der Mühle.',
      einwaende: [
        einwand(G, '„Bis ein Apfelbaum Früchte trägt, dauert es viele Jahre.“', [
          { text: '„Das stimmt. Darum pflanzen wir zuerst Beeren, die tragen schon im nächsten Sommer. Die Bäume sind für später.“', ok: true, info: 'Stark! Du gibst zu, was stimmt, und zeigst eine Lösung.' },
          { text: '„Wir haben doch Zeit.“', ok: false, info: 'Das ist zu ungenau, um Grimbart zu überzeugen.' },
          { text: '„Äpfel mag ich sowieso nicht.“', ok: false, info: 'Das ist nur deine Vorliebe – und spricht sogar gegen deinen Vorschlag.' }]),
        einwand(A, '„Die Möwen fressen doch alles weg.“', [
          { text: '„Möwen sind doof.“', ok: false, info: 'Das beantwortet den Einwand nicht.' },
          { text: '„Dann jagen wir die Möwen eben von der Insel.“', ok: false, info: 'Das ist unfair gegenüber den Möwen und keine gute Lösung.' },
          { text: '„Wir spannen Netze über die Beeren, so wie beim Gemüsegarten. Da klappt das auch.“', ok: true, info: 'Super! Ein Beispiel, das schon funktioniert, überzeugt.' }]),
        einwand(G, '„Und wer gießt die Pflanzen, wenn es lange nicht regnet?“', [
          { text: '„Es regnet hier doch immer.“', ok: false, info: 'Eine bloße Behauptung überzeugt nicht.' },
          { text: '„Die Mühle pumpt Wasser aus dem Brunnen. Damit gießen wir den Garten jeden Morgen.“', ok: true, info: 'Genau! Eine klare Antwort auf die Sorge.' },
          { text: '„Pflanzen brauchen kein Wasser.“', ok: false, info: 'Das stimmt nicht – so verlierst du Grimbarts Vertrauen.' }]),
      ] },
    { meinung: 'Du möchtest: Unser Schiff soll einmal im Monat zur Nachbarinsel segeln.',
      einwaende: [
        einwand(A, '„Das ist viel zu gefährlich. Das Meer ist oft stürmisch.“', [
          { text: '„Ich habe keine Angst vor Wellen.“', ok: false, info: 'Es geht nicht um dich, sondern um die Sicherheit aller.' },
          { text: '„Das stimmt. Darum segeln wir nur, wenn der Leuchtturmwärter sagt, dass ruhiges Wetter kommt.“', ok: true, info: 'Stark! Du nimmst die Sorge ernst und zeigst eine Lösung.' },
          { text: '„Stürme gibt es doch kaum.“', ok: false, info: 'Eine bloße Behauptung überzeugt nicht.' }]),
        einwand(G, '„Was sollen wir denn auf der Nachbarinsel?“', [
          { text: '„Einfach mal gucken.“', ok: false, info: 'Das ist kein überzeugender Grund.' },
          { text: '„Hier ist es doch langweilig.“', ok: false, info: 'Das macht die eigene Insel schlecht und überzeugt nicht.' },
          { text: '„Wir tauschen unsere Werkzeuge gegen Dinge, die es bei uns nicht gibt, zum Beispiel Honig und Wolle.“', ok: true, info: 'Super! Ein Grund mit Beispiel.' }]),
        einwand(A, '„Dann fehlen hier ja tagelang die besten Arbeiter.“', [
          { text: '„Es fahren nur vier Zwerge mit, und jedes Mal andere. Die anderen arbeiten hier weiter.“', ok: true, info: 'Genau! Ein konkreter Plan entkräftet den Einwand.' },
          { text: '„Die anderen schaffen das schon irgendwie.“', ok: false, info: 'Das ist zu ungenau, um Amara zu überzeugen.' },
          { text: '„Ich will aber mitfahren!“', ok: false, info: 'Ein Wunsch ist keine Antwort auf den Einwand.' }]),
      ] },
    { meinung: 'Du möchtest: Im Dorf soll eine Glocke hängen, mit der man den Rat zusammenruft.',
      einwaende: [
        einwand(G, '„Eine Glocke ist viel zu laut. Dann wachen alle auf.“', [
          { text: '„Laut ist doch gut.“', ok: false, info: 'So nimmst du Grimbarts Sorge nicht ernst.' },
          { text: '„Wer schläft, ist selbst schuld.“', ok: false, info: 'Unfreundlich – so überzeugst du niemanden.' },
          { text: '„Wir läuten sie nur tagsüber und nur, wenn der Rat sich trifft. Nachts bleibt sie still.“', ok: true, info: 'Stark! Eine klare Regel entkräftet den Einwand.' }]),
        einwand(A, '„Es kann doch einfach jemand durchs Dorf laufen und Bescheid sagen.“', [
          { text: '„Das dauert lange. Die Glocke hört man sofort überall, zum Beispiel auch unten am Steg und in der Mine.“', ok: true, info: 'Super! Ein Vorteil mit Beispiel.' },
          { text: '„Laufen ist anstrengend.“', ok: false, info: 'Das ist nur bequem gedacht, kein starkes Argument.' },
          { text: '„Das will ich aber nicht.“', ok: false, info: 'Ein Wunsch ist keine Antwort auf den Einwand.' }]),
        einwand(G, '„Und wenn Kinder ständig aus Spaß läuten?“', [
          { text: '„Das machen die bestimmt nicht.“', ok: false, info: 'Eine bloße Behauptung überzeugt nicht.' },
          { text: '„Dann läuten wir eben alle mit.“', ok: false, info: 'Damit wird Grimbarts Sorge sogar wahr.' },
          { text: '„Wir hängen die Glocke so hoch, dass nur die Älteste des Rates an das Seil kommt.“', ok: true, info: 'Genau! Eine einfache Lösung für die Sorge.' }]),
      ] },
  );

  ZI.GEGENARGUMENTE.push(
    { argument: '„Wir sollten eine Leseecke einrichten, weil man dort in Ruhe lesen kann.“',
      optionen: [
        { text: '„Und außerdem ist es dort gemütlich.“', ok: false, info: 'Das stützt die Meinung – es ist kein Gegenargument.' },
        { text: '„Aber dann ist im Klassenraum weniger Platz für die Gruppentische.“', ok: true, info: 'Genau! Ein echter Nachteil.' },
        { text: '„Aber ich lese lieber zu Hause.“', ok: false, info: 'Das ist nur deine Vorliebe – kein Nachteil für die Klasse.' }] },
    { argument: '„Wir sollten mit dem Fahrrad zur Schule fahren, weil das gesund ist.“',
      optionen: [
        { text: '„Aber im Winter ist es oft glatt, und dann ist Radfahren gefährlich.“', ok: true, info: 'Genau! Ein wichtiger Nachteil.' },
        { text: '„Und man ist an der frischen Luft.“', ok: false, info: 'Das stützt die Meinung.' },
        { text: '„Aber ich fahre lieber mit dem Roller.“', ok: false, info: 'Das ist nur dein Wunsch – kein Gegenargument zur Gesundheit.' }] },
    { argument: '„Wir sollten im Unterricht Kaugummi kauen dürfen, weil man sich dann besser konzentriert.“',
      optionen: [
        { text: '„Aber ich kaue nicht gern Kaugummi.“', ok: false, info: 'Das betrifft nur dich – kein Nachteil für die Klasse.' },
        { text: '„Und Kaugummi schmeckt gut.“', ok: false, info: 'Das stützt eher die Meinung.' },
        { text: '„Aber dann kleben bald überall Kaugummis unter den Tischen.“', ok: true, info: 'Genau! Ein echter Nachteil.' }] },
  );

  ZI.SITUATIONEN.push(
    { situation: 'Du möchtest allein mit dem Fahrrad zur Schule fahren. Deine Mutter hat Angst wegen der großen Kreuzung.',
      optionen: [
        { text: '„Alle anderen fahren auch allein.“', ok: false, info: 'Was andere dürfen, beruhigt deine Mutter nicht.' },
        { text: '„Wir fahren den Weg zuerst ein paar Mal zusammen. Dann siehst du, dass ich an der Kreuzung absteige und schiebe.“', ok: true, info: 'Genau! So gehst du auf ihre Sorge ein.' },
        { text: '„Mir passiert schon nichts.“', ok: false, info: 'Das ist nur eine Behauptung – ihre Sorge bleibt.' }] },
    { situation: 'Ihr möchtet bei Regen in der Pause im Klassenraum bleiben. Der Hausmeister sorgt sich, dass dann etwas kaputtgeht.',
      optionen: [
        { text: '„Es geht doch nie etwas kaputt.“', ok: false, info: 'Das wird der Hausmeister kaum glauben.' },
        { text: '„Draußen ist es aber langweilig.“', ok: false, info: 'Das geht nicht auf seine Sorge ein.' },
        { text: '„Wir bleiben nur bei Regen drin, und zwei Kinder vom Ordnungsdienst passen auf.“', ok: true, info: 'Genau! Ein Plan, der seine Sorge ernst nimmt.' }] },
    { situation: 'Du möchtest ein eigenes Handy. Dein Opa meint, dass Kinder dann nur noch auf den Bildschirm schauen.',
      optionen: [
        { text: '„Ich lege das Handy abends in die Küche und benutze es höchstens eine Stunde am Tag. Das können wir zusammen ausprobieren.“', ok: true, info: 'Genau! So gehst du auf seine Sorge ein.' },
        { text: '„Du hast doch auch ein Handy.“', ok: false, info: 'Das wirkt frech und geht nicht auf seine Sorge ein.' },
        { text: '„Alle in meiner Klasse haben eins.“', ok: false, info: 'Was andere haben, ist kein Grund für deinen Opa.' }] },
  );

  /* Sprecherwechsel: mehrere Ratsgespräche der Zwerge, eins wird gezogen */
  ZI.SPRECHERWECHSEL_RUNDEN = [
    ZI.SPRECHERWECHSEL,
    [
      'Ich finde, die Mühle sollte auch nachts mahlen, weil wir dann mehr Mehl haben.',
      'Ich bin dagegen, denn das Klappern weckt alle auf.',
      'Du sagst, dass das Klappern stört. Wir könnten die Flügel mit Stoff dämpfen.',
      'Ich schlage vor, dass sie nachts nur bei starkem Wind läuft.',
      'Das finde ich gut, weil wir den Wind dann gut nutzen.',
      'Was ist mit den Zwergen, die direkt neben der Mühle wohnen?',
      'Die könnten in diesen Nächten in der Festhalle schlafen.',
      'Ich fasse zusammen: Die Mühle läuft nachts nur bei starkem Wind und gedämpft.',
      'Dann stimmen wir doch einfach ab, oder?',
      'Wer ist dafür? Bitte meldet euch.',
    ],
    [
      'Ich finde, wir sollten jede Woche aus der Bibliothek vorlesen, weil Geschichten uns klüger machen.',
      'Ich bin dagegen, denn nach der Arbeit in der Mine sind viele zu müde.',
      'Du sagst, dass viele müde sind. Dann lesen wir eben am Lagerfeuer vor, da kann man sich ausruhen.',
      'Ich schlage vor, dass jeder Stamm einmal im Monat vorliest.',
      'Das finde ich gut, weil dann auch die Kleinen zuhören können.',
      'Was ist mit Zwergen, die nicht gern laut lesen?',
      'Die können zuhören oder die Bilder zeigen. Niemand muss vorlesen.',
      'Ich fasse zusammen: Jeder Stamm liest einmal im Monat am Feuer vor, freiwillig.',
      'Dann stimmen wir doch einfach ab, oder?',
      'Wer ist dafür? Bitte meldet euch.',
    ],
  ];

  /* ---------- GEBÄUDE-STOLLEN ---------- */
  const bau = (id) => ZI.BAU_UEBUNGEN.find((u) => u.id === id);
  const dazu = (id, liste) => { const u = bau(id); if (u) (u.items || u.runden).push(...liste); };

  dazu('werkstatt', [
    { kopf: '„Wir sollten eine Leseecke einrichten, weil eine Leseecke schön ist.“', optionen: [
      { text: '… weil eine Leseecke sehr, sehr schön ist.', ok: false, info: 'Das dreht sich im Kreis.' },
      { text: '… weil man sich dort in Ruhe auf ein Buch konzentrieren kann.', ok: true, info: 'Genau! Jetzt steht da, WARUM.' },
      { text: '… weil es in anderen Klassen auch eine gibt.', ok: false, info: 'Das erklärt nicht, wofür die Leseecke gut ist.' }] },
    { kopf: '„Man sollte Obst essen, weil Obst gut ist.“', optionen: [
      { text: '… weil Obst Vitamine hat, die uns gesund halten.', ok: true, info: 'Genau! Jetzt weiß man, wofür Obst gut ist.' },
      { text: '… weil Obst richtig gut ist.', ok: false, info: 'Das dreht sich im Kreis.' },
      { text: '… weil Obst süß schmeckt.', ok: false, info: 'Der Geschmack erklärt nicht, warum Obst gesund ist.' }] },
    { kopf: '„Wir sollten mehr draußen spielen, weil draußen besser ist.“', optionen: [
      { text: '… weil der Schulhof sehr groß ist.', ok: false, info: 'Die Größe erklärt nicht, wofür draußen spielen gut ist.' },
      { text: '… weil draußen viel besser ist als drinnen.', ok: false, info: 'Das dreht sich im Kreis.' },
      { text: '… weil wir uns draußen mehr bewegen und frische Luft bekommen.', ok: true, info: 'Genau! Jetzt ist die Begründung scharf.' }] },
  ]);

  dazu('huette3', [
    { kopf: 'Thema: Sport', karten: [
      { text: 'Fußball ist der beste Sport.', ja: true, info: 'Meinung – andere mögen Handball lieber.' },
      { text: 'Eine Fußballmannschaft hat elf Spieler auf dem Feld.', ja: false, info: 'Tatsache – das steht in den Regeln.' },
      { text: 'Schwimmen macht am meisten Spaß.', ja: true, info: 'Meinung – das findet jeder anders.' },
      { text: 'Beim Basketball wirft man den Ball in einen Korb.', ja: false, info: 'Tatsache – das kann man beobachten.' },
      { text: 'Sport sollte jeden Tag auf dem Stundenplan stehen.', ja: true, info: 'Meinung – ein Wunsch, über den man streiten kann.' },
      { text: 'Ein Marathon ist über 42 Kilometer lang.', ja: false, info: 'Tatsache – das kann man nachlesen.' }] },
    { kopf: 'Thema: Essen', karten: [
      { text: 'Pizza schmeckt am besten.', ja: true, info: 'Meinung – „am besten“ findet jeder anders.' },
      { text: 'Kartoffeln wachsen in der Erde.', ja: false, info: 'Tatsache – das kann man im Garten sehen.' },
      { text: 'Spinat ist eklig.', ja: true, info: 'Meinung – manche essen Spinat sehr gern.' },
      { text: 'Äpfel wachsen an Bäumen.', ja: false, info: 'Tatsache – das kann man beobachten.' },
      { text: 'Zum Frühstück sollte es immer Müsli geben.', ja: true, info: 'Meinung – andere frühstücken lieber Brot.' },
      { text: 'Käse wird aus Milch gemacht.', ja: false, info: 'Tatsache – das kann man nachlesen.' }] },
  ]);

  dazu('huette2', [
    { kopf: 'Ich habe Hunger, ___ esse ich ein Brot.', optionen: [
      { text: 'deshalb', ok: true, info: 'Genau! Das Brot ist die FOLGE vom Hunger.' },
      { text: 'weil', ok: false, info: 'Der Hunger steht schon vorne. Hinten kommt die Folge – dafür passt „deshalb“.' },
      { text: 'denn', ok: false, info: '„Denn“ nennt einen Grund. Hier folgt aber die Folge: Ich esse ein Brot.' }] },
    { kopf: 'Ich esse ein Brot, ___ ich Hunger habe.', optionen: [
      { text: 'denn', ok: false, info: 'Nach „denn“ hieße es: „denn ich habe Hunger“. Hier steht das Verb am Ende.' },
      { text: 'weil', ok: true, info: 'Genau! Der Hunger ist der GRUND, und das Verb steht am Ende.' },
      { text: 'deshalb', ok: false, info: '„Deshalb“ nennt eine Folge. Der Hunger ist aber der Grund.' }] },
    { kopf: 'Ich esse ein Brot, ___ ich habe Hunger.', optionen: [
      { text: 'weil', ok: false, info: 'Nach „weil“ müsste das Verb am Ende stehen: „weil ich Hunger habe“.' },
      { text: 'deshalb', ok: false, info: '„Deshalb“ nennt eine Folge. Der Hunger ist aber der Grund.' },
      { text: 'denn', ok: true, info: 'Genau! Nach „denn“ steht das Verb an zweiter Stelle.' }] },
  ]);

  dazu('steg', [
    { kopf: 'Ich finde, dass wir mit dem Fahrrad zur Schule fahren sollten, weil das gesund ist. Zum Beispiel trainiert man dabei die Beine.', optionen: [
      { text: 'Deshalb fahre ich lieber mit dem Bus.', ok: false, info: 'Der Schluss widerspricht der eigenen Meinung.' },
      { text: 'Deshalb bin ich dafür, mit dem Rad zur Schule zu fahren.', ok: true, info: 'Genau! Der Schluss sagt die Meinung noch einmal.' },
      { text: 'Deshalb sollten wir unsere Beine trainieren.', ok: false, info: 'Das greift nur das Beispiel auf – die Meinung war: mit dem Rad zur Schule.' }] },
    { kopf: 'Ich finde, dass wir einen Klassenrat brauchen, weil wir dort Streit fair klären. Zum Beispiel haben wir so den Streit um den Fußball gelöst.', optionen: [
      { text: 'Darum wünsche ich mir jede Woche einen Klassenrat.', ok: true, info: 'Richtig! Klar und passend.' },
      { text: 'Darum sollten wir nie mehr streiten.', ok: false, info: 'Das ist eine neue Forderung und rundet das Argument nicht ab.' },
      { text: 'Deshalb sollten wir den Streit um den Fußball lösen.', ok: false, info: 'Das ist nur das Beispiel – die Meinung war: ein Klassenrat.' }] },
    { kopf: 'Ich finde, dass es Wasserspender geben sollte, weil man beim Lernen genug trinken muss. Zum Beispiel bekommt man sonst leicht Kopfschmerzen.', optionen: [
      { text: 'Deshalb sollten wir keine Kopfschmerzen bekommen.', ok: false, info: 'Das greift nur das Beispiel auf – die Meinung war: Wasserspender.' },
      { text: 'Deshalb sollte es auch Limo geben.', ok: false, info: 'Das ist ein neues Thema.' },
      { text: 'Deshalb bin ich für Wasserspender an unserer Schule.', ok: true, info: 'Genau! Der Schluss sagt die Meinung noch einmal.' }] },
  ]);

  dazu('bibliothek', [
    { kopf: 'Wir brauchen einen Klassenrat, weil wir dort Streit fair klären können.', optionen: [
      { text: 'Im Klassenrat wird jeder Streit sofort für immer gelöst.', ok: false, info: 'Übertrieben – das glaubt niemand.' },
      { text: 'Zwei Kinder haben sich um den Ball gestritten. Im Klassenrat durfte jeder erzählen, und sie haben eine Regel gefunden.', ok: true, info: 'Stark! Man kann sich genau vorstellen, was passiert ist.' },
      { text: 'Der Klassenrat ist eben gut.', ok: false, info: 'Das ist kein Beispiel.' }] },
    { kopf: 'Wir sollten genug schlafen, weil man ausgeschlafen besser lernt.', optionen: [
      { text: 'Schlafen ist wichtig.', ok: false, info: 'Das ist kein Beispiel.' },
      { text: 'Wer viel schläft, bekommt immer eine Eins.', ok: false, info: 'Übertrieben – das glaubt niemand.' },
      { text: 'Als ich früh im Bett war, konnte ich mir am nächsten Tag beim Diktat alle Wörter merken.', ok: true, info: 'Stark! Ein genaues Erlebnis überzeugt.' }] },
    { kopf: 'Wir sollten draußen Unterricht machen, weil wir die Natur direkt beobachten können.', optionen: [
      { text: 'Im Schulgarten haben wir einen Regenwurm gefunden und genau gesehen, wie er sich bewegt.', ok: true, info: 'Stark! So ein Beispiel kann man sich vorstellen.' },
      { text: 'Draußen lernt man alles zehnmal schneller.', ok: false, info: 'Übertrieben – das glaubt niemand.' },
      { text: 'Natur ist schön.', ok: false, info: 'Das ist kein Beispiel.' }] },
  ]);

  dazu('ratsplatz', [
    { kopf: 'Zwei Kinder reden gleichzeitig. Keiner versteht etwas.', optionen: [
      { text: '„Seid doch mal still!“', ok: false, info: 'Unfreundlich – und es klärt nicht, wer spricht.' },
      { text: '„Stopp, einer nach dem anderen. Wer hat sich zuerst gemeldet?“', ok: true, info: 'Genau! So kommen beide nacheinander zu Wort.' },
      { text: 'Ich rede einfach lauter als beide.', ok: false, info: 'Dann wird es nur noch lauter.' }] },
    { kopf: 'Leonie sagt ihre Meinung, aber du verstehst ihren Grund nicht.', optionen: [
      { text: 'Ich nicke einfach.', ok: false, info: 'So bleibt das Missverständnis bestehen.' },
      { text: '„Das stimmt doch gar nicht.“', ok: false, info: 'Erst nachfragen, dann urteilen.' },
      { text: '„Leonie, warum findest du das?“', ok: true, info: 'Richtig! Nachfragen bringt das Gespräch weiter.' }] },
    { kopf: 'Die Redezeit ist fast um, und du willst noch etwas sagen.', optionen: [
      { text: 'Ich sage meinen wichtigsten Gedanken kurz in einem Satz.', ok: true, info: 'Genau! Kurz und klar – so bleibt Zeit für alle.' },
      { text: 'Ich rede einfach weiter, auch wenn die Zeit um ist.', ok: false, info: 'Dann kommen andere nicht mehr dran.' },
      { text: 'Ich sage gar nichts mehr und bin beleidigt.', ok: false, info: 'So geht dein Gedanke verloren.' }] },
  ]);

  dazu('brunnen', [
    { kopf: 'Du willst einem Vorschlag widersprechen.', optionen: [
      { text: 'Ich sehe das anders, weil …', ok: true, info: 'Richtig! Widersprechen mit Begründung.' },
      { text: 'Ja, und außerdem …', ok: false, info: 'Damit stimmst du zu.' },
      { text: 'Zum Beispiel …', ok: false, info: 'Damit nennst du ein Beispiel.' }] },
    { kopf: 'Du willst jemanden einbeziehen, der noch nichts gesagt hat.', optionen: [
      { text: 'Ich finde, dass …', ok: false, info: 'Damit sagst du deine eigene Meinung.' },
      { text: 'Was denkst du darüber?', ok: true, info: 'Richtig! So lädst du andere ein.' },
      { text: 'Du sagst, dass …', ok: false, info: 'Damit wiederholst du, was jemand gesagt hat.' }] },
    { kopf: 'Du willst einen Kompromiss vorschlagen.', optionen: [
      { text: 'Ich bin dagegen, denn …', ok: false, info: 'Damit widersprichst du.' },
      { text: 'Zum Beispiel …', ok: false, info: 'Damit nennst du ein Beispiel.' },
      { text: 'Wie wäre es, wenn wir beides …', ok: true, info: 'Richtig! So kommen beide Seiten zum Zug.' }] },
  ]);

  dazu('muehle', [
    { meinung: 'Ich finde, dass wir eine Leseecke einrichten sollten.', begruendungen: [
      { text: '… weil man sich dort in Ruhe auf ein Buch konzentrieren kann.', ok: true },
      { text: '… weil ich ein Lieblingskissen habe.', ok: false, info: 'Das gilt nur für dich.' },
      { text: '… weil die Nachbarklasse auch eine hat.', ok: false, info: 'Was andere haben, ist kein guter Grund.' },
      { text: '… weil wir dann mehr Lust bekommen, neue Bücher zu entdecken.', ok: true },
      { text: '… weil dort vielleicht Comics liegen.', ok: false, info: 'Das ist nebensächlich.' }] },
    { meinung: 'Ich finde, dass wir öfter draußen Unterricht machen sollten.', begruendungen: [
      { text: '… weil ich gern draußen bin.', ok: false, info: 'Das gilt nur für dich.' },
      { text: '… weil frische Luft uns wach und aufmerksam macht.', ok: true },
      { text: '… weil wir draußen lauter sein dürfen.', ok: false, info: 'Das ist kein guter Grund für Unterricht.' },
      { text: '… weil man dann vielleicht ein Eis kaufen könnte.', ok: false, info: 'Das ist nebensächlich.' },
      { text: '… weil wir Pflanzen und Tiere draußen direkt beobachten können.', ok: true }] },
    { meinung: 'Ich finde, dass es Wasserspender in der Schule geben sollte.', begruendungen: [
      { text: '… weil man mit genug Wasser besser denken kann.', ok: true },
      { text: '… weil ich oft Durst habe.', ok: false, info: 'Das gilt nur für dich.' },
      { text: '… weil dann keiner mehr Plastikflaschen mitbringen muss.', ok: true },
      { text: '… weil Wasserspender modern aussehen.', ok: false, info: 'Das ist nebensächlich.' },
      { text: '… weil es dann vielleicht auch Sprudel gibt.', ok: false, info: 'Das ist nebensächlich.' }] },
  ]);

  dazu('leuchtturm', [
    { kopf: '„Mit dir will doch keiner in einer Gruppe sein!“', optionen: [
      { text: '„Ich möchte heute lieber in einer anderen Gruppe arbeiten, weil wir uns letztes Mal oft gestritten haben.“', ok: true, info: 'Richtig! Du sagst, was du möchtest, und begründest es, ohne zu verletzen.' },
      { text: '„Du nervst einfach alle.“', ok: false, info: 'Wieder ein Angriff auf die Person.' },
      { text: '„Geh weg.“', ok: false, info: 'Unfreundlich und ohne Grund.' }] },
    { kopf: '„Dein Vorschlag ist voll peinlich.“', optionen: [
      { text: '„Du bist peinlich.“', ok: false, info: 'Ein Angriff auf die Person.' },
      { text: '„Ich bin gegen den Vorschlag, weil er zu teuer wäre.“', ok: true, info: 'Richtig! Du kritisierst die Sache, nicht die Person.' },
      { text: '„Hahaha, wie lustig.“', ok: false, info: 'Auslachen verletzt.' }] },
    { kopf: '„Immer wollt ihr Mädchen bestimmen!“', optionen: [
      { text: '„Ihr seid immer so gemein.“', ok: false, info: 'Ein Vorwurf an eine ganze Gruppe.' },
      { text: '„Dann bestimme ich jetzt alles.“', ok: false, info: 'Das ist nicht fair.' },
      { text: '„Ich finde, jeder sollte gleich oft entscheiden dürfen. Lasst uns abwechseln.“', ok: true, info: 'Richtig! Sachlich und fair für alle.' }] },
  ]);

  dazu('festhalle', [
    { kopf: 'Paul möchte beim Ausflug mit dem Bus fahren. Lotta möchte lieber mit dem Fahrrad fahren.', optionen: [
      { text: 'Hin fahren alle mit dem Rad, zurück, wenn alle müde sind, mit dem Bus.', ok: true, info: 'Richtig! Beide Wünsche kommen dran.' },
      { text: 'Wer mit dem Rad fahren will, bleibt zu Hause.', ok: false, info: 'Dann verliert eine Seite.' },
      { text: 'Wer am lautesten ruft, gewinnt.', ok: false, info: 'Das ist nicht fair.' }] },
    { kopf: 'Die eine Hälfte der Klasse wünscht sich Pflanzen im Klassenraum, die andere Hälfte ein Aquarium.', optionen: [
      { text: 'Wir nehmen gar nichts, dann gibt es keinen Streit.', ok: false, info: 'Dann verlieren alle.' },
      { text: 'Jetzt stellen wir Pflanzen auf, und im nächsten Halbjahr kommt ein kleines Aquarium dazu.', ok: true, info: 'Richtig! Beide Seiten bekommen etwas.' },
      { text: 'Die Lauteren bekommen ihren Willen.', ok: false, info: 'Das ist nicht fair.' }] },
    { kopf: 'Merle und Noah möchten beide beim Vortrag als Erste drankommen.', optionen: [
      { text: 'Beide reden gleichzeitig.', ok: false, info: 'Dann versteht niemand etwas.' },
      { text: 'Wer schneller zur Tafel rennt, fängt an.', ok: false, info: 'Das ist unfair und gefährlich.' },
      { text: 'Sie werfen eine Münze, und wer verliert, darf beim nächsten Mal zuerst.', ok: true, info: 'Richtig! Fair für beide.' }] },
  ]);

  /* Sitzordnung & Co.: mehr Runden „begründet oder nicht?“ */
  if (ZI.BEGRUENDET_RUNDEN) {
    const vorlage = ZI.BEGRUENDET_RUNDEN[0];
    const runde = (kopf, karten) => Object.assign({}, vorlage, { kopf, karten });
    ZI.BEGRUENDET_RUNDEN.push(
      runde('Thema: Sollte unsere Klasse in den Kletterpark fahren?', [
        { text: 'Ich bin für den Kletterpark, weil wir uns dort gegenseitig helfen müssen.', ja: true, info: 'Begründet mit „weil“.' },
        { text: 'Der Kletterpark ist cool.', ja: false, info: 'Nicht begründet: Warum ist er cool?' },
        { text: 'Ich bin dagegen, denn manche haben Höhenangst.', ja: true, info: 'Begründet mit „denn“.' },
        { text: 'Ich will da unbedingt hin!', ja: false, info: 'Nicht begründet: Nur ein Wunsch, kein Grund.' },
        { text: 'Der Kletterpark ist gut, da man dort mutiger wird.', ja: true, info: 'Begründet mit „da“.' },
        { text: 'Kletterpark? Nö.', ja: false, info: 'Nicht begründet – und eine Gesprächsbremse.' }]),
      runde('Thema: Sollten wir die Klassendienste jede Woche wechseln?', [
        { text: 'Wir sollten jede Woche wechseln, weil dann niemand immer den unbeliebten Dienst hat.', ja: true, info: 'Begründet mit „weil“.' },
        { text: 'Jede Woche wechseln finde ich gut.', ja: false, info: 'Nicht begründet: Warum findest du es gut?' },
        { text: 'Ich bin dagegen, denn bei jedem Wechsel vergessen manche ihren neuen Dienst.', ja: true, info: 'Begründet mit „denn“.' },
        { text: 'Wechseln ist doof.', ja: false, info: 'Nicht begründet – und eine Gesprächsbremse.' },
        { text: 'Ein Wechsel ist sinnvoll, da man so alle Dienste kennenlernt.', ja: true, info: 'Begründet mit „da“.' },
        { text: 'Ich will auf jeden Fall Tafeldienst.', ja: false, info: 'Nicht begründet: Nur ein Wunsch, kein Grund.' }]),
    );
  }

  /* =========================================================
     NOCH TIEFER GRABEN – neue Stufen (schwerer statt mehr)
     ========================================================= */
  const o = (text, ok, info) => ({ text, ok, info });
  /* Tiefe 2: Beide Begründungen passen – welche ist stärker? */
  ZI.STAERKER = [
    { meinung: 'Wir sollten in der Pause draußen spielen dürfen, …', optionen: [
      o('… weil man sich draußen bewegt und danach im Unterricht besser aufpassen kann.', true, 'Stärker: Es erklärt, was die Bewegung bringt – für alle und für das Lernen.'),
      o('… weil es draußen schöner ist.', false, 'Passt, bleibt aber ungenau. Warum ist es schöner, und was bringt das?')] },
    { meinung: 'Unsere Klasse sollte eine Leseecke bekommen, …', optionen: [
      o('… weil ich gern auf Kissen sitze.', false, 'Passt, aber es geht nur um dich. Ein starkes Argument gilt für viele.'),
      o('… weil man dort in Ruhe lesen kann, wenn es im Raum laut ist.', true, 'Stärker: Es nennt einen echten Nutzen für die ganze Klasse.')] },
    { meinung: 'Es sollte Wasserspender in der Schule geben, …', optionen: [
      o('… weil Wasser gesund ist.', false, 'Stimmt, ist aber sehr allgemein. Was genau bringt der Wasserspender?'),
      o('… weil viele Kinder sonst zu wenig trinken und dann Kopfschmerzen bekommen.', true, 'Stärker: Es zeigt ein echtes Problem und eine Folge.')] },
    { meinung: 'Wir sollten Klassendienste einführen, …', optionen: [
      o('… weil dann jeder mal Verantwortung übernimmt und nicht immer dieselben aufräumen.', true, 'Stärker: Es erklärt, was gerechter wird.'),
      o('… weil Dienste wichtig sind.', false, 'Das sagt nur „wichtig“. Warum sind sie wichtig?')] },
    { meinung: 'Man sollte mit dem Fahrrad zur Schule fahren, …', optionen: [
      o('… weil Fahrräder Spaß machen.', false, 'Passt, ist aber nur ein Gefühl. Was bringt es wirklich?'),
      o('… weil man sich bewegt und die Luft vor der Schule sauberer bleibt.', true, 'Stärker: Zwei echte Vorteile, die man prüfen kann.')] },
    { meinung: 'Wir sollten einen Klassenrat einführen, …', optionen: [
      o('… weil wir dort Streit in Ruhe klären können und alle zu Wort kommen.', true, 'Stärker: Es erklärt genau, wobei der Klassenrat hilft.'),
      o('… weil andere Klassen auch einen haben.', false, 'Schwach: Dass andere es machen, ist noch kein Grund.')] },
    { meinung: 'Kinder sollten genug schlafen, …', optionen: [
      o('… weil man ausgeschlafen besser lernen und sich mehr merken kann.', true, 'Stärker: Es nennt eine klare Folge.'),
      o('… weil Mama das sagt.', false, 'Schwach: Wer etwas sagt, ist noch keine Begründung.')] },
    { meinung: 'Wir sollten einmal im Monat draußen Unterricht machen, …', optionen: [
      o('… weil drinnen langweilig ist.', false, 'Ungenau: Was genau wird draußen besser?'),
      o('… weil wir draußen Pflanzen und Tiere direkt beobachten können.', true, 'Stärker: Es zeigt, was man draußen lernen kann.')] },
    { meinung: 'Man sollte andere ausreden lassen, …', optionen: [
      o('… weil man sonst nicht erfährt, was der andere eigentlich meint.', true, 'Stärker: Es erklärt, was sonst verloren geht.'),
      o('… weil das höflich ist.', false, 'Passt, aber warum ist es wichtig, höflich zu sein? Das bleibt offen.')] },
    { meinung: 'Wir sollten weniger Plastik benutzen, …', optionen: [
      o('… weil Plastik nicht schön aussieht.', false, 'Schwach: Aussehen ist nicht das Problem.'),
      o('… weil Plastikmüll oft im Meer landet und Tiere ihn fressen.', true, 'Stärker: Es zeigt eine echte, schlimme Folge.')] },
  ];
  /* Tiefe 3: Eine schwache Begründung besser machen */
  ZI.VERBESSERN = [
    { schwach: 'Ich finde, dass wir eine Klassenfahrt machen sollten, weil Klassenfahrten toll sind.', optionen: [
      o('… weil wir uns als neue Klasse dabei besser kennenlernen.', true, 'Jetzt erklärt die Begründung, WAS die Fahrt bringt.'),
      o('… weil Klassenfahrten wirklich sehr, sehr toll sind.', false, 'Nur lauter, nicht besser: Es fehlt immer noch das Warum.'),
      o('… weil der Bus groß ist.', false, 'Das passt nicht zur Meinung.')] },
    { schwach: 'Ich finde, dass man Müll trennen sollte, weil man das so macht.', optionen: [
      o('… weil das alle machen.', false, 'Dass alle es machen, ist kein Grund.'),
      o('… weil man aus getrenntem Müll neue Dinge herstellen kann.', true, 'Jetzt steht da ein echter Grund.'),
      o('… weil die Tonnen bunt sind.', false, 'Das passt nicht zur Meinung.')] },
    { schwach: 'Ich finde, dass wir mehr Sport machen sollten, weil Sport gut ist.', optionen: [
      o('… weil Bewegung uns fit macht und wir danach ruhiger lernen.', true, 'Jetzt erklärt die Begründung, warum Sport gut ist.'),
      o('… weil Sport echt gut ist.', false, 'Nur lauter, nicht besser.'),
      o('… weil die Turnhalle neu ist.', false, 'Das ist kein Grund für mehr Sport.')] },
    { schwach: 'Ich finde, dass man Tiere gut behandeln sollte, weil ich Tiere mag.', optionen: [
      o('… weil Tiere süß sind.', false, 'Immer noch nur ein Gefühl.'),
      o('… weil Tiere genau wie wir Schmerzen und Angst spüren.', true, 'Jetzt gilt der Grund für alle, nicht nur für dich.'),
      o('… weil ich einen Hund habe.', false, 'Das erzählt von dir, begründet aber nichts.')] },
    { schwach: 'Ich finde, dass wir leise arbeiten sollten, weil es so ist.', optionen: [
      o('… weil Leise-Sein eine Regel ist.', false, 'Eine Regel nennen ist noch kein Grund.'),
      o('… weil Lärm stört.', false, 'Schon besser, aber noch ungenau: Wobei stört er?'),
      o('… weil sich dann alle besser konzentrieren können.', true, 'Jetzt ist klar, was das Leise-Sein bringt.')] },
    { schwach: 'Ich finde, dass wir Obst essen sollten, weil Obst gut ist.', optionen: [
      o('… weil Obst Vitamine hat, die uns vor Erkältungen schützen.', true, 'Jetzt erklärt die Begründung, warum Obst gut ist.'),
      o('… weil Obst sehr gut ist.', false, 'Nur lauter, nicht besser.'),
      o('… weil Äpfel rot sind.', false, 'Das passt nicht zur Meinung.')] },
    { schwach: 'Ich finde, dass wir Pausenspiele abwechseln sollten, weil ich keinen Fußball mag.', optionen: [
      o('… weil ich lieber Fangen spiele.', false, 'Wieder nur dein Wunsch.'),
      o('… weil dann auch Kinder mitspielen können, die Fußball nicht mögen.', true, 'Jetzt denkt die Begründung an alle.'),
      o('… weil Fußball doof ist.', false, 'Das ist eine Meinung, kein Grund.')] },
    { schwach: 'Ich finde, dass man einen Helm tragen sollte, weil Helme wichtig sind.', optionen: [
      o('… weil Helme wirklich wichtig sind.', false, 'Nur lauter, nicht besser.'),
      o('… weil Helme teuer sind.', false, 'Das passt nicht zur Meinung.'),
      o('… weil ein Helm bei einem Sturz den Kopf schützt.', true, 'Jetzt steht da, WOFÜR der Helm wichtig ist.')] },
  ];
  /* Tiefe 4 (Kapitel 2): Spricht der Satz dafür oder dagegen? */
  const dd = (meinung, ...karten) => ({ kopf: meinung, karten: karten.map(([text, ja, info]) => ({ text, ja, info })) });
  ZI.DAFUER_DAGEGEN = [
    dd('Die Schule sollte erst um 9 Uhr beginnen.',
      ['Viele Kinder wären ausgeschlafener.', true, 'Dafür: ein Vorteil des späten Beginns.'],
      ['Dann ist die Schule erst später aus.', false, 'Dagegen: ein Nachteil, den man bedenken muss.'],
      ['Man könnte in Ruhe frühstücken.', true, 'Dafür: noch ein Vorteil.'],
      ['Eltern müssen oft früh zur Arbeit.', false, 'Dagegen: Wer bringt die Kinder dann?'],
      ['Morgens ist der Kopf oft noch müde.', true, 'Dafür: Es stützt den späteren Beginn.'],
      ['Nachmittags bleibt weniger Zeit für Hobbys.', false, 'Dagegen: Die Freizeit wird kürzer.']),
    dd('Handys sollten in der Pause erlaubt sein.',
      ['Man kann kurz die Eltern erreichen.', true, 'Dafür: ein Vorteil.'],
      ['Dann spielen weniger Kinder zusammen.', false, 'Dagegen: Die Pause wird ruhiger, aber einsamer.'],
      ['Fotos können ohne Erlaubnis gemacht werden.', false, 'Dagegen: eine echte Gefahr.'],
      ['Man kann zusammen Musik hören.', true, 'Dafür: ein Vorteil für die Pause.'],
      ['Die Augen brauchen in der Pause auch eine Pause.', false, 'Dagegen: Erholung fehlt.'],
      ['Man lernt, selbst vernünftig mit dem Handy umzugehen.', true, 'Dafür: ein Grund, es zu erlauben.']),
    dd('Es sollte keine Hausaufgaben geben.',
      ['Man hat mehr Zeit für Familie und Freunde.', true, 'Dafür: ein Vorteil ohne Hausaufgaben.'],
      ['Durch Üben merkt man sich Dinge besser.', false, 'Dagegen: Hausaufgaben helfen beim Lernen.'],
      ['Manche Kinder haben zu Hause keine Hilfe.', true, 'Dafür: Hausaufgaben sind nicht für alle gerecht.'],
      ['Die Lehrkraft sieht, was noch nicht klappt.', false, 'Dagegen: Hausaufgaben zeigen, wo man Hilfe braucht.'],
      ['Nach der Schule ist man oft müde.', true, 'Dafür: Es stützt die Meinung.'],
      ['Man lernt, sich die Zeit selbst einzuteilen.', false, 'Dagegen: ein Vorteil von Hausaufgaben.']),
  ];
})();
