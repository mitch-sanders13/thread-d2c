// Bump on every behavioral change so the activate handler evicts stale caches
// on existing clients.
const CACHE_NAME = 'v2_cache';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

// Network-first for HTML so theme edits go live immediately for every visitor.
// The previous cache-first strategy fossilized the homepage in every browser
// that had ever loaded the site, and only a manual site-data wipe could fix it.
// For non-HTML requests we don't intercept — Shopify CDN assets are
// fingerprinted and the browser's HTTP cache already handles them correctly.
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;
  if (request.mode !== 'navigate' && request.destination !== 'document') return;

  event.respondWith(
    fetch(request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request))
  );
});
