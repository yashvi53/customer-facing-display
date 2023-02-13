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
//     let request = indexedDB.open("poschat", 1);
//     request.onupgradeneeded = function(event) {
//       db = event.target.result;
//       let objectStore = db.createObjectStore("products", {keyPath: "id"});
//       console.log(objectStore.keyPath);
//       console.log(db.objectStoreNames.contains("products"))
//     };
//     request.onsuccess = function(event) {
//         db = event.target.result;
//     };
//     request.onerror = function(event) {
//         console.log("Error while opening DB: ", event)
//     }
// });

// self.addEventListener("fetch",(event)=>{
//     event.respondWith(
//         caches.match(event.request).then((resp)=>{
//             if(resp){
//                 return resp;
//             }
//             let requestUrl=event.request.clone();
//             return fetch(requestUrl)
//               .then(response => {
//                 if(event.request.url.includes('https://fakestoreapi.com/products')) {
//                     return response.json().then(json => {
//                         json.products.forEach(product => {
//                             addProduct(product);
//                         });
//                         return response;
//                     });
//                 } else {
//                     return response;
//                 }
//               })
//               .catch(error => {
//                 console.log("Error while fetching: ", error);
//               });
//         })
//     )
// });

// console.log("...........");
// function addProduct(product) {
//     console.log(product);
//     let transaction = db.transaction(["products"], "readwrite");
//     let objectStore = transaction.objectStore("products");
//     let request = objectStore.put(product);
//     request.onsuccess = function() {
//         console.log("Product has been added to the object store.");
//     };
//     request.onerror = function(event) {
//         console.log("Error while adding product: ", event);
//     }
// }

// self.addEventListener("fetch", async (event) => {
//     try {
//         const response = await caches.match(event.request);
//         if (response) {
//             return event.respondWith(response);
//         }
//         const requestUrl = event.request.clone();
//         const fetchResponse = await fetch(requestUrl);

//         if (!fetchResponse || fetchResponse.status !== 200) {
//             throw new Error(`Fetch response was unsuccessful: ${fetchResponse.status}`);
//         }

//         const cache = await caches.open(cacheData);
//         event.waitUntil(cache.put(event.request, fetchResponse.clone()));

//         event.respondWith(fetchResponse);
//     } catch (error) {
//         console.error('Error in fetch event listener:', error);
//     }
// });
