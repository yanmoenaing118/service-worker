const resources = [
  "/",
  "/gallery/irene-1.jpg",
  "/gallery/irene-2.jpg",
  "/gallery/irene-4.jpeg",
  "/gallery/go-4.jpeg",
  "/gallery/wendy.jpg",
  "/app.js",
  "/style.css",
  "/mp3/psycho.mp3"
];

const enableNavigationPreload = async ()=> {
  if(self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
}

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  const preloadResponse = await preloadResponsePromise;
  if(preloadResponse){
    console.log("using preload response", preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
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

    return new Response("Nework error happened", {
      status: 408,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};

const addResourcesToCaches = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCaches(resources));
});

self.addEventListener("active", (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: "/gallery/wendy.jpg",
    })
  );
});