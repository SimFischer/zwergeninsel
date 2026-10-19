/* Zwergeninsel – Inhalte und Spieldaten
   Alle Texte für die Kinder stehen hier, damit sie leicht angepasst werden können. */

const ZI = window.ZI || (window.ZI = {});

/* ---------- Bilder ---------- */
ZI.JPG = ['transition-schmiede', 'transition-stollen', 'transition-gemeinschaftsstollen', 'titel-hintergrund', 'schmiede-hintergrund', 'stollen-hintergrund', 'zwergenrat-hintergrund', 'vulkan-hintergrund', 'fest-szene', 'insel-grund'];
ZI.BILD = (name) => 'bilder/' + name + (ZI.JPG.includes(name) ? '.jpg' : '.png');
/* Alle Bilder – werden nach dem Start gestaffelt in den Offline-Speicher geladen (ZI.vorladen) */
/* Bildplätze, deren Dateien noch kommen: werden nicht geladen, es greift der Ersatz.
   Ist eine Datei da, den Namen hier streichen und in ALLE_BILDER eintragen. */
ZI.BILD_KOMMT = ['rolle-pro', 'rolle-contra', 'argumenttafel', 'stollen-tiefer',
  'tiefe-1', 'tiefe-2', 'tiefe-3', 'tiefe-4', 'tiefe-5', 'tiefe-krone'];
ZI.ALLE_BILDER = [
  'zwerg-01-brumm', 'zwerg-02-hilda', 'zwerg-03-tarek', 'zwerg-04-svea', 'zwerg-05-kira', 'zwerg-06-ole',
  'zwerg-07-fenno', 'zwerg-08-smaragda', 'zwerg-09-bodo', 'zwerg-10-amara', 'zwerg-11-grimbart', 'zwerg-12-rubina',
  'meisterin-erklaert', 'meisterin-jubelt', 'meisterin-tipp', 'meisterin-ermutigt', 'kobold-frech', 'kobold-chaos',
  'kobold-besiegt', 'schmiede-hintergrund', 'amboss', 'hammer', 'eisen-roh', 'eisen-gluehend',
  'axt-stumpf', 'axt-scharf', 'schleifstein', 'runenplatte', 'truhe-zu', 'truhe-offen',
  'titel-hintergrund', 'stollen-hintergrund', 'zwergenrat-hintergrund', 'vulkan-hintergrund', 'fest-szene', 'insel-grund',
  'lagerfeuer', 'lagerfeuer-ruine', 'huette1', 'huette1-ruine', 'huette2', 'huette2-ruine',
  'huette3', 'huette3-ruine', 'werkstatt', 'werkstatt-ruine', 'steg', 'steg-ruine',
  'bibliothek', 'bibliothek-ruine', 'ratsplatz', 'ratsplatz-ruine', 'brunnen', 'brunnen-ruine',
  'muehle', 'muehle-ruine', 'leuchtturm', 'leuchtturm-ruine', 'festhalle', 'festhalle-ruine',
  'schiff', 'fahne', 'laterne', 'kristall-laterne', 'blumenbeet',
  'bank', 'faesser', 'statue', 'wegweiser', 'gemuesegarten', 'ziegen',
  'holz', 'stein', 'eisen', 'edelstein', 'stern',
  'zwergenpass-karte',
  'moewe-oben', 'moewe-unten', 'moewe-geschenk', 'krabbe', 'delfin', 'huhn', 'hase', 'schildkroete', 'schmetterling',
  'wolke-1', 'wolke-2', 'wolke-3', 'sonder-pavillon', 'sonder-blumenbogen', 'sonder-amboss-denkmal', 'sonder-aussichtsturm',
  'sonder-baumhaus', 'sonder-festbaum', 'krone', 'geschenk', 'auftrag-rolle', 'buch-offen', 'flamme',
  'rang-1', 'rang-2', 'rang-3', 'rang-4', 'rang-5', 'rang-6', 'rang-7',
  ...['funke', 'k1', 'k2', 'k3', 'fehler', 'kobold', 'rede', 'ohr', 'rat', 'krone1', 'krone5', 'krone9', 'stern3', 'stern9', 'gems', 'buch', 'freunde', 'clan'].map((a) => 'abzeichen-' + a),
  'icon-beispiel', 'icon-beispielregen', 'icon-erz-schlacke', 'icon-fehlerjagd', 'icon-funkenregen', 'icon-gegenargument', 'icon-hoeren', 'icon-inselrat', 'icon-ja-und', 'icon-kette', 'icon-kobold-kampf', 'icon-meisterstueck', 'icon-meisterstueck2', 'icon-motor-bremse', 'icon-puzzle', 'icon-situation', 'icon-sprecherwechsel', 'icon-streitgespraech', 'icon-stumpf-scharf', 'icon-weil-denn', 'icon-zuhoeren',
  'rolle-aelteste', 'rolle-gedaechtnis', 'rolle-wache', 'gemeinschaftsstollen-icon', 'schmiede-axt-werkstueck', 'zwerg-freigeschaltet-glanz',
  'transition-schmiede', 'transition-stollen', 'transition-gemeinschaftsstollen',
  'nacht-fackel', 'nacht-fensterlicht', 'nacht-feuerstelle-klein', 'nacht-lagerfeuer', 'nacht-schmiedeglut',
  ...['01-brumm', '02-hilda', '03-tarek', '04-svea', '05-kira', '06-ole', '07-fenno', '08-smaragda', '09-bodo', '10-amara', '11-grimbart', '12-rubina'].map((z) => 'zwerg-' + z + '-jubel'),
];
/* Nur das Board braucht diese; die iPads laden sie nicht */
ZI.NUR_BOARD = (n) => /-ruine$|^(nacht-|insel-grund|fest-szene|schiff|fahne|laterne|kristall-laterne|blumenbeet|bank|faesser|statue|wegweiser|gemuesegarten|ziegen|moewe-|krabbe|delfin|huhn|hase|schildkroete|schmetterling|wolke-|sonder-)/.test(n);

