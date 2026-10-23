const CACHE_NAME = 'edimod-cache-v1';
const ASSETS = [
  '/Edimod/',
  '/Edimod/index.html',
  // Tutaj możesz dopisać swoje pliki CSS lub JS, np.:
  // '/Edimod/style.css'
];

// Instalacja i cache'owanie zasobów
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Serwowanie plików z pamięci podręcznej w przypadku braku sieci
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
