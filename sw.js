const CACHE_NAME = 'vitae-cache-v1';
// Resolve app-shell URLs relative to wherever this worker is actually
// served from, so this works at a domain root or under a subpath.
const BASE = new URL('.', self.location).href;
const APP_SHELL = [
  BASE,
  `${BASE}index.html`,
  `${BASE}styles.css`,
  `${BASE}manifest.webmanifest`,
  `${BASE}icon.svg`,
  `${BASE}main.js`,
  `${BASE}app.js`,
  `${BASE}store.js`,
  `${BASE}schema.js`,
  `${BASE}themes.js`,
  `${BASE}templates.js`,
  `${BASE}formPanel.js`,
  `${BASE}photoUploader.js`,
  `${BASE}templateSelector.js`,
  `${BASE}livePreview.js`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Only manage same-origin requests; let CDN module fetches go straight
  // to the network (the browser's own HTTP cache handles those fine).
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
