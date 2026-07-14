// firebase-messaging-sw.js
// IMPORTANT: This file must be uploaded to your website's ROOT folder
// (the same folder as index.html), NOT inside a subfolder — service
// workers can only control pages at or below the folder they live in.

// 1. CLICK HANDLING (MUST BE AT THE VERY TOP to avoid getting overridden by Firebase SDK)
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Notification popup ko dismiss karein
    
    // URL fallback setup karein
    let targetUrl = '/';
    if (event.notification.data && event.notification.data.url) {
        targetUrl = event.notification.data.url;
    }

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Agar browser mein already school ki tab open hai, toh use focus karein
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    if (client.url !== targetUrl && 'navigate' in client) {
                        client.navigate(targetUrl);
                    }
                    return client.focus();
                }
            }
            // Agar tab open nahi hai, toh new window open karein
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});

// 2. IMPORT COMPAT SDKS
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// 3. INITIALIZE APP (Use the SAME config as index.html)
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

// 4. BACKGROUND MESSAGE LISTENER
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background message received:', payload);

    // Dynamic extraction: notification block aur data block dono se keys extract karein
    const title = (payload.notification && payload.notification.title) || 
                  (payload.data && payload.data.title) || 
                  'B.B.S. Public Inter College';

    const body = (payload.notification && payload.notification.body) || 
                 (payload.data && payload.data.body) || 
                 'Naya announcement dekhein!';

    const image = (payload.notification && payload.notification.image) || 
                  (payload.data && (payload.data.image || payload.data.icon)) || 
                  'https://i.ibb.co/rSFQSJ0/1783599477803.png';

    const options = {
        body: body,
        icon: 'https://i.ibb.co/rSFQSJ0/1783599477803.png',
        badge: 'https://i.ibb.co/rSFQSJ0/1783599477803.png',
        image: image !== 'https://i.ibb.co/rSFQSJ0/1783599477803.png' ? image : undefined,
        data: {
            url: (payload.data && (payload.data.url || payload.data.click_action)) || '/'
        }
    };

    return self.registration.showNotification(title, options);
});
