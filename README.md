# Zwergeninsel

Ein Lernspiel zum **mündlichen Argumentieren** für die 5. Klasse. Die Kinder schmieden in einer Zwergenschmiede Argumente und bauen damit gemeinsam ein Dorf auf einer Insel wieder auf.

- **Schmiede** (Schüler-iPads): `index.html`
- **Insel** (Lehrer-iPad oder PC am Smartboard): `insel.html`
- **Zwergenpass-Karten** zum Ausdrucken: `karten.html`

Die App läuft komplett im Browser, ohne Anmeldung und ohne Server. Es werden keine Namen und keine Daten übertragen. Der Spielstand jedes Kindes steckt in einem 10-stelligen Code, dem **Zwergenpass**.

## Ablauf einer Stunde (45 Minuten)

| Minuten | Was passiert |
| --- | --- |
| 5 | Insel am Board zeigen: Was ist schon gebaut, was kommt als Nächstes? |
| 25 | Schmiede auf den iPads: zuerst der Hauptstollen, danach Tiefe Stollen und Bonusinsel |
| 10–12 | Zwergenrat am Board: diskutieren, abstimmen, entscheiden, was gebaut wird |
| 3 | Lieferung: Lehrer-iPad scannt die QR-Codes, das Dorf wächst. Kinder schreiben ihren Zwergenpass auf ihre Karte. |

## Kapitel 1 – Gestrandet

**Hauptstollen** (für alle, bringt Baumaterial fürs Dorf)

1. *Stumpf oder scharf?* – die Begründung finden, die wirklich erklärt, warum (Kreisbegründungen erkennen)
2. *Erz oder Schlacke?* – passende und unpassende Begründungen zu einer Meinung sortieren
3. *Weil-Denn-Amboss* – Begründungssätze bauen, Verbstellung nach weil/da (Ende) und denn (zweite Stelle)

**Tiefe Stollen** (für Schnelle, bringt Edelsteine für Schmuck im Dorf)

1. *Fehlerjagd* – Komma- und Verbfehler finden
2. *Beispiel-Edelstein* – das Beispiel finden, das eine Begründung stützt
3. *Meisterstück* – laut argumentieren, die Partnerin oder der Partner prüft mit einer Checkliste

**Bonusinsel:** *Funkenregen* – scharfe Begründungen fangen, bis zu 3 Sterne

## Gerechtigkeit zwischen schnellen und langsameren Kindern

- Das Dorf wird nur aus dem **Hauptstollen** gebaut. Jedes Kind zählt gleich viel, egal wie schnell es ist.
- Schnelle Kinder bekommen Edelsteine. Die machen das Dorf **schöner**, aber nicht schneller fertig.
- Fehler kosten nichts. Nach zwei Fehlern hilft Meisterin Hammerlind. Jede Aufgabe lässt sich vorlesen.

## Für die Lehrkraft

- **Testmodus:** Auf dem Startbildschirm unten „Für Lehrkräfte: Testmodus“. Dann sind alle Stollen sofort offen.
- **Klassengröße:** Insel → Zahnrad. Das Dorf ist fertig, wenn alle Kinder ihren Hauptstollen geschafft haben.
- **Sichern:** Insel → Zahnrad → „Insel sichern“. Der Inselstand liegt nur auf dem Gerät, auf dem die Insel läuft. Bitte immer dasselbe Gerät benutzen oder vorher sichern.
- **Runenwort:** Ist das Dorf fertig, zeigt die Insel ein Runenwort. Damit öffnen die Kinder Kapitel 2.

## Inhalte anpassen

Alle Aufgaben, Themen und Texte stehen in `js/data.js`. Neue Themen für das Meisterstück oder andere Beispielsätze lassen sich dort einfach ergänzen.

## Bilder

Alle Bilder liegen in `bilder/` als PNG. Fehlt ein Bild noch, zeigt die App an seiner Stelle einen beschrifteten Platzhalter. Nach dem Austauschen von Bildern in `sw.js` die Versionsnummer erhöhen, damit die iPads die neuen Bilder laden.

## Technik

Reines HTML, CSS und JavaScript, keine Installation nötig. Gehostet über GitHub Pages, auf dem iPad über „Zum Home-Bildschirm“ als App nutzbar und danach auch offline.

Verwendete Bibliotheken: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT) und [jsQR](https://github.com/cozmo/jsQR) (Apache 2.0).