/* ---------- Die 12 Zwerge ----------
   unlock(s): s ist der Spielstand (siehe pass.js), gibt true zurück, wenn freigeschaltet. */
ZI.ZWERGE = [
  { nr: 1, name: 'Brumm', datei: 'zwerg-01-brumm', rolle: 'Schmied', start: true },
  { nr: 2, name: 'Hilda', datei: 'zwerg-02-hilda', rolle: 'Schmiedin', start: true },
  { nr: 3, name: 'Tarek', datei: 'zwerg-03-tarek', rolle: 'Baumeister', start: true },
  { nr: 4, name: 'Svea', datei: 'zwerg-04-svea', rolle: 'Schreiberin', start: true },
  { nr: 5, name: 'Kira', datei: 'zwerg-05-kira', rolle: 'Bergfrau',
    bedingung: 'Schaffe den Hauptstollen in Kapitel 1.',
    unlock: (s) => s.coreCount(0) === 3 },
  { nr: 6, name: 'Ole', datei: 'zwerg-06-ole', rolle: 'Fischer',
    bedingung: 'Grab zum ersten Mal tiefer (Tiefe 1).',
    unlock: (s) => s.deepTotal() >= 1 },
  { nr: 7, name: 'Fenno', datei: 'zwerg-07-fenno', rolle: 'Koch',
    bedingung: 'Sammle 10 Edelsteine.',
    unlock: (s) => s.gems() >= 10 },
  { nr: 8, name: 'Smaragda', datei: 'zwerg-08-smaragda', rolle: 'Edelsteinschleiferin',
    bedingung: 'Erreiche in Kapitel 1 Tiefe 3.',
    unlock: (s) => s.deepCount(0) >= 3 },
  { nr: 9, name: 'Bodo', datei: 'zwerg-09-bodo', rolle: 'Musikant',
    bedingung: 'Hol dir 2 Sterne im Funkenregen.',
    unlock: (s) => s.bonusMax() >= 2 },
  { nr: 10, name: 'Amara', datei: 'zwerg-10-amara', rolle: 'Wächterin',
    bedingung: 'Schaffe den Hauptstollen in Kapitel 2.',
    unlock: (s) => s.coreCount(1) === 3 },
  { nr: 11, name: 'Grimbart', datei: 'zwerg-11-grimbart', rolle: 'Weiser',
    bedingung: 'Schaffe den Hauptstollen in Kapitel 3.',
    unlock: (s) => s.coreCount(2) === 3 },
  { nr: 12, name: 'Rubina Goldhammer', datei: 'zwerg-12-rubina', rolle: 'Legendäre Meisterschmiedin',
    bedingung: 'Sammle 40 Edelsteine.',
    unlock: (s) => s.gems() >= 40 },
];

