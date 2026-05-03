self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // basic fetch handler to satisfy PWA requirements
  event.respondWith(fetch(event.request));
});
