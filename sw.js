async function addResource(resources) {
  try {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

self.addEventListener("install", async (event) => {
  event.waitUntil(
    addResource([
      "/index.html",
      "/style.css",
      "/img-list.js",
      "/app.js",
      "/gallery/irene-1.jpg",
      "/gallery/irene-2.jpg",
      "/gallery/irene-4.jpeg",
    ])
  );
});

self.addEventListener("activate", (event) => {
  console.log("sw activate ", event);
});
