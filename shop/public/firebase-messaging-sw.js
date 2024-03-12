importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

firebase.initializeApp({
    // apiKey: "AIzaSyByjYVQ3O1DOumrH1nE7FjyWYS0J1geXDc",
    // authDomain: "knockknock-544cd.firebaseapp.com",
    // projectId: "knockknock-544cd",
    // storageBucket: "knockknock-544cd.appspot.com",
    // messagingSenderId: "713670740363",
    // appId: "1:713670740363:web:6f7a50cce522875705c78e",
    // measurementId: "G-QJ912FE9QL"

    apiKey: "AIzaSyAjYKDoihsJImj70bSBAGfsUOLjpqoWptg",
    authDomain: "foodecomerce-14b6c.firebaseapp.com",
    projectId: "foodecomerce-14b6c",
    storageBucket: "foodecomerce-14b6c.appspot.com",
    messagingSenderId: "303436745611",
    appId: "1:303436745611:web:876716e4836cb23955fd8e",
    measurementId: "G-KVMY79NBVM"
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}

self.addEventListener('push',event=>{
  const data = event.data.json();
  self.registration.showNotification(
      data.notification.title,
      {
          body:data.notification.body,
          image:data.notification.image,
          data:data.data.url
      }
  )
})
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data));
});