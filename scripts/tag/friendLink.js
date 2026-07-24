/**
 * - name: D-Sketon
 *   url: https://d-sketon.top/
 *   desc: 东方音mader
 *   image: https://d-sketon.top/img/icon/icon.png
 */
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const template = ({ name, url, desc = "", image = "" }) => {
  return `<div class="friend-item-wrap">
    <a href="${url}" rel="noopener nofollow noreferrer" target="_blank"></a>
    <div class="friend-icon-wrap">
      <img class="no-lightbox" src="${image}" alt="${name}">
    </div>
    <div class="friend-info-wrap">
      <div class="friend-name">
          ${name} 
      </div>
      <div class="friend-desc">
        ${desc}
      </div>
    </div>
  </div>`;
};
const loadFile = (arg) => {
  if (!arg) return;

  const filepath = path.join(hexo.source_dir, arg);
  if (!fs.existsSync(filepath)) return;

  const content = fs.readFileSync(filepath);
  if (!content) return;

  const load = yaml.load(content);
  if (!Array.isArray(load) || load.length === 0) return;

  return insertHtml(load);
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const insertHtml = (load) => {
  const list = hexo.theme.config.friends?.shuffle ? shuffle(load) : load;
  const cards = list
    .filter((item) => item?.name && item?.url)
    .map((item) => template(item))
    .join("");
  return `<div class="friend-wrap" data-aos="zoom-in">${cards}</div>`;
};

/**
 * {% friendsLink filePath %}
 */
hexo.extend.tag.register("friendsLink", (args) => {
  return loadFile(args[0]);
});
