
const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  try {
    const responseFromNetwork = await fetch(request);

    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }

    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener("activate", (event) =>
  event.waitUntil(enableNavigationPreload())
);

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/service-workers/",
      "/service-workers/index.html",
      "/service-workers/style.css",
      "/service-workers/app.js",
      "/service-workers/gallery/irene-1.jpg",
      "/service-workers/gallery/irene-2.jpg",
      "/service-workers/gallery/irene-3.jpeg",
      "/service-workers/go-4.jpeg",
    ])
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(
      cacheFirst({
        request: event.request,
        preloadResponsePromise: event.preloadResponse,
        fallbackUrl: "/service-workers/gallery/irene-1.jpg",
      })
    )
  );
});
