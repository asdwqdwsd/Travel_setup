/* Offline support for the Sapporo trip planner.
   Page: network first (so updates show when online), cached copy when offline.
   Leaflet (self-hosted), fonts and icons: cache first. */
const CACHE = 'travel-setup-c144ab9d';
const CORE = ['./', './index.html', './leaflet.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './photos/beer.jpg', './photos/canal.jpg', './photos/futami.jpg', './photos/jingu.jpg', './photos/jshrine.jpg', './photos/kaitaku.jpg', './photos/kitaichi.jpg', './photos/moere.jpg', './photos/moiwa.jpg', './photos/morinoyu.jpg', './photos/nijo.jpg', './photos/odori.jpg', './photos/orgel.jpg', './photos/shikotsu.jpg', './photos/shiroi.jpg', './photos/tanuki.jpg'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // GitHub Pages sends Cache-Control: max-age=600, so a plain fetch() can return the
        // browser's own HTTP cache instead of the network — defeating "network first" for up
        // to 10 minutes after any earlier load. no-store forces an actual round trip.
        const res = await fetch(req, { cache: 'no-store' });
        if (res.ok) {
          const cache = await caches.open(CACHE);
          cache.put('./index.html', res.clone());
        }
        return res;
      } catch (e) {
        return (await caches.match(req)) || (await caches.match('./index.html'));
      }
    })());
    return;
  }

  const cacheable = url.origin === self.location.origin
    || url.hostname === 'fonts.googleapis.com'
    || url.hostname === 'fonts.gstatic.com';
  if (!cacheable) return;

  event.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) {
      const cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  })());
});
