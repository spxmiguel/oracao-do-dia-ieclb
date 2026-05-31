const CACHE_VERSION_KEY = "primeiros-minutos/cache-version";
const CACHE_VERSION = "2026-05-31-redirect-only-auth-cache-reset";

export const refreshOldPwaCache = async (): Promise<void> => {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(CACHE_VERSION_KEY) === CACHE_VERSION) return;

  window.localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION);

  if (!("serviceWorker" in navigator)) return;

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.unregister()));

  if ("caches" in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
  }

  if (navigator.serviceWorker.controller) {
    window.location.reload();
  }
};