/* Edelsteine pro geschafftem Tiefen Stollen */
ZI.GEMS_PRO_STOLLEN = 5;

/* ---------- Kapitel ---------- */
ZI.KAPITEL = [
  { nr: 1, titel: 'Gestrandet', runenwort: null, fertig: true },           // Runenwort = Wort, das dieses Kapitel öffnet
  { nr: 2, titel: 'Das Dorf wächst', runenwort: 'AMBOSS', fertig: false },
  { nr: 3, titel: 'Das Inselfest', runenwort: 'LEUCHTTURM', fertig: false },
];

/* =========================================================
   KAPITEL 1 – HAUPTSTOLLEN
   ========================================================= */

/* Station 1: Stumpf oder scharf? – die überzeugende Begründung finden */
ZI.STUMPF_SCHARF = [
  {
    meinung: 'Ich finde, dass man in der Pause draußen sein sollte, …',
    optionen: [
      { text: '… weil draußen besser ist.', scharf: false,
        info: 'Das sagt nur noch einmal „besser“. Warum ist es draußen besser?' },
      { text: '… weil man sich an der frischen Luft bewegt und danach besser aufpassen kann.', scharf: true,
        info: 'Genau! Diese Begründung erklärt, warum es gut ist, draußen zu sein.' },
      { text: '… weil wir in der Pause sowieso nichts anderes zu tun haben.', scharf: false,
        info: 'Das erklärt nicht, warum draußen sein gut ist.' },
    ],
  },
  {
    meinung: 'Ich finde, dass man anderen helfen sollte, …',
    optionen: [
      { text: '… weil Helfen gut ist.', scharf: false,
        info: 'Diese Begründung dreht sich im Kreis: Helfen ist gut, weil Helfen gut ist.' },
      { text: '… weil jeder mal Hilfe braucht und eine Klasse so besser zusammenhält.', scharf: true,
        info: 'Stark! Du erklärst, was Helfen bewirkt.' },
      { text: '… weil ich gern anderen helfe.', scharf: false,
        info: 'Das sagt nur, was du magst – nicht, warum Helfen für alle gut ist.' },
    ],
  },
  {
    meinung: 'Ich finde, dass Kinder regelmäßig Sport treiben sollten, …',
    optionen: [
      { text: '… weil Sport wichtig ist.', scharf: false,
        info: 'Warum ist Sport wichtig? Genau das müsste die Begründung sagen.' },
      { text: '… weil viele Kinder in einem Sportverein sind.', scharf: false,
        info: 'Dass viele es machen, ist kein Grund, warum es gut ist.' },
      { text: '… weil Bewegung Herz und Muskeln stärkt und man danach besser schläft.', scharf: true,
        info: 'Richtig! Hier steht, was Sport für den Körper tut.' },
    ],
  },
  {
    meinung: 'Ich finde, dass man andere im Gespräch ausreden lassen sollte, …',
    optionen: [
      { text: '… weil das besser ist.', scharf: false,
        info: 'Besser – aber warum? Die Begründung bleibt stumpf.' },
      { text: '… weil man sonst nicht versteht, was der andere eigentlich sagen wollte.', scharf: true,
        info: 'Sehr gut! Du erklärst, was beim Unterbrechen schiefgeht.' },
      { text: '… weil das in unseren Klassenregeln steht.', scharf: false,
        info: 'Das sagt, wo die Regel steht – aber nicht, warum sie sinnvoll ist.' },
    ],
  },
  {
    meinung: 'Ich finde, dass man weniger Plastik benutzen sollte, …',
    optionen: [
      { text: '… weil Plastik schlecht ist.', scharf: false,
        info: 'Was ist an Plastik schlecht? Das muss die Begründung erklären.' },
      { text: '… weil es im Supermarkt sehr viel Plastik gibt.', scharf: false,
        info: 'Das beschreibt nur, wie viel Plastik es gibt. Warum ist das schlimm?' },
      { text: '… weil Plastikmüll oft im Meer landet und Tiere ihn mit Futter verwechseln.', scharf: true,
        info: 'Genau! Diese Begründung zeigt, welchen Schaden Plastik anrichtet.' },
    ],
  },
  {
    meinung: 'Ich finde, dass Kinder am Wochenende länger aufbleiben dürfen, …',
    optionen: [
      { text: '… weil Wochenende ist.', scharf: false,
        info: 'Dass Wochenende ist, wissen alle. Warum ist das ein Grund?' },
      { text: '… weil sie am nächsten Morgen ausschlafen können und trotzdem genug Schlaf bekommen.', scharf: true,
        info: 'Richtig! Du erklärst, warum es am Wochenende kein Problem ist.' },
      { text: '… weil ich am Wochenende gern Filme schaue.', scharf: false,
        info: 'Das ist nur dein Wunsch – kein Grund, warum es für Kinder gut ist.' },
    ],
  },
];

