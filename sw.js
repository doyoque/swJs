self.addEventListener('install', event => {
    console.log('V1 installing…');
  
    // cache myanee.png
    event.waitUntil(
      caches.open('static-v1').then(cache => cache.add('assets/img/myanee.png'))
    );
  });
  
  self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');
  });
  
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
  
    // serve the myanee.png from the cache if the request is
		// same-origin and the path is '/assets/img/slowpoke.jpeg'
    
    // console.log(url.origin);
    // console.log(location.origin);
    // console.log(url);
    // console.log(url.pathname);
		if (url.origin == location.origin && url.pathname == '/swJs/assets/img/slowpoke.jpeg') {
      event.respondWith(caches.match('assets/img/myanee.png'));
    }
  });
