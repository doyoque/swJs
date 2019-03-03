var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/img/myanee.png'
];

self.addEventListener('install', function(event) {
  //perform install steps
  /*
  1. open cache
  2. cache our files
  3. confirm whether all the required assets are cached or not
  */

  event.waitUntil(
      caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
    );

  self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
          // cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request).then(
              function(response) {
                // check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });

                return response;
              }
            );
        })
      );
  });

  self.addEventListener('activate', function(event) {
    var cacheWhiteList = ['pages-cache-v1', 'blog-posts-cache-v1'];

    event.waitUntil(
      caches.keys().then(function(cachesNames) {
        return Promise.all(
            cachesNames.map(function(cachesName) {
              if (cacheWhiteList.indexOf(cachesName) === -1) {
                return caches.delete(cachesName);
              }
            })
          );
      })
      );
  });

});