/* Station 2: Erz oder Schlacke? – passende Begründungen aussortieren */
ZI.ERZ_SCHLACKE = [
  {
    meinung: 'Unsere Klasse sollte einen Schulhund bekommen, …',
    gruende: [
      { text: '… weil ein Hund für eine ruhige Stimmung in der Klasse sorgen kann.', erz: true,
        info: 'Erz! Dieser Grund zeigt, was der Hund der Klasse bringt.' },
      { text: '… weil Hunde gern spielen.', erz: false,
        info: 'Schlacke. Das stimmt, ist aber kein Grund für einen Hund in der Klasse.' },
      { text: '… weil wir lernen, Verantwortung für ein Tier zu übernehmen.', erz: true,
        info: 'Erz! Ein guter Grund, der zur Meinung passt.' },
      { text: '… weil Hunde süß sind.', erz: false,
        info: 'Schlacke. Das ist nur ein Gefühl. Warum hilft das der Klasse?' },
    ],
  },
  {
    meinung: 'Wir sollten eine Schulübernachtung machen, …',
    gruende: [
      { text: '… weil wir dann bis spät abends wach bleiben dürfen.', erz: false,
        info: 'Schlacke. Das ist nur ein Wunsch, kein guter Grund für die Klasse.' },
      { text: '… weil wir uns als neue Klasse dabei besser kennenlernen.', erz: true,
        info: 'Erz! Gerade in einer neuen Klasse ist das ein starker Grund.' },
      { text: '… weil mein Cousin das auch gemacht hat.', erz: false,
        info: 'Schlacke. Was dein Cousin macht, ist kein Grund für unsere Klasse.' },
      { text: '… weil wir gemeinsam etwas Besonderes erleben, an das wir uns lange erinnern.', erz: true,
        info: 'Erz! Du erklärst, was die Übernachtung besonders macht.' },
    ],
  },
  {
    meinung: 'Die Schule sollte erst um 9:30 Uhr beginnen, …',
    gruende: [
      { text: '… weil viele Kinder dann ausgeschlafen sind und sich besser konzentrieren können.', erz: true,
        info: 'Erz! Ein Grund, der für alle Kinder gilt.' },
      { text: '… weil dann der Bus leerer ist.', erz: false,
        info: 'Schlacke. Das ist ein Nebenpunkt und kein Grund für späteren Schulbeginn.' },
      { text: '… weil ich morgens keine Lust habe.', erz: false,
        info: 'Schlacke. Das ist nur dein Wunsch. Warum wäre es für alle besser?' },
      { text: '… weil man morgens in Ruhe frühstücken kann.', erz: true,
        info: 'Erz! Ein Frühstück hilft beim Lernen – das passt.' },
    ],
  },
];

/* Station 3: Weil-Denn-Amboss – Begründungssätze richtig bauen
   kacheln: Wortbausteine; verb: der Baustein mit dem gebeugten Verb;
   loesungen: alle richtigen Reihenfolgen */
