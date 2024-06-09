const cacheDomain = [
  "fonts.googleapis.com",
  "npm.webcache.cn",
  "unpkg.com",
  "fastly.jsdelivr.net",
  "cdn.jsdelivr.net",
];

// 安装时预加载必要内容
self.addEventListener("install", (event) => {
  console.log(`Service Worker ${VERSION} installing.`);
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(preCache)));
});

async function cacheRequest(request, options) {
  try {
    const responseToCache = await fetch(request);
    const cache = await caches.open(VERSION);
    cache.put(request, responseToCache.clone());
    return responseToCache;
  } catch (e) {
    const responseToCache = await fetch(request, options);
    const cache = await caches.open(VERSION);
    cache.put(request, responseToCache.clone());
    return responseToCache;
  }
}

async function respondRequest(request, options) {
  const response = await caches.match(request);
  if (response) {
    return response;
  }
  return cacheRequest(request, options);
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // 检查请求的域名是否在 CacheDomain 中
  if (cacheDomain.includes(url.hostname)) {
    event.respondWith(respondRequest(event.request));
  } else {
    // 检查请求是否为 POST 或带有查询参数的 GET 这样可避免错误缓存
    if (
      event.request.method === "POST" ||
      (event.request.method === "GET" && url.search)
    ) {
      try {
        event.respondWith(fetch(event.request));
      } catch (e) {
        event.respondWith(fetch(event.request, { mode: "no-cors" }));
      }
    } else {
      event.respondWith(respondRequest(event.request, { mode: "no-cors" }));
    }
  }
});

self.addEventListener("activate", (event) => {
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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(swPath)
    .then((registration) => {
      console.log("Service Worker 注册成功: ", registration);
    })
    .catch((error) => {
      console.log("Service Worker 注册失败: ", error);
    });
}
