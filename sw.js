const CACHE='cardbound-v34';
const ASSETS=['./styles.css','./upgrade.css','./progression-v2.css','./ui-v11.css','./ui-v12.css','./foils.css','./foil-fragments.css','./new-card-overlay.css','./pack-results-mobile.css','./core-ui-fix.css','./bank-collection-v18.css','./sailing.css','./gods-raids-v20.css','./activity-filters-v21.css','./home-groups-v23.css','./app.js','./upgrade.js','./progression-v2.js','./content-expansion.js','./combat-styles.js','./combat-menu-fix.js','./image-fix.js','./pack-flow.js','./ui-v11.js','./collection-odds-slayer.js','./foils.js','./foil-fragments.js','./new-card-overlay.js','./sailing-content.js','./gods-raids-v20.js','./tzhaar-expansion-v22.js','./core-ui-fix.js','./bank-collection-v18.js','./gods-raids-ui-v20.js','./activity-filters-v21.js','./home-groups-v23.js','./sailing-native-v33.js','./sailing-idle-v34.js','./manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html')).then(async r=>{if(r){const c=await caches.open(CACHE);c.put('./index.html',r.clone()).catch(()=>{});}return r;}));
    return;
  }
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request)));
});