ZI.WEIL_DENN = [
  { haupt: 'Ich ziehe eine Jacke an,', bindewort: 'weil',
    kacheln: ['es', 'draußen', 'kalt', 'ist.'], verb: 'ist.',
    loesungen: [['es', 'draußen', 'kalt', 'ist.'], ['es', 'kalt', 'draußen', 'ist.']] },
  { haupt: 'Ich lese das Buch weiter,', bindewort: 'denn',
    kacheln: ['die Geschichte', 'ist', 'sehr spannend.'], verb: 'ist',
    loesungen: [['die Geschichte', 'ist', 'sehr spannend.']] },
  { haupt: 'Ich möchte früher ins Bett gehen,', bindewort: 'da',
    kacheln: ['ich', 'sehr müde', 'bin.'], verb: 'bin.',
    loesungen: [['ich', 'sehr müde', 'bin.']] },
  { haupt: 'Ich fahre gern Fahrrad,', bindewort: 'weil',
    kacheln: ['mir', 'Bewegung', 'guttut.'], verb: 'guttut.',
    loesungen: [['mir', 'Bewegung', 'guttut.'], ['Bewegung', 'mir', 'guttut.']] },
  { haupt: 'Ich besuche am Wochenende meine Großeltern,', bindewort: 'denn',
    kacheln: ['ich', 'habe', 'sie', 'lange nicht gesehen.'], verb: 'habe',
    loesungen: [['ich', 'habe', 'sie', 'lange nicht gesehen.'], ['sie', 'habe', 'ich', 'lange nicht gesehen.']] },
  { haupt: 'Wir brauchen Klassendienste,', bindewort: 'weil',
    kacheln: ['unser Raum', 'dann', 'sauber', 'bleibt.'], verb: 'bleibt.',
    loesungen: [['unser Raum', 'dann', 'sauber', 'bleibt.'], ['dann', 'unser Raum', 'sauber', 'bleibt.']] },
];

/* =========================================================
   KAPITEL 1 – TIEFE STOLLEN
   ========================================================= */

/* Tiefer Stollen 1: Fehlerjagd – den richtigen Satz finden */
ZI.FEHLERJAGD = [
  { saetze: [
      { text: 'Ich gieße die Blumen, weil sie Wasser brauchen.', ok: true },
      { text: 'Ich gieße die Blumen weil sie Wasser brauchen.', ok: false, info: 'Vor „weil“ fehlt das Komma.' },
      { text: 'Ich gieße die Blumen, weil sie brauchen Wasser.', ok: false, info: 'Nach „weil“ gehört das Verb ans Ende.' },
  ]},
  { saetze: [
      { text: 'Wir spielen drinnen, denn regnet es.', ok: false, info: 'Nach „denn“ steht das Verb an zweiter Stelle: denn es regnet.' },
      { text: 'Wir spielen drinnen, denn es regnet.', ok: true },
      { text: 'Wir spielen drinnen denn es regnet.', ok: false, info: 'Vor „denn“ fehlt das Komma.' },
  ]},
  { saetze: [
      { text: 'Lea ist froh, da sie hat die Arbeit geschafft.', ok: false, info: 'Nach „da“ gehört das gebeugte Verb ans Ende.' },
      { text: 'Lea ist froh da sie die Arbeit geschafft hat.', ok: false, info: 'Vor „da“ fehlt das Komma.' },
      { text: 'Lea ist froh, da sie die Arbeit geschafft hat.', ok: true },
  ]},
  { saetze: [
      { text: 'Ich trinke viel Wasser, denn mein Körper braucht es beim Sport.', ok: true },
      { text: 'Ich trinke viel Wasser, denn mein Körper es beim Sport braucht.', ok: false, info: 'Nach „denn“ steht das Verb nicht am Ende, sondern an zweiter Stelle.' },
      { text: 'Ich trinke viel Wasser denn mein Körper braucht es beim Sport.', ok: false, info: 'Vor „denn“ fehlt das Komma.' },
  ]},
  { saetze: [
      { text: 'Tom bleibt zu Hause weil er Fieber hat.', ok: false, info: 'Vor „weil“ fehlt das Komma.' },
      { text: 'Tom bleibt zu Hause, weil er hat Fieber.', ok: false, info: 'Nach „weil“ gehört das Verb ans Ende.' },
      { text: 'Tom bleibt zu Hause, weil er Fieber hat.', ok: true },
  ]},
];

