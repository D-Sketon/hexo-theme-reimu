let tabIndex = 0;
/**
 * https://github.com/volantis-x/hexo-theme-volantis/blob/7.x/scripts/tags/tabs.js
 * 
 * https://github.com/xaoxuu/hexo-theme-stellar/blob/main/scripts/tags/lib/tabs.js
 * 
 * {% tabs 2 center %}
 * <!-- tab 栏目1 -->
 * 内容
 * <!-- tab 栏目2@icon -->
 * 内容
 * {% endtabs %}
 */
function postTabs(args, content) {
  const tabBlock = content
    .split(/<!--\s*tab (.*?)\s*-->/g)
    .filter((item) => item.trim().length > 0);
  if (tabBlock.length < 1) {
    return "";
  }
  const tabs = [];
  tabBlock.forEach((item, i) => {
    if (i % 2 === 0) {
      tabs.push({ header: item });
    } else if (tabs.length > 0) {
      const tab = tabs[tabs.length - 1];
      tab.body = tab.body ? tab.body + "\n" + item : item;
    }
  });
  let tabId = 0;
  let tabNav = "";
  let tabContent = "";
  let tabActive = 0;
  let align = "";
  if (args[0]) {
    if (args[0] === "center") {
      align = " center";
    } else {
      tabActive = Number(args[0]) || 0;
      if (args[1] === "center") {
        align = " center";
      }
    }
  }
  const tabName = `tab_${++tabIndex}`;

  for (let i = 0; i < tabs.length; i++) {
    const tabParameters = tabs[i].header.split("@");
    let tabCaption, tabIcon;
    if (tabParameters.length > 1) {
      tabIcon = tabParameters.pop();
      tabCaption = tabParameters.join("@");
    } else {
      tabCaption = tabParameters[0] || "";
      tabIcon = "";
    }
    let postContent = tabs[i].body || "";

    postContent = hexo.render
      .renderSync({ text: postContent, engine: "markdown" })
      .trim();

    tabId += 1;
    const tabHref = `${tabName}-${tabId}`.toLowerCase();

    if (tabCaption.length === 0 && tabIcon.length === 0) {
      tabCaption = `${tabName} ${tabId}`;
    }

    if (tabIcon.length > 0) {
      tabIcon = `<span class="icon" style="margin: 0 4px;">&#x${tabIcon};</span>`;
    }

    const isActive =
      (tabActive > 0 && tabActive === tabId) || (tabActive === 0 && tabId === 1)
        ? " active"
        : "";
    tabNav += `<li class="tab${isActive}"><a class="#${tabHref}">${
      tabIcon + tabCaption.trim()
    }</a></li>`;
    tabContent += `<div class="tab-pane${isActive}" id="${tabHref}">${postContent}</div>`;
  }

  tabNav = `<ul class="nav-tabs${align}">${tabNav}<div class="tab-indicator"></div></ul>`;
  tabContent = `<div class="tab-content">${tabContent}</div>`;

  return `<div class="tabs" id="tab-${tabName.toLowerCase()}">${tabNav}${tabContent}</div>`;
}

hexo.extend.tag.register("tabs", postTabs, { ends: true });
