# hexo-theme-reimu
一款博丽灵梦风格的Hexo主题  
融合了[landscape](https://github.com/hexojs/hexo-theme-landscape)、[Tangyuxian](https://github.com/tangyuxian/hexo-theme-tangyuxian)和[Shoka](https://github.com/amehime/hexo-theme-shoka)三个主题  

[Demo](https://d-sketon.github.io)  

[English README](README.en.md)  
## 截图
![screenshot](https://fastly.jsdelivr.net/gh/D-Sketon/blog-img/Reimu.jpg)

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
使用npm
```bash
npm install hexo-theme-reimu --save
```
或直接克隆本仓库至`/themes`文件夹下并重命名为`reimu`
```bash
git clone https://github.com/D-Sketon/hexo-theme-reimu.git
```
并修改 `_config.yml` 中的theme
```yaml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: reimu
```
## 使用
### 基本结构
为了保证显示正确，请参考 `_example` 在 `_source` 中分别建立 `_data`、`about` 和 `friend` 文件夹
#### _data
- `avatar` 文件夹中存储作者头像，默认命名 `avatar.jpg`，可在 内层 `_config.yml` 中做如下配置
```yaml
avatar: "avatar.jpg"
```
- `covers` 文件夹中存储文章封面
- `covers.yml` 中存储文章封面url
#### about
`index.md` 作为**关于**页面
#### friend
`index.md` 作为**友链**页面，在 `_data.yml` 中填入友链信息即可在页面上显示对应好友卡片
### 封面、头图和图标
#### 封面
封面显示逻辑如下
- 如果文章的Front matter中包含cover信息，则显示该url
```yaml
---
title: Hello World
cover: https://example.com
---
```
- 否则查找 `covers` 文件夹和 `covers.yml`，并从中随机挑选图片
- 若上述文件均不存在，则显示头图
#### 头图
头图保存于 `themes/reimu/source/css/images/banner.jpg`，可在内层 `_config.yml`中修改
```yaml
banner: "images/banner.jpg"
```
#### 图标
图标保存于 `themes/reimu/source/css/images/favicon.ico`，可在内层 `_config.yml`中修改
```yaml
favicon: "images/favicon.ico"
```
### 代码高亮
为保证代码块的正确显示，请保证外层 `_config.yml` 中为如下配置
```yaml
highlight:
  enable: true
  wrap: true
  hljs: false
prismjs:
  enable: false
```
### 站内评论
站内评论基于 [Valine](https://valine.js.org/)  
请参考其官方文档完成 `LeanCloud` 的配置，并在内层 `_config_yml` 中将 `valine.enable` 改为 `true`，并填入自己的 `appId` 和 `appKey`
```yaml
valine:
  enable: true
  appId: 'your appId'
  appKey: 'your appKey'
```
### 站内搜索
站内搜索基于 [Algolia](https://www.algolia.com/)，请安装 [hexo-algolia](https://github.com/thom4parisot/hexo-algolia)
```bash
npm install hexo-algolia --save
```
并参考其 [README](https://github.com/thom4parisot/hexo-algolia#readme) 和 [为Hexo增加algolia搜索功能](https://blog.csdn.net/qq_35479468/article/details/107335663) 完成对 `Algolia` 账号的配置，并在外层 `_confg.yml` 中添加如下配置
```yml
algolia:
  applicationID: 'your applicationID'
  apiKey: 'your apiKey'
  adminApiKey: 'your adminApiKey'
  indexName: 'your indexName'
  chunkSize: 5000
```
在内层 `_config_yml` 中将 `algolia_search.enable` 改为 `true`
```yaml
algolia_search:
  enable: true
```
注意：搜索跳转链接为永久链接，所以请保证外层 `_config.yml` 中的 `url` 填写正确
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
## 许可
MIT License