/* Tiefer Stollen 2: Beispiel-Edelstein – das passende Beispiel finden */
ZI.BEISPIELE = [
  { argument: 'Ich finde, dass wir mehr Pausen draußen machen sollten, weil Bewegung beim Lernen hilft.',
    optionen: [
      { text: 'Zum Beispiel kann ich nach dem Fangenspielen im Matheunterricht viel besser aufpassen.', ok: true,
        info: 'Genau! Das Beispiel zeigt, dass die Begründung stimmt.' },
      { text: 'Zum Beispiel ist unser Schulhof sehr groß.', ok: false,
        info: 'Das beschreibt den Schulhof – es zeigt nicht, dass Bewegung beim Lernen hilft.' },
      { text: 'Zum Beispiel spielen viele Kinder in der Pause Fangen.', ok: false,
        info: 'Das zeigt, was Kinder spielen – nicht, dass sie danach besser lernen.' },
  ]},
  { argument: 'Ich finde, dass unsere Klasse einen Schulhund bekommen sollte, weil wir dabei Verantwortung lernen.',
    optionen: [
      { text: 'Zum Beispiel freuen sich alle, wenn ein Hund zu Besuch kommt.', ok: false,
        info: 'Das zeigt Freude – aber nicht, dass wir Verantwortung lernen.' },
      { text: 'Zum Beispiel muss jeden Tag jemand den Wassernapf auffüllen und mit dem Hund rausgehen.', ok: true,
        info: 'Richtig! So sieht Verantwortung im Alltag aus.' },
      { text: 'Zum Beispiel können Hunde Kunststücke lernen.', ok: false,
        info: 'Hier lernt der Hund etwas – die Begründung sagt aber, dass WIR Verantwortung lernen.' },
  ]},
  { argument: 'Ich finde, dass wir weniger Plastik benutzen sollten, weil Plastikmüll Tieren schadet.',
    optionen: [
      { text: 'Zum Beispiel ist meine Brotdose aus Plastik.', ok: false,
        info: 'Das zeigt, dass es Plastik gibt – nicht, dass es Tieren schadet.' },
      { text: 'Zum Beispiel kann man Plastikflaschen zurück in den Laden bringen.', ok: false,
        info: 'Das ist ein Tipp gegen Müll – es zeigt nicht, dass Plastik Tieren schadet.' },
      { text: 'Zum Beispiel verfangen sich Schildkröten im Meer in alten Plastiktüten.', ok: true,
        info: 'Genau! Ein Beispiel, das man sich gut vorstellen kann.' },
  ]},
  { argument: 'Ich finde, dass jede Klasse Klassendienste haben sollte, weil dann alle Verantwortung übernehmen.',
    optionen: [
      { text: 'Zum Beispiel wischt jede Woche jemand anderes die Tafel.', ok: true,
        info: 'Richtig! So übernimmt wirklich jede und jeder einmal eine Aufgabe.' },
      { text: 'Zum Beispiel gibt es in unserer Klasse einen Dienstplan an der Wand.', ok: false,
        info: 'Ein Plan allein zeigt noch nicht, dass alle mithelfen.' },
      { text: 'Zum Beispiel macht meine Freundin am liebsten den Blumendienst.', ok: false,
        info: 'Das zeigt nur, was einer mag – nicht, dass ALLE Verantwortung übernehmen.' },
  ]},
];

/* Tiefer Stollen 3: Meisterstück – laut argumentieren mit Partnerin oder Partner
   Die Themen hat die Klasse 5a selbst gesammelt. */
ZI.MEISTER_THEMEN = [
  { frage: 'Sollte es einen Kuscheltiertag geben?',
    dafuer: 'Ich finde, dass es einen Kuscheltiertag geben sollte, weil …',
    dagegen: 'Ich finde, dass es keinen Kuscheltiertag geben sollte, weil …' },
  { frage: 'Sollte es einen Kreativtag geben?',
    dafuer: 'Ich finde, dass es einen Kreativtag geben sollte, weil …',
    dagegen: 'Ich finde, dass es keinen Kreativtag geben sollte, weil …' },
  { frage: 'Sollte unsere Klasse eine Schulübernachtung machen?',
    dafuer: 'Ich finde, dass wir eine Schulübernachtung machen sollten, weil …',
    dagegen: 'Ich finde, dass wir keine Schulübernachtung machen sollten, weil …' },
  { frage: 'Sollten wir einen Waldausflug machen?',
    dafuer: 'Ich finde, dass wir einen Waldausflug machen sollten, weil …',
    dagegen: 'Ich finde, dass wir keinen Waldausflug machen sollten, weil …' },
  { frage: 'Sollte es Schuluniformen geben?',
    dafuer: 'Ich finde, dass es Schuluniformen geben sollte, weil …',
    dagegen: 'Ich finde, dass es keine Schuluniformen geben sollte, weil …' },
  { frage: 'Sollte die Schule erst um 9:30 Uhr beginnen?',
    dafuer: 'Ich finde, dass die Schule erst um 9:30 Uhr beginnen sollte, weil …',
    dagegen: 'Ich finde, dass die Schule nicht erst um 9:30 Uhr beginnen sollte, weil …' },
  { frage: 'Sollten Haustiere in der Schule erlaubt sein?',
    dafuer: 'Ich finde, dass Haustiere in der Schule erlaubt sein sollten, weil …',
    dagegen: 'Ich finde, dass Haustiere in der Schule nicht erlaubt sein sollten, weil …' },
  { frage: 'Sollten beste Freunde nebeneinander sitzen dürfen?',
    dafuer: 'Ich finde, dass beste Freunde nebeneinander sitzen dürfen, weil …',
    dagegen: 'Ich finde, dass beste Freunde nicht nebeneinander sitzen sollten, weil …' },
  { frage: 'Sollte es einen Schwimmtag geben?',
    dafuer: 'Ich finde, dass es einen Schwimmtag geben sollte, weil …',
    dagegen: 'Ich finde, dass es keinen Schwimmtag geben sollte, weil …' },
  { frage: 'Sollte unsere Klassenfahrt an den Weißenhäuser Strand gehen?',
    dafuer: 'Ich finde, dass unsere Klassenfahrt an den Weißenhäuser Strand gehen sollte, weil …',
    dagegen: 'Ich finde, dass unsere Klassenfahrt nicht an den Weißenhäuser Strand gehen sollte, weil …' },
];

