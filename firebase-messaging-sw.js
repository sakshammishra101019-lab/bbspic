// firebase-messaging-sw.js
// IMPORTANT: This file must be uploaded to your website's ROOT folder
// (the same folder as index.html), NOT inside a subfolder â€” service
// workers can only control pages at or below the folder they live in.
//
// This handles push notifications that arrive while the site is
// closed or in the background. Foreground (tab open) notifications
// are handled directly inside index.html via onMessage().

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Use the SAME config as firebaseConfigMain in index.html
firebase.initializeApp({
    apiKey: "AIzaSyDPtoqhJwIKn6jQozLaVsWD8kIRLpqN3gw",
    authDomain: "shops-5837f.firebaseapp.com",
    databaseURL: "https://shops-5837f-default-rtdb.firebaseio.com",
    projectId: "shops-5837f",
    storageBucket: "shops-5837f.firebasestorage.app",
    messagingSenderId: "885595216345",
    appId: "1:885595216345:web:236d79985a6cb99b5e21c8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const title = (payload.notification && payload.notification.title) || 'B.B.S. Public Inter College';
    const options = {
        body: (payload.notification && payload.notification.body) || '',
        icon: 'https://i.ibb.co/rSFQSJ0/1783599477803.png',
        badge: 'https://i.ibb.co/rSFQSJ0/1783599477803.png'
    };
    self.registration.showNotification(title, options);
});
