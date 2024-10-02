var getRealPath = (pathname = window.location.pathname, desc = false) => {
  const names = pathname.split("/").filter((name) => {
    name = name.trim();
    return name.length > 0 && name !== "/" && name !== "index.html";
  });
  if (desc) {
    return names[0] || "/";
  } else {
    return names[names.length - 1] || "/";
  }
};

var scrollIntoViewAndWait = (element) => {
  return new Promise((resolve) => {
    if ("onscrollend" in window) {
      document.addEventListener("scrollend", resolve, { once: true });
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    } else {
      element.scrollIntoView({ block: "center", inline: "center" });
      resolve();
    }
  });
};

// anchor
_$$(
  ".article-entry h1>a, .article-entry h2>a, .article-entry h3>a, .article-entry h4>a, .article-entry h5>a, .article-entry h6>a"
).forEach((element) => {
  if (window.icon_font) {
    // iconfont
    element.innerHTML = "&#xe635;";
  } else {
    // fontawesome
    element.innerHTML = "&#xf292;";
  }
});

// lightbox
_$$(".article-entry img").forEach((element) => {
  if (
    element.parentElement.classList.contains("friend-icon") ||
    element.parentElement.tagName === "A" ||
    element.classList.contains("no-lightbox")
  )
    return;
  const a = document.createElement("a");
  a.href ? (a.href = element.src) : a.setAttribute("href", element.src);
  a.dataset.pswpWidth = element.naturalWidth;
  a.dataset.pswpHeight = element.naturalHeight;
  a.target = "_blank";
  a.classList.add("article-gallery-item");
  element.parentNode.insertBefore(a, element);
  element.parentNode.removeChild(element);
  a.appendChild(element);
});
_$$(".article-gallery a.article-gallery-img").forEach((a) => {
  a.dataset.pswpWidth = a.children[0].naturalWidth;
  a.dataset.pswpHeight = a.children[0].naturalHeight;
});
window.lightboxStatus = "ready";
window.dispatchEvent(new Event("lightbox:ready"));

// Mobile nav
var isMobileNavAnim = false;

document
  .getElementById("main-nav-toggle")
  .off("click")
  .on("click", function () {
    if (isMobileNavAnim) return;
    isMobileNavAnim = true;
    document.body.classList.toggle("mobile-nav-on");
    setTimeout(() => {
      isMobileNavAnim = false;
    }, 200);
  });

document
  .getElementById("mask")
  .off("click")
  .on("click", function () {
    if (isMobileNavAnim || !document.body.classList.contains("mobile-nav-on"))
      return;
    document.body.classList.remove("mobile-nav-on");
  });

_$$(".sidebar-toc-btn").forEach((element) => {
  element.off("click").on("click", function () {
    if (this.classList.contains("current")) return;
    _$$(".sidebar-toc-btn").forEach((element) =>
      element.classList.add("current")
    );
    _$$(".sidebar-common-btn").forEach((element) =>
      element.classList.remove("current")
    );
    _$$(".sidebar-toc-sidebar").forEach((element) =>
      element.classList.remove("hidden")
    );
    _$$(".sidebar-common-sidebar").forEach((element) =>
      element.classList.add("hidden")
    );
  });
});

_$$(".sidebar-common-btn").forEach((element) => {
  element.off("click").on("click", function () {
    if (this.classList.contains("current")) return;
    _$$(".sidebar-common-btn").forEach((element) =>
      element.classList.add("current")
    );
    _$$(".sidebar-toc-btn").forEach((element) =>
      element.classList.remove("current")
    );
    _$$(".sidebar-common-sidebar").forEach((element) =>
      element.classList.remove("hidden")
    );
    _$$(".sidebar-toc-sidebar").forEach((element) =>
      element.classList.add("hidden")
    );
  });
});

(() => {
  const rootRealPath = getRealPath(window.location.pathname);
  _$$(".sidebar-menu-link-wrap").forEach((link) => {
    let linkPath = link.querySelector("a").getAttribute("href");
    if (linkPath && getRealPath(linkPath) === rootRealPath) {
      link.classList.add("link-active");
    }
  });
})();

// lazyload
_$$(".article-entry img").forEach((element) => {
  if (element.classList.contains("lazyload")) return;
  element.classList.add("lazyload");
  element.setAttribute("data-src", element.src);
  element.setAttribute("data-sizes", "auto");
  element.removeAttribute("src");
});