/* =========================================================
   BONUS: Funkenregen
   ========================================================= */
ZI.FUNKENREGEN = [
  { meinung: 'Wir sollten einen Waldausflug machen, …',
    scharf: ['weil wir dort Tiere beobachten können', 'weil frische Luft uns guttut',
             'weil wir viel über Bäume lernen', 'weil wir als Klasse etwas erleben'],
    stumpf: ['weil Wald gut ist', 'weil wir lange keinen Ausflug hatten', 'weil ich das will', 'weil es im Wald einen Kiosk gibt'] },
  { meinung: 'Es sollte einen Kreativtag geben, …',
    scharf: ['weil jeder zeigen kann, was er gut kann', 'weil man Neues ausprobiert',
             'weil man beim Basteln Ideen entwickelt', 'weil Abwechslung beim Lernen hilft'],
    stumpf: ['weil kreativ gut ist', 'weil das toll ist', 'weil wir dann keine Hausaufgaben haben', 'weil Basteln leiser ist als Mathe'] },
  { meinung: 'Wir sollten einen Schwimmtag machen, …',
    scharf: ['weil Schwimmen den ganzen Körper trainiert', 'weil man sicherer im Wasser wird',
             'weil wir zusammen Spaß haben', 'weil es eine Abwechslung zum Unterricht ist'],
    stumpf: ['weil Schwimmen gut ist', 'weil das Schwimmbad neu ist', 'weil ich gern Pommes im Bad esse', 'weil ich das sage'] },
];

/* =========================================================
   Meisterin Hammerlind – Sätze
   ========================================================= */
ZI.LOB = ['Wunderbar geschmiedet!', 'Scharf wie eine Axt!', 'Das sitzt!', 'Meisterlich!', 'Genau so!', 'Prima, weiter so!'];
ZI.TROST = ['Fast! Schau noch einmal genau hin.', 'Kein Problem – jeder Schmied übt.', 'Versuch es noch einmal.'];

ZI.TIPPS = {
  stumpf: 'Frag dich bei jeder Begründung: Erklärt sie, WARUM? Oder sagt sie nur noch einmal „gut“ oder „besser“ mit anderen Worten?',
  erz: 'Erz ist eine Begründung, die zur Meinung passt und wirklich etwas erklärt. Schlacke stimmt vielleicht, hilft der Meinung aber nicht.',
  weil: 'Nach „weil“ und „da“ wandert das gebeugte Verb ans Ende. Nach „denn“ kommt ein ganz normaler Satz: Das Verb steht an zweiter Stelle.',
  weilMuendlich: 'Übrigens: Beim Reden hört man oft „weil das ist so“. In der Schule und beim Schreiben steht das Verb nach „weil“ aber am Ende.',
  fehler: 'Prüfe zwei Dinge: Steht vor weil, da oder denn ein Komma? Und steht das Verb an der richtigen Stelle?',
  beispiel: 'Ein gutes Beispiel zeigt, dass die Begründung wirklich stimmt. Man kann es sich richtig vorstellen.',
  meister: 'Sag zuerst deine Meinung: „Ich finde, dass …“. Dann die Begründung mit weil, da oder denn. Und überleg: Erklärt sie, warum?',
};

