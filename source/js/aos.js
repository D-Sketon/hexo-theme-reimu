// simplify from https://github.com/michalsnik/aos

var debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

var throttle = (func, limit) => {
  let lastFunc, lastRan;

  return (...args) => {
    const context = this;
    if (!lastRan || Date.now() - lastRan >= limit) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        func.apply(context, args);
        lastRan = Date.now();
      }, limit - (Date.now() - lastRan));
    }
  };
};

var __aosScrollHandler;
var __aosResizeHandler;
var __observer;

(() => {
  let options = {
    offset: 120,
    delay: 0,
    duration: 400,
    disable: false,
    once: false,
    startEvent: "DOMContentLoaded",
    throttleDelay: 99,
    debounceDelay: 50,
  };

  let $aosElements = [];
  let initialized = false;

  const getOffset = (el) => {
    let left = 0;
    let top = 0;

    while (el) {
      left += el.offsetLeft - (el.tagName != "BODY" ? el.scrollLeft : 0);
      top += el.offsetTop - (el.tagName != "BODY" ? el.scrollTop : 0);
      el = el.offsetParent;
    }

    return {
      top,
      left,
    };
  };

  const containsAOSNode = (nodes) => {
    return [...nodes].some((node) => {
      return (
        node.dataset?.aos || (node.children && containsAOSNode(node.children))
      );
    });
  };

  const observe = (fn) => {
    __observer?.disconnect();

    __observer = new MutationObserver((mutations) => {
      if (
        mutations?.some(({ addedNodes, removedNodes }) =>
          containsAOSNode([...addedNodes, ...removedNodes])
        )
      ) {
        fn();
      }
    });

    __observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  const setState = (el, top, once) => {
    const attrOnce = el.node.getAttribute("data-aos-once");

    if (top > el.position) {
      el.node.classList.add("aos-animate");
    } else if (attrOnce === "false" || (!once && attrOnce !== "true")) {
      el.node.classList.remove("aos-animate");
    }
  };

  const handleScroll = ($elements, once) => {
    const threshold = window.innerHeight + window.scrollY;
    $elements.forEach((el) => setState(el, threshold, once));
  };

  const calculateOffset = (el, optionalOffset) => {
    let elementOffsetTop = 0;
    let additionalOffset = 0;
    const windowHeight = window.innerHeight;
    const attrs = {
      offset: el.getAttribute("data-aos-offset"),
      anchor: el.getAttribute("data-aos-anchor"),
      anchorPlacement: el.getAttribute("data-aos-anchor-placement"),
    };

    if (attrs.offset) {
      additionalOffset = parseInt(attrs.offset);
    }

    if (attrs.anchor) {
      el = _$(attrs.anchor) || el;
    }

    elementOffsetTop = getOffset(el).top;

    switch (attrs.anchorPlacement) {
      case "top-bottom":
        // Default offset
        break;
      case "center-bottom":
        elementOffsetTop += el.offsetHeight / 2;
        break;
      case "bottom-bottom":
        elementOffsetTop += el.offsetHeight;
        break;
      case "top-center":
        elementOffsetTop += windowHeight / 2;
        break;
      case "bottom-center":
        elementOffsetTop += windowHeight / 2 + el.offsetHeight;
        break;
      case "center-center":
        elementOffsetTop += windowHeight / 2 + el.offsetHeight / 2;
        break;
      case "top-top":
        elementOffsetTop += windowHeight;
        break;
      case "bottom-top":
        elementOffsetTop += el.offsetHeight + windowHeight;
        break;
      case "center-top":
        elementOffsetTop += el.offsetHeight / 2 + windowHeight;
        break;
    }

    if (!attrs.anchorPlacement && !attrs.offset) {
      additionalOffset = optionalOffset;
    }

    return elementOffsetTop + additionalOffset;
  };

  const prepare = ($elements, options) => {
    $elements.forEach((el) => {
      el.node.classList.add("aos-init");
      el.position = calculateOffset(el.node, options.offset);
    });
    return $elements;
  };

  const refresh = (initialize = false) => {
    if (initialize) initialized = true;

    if (initialized) {
      $aosElements = prepare($aosElements, options);
      handleScroll($aosElements, options.once);
      return $aosElements;
    }
  };

  const refreshHard = () => {
    $aosElements = [..._$$("[data-aos]")].map((node) => ({
      node,
    }));
    refresh();
  };

  const init = (opts) => {
    options = { ...options, ...opts };
    $aosElements = [..._$$("[data-aos]")].map((node) => ({
      node,
    }));
    if (options.disable) {
      $aosElements.forEach(({ node }) => {
        node.removeAttribute("data-aos");
        node.removeAttribute("data-aos-easing");
        node.removeAttribute("data-aos-duration");
        node.removeAttribute("data-aos-delay");
      });
      return;
    }
    document.body.setAttribute("data-aos-easing", options.easing);
    document.body.setAttribute("data-aos-duration", options.duration);
    document.body.setAttribute("data-aos-delay", options.delay);

    if (
      options.startEvent === "DOMContentLoaded" &&
      ["complete", "interactive"].indexOf(document.readyState) > -1
    ) {
      refresh(true);
    } else if (options.startEvent === "load") {
      window.addEventListener(options.startEvent, () => {
        refresh(true);
      });
    } else {
      document.addEventListener(options.startEvent, () => {
        refresh(true);
      });
    }

    if (__aosResizeHandler) {
      window.off("resize", __aosResizeHandler);
      window.off("orientationchange", __aosResizeHandler);
    }
    __aosResizeHandler = debounce(refresh, options.debounceDelay);
    window.on("resize", __aosResizeHandler);
    window.on("orientationchange", __aosResizeHandler);

    if (__aosScrollHandler) {
      window.off("scroll", __aosScrollHandler);
    }
    __aosScrollHandler = throttle(
      () => handleScroll($aosElements, options.once),
      options.throttleDelay
    );
    window.on("scroll", __aosScrollHandler);

    observe(refreshHard);

    return $aosElements;
  };

  window.AOS = {
    init,
    refresh,
    refreshHard,
  };
})();
