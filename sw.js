/** a. Cache first strategy
 *
 * 1. search in caches
 * 2. if in caches,
 * 3.   then response with cache
 * 4. else
 * 5.    requet from network (optionally update the cache)
 *
 */

/**
 * b. Network first
 *
 * 1. fetch from network
 * 2. if request is fullfilled
 * 3.   then response the fullfilled request
 * 4. else
 * 5.   search in caches and return from cache
 */

/**
 * c. Stale While Revaliate
 *
 * 1. return from caches immediately
 * 2. then request from network
 * 3. then clone response from network4
 * 4. then update the cache so it can response with the latest version on the next visit
 */

/**
 * d. Network Only
 * 1. just return from network
 */

/**
 * e. Cache Only
 * 1. just return from cache 
 */

const CACH_VERSION_ONE = "cache-v1";

async function cacheFirst(e) {
  const response = await caches.match(e.request); // a.1
  if (response) {
    // a.2
    return response; // a.3
  } else {
    // error handling omitted :(
    return fetch(e.request); // a.4
  }
}

async function networkFirst(e) {
  try {
    const response = await fetch(e.request); // b.1
    return response; // b.2, b.3
  } catch (error) {
    // b.4,
    return caches.match(e.request); // b.5
  }
}

async function staleWhileRevalidate(e) {
  const responseFromCache = await caches.match(e.request);
  const responseFromNetwork = await fetch(e.request);

  const cache = await caches.open(CACH_VERSION_ONE);
  const clonedResponseFromNetwork = responseFromNetwork.clone();

  cache.put(e.request, clonedResponseFromNetwork);

  return responseFromCache || clonedResponseFromNetwork;
}

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event));
});
