self.addEventListener('push', e => {
  const data = e.data.json();
  return self.registration.showNotification("Meeting startet in 5 Minuten", {
    body: data.title,
    icon: 'img/icons/android-96x196.png',
    data: data
  });
});

self.addEventListener('notificationclick',  e => {
  e.notification.close();
  let data = e.notification.data;
  let url = data.link;
  return clients.openWindow(url);
});

self.addEventListener('fetch', function(event) {})