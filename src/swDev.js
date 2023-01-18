
export default function swDev() {
  let swUrl=`${process.env.PUBLIC_URL}/sw.js`
  navigator.serviceWorker.register(swUrl).then((response)=>{
    console.warn("registered service worker",response)
  })
}

// import { openDB, deleteDB, wrap, unwrap } from 'idb';
// console.warn("the sw is in public folder");

// let cacheData= "poschat-cache"
// let db;
// self.addEventListener("install", (event) => {
//     event.waitUntil(
//       caches
//         .open("poschat-cache")
//         .then((cache) =>
//           cache.addAll([
//             '/static/js/bundle.js',
//             '/favicon.ico',
//             '/images/profile-img.png',
//             'images/logo-new.png',
//             'https://fakestoreapi.com/products',
//             '/socket.io/?EIO=4&transport=polling&t=OM60U5Z',
//             '/socket.io/?EIO=4&transport=polling&t=OM617Zw',
//              'http://localhost:3000/cfd',
//                 '/index.html',
//                 '/'
//           ])
//         )
      
//     );
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
    
  // });

  
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
  
// let cacheData= "poschat-cache";
// let db;

// self.addEventListener("install", async (event) => {
//     event.waitUntil(
//       caches
//         .open("poschat-cache")
//         .then((cache) =>
//           cache.addAll([
//             '/static/js/bundle.js',
//             '/favicon.ico',
//             '/images/profile-img.png',
//             'images/logo-new.png',
//             'https://fakestoreapi.com/products',
//             '/socket.io/?EIO=4&transport=polling&t=OM60U5Z',
//             '/socket.io/?EIO=4&transport=polling&t=OM617Zw',
//              'http://localhost:3000/cfd',
//                 '/index.html',
//                 '/'
//           ])
//         )
      
//     );
 

//     try {
//         const connection = await openDB('poschat-db', 1, upgradeDB => {
//             if (!upgradeDB.objectStoreNames.contains('products')) {
//                 upgradeDB.createObjectStore('products', {keyPath: 'url'});
//             }
//             if (!upgradeDB.objectStoreNames.contains('cfd')) {
//                 upgradeDB.createObjectStore('cfd', {keyPath: 'url'});
//             }
//         });
//         console.log('IndexedDB opened successfully:', connection);
//         db = connection;
//     } catch (error) {
//         console.error('Error opening IndexedDB:', error);
//     }
// });

// self.addEventListener("fetch", async (event) => {
//     try {
//         const response = await caches.match(event.request);
//         if (response) {
//             return event.respondWith(response);
//         }
//         const requestUrl = event.request.clone();
//         const fetchResponse = await fetch(requestUrl);
//         event.respondWith(fetchResponse);
//     } catch (error) {
//         console.error('Error in fetch event listener:', error);
//     }
// });


