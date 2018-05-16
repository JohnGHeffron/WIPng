var CACHE_DYNAMIC_NAME = 'Dynamic-v.0';
var HTTPBASE = "http://localhost/mes"; //"http://dev-mes-52/paperless.web.api";

self.addEventListener('install', function(event) {
  console.log("Service worker installed.", event);
})
self.addEventListener('activate', function(event) {
  console.log("Service worker activated.", event);
  return self.clients.claim();
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)  // DEV MODE: NO CACHING
    // caches.match(event.request) // cache with network fallback (PROD MODE)
    //   .then(function(response) {
    //     if (response) {
    //       return response;
    //     } else {
    //       return fetch(event.request)
    //         .then(function(res) {
    //           if (event.request.url.match(/\/api\//i))
    //             return res;
    //           return caches.open(CACHE_DYNAMIC_NAME)
    //             .then(function(cache) {
    //               cache.put(event.request.url, res.clone());
    //               return res;
    //             });
    //         })
    //         .catch(function(err) {

    //         });
    //     }
    //   })
  );
});

importScripts('./js/idb-keyval.js');
//importScripts('./js/idb.js');

var sendMessage = function(msg) {
  return self.clients.matchAll()  // (broadcast to all clients of sw)
  .then(function(clientList) {
    clientList.forEach(function(client) {
      client.postMessage(msg);
    })
  });
};

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-sendTransaction') {                               
    console.log('sync-sendTransaction event fired.', event);
    event.waitUntil(
      idbKeyval.keys().then( keys => {
        for (var key of keys) {
          idbKeyval.get(key).then(value => {
            console.log('sending:', value);
            var ok;
            fetch(HTTPBASE + '/api/labortransaction', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(value)
            })
            .then( response => {
              ok = response.ok;
              if (ok) {
                console.log('transaction sent.');
              } else {
                console.log('failed:', response);
              }
              return response.json();
              //throw new Error('Transaction request failed');
            })
            .then( data => {
              console.log(data);
              idbKeyval.delete(data.uuid);
              sendMessage({ "ok": ok, "message": data.message});
            })
            .catch( err => {
              console.log(err);
              sendMessage("Transaction failed: " + err);
            })
          });
        }
      }))
    }
});
