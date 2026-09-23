// App-shell service worker: makes the app installable (PWA/TWA requirement) and
// usable offline after the first visit. Network-first for same-origin requests
// (so a normal online visit always gets the latest files, matching serve.ps1's
// no-cache headers for dev), falling back to cache when offline. Cross-origin
// requests (the Anthropic API, the channels backend on a different port) are
// left completely alone -- never intercepted or cached.

const CACHE_NAME = "etc-shell-v1";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./src/style.css",
  "./src/app.js",
  "./src/views.js",
  "./src/authViews.js",
  "./src/channelViews.js",
  "./src/data/content.js",
  "./src/data/stories.js",
  "./src/modules/auth.js",
  "./src/modules/store.js",
  "./src/modules/speech.js",
  "./src/modules/ai.js",
  "./src/modules/channels.js",
  "./src/modules/channelsConfig.js",
  "./src/modules/progression.js",
  "./src/vendor/signalr/signalr.min.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => { /* a missing file shouldn't block install */ })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(req)
      .then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        return resp;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
  );
});
