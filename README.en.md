# hexo-theme-reimu
A Hakurei Reimu style Hexo theme.  
A combination of [landscape](https://github.com/hexojs/hexo-theme-landscape)、[Tangyuxian](https://github.com/tangyuxian/hexo-theme-tangyuxian) and [Shoka](https://github.com/amehime/hexo-theme-shoka) themes.  

[Demo](https://d-sketon.github.io)   
## ScreenShot
![screenshot](https://fastly.jsdelivr.net/gh/D-Sketon/blog-img/Reimu.jpg)

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
### Basic structure
For correct display, please refer to `_example` and create separate `_data`, `about` and `friend` folders in `_source`
#### _data
- The `avatar` folder stores the author's avatar, named `avatar.jpg` by default, and can be configured in the inner `_config.yml` as follows
```yaml
avatar: "avatar.jpg"
```
- The `covers` folder stores the article covers
- The `covers.yml` file stores the article cover urls
#### about
`index.md` as the **about** page
#### friend
`index.md` as the **friends** page, fill in `_data.yml` with friend information to display the corresponding friend card on the page
###  Cover, banner and favicon
#### Cover
The logic for displaying the cover is as follows  
- If the Front matter of the article contains cover information, the url will be displayed
```yaml
---
title: Hello World
cover: https://example.com
---
```
- Otherwise, look for the `covers` folder and `covers.yml` and pick a random image from it
- If none of these files exist, display the banner
#### banner
The banner is stored in `themes/reimu/source/images/banner.jpg` and can be modified in the inner `_config.yml`
```yaml
banner: "/images/banner.jpg"
```
#### favicon
The favicon is stored in `themes/reimu/source/images/favicon.ico`，and can be modified in the inner `_config.yml`
```yaml
favicon: "/images/favicon.ico"
```
### Code highlighting
To ensure that the code blocks are displayed correctly, please ensure that the outer `_config.yml` is configured as follows
```yaml
highlight:
  enable: true
  wrap: true
  hljs: false
prismjs:
  enable: false
```
### Site comments
Site comments are based on [Valine](https://valine.js.org/)  
Please refer to its official documentation to complete the configuration of `LeanCloud` and change `valine.enable` to `true` in the inner `_config_yml` and fill in your own `appId` and `appKey`
```yaml
valine:
  enable: true
  appId: 'your appId'
  appKey: 'your appKey'
```
### Site search
The site search is based on [Algolia](https://www.algolia.com/), please install [hexo-algolia](https://github.com/thom4parisot/hexo-algolia)
```bash
npm install hexo-algolia --save
```
and refer to its [README](https://github.com/thom4parisot/hexo-algolia#readme) to complete the configuration of the `Algolia` account, and add the following configuration to the outer `_confg.yml`
```yml
algolia:
  applicationID: 'your applicationID'
  apiKey: 'your apiKey'
  adminApiKey: 'your adminApiKey'
  indexName: 'your indexName'
  chunkSize: 5000
```
Change `algolia_search.enable` to `true` in the inner `_config_yml`
```yaml
algolia_search:
  enable: true
```
Note: The search link is a permanent link, so please ensure that the `url` in the outer `_config.yml` is filled in correctly
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
## License
MIT License
