// Service Worker — Background GPS & Keep-Alive
const CACHE_NAME = 'tracker-v1';

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

// Background sync — keep location alive
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'KEEP_ALIVE') {
        // Respond to keep browser process alive
        event.ports[0] && event.ports[0].postMessage({ alive: true });
    }
});

// Periodic background fetch to keep connection alive
self.addEventListener('fetch', event => {
    // Let normal requests pass through
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 200 })));
});
