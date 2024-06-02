window.addEventListener("pjax:success", () => {
  document.querySelectorAll("script[data-pjax]").forEach((element) => {
    const { text, parentNode, id, className, type, src, dataset } = element;
    const code = text || element.textContent || element.innerHTML || "";
    parentNode.removeChild(element);
    const script = document.createElement("script");
    if (id) {
      script.id = id;
    }
    if (className) {
      script.className = className;
    }
    if (type) {
      script.type = type;
    }
    if (src) {
      // Force synchronous loading of peripheral JS.
      script.src = src;
      script.async = false;
    }
    if (dataset.pjax !== undefined) {
      script.dataset.pjax = "";
    }
    if (code !== "") {
      script.appendChild(document.createTextNode(code));
    }
    parentNode.appendChild(script);
  });
});
window.addEventListener("pjax:complete", () => {
  document.getElementById("header-nav")?.classList.remove("header-nav-hidden");
  const mode = window.localStorage.getItem("dark_mode");
  if (mode == "true") {
    document.body.dispatchEvent(new CustomEvent("dark-theme-set"));
  } else if (mode == "false") {
    document.body.dispatchEvent(new CustomEvent("light-theme-set"));
  }
});
window.addEventListener("pjax:send", () => {
  window.lightboxStatus = "loading";
});
if (startLoading) window.addEventListener("pjax:send", startLoading);
if (endLoading) window.addEventListener("pjax:complete", endLoading);
