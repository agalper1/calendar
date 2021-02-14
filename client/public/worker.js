self.addEventListener('push', e => {
  const data = e.data.json();
  self.registration.showNotification("Meeting startet in 5 Minuten", {
    body: data.title,
    icon: 'img/icons/android-96x196.png'
  });
});

self.addEventListener('fetch', function(event) {})