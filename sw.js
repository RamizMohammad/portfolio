// ─── Mohammad Ramiz Portfolio — Service Worker ───────────────────────────────
// Strategy per resource type:
//   Hashed assets (/assets/*)  → Cache-First  (immutable, serve from cache forever)
//   index.html                 → Network-First (always try fresh, fallback to cache)
//   Google Fonts               → Stale-While-Revalidate (fast + background refresh)
//   Everything else            → Network-First with cache fallback

const CACHE_VERSION  = "v3";
const SHELL_CACHE    = `portfolio-shell-${CACHE_VERSION}`;
const ASSETS_CACHE   = `portfolio-assets-${CACHE_VERSION}`;
const FONTS_CACHE    = `portfolio-fonts-${CACHE_VERSION}`;

// Core shell files to precache on install
// Vite hashes JS/CSS, but we cache the entry points statically listed here.
// The SW itself handles dynamic hashed assets at runtime.
const PRECACHE_SHELL = [
  "/",
  "/index.html",
];

// ─── Install: precache the shell ─────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      cache.addAll(PRECACHE_SHELL)
    ).then(() => self.skipWaiting())
  );
});

// ─── Activate: delete old cache versions ─────────────────────────────────────
self.addEventListener("activate", (event) => {
  const validCaches = [SHELL_CACHE, ASSETS_CACHE, FONTS_CACHE];
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !validCaches.includes(key))
          .map((key) => {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ─── Fetch: route by request type ────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests from same origin or whitelisted external
  if (request.method !== "GET") return;

  // ── 1. Hashed Vite assets — Cache-First (immutable) ──────────────────────
  // Pattern: /assets/filename.HASH.ext
  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(cacheFirst(request, ASSETS_CACHE));
    return;
  }

  // ── 2. Google Fonts — Stale-While-Revalidate ─────────────────────────────
  if (
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com"
  ) {
    event.respondWith(staleWhileRevalidate(request, FONTS_CACHE));
    return;
  }

  // ── 3. HTML navigation requests — Network-First ───────────────────────────
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, SHELL_CACHE));
    return;
  }

  // ── 4. Same-origin JS/CSS without hash (root level) — Network-First ──────
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request, SHELL_CACHE));
    return;
  }

  // ── 5. Everything else — passthrough (no caching) ────────────────────────
});

// ─── Strategy: Cache-First ────────────────────────────────────────────────────
// Check cache first. If miss → fetch, store, return.
// Perfect for hashed assets that never change.
async function cacheFirst(request, cacheName) {
  const cache    = await caches.open(cacheName);
  const cached   = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("Asset unavailable offline", { status: 503 });
  }
}

// ─── Strategy: Network-First ──────────────────────────────────────────────────
// Always try network. If offline/error → serve from cache.
// Used for index.html so users always get the freshest shell.
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Offline fallback for navigation — return the cached root
    if (request.mode === "navigate") {
      const fallback = await cache.match("/");
      if (fallback) return fallback;
    }
    return new Response("You are offline", {
      status: 503,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// ─── Strategy: Stale-While-Revalidate ────────────────────────────────────────
// Serve from cache immediately (fast), then refresh cache in background.
// Perfect for fonts — user gets instant load, cache stays fresh.
async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Kick off network fetch in background regardless
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  // Return cached immediately if available, else wait for network
  return cached || fetchPromise;
}