// to top
var sidebarTop = _$(".sidebar-top");
sidebarTop.style.transition = "opacity 1s";
sidebarTop.off("click").on("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
if (document.documentElement.scrollTop < 10) {
  sidebarTop.style.opacity = 0;
}

var __sidebarTopScrollHandler;

if (__sidebarTopScrollHandler) {
  window.off("scroll", __sidebarTopScrollHandler);
}

__sidebarTopScrollHandler = () => {
  const sidebarTop = _$(".sidebar-top");
  if (document.documentElement.scrollTop < 10) {
    sidebarTop.style.opacity = 0;
  } else {
    sidebarTop.style.opacity = 1;
  }
};

window.on("scroll", __sidebarTopScrollHandler);

// toc
_$$(".toc a").forEach((element) => {
  element.off("click").on("click", () => {
    if (isMobileNavAnim || !document.body.classList.contains("mobile-nav-on"))
      return;
    document.body.classList.remove("mobile-nav-on");
  });
});

_$$(".sidebar-menu-link-dummy").forEach((element) => {
  element.off("click").on("click", () => {
    if (isMobileNavAnim || !document.body.classList.contains("mobile-nav-on"))
      return;
    setTimeout(() => {
      document.body.classList.remove("mobile-nav-on");
    }, 200);
  });
});

function tocInit() {
  const navItems =
    getComputedStyle(_$("#sidebar")).display === "block"
      ? _$$("#sidebar .sidebar-toc-wrapper li")
      : _$$("#mobile-nav .sidebar-toc-wrapper li");
  if (!navItems.length) return;

  let activeLock = null;

  const anchorScroll = (event, index) => {
    event.preventDefault();
    const target = _$(decodeURI(event.currentTarget.getAttribute("href")));
    activeLock = index;
    scrollIntoViewAndWait(target).then(() => {
      activateNavByIndex(index);
      activeLock = null;
    });
  };

  const sections = [...navItems].map((element, index) => {
    const link = element.querySelector("a.toc-link");
    link.off("click").on("click", (e) => anchorScroll(e, index));
    const anchor = _$(decodeURI(link.getAttribute("href")));
    if (!anchor) return null;
    const alink = anchor.querySelector("a");
    alink?.off("click").on("click", (e) => anchorScroll(e, index));
    return anchor;
  });

  const activateNavByIndex = (index) => {
    const target = navItems[index];

    if (!target || target.classList.contains("current")) return;

    _$$(".sidebar-toc-wrapper .active").forEach((element) => {
      element.classList.remove("active", "current");
    });

    sections.forEach((element) => {
      element?.classList.remove("active");
    });

    target.classList.add("active", "current");
    sections[index]?.classList.add("active");

    let parent = target.parentNode;

    while (!parent.matches(".sidebar-toc")) {
      if (parent.matches("li")) {
        parent.classList.add("active");
        const t = _$(
          decodeURI(parent.querySelector("a.toc-link").getAttribute("href"))
        );
        if (t) {
          t.classList.add("active");
        }
      }
      parent = parent.parentNode;
    }
    // Scrolling to center active TOC element if TOC content is taller than viewport.
    if (
      !document
        .querySelector(".sidebar-toc-sidebar")
        .classList.contains("hidden")
    ) {
      const tocWrapper = _$(".sidebar-toc-wrapper");
      tocWrapper.scrollTo({
        top:
          tocWrapper.scrollTop + target.offsetTop - tocWrapper.offsetHeight / 2,
        behavior: "smooth",
      });
    }
  };

  const findIndex = (entries) => {
    let index = 0;
    let entry = entries[index];

    if (entry.boundingClientRect.top > 0) {
      index = sections.indexOf(entry.target);
      return index === 0 ? 0 : index - 1;
    }
    for (; index < entries.length; index++) {
      if (entries[index].boundingClientRect.top <= 0) {
        entry = entries[index];
      } else {
        return sections.indexOf(entry.target);
      }
    }
    return sections.indexOf(entry.target);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const index = findIndex(entries) + (window.diffY > 0 ? 1 : 0);
      if (activeLock === null) {
        activateNavByIndex(index);
      }
    },
    {
      rootMargin: "0px 0px -100% 0px",
      threshold: 0,
    }
  );

  sections.forEach((element) => {
    element && observer.observe(element);
  });
}

// hexo-blog-encrypt
window
  .off("hexo-blog-decrypt")
  .on("hexo-blog-decrypt", tocInit)
  .on("hexo-blog-decrypt", () => {
    const script = document.createElement("script");
    script.src = "/js/insert_highlight.js";
    script.setAttribute("data-pjax", true);
    document.body.appendChild(script);
  });
tocInit();
