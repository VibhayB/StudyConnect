// service-worker.js
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/home screen.html',
  '/manifest.json',
  '/styles.css',
  '/chatbot.js',
  '/fbs.js',
  '/favicon.png',
  '/load.png',
  '/banner1.js',
  '/sections/exams.js',
  '/sections/feed.js',
  '/sections/productivity.js',
  '/sections/course.js',
  '/sections/online sites.js',
  '/sections/others.js',
  '/sections/installers.js',
  '/sections/games.js',
  '/sections/contacts.js',
  '/sections/forms.js',
  '/sections/calendar.js',
  '/htmlfiles/2048.html',
  '/htmlfiles/ball balancer.html',
  '/htmlfiles/cgpa.html',
  '/htmlfiles/clan links.html',
  '/htmlfiles/class.html',
  '/htmlfiles/course info.html',
  '/htmlfiles/match3.html',
  '/htmlfiles/minesweeper.html',
  '/htmlfiles/pomodoro.html',
  '/htmlfiles/sgpa.html',
  '/htmlfiles/snake.html',
  '/htmlfiles/xebia content.html',
  '/scripts.js',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match('/offline.html'); // Specify your offline page here
    })
  );
});
