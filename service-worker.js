const CACHE_NAME = "mc21-v1.0.7";
var urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/src/nav.html",
  "/src/pages/home.html",
  "/src/pages/about.html",
  "/src/pages/product.html",
  "/src/pages/contact.html",
  "/src/css/main.css",
  "/src/css/materialize.css",
  "/src/js/main.js",
  "/src/js/materialize.js",
  "/src/images/about.jpg",
  "/src/images/contact.jpg",
  "/src/images/parallax.jpg",
  "/src/images/product.jpg",
  "/src/images/icons/back-sidenav.jpg",
  "/src/images/icons/Logo-MC21.png",
  "/src/images/icons/icons.woff2",
  "/src/images/slider/slide-1.jpg",
  "/src/images/slider/slide-2.jpg",
  "/src/images/slider/slide-3.jpg",
  "/src/images/slider/slide-4.jpg",
  "/src/images/clients/client-1.png",
  "/src/images/clients/client-2.png",
  "/src/images/clients/client-3.png",
  "/src/images/clients/client-4.png",
  "/src/images/clients/client-5.png",
  "/src/images/clients/client-6.png",
  "/src/images/clients/client-7.png",
  "/src/images/clients/client-8.png",
  "/src/images/products/accounting.jpeg",
  "/src/images/products/hardware.jpeg",
  "/src/images/products/POS-Huge.jpeg",
  "/src/images/products/POS-Midi.png",
  "/src/images/products/pos.jpeg",
  "/src/images/products/website.jpg",
  "/src/images/products/werehouse.jpg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus.");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
