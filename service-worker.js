const CACHE_NAME = "portfolio-v1";

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.add("/"))
    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            if (response) {
                return response;
            }

            return fetch(event.request).then(networkResponse => {

                if (
                    event.request.method === "GET" &&
                    event.request.url.startsWith("http")
                ) {

                    const copy = networkResponse.clone();

                    caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, copy));

                }

                return networkResponse;

            }).catch(() => caches.match("/index.html"));

        })

    );

});