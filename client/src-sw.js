// Importing required modules from Workbox
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precaching and routing the assets using the manifest file
precacheAndRoute(self.__WB_MANIFEST);

// Creating a new cache strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Adding a plugin to cache responses with status codes 0 and 200
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Adding a plugin to expire the cached responses after 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warming up the cache by caching the specified URLs using the pageCache strategy
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Registering a route for navigation requests using the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Asset caching
const assetCacheName = 'assets-cache';
const assetMatchCallback = ({ request }) =>
  request.destination !== 'document' && request.destination !== 'script';

// Registering a route for non-navigation requests using the StaleWhileRevalidate strategy
registerRoute(
  assetMatchCallback,
  new StaleWhileRevalidate({
    cacheName: assetCacheName,
    plugins: [
      // Adding a plugin to cache responses with status codes 0 and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
