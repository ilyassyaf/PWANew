const CACHE_NAME = "firstpwa";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/icon.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Using asset from cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Load asset from server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheName) {
      return Promise.all(
        cacheName.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("Service Worker: cache " + cacheName + " deleted");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