/* =========================================================
   INSEL – Gebäude, Plätze und Schmuck
   x, y: Position in Prozent auf der Insel (Mitte unten des Gebäudes), w: Breite in Prozent
   ========================================================= */
ZI.GEBAEUDE = [
  { id: 'lagerfeuer', name: 'Lagerfeuerplatz', kapitel: 1, x: 39, y: 53.7, w: 9 },
  { id: 'huette1', name: 'Runde Hütte', kapitel: 1, x: 24, y: 65.0, w: 11 },
  { id: 'huette2', name: 'Ziegelhütte', kapitel: 1, x: 40, y: 72.1, w: 11 },
  { id: 'werkstatt', name: 'Werkstatt', kapitel: 1, x: 21, y: 47.2, w: 12 },
  { id: 'huette3', name: 'Hügelhütte', kapitel: 1, x: 62, y: 64.5, w: 12 },
  { id: 'steg', name: 'Steg', kapitel: 1, x: 78, y: 88, w: 11 },
  { id: 'bibliothek', name: 'Bibliothek', kapitel: 2, x: 29, y: 29.4, w: 11 },
  { id: 'ratsplatz', name: 'Ratsplatz', kapitel: 2, x: 50, y: 46.7, w: 13 },
  { id: 'brunnen', name: 'Brunnen', kapitel: 2, x: 54, y: 84.7, w: 8 },
  { id: 'muehle', name: 'Mühle', kapitel: 2, x: 69, y: 38.6, w: 11 },
  { id: 'leuchtturm', name: 'Leuchtturm', kapitel: 3, x: 70, y: 15.1, w: 9 },
  { id: 'festhalle', name: 'Festhalle', kapitel: 3, x: 82, y: 68.6, w: 14 },
];

/* Reihenfolge in Kapitel 1. 'rat' = hier entscheidet der Zwergenrat zwischen zwei Gebäuden. */
ZI.BAUPLAN_K1 = [
  { anteil: 0, gebaeude: 'lagerfeuer' },     // sobald die erste Lieferung kommt
  { anteil: 0.2, gebaeude: 'huette1' },
  { anteil: 0.4, gebaeude: 'huette2' },
  { anteil: 0.6, rat: ['werkstatt', 'huette3'] },
  { anteil: 0.8, rat: ['werkstatt', 'huette3'] },
  { anteil: 1.0, gebaeude: 'steg' },
];

ZI.RATSFRAGE_K1 = {
  frage: 'Was bauen wir zuerst: die Werkstatt oder die Hügelhütte?',
  optionen: ['werkstatt', 'huette3'],
};

ZI.RATSREGELN = [
  'Wir lassen andere ausreden.',
  'Wir knüpfen an: „Du sagst, dass … Dazu denke ich, dass …“',
  'Wir begründen mit weil, da oder denn.',
  'Wir bleiben freundlich, auch wenn wir anderer Meinung sind.',
];

ZI.SATZANFAENGE = [
  'Ich finde, dass …, weil …',
  'Ich stimme dir zu, denn …',
  'Ja, und außerdem …',
  'Ja, aber ich denke, dass …',
];

/* Schmuck: alle 15 Edelsteine der Klasse kommt ein Stück dazu */
ZI.SCHMUCK_PRO = 15;
ZI.SCHMUCK = [
  { id: 'fahne', name: 'Fahne', x: 45, y: 47, w: 3.5 },
  { id: 'laterne', name: 'Laterne', x: 34, y: 56, w: 3 },
  { id: 'blumenbeet', name: 'Blumenbeet', x: 30, y: 66, w: 5 },
  { id: 'bank', name: 'Bank', x: 47, y: 73, w: 4.5 },
  { id: 'faesser', name: 'Fässer', x: 14, y: 48, w: 4.5 },
  { id: 'kristall-laterne', name: 'Kristall-Laterne', x: 57, y: 66, w: 3 },
  { id: 'gemuesegarten', name: 'Gemüsegarten', x: 87, y: 51, w: 7 },
  { id: 'ziegen', name: 'Ziegen', x: 47, y: 22, w: 6 },
  { id: 'statue', name: 'Zwergenstatue', x: 56, y: 47, w: 3.5 },
  { id: 'wegweiser', name: 'Wegweiser', x: 51, y: 58, w: 3.5 },
  { id: 'fahne', name: 'Fahne', x: 76, y: 40, w: 3.5 },
  { id: 'laterne', name: 'Laterne', x: 36, y: 30, w: 3 },
];
