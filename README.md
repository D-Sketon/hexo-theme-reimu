<img src="https://fastly.jsdelivr.net/gh/D-Sketon/blog-img/Reimu.png"/>
<div align = center>
  <h1>hexo-theme-reimu</h1>
  <img alt="NPM License" src="https://img.shields.io/npm/l/hexo-theme-reimu">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/hexo-theme-reimu">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/D-Sketon/hexo-theme-reimu">
  <img src="https://wakatime.com/badge/user/a6ea8444-9e83-48bb-9744-09a19ac07114/project/fe59c195-6633-4ee8-89c0-e1b24fa1fff4.svg" alt="wakatime">
  <p align="center">
  ❤ Hakurei Reimu ❤
  </p>

  [演示网站](https://d-sketon.github.io)

  简体中文 | [English](https://github.com/D-Sketon/hexo-theme-reimu/blob/main/README.en.md)
</div>

---

本人是车车人，所以制作了这样一款博丽灵梦风格的 Hexo 主题，融合了 [landscape](https://github.com/hexojs/hexo-theme-landscape)、[Tangyuxian](https://github.com/tangyuxian/hexo-theme-tangyuxian) 和 [Shoka](https://github.com/amehime/hexo-theme-shoka) 三个主题

[Astro](https://astro.build) 主题请参见 [astro-theme-reimu](https://github.com/D-Sketon/astro-theme-reimu)

**欢迎提交 ISSUE 和 PR！**

## 路线图

- [x] valine 评论系统
- [x] waline 评论系统
- [x] twikoo 评论系统（未测试）
- [x] gitalk 评论系统（未测试）
- [x] giscus 评论系统（未测试）
- [x] 黑夜模式
- [x] 过渡动画效果
- [x] google 字体
- [x] 加载动画
- [x] TOC
- [x] 回到顶部
- [x] 文章统计（仅 Valine 和 Waline）
- [x] 鼠标烟花
- [x] pjax（实验性）
- [x] pwa（实验性）
- [x] live2d（实验性）

## 结构

```txt
.
├── _screenshot 截图
├── _example    示例source文件夹内结构
├── _config.yml 主题配置
├── languages
├── layout
├── scripts
└── source
```

## 安装

使用 npm

```bash
npm install hexo-theme-reimu --save
```

或直接克隆本仓库至 `/themes` 文件夹下并重命名为 `reimu`

```bash
git clone https://github.com/D-Sketon/hexo-theme-reimu.git
```

并修改 `_config.yml` 中的 theme

```yaml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: reimu
```

## 使用

### 基本结构

为了保证显示正确，请参考 `_example` 在 `_source` 中分别建立 `_data`、`about` 和 `friend` 文件夹

#### \_data

- `avatar` 文件夹中存储作者头像，默认命名 `avatar.jpg`，可在 内层 `_config.yml` 中做如下配置

```yaml
avatar: "avatar.jpg" # 默认就是在avatar文件夹内寻找，请不要包含路径，否则会404
```

- `covers` 文件夹中存储文章封面
- `covers.yml` 中存储文章封面 url

#### about

`index.md` 作为**关于**页面

#### friend

`index.md` 作为**友链**页面，在 `_data.yml` 中填入友链信息即可在页面上显示对应好友卡片

### 封面、头图和图标

#### 封面

封面显示逻辑如下

- 如果文章的 Front matter 中包含 cover 的 url，则该文章头图和首页缩略图均显示该 url

```yaml
---
title: Hello World
cover: https://example.com
---
```

- 如果文章的 Front matter 中包含 cover 为 `false`，则该文章不显示头图（首页上仍然是随机图片）

```yaml
---
title: Hello World
cover: false
---
```

- 如果文章的 Front matter 中包含 cover 为 `rgb(xxx,xxx,xxx)`，则该文章头图为对应的渐变纯色（首页上仍然是随机图片）

```yaml
---
title: Hello World
cover: rgb(255,117,117)
---
```

- 否则查找 `covers` 文件夹和 `covers.yml`，并从中随机挑选图片
- 若上述文件均不存在，则显示头图

#### 头图

头图保存于 `themes/reimu/source/images/banner.jpg`，可在内层 `_config.yml` 中修改

```yaml
banner: "/images/banner.jpg"
```

#### 图标

图标保存于 `themes/reimu/source/images/favicon.ico`，可在内层 `_config.yml` 中修改

```yaml
favicon: "/images/favicon.ico"
```

#### 置顶

在文章的 Front-matter 中添加 `sticky: true`

```yaml
---
title: Hello World
sticky: true
---
```

### 代码高亮

为保证代码块的正确显示，请保证外层 `_config.yml` 中为如下配置
(<7.0.0)

```yaml
highlight:
  enable: true
  wrap: true
  hljs: false
prismjs:
  enable: false
```

(>=7.0.0)

```yaml
syntax_highlighter: highlight.js
highlight:
  wrap: true
  hljs: false
```

### 站内评论

若基于 [Valine](https://valine.js.org/)  
请参考其官方文档完成 `LeanCloud` 的配置，并在内层 `_config_yml` 中将 `valine.enable` 改为 `true`，并填入自己的 `appId` 和 `appKey`

```yaml
valine:
  enable: true
  appId: "your appId"
  appKey: "your appKey"
```

若基于 [Waline](https://waline.js.org/)  
请参考其[官方文档](https://waline.js.org/guide/get-started/)完成 `LeanCloud` 的配置，并在内层 `_config_yml` 中将 `waline.enable` 改为 `true`，并填入自己的 `serverURL`

```yaml
waline:
  enable: true
  serverURL: "your server url"
  lang: zh-CN
  locale: {} # https://waline.js.org/guide/features/i18n.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%AF%AD%E8%A8%80
  emoji:
    - https://unpkg.com/@waline/emojis@1.2.0/weibo
    - https://unpkg.com/@waline/emojis@1.2.0/alus
    - https://unpkg.com/@waline/emojis@1.2.0/bilibili
    - https://unpkg.com/@waline/emojis@1.2.0/qq
    - https://unpkg.com/@waline/emojis@1.2.0/tieba
    - https://unpkg.com/@waline/emojis@1.2.0/tw-emoji
  meta:
    - nick
    - mail
    - link
  requiredMeta:
    - nick
    - mail
  wordLimit: 0
  pageSize: 10
  pageview: true
```

若基于 [twikoo](https://twikoo.js.org)  
请参考其[官方文档](https://twikoo.js.org/quick-start.html)完成 腾讯云 或 Vercel 部署，并在内层 `_config_yml` 中将 `twikoo.enable` 改为 `true`，并填入自己的 `envId`

```yml
twikoo:
  enable: true
  envId: # 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
  region:
```

### 站内搜索

若选择 [Algolia](https://www.algolia.com/)，请安装 [hexo-algoliasearch](https://github.com/LouisBarranqueiro/hexo-algoliasearch)

```bash
npm install hexo-algoliasearch --save
```

并参考其 [README](https://github.com/LouisBarranqueiro/hexo-algoliasearch#readme) 完成对 `Algolia` 账号的配置，并在外层 `_confg.yml` 中添加如下配置

```yml
algolia:
  appId: "your applicationID"
  apiKey: "your apiKey"
  adminApiKey: "your adminApiKey"
  indexName: "your indexName"
  chunkSize: 5000
  fields:
    - content:strip:truncate,0,500
    - excerpt:strip
    - gallery
    - permalink
    - photos
    - slug
    - tags
    - title
```

在内层 `_config_yml` 中将 `algolia_search.enable` 改为 `true`

```yaml
algolia_search:
  enable: true
```

注意：搜索跳转链接为永久链接，所以请保证外层 `_config.yml` 中的 `url` 填写正确

若选择 [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)，请安装[hexo-generator-search](https://github.com/wzpan/hexo-generator-search)

并参考其 [README](https://github.com/wzpan/hexo-generator-search#readme)在外层 `_config.yml` 中添加如下配置

```yml
search:
  path: search.json # 文件名必须为search.json
  field: post
  content: true
```

在内层 `_config_yml` 中将 `generator_search.enable` 改为 `true`

```yaml
generator_search:
  enable: true
```

### 数学公式

数学公式基于 [Katex](https://github.com/KaTeX/KaTeX)，请安装 [hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)

```bash
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-markdown-it-plus --save
```

在内层 `_config_yml` 中将 `math.enable` 改为 `true`

```yaml
math:
  enable: true
```

### Mermaid

请安装 [hexo-filter-mermaid-diagrams](https://github.com/webappdevelp/hexo-filter-mermaid-diagrams)

```bash
npm install hexo-filter-mermaid-diagrams --save
```

在内层 `_config_yml` 中将 `mermaid.enable` 改为 `true`

```yaml
mermaid:
  enable: true
```

### RSS

请安装 [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)

```bash
npm install hexo-generator-feed --save
```

并参考其 [README](https://github.com/hexojs/hexo-generator-feed#readme) 在外层 `_config.yml` 完成对 `feed` 的配置  
在内层 `_config.yml` 中填入生成的 `xml`

```yaml
rss: atom.xml
```

### 实验性功能

#### firework

默认开启
```yaml
firework:
  enable: true
```
具体配置请查看 [mouse-firework](https://github.com/D-Sketon/mouse-firework)

#### pjax

默认关闭
```yaml
pjax:
  enable: false
```
> pjax 在 v0.0.10 中被引入，用于那些需要添加音乐播放器等需要 SPA 的用户。但其仍然属于实验性质，引入后可能会出现诸如**脚本无法执行**、**脚本重复执行**、**页面渲染混乱**等 BUG。请慎重考虑！

#### PWA

默认开启
```yaml
service_worker:
  enable: true
```

#### live2d

默认关闭
```yaml
live2d:
  enable: false
```

## 贡献者
[![](https://contributors-img.web.app/image?repo=D-Sketon/hexo-theme-reimu)](https://github.com/D-Sketon/hexo-theme-reimu/graphs/contributors)

## 许可

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FD-Sketon%2Fhexo-theme-reimu.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FD-Sketon%2Fhexo-theme-reimu?ref=badge_large)
