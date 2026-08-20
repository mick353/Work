/**
 * Offline service worker for the GitHub Pages build.
 *
 * The shell is one HTML file, so the precache is tiny: the document, the
 * manifest and the icons. 3c6573ae96f5 is replaced at build time with a
 * hash of the generated HTML, so a new release always busts the cache rather
 * than leaving someone stuck on an old copy of the course.
 *
 * The 98 deck slides are deliberately NOT precached. Pushing 2.5 MB of images
 * at every visitor on first load — most of whom will never open a slide — is
 * exactly what the separate-files build was for. They fall through to the
 * cache-first rule below instead, so each one is stored the first time it is
 * actually viewed and is available offline from then on.
 *
 * Strategy: network-first for the document (so a released update is picked up
 * as soon as there is signal), cache-first for static assets, and a cached
 * fallback whenever the network is unavailable.
 */

const VERSION = "3c6573ae96f5";
const CACHE = `product-practice-${VERSION}`;
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isDocument = request.mode === "navigate" || request.destination === "document";

  if (isDocument) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html").then((cached) => cached ?? caches.match("./"))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ??
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});

// Lets the page ask for an immediate update after a new version is found.
self.addEventListener("message", (event) => {
  if (event.data === "skip-waiting") self.skipWaiting();
});
