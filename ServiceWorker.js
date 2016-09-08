// This file is a service worker!
// See https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API

const precached = [
	'/',
	'/dist/App.js',
]

const cacheName = 'app-cache-v0.1';

// on worker install
self.addEventListener('install', function(event) {
	console.log('Installed', event);
	const promise = self.caches.open(cacheName)
		.then(cache => cache.addAll(precached))
		.then(self.skipWaiting);

	event.waitUntil(promise)
});

// on worker becomes active
self.addEventListener('activate', function(event) {
	console.log('Activated', event);
	event.waitUntil(self.clients.claim());
});

// on network request
self.addEventListener('fetch', function(event) {
	// use our cache to speed up loads.
	event.respondWith(
		self.caches.match(event.request)
			.then(response => {
				if (response) {
					console.log('cache hit: ', event.request);
					return response;
				}

				return Promise.all([
					fetch(event.request),
					self.caches.open(cacheName).catch(() => null)
				])
					.then(results => {
						const res = results[0];
						const cache = results[1];
						if (cache) {
							cache.put(event.request, res);
						}
						return res;
					})
			})
	)
})
