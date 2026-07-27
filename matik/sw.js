const CACHE = 'matik-v2';
const FILES = [
  '/matik/',
  '/matik/index.html',
  '/matik/manifest.json',
  '/matik/math_icon_192.png',
  '/matik/math_icon_512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(cached => cached || fetch(e.request))
  );
});
