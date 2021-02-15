self.addEventListener('push', e => {
  const data = e.data.json();
  self.registration.showNotification("Meeting startet in 5 Minuten", {
    body: data.title,
    icon: 'img/icons/android-96x196.png'
  });
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  event.waitUntil(clients.matchAll().then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url.endsWith('calendar') && 'focus' in client)
        return client.focus();
    }
  }));
});

self.addEventListener('fetch', function(event) {})