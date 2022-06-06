// const resources = [
//   "/index.html",
//   "/go-4.jpeg",
//   "/gallery/irene-1.jpg",
//   "/gallery/irene-2.jpg",
//   "/gallery/irene-4.jpeg",
//   "/app.js",
//   "/style.css",
// ];

// async function addResourcesToServiceWorker(resources) {
//   const cache = await caches.open("v1");

//   await cache.addAll(resources);
// }

// self.addEventListener("install", (event) => {
//   event.waitUntil(addResourcesToServiceWorker(resources));
// });

// self.addEventListener("activate", (event) => {
//   console.log("Service worker is handling request");
// });

// self.addEventListener("fetch", (event) => {
//   if (event.request.method != "GET") return;

//   event.respondWith(getResourcesFromCache(event));
// });

// async function getResourcesFromCache(e) {
//   console.log(e.request);
//   const cache = await caches.open("v1");
//   const cachedResponse = await cache.match(e.request);
//   if (cachedResponse) {
//     e.waitUntil(cache.add(e.request));
//     return cachedResponse;
//   }
//   return fetch(e.request);
// }
