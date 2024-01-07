const PreCache = [
  '/images/taichi.png',
  '/images/banner.jpg',
  '/images/taichi-fill.png',
  '/css/loader.css',
  '/css/style.css',
  '/js/script.js'
];

// 安装时预加载必要内容
self.addEventListener('install', (event) => {
  console.log(`Service Worker ${VERSION} installing.`);
  event.waitUntil(
    caches.open(VERSION).then((cache) => {
      return cache.addAll(PreCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (VERSION !== cacheName) {
            console.log(`Service Worker: deleting old cache ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  console.log(`Service Worker ${VERSION} activated.`);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker 注册成功: ', registration);
    })
    .catch((error) => {
      console.log('Service Worker 注册失败: ', error);
    });
}
