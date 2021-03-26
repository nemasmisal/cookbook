const sheetCacheName = 'google-fonts-stylesheets';
const fontCacheName = 'google-fonts-webfonts';
const maxAgeSeconds = 60 * 60 * 24 * 30;
const maxEntries = 30;

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.setConfig({
  debug: true,
});

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: sheetCacheName,
  })
);

// Cache the underlying font files with a cache-first strategy for 30 days.
workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.CacheFirst({
    cacheName: fontCacheName,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries,
        maxAgeSeconds
      }),
    ],
    method: 'GET',
    cacheableResponse: { status: [0, 200] },
  })
);
