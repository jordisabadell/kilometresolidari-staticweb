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

    // Retrieve Firebase Messaging object.
    const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null

    if(messaging!=null) {

        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(() => {
            messaging.getToken().then((refreshedToken) => {
                console.log('Token refreshed.');
                console.log(currentToken);
                
                // Indicate that the new Instance ID token has not yet been sent to the app server.
                setTokenSentToServer(false);

                // Send Instance ID token to app server.
                sendTokenToServer(refreshedToken);

                // Display new Instance ID token and clear UI of all previous messages.
                resetUI();

            }).catch((err) => {
                console.log('Unable to retrieve refreshed token. ', err);
            });
        });

        // Handle incoming messages. Called when:
        // - a message is received while the app has focus
        // - the user clicks on an app notification created by a service worker
        //   `messaging.setBackgroundMessageHandler` handler.
        messaging.onMessage((payload) => {
            console.log('Message foreground received! ', payload);

            // Update the UI to include the received message.
            appendMessage(payload);
        });

        // Reset UI on page load.
        resetUI();
    }

    /**
     * Reset User Interface (UI).
     */
    function resetUI() {
        clearMessages();
        console.log('loading...');

        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken().then((currentToken) => {
            if (currentToken) {
                console.log('Exists current token.');
                console.log(currentToken);
                
                sendTokenToServer(currentToken);
            } else {
                console.log('No Instance ID token available. Request permission to generate one.');

                //Show permission request and sentToServer=0
                setTokenSentToServer(false);
            }
        }).catch((err) => {
            console.log('Error retrieving Instance ID token. ', err);
            setTokenSentToServer(false);
        });
    }

    /**
     * Send the Instance ID token your application server, so that it can:
     * - send messages back to this app
     * - subscribe/unsubscribe the token from topics
     * @param {string} currentToken 
     */
    function sendTokenToServer(currentToken) {
        
        if (!isTokenSentToServer()) {
            console.log('Sending token to server...');
            setTokenSentToServer(true); // sentToServer=1
        } else {
            console.log('Token already sent to server so won\'t send it again unless it changes.');
        }

        // ¿Allways subscribes?
        subscribeToTopic(currentToken, "kilometresolidari");
    }

    /**
     * Request permission.
     */
    function requestPermission() {
        console.log('Requesting permission...');

        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                
                // In many cases once an app has been granted notification permission,
                // it should update its UI reflecting this.
                resetUI();

            } else {
                console.log('Unable to get permission to notify.');
            }
        });
    }

    /**
     * Delete Instance ID token.
     */
    function deleteToken() {
        messaging.getToken().then((currentToken) => {
            messaging.deleteToken(currentToken).then(() => {
                console.log('Token deleted.');
                
                setTokenSentToServer(false); // sentToServer=0

                resetUI();

            }).catch((err) => {
                console.log('Unable to delete token. ', err);
            });
        }).catch((err) => {
            console.log('Error retrieving Instance ID token. ', err);
        });
    }

    /**
     * Save flag to local storage .
     */
    function isTokenSentToServer() {
        return window.localStorage.getItem('sentToServer') === '1';
    }

    /**
     * Set flag to local storage.
     * @param {boolean} sent 
     */
    function setTokenSentToServer(sent) {
        window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    }

    /**
     * Subscribe to topic.
     * @param {string} currentToken
     * @param {string} topicName
     */
    function subscribeToTopic(currentToken, topicName) {

        $.ajax("https://iid.googleapis.com/iid/v1/"+currentToken+"/rel/topics/"+topicName, {
            type: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key="+process.env.SERVERKEYFCM
            }
        }).done(function (data) {
            console.log('Subscription to topic \''+ topicName + '\' done!');

        }).fail(function (xhr, status, err) {
            console.log('Error subscribing to topic \''+ topicName + '\'.', err);
        });
    }

    /**
     * Add a message to the messages element. * 
     * @param {*} payload 
     */
    function appendMessage(payload) {

        const messagesElement = document.querySelector('#messages');
        const dataHeaderELement = document.createElement('h5');
        const dataElement = document.createElement('pre');
        dataElement.style = 'overflow-x:hidden;';
        dataHeaderELement.textContent = 'Received message:';
        dataElement.textContent = JSON.stringify(payload, null, 2);
        messagesElement.appendChild(dataHeaderELement);
        messagesElement.appendChild(dataElement);
    }

    /**
     * Clear the messages element of all children.
     */
    function clearMessages() {
        const messagesElement = document.querySelector('#messages');
        if(messagesElement!=null) {
            while (messagesElement.hasChildNodes()) {
                messagesElement.removeChild(messagesElement.lastChild);
            }
        }
    }
});