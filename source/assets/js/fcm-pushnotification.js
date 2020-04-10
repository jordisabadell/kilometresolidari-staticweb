$(document).ready(function() {
    
    var firebaseConfig = {
        apiKey: process.env.APIKEYFIREBASE,
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
    firebase.analytics();

    
});