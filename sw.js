const CACHE = 'egg-trading-v2';
const ASSETS = ['./index.html', './order.html', './manifest.json'];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
    ))
  );
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    fetch(e.request, {cache:'no-store'}).catch(()=>caches.match(e.request))
  );
});
