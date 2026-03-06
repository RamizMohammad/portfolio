import { useEffect, useRef } from "react";

// ─── useServiceWorker ─────────────────────────────────────────────────────────
// Registers /sw.js, detects when a new version is available,
// and automatically activates it so users get updates on next navigation.
//
// Usage: call once at app root — useServiceWorker()
// ─────────────────────────────────────────────────────────────────────────────
export function useServiceWorker() {
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Service workers only work on HTTPS (or localhost)
    if (!("serviceWorker" in navigator)) return;

    let intervalId: ReturnType<typeof setInterval>;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          // scope "/" means SW controls all pages under the domain
          scope: "/",
          // updateViaCache: "none" tells the browser to always validate sw.js
          // against the network, bypassing HTTP cache — critical for getting updates
          updateViaCache: "none",
        });

        registrationRef.current = reg;

        // ── Detect new SW waiting to activate ──────────────────────────────
        const onUpdateFound = () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            // New SW has installed and is waiting — activate immediately
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              console.log("[SW] New version available — activating");
              // Tell the waiting SW to skip waiting and take control
              newWorker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        };

        reg.addEventListener("updatefound", onUpdateFound);

        // ── Auto-reload when new SW takes control ──────────────────────────
        // After skipWaiting, the new SW fires controllerchange.
        // We reload so the user gets the fresh assets.
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (refreshing) return;
          refreshing = true;
          window.location.reload();
        });

        // ── Periodically check for updates (every 30 min) ─────────────────
        // Useful for long open tabs — recruiter leaves your portfolio open
        intervalId = setInterval(() => {
          reg.update().catch(() => {}); // silent — user may be offline
        }, 30 * 60 * 1000);

        console.log("[SW] Registered — scope:", reg.scope);

      } catch (err) {
        // Silently fail — app works fine without SW
        console.warn("[SW] Registration failed:", err);
      }
    };

    // Defer registration until after page load so it doesn't
    // compete with critical resources during first paint
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }

    return () => {
      clearInterval(intervalId);
    };
  }, []);
}