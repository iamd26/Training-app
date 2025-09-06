
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('tp-cache-v3').then(cache => cache.addAll([
      './',
      './index.html',
      './manifest.webmanifest',
      './icons/icon-192.png',
      './icons/icon-512.png'
    ]))
  );
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== 'tp-cache-v3').map(k => caches.delete(k))))
    .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
