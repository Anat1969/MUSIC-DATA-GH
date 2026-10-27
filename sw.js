/* DataSong service worker.
   דפים וקוד: מהרשת קודם, כדי שכל עדכון יגיע מיד; המטמון רק לגיבוי בלי רשת.
   תמונות ונכסים: מהמטמון קודם, כי הם לא משתנים. */
const CACHE = 'datasong-v3';
const CORE = ['./', './index.html', './styles.css', './app.js', './article.html', './icon.svg', './manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isAsset = /\.(webp|png|jpg|svg|woff2?|pdf|docx)$/.test(url.pathname) || url.hostname.includes('fonts.g');
  if (isAsset) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
      return res;
    })));
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(fetch(req).then(res => {
    const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res;
  }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html'))));
});
