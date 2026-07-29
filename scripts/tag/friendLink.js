/**
 * - name: D-Sketon
 *   url: https://d-sketon.top/
 *   desc: 东方音mader
 *   image: https://d-sketon.top/img/icon/icon.png
 *   badge: 朋友 # optional, show a colored badge on the card
 *   remark: 通过 GitHub 认识 # optional, extra line below desc
 */
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const standardTemplate = ({ name, url, desc = "", image = "", badge, remark }) => {
  return `<div class="friend-item-wrap">
    <a href="${url}" rel="noopener nofollow noreferrer" target="_blank"></a>
    <div class="friend-icon-wrap">
      <img class="no-lightbox" src="${image}" alt="${name}">
    </div>
    <div class="friend-info-wrap">
      <div class="friend-name-row">
        <div class="friend-name">${name}</div>
        ${badge ? `<span class="friend-badge">${badge}</span>` : ""}
      </div>
      <div class="friend-desc">
        ${desc}
      </div>
      ${remark ? `<div class="friend-remark">${remark}</div>` : ""}
    </div>
  </div>`;
};

const compactTemplate = ({ name, url, desc = "", image = "" }) => {
  return `<div class="friend-item-wrap compact">
    <a href="${url}" rel="noopener nofollow noreferrer" target="_blank"></a>
    <div class="friend-icon-wrap compact">
      <img class="no-lightbox" src="${image}" alt="${name}">
    </div>
    <div class="friend-info-wrap compact">
      <div class="friend-name compact">
          ${name} 
      </div>
      <div class="friend-desc compact">
        ${desc}
      </div>
    </div>
  </div>`;
};

const loadFile = (arg, style) => {
  if (!arg) return;

  const filepath = path.join(hexo.source_dir, arg);
  if (!fs.existsSync(filepath)) return;

  const content = fs.readFileSync(filepath);
  if (!content) return;

  const load = yaml.load(content);
  if (!Array.isArray(load) || load.length === 0) return;

  return insertHtml(load, style);
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const detailedTemplate = ({ name, url, desc = "", image = "", badge, remark }) => {
  return `<div class="friend-item-wrap detailed">
    <a href="${url}" rel="noopener nofollow noreferrer" target="_blank"></a>
    <div class="friend-icon-wrap detailed">
      <img class="no-lightbox" src="${image}" alt="${name}">
    </div>
    <div class="friend-info-wrap detailed">
      <div class="friend-name-row">
        <div class="friend-name detailed">${name}</div>
        ${badge ? `<span class="friend-badge detailed">${badge}</span>` : ""}
      </div>
      <div class="friend-desc detailed">
        ${desc}
      </div>
      ${remark ? `<div class="friend-remark detailed">${remark}</div>` : ""}
    </div>
  </div>`;
};

const templates = {
  standard: standardTemplate,
  compact: compactTemplate,
  detailed: detailedTemplate,
};

const insertHtml = (load, style) => {
  const tpl = templates[style] || standardTemplate;
  const list = hexo.theme.config.friends?.shuffle ? shuffle(load) : load;
  const cards = list
    .filter((item) => item?.name && item?.url)
    .map((item) => tpl(item))
    .join("");
  return `<div class="friend-wrap${style === "compact" ? " compact" : ""}${style === "detailed" ? " detailed" : ""}" data-aos="zoom-in">${cards}</div>`;
};

/**
 * {% friendsLink filePath [style] %}
 * style: standard | compact | detailed, default standard
 */
hexo.extend.tag.register("friendsLink", (args) => {
  return loadFile(args[0], args[1]);
});
