<!-- Add Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js"></script>

<script>
  // Initialize Firebase with your project config
  var firebaseConfig = {
    apiKey: "AIzaSyDCJG4Qofv8thUCAnZfuw4ERfdiC3RxneI",
    authDomain: "valid-logic-297506.firebaseapp.com",
    projectId: "valid-logic-297506",
    storageBucket: "valid-logic-297506.appspot.com",
    messagingSenderId: "988071547876",
    appId: "1:988071547876:web:357a0c9b7dffe83a72edf1",
    measurementId: "G-1RL1GQHT5G"
  };
  firebase.initializeApp(firebaseConfig);

  // Get Firebase Messaging instance
  const messaging = firebase.messaging();

  // Request permission and get token
  messaging.requestPermission().then(() => {
    console.log('Notification permission granted.');
    return messaging.getToken();
  }).then((token) => {
    console.log('Token:', token);
    // Send the token to your server to associate with the user
  }).catch((error) => {
    console.error('Error getting notification permission or token:', error);
  });

  // Handle incoming messages
  messaging.onMessage((payload) => {
    console.log('Message received:', payload);
    // Handle the incoming message
  });
</script>
