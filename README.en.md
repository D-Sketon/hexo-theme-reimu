<img src="https://raw.githubusercontent.com/D-Sketon/blog-img/main/Reimu_.png"/>
<div align = center>
  <h1>hexo-theme-reimu</h1>
  <img alt="NPM License" src="https://img.shields.io/npm/l/hexo-theme-reimu">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/hexo-theme-reimu">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/D-Sketon/hexo-theme-reimu">
  <img src="https://wakatime.com/badge/user/a6ea8444-9e83-48bb-9744-09a19ac07114/project/fe59c195-6633-4ee8-89c0-e1b24fa1fff4.svg" alt="wakatime">
  <p align="center">
  ❤ Hakurei Reimu ❤
  </p>

[Demo](https://d-sketon.github.io)

[简体中文](https://github.com/D-Sketon/hexo-theme-reimu/blob/main/README.md) | English

</div>

---

A Hakurei Reimu style Hexo theme.  
A combination of [landscape](https://github.com/hexojs/hexo-theme-landscape)、[Tangyuxian](https://github.com/tangyuxian/hexo-theme-tangyuxian) and [Shoka](https://github.com/amehime/hexo-theme-shoka) themes.

See [astro-theme-reimu](https://github.com/D-Sketon/astro-theme-reimu) for the [Astro](https://astro.build) theme.

**ISSUE and PR Welcome!**

## Features

- All the regular features of the blog
- Compatible with Hexo v6+
- Responsive Layout
- Code Highlighting, Code Pasting
- Supports KaTeX for displaying math formulas
- Mermaid for flowcharts
- Algolia / hexo-generator-search search support
- valine / waline / twikoo / gitalk / giscus comment system
- valine / waline article reading statistics
- Busuanzi Visitor Statistics
- RSS support
- Both iconfont and fontawesome are supported.
- Night mode
- Lazy image loading
- Load Animation
- TOC
- Back to top
- Mouse firework animation
- pjax
- ServiceWorker
- live2d
- reimu Mouse Pointer
- Internal tag plugin for providing internal/external/friendly link cards
- Support the bottom of the article copyright statement
- Support for configuring custom CDN sources

## Structure

```txt
.
├── _screenshot screenshot
├── _example    example source folder structure
├── _config.yml theme configuration
├── languages
├── layout
├── scripts
└── source
```

## Installation

Using npm

```bash
npm install hexo-theme-reimu --save
```

or clone this repository to the `/themes` folder and rename it to `reimu`

```bash
git clone https://github.com/D-Sketon/hexo-theme-reimu.git
```

and change the theme in `_config.yml`

```yaml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: reimu
```

## Uses

<details>
<summary>Basic structure</summary>

### Basic structure

For correct display, please refer to `_example` and create separate `_data`, `about` and `friend` folders in `source`

#### \_data

- The `avatar` folder stores the author's avatar, named `avatar.webp` by default, and can be configured in the inner `_config.yml` as follows

```yaml
avatar: "avatar.webp"
```

- The `covers` folder stores the article covers
- The `covers.yml` file stores the article cover urls

#### about

`index.md` as the **about** page

#### friend

`index.md` as the **friends** page, fill in `_data.yml` with friend information to display the corresponding friend card on the page

</details>
<details>
<summary>Cover, banner and favicon</summary>

### Cover, banner and favicon

#### Cover

The logic for displaying the cover is as follows

- If the article's Front matter contains the url for cover, the article's header image and home page thumbnails display that url

```yaml
---
title: Hello World
cover: https://example.com
---
```

- If the article's Front matter contains cover as `false`, the article doesn't show the header image (it's still a random image on the front page)

```yaml
---
title: Hello World
cover: false
---
```

- If the article's Front matter contains cover as `rgb(xxx,xxx,xxx)`, the article's header image is the corresponding gradient solid color (still a random image on the front page)

```yaml
---
title: Hello World
cover: rgb(255,117,117)
---
```

- Otherwise, look for the `covers` folder and `covers.yml` and pick a random image from it
- If none of these files exist, display the banner

#### banner

The banner is stored in `themes/reimu/source/images/banner.webp` and can be modified in the inner `_config.yml`

```yaml
banner: "/images/banner.webp"
```

#### favicon

The favicon is stored in `themes/reimu/source/images/favicon.ico`，and can be modified in the inner `_config.yml`

```yaml
favicon: "/images/favicon.ico"
```

#### topped

Add `sticky: true` to the article's Front-matter

```yaml
---
title: Hello World
sticky: true
---
```

</details>
<details>
<summary>Code highlighting</summary>

### Code highlighting

To ensure that the code blocks are displayed correctly, please ensure that the outer `_config.yml` is configured as follows
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

</details>
<details>
<summary>Site comments</summary>

### Site comments

> In-site comments can be controlled independently of each post using `comments` in Front matter.  
> Comments are not shown when `comments` is `false`, and are shown or not shown when `true` or not filled in, depending on the `_config_yml` configuration.

If based on [Valine](https://valine.js.org/)  
Please refer to its official documentation to complete the configuration of `LeanCloud` and change `valine.enable` to `true` in the inner `_config_yml` and fill in your own `appId` and `appKey`

```yaml
valine:
  enable: true
  appId: "your appId"
  appKey: "your appKey"
```

If based on [Waline](https://waline.js.org/)  
Please refer to its [official documentation](https://waline.js.org/guide/get-started/) to complete the `LeanCloud` configuration and change `waline.enable` to `true` in the inner `_config_yml`, and fill in your own `serverURL`

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

If based on [twikoo](https://twikoo.js.org)  
Please refer to its [official documentation](https://twikoo.js.org/quick-start.html) to complete the Tencent Cloud or Vercel deployment, and change `twikoo.enable` to `true` in the inner `_config_yml`, and fill in your own `envId`.

```yml
twikoo:
  enable: true
  envId: # Tencent cloud environment fill envId; Vercel environment fill address (https://xxx.vercel.app)
  region:
```

If based on [giscus](https://giscus.app/zh-CN), please refer to the documentation to complete the configuration of the repository and change `giscus.enable` to `true` in the inner `_config_yml`, and fill in the corresponding data.

```yml
giscus:
  enable: true
  repo: "your repo"
  repoId: "your repoId"
  category: "your category"
  categoryId: "your categoryId"
  mapping: mapping
  strict: 0
  reactionsEnabled: 1
  emitMetadata: 0
  inputPosition: bottom
  commentTheme: preferred_color_scheme
  lang: zh-CN
```

If based on [gitalk](https://gitalk.github.io/)  
Please refer to its [official documentation](https://github.com/gitalk/gitalk?tab=readme-ov-file#usage) to complete the repository configuration, and change `gitalk.enable` to `true` in the inner `_config_yml` and fill in the corresponding data.

```yml
gitalk:
  enable: true
  clientID: "your application client ID"
  clientSecret: "your application client secret"
  repo: "your repo"
  owner: "repo owner"
  admin: "repo owner and collaborators"
  md5: false # Whether to use md5 to encrypt the path
```

</details>
<details>
<summary>Site search</summary>

### Site search

If your site search is based on [Algolia](https://www.algolia.com/), please install [hexo-algoliasearch](https://github.com/LouisBarranqueiro/hexo-algoliasearch)

```bash
npm install hexo-algoliasearch --save
```

and refer to its [README](https://github.com/LouisBarranqueiro/hexo-algoliasearch#readme) to complete the configuration of the `Algolia` account, and add the following configuration to the outer `_config.yml`

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

Change `algolia_search.enable` to `true` in the inner `_config_yml`

```yaml
algolia_search:
  enable: true
```

Note: The search link is a permanent link, so please ensure that the `url` in the outer `_config.yml` is filled in correctly

If your site search is based on [hexo-generator-search](https://github.com/wzpan/hexo-generator-search), please install [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)

And refer to its [README](https://github.com/wzpan/hexo-generator-search#readme) to add the following configuration to the outer `_config.yml`

```yml
search:
  path: search.json # The filename must be search.json
  field: post
  content: true
```

In the inner `_config_yml` change `generator_search.enable` to `true

```yaml
generator_search:
  enable: true
```

</details>
<details>
<summary>Mathematical formulas</summary>

### Mathematical formulas

Math formulas are based on [Katex](https://github.com/KaTeX/KaTeX), please install [hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)

```bash
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-markdown-it-plus --save
```

Change `math.enable` to `true` in the inner `_config_yml`

```yaml
math:
  enable: true
```

</details>
<details>
<summary>Mermaid</summary>

### Mermaid

Please install [hexo-filter-mermaid-diagrams](https://github.com/webappdevelp/hexo-filter-mermaid-diagrams)

```bash
npm install hexo-filter-mermaid-diagrams --save
```

Change `mermaid.enable` to `true` in the inner `_config_yml`

```yaml
mermaid:
  enable: true
```

and add ``mermaid: true`` to the front-matter of articles that need to use mermaid.

```yaml
---
title: Hello World
mermaid: true
---
```

</details>
<details>
<summary>RSS</summary>

### RSS

Please install [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)

```bash
npm install hexo-generator-feed --save
```

and refer to its [README](https://github.com/hexojs/hexo-generator-feed#readme) to complete the configuration of the `feed` in the outer `_config.yml`  
Fill in the inner `_config.yml` with the generated `xml`

```yaml
rss: atom.xml
```

</details>

<details>
<summary>Icon</summary>

### Icon

Icon defaults to the iconfont provided with this project (v0.1.3+)

```yml
icon_font: 4552607_y484ez0be3f
```

If you want to continue using fontawesome icons, set `icon_font` to `false`, which will use the corresponding fontawesome in `vendor`.

```yml
fontawesome:
  high_priority:
    - webcache|@fortawesome/fontawesome-free@6.5.1/css/regular.min.css
    - webcache|@fortawesome/fontawesome-free@6.5.1/css/solid.min.css
  low_priority:
    - webcache|@fortawesome/fontawesome-free@6.5.1/css/brands.min.css
    - webcache|@fortawesome/fontawesome-free@6.5.1/css/v5-font-face.min.css
    - webcache|@fortawesome/fontawesome-free@6.5.1/css/v4-font-face.min.css
```

</details>

<details>
<summary>Advanced features</summary>

### Advanced features

#### firework

Enabled by default

```yaml
firework:
  enable: true
```

See [mouse-firework](https://github.com/D-Sketon/mouse-firework) for more information

#### pjax

Disabled by default

```yaml
pjax:
  enable: false
```

> pjax was introduced in v0.0.10 for those who need to add music players and other users who need SPA. However, it is still experimental and may cause bugs such as **scripts not executing**, **scripts repeating**, **pages rendering mess**, etc. Please consider it carefully!

#### ServiceWorker

Disabled by default

```yaml
service_worker:
  enable: false
```

#### live2d

Disabled by default

```yaml
live2d:
  enable: false
```

#### reimu cursor

Enabled by default

```yml
reimu_cursor: true
```

#### Responsive Banner Image (v0.2.0+)

Disabled by default, enable it on and providing the corresponding size of the image and media query can improve the LCP on mobile to some extent
```yml
banner_srcset:
enable: false
srcset:
  - src: "/images/banner-600w.webp"
    media: "(max-width: 479px)"
  - src: "/images/banner-800w.webp"
    media: "(max-width: 799px)"
  - src: "/images/banner.webp"
    media: "(min-width: 800px)"
```

#### Article copyright notice (v0.2.0+)

Disabled by default
``` yml
article_copyright: 
enable: false # Is the copyright card displayed?
content: # true | false Does the copyright card show the author?
  author: # true | false Do copyright cards show author?
  link: # true | false Do you want to show links?
  title: # true | false Do you show the title of the copyrighted card?
  date: # true | false The date the copyrighted card was created?
  updated: # true | false Copyright card show updated date?
  license: # true | false Copyright Card Showcase Agreement?
```

#### quicklink (v0.2.3+)

Enabled by default

```yaml
quicklink:
  enable: true
  timeout: 3000 # Timeout for quicklink
  priority: true # Whether to prioritize loading the page
  ignores: [] # Ignore the specified link, only support string
```

</details>
<details>
<summary>Vendor</summary>

### Vendor

v0.1.0 is a major refactoring of `vendor`, the `vendor` path is now composed of `:cdn|:package@:version/:file`, and `:cdn` can be configured in `vendor` itself. It currently comes with the following CDN sources:

```yaml
cdn_jsdelivr_gh: https://cdn.jsdelivr.net/gh/ # github acceleration only
cdn_jsdelivr_npm: https://cdn.jsdelivr.net/npm/ # npm acceleration only
fastly_jsdelivr_gh: https://fastly.jsdelivr.net/gh/ # github acceleration only
fastly_jsdelivr_npm: https://fastly.jsdelivr.net/npm/ # npm acceleration only
unpkg: https://unpkg.com/ # npm acceleration only
webcache: https://npm.webcache.cn/ # npm acceleration only
```

Users can switch between CDN sources according to network conditions.
</details>


## Contributors

[![](https://contributors-img.web.app/image?repo=D-Sketon/hexo-theme-reimu)](https://github.com/D-Sketon/hexo-theme-reimu/graphs/contributors)

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FD-Sketon%2Fhexo-theme-reimu.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FD-Sketon%2Fhexo-theme-reimu?ref=badge_large)
