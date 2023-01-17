
// import { openDB, deleteDB, wrap, unwrap } from 'idb';
console.warn("the sw is in public folder");

let cacheData= "poschat-cache"
let db;
self.addEventListener("install", (event) => {
    event.waitUntil(
      caches
        .open("poschat-cache")
        .then((cache) =>
          cache.addAll([
            '/static/js/bundle.js',
            '/favicon.ico',
            '/images/profile-img.png',
            'images/logo-new.png',
            'https://fakestoreapi.com/products',
            '/socket.io/?EIO=4&transport=polling&t=OM60U5Z',
            '/socket.io/?EIO=4&transport=polling&t=OM617Zw',
             'http://localhost:3000/cfd',
                '/index.html',
                '/'
          ])
        )
      
    );
// openDB('poschat-db', 1, upgradeDB => {
//       alert(upgradeDB.version);
//       if (!upgradeDB.objectStoreNames.contains('products')) {
//         upgradeDB.createObjectStore('products', {keyPath: 'url'});
//       }
//       if (!upgradeDB.objectStoreNames.contains('cfd')) {
//         upgradeDB.createObjectStore('cfd', {keyPath: 'url'});
//       }
//     }).then(connection => {
//       db = connection;
//     });
    alert("working")
  });

  self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request).then((resp)=>{
            if(resp){
                return resp;
            }
            let requestUrl=event.request.clone();
            fetch(requestUrl)
        })
    )
  })
  // import idb from 'idb';

  // console.warn("the sw is in public folder");
  
  
  // let cacheData= "poschat-cache";
  // let db;
  
  // self.addEventListener("install", (event) => {
  //   event.waitUntil(
  //     caches
  //       .open("poschat-cache")
  //       .then((cache) =>
  //         cache.addAll([
  //           '/static/js/bundle.js',
  //           '/favicon.ico',
  //           '/images/profile-img.png',
  //           'images/logo-new.png',
  //           'https://fakestoreapi.com/products',
  //           '/socket.io/?EIO=4&transport=polling&t=OM60U5Z',
  //           '/socket.io/?EIO=4&transport=polling&t=OM617Zw',
  //            'http://localhost:3000/cfd',
  //               '/index.html',
  //               '/'
  //         ])
  //       )
  //   );
  //   console.log("working code ");
  //   // open a connection to the IndexedDB
  //   idb.open('poschat-db', 1, upgradeDB => {
  //     upgradeDB.createObjectStore('products', {keyPath: 'url'});
  //   upgradeDB.createObjectStore('cfd', {keyPath: 'url'});
  //   }).then(connection => {
  //     db = connection;
  //     console.log("error thorugh");
  //   });
  // });
  // console.log("connection sucessfully done");
  // self.addEventListener("fetch", (event) => {
  //   event.respondWith(
  //     caches.match(event.request).then((response) => {
  //       if (response) {
  //         return response;
  //       }
  //       return fetch(event.request).then((networkResponse) => {
  //         if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
  //           return networkResponse;
  //         }
  //         const responseToCache = networkResponse.clone();
  //         caches.open(cacheData).then((cache) => {
  //           cache.put(event.request, responseToCache);
  //         });
  // console.log("workinggggggg",responseToCache);
  //         if (event.request.url.includes("http://localhost:3000/")) {
  //           const tx = db.transaction("products", "readwrite");
  //           tx.objectStore("products").put(responseToCache, event.request.url);
  //           return tx.complete.then(() => {
  //             return networkResponse;
        
  //           });
            
  //         }
       
  //          else if (event.request.url.includes("http://localhost:3000/cfd")) {
  //           const tx = db.transaction("cfd", "readwrite");
  //           tx.objectStore("cfd").put(responseToCache, event.request.url);
  //           return tx.complete.then(() => {
  //             return networkResponse;
  //           });
  //         } else {
  //           return networkResponse;
  //         }
  //       });
  //     })
  //   );
  // });
  // console.log("done",networkResponse);
  // self.addEventListener("fetch",(event)=>{
  //   event.respondWith(
  //       caches.match(event.request).then((resp)=>{
  //           if(resp){
  //               return resp;
  //           }
  //           let requestUrl=event.request.clone();
  //           return fetch(requestUrl).then((response)=>{
  //               if(!response || response.status !== 200 || response.type !== 'basic'){
  //                   return response;
  //               }
  //               let responseToCache=response.clone();
  //               caches.open(cacheData).then((cache)=>{
  //                   cache.put(event.request,responseToCache)
  //               });
  //               // store the data in the IndexedDB
  //               const tx = db.transaction('data', 'readwrite');
  //               tx.objectStore('data').put(responseToCache, event.request.url);
  //               return tx.complete.then(() => {
  //                 return response;
  //               });
    
  //           });
  //       })
  //   )
  // });
  //  self.addEventListener('fetch', event => {
  //     if (event.request.url.startsWith('https://fakestoreapi.com/products')) {
  //       event.respondWith(
  //         caches.match(event.request).then(response => {
  //           if (response) {
  //             return response;
              
  //           }
           
  //           return fetch(event.request).then(response => {
  //             if (!response || response.status !== 200) {
  //               return response;
  //             }
  //  const responseToCache = response.clone();
  //             caches.open('cacheData').then(cache => {
  //               cache.put(event.request, responseToCache);
  //               console.log("working");
  //             });
  //             return response;
            
  //           });
  //         })
  //       );
  //     }
  //   });