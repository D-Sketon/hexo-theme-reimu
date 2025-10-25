// service worker
if ("serviceWorker" in navigator && window.REIMU_CONFIG.swPath) {
  _$("#notification-update-btn").onclick = () => {
    try {
      navigator.serviceWorker.getRegistration().then((reg) => {
        reg.waiting.postMessage("skipWaiting");
      });
    } catch (e) {
      window.location.reload();
    }
  };

  _$("#notification-close-btn").onclick = () => {
    _$(".notification-wrapper").classList.remove("show");
  };

  function emitUpdate() {
    _$(".notification-wrapper").classList.add("show");
  }

  navigator.serviceWorker
    .register(window.REIMU_CONFIG.swPath)
    .then((registration) => {
      console.log("Service Worker 注册成功: ", registration);
      if (registration.waiting) {
        emitUpdate();
        return;
      }
      registration.onupdatefound = () => {
        console.log("Service Worker 更新中...");
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              emitUpdate();
            }
          }
        };
      };
    })
    .catch((error) => {
      console.log("Service Worker 注册失败: ", error);
    });

  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) {
      return;
    }
    refreshing = true;
    window.location.reload();
  });
}
