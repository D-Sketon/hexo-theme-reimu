let asyncCss;
let tabIndex = 0;
/**
 * https://github.com/volantis-x/hexo-theme-volantis/blob/7.x/scripts/tags/tabs.js
 *
 * https://github.com/xaoxuu/hexo-theme-stellar/blob/main/scripts/tags/lib/tabs.js
 *
 * {% tabs [activeTab] ["center"] %}
 * <!-- tab title -->
 * content
 * <!-- tab title@icon -->
 * content
 * {% endtabs %}
 */
function postTabs(args, content) {
  if (!asyncCss) {
    asyncCss = hexo.extend.helper.get("asyncCss").bind(hexo);
  }
  const tabBlock = content
    .split(/<!--\s*tab (.*?)\s*-->/g)
    .filter((item) => item.trim().length > 0);
  if (tabBlock.length < 1) {
    return "";
  }
  const tabs = tabBlock.reduce((acc, item, i) => {
    if (i % 2 === 0) {
      acc.push({ header: item, body: "" });
      return acc;
    }
    if (acc.length > 0) {
      const tab = acc[acc.length - 1];
      tab.body = tab.body ? `${tab.body}\n${item}` : item;
    }
    return acc;
  }, []);

  const [arg0, arg1] = args;
  const tabActive = arg0 && arg0 !== "center" ? Number(arg0) || 0 : 0;
  const align = arg0 === "center" || arg1 === "center" ? " center" : "";
  const tabName = `tab_${++tabIndex}`;

  const parsedTabs = tabs.map((tab, index) => {
    const tabId = index + 1;
    const tabParameters = tab.header.split("@");
    const tabIcon = tabParameters.length > 1 ? tabParameters.pop() : "";
    let tabCaption = tabParameters.join("@") || "";
    const postContent = hexo.render
      .renderSync({ text: tab.body || "", engine: "markdown" })
      .trim();
    const tabHref = `${tabName}-${tabId}`.toLowerCase();

    if (tabCaption.length === 0 && tabIcon.length === 0) {
      tabCaption = `${tabName} ${tabId}`;
    }

    const iconDom = tabIcon
      ? `<span class="icon" style="margin: 0 4px;">&#x${tabIcon};</span>`
      : "";
    const isActive =
      (tabActive > 0 && tabActive === tabId) || (tabActive === 0 && tabId === 1)
        ? " active"
        : "";

    return {
      nav: `<li class="tab${isActive}"><a class="#${tabHref}">${iconDom}${tabCaption.trim()}</a></li>`,
      content: `<div class="tab-pane${isActive}" id="${tabHref}">${postContent}</div>`,
    };
  });

  const tabNav = `<ul class="nav-tabs${align}">${parsedTabs
    .map((item) => item.nav)
    .join("")}<div class="tab-indicator"></div></ul>`;
  const tabContent = `<div class="tab-content">${parsedTabs
    .map((item) => item.content)
    .join("")}</div>`;

  return `<div class="tabs" id="tab-${tabName.toLowerCase()}">${tabNav}${tabContent}</div>${asyncCss(
    "css/tabs"
  )}`;
}

hexo.extend.tag.register("tabs", postTabs, { ends: true });
