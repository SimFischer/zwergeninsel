/* Zwergeninsel – zusätzliche Aufgaben, Vormach-Beispiele und Wissensbuch
   Jede Station zieht zufällig aus ihrem Pool, damit jedes Spielen anders ist. */

(function () {
  const ZI = window.ZI;

  /* =========================================================
     MEHR AUFGABEN
     ========================================================= */

  ZI.STUMPF_SCHARF.push(
    { meinung: 'Ich finde, dass wir mehr Ausflüge machen sollten, …',
      optionen: [
        { text: '… weil Ausflüge toll sind.', scharf: false, info: '„Toll“ – aber warum? Die Begründung dreht sich im Kreis.' },
        { text: '… weil wir dabei Dinge sehen, die wir sonst nur aus Büchern kennen.', scharf: true, info: 'Genau! Du erklärst, was ein Ausflug bringt.' },
        { text: '… weil morgen Dienstag ist.', scharf: false, info: 'Das hat mit der Meinung nichts zu tun.' }] },
    { meinung: 'Ich finde, dass man sein Zimmer aufräumen sollte, …',
      optionen: [
        { text: '… weil Aufräumen wichtig ist.', scharf: false, info: 'Warum ist es wichtig? Genau das fehlt.' },
        { text: '… weil meine Mutter das will.', scharf: false, info: 'Das ist nur eine Regel von außen. Warum ist sie sinnvoll?' },
        { text: '… weil man seine Sachen dann schneller wiederfindet.', scharf: true, info: 'Richtig! Diese Begründung erklärt den Nutzen.' }] },
    { meinung: 'Ich finde, dass Kinder viel Obst essen sollten, …',
      optionen: [
        { text: '… weil Obst Vitamine hat, die uns vor Erkältungen schützen.', scharf: true, info: 'Stark! Du erklärst, was Obst im Körper bewirkt.' },
        { text: '… weil Obst gut ist.', scharf: false, info: '„Gut“ erklärt nichts. Wofür ist Obst gut?' },
        { text: '… weil Bananen gelb sind.', scharf: false, info: 'Das stimmt, ist aber kein Grund.' }] },
    { meinung: 'Ich finde, dass wir in der Klasse leise arbeiten sollten, …',
      optionen: [
        { text: '… weil leise besser ist.', scharf: false, info: 'Besser – aber warum? Die Begründung bleibt stumpf.' },
        { text: '… weil es so ist.', scharf: false, info: 'Das ist gar keine Begründung.' },
        { text: '… weil sich dann alle besser konzentrieren können.', scharf: true, info: 'Genau! Das erklärt, warum Ruhe hilft.' }] },
    { meinung: 'Ich finde, dass man Tiere gut behandeln sollte, …',
      optionen: [
        { text: '… weil Tiere genau wie wir Schmerzen und Angst spüren.', scharf: true, info: 'Richtig! Diese Begründung erklärt, warum Tiere Rücksicht brauchen.' },
        { text: '… weil man das so macht.', scharf: false, info: 'Das erklärt nicht, warum.' },
        { text: '… weil ich Tiere mag.', scharf: false, info: 'Das ist nur dein Gefühl. Warum sollten alle Tiere gut behandeln?' }] },
    { meinung: 'Ich finde, dass man im Bus älteren Menschen seinen Platz anbieten sollte, …',
      optionen: [
        { text: '… weil der Bus blau ist.', scharf: false, info: 'Das hat mit der Meinung nichts zu tun.' },
        { text: '… weil ältere Menschen beim Bremsen leichter stürzen können.', scharf: true, info: 'Stark! Du nennst einen echten Grund.' },
        { text: '… weil man das eben so macht.', scharf: false, info: 'Warum macht man das? Das fehlt noch.' }] },
  );

  ZI.ERZ_SCHLACKE.push(
    { meinung: 'Es sollte einen Kuscheltiertag geben, …',
      gruende: [
        { text: '… weil sich manche Kinder mit ihrem Kuscheltier wohler fühlen.', erz: true, info: 'Erz! Ein Grund, der zur Meinung passt.' },
        { text: '… weil Kuscheltiere weich sind.', erz: false, info: 'Schlacke. Das stimmt, ist aber kein Grund für einen Kuscheltiertag.' },
        { text: '… weil wir uns unsere Kuscheltiere vorstellen und dabei viel erzählen können.', erz: true, info: 'Erz! So lernen wir uns besser kennen.' },
        { text: '… weil meine Schwester auch eins hat.', erz: false, info: 'Schlacke. Was deine Schwester hat, ist kein Grund für die Klasse.' }] },
    { meinung: 'In der Pause sollten wir Fußball und andere Spiele abwechseln, …',
      gruende: [
        { text: '… weil Bälle rund sind.', erz: false, info: 'Schlacke. Das hat nichts mit der Frage zu tun.' },
        { text: '… weil dann auch Kinder mitspielen, die Fußball nicht mögen.', erz: true, info: 'Erz! So können alle mitmachen.' },
        { text: '… weil es dann weniger Streit um den Platz gibt.', erz: true, info: 'Erz! Ein Grund, der allen hilft.' },
        { text: '… weil ich lieber Basketball spiele.', erz: false, info: 'Schlacke. Das ist nur deine Vorliebe.' }] },
    { meinung: 'Unsere Klassenfahrt sollte an den Weißenhäuser Strand gehen, …',
      gruende: [
        { text: '… weil wir dort viel draußen erleben können.', erz: true, info: 'Erz! Das passt gut zur Meinung.' },
        { text: '… weil der Strand Sand hat.', erz: false, info: 'Schlacke. Jeder Strand hat Sand – das ist kein Grund.' },
        { text: '… weil mein Nachbar dort Urlaub gemacht hat.', erz: false, info: 'Schlacke. Das ist kein Grund für unsere Klasse.' },
        { text: '… weil die Fahrt nicht lange dauert und wir mehr Zeit vor Ort haben.', erz: true, info: 'Erz! Ein guter, sachlicher Grund.' }] },
  );

  ZI.WEIL_DENN.push(
    { haupt: 'Ich trage einen Helm,', bindewort: 'weil', kacheln: ['er', 'meinen Kopf', 'schützt.'], verb: 'schützt.',
      loesungen: [['er', 'meinen Kopf', 'schützt.']] },
    { haupt: 'Wir gehen nach draußen,', bindewort: 'denn', kacheln: ['die Sonne', 'scheint', 'endlich.'], verb: 'scheint',
      loesungen: [['die Sonne', 'scheint', 'endlich.']] },
    { haupt: 'Ich bleibe heute drinnen,', bindewort: 'da', kacheln: ['es', 'stark', 'regnet.'], verb: 'regnet.',
      loesungen: [['es', 'stark', 'regnet.']] },
    { haupt: 'Frida übt jeden Tag Flöte,', bindewort: 'weil', kacheln: ['sie', 'im Konzert', 'spielen', 'möchte.'], verb: 'möchte.',
      loesungen: [['sie', 'im Konzert', 'spielen', 'möchte.']] },
    { haupt: 'Wir brauchen eine neue Regel,', bindewort: 'denn', kacheln: ['es', 'gibt', 'oft', 'Streit.'], verb: 'gibt',
      loesungen: [['es', 'gibt', 'oft', 'Streit.']] },
    { haupt: 'Ich esse einen Apfel,', bindewort: 'weil', kacheln: ['ich', 'Hunger', 'habe.'], verb: 'habe.',
      loesungen: [['ich', 'Hunger', 'habe.']] },
  );

  ZI.FEHLERJAGD.push(
    { saetze: [
      { text: 'Ich gehe früh ins Bett, weil ich will morgen fit sein.', ok: false, info: 'Nach „weil“ gehört das Verb ans Ende.' },
      { text: 'Ich gehe früh ins Bett, weil ich morgen fit sein will.', ok: true },
      { text: 'Ich gehe früh ins Bett weil ich morgen fit sein will.', ok: false, info: 'Vor „weil“ fehlt das Komma.' }] },
    { saetze: [
      { text: 'Selin lacht, denn der Witz ist lustig.', ok: true },
      { text: 'Selin lacht, denn ist der Witz lustig.', ok: false, info: 'Nach „denn“ kommt ein normaler Satz: denn der Witz ist lustig.' },
      { text: 'Selin lacht denn der Witz ist lustig.', ok: false, info: 'Vor „denn“ fehlt das Komma.' }] },
    { saetze: [
      { text: 'Wir brauchen Regeln da sonst Streit entsteht.', ok: false, info: 'Vor „da“ fehlt das Komma.' },
      { text: 'Wir brauchen Regeln, da entsteht sonst Streit.', ok: false, info: 'Nach „da“ gehört das Verb ans Ende.' },
      { text: 'Wir brauchen Regeln, da sonst Streit entsteht.', ok: true }] },
    { saetze: [
      { text: 'Ben ist traurig, weil sein Hamster krank ist.', ok: true },
      { text: 'Ben ist traurig weil sein Hamster krank ist.', ok: false, info: 'Vor „weil“ fehlt das Komma.' },
      { text: 'Ben ist traurig, weil sein Hamster ist krank.', ok: false, info: 'Nach „weil“ gehört das Verb ans Ende.' }] },
    { saetze: [
      { text: 'Ich nehme einen Schirm mit, denn es nach Regen aussieht.', ok: false, info: 'Nach „denn“ steht das Verb an zweiter Stelle: denn es sieht nach Regen aus.' },
      { text: 'Ich nehme einen Schirm mit denn es sieht nach Regen aus.', ok: false, info: 'Vor „denn“ fehlt das Komma.' },
      { text: 'Ich nehme einen Schirm mit, denn es sieht nach Regen aus.', ok: true }] },
  );

  ZI.BEISPIELE.push(
    { argument: 'Ich finde, dass wir mehr vorlesen sollten, weil man dabei neue Wörter lernt.',
      optionen: [
        { text: 'Zum Beispiel habe ich ein rotes Buch.', ok: false, info: 'Die Farbe des Buchs zeigt nichts über neue Wörter.' },
        { text: 'Zum Beispiel habe ich beim Vorlesen das Wort „Leuchtturm“ kennengelernt.', ok: true, info: 'Genau! Das Beispiel zeigt, dass man neue Wörter lernt.' },
        { text: 'Zum Beispiel lese ich gern im Bett.', ok: false, info: 'Schön, aber das stützt die Begründung nicht.' }] },
    { argument: 'Ich finde, dass Kinder Fahrrad fahren lernen sollten, weil sie dann selbstständiger sind.',
      optionen: [
        { text: 'Zum Beispiel kann ich jetzt allein zu meinem Freund fahren.', ok: true, info: 'Richtig! So sieht Selbstständigkeit aus.' },
        { text: 'Zum Beispiel hat mein Fahrrad eine Klingel.', ok: false, info: 'Das hat nichts mit Selbstständigkeit zu tun.' },
        { text: 'Zum Beispiel ist Rot meine Lieblingsfarbe.', ok: false, info: 'Das passt nicht zur Begründung.' }] },
    { argument: 'Ich finde, dass wir Klassenregeln brauchen, weil dann alle wissen, was gilt.',
      optionen: [
        { text: 'Zum Beispiel ist unser Klassenraum hell.', ok: false, info: 'Das zeigt nichts über Regeln.' },
        { text: 'Zum Beispiel haben wir dienstags Sport.', ok: false, info: 'Das ist ein Stundenplan, keine Regel.' },
        { text: 'Zum Beispiel weiß dann jeder, dass man sich meldet, bevor man spricht.', ok: true, info: 'Genau! Ein Beispiel, das zur Begründung passt.' }] },
    { argument: 'Ich finde, dass man Müll trennen sollte, weil man daraus Neues herstellen kann.',
      optionen: [
        { text: 'Zum Beispiel wird aus altem Papier neues Heftpapier gemacht.', ok: true, info: 'Richtig! So sieht Wiederverwerten aus.' },
        { text: 'Zum Beispiel ist unsere Mülltonne grün.', ok: false, info: 'Die Farbe der Tonne zeigt nichts.' },
        { text: 'Zum Beispiel stinkt Müll.', ok: false, info: 'Das stimmt, passt aber nicht zur Begründung.' }] },
  );

  ZI.PUZZLE.push([
    { these: 'Wir sollten einen Schulgarten anlegen,',
      begruendung: '… weil wir dort lernen, wie Pflanzen wachsen.',
      beispiel: 'Wir könnten zum Beispiel Sonnenblumen säen und jede Woche messen, wie groß sie sind.' },
    { these: 'Es sollte einen Schwimmtag geben,',
      begruendung: '… denn Schwimmen ist gut für den ganzen Körper.',
      beispiel: 'Beim Kraulen bewegen sich zum Beispiel Arme und Beine gleichzeitig.' },
    { these: 'Wir sollten einen Kuscheltiertag machen,',
      begruendung: '… weil sich viele Kinder dann wohler fühlen.',
      beispiel: 'Manche erzählen zum Beispiel leichter etwas, wenn sie ihr Kuscheltier im Arm haben.' },
  ]);

  ZI.MOTOR_BREMSE.push({
    thema: 'Gespräch: Wohin geht unser Klassenausflug?',
    beitraege: [
      { text: 'Nele: „Ich schlage den Kletterpark vor, weil wir dort als Team zusammenarbeiten müssen.“', motor: true,
        info: 'Motor! Ein Vorschlag mit Begründung.' },
      { text: 'Tom: „Kletterpark ist was für Babys.“', motor: false,
        info: 'Bremse! Tom macht den Vorschlag lächerlich, ohne Grund.' },
      { text: 'Ali meldet sich: „Darf ich etwas ergänzen? Der Kletterpark ist auch nicht weit weg.“', motor: true,
        info: 'Motor! Ali meldet sich und ergänzt einen Grund.' },
      { text: 'Greta flüstert mit ihrer Nachbarin und kichert.', motor: false,
        info: 'Bremse! Nebengespräche lenken alle ab.' },
      { text: 'Jan: „Wer war noch nicht dran? Merle, möchtest du etwas sagen?“', motor: true,
        info: 'Motor! Jan achtet darauf, dass alle zu Wort kommen.' },
      { text: 'Max: „Ich höre gar nicht zu, ich bin sowieso dagegen.“', motor: false,
        info: 'Bremse! Wer nicht zuhört, kann nicht mitdiskutieren.' },
    ],
  });

  ZI.HOEREN.push(
    { text: 'Ich bin der Meinung, dass wir eine Leseecke einrichten sollten, denn dort kann man sich in Ruhe zurückziehen. Zum Beispiel könnte man dort in der Pause lesen, wenn es draußen regnet.',
      fragen: [
        { frage: 'Was war die Meinung?', optionen: [
          { text: 'Wir sollten eine Leseecke einrichten.', ok: true },
          { text: 'Wir sollten eine Spielecke einrichten.', ok: false },
          { text: 'Wir sollten eine Bastelecke einrichten.', ok: false }] },
        { frage: 'Welches Beispiel hast du gehört?', optionen: [
          { text: 'Hausaufgaben in der Leseecke machen.', ok: false },
          { text: 'In der Pause lesen, wenn es draußen regnet.', ok: true },
          { text: 'Mit Freunden in der Ecke spielen.', ok: false }] },
      ] },
    { text: 'Ich finde, dass Kinder im Haushalt helfen sollten, weil sie dabei selbstständig werden. Zum Beispiel lerne ich beim Kochen, wie man Nudeln zubereitet.',
      fragen: [
        { frage: 'Welche Begründung hast du gehört?', optionen: [
          { text: 'Weil die Eltern müde sind.', ok: false },
          { text: 'Weil man dafür Taschengeld bekommt.', ok: false },
          { text: 'Weil sie dabei selbstständig werden.', ok: true }] },
        { frage: 'Welches Beispiel hast du gehört?', optionen: [
          { text: 'Beim Kochen lernen, wie man Nudeln zubereitet.', ok: true },
          { text: 'Den Müll rausbringen.', ok: false },
          { text: 'Das Zimmer aufräumen.', ok: false }] },
      ] },
    { text: 'Ich bin der Meinung, dass es in der Schule Wasserspender geben sollte, weil man beim Lernen genug trinken muss. Zum Beispiel bekomme ich Kopfschmerzen, wenn ich zu wenig trinke.',
      fragen: [
        { frage: 'Was war die Meinung?', optionen: [
          { text: 'Es sollte einen Saftautomaten geben.', ok: false },
          { text: 'Es sollte Wasserspender geben.', ok: true },
          { text: 'Es sollte einen Schulkiosk geben.', ok: false }] },
        { frage: 'Welche Begründung hast du gehört?', optionen: [
          { text: 'Weil man beim Lernen genug trinken muss.', ok: true },
          { text: 'Weil Wasser billig ist.', ok: false },
          { text: 'Weil Flaschen so schwer sind.', ok: false }] },
      ] },
    { text: 'Ich finde, dass wir öfter in Gruppen arbeiten sollten, denn dabei lernen wir voneinander. Zum Beispiel hat mir Mats in der Gruppenarbeit gezeigt, wie man eine Tabelle anlegt.',
      fragen: [
        { frage: 'Welche Begründung hast du gehört?', optionen: [
          { text: 'Denn Gruppenarbeit ist leise.', ok: false },
          { text: 'Denn dabei lernen wir voneinander.', ok: true },
          { text: 'Denn dann muss man weniger tun.', ok: false }] },
        { frage: 'Was hat Mats gezeigt?', optionen: [
          { text: 'Wie man ein Bild malt.', ok: false },
          { text: 'Wie man eine Geschichte vorliest.', ok: false },
          { text: 'Wie man eine Tabelle anlegt.', ok: true }] },
      ] },
  );

  ZI.KETTEN.push(
    { meinung: 'Wir sollten einen Schulgarten anlegen,', haupt: '… weil wir dort viel über Pflanzen lernen.',
      stuetzen: [
        { text: 'Wir sehen, wie aus einem kleinen Samen eine große Pflanze wird.', ok: true },
        { text: 'Außerdem können wir das Gemüse später selbst essen.', ok: false, info: 'Das ist ein neues Argument und keine Stütze für das Lernen.' },
        { text: 'Die Gießkanne ist grün.', ok: false, info: 'Das stützt das Argument nicht.' },
        { text: 'Wir lernen, welche Pflanzen viel Wasser und Sonne brauchen.', ok: true }] },
    { meinung: 'Wir sollten keine Schuluniformen tragen,', haupt: '… weil jeder zeigen möchte, was ihm gefällt.',
      stuetzen: [
        { text: 'Meine Jacke hat eine Kapuze.', ok: false, info: 'Das stützt das Argument nicht.' },
        { text: 'Mit der eigenen Kleidung zeigt man, welche Farben man mag.', ok: true },
        { text: 'Manche zeigen mit einem T-Shirt ihrer Lieblingsband, wer sie sind.', ok: true },
        { text: 'Außerdem sind Uniformen teuer.', ok: false, info: 'Das ist ein neues Argument (Kosten) und keine Stütze.' }] },
  );

  ZI.TEIL_ERKENNEN.push(
    { satz: '„Ich finde, dass wir einen Klassenrat brauchen.“', teil: 'Meinung' },
    { satz: '„… weil wir dort Streit fair klären können.“', teil: 'Begründung' },
    { satz: '„Letzte Woche haben wir zum Beispiel einen Streit um den Fußball gelöst.“', teil: 'Beispiel' },
    { satz: '„Meiner Meinung nach sollte es mehr Bänke auf dem Schulhof geben.“', teil: 'Meinung' },
    { satz: '„… denn viele Kinder möchten sich in der Pause ausruhen.“', teil: 'Begründung' },
    { satz: '„Zum Beispiel sitzen viele Kinder in der Pause einfach auf dem Boden.“', teil: 'Beispiel' },
  );

  ZI.JA_UND.push(
    { vorher: 'Clara: „Wir sollten einen Waldausflug machen, weil wir dort viele Tiere sehen.“',
      antwort: 'Noah: „Ja, und wir könnten dort auch Blätter für ein Herbstplakat sammeln.“', art: 'Ja, und …' },
    { vorher: 'Clara: „Wir sollten einen Waldausflug machen, weil wir dort viele Tiere sehen.“',
      antwort: 'Paul: „Das klingt schön, aber im Herbst ist es im Wald oft sehr matschig.“', art: 'Ja, aber …' },
    { vorher: 'Clara: „Wir sollten einen Waldausflug machen, weil wir dort viele Tiere sehen.“',
      antwort: 'Merle: „Mein Lieblingstier ist übrigens der Delfin.“', art: 'Themenwechsel' },
    { vorher: 'Anton: „Wir sollten einen Kreativtag machen, weil jeder zeigen kann, was er kann.“',
      antwort: 'Sara: „Genau, und am Ende könnten wir eine Ausstellung für die Eltern machen.“', art: 'Ja, und …' },
  );

  ZI.ZUHOEREN.push(
    { vorher: 'Clara: „Wir sollten weniger Hausaufgaben bekommen, weil wir nachmittags auch Zeit für Hobbys brauchen.“',
      optionen: [
        { text: '„Du willst also gar nicht mehr lernen?“', ok: false, info: 'Das hat Clara nicht gesagt. Ihre Aussage wird verdreht.' },
        { text: '„Du sagst, dass wir Zeit für Hobbys brauchen. Welche Hobbys meinst du?“', ok: true, info: 'Genau! Wiederholen und nachfragen zeigt echtes Zuhören.' },
        { text: '„Ich habe gestern Klavier gespielt.“', ok: false, info: 'Das ist ein Themenwechsel.' }] },
    { vorher: 'Noah: „Ich möchte, dass wir in Musik mehr singen, weil Singen gute Laune macht.“',
      optionen: [
        { text: '„Du singst doch total schief!“', ok: false, info: 'Das ist ein Angriff auf Noah und kein Argument.' },
        { text: '„Du willst also nie mehr Instrumente spielen?“', ok: false, info: 'Das übertreibt, was Noah gesagt hat.' },
        { text: '„Du meinst, Singen macht gute Laune. Stimmt, aber manche singen nicht gern vor anderen.“', ok: true, info: 'Richtig! Erst anknüpfen, dann ein faires Gegenargument.' }] },
    { vorher: 'Lotta: „Wir sollten die Klassenregeln gemeinsam aufschreiben, weil sich dann alle besser daran halten.“',
      optionen: [
        { text: '„Du sagst, dass sich dann alle besser daran halten. Das ist eine gute Idee!“', ok: true, info: 'Genau! Du zeigst, dass du Lottas Grund verstanden hast.' },
        { text: '„Regeln sind sowieso doof.“', ok: false, info: 'Das geht nicht auf Lottas Grund ein.' },
        { text: '„Wann ist eigentlich Pause?“', ok: false, info: 'Das ist ein Themenwechsel.' }] },
    { vorher: 'Milan: „Die Pause sollte auch bei leichtem Regen draußen sein, weil frische Luft wach macht.“',
      optionen: [
        { text: '„Du willst also, dass wir bei Gewitter draußen sind?“', ok: false, info: 'Von Gewitter hat Milan nichts gesagt. Das übertreibt.' },
        { text: '„Du findest, frische Luft macht wach. Aber dann brauchen alle eine Regenjacke.“', ok: true, info: 'Richtig! Du knüpfst an und denkst mit.' },
        { text: '„Ich mag keinen Regen.“', ok: false, info: 'Das geht nicht auf Milans Grund ein.' }] },
  );

  ZI.INSELRAT.push(
    { meinung: 'Du möchtest: Die Ziegen sollen frei durchs Dorf laufen dürfen.',
      einwaende: [
        { wer: 'Grimbart', datei: 'zwerg-11-grimbart', einwand: '„Die Ziegen fressen doch unsere Blumen und das Gemüse!“',
          optionen: [
            { text: '„Das stimmt. Darum bauen wir einen Zaun um den Gemüsegarten und die Blumenbeete.“', ok: true, info: 'Stark! Ein konkreter Plan entkräftet den Einwand.' },
            { text: '„Blumen sind doch nicht wichtig.“', ok: false, info: 'Damit machst du Grimbart nur noch mehr Sorgen.' },
            { text: '„Doch, das machen die nicht!“', ok: false, info: 'Eine bloße Behauptung überzeugt nicht.' }] },
        { wer: 'Amara', datei: 'zwerg-10-amara', einwand: '„Manche Zwerge haben Angst vor Ziegen.“',
          optionen: [
            { text: '„Dann sollen die halt in ihrer Hütte bleiben.“', ok: false, info: 'Das schließt Zwerge aus – kein gutes Argument.' },
            { text: '„Das stimmt. Deshalb dürfen die Ziegen nicht auf den Ratsplatz, und wer möchte, kann einen anderen Weg nehmen.“', ok: true, info: 'Genau! Du nimmst die Sorge ernst und zeigst eine Lösung.' },
            { text: '„Angst vor Ziegen gibt es doch gar nicht.“', ok: false, info: 'Das nimmt die Gefühle anderer nicht ernst.' }] },
        { wer: 'Grimbart', datei: 'zwerg-11-grimbart', einwand: '„Und wer passt auf, dass die Ziegen nicht ins Meer laufen?“',
          optionen: [
            { text: '„Die passen schon auf sich selbst auf.“', ok: false, info: 'Das wird Grimbart nicht beruhigen.' },
            { text: '„Das ist doch egal.“', ok: false, info: 'So nimmst du den Einwand nicht ernst.' },
            { text: '„Jeden Tag hat ein anderer Stamm Ziegendienst und bringt die Ziegen abends in den Stall.“', ok: true, info: 'Super! Eine klare Antwort auf die Sorge.' }] },
      ] },
  );

  ZI.GEGENARGUMENTE.push(
    { argument: '„Wir sollten jeden Tag Sport haben, weil Bewegung gesund ist.“',
      optionen: [
        { text: '„Und außerdem macht Sport Spaß.“', ok: false, info: 'Das stützt die Meinung – es ist kein Gegenargument.' },
        { text: '„Aber dann bleibt weniger Zeit für andere Fächer wie Kunst oder Musik.“', ok: true, info: 'Genau! Ein Nachteil, den man bedenken muss.' },
        { text: '„Ich habe neue Turnschuhe.“', ok: false, info: 'Das hat mit der Frage nichts zu tun.' }] },
    { argument: '„Wir sollten einen Schulhund haben, weil er die Klasse beruhigt.“',
      optionen: [
        { text: '„Aber manche Kinder haben Angst vor Hunden.“', ok: true, info: 'Richtig! Ein Gegenargument, das man ernst nehmen muss.' },
        { text: '„Ja, und Hunde sind treu.“', ok: false, info: 'Das stützt die Meinung.' },
        { text: '„Du hast doch selbst keinen Hund!“', ok: false, info: 'Das ist ein Angriff auf die Person.' }] },
    { argument: '„In der Mensa sollte es jeden Tag Pizza geben, weil alle Pizza mögen.“',
      optionen: [
        { text: '„Pizza kommt aus Italien.“', ok: false, info: 'Das spricht weder dafür noch dagegen.' },
        { text: '„Und Pizza ist schnell gemacht.“', ok: false, info: 'Das stützt die Meinung.' },
        { text: '„Aber wer jeden Tag dasselbe isst, ernährt sich nicht gesund.“', ok: true, info: 'Stark! Ein sachliches Gegenargument.' }] },
    { argument: '„In der Pause sollten Handys erlaubt sein, weil man dann Fotos machen kann.“',
      optionen: [
        { text: '„Aber dann spielen viele nur noch am Handy und reden weniger miteinander.“', ok: true, info: 'Genau! Ein wichtiger Nachteil.' },
        { text: '„Und man kann Musik hören.“', ok: false, info: 'Das stützt die Meinung.' },
        { text: '„Mein Handy ist neu.“', ok: false, info: 'Das hat mit der Frage nichts zu tun.' }] },
  );

  ZI.SITUATIONEN.push(
    { situation: 'Du möchtest bei deinem Freund übernachten. Deine Mutter sorgt sich, dass du am nächsten Tag zu müde für dein Fußballspiel bist.',
      optionen: [
        { text: '„Alle anderen dürfen auch.“', ok: false, info: 'Das geht nicht auf ihre Sorge ein.' },
        { text: '„Wir gehen um neun Uhr schlafen, und sein Vater bringt mich morgens pünktlich zum Spiel.“', ok: true, info: 'Genau! Du beantwortest genau die Sorge deiner Mutter.' },
        { text: '„Ich bin nie müde.“', ok: false, info: 'Das wird deine Mutter kaum glauben.' }] },
    { situation: 'Ihr möchtet ein Aquarium für die Klasse. Eure Lehrerin fragt sich, wer sich in den Ferien um die Fische kümmert.',
      optionen: [
        { text: '„Fische sind so schön bunt.“', ok: false, info: 'Das beantwortet ihre Frage nicht.' },
        { text: '„Darüber denken wir später nach.“', ok: false, info: 'So bleibt die Sorge bestehen.' },
        { text: '„Es gibt Futterautomaten für die Ferien, und wir fragen den Hausmeister, ob er einmal pro Woche nachschaut.“', ok: true, info: 'Richtig! Ein Plan, der genau auf ihre Frage antwortet.' }] },
    { situation: 'Du möchtest abends länger aufbleiben. Dein Vater findet, dass du morgens oft schlecht aus dem Bett kommst.',
      optionen: [
        { text: '„Ich bleibe nur am Freitag und Samstag länger auf. Unter der Woche gehe ich pünktlich ins Bett.“', ok: true, info: 'Genau! So gehst du auf seine Sorge ein.' },
        { text: '„Andere Kinder dürfen bis Mitternacht aufbleiben.“', ok: false, info: 'Was andere dürfen, ist kein Grund für deinen Vater.' },
        { text: '„Ich bin doch schon groß.“', ok: false, info: 'Das beantwortet seine Sorge nicht.' }] },
  );

  /* =========================================================
     MEISTERIN HAMMERLIND MACHT ES VOR
     Lösungsbeispiel vor jeder Station im Hauptstollen.
     art: gut | schlecht | these | begruendung | beispiel | neutral
     ========================================================= */
  ZI.VORMACHEN = {
    k1s1: {
      titel: 'Stumpf oder scharf?',
      kopf: 'Ich finde, dass man Hausaufgaben machen sollte, …',
      schritte: [
        { sagt: 'Ich lese die erste Begründung: „… weil Hausaufgaben wichtig sind.“ Ich frage: Warum sind sie wichtig? Das steht da nicht. Die Begründung dreht sich im Kreis.',
          zeigt: { text: '… weil Hausaufgaben wichtig sind.', art: 'schlecht', marke: 'stumpf' } },
        { sagt: 'Jetzt die zweite: „… weil man den Stoff übt und ihn sich besser merkt.“ Die erklärt, WARUM. Die ist scharf!',
          zeigt: { text: '… weil man den Stoff übt und ihn sich besser merkt.', art: 'gut', marke: 'scharf' } },
        { sagt: 'Mein Trick: Ich frage bei jeder Begründung „Warum?“. Bekomme ich eine echte Antwort, ist sie scharf.' },
      ] },
    k1s2: {
      titel: 'Erz oder Schlacke?',
      kopf: 'Wir sollten einen Kreativtag machen, …',
      schritte: [
        { sagt: '„… weil man beim Basteln Kleber braucht.“ Das stimmt zwar. Aber ist das ein Grund für einen Kreativtag? Nein. Das ist Schlacke.',
          zeigt: { text: '… weil man beim Basteln Kleber braucht.', art: 'schlecht', marke: 'Schlacke' } },
        { sagt: '„… weil jeder zeigen kann, was er gut kann.“ Das passt zur Meinung und erklärt etwas. Das ist Erz!',
          zeigt: { text: '… weil jeder zeigen kann, was er gut kann.', art: 'gut', marke: 'Erz' } },
        { sagt: 'Ich frage mich immer: Hilft dieser Grund der Meinung wirklich weiter?' },
      ] },
    k1s3: {
      titel: 'Weil-Denn-Amboss',
      kopf: 'Ich ziehe mich warm an, …',
      schritte: [
        { sagt: 'Mit „weil“ wandert das gebeugte Verb ganz ans Ende: „weil es draußen schneit“.',
          zeigt: { text: '…, weil es draußen schneit.', art: 'gut', marke: 'Verb am Ende' } },
        { sagt: 'Mit „denn“ bleibt der Satz ganz normal. Das Verb steht an zweiter Stelle: „denn es schneit draußen“.',
          zeigt: { text: '…, denn es schneit draußen.', art: 'gut', marke: 'Verb an 2. Stelle' } },
        { sagt: 'Und vor weil, da und denn kommt immer ein Komma. Zum Schluss lese ich den Satz leise vor – klingt er richtig?' },
      ] },
    k2s1: {
      titel: 'Argument-Puzzle',
      kopf: 'Ich setze ein Argument aus drei Teilen zusammen.',
      schritte: [
        { sagt: 'Zuerst meine Meinung: Was finde ich?', zeigt: { text: 'Ich finde, dass wir einen Klassenrat brauchen,', art: 'these', marke: 'Meinung' } },
        { sagt: 'Dann suche ich die Begründung, die genau dazu passt.', zeigt: { text: '… weil wir dort Streit fair klären können.', art: 'begruendung', marke: 'Begründung' } },
        { sagt: 'Zum Schluss das Beispiel. Es zeigt die Begründung ganz genau.', zeigt: { text: 'Letzte Woche haben wir dort zum Beispiel einen Streit um den Ball gelöst.', art: 'beispiel', marke: 'Beispiel' } },
      ] },
    k2s2: {
      titel: 'Motor oder Bremse?',
      kopf: 'Im Klassenrat wird über einen Ausflug gesprochen.',
      schritte: [
        { sagt: '„Kannst du das noch einmal erklären?“ – Nachfragen hilft, dass wir uns verstehen. Das ist ein Motor.',
          zeigt: { text: '„Kannst du das noch einmal erklären?“', art: 'gut', marke: 'Motor' } },
        { sagt: '„Das ist doch Quatsch!“ – Das macht den anderen schlecht und hat keinen Grund. Das ist eine Bremse.',
          zeigt: { text: '„Das ist doch Quatsch!“', art: 'schlecht', marke: 'Bremse' } },
        { sagt: 'Ich frage mich bei jedem Satz: Bringt er unser Gespräch weiter?' },
      ] },
    k2s3: {
      titel: 'Hör-Stollen',
      kopf: 'So höre ich gut zu:',
      schritte: [
        { sagt: 'Hier arbeitest du mit einem Partner. Er liest vor, du hörst zu. Bei „Ich finde, dass …“ kommt die Meinung.', zeigt: { text: '„Ich finde, dass …“', art: 'these', marke: 'Meinung' } },
        { sagt: 'Bei „weil“ oder „denn“ spitze ich die Ohren. Jetzt kommt die Begründung.', zeigt: { text: '„… weil …“ oder „… denn …“', art: 'begruendung', marke: 'Begründung' } },
        { sagt: 'Bei „zum Beispiel“ kommt das Beispiel. Bin ich unsicher, bitte ich meinen Partner: „Lies es bitte noch einmal vor.“', zeigt: { text: '„Zum Beispiel …“', art: 'beispiel', marke: 'Beispiel' } },
      ] },
    k3s1: {
      titel: 'Ja, und – ja, aber?',
      kopf: 'Lea: „Wir sollten mehr Ausflüge machen, weil wir dabei viel erleben.“',
      schritte: [
        { sagt: 'Tom sagt: „Ja, und wir lernen dabei auch etwas.“ Er stimmt zu und ergänzt. Das ist „Ja, und“.',
          zeigt: { text: 'Tom: „Ja, und wir lernen dabei auch etwas.“', art: 'gut', marke: 'Ja, und' } },
        { sagt: 'Merle sagt: „Das stimmt, aber Ausflüge kosten Geld.“ Sie nimmt Lea ernst und widerspricht. Das ist „Ja, aber“.',
          zeigt: { text: 'Merle: „Das stimmt, aber Ausflüge kosten Geld.“', art: 'begruendung', marke: 'Ja, aber' } },
        { sagt: 'Und wer über etwas ganz anderes redet, wechselt das Thema.' },
      ] },
    k3s2: {
      titel: 'Wer hört zu?',
      kopf: 'Paul: „Ich möchte längere Pausen, weil ich mich danach besser konzentriere.“',
      schritte: [
        { sagt: 'Eine gute Antwort wiederholt zuerst, was Paul wirklich gesagt hat.',
          zeigt: { text: '„Du sagst, dass du dich danach besser konzentrierst …“', art: 'gut', marke: 'hört zu' } },
        { sagt: 'Vorsicht bei „Du willst also …“! Oft wird dann etwas verdreht. Paul hat nicht gesagt, dass er keinen Unterricht will.',
          zeigt: { text: '„Du willst also gar keinen Unterricht mehr?“', art: 'schlecht', marke: 'verdreht' } },
      ] },
    k3s3: {
      titel: 'Überzeug den Inselrat',
      kopf: 'Einwand: „Für eine Brücke brauchen wir viel zu viel Holz.“',
      schritte: [
        { sagt: 'Zuerst nehme ich den Einwand ernst und gebe zu, was stimmt.', zeigt: { text: '„Das stimmt, eine Brücke braucht viel Holz.“', art: 'neutral', marke: 'ernst nehmen' } },
        { sagt: 'Dann zeige ich eine Lösung.', zeigt: { text: '„Aber am Strand liegt genug Treibholz.“', art: 'gut', marke: 'Lösung' } },
        { sagt: 'So überzeuge ich, ohne unfreundlich zu werden.' },
      ] },
  };

  /* =========================================================
     ZWERGEN-WISSENSBUCH
     Jede geschaffte Station schaltet eine Seite frei.
     ========================================================= */
  ZI.WISSEN = [
    { k: 0, art: 'kern', i: 0, titel: 'Scharfe Begründungen',
      text: 'Eine scharfe Begründung erklärt, WARUM du etwas meinst. Eine stumpfe Begründung sagt nur dasselbe noch einmal, zum Beispiel „weil es gut ist“.',
      beispiel: 'Stumpf: … weil Sport wichtig ist.\nScharf: … weil Bewegung das Herz stärkt.' },
    { k: 0, art: 'kern', i: 1, titel: 'Passende Begründungen',
      text: 'Eine Begründung muss zur Meinung passen. Was zwar stimmt, aber nichts mit der Meinung zu tun hat, überzeugt niemanden.',
      beispiel: 'Schulhund? „… weil Hunde vier Beine haben“ passt nicht.' },
    { k: 0, art: 'kern', i: 2, titel: 'weil, da und denn',
      text: 'Nach weil und da steht das gebeugte Verb am Ende. Nach denn steht es an zweiter Stelle. Vor weil, da und denn steht ein Komma.',
      beispiel: '…, weil es kalt ist.\n…, denn es ist kalt.' },
    { k: 0, art: 'tief', i: 0, titel: 'Doppelt prüfen',
      text: 'Prüfe jeden Begründungssatz zweimal: Steht das Komma? Steht das Verb an der richtigen Stelle?',
      beispiel: 'Tom bleibt zu Hause, weil er Fieber hat.' },
    { k: 0, art: 'tief', i: 1, titel: 'Gute Beispiele',
      text: 'Ein gutes Beispiel passt genau zur Begründung, und man kann es sich gut vorstellen.',
      beispiel: '… weil wir Verantwortung lernen. Zum Beispiel füllt jeden Tag jemand den Wassernapf auf.' },
    { k: 0, art: 'tief', i: 2, titel: 'Laut argumentieren',
      text: 'Sprich in ganzen Sätzen. Schau dein Gegenüber an und sprich deutlich.',
      beispiel: '„Ich finde, dass …, weil …“' },
    { k: 1, art: 'kern', i: 0, titel: 'Meinung, Begründung, Beispiel',
      text: 'Ein vollständiges Argument hat drei Teile: Die Meinung sagt, was du denkst. Die Begründung sagt, warum. Das Beispiel zeigt es ganz genau.',
      beispiel: 'Ich finde, dass … (Meinung),\nweil … (Begründung).\nZum Beispiel … (Beispiel).' },
    { k: 1, art: 'kern', i: 1, titel: 'Gesprächsmotoren',
      text: 'Motoren bringen ein Gespräch weiter: begründen, nachfragen, anknüpfen, zusammenfassen, andere einbeziehen. Bremsen stoppen es: auslachen, dazwischenrufen, abschweifen.',
      beispiel: 'Motor: „Kannst du das genauer erklären?“\nBremse: „Das ist doch Quatsch!“' },
    { k: 1, art: 'kern', i: 2, titel: 'Gut zuhören',
      text: 'Signalwörter helfen beim Zuhören: Nach „weil“ oder „denn“ kommt die Begründung, nach „zum Beispiel“ kommt das Beispiel.',
      beispiel: '„…, weil wir dort lernen. Zum Beispiel …“' },
    { k: 1, art: 'tief', i: 0, titel: 'Teile erkennen',
      text: 'Achte auf die Signalwörter: „Ich finde, dass“ für die Meinung, „weil“ oder „denn“ für die Begründung, „zum Beispiel“ für das Beispiel.',
      beispiel: '„Ich bin der Meinung, dass …“ und „Ich bin dafür, dass …“ leiten auch eine Meinung ein.' },
    { k: 1, art: 'tief', i: 1, titel: 'Reihe und Kette',
      text: 'Stützen bauen auf einem Argument auf und erklären es genauer (Kette). Mit „außerdem“ beginnt meist ein neues Argument (Reihe).',
      beispiel: '… weil Bewegung gesund ist. Das Herz wird kräftiger.' },
    { k: 1, art: 'tief', i: 2, titel: 'Das ganze Argument',
      text: 'Wer Meinung, Begründung und Beispiel sagt, überzeugt am meisten.',
      beispiel: '„Ich finde, dass …, weil … Zum Beispiel …“' },
    { k: 2, art: 'kern', i: 0, titel: 'Ja, und – ja, aber',
      text: 'Mit „Ja, und …“ stimmst du zu und ergänzt. Mit „Ja, aber …“ nimmst du den anderen ernst und widersprichst. Beides bringt ein Gespräch weiter.',
      beispiel: '„Ja, und außerdem …“\n„Das stimmt, aber …“' },
    { k: 2, art: 'kern', i: 1, titel: 'Anknüpfen',
      text: 'Zeig, dass du zugehört hast: Wiederhole, was der andere gesagt hat, bevor du antwortest. Verdrehe nichts und übertreibe nicht.',
      beispiel: '„Du sagst, dass … Dazu denke ich, dass …“' },
    { k: 2, art: 'kern', i: 2, titel: 'Einwände entkräften',
      text: 'Nimm einen Einwand ernst. Gib zu, was stimmt, und zeig dann eine Lösung oder ein Beispiel.',
      beispiel: '„Das stimmt, aber wenn wir …, dann …“' },
    { k: 2, art: 'tief', i: 0, titel: 'Gegenargumente',
      text: 'Ein Gegenargument spricht gegen eine Meinung. Wer die Gegenargumente kennt, kann besser antworten – und seine eigene Meinung prüfen.',
      beispiel: '„Aber manche Kinder sind allergisch.“' },
    { k: 2, art: 'tief', i: 1, titel: 'Wer überzeugt wen?',
      text: 'Überlege, was deinem Gegenüber wichtig ist. Das beste Argument geht genau auf diese Sorge ein.',
      beispiel: 'Papa sorgt sich ums Gassigehen → „Ich gehe jeden Tag mit dem Hund raus.“' },
    { k: 2, art: 'tief', i: 2, titel: 'Das Streitgespräch',
      text: 'Erst zuhören, dann wiederholen, dann widersprechen. Und immer freundlich bleiben.',
      beispiel: '„Du sagst, dass … Aber ich finde, dass …, weil …“' },
  ];
})();
