var VERSION = '0.1.0';

self.addEventListener('install', function(e){
  e.waitUntil(self.skipWaiting())
});

self.addEventListener('activate', function(e){
  console.log('service worker activated');
  e.waitUntil(self.clients.claim());
});