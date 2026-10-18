/* Zwergeninsel – Gebäude-Übungen
   Jedes Gebäude, über das der Zwergenrat abstimmt, schaltet in der Schmiede eine Übung frei.
   Der Rat entscheidet, was ZUERST gebaut wird – also welche Übung die Klasse zuerst bekommt.
   bit: Stelle im Zwergenpass (0–9). Bilder: die Gebäude selbst. */

(function () {
  const ZI = window.ZI;

  ZI.BAU_UEBUNGEN = [
    /* ---------------- Kapitel 1 ---------------- */
    {
      id: 'werkstatt', bit: 0, kapitel: 0, name: 'Begründungen nachschärfen',
      schwerpunkt: 'Stumpfe Begründungen scharf machen',
      typ: 'auswahl', frage: 'Welche Verbesserung macht die Begründung scharf?',
      start: 'In der Werkstatt schleifen wir stumpfe Begründungen nach. Such die Verbesserung, die wirklich erklärt, WARUM.',
      tipp: 'Frag bei jeder Verbesserung: Erklärt sie jetzt, WARUM? Wörter wie „toll“, „gut“ oder „wichtig“ allein bleiben stumpf.',
      items: [
        { kopf: '„Wir sollten mehr Ausflüge machen, weil Ausflüge toll sind.“', optionen: [
          { text: '… weil wir dabei Dinge selbst sehen, die wir sonst nur aus Büchern kennen.', ok: true, info: 'Jetzt erklärt die Begründung, WAS an Ausflügen gut ist.' },
          { text: '… weil Ausflüge sehr, sehr toll sind.', ok: false, info: '„Sehr, sehr toll“ ist immer noch stumpf – das Warum fehlt.' },
          { text: '… weil ich Ausflüge mag.', ok: false, info: 'Das ist nur dein Gefühl, keine Erklärung.' }] },
        { kopf: '„Man sollte beim Radfahren einen Helm tragen, weil Helme wichtig sind.“', optionen: [
          { text: '… weil Helme eben wichtig sind.', ok: false, info: 'Das dreht sich im Kreis.' },
          { text: '… weil ein Helm den Kopf bei einem Sturz schützt.', ok: true, info: 'Genau! Jetzt weiß man, wofür der Helm gut ist.' },
          { text: '… weil viele Kinder einen Helm haben.', ok: false, info: 'Dass viele einen haben, erklärt nicht, wofür er gut ist.' }] },
        { kopf: '„Wir brauchen eine Klassenbücherei, weil Bücher gut sind.“', optionen: [
          { text: '… weil es in der Stadtbücherei auch viele Bücher gibt.', ok: false, info: 'Das erklärt nicht, warum WIR eine Klassenbücherei brauchen.' },
          { text: '… weil Bücher richtig gut sind.', ok: false, info: 'Immer noch stumpf: Wofür sind Bücher gut?' },
          { text: '… weil dann jeder in der Pause etwas Spannendes zum Lesen findet.', ok: true, info: 'Stark! Du nennst, was die Bücherei bringt.' }] },
        { kopf: '„Man sollte genug Wasser trinken, weil das gesund ist.“', optionen: [
          { text: '… weil der Kopf mit genug Wasser besser denken kann.', ok: true, info: 'Richtig! Jetzt steht da, was Wasser im Körper bewirkt.' },
          { text: '… weil Wasser gesund ist.', ok: false, info: 'Das sagt dasselbe noch einmal.' },
          { text: '… weil Wasser keine Kalorien hat.', ok: false, info: 'Das stimmt, erklärt aber nicht, wofür der Körper Wasser braucht.' }] },
        { kopf: '„Wir sollten Müll trennen, weil das besser ist.“', optionen: [
          { text: '… weil es dafür bunte Tonnen gibt.', ok: false, info: 'Die Tonnen gibt es – aber warum ist Trennen sinnvoll?' },
          { text: '… weil aus altem Papier und Glas neue Dinge gemacht werden können.', ok: true, info: 'Genau! Du erklärst, was Mülltrennen bringt.' },
          { text: '… weil Trennen besser ist.', ok: false, info: '„Besser“ – aber warum? Das fehlt noch.' }] },
        { kopf: '„Haustiere sind gut für Kinder, weil Tiere toll sind.“', optionen: [
          { text: '… weil viele Familien ein Haustier haben.', ok: false, info: 'Dass es viele haben, erklärt nicht, warum es für Kinder gut ist.' },
          { text: '… weil Haustiere total toll sind.', ok: false, info: 'Immer noch stumpf.' },
          { text: '… weil Kinder lernen, sich jeden Tag um ein Lebewesen zu kümmern.', ok: true, info: 'Stark! Jetzt ist die Begründung scharf.' }] },
        { kopf: '„Kinder sollten abends früh schlafen gehen, weil Schlaf wichtig ist.“', optionen: [
          { text: '… weil man ausgeschlafen in der Schule besser aufpassen kann.', ok: true, info: 'Richtig! Du erklärst, wozu Schlaf gut ist.' },
          { text: '… weil Kinder abends oft müde sind.', ok: false, info: 'Müde sein ist kein Grund – wofür ist der Schlaf gut?' },
          { text: '… weil Schlafen wichtig ist.', ok: false, info: 'Das dreht sich im Kreis.' }] },
      ],
      wissen: { titel: 'Nachschärfen', text: 'Eine stumpfe Begründung kannst du schärfen: Frag „Warum?“ und schreib die Antwort hinein.', beispiel: 'Stumpf: … weil Helme wichtig sind.\nScharf: … weil ein Helm den Kopf schützt.' },
    },
    {
      id: 'huette3', bit: 1, kapitel: 0, name: 'Meinung oder Tatsache?',
      schwerpunkt: 'Meinungen von Tatsachen unterscheiden',
      typ: 'sortier', frage: 'Ist das eine Meinung oder eine Tatsache?', jaText: 'Meinung', neinText: 'Tatsache',
      start: 'In der Hügelhütte sortieren wir: Was ist eine Meinung, und was kann man nachprüfen?',
      tipp: 'Eine Tatsache kann man nachprüfen: messen, zählen, nachlesen. Eine Meinung zeigt, was jemand gut oder schlecht findet. Achte auf Wörter wie „schönste“, „beste“ oder „sollte“.',
      falschJa: 'Kann man das nicht nachprüfen? Dann ist es eine Tatsache.',
      falschNein: 'Findet das vielleicht nur jemand so? Dann ist es eine Meinung.',
      rundeFertig: 'Alles sortiert! Tatsachen eignen sich gut als Beispiele für deine Begründung.',
      runden: [
        { kopf: 'Thema: Haustiere', karten: [
          { text: 'Hunde sind die besten Haustiere.', ja: true, info: 'Meinung – andere finden Katzen besser.' },
          { text: 'Hunde stammen vom Wolf ab.', ja: false, info: 'Tatsache – das kann man nachlesen.' },
          { text: 'Katzen schlafen viele Stunden am Tag.', ja: false, info: 'Tatsache – das kann man beobachten.' },
          { text: 'Ein Hamster ist das schönste Tier.', ja: true, info: 'Meinung – „das schönste“ findet jeder anders.' },
          { text: 'Fische atmen mit Kiemen.', ja: false, info: 'Tatsache – das kann man nachprüfen.' },
          { text: 'Jede Familie sollte ein Haustier haben.', ja: true, info: 'Meinung – mit „sollte“ sagt jemand, was er gut findet.' }] },
        { kopf: 'Thema: Schule', karten: [
          { text: 'Mathe ist das spannendste Fach.', ja: true, info: 'Meinung – das sieht nicht jeder so.' },
          { text: 'Eine Woche hat fünf Schultage.', ja: false, info: 'Tatsache – das kann man zählen.' },
          { text: 'Die Pause sollte länger sein.', ja: true, info: 'Meinung – ein Wunsch, kein Fakt.' },
          { text: 'In unserer Klasse sind 27 Kinder.', ja: false, info: 'Tatsache – das kann man zählen.' },
          { text: 'Hausaufgaben sind unnötig.', ja: true, info: 'Meinung – darüber kann man streiten.' },
          { text: 'Im Sommer gibt es sechs Wochen Ferien.', ja: false, info: 'Tatsache – das steht im Ferienkalender.' }] },
        { kopf: 'Thema: Natur', karten: [
          { text: 'Bäume geben Sauerstoff ab.', ja: false, info: 'Tatsache – das haben Forscher nachgewiesen.' },
          { text: 'Der Herbst ist die schönste Jahreszeit.', ja: true, info: 'Meinung – manche lieben den Sommer.' },
          { text: 'Wasser gefriert bei 0 Grad Celsius.', ja: false, info: 'Tatsache – das kann man messen.' },
          { text: 'Wir sollten mehr Bäume pflanzen.', ja: true, info: 'Meinung – ein Vorschlag, über den man reden kann.' },
          { text: 'Regenwetter ist langweilig.', ja: true, info: 'Meinung – manche springen gern in Pfützen.' },
          { text: 'Die Sonne geht im Osten auf.', ja: false, info: 'Tatsache – das kann man beobachten.' }] },
      ],
      wissen: { titel: 'Meinung oder Tatsache', text: 'Eine Meinung sagt, was jemand gut oder schlecht findet. Eine Tatsache kann man nachprüfen. Tatsachen machen deine Begründung stark.', beispiel: 'Meinung: Hunde sind die besten Tiere.\nTatsache: Hunde stammen vom Wolf ab.' },
    },
    {
      id: 'huette2', bit: 2, kapitel: 0, name: 'Weil, denn oder deshalb?',
      schwerpunkt: 'Grund und Folge richtig verknüpfen',
      typ: 'auswahl', frage: 'Welches Wort passt in die Lücke?', fest: true,
      start: 'In der Ziegelhütte verbinden wir Sätze wie Ziegel: „weil“ und „denn“ nennen den Grund, „deshalb“ nennt die Folge.',
      tipp: '„Weil“ und „denn“ nennen den GRUND. „Deshalb“ nennt die FOLGE. Nach „weil“ steht das Verb am Ende, nach „denn“ kommt ein normaler Satz, nach „deshalb“ kommt sofort das Verb.',
      items: [
        { kopf: 'Es regnet, ___ nehme ich einen Schirm mit.', optionen: [
          { text: 'weil', ok: false, info: 'Nach „weil“ müsste das Verb am Ende stehen: „weil ich … mitnehme“.' },
          { text: 'denn', ok: false, info: 'Nach „denn“ kommt ein normaler Satz: „denn ich nehme …“. Hier steht das Verb aber direkt danach.' },
          { text: 'deshalb', ok: true, info: 'Richtig! Der Schirm ist die FOLGE des Regens: „deshalb nehme ich …“.' }] },
        { kopf: 'Ich nehme einen Schirm mit, ___ es regnet.', optionen: [
          { text: 'weil', ok: true, info: 'Genau! Der Regen ist der GRUND, und das Verb steht am Ende.' },
          { text: 'denn', ok: false, info: 'Nach „denn“ hieße es: „denn es regnet“. Hier steht das Verb am Ende – das passt zu „weil“.' },
          { text: 'deshalb', ok: false, info: '„Deshalb“ nennt eine Folge. Der Regen ist aber der Grund.' }] },
        { kopf: 'Ich bin müde, ___ gehe ich früh ins Bett.', optionen: [
          { text: 'deshalb', ok: true, info: 'Richtig! Früh ins Bett ist die Folge der Müdigkeit.' },
          { text: 'weil', ok: false, info: '„Weil gehe ich“ – nach „weil“ gehört das Verb ans Ende.' },
          { text: 'denn', ok: false, info: '„Denn gehe ich“ – nach „denn“ kommt erst „ich“, dann das Verb.' }] },
        { kopf: 'Ich gehe früh ins Bett, ___ ich müde bin.', optionen: [
          { text: 'deshalb', ok: false, info: 'Die Müdigkeit ist der Grund, nicht die Folge.' },
          { text: 'weil', ok: true, info: 'Genau! Grund mit „weil“, Verb am Ende.' },
          { text: 'denn', ok: false, info: 'Mit „denn“ hieße es: „denn ich bin müde“.' }] },
        { kopf: 'Ich trage eine Jacke, ___ es ist kalt.', optionen: [
          { text: 'weil', ok: false, info: 'Mit „weil“ hieße es: „weil es kalt ist“.' },
          { text: 'denn', ok: true, info: 'Richtig! Nach „denn“ kommt ein ganz normaler Satz.' },
          { text: 'deshalb', ok: false, info: 'Die Kälte ist der Grund, nicht die Folge.' }] },
        { kopf: 'Der Bus ist ausgefallen, ___ komme ich zu spät.', optionen: [
          { text: 'denn', ok: false, info: '„Denn komme ich“ passt nicht – und zu spät kommen ist die Folge.' },
          { text: 'weil', ok: false, info: '„Weil komme ich“ – nach „weil“ gehört das Verb ans Ende.' },
          { text: 'deshalb', ok: true, info: 'Genau! Zu spät kommen ist die Folge.' }] },
        { kopf: 'Wir üben für den Test, ___ wir eine gute Note schreiben wollen.', optionen: [
          { text: 'weil', ok: true, info: 'Richtig! Grund mit „weil“, und „wollen“ steht am Ende.' },
          { text: 'deshalb', ok: false, info: 'Die gute Note ist hier der Grund fürs Üben.' },
          { text: 'denn', ok: false, info: 'Mit „denn“ hieße es: „denn wir wollen …“.' }] },
      ],
      wissen: { titel: 'Grund und Folge', text: '„Weil“ und „denn“ nennen den Grund. „Deshalb“ nennt die Folge. Nach „deshalb“ kommt sofort das Verb.', beispiel: 'Ich nehme einen Schirm mit, weil es regnet.\nEs regnet, deshalb nehme ich einen Schirm mit.' },
    },
    {
      id: 'steg', bit: 3, kapitel: 0, name: 'Der Schlusssatz',
      schwerpunkt: 'Ein Argument mit einem Schlusssatz abrunden',
      typ: 'auswahl', frage: 'Welcher Schlusssatz rundet das Argument ab?',
      start: 'Am Steg legt jedes Argument sicher an: mit einem guten Schlusssatz. Er sagt die Meinung noch einmal kurz.',
      tipp: 'Ein guter Schlusssatz wiederholt die Meinung kurz – oft mit „Deshalb …“ oder „Darum …“. Er darf der Meinung nicht widersprechen.',
      items: [
        { kopf: 'Ich finde, dass wir einen Schulgarten anlegen sollten, weil wir dort lernen, wie Pflanzen wachsen. Zum Beispiel könnten wir Tomaten ziehen.', optionen: [
          { text: 'Deshalb bin ich für einen Schulgarten.', ok: true, info: 'Genau! Der Schluss sagt die Meinung noch einmal.' },
          { text: 'Deshalb sollten wir mehr Sport machen.', ok: false, info: 'Das passt nicht zum Thema.' },
          { text: 'Deshalb sollten wir Tomaten pflanzen.', ok: false, info: 'Das greift nur das Beispiel auf – die Meinung war: ein ganzer Schulgarten.' }] },
        { kopf: 'Ich finde, dass es einen Kreativtag geben sollte, weil jeder zeigen kann, was er gut kann. Zum Beispiel könnte jemand ein Lied vorspielen.', optionen: [
          { text: 'Deshalb bin ich gegen einen Kreativtag.', ok: false, info: 'Der Schluss widerspricht der eigenen Meinung.' },
          { text: 'Darum wünsche ich mir einen Kreativtag an unserer Schule.', ok: true, info: 'Richtig! Klar und passend.' },
          { text: 'Deshalb sollte jemand ein Lied vorspielen.', ok: false, info: 'Das ist nur das Beispiel – nicht die Meinung.' }] },
        { kopf: 'Ich finde, dass die Pause länger sein sollte, weil wir uns dann besser erholen. Zum Beispiel könnte ich nach dem Fangenspielen noch in Ruhe frühstücken.', optionen: [
          { text: 'Deshalb sollten wir in der Pause Fangen spielen.', ok: false, info: 'Das ist nur das Beispiel – die Meinung war: eine längere Pause.' },
          { text: 'Deshalb sollte es gar keine Pause geben.', ok: false, info: 'Das widerspricht der Meinung.' },
          { text: 'Deshalb sollte die Pause länger sein.', ok: true, info: 'Genau! So weiß jeder am Ende, was du willst.' }] },
        { kopf: 'Ich finde, dass wir eine Leseecke einrichten sollten, weil man sich dort in Ruhe zurückziehen kann. Zum Beispiel könnte man dort lesen, wenn es draußen regnet.', optionen: [
          { text: 'Deshalb wünsche ich mir eine Leseecke in unserer Klasse.', ok: true, info: 'Richtig! Der Schluss passt genau.' },
          { text: 'Deshalb sollten wir lesen, wenn es regnet.', ok: false, info: 'Das greift nur das Beispiel auf – die Meinung war: eine Leseecke.' },
          { text: 'Deshalb sollten wir weniger lesen.', ok: false, info: 'Das widerspricht der Meinung.' }] },
        { kopf: 'Ich finde, dass Kinder im Haushalt helfen sollten, weil sie dabei selbstständig werden. Zum Beispiel lerne ich beim Kochen, wie man Nudeln zubereitet.', optionen: [
          { text: 'Deshalb sollten Kinder Nudeln kochen lernen.', ok: false, info: 'Das ist nur das Beispiel – die Meinung war: im Haushalt helfen.' },
          { text: 'Darum finde ich: Kinder sollten im Haushalt mithelfen.', ok: true, info: 'Genau! Die Meinung wird noch einmal klar.' },
          { text: 'Deshalb sollten nur Erwachsene kochen.', ok: false, info: 'Das widerspricht der Meinung.' }] },
        { kopf: 'Ich finde, dass wir einen Waldausflug machen sollten, weil wir dort viel über Tiere lernen. Zum Beispiel könnten wir Spuren suchen.', optionen: [
          { text: 'Deshalb bin ich für einen Waldausflug.', ok: true, info: 'Richtig! Kurz und klar.' },
          { text: 'Deshalb sollten wir Spuren suchen.', ok: false, info: 'Das ist nur das Beispiel – die Meinung war: ein Waldausflug.' },
          { text: 'Deshalb bleiben wir lieber in der Klasse.', ok: false, info: 'Das widerspricht der Meinung.' }] },
      ],
      wissen: { titel: 'Der Schlusssatz', text: 'Am Ende sagst du deine Meinung noch einmal kurz. So weiß jeder, was du willst.', beispiel: '„Deshalb bin ich für einen Schulgarten.“' },
    },

    /* ---------------- Kapitel 2 ---------------- */
    {
      id: 'bibliothek', bit: 4, kapitel: 1, name: 'Starke Beispiele',
      schwerpunkt: 'Genaue statt übertriebene Beispiele wählen',
      typ: 'auswahl', frage: 'Welches Beispiel überzeugt am meisten?',
      start: 'In der Bibliothek sammeln wir die besten Beispiele. Ein starkes Beispiel ist genau – und stimmt wirklich.',
      tipp: 'Ein starkes Beispiel ist genau: Wer? Wo? Was ist passiert? Vorsicht bei „Das weiß doch jeder“ und bei Übertreibungen wie „alle“, „immer“ oder „nie“.',
      items: [
        { kopf: 'Wir sollten in der Pause Obst essen, weil Obst uns Kraft gibt.', optionen: [
          { text: 'Das weiß doch jeder.', ok: false, info: 'Damit zeigst du nichts – das ist gar kein Beispiel.' },
          { text: 'Nach einem Apfel in der Pause bin ich in der nächsten Stunde viel wacher.', ok: true, info: 'Genau! Ein echtes, genaues Erlebnis.' },
          { text: 'Alle Sportler der Welt essen nur Obst.', ok: false, info: 'Übertrieben – und das stimmt nicht.' }] },
        { kopf: 'Fahrradhelme sind wichtig, weil sie den Kopf schützen.', optionen: [
          { text: 'Ohne Helm passiert jedem jeden Tag ein Unfall.', ok: false, info: 'Übertrieben – das glaubt niemand.' },
          { text: 'Helme sind halt wichtig.', ok: false, info: 'Das ist kein Beispiel.' },
          { text: 'Mein Bruder ist gestürzt. Sein Helm hatte danach einen Riss, aber sein Kopf war unverletzt.', ok: true, info: 'Stark! Man kann sich genau vorstellen, was passiert ist.' }] },
        { kopf: 'Wir sollten weniger Plastik benutzen, weil Plastik im Meer Tiere gefährdet.', optionen: [
          { text: 'Bei unserer Strandsammelaktion haben wir viele kleine Plastikteile gefunden, die Möwen verschlucken könnten.', ok: true, info: 'Richtig! Genau und selbst erlebt.' },
          { text: 'Plastik ist einfach schlimm.', ok: false, info: 'Eine Meinung, aber kein Beispiel.' },
          { text: 'Alle Fische im Meer sind schon voller Plastik.', ok: false, info: 'Übertrieben – das stimmt so nicht.' }] },
        { kopf: 'Klassendienste sind sinnvoll, weil dann alle mithelfen.', optionen: [
          { text: 'Ohne Dienste würde unsere Schule zusammenbrechen.', ok: false, info: 'Stark übertrieben.' },
          { text: 'Seit wir einen Tafeldienst haben, ist die Tafel jeden Morgen sauber.', ok: true, info: 'Genau! Ein Beispiel, das man nachprüfen kann.' },
          { text: 'Dienste sind gut, das sagt man doch so.', ok: false, info: 'Das ist kein Beispiel.' }] },
        { kopf: 'Wir sollten draußen Sport machen, weil frische Luft wach macht.', optionen: [
          { text: 'Frische Luft ist toll.', ok: false, info: 'Das ist kein Beispiel.' },
          { text: 'Wer draußen Sport macht, wird nie wieder müde.', ok: false, info: '„Nie wieder“ ist übertrieben.' },
          { text: 'Nach Sport auf dem Sportplatz waren wir in der nächsten Stunde viel munterer als nach Sport in der Halle.', ok: true, info: 'Richtig! Genau beobachtet.' }] },
        { kopf: 'Wir brauchen eine Leseecke, weil wir dann mehr lesen.', optionen: [
          { text: 'In der Nachbarklasse gibt es eine Leseecke. Dort leihen sich die Kinder jede Woche Bücher aus.', ok: true, info: 'Genau! Ein Beispiel, das man überprüfen kann.' },
          { text: 'Dann lesen alle Kinder jeden Tag zehn Bücher.', ok: false, info: 'Übertrieben – das glaubt keiner.' },
          { text: 'Leseecken sind einfach super.', ok: false, info: 'Das ist nur eine Meinung.' }] },
      ],
      wissen: { titel: 'Starke Beispiele', text: 'Ein starkes Beispiel ist genau und stimmt wirklich. Übertreibungen wie „alle“, „immer“ oder „nie“ machen dein Argument schwächer.', beispiel: 'Schwach: Alle Fische sind voller Plastik.\nStark: Bei der Strandsammelaktion fanden wir viel Plastik.' },
    },
    {
      id: 'ratsplatz', bit: 5, kapitel: 1, name: 'Der Redeplatz',
      schwerpunkt: 'Gesprächsregeln im Klassenrat anwenden',
      typ: 'auswahl', frage: 'Was ist die beste Reaktion?',
      start: 'Auf dem Ratsplatz üben wir, wie ein gutes Gespräch klappt: ausreden lassen, nachfragen, alle einbeziehen.',
      tipp: 'Gute Gesprächsregeln: andere ausreden lassen, melden, nachfragen, begründen, freundlich bleiben – und andere einbeziehen.',
      items: [
        { kopf: 'Im Klassenrat redet Paul gerade. Dir fällt eine tolle Idee ein.', optionen: [
          { text: 'Ich rufe meine Idee schnell dazwischen.', ok: false, info: 'Dazwischenrufen unterbricht Paul.' },
          { text: 'Ich melde mich und warte, bis Paul fertig ist.', ok: true, info: 'Genau! So kommen alle zu Wort.' },
          { text: 'Ich flüstere sie meiner Nachbarin zu.', ok: false, info: 'Nebengespräche lenken alle ab.' }] },
        { kopf: 'Clara sagt etwas, das du nicht verstanden hast.', optionen: [
          { text: '„Clara, kannst du das noch einmal erklären?“', ok: true, info: 'Richtig! Nachfragen bringt das Gespräch weiter.' },
          { text: '„Das versteht doch keiner!“', ok: false, info: 'Das macht Clara schlecht.' },
          { text: 'Ich sage nichts und denke an etwas anderes.', ok: false, info: 'So verpasst du das Gespräch.' }] },
        { kopf: 'Du bist anderer Meinung als Karim.', optionen: [
          { text: 'Ich verdrehe die Augen.', ok: false, info: 'Das ist unfreundlich und erklärt nichts.' },
          { text: '„Karim, das ist voll dumm.“', ok: false, info: 'Ein Angriff, kein Argument.' },
          { text: '„Karim, ich sehe das anders, weil …“', ok: true, info: 'Genau! Widersprechen mit Begründung.' }] },
        { kopf: 'Sara hat in der ganzen Diskussion noch nichts gesagt.', optionen: [
          { text: '„Sara, was denkst du darüber?“', ok: true, info: 'Super! Du beziehst Sara ein.' },
          { text: '„Sara sagt eh nie was.“', ok: false, info: 'Das ist verletzend.' },
          { text: 'Ich rede einfach weiter, dann geht es schneller.', ok: false, info: 'So kommen nicht alle zu Wort.' }] },
        { kopf: 'Es gibt zwei Vorschläge, und alle reden durcheinander.', optionen: [
          { text: 'Ich rede einfach lauter als die anderen.', ok: false, info: 'Dann wird es nur noch lauter.' },
          { text: '„Ich fasse mal zusammen: Es gibt zwei Vorschläge …“', ok: true, info: 'Richtig! Zusammenfassen schafft Ordnung.' },
          { text: '„Mir doch egal.“', ok: false, info: 'Damit stoppst du das Gespräch.' }] },
        { kopf: 'Jemand lacht über Noahs Beitrag.', optionen: [
          { text: 'Ich lache mit.', ok: false, info: 'Auslachen ist eine Gesprächsbremse.' },
          { text: '„Noah, sag lieber nichts mehr.“', ok: false, info: 'Das schließt Noah aus.' },
          { text: '„Lasst Noah bitte ausreden. Ich will seine Gründe hören.“', ok: true, info: 'Stark! Du hältst die Regeln ein und stärkst Noah.' }] },
      ],
      wissen: { titel: 'Gesprächsregeln', text: 'Ein gutes Gespräch braucht Regeln: ausreden lassen, melden, nachfragen, begründen und alle einbeziehen.', beispiel: '„Svea, was denkst du darüber?“' },
    },
    {
      id: 'brunnen', bit: 6, kapitel: 1, name: 'Satzanfänge aus dem Brunnen',
      schwerpunkt: 'Den passenden Satzanfang für jede Situation finden',
      typ: 'auswahl', frage: 'Welcher Satzanfang passt?',
      start: 'Aus dem Wunschbrunnen schöpfen wir Satzanfänge. Für jede Situation im Gespräch gibt es den passenden.',
      tipp: 'Meinung: „Ich finde, dass …, weil …“. Zuhören: „Du sagst, dass …“. Zustimmen: „Ja, und außerdem …“. Widersprechen: „Das stimmt zwar, aber …“.',
      items: [
        { kopf: 'Du willst deine Meinung sagen und begründen.', optionen: [
          { text: 'Ja, aber …', ok: false, info: 'Damit widersprichst du jemandem.' },
          { text: 'Ich finde, dass …, weil …', ok: true, info: 'Genau! Meinung plus Begründung.' },
          { text: 'Du sagst, dass …', ok: false, info: 'Damit wiederholst du, was jemand anderes gesagt hat.' }] },
        { kopf: 'Du willst zeigen, dass du gut zugehört hast.', optionen: [
          { text: 'Du sagst, dass …', ok: true, info: 'Richtig! So knüpfst du an.' },
          { text: 'Außerdem …', ok: false, info: 'Damit ergänzt du einen Grund.' },
          { text: 'Ich finde, dass …', ok: false, info: 'Damit sagst du deine eigene Meinung.' }] },
        { kopf: 'Du stimmst zu und willst noch einen Grund ergänzen.', optionen: [
          { text: 'Ich sehe das anders, …', ok: false, info: 'Damit widersprichst du.' },
          { text: 'Ja, aber …', ok: false, info: 'Damit bringst du ein Gegenargument.' },
          { text: 'Ja, und außerdem …', ok: true, info: 'Genau! Zustimmen und ergänzen.' }] },
        { kopf: 'Du nimmst den anderen ernst, bist aber anderer Meinung.', optionen: [
          { text: 'Das stimmt zwar, aber …', ok: true, info: 'Richtig! Erst anerkennen, dann widersprechen.' },
          { text: 'Ja, und außerdem …', ok: false, info: 'Damit stimmst du zu.' },
          { text: 'Genau, …', ok: false, info: 'Damit stimmst du zu.' }] },
        { kopf: 'Du willst ein Beispiel nennen.', optionen: [
          { text: 'Deshalb …', ok: false, info: '„Deshalb“ leitet eine Folge oder den Schluss ein.' },
          { text: 'Zum Beispiel …', ok: true, info: 'Genau!' },
          { text: 'Aber …', ok: false, info: '„Aber“ leitet einen Widerspruch ein.' }] },
        { kopf: 'Du willst am Ende alles zusammenfassen.', optionen: [
          { text: 'Zum Beispiel …', ok: false, info: 'Das passt zu einem Beispiel.' },
          { text: 'Ja, aber …', ok: false, info: 'Damit widersprichst du.' },
          { text: 'Insgesamt finde ich deshalb, dass …', ok: true, info: 'Richtig! So rundest du ab.' }] },
        { kopf: 'Du hast etwas nicht verstanden.', optionen: [
          { text: 'Kannst du genauer erklären, was du mit … meinst?', ok: true, info: 'Genau! Nachfragen ist ein Gesprächsmotor.' },
          { text: 'Das stimmt nicht!', ok: false, info: 'Du hast es doch noch gar nicht verstanden.' },
          { text: 'Außerdem …', ok: false, info: 'Damit ergänzt du etwas.' }] },
      ],
      wissen: { titel: 'Satzanfänge', text: 'Für jede Situation im Gespräch gibt es einen passenden Satzanfang. Er zeigt den anderen, was du vorhast.', beispiel: 'Zustimmen: „Ja, und außerdem …“\nWidersprechen: „Das stimmt zwar, aber …“' },
    },
    {
      id: 'muehle', bit: 7, kapitel: 1, name: 'Die Argument-Mühle',
      schwerpunkt: 'Starke und schwache Argumente abwägen',
      typ: 'auswahl', frage: 'Welches Argument ist am stärksten?',
      start: 'Die Mühle mahlt die Argumente: Übrig bleibt das stärkste. Alle drei passen zur Meinung – aber eines wiegt am meisten.',
      tipp: 'Ein starkes Argument ist wichtig, gilt für viele und hat einen echten Grund. Schwache Argumente gelten nur für dich, sind nebensächlich oder berufen sich nur auf andere.',
      items: [
        { kopf: 'Unsere Klasse sollte einen Wasserspender bekommen, …', optionen: [
          { text: '… weil das Wasser dann schön kalt ist.', ok: false, info: 'Ein Grund, aber ein schwacher: nett, aber nicht so wichtig.' },
          { text: '… weil alle dann jederzeit genug trinken können und sich besser konzentrieren.', ok: true, info: 'Am stärksten: wichtig und gilt für alle.' },
          { text: '… weil die Nachbarklasse auch einen hat.', ok: false, info: 'Schwach: Was andere haben, ist allein kein guter Grund.' }] },
        { kopf: 'Wir sollten einen Schulgarten anlegen, …', optionen: [
          { text: '… weil wir dort lernen, wie unsere Lebensmittel wachsen.', ok: true, info: 'Am stärksten: Alle lernen etwas Wichtiges.' },
          { text: '… weil Blumen hübsch aussehen.', ok: false, info: 'Schwächer: Es geht nur ums Aussehen.' },
          { text: '… weil ich gern in der Erde buddle.', ok: false, info: 'Schwach: Das gilt nur für dich.' }] },
        { kopf: 'Die Pause sollte zehn Minuten länger sein, …', optionen: [
          { text: '… weil ich dann länger Fußball spielen kann.', ok: false, info: 'Schwach: Das gilt nur für dich.' },
          { text: '… weil andere Schulen das vielleicht auch so machen.', ok: false, info: 'Schwach: unsicher und nur ein Verweis auf andere.' },
          { text: '… weil sich alle besser erholen und danach aufmerksamer sind.', ok: true, info: 'Am stärksten: wichtig und für alle.' }] },
        { kopf: 'Unsere Klassenfahrt sollte an die Ostsee gehen, …', optionen: [
          { text: '… weil wir dort viel zusammen draußen erleben und uns als Klasse besser kennenlernen.', ok: true, info: 'Am stärksten: Die ganze Klasse hat etwas davon.' },
          { text: '… weil ich die Ostsee schön finde.', ok: false, info: 'Schwach: nur dein Geschmack.' },
          { text: '… weil es dort Eis gibt.', ok: false, info: 'Schwach: Eis gibt es fast überall.' }] },
        { kopf: 'Handys sollten im Unterricht ausgeschaltet bleiben, …', optionen: [
          { text: '… weil meine Eltern das auch sagen.', ok: false, info: 'Schwach: nur ein Verweis auf andere.' },
          { text: '… weil sich dann alle besser auf den Unterricht konzentrieren können.', ok: true, info: 'Am stärksten: ein wichtiger Grund für alle.' },
          { text: '… weil Handys im Rucksack Platz wegnehmen.', ok: false, info: 'Schwach: eher nebensächlich.' }] },
        { kopf: 'Es sollte jeden Tag Obst in der Schule geben, …', optionen: [
          { text: '… weil Äpfel lecker sind.', ok: false, info: 'Schwach: Geschmack ist verschieden.' },
          { text: '… weil man Bananenschalen gut wegwerfen kann.', ok: false, info: 'Schwach: nebensächlich.' },
          { text: '… weil dann jedes Kind etwas Gesundes essen kann, auch ohne Frühstück von zu Hause.', ok: true, info: 'Am stärksten: wichtig und gerecht für alle.' }] },
      ],
      wissen: { titel: 'Argumente abwägen', text: 'Nicht jedes Argument ist gleich stark. Ein starkes Argument ist wichtig und gilt für viele. Nenne dein stärkstes Argument zuletzt – dann bleibt es im Kopf.', beispiel: 'Schwach: … weil ich es schön finde.\nStark: … weil alle davon etwas haben.' },
    },

    /* ---------------- Kapitel 3 ---------------- */
    {
      id: 'leuchtturm', bit: 8, kapitel: 2, name: 'Sachlich bleiben',
      schwerpunkt: 'Unfaire Sätze sachlich und fair formulieren',
      typ: 'auswahl', frage: 'Wie sagt man das sachlich und fair?',
      start: 'Der Leuchtturm warnt vor Klippen – und vor unfairen Worten. Finde die Antwort, die über die Sache spricht und nicht über die Person.',
      tipp: 'Sachlich heißt: über die SACHE reden, nicht über die Person. Sag, was dich stört oder was du anders siehst – und warum.',
      items: [
        { kopf: '„Deine Idee ist total bescheuert!“', optionen: [
          { text: '„Ich finde die Idee nicht so gut, weil sie viel Geld kostet.“', ok: true, info: 'Genau! Du sagst deine Meinung mit Grund – ohne Beleidigung.' },
          { text: '„Deine Idee ist echt doof.“', ok: false, info: 'Immer noch unfair und ohne Grund.' },
          { text: '„Na super, wieder so eine Idee.“', ok: false, info: 'Das ist spöttisch.' }] },
        { kopf: '„Du hast doch keine Ahnung von Fußball!“', optionen: [
          { text: '„Du redest Quatsch.“', ok: false, info: 'Ein Angriff auf die Person.' },
          { text: '„Ich sehe das anders: Beim Fußball kommt es auch auf Teamarbeit an.“', ok: true, info: 'Richtig! Du sprichst über die Sache.' },
          { text: '„Du spielst ja selbst schlecht.“', ok: false, info: 'Wieder ein Angriff auf die Person.' }] },
        { kopf: '„Immer musst du rumnerven!“', optionen: [
          { text: '„Halt doch mal den Mund!“', ok: false, info: 'Das ist unfreundlich.' },
          { text: '„Du nervst einfach.“', ok: false, info: 'Das sagt nicht, was genau stört.' },
          { text: '„Mich stört es, wenn du dazwischenredest. Lass mich bitte ausreden.“', ok: true, info: 'Super! Du sagst genau, was dich stört.' }] },
        { kopf: '„Das ist das Dümmste, was ich je gehört habe!“', optionen: [
          { text: '„Da bin ich anderer Meinung, weil …“', ok: true, info: 'Genau! Widersprechen mit Begründung.' },
          { text: '„So ein Unsinn.“', ok: false, info: 'Das wertet ab und erklärt nichts.' },
          { text: '„Hör auf zu reden.“', ok: false, info: 'Damit beendest du das Gespräch.' }] },
        { kopf: '„Ihr Jungs wollt doch nur Fußball spielen!“', optionen: [
          { text: '„Jungs sind eben so.“', ok: false, info: 'Das ist ein Vorurteil.' },
          { text: '„Ich wünsche mir, dass in der Pause auch andere Spiele drankommen.“', ok: true, info: 'Richtig! Ein Wunsch ohne Vorurteil.' },
          { text: '„Mit euch kann man nicht reden.“', ok: false, info: 'Das stoppt das Gespräch.' }] },
        { kopf: '„Greta will sowieso immer bestimmen!“', optionen: [
          { text: '„Greta ist eine Bestimmerin.“', ok: false, info: 'Ein Etikett für die Person, kein Argument.' },
          { text: '„Ich fände es gut, wenn heute auch jemand anderes entscheiden darf.“', ok: true, info: 'Genau! Ein fairer Vorschlag.' },
          { text: '„Greta, du bist so gemein.“', ok: false, info: 'Ein Angriff auf Greta.' }] },
      ],
      wissen: { titel: 'Sachlich bleiben', text: 'Rede über die Sache, nicht über die Person. Sag, was dich stört oder was du anders siehst – und warum.', beispiel: 'Unfair: „Deine Idee ist dumm!“\nSachlich: „Ich finde die Idee nicht gut, weil …“' },
    },
    {
      id: 'festhalle', bit: 9, kapitel: 2, name: 'Kompromisse finden',
      schwerpunkt: 'Kompromisse finden, mit denen beide Seiten leben können',
      typ: 'auswahl', frage: 'Welcher Vorschlag ist ein fairer Kompromiss?',
      start: 'In der Festhalle feiern alle zusammen. Dafür braucht es Kompromisse: Lösungen, bei denen beide Seiten etwas bekommen.',
      tipp: 'Ein Kompromiss nimmt die Wünsche BEIDER Seiten ernst. Jede Seite bekommt einen Teil von dem, was ihr wichtig ist.',
      items: [
        { kopf: 'Ben will in der Pause Fußball spielen. Ayla will, dass der Platz auch für andere Spiele frei ist.', optionen: [
          { text: 'Fußball, weil Ben lauter gerufen hat.', ok: false, info: 'Hier gewinnt nur eine Seite.' },
          { text: 'An drei Tagen ist Fußball, an den anderen Tagen sind andere Spiele dran.', ok: true, info: 'Genau! Beide bekommen etwas.' },
          { text: 'Keiner darf mehr auf den Platz.', ok: false, info: 'Dann verlieren beide.' }] },
        { kopf: 'Die Klasse streitet: Ausflug in den Zoo oder in den Kletterpark?', optionen: [
          { text: 'Wir machen gar keinen Ausflug.', ok: false, info: 'Dann verlieren alle.' },
          { text: 'Die Lehrerin entscheidet allein, dann ist Ruhe.', ok: false, info: 'Damit wird der Streit nur beendet, nicht gelöst.' },
          { text: 'Jetzt geht es in den Zoo, beim nächsten Ausflug in den Kletterpark.', ok: true, info: 'Richtig! Beide Wünsche kommen dran.' }] },
        { kopf: 'Selin möchte bei Gruppenarbeit mit ihrer Freundin arbeiten. Der Lehrer möchte gemischte Gruppen.', optionen: [
          { text: 'Mal dürfen wir die Gruppen selbst wählen, mal werden sie gemischt.', ok: true, info: 'Genau! Beide Seiten werden berücksichtigt.' },
          { text: 'Selin arbeitet allein.', ok: false, info: 'Das löst nichts.' },
          { text: 'Alle arbeiten immer mit ihren Freunden.', ok: false, info: 'Hier gewinnt nur eine Seite.' }] },
        { kopf: 'Mats will im Klassenraum laute Musik. Merle braucht beim Arbeiten Ruhe.', optionen: [
          { text: 'Die Musik läuft immer laut.', ok: false, info: 'Merles Wunsch wird nicht beachtet.' },
          { text: 'In der Pause läuft Musik, beim Arbeiten bleibt es leise.', ok: true, info: 'Richtig! Beide bekommen ihre Zeit.' },
          { text: 'Merle soll im Flur arbeiten.', ok: false, info: 'Merle wird ausgeschlossen.' }] },
        { kopf: 'Anton möchte ein Meerschweinchen in der Klasse. Lea ist allergisch gegen Tierhaare.', optionen: [
          { text: 'Lea soll die Klasse wechseln.', ok: false, info: 'Das ist unfair gegenüber Lea.' },
          { text: 'Anton bekommt das Meerschweinchen trotzdem.', ok: false, info: 'Leas Gesundheit wird nicht beachtet.' },
          { text: 'Statt eines Meerschweinchens holen wir Fische in einem Aquarium.', ok: true, info: 'Super! Ein Tier für die Klasse – ohne Tierhaare.' }] },
        { kopf: 'Die Hälfte will im Klassenrat zuerst über die Klassenfahrt reden, die andere Hälfte über die Pausenregeln.', optionen: [
          { text: 'Heute reden wir zehn Minuten über jedes Thema.', ok: true, info: 'Genau! Beide Themen kommen dran.' },
          { text: 'Wer lauter ist, gewinnt.', ok: false, info: 'Das ist nicht fair.' },
          { text: 'Wir reden heute über gar nichts.', ok: false, info: 'Dann verlieren alle.' }] },
      ],
      wissen: { titel: 'Kompromisse', text: 'Bei einem Kompromiss bekommt jede Seite einen Teil von dem, was ihr wichtig ist. So kann eine Gruppe gemeinsam entscheiden.', beispiel: '„Jetzt der Zoo, beim nächsten Mal der Kletterpark.“' },
    },
  ];

  /* ---------- Stammesräte: kleine Gruppen mit Rollen ---------- */
  ZI.STAEMME = [
    { name: 'Eisenhämmer', farbe: '#8a4b1c' }, { name: 'Funkenschläger', farbe: '#d9732f' },
    { name: 'Kristallgräber', farbe: '#3b7fa6' }, { name: 'Moosbärte', farbe: '#55812a' },
    { name: 'Felsenfäuste', farbe: '#6b5d52' }, { name: 'Goldadern', farbe: '#c89a2a' },
    { name: 'Wellenreiter', farbe: '#2c8f8a' }, { name: 'Glutherzen', farbe: '#b03a3a' },
    { name: 'Sternenschmiede', farbe: '#6a4fa0' },
  ];
  /* Reihenfolge = Vergabe im Stamm. Bei drei Zwergen fällt die Wache weg (die Älteste übernimmt sie). */
  /* Rollen im Stammesrat. bild: erwartete Bilddatei in bilder/ (Ausweich-Zeichen, solange sie fehlt).
     einfach: drei kurze Sätze für die Kinder – Aufgabe, worauf achten, was tun. */
  ZI.STAMMES_ROLLEN = [
    { id: 'aelteste', name: 'Älteste', bild: 'rolle-aelteste', zeichen: '🔔', aufgabe: 'Du leitest das Gespräch. Achte darauf, dass jeder einmal spricht – auch die Leisen.',
      einfach: { aufgabe: 'Du leitest das Gespräch.', achten: 'Jeder sagt etwas. Auch die Leisen.', tun: 'Frag: „Wer möchte anfangen?“ Am Ende sagst du: „Lasst uns entscheiden.“' },
      saetze: ['Wer möchte anfangen?', 'Was meinst du dazu, …?', 'Hat jeder schon etwas gesagt?', 'Lasst uns jetzt entscheiden.'] },
    { id: 'bote', name: 'Bote', bild: 'auftrag-rolle', zeichen: '📜', aufgabe: 'Du merkst dir das Ergebnis. Im großen Rat sagst du es in einem Satz für deinen Stamm.',
      einfach: { aufgabe: 'Du sprichst für deinen Stamm.', achten: 'Was hat dein Stamm entschieden? Und warum?', tun: 'Im großen Rat sagst du einen Satz: „Unser Stamm ist für …, weil …“' },
      saetze: ['Unser Stamm ist für …, weil …', 'Unser stärkster Grund ist …', 'Wir waren uns nicht einig, aber die meisten finden …'] },
    { id: 'gedaechtnis', name: 'Gedächtnis', bild: 'rolle-gedaechtnis', zeichen: '🧠', aufgabe: 'Du hörst genau zu und fasst zwischendurch zusammen, was gesagt wurde.',
      einfach: { aufgabe: 'Du merkst dir, was gesagt wird.', achten: 'Welche Gründe gibt es dafür? Welche dagegen?', tun: 'Sag zwischendurch: „Bis jetzt haben wir gesagt, dass …“' },
      saetze: ['Bis jetzt haben wir gesagt, dass …', 'Dafür spricht …, dagegen spricht …', 'Habe ich das richtig verstanden?'] },
    { id: 'wache', name: 'Wache', bild: 'rolle-wache', zeichen: '⏳', aufgabe: 'Du achtest auf die Zeit und auf die Ratsregeln. Erinnere freundlich daran.',
      einfach: { aufgabe: 'Du passt auf die Zeit und die Regeln auf.', achten: 'Reden alle freundlich? Lassen alle ausreden?', tun: 'Sag freundlich: „Wir haben noch 2 Minuten.“ oder „Lass sie bitte ausreden.“' },
      saetze: ['Wir haben noch … Minuten.', 'Lass sie bitte ausreden.', 'Kannst du das noch begründen?'] },
  ];
  ZI.ALLE_SAETZE = ['Ich finde, dass …, weil …', 'Ich stimme dir zu, denn …', 'Du sagst, dass … Aber …', 'Ja, und außerdem …'];
  /* Themen: die Ratsfragen (mit Gebäuden) und freie Streitfragen zum Üben */
  ZI.STAMMES_THEMEN = [
    { frage: 'k1a' }, { frage: 'k1b' }, { frage: 'k2a' }, { frage: 'k2b' }, { frage: 'k3a' },
    { text: 'Sollte es an unserer Schule einen Kuscheltiertag geben?' },
    { text: 'Sollten Handys in der Pause erlaubt sein?' },
    { text: 'Sollten wir einen Klassenausflug in den Wald oder in den Zoo machen?' },
  ];
  ZI.ratsfrageNach = (id) => { for (const l of ZI.RATSFRAGEN) for (const f of l) if (f.id === id) return f; return null; };
  ZI.themaHerkunft = (t) => (t.frage ? 'Für die Insel' : 'Aus eurer Klasse');
  ZI.themaText = (t) => (t.frage ? ZI.ratsfrageNach(t.frage).frage : t.text);
  /* Stämme bilden: gleiche Eingabe → gleiche Einteilung, auf dem Board und auf jedem iPad */
  ZI.stammesEinteilung = function (n, seed) {
    let x = (seed * 2654435761 + n * 97 + 12345) >>> 0;
    const zufall = () => { x = (x + 0x6D2B79F5) >>> 0; let t = x; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const karten = Array.from({ length: n }, (_, i) => i + 1);
    for (let i = karten.length - 1; i > 0; i--) { const j = Math.floor(zufall() * (i + 1)); [karten[i], karten[j]] = [karten[j], karten[i]]; }
    const anzahl = Math.max(1, Math.ceil(n / 4));
    const staemme = [];
    let pos = 0;
    for (let g = 0; g < anzahl; g++) {
      const groesse = Math.floor(n / anzahl) + (g < n % anzahl ? 1 : 0);
      const mitglieder = karten.slice(pos, pos + groesse); pos += groesse;
      staemme.push({ nr: g, ...ZI.STAEMME[g % ZI.STAEMME.length],
        mitglieder: mitglieder.map((karte, i) => ({ karte, rolle: ZI.STAMMES_ROLLEN[i] || null })) });
    }
    return staemme;
  };

  /* Rückblick: „Ich kann …“ pro Kapitel. uebung zeigt, wo man nachüben kann. */
  ZI.ICH_KANN = [
    [
      { text: 'Ich erkenne, ob eine Begründung wirklich erklärt, WARUM.', uebung: { art: 'kern', i: 0 } },
      { text: 'Ich finde Begründungen, die zur Meinung passen.', uebung: { art: 'kern', i: 1 } },
      { text: 'Ich baue Sätze mit weil, da und denn richtig.', uebung: { art: 'kern', i: 2 } },
      { text: 'Ich kann eine Begründung mit einem Beispiel stützen.', uebung: { art: 'tief', i: 1 } },
      { text: 'Ich kann meine Meinung laut und begründet sagen.', uebung: { art: 'tief', i: 2 } },
    ],
    [
      { text: 'Ich kenne die drei Teile eines Arguments: Meinung, Begründung und Beispiel.', uebung: { art: 'kern', i: 0 } },
      { text: 'Ich erkenne Gesprächsmotoren und Gesprächsbremsen.', uebung: { art: 'kern', i: 1 } },
      { text: 'Ich höre genau zu und erkenne Meinung, Begründung und Beispiel.', uebung: { art: 'kern', i: 2 } },
      { text: 'Ich unterscheide Stützen von neuen Argumenten.', uebung: { art: 'tief', i: 1 } },
    ],
    [
      { text: 'Ich erkenne, ob jemand zustimmt, widerspricht oder das Thema wechselt.', uebung: { art: 'kern', i: 0 } },
      { text: 'Ich knüpfe an das an, was andere gesagt haben.', uebung: { art: 'kern', i: 1 } },
      { text: 'Ich nehme Einwände ernst und antworte mit einer Lösung.', uebung: { art: 'kern', i: 2 } },
      { text: 'Ich finde Gegenargumente.', uebung: { art: 'tief', i: 0 } },
      { text: 'Ich wähle Argumente, die zu meinem Gegenüber passen.', uebung: { art: 'tief', i: 1 } },
    ],
  ];
  ZI.EINSCHAETZUNG = [
    { wert: 3, text: 'Kann ich sicher', klasse: 'sicher' },
    { wert: 2, text: 'Fast', klasse: 'fast' },
    { wert: 1, text: 'Noch üben', klasse: 'ueben' },
  ];

  /* Stationsnamen für Überblick und Urkunde am Board */
  ZI.STATIONS_NAMEN = [
    { kern: ['Stumpf oder scharf?', 'Erz oder Schlacke?', 'Weil-Denn-Amboss'], tief: ['Fehlerjagd', 'Beispiel-Edelstein', 'Meisterstück'], bonus: 'Funkenregen' },
    { kern: ['Argument-Puzzle', 'Motor oder Bremse?', 'Hör-Stollen'], tief: ['Kobold-Kampf', 'Argument-Kette', 'Meisterstück II'], bonus: 'Beispiel-Regen' },
    { kern: ['Ja, und – ja, aber?', 'Wer hört zu?', 'Überzeug den Inselrat'], tief: ['Gegenargument-Schmiede', 'Wer überzeugt wen?', 'Streitgespräch'], bonus: 'Sprecherwechsel' },
  ];

  ZI.bauUebung = (id) => ZI.BAU_UEBUNGEN.find((u) => u.id === id) || null;

  /* Wissensbuch-Seiten der Gebäude */
  ZI.BAU_UEBUNGEN.forEach((u) => {
    ZI.WISSEN.push({ k: u.kapitel, art: 'bau', bau: u.id, bit: u.bit, titel: u.wissen.titel, text: u.wissen.text, beispiel: u.wissen.beispiel });
  });

  /* ---------- Neuer Bauplan: mehrere Ratsfragen pro Kapitel ----------
     Schritt mit frage: wahl 0 = das Gebäude, das der Rat gewählt hat; wahl 1 = das andere. */
  ZI.RATSFRAGEN = [
    [
      { id: 'k1a', frage: 'Was bauen wir zuerst: die Werkstatt oder die Hügelhütte?', optionen: ['werkstatt', 'huette3'] },
      { id: 'k1b', frage: 'Was bauen wir als Nächstes: die Ziegelhütte oder den Steg?', optionen: ['huette2', 'steg'] },
    ],
    [
      { id: 'k2a', frage: 'Was bauen wir zuerst: die Bibliothek oder den Ratsplatz?', optionen: ['bibliothek', 'ratsplatz'] },
      { id: 'k2b', frage: 'Was bauen wir als Nächstes: den Brunnen oder die Mühle?', optionen: ['brunnen', 'muehle'] },
    ],
    [
      { id: 'k3a', frage: 'Was bauen wir zuerst: den Leuchtturm oder die Festhalle?', optionen: ['leuchtturm', 'festhalle'] },
    ],
  ];
  ZI.BAUPLAN = [
    [
      { anteil: 0, gebaeude: 'lagerfeuer' },
      { anteil: 0.2, gebaeude: 'huette1' },
      { anteil: 0.4, frage: 'k1a', wahl: 0 },
      { anteil: 0.6, frage: 'k1b', wahl: 0 },
      { anteil: 0.8, frage: 'k1a', wahl: 1 },
      { anteil: 1.0, frage: 'k1b', wahl: 1 },
    ],
    [
      { anteil: 0.25, frage: 'k2a', wahl: 0 },
      { anteil: 0.5, frage: 'k2b', wahl: 0 },
      { anteil: 0.75, frage: 'k2a', wahl: 1 },
      { anteil: 1.0, frage: 'k2b', wahl: 1 },
    ],
    [
      { anteil: 0.34, frage: 'k3a', wahl: 0 },
      { anteil: 0.67, frage: 'k3a', wahl: 1 },
      { anteil: 1.0, gebaeude: 'schiff' },
    ],
  ];
})();
