<img src="https://cdn.jsdelivr.net/gh/D-Sketon/hexo-theme-reimu@main/_screenshot/Reimu_dark.png"/>
<div align = center>
  <h1>hexo-theme-reimu</h1>
  <img alt="NPM License" src="https://img.shields.io/npm/l/hexo-theme-reimu">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/hexo-theme-reimu">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/D-Sketon/hexo-theme-reimu">
  <img src="https://wakatime.com/badge/user/a6ea8444-9e83-48bb-9744-09a19ac07114/project/fe59c195-6633-4ee8-89c0-e1b24fa1fff4.svg" alt="wakatime">
  <p align="center">
  💘 Hakurei Reimu 💘
  </p>

[Demo](https://d-sketon.github.io)

[简体中文](https://github.com/D-Sketon/hexo-theme-reimu/blob/main/README.md) | English

</div>

---

A Hakurei Reimu style Hexo theme.  
A combination of [landscape](https://github.com/hexojs/hexo-theme-landscape)、[Tangyuxian](https://github.com/tangyuxian/hexo-theme-tangyuxian) and [Shoka](https://github.com/amehime/hexo-theme-shoka) themes.

|framework|repository|version|stars|
|-|-|-|-|
|[Hexo](https://hexo.io/)|[hexo-theme-reimu](https://github.com/D-Sketon/hexo-theme-reimu)|<img alt="version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2FD-Sketon%2Fhexo-theme-reimu%2Fraw%2Fmain%2Fpackage.json&query=%24.version&label=version">|<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/D-Sketon/hexo-theme-reimu">|
|[Astro](https://astro.build)|[astro-theme-reimu](https://github.com/D-Sketon/astro-theme-reimu)|<img alt="version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2FD-Sketon%2Fastro-theme-reimu%2Fraw%2Fmain%2Fpackage.json&query=%24.version&label=version">|<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/D-Sketon/astro-theme-reimu">|
|[Hugo](https://gohugo.io)|[hugo-theme-reimu](https://github.com/D-Sketon/hugo-theme-reimu)|<img alt="version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2FD-Sketon%2Fhugo-theme-reimu%2Fraw%2Fmain%2Fpackage.json&query=%24.version&label=version">|<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/D-Sketon/hugo-theme-reimu">|

**ISSUE and PR Welcome!**

## Features

- All the regular features of the blog
- Compatible with Hexo v6+
- Responsive Layout
- Code Highlighting, Code Pasting
- KaTeX / MathJax3 for displaying math formulas
- Mermaid for flowcharts
- Algolia / hexo-generator-search search
- valine / waline / twikoo / gitalk / giscus comment system
- valine / waline article reading statistics
- Busuanzi Visitor Statistics
- RSS support
- Both iconfont and fontawesome are supported.
- Night mode
- Lazy image loading
- Load Animation
- TOC
- Mouse firework animation
- pjax
- ServiceWorker
- live2d
- reimu Mouse Pointer
- Internal tag plugin for providing internal/external/friendly link cards
- Support the bottom of the article copyright statement
- Support for configuring custom CDN sources
- Highly customizable

## Installation

> The pure beginner can use [reimu-template](https://github.com/D-Sketon/reimu-template) directly. It comes with hexo, hexo-theme-reimu and other packages pre-installed, so just clone the repository - install dependencies - change the configuration and you've got a basic blog!

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
<summary>Code Block</summary>

### Code Block

To ensure that the code blocks are displayed correctly, please ensure that the outer `_config.yml` is configured as follows
(Hexo <7.0.0)

```yaml
highlight:
  enable: true
  wrap: true
  hljs: false
prismjs:
  enable: false
```

(Hexo >=7.0.0)

```yaml
syntax_highlighter: highlight.js
highlight:
  wrap: true
  hljs: false
```

The code block also provides a code paste function. Click the copy button in the upper right corner of the code block to copy the code. In the inner `_config.yml`, you can configure the copy function.   
`success` is the prompt when the copy is successful, and `fail` is the prompt when the copy fails. In addition, you can configure the copyright statement. When the number of characters copied is greater than `count`, the content copied will be followed by the `content` copyright.

```yaml
clipboard:
  success: 复制成功(*^▽^*)
  fail: 复制失败 (ﾟ⊿ﾟ)ﾂ
  copyright:
    enable: false
    count: 50 # The number of characters when the copyright is displayed
    content: 本文版权：本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！
```

v1.1.0 add configuration to control the default expansion status of the code block, `expand` can be set to `true`, `false` or a number, the number means that when the number of lines of the code block is greater than the number, it is collapsed by default.

```yaml
code_block:
  expand: true # true | false | number
```

</details>
<details>
<summary>Site comments</summary>

### Site comments

> In-site comments can be controlled independently of each post using `comments` in Front matter.  
> Comments are not shown when `comments` is `false`, and are shown or not shown when `true` or not filled in, depending on the `_config.yml` configuration.

If based on [Valine](https://valine.js.org/)  
Please refer to its official documentation to complete the configuration of `LeanCloud` and change `valine.enable` to `true` in the inner `_config.yml` and fill in your own `appId` and `appKey`

```yaml
valine:
  enable: true
  appId: "your appId"
  appKey: "your appKey"
```

If based on [Waline](https://waline.js.org/)  
Please refer to its [official documentation](https://waline.js.org/guide/get-started/) to complete the `LeanCloud` configuration and change `waline.enable` to `true` in the inner `_config.yml`, and fill in your own `serverURL`

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
Please refer to its [official documentation](https://twikoo.js.org/quick-start.html) to complete the Tencent Cloud or Vercel deployment, and change `twikoo.enable` to `true` in the inner `_config.yml`, and fill in your own `envId`.

```yml
twikoo:
  enable: true
  envId: # Tencent cloud environment fill envId; Vercel environment fill address (https://xxx.vercel.app)
  region:
```

If based on [giscus](https://giscus.app/zh-CN), please refer to the documentation to complete the configuration of the repository and change `giscus.enable` to `true` in the inner `_config.yml`, and fill in the corresponding data.

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
  lang: zh-CN
```

If based on [gitalk](https://gitalk.github.io/)  
Please refer to its [official documentation](https://github.com/gitalk/gitalk?tab=readme-ov-file#usage) to complete the repository configuration, and change `gitalk.enable` to `true` in the inner `_config.yml` and fill in the corresponding data.

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

Change `algolia_search.enable` to `true` in the inner `_config.yml`

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

In the inner `_config.yml` change `generator_search.enable` to `true

```yaml
generator_search:
  enable: true
```

</details>
<details>
<summary>Mathematical formulas</summary>

### Mathematical formulas

please install [@reimujs/hexo-renderer-markdown-it-plus](https://github.com/D-Sketon/hexo-renderer-markdown-it-plus)

```bash
npm uninstall hexo-renderer-marked --save
npm install @reimujs/hexo-renderer-markdown-it-plus --save
```

Disable by default, enable math formula support by changing `math.enable` to `true` in the inner `_config.yml`

> Note: Do not enable both KaTeX and MathJax3

#### KaTeX

If you want to use server-side rendering, please change `math.katex.enable` to `true` in the inner `_config.yml`

```yaml
math:
  enable: true
  katex:
    enable: true
    autoRender: false
```

If you want to use client-side rendering, please change `math.katex.enable` to `true` in the inner `_config.yml`, and change `autoRender` to `true`

```yaml
math:
  enable: true
  katex:
    enable: true
    autoRender: true
```

And add the following configuration to the outer `_config.yml`

```yaml
markdown_it_plus:
  rawLaTeX: true
```

#### MathJax3

If you want to use MathJax3, please change `math.mathjax.enable` to `true` in the inner `_config.yml`

```yaml
math:
  enable: true
  mathjax:
    enable: true
    options: # MathJax3 Options
```

And add the following configuration to the outer `_config.yml`

```yaml
markdown_it_plus:
  rawLaTeX: true
```

</details>
<details>
<summary>Mermaid</summary>

### Mermaid

Please install [hexo-filter-mermaid-diagrams](https://github.com/webappdevelp/hexo-filter-mermaid-diagrams)

```bash
npm install hexo-filter-mermaid-diagrams --save
```

Change `mermaid.enable` to `true` in the inner `_config.yml`

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
icon_font: 4552607_tq6stt6tcg
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

#### Pace

Enabled by default

```yaml
pace:
  enable: true
```

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

Besides, you can also control it through the front-matter of the article, which takes precedence over the global configuration

```yaml
---
copyright: true # Whether to display the copyright card
---
```

#### quicklink (v0.2.3+)

Disabled by default

```yaml
quicklink:
  enable: false
  timeout: 3000 # Timeout for quicklink
  priority: true # Whether to prioritize loading the page
  ignores: [] # Ignore the specified link, only support string
```

#### outdate warning (v0.2.4+)

Disabled by default

```yaml
outdate:
  enable: false
  daysAgo: 180 # The number of days after which the article is considered outdated
  message: 本文最后更新于 {time}，请注意文中内容可能已经发生变化。
```

#### sponsor (v0.3.2+)

Disabled by default

```yaml
sponsor:
  enable: false # Whether to enable sponsorship
  tip: 请作者喝杯咖啡吧！ # Sponsorship prompt
  icon:
    url: "../images/taichi.png" # this path is relative to the css/style.css, so it needs to go up one level to reach the images folder
    rotate: true
    mask: true # whether to use the images as a mask
  qr:
    - name: 支付宝 # Payment method
      src: "/sponsor/alipay.jpg" # QR code
```

Besides, you can also control it through the front-matter of the article, which takes precedence over the global configuration

```yaml
---
sponsor: true # Whether to display the sponsorship
---
```

#### home categories card (v1.0.0+)

Disable by default, enable it to display the category card on the homepage, which can replace the directory in the widget

```yaml
home_categories:
  enable: false # Whether to display the home category card?
  content:
    - categories: # Category name, the format is consistent with the categories in the front-matter, which can be a string (single-level category) or an array (multi-level category)
      cover: # Card cover, if not filled in, a random cover will be used
    - categories:
      cover:
```

</details>


<details>
<summary>Inner Card Tag</summary>

### Inner Card Tag

#### friendLink

```yaml
{% friendsLink path %}
```

The first parameter `path` represents the path of the friend link yaml

#### postLinkCard

```yaml
{% postLinkCard slug [cover]|"auto" [escape] %}
```

The first parameter is the `slug` of the article; the second parameter (optional) is the cover displayed on the card, if set to `auto`, the blog's `banner` is automatically used; the third parameter (optional) indicates whether the article title is escaped

> The slug generation algorithm: https://github.com/hexojs/hexo-util/blob/master/lib/slugize.ts

#### externalLinkCard

```yaml
{% externalLinkCard title link [cover]|"auto" %}
```

The first parameter is the title of the article; the second parameter is the external link of the article; the third parameter (optional) is the cover displayed on the card, if set to `auto`, the default cover is automatically used

</details>

<details>
<summary>Customize theme</summary>


#### Customize theme color

hexo-theme-reimu supports customizing theme colors through CSS variables. You can customize your theme colors by modifying the CSS variables under the `:root` pseudo-class.

The variable file is located at `source/css/_variables.styl`, where you can find all the CSS variables, but you only need to modify the variables under the following pseudo-classes:

```stylus
:root
  --red-0: hsl(0, 100%, 50%)
  --red-1: hsl(0, 100%, 66%)
  --red-2: hsl(0, 100%, 74%)
  --red-3: hsl(0, 100%, 84%)
  --red-4: hsl(0, 100%, 91%)
  --red-5: hsl(0, 100%, 95%)
  --red-5-5: hsl(0, 100%, 96%)
  --red-6: hsl(0, 100%, 98%)

  --color-red-6-shadow: hsla(0, 100%, 65%, 0.6)
  --color-red-3-shadow: hsla(0, 100%, 65%, 0.3)


[data-theme="dark"]
  root
    --red-4: hsla(0, 100%, 91%, 0.5)
    --red-5: hsla(0, 100%, 95%, 0.2)
    --red-5-5: hsla(0, 100%, 96%, 0.1)
    --red-6: hsla(0, 100%, 98%, 0.2)
```

#### Customize theme font

You can define Google fonts through the following configuration:

```yaml
# https://fonts.google.com/
font:
  article:
    - Mulish
    - Noto Serif SC
  code:
    # - Ubuntu Mono
    # - Source Code Pro
    # - JetBrains Mono
```

v1.1.0 added the `local_font` configuration to define local fonts, which have a lower priority than Google fonts:

```yaml
local_font:
  article:
    - "-apple-system"
    - PingFang SC
    - Microsoft YaHei
    - sans-serif
  code:
    - Menlo
    - Monaco
    - Consolas
    - monospace
```

#### Customize theme icon

v1.0.0 adds a lot of configuration to change the original icon, you can change the icon by modifying the following configuration:

##### Header / Sidebar Icon

The structure of the `menu` configuration in v1.0.0 has changed, allowing users to customize the icon. When the icon is empty, the Taiji icon is used by default. You can fill in a hexadecimal number to customize the icon, and support fontawesome and icon font.

```yaml
menu:
  - name: home
    url: /
    icon: # if the icon is empty, the Taiji icon is used by default
  - name: archives
    url: /archives
    icon: f0c1 # You can fill in the fontawesome / iconfont icon code
  - name: about
    url: /about
    icon:
  - name: friend
    url: /friend
    icon:
```

##### Footer / Back to Top / Sponsor Icon

v1.1.0 add `icon` configuration to the `footer`, `top`, `sponsor` configuration for custom icons.

- `url` is the path of the icon, which is relative to the path of `css/style.css`, so you need to go up one level to find the images folder.
- `rotate` is whether to rotate the icon, the default is `true`.
- `mask` is whether to use the image as a mask (i.e., only display the outline of the png image), the default is `true`.

```yaml
footer:
  icon:
    url: "../images/taichi.png"
    rotate: true
    mask: true

top:
  icon:
    url: "../images/taichi.png"
    rotate: true
    mask: true

sponsor:
  icon:
    url: "../images/taichi.png"
    rotate: true
    mask: true
```

##### Loading Icon

v1.1.0 adds the `icon` configuration to the `preloader` configuration for custom icons. When the icon is empty, the default svg is used, which is inlined to ensure the loading speed of the first screen. You can fill in a link to customize the loading icon.

Do not use too large icons to avoid affecting loading speed.

```yaml
preloader:
  enable: true
  text: 少女祈祷中...
  icon: # if the icon is empty, the default svg is used, which is inlined to ensure the loading speed of the first screen. You can fill in a link to customize the loading icon, such as '/images/taichi.png'
```

##### Anchor Icon

v1.1.0 adds the `icon` configuration to the `anchor_icon` configuration for custom icons. When the icon is empty, the default `#` icon is used. You can fill in a hexadecimal number to customize the icon, and support fontawesome and icon font.

```yaml
anchor_icon: # if the icon is empty, the default # icon is used
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
