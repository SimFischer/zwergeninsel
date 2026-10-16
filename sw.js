/* Zwergeninsel – Offline-Speicher
   Beim Start wird alles Wichtige zwischengespeichert. Danach läuft die App auch ohne WLAN.
   Nach jeder Änderung an der App die Versionsnummer erhöhen. */
const VERSION = 'zwergeninsel-v3';
const KERN = [
  './', 'index.html', 'insel.html', 'manifest.webmanifest',
  'css/spiel.css', 'css/insel.css',
  'js/data.js', 'js/data-k2.js', 'js/data-k3.js', 'js/pass.js', 'js/gemeinsam.js', 'js/app.js', 'js/insel.js',
  'js/lib/qrcode.js', 'js/lib/jsQR.js',
  'bilder/app-icon.png', 'bilder/app-icon-192.png',
];

const BILDER = [
  'zwerg-01-brumm', 'zwerg-02-hilda', 'zwerg-03-tarek', 'zwerg-04-lina', 'zwerg-05-kira', 'zwerg-06-ole',
  'zwerg-07-fenno', 'zwerg-08-mira', 'zwerg-09-bodo', 'zwerg-10-amara', 'zwerg-11-grimbart', 'zwerg-12-rubina',
  'meisterin-erklaert', 'meisterin-jubelt', 'meisterin-tipp', 'meisterin-ermutigt', 'kobold-frech', 'kobold-chaos',
  'kobold-besiegt', 'schmiede-hintergrund', 'amboss', 'hammer', 'eisen-roh', 'eisen-gluehend',
  'axt-stumpf', 'axt-scharf', 'schleifstein', 'runenplatte', 'truhe-zu', 'truhe-offen',
  'titel-hintergrund', 'stollen-hintergrund', 'zwergenrat-hintergrund', 'vulkan-hintergrund', 'fest-szene', 'insel-grund',
  'lagerfeuer', 'lagerfeuer-ruine', 'huette1', 'huette1-ruine', 'huette2', 'huette2-ruine',
  'huette3', 'huette3-ruine', 'werkstatt', 'werkstatt-ruine', 'steg', 'steg-ruine',
  'bibliothek', 'bibliothek-ruine', 'ratsplatz', 'ratsplatz-ruine', 'brunnen', 'brunnen-ruine',
  'muehle', 'muehle-ruine', 'leuchtturm', 'leuchtturm-ruine', 'festhalle', 'festhalle-ruine',
  'schiff', 'schiff-ruine', 'fahne', 'laterne', 'kristall-laterne', 'blumenbeet',
  'bank', 'faesser', 'statue', 'wegweiser', 'gemuesegarten', 'ziegen',
  'holz', 'stein', 'eisen', 'edelstein', 'stern', 'schloss',
  'pergament', 'holzschild', 'steinrahmen', 'zwergenpass-karte',
].map((n) => 'bilder/' + n + '.png');

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION)
    .then((c) => c.addAll(KERN).then(() => Promise.allSettled(BILDER.map((b) => c.add(b))))) // fehlende Bilder sind kein Problem
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

/* Erst das Netz fragen (damit Updates ankommen), sonst den Zwischenspeicher nehmen.
   Bilder und Schriften: erst Zwischenspeicher, das spart Datenvolumen. */
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const statisch = url.pathname.includes('/bilder/') || url.hostname.includes('fonts.g');
  if (statisch) {
    e.respondWith(caches.match(req).then((treffer) => treffer || fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) { const kopie = res.clone(); caches.open(VERSION).then((c) => c.put(req, kopie)); }
      return res;
    })));
    return;
  }
  e.respondWith(fetch(req).then((res) => {
    if (res && res.ok && url.origin === location.origin) { const kopie = res.clone(); caches.open(VERSION).then((c) => c.put(req, kopie)); }
    return res;
  }).catch(() => caches.match(req)));
});
