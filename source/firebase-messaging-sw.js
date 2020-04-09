 importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js');

 var firebaseConfig = {
  apiKey: "___APIKEYFIREBASE___",
  authDomain: "kilometresolidari-static-web.firebaseapp.com",
  databaseURL: "https://kilometresolidari-static-web.firebaseio.com",
  projectId: "kilometresolidari-static-web",
  storageBucket: "kilometresolidari-static-web.appspot.com",
  messagingSenderId: "224806508824",
  appId: "1:224806508824:web:15a26221dde55bdcf5a66d",
  measurementId: "G-QFHE8T259X"
};

// Initialize Firebase.
firebase.initializeApp(firebaseConfig); 

const messaging = firebase.messaging();

// App notification message.
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Message background received! ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
      body: payload.notification.body
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});