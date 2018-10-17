## 前言
最近秋招之余空出时间来按自己的兴趣动手做了一个项目，一个基于`vue，typescript，pwa`的实验浏览移动端webapp，现在趁热打铁，将这个项目从开发到部署整个过程记录下来，并将从这个项目中学习到的东西分享出来，如果大家有什么意见或补充也可以在issues提出。先介绍一下这个项目
## 项目介绍
![browseexp](https://user-gold-cdn.xitu.io/2018/9/21/165f7ec4f3a3927c?w=714&h=292&f=png&s=142513)

基于vue，typescript，pwa的一个移动端webapp，取名叫browseExp，主要功能是浏览学校心理学院部分实验信息。（上图是添加到桌面的一级入口）。这个项目已经部署到了服务器上，我们看一下项目最终在客户端运行的样子

![show](https://raw.githubusercontent.com/HolyZheng/holyZheng-blog/master/images/beshow.gif)

可以看到我通过桌面上的一级入口，进入了我们的webapp，并且在断网的条件下进行。这就是pwa的作用，下面开始分享这次的开发到部署的过程。
## 为什么要做这个项目呢？
1. pwa 在国内已经火过一段时间了，但是自己还没做过一款pwa应用。
2. vue-cli 3.0 增加了对pwa的支持
3. vue2.5后增加了对ts的支持
4. 想搞事情！
## 开发过程
这个项目的地址为: [browseExp pwa](https://github.com/HolyZheng/BrowseExp)，想要查看代码的同学可以看一下。这个项目要注意的点主要是：
- 在vue中使用ts
- 简单骨架屏的运用
- 首屏加载时间和seo的优化
- pwa相关特性的实现
- 移动端的一些问题解决
- 如何部署项目

后面的内容也围绕着这些点来展开。
### vue中使用ts
使用ts主要是因为ts给我们带来了类型系统，可以让我们写出健壮的代码，它的作用在大型项目中尤其突出，所以还是非常鼓励大家去使用的，我们使用ts进行开发一般是编写基于类的vue组件，所以可以使用官方维护的[vue-class-component](https://github.com/vuejs/vue-class-component)或者[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)，vue-cli3.0也给我们提供了开箱即用的typescript支持，开发体验还是相当友好的。一个vue组件demo：
```js
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Name extends Vue {
  @Prop() private name!: string;
  private complete!: boolean;
  private data() {
    return {
      complete: false,
    };
  }
  private myMethod() {
    // ...
  }
  private created() {
    // ...
  }
}
```
另外，在vue-cli3.0提供的脚手架下，可以在`shims-tsx.d.ts`文件下添加全局接口或变量等，在`shims-vue.d.ts`定义第三方包的类型声明。

### 骨架屏的简单运用
骨架屏（skeleton screen）已经不是什么新奇的概念，他的主要作用就是用来过渡页面的空白状态，提升用户体验，比如页面跳转等待，数据加载等待等，传统的骨架平实现方案有 服务端渲染和预渲染等，而这个项目中引入骨架屏主要是想过渡数据加载时页面的局部空白状态，所以就直接采用编写一个骨架屏组件[SkeletonExp.vue](https://github.com/HolyZheng/BrowseExp/blob/master/src/components/Skeleton/SkeletonExp.vue)的方式来过渡。

![skeletonOne](https://user-gold-cdn.xitu.io/2018/9/21/165f7ec4f70c294f?w=305&h=441&f=png&s=27496)
![skeletonOne](https://user-gold-cdn.xitu.io/2018/9/21/165f7ec506e60b45?w=308&h=539&f=png&s=5685)

如果你对骨架屏有更大的需求，可以在网上搜到更多的教程，这里就不列举了。
### 首屏加载速度和seo的优化
单页应用（single page web application，SPA）一个缺点就是首次加载需要加载较多的内容，所以首屏加载时间就会比较长。另外，单页应用因为数据前置到了前端，不利于搜索引擎的抓取。所以我们需要对自己的单页应用进行一些优化。这里我们使用了`prerender-spa-plugin`这个webpack插件，他的作用就是将我们指定的路由进行预渲染到html，进而解决首次加载白屏时间长问题，以及一定程度上解决seo问题。在vue-cli3.0中，我们的相关配置是被隐藏起来的，我们可以通过vue.config.js来将我们的配置合并到默认配置中。
```js
// vue.config.js

const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  configureWebpack(config) {
    if (process.env.NODE_ENV !== 'production') return;
    return  {
      plugins: [
        new PrerenderSPAPlugin({
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, 'dist'),
          // Required - Routes to render.
          routes: ['/'],
        })
      ]
    }
  },
}
```
效果：
![prerender](https://user-gold-cdn.xitu.io/2018/9/21/165f7ec4f70c055a?w=331&h=556&f=gif&s=118884)

上图是该app在网络环境为`slow 3G`下首次打开时的效果，可以看到整个过程，先由谷歌页面跳至browseExp，首先引入眼帘的是我们的预渲染页面，它代替我网址跳转后应用加载的白屏时间，（前面的小段白屏是页面跳转的白屏，不是应用加载的白屏）然后加载完毕后就会去请求我们的数据，这时候骨架屏就出现了，过渡这段页面局部白屏的时间，最后为真实的页面。
**预渲染也有它的缺点**：那就是预渲染的页面内容可能与真实内容由一定出入，而且还无法交互。所以如果应用的内容具有很强的实时性和交互性的话，可以考虑采用骨架屏的方式来进行首屏加载的白屏过渡，但是这样就无法优化seo了，所以按自己的实际场景来做选择。


**另外**对于首屏加载速度还可以通过**组件懒加载**的方式，对组件进行懒加载，只有当需要默写组件的时候才去加载他们，也可以减少首屏加载需要加载的文件大小，提高首屏加载速度，也有利于service worker对app shell进行颗粒度更小的缓存。结合Vue的异步组件和webpack的代码分割功能，轻松实现路由组件的懒加载，例如
```JS
// router.js通过动态import来引入组件，其他
import Vue from 'vue';
import Router from 'vue-router';
//这里用home组件做例子
const Home = () => import('./views/Home/Home.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
  ],
});
```
这样就可以对我们的路由组件进行懒加载了，你会发现我们的代码会按组件为单位打包成了多个js文件。

## 将项目升级为 pwa
在我们的项目基本成型之后，可以考虑将其升级为pwa了。关于pwa是什么，我相信大家都知道，这玩意在国外已经火了几百年了，但国内除了几家大公司，貌似没多少人去尝试它，不过在上一年开始，pwa在国内还是热了一下的。pwa是我们在追求webapp便捷和原生应用良好体验结合的过程中的产物，目前兼容性是最大障碍，但相信它在国内的前景还是明朗的。pwa的特性有可离线、添加到桌面（一级入口）、后台同步、服务端推送等等，这个项目的话实现了可离线和添加到桌面这两个功能。起初听闻pwa时以为会很复杂，实践后发现很简单。

ps: 开发过程在控制台的Application中可调试对应内容

![](https://user-gold-cdn.xitu.io/2018/9/21/165f7ec4f7179c2c?w=688&h=403&f=png&s=28655)
### workbox
[workbox](https://developers.google.com/web/tools/workbox/) 是pwa的一个工具集合，围绕它的还有一些列工具，如 workbox-cli、gulp-workbox、workbox-webpack-plagin 等等，workbox本身相当于[service worker](https://developers.google.com/web/fundamentals/primers/service-workers/)的一个框架，封装了各种api，和缓存策略，可以让我们更加便捷的使用service worker。vue-cli3.0集成的是workbox-webpack-plagin，我们可以通过vue.config.js的pwa配置项进行配置
首先，在vue.config.js文件中的进行配置，更详细的[配置项](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa)
```js
// vue.config.js

module.exports = {
  pwa: {
    // 一些基础配置
    name: 'Browsing-Exp',
    themeColor: '#6476DB',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

/*
* 两个模式，GenerateSW（默认）和 InjectManifest
* GenerateSW 在我们build项目时候，每次都会新建一个service worker文件
* InjectManifest 可以让我们编辑一个自定义的service worker文件，实现更多的功能，并且可以
* 拿到预缓存列表
*/
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // 自定义的service worker文件的位置
      swSrc: 'src/service-worker.js',
      // ...other Workbox options...
    }
}
```

然后我们需要在src文件目录下面新建一个service-worker.js，这里拿此项目做例子，workbox的常用接口有：
- workbox.precaching 对静态支援进行缓存
- workbox.routing 进行路由控制
- workbox.strategies 提供缓存策略
- 等等

更详细的 [接口和配置教程](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin) 
```js
// src/service-worker.js

// 设置相应缓存的名字的前缀和后缀
workbox.core.setCacheNameDetails({
  prefix: 'browse-exp',
  suffix: 'v1.0.0',
});
// 让我们的service worker尽快的得到更新和获取页面的控制权
workbox.skipWaiting();
workbox.clientsClaim();

/*
* vue-cli3.0通过workbox-webpack-plagin 来实现相关功能，我们需要加入
* 以下语句来获取预缓存列表和预缓存他们，也就是打包项目后生产的html，js，css等* 静态文件
*/
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// 对我们请求的数据进行缓存，这里采用 networkFirst 策略
workbox.routing.registerRoute(
  new RegExp('.*experiments\?.*'), 
  workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
  new RegExp('.*experiments/\\d'),
  workbox.strategies.networkFirst()  
)
workbox.routing.registerRoute(
  new RegExp('.*experiment_types.*'),
  workbox.strategies.networkFirst()
)

```
在这里，首先通过`workbox.precaching.precacheAndRoute`配置app shell的预缓存，然后就是通过`workbox.routing.registerRoute`对请求数据的缓存，因为对于请求的数据有一定的实时性要求，所以采用网络优先策略 networkFirst ，这里随便提一下相关的策略：
#### networkFirst
网络优先策略，优先尝试通过网络请求来获取数据，拿到数据后将数据返回给用户，并更新缓存，获取数据失败就使用缓存中的数据。
#### cacheFirst
缓存优先策略，优先获取缓存中的资源，如果缓存中没有相关资源，那么就发起网络请求。
#### networkOnly
顾名思义，只使用网络请求获取的资源
#### cacheOnly
顾名思义，只使用缓存中的资源
#### stateWhileRevalidate
此策略会直接返回缓存中的资源，确保获取资源的速度，然后再发起网络请求获取数据去更新缓存中的资源。如果缓存中没有对应资源的话就会发起网络请求，并缓存资源。

### 如何查看效果呢
这些配置可以让我们的得以在离线环境下运行，但是这些配置都是相对于打包出来的项目文件的，也就是dist文件里的内容。我们在开发过程的dev模式是体验不到效果的，我们怎么查看效果呢？
- 方案1：编写一个后台服务，我们可以通过node.js等编写一个后台服务去访问我们的应用，service worker本来需要在https环境下运行，但是如果是本地 localhost 环境的话，service worker可以在http协议上运行。
- 方案2：借助google提供的chrome扩展应用[Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)为我们的应用启动一个服务，比较灵活，所以我采用了这种方式。

#### Web Server for Chrome
点击`choose foloer`选择我们的dist文件夹，勾选`Automatically show index.html`开启服务，我们就可以通过下面的链接访问应用了，通过勾选`Accessible on local network`还可以生成另一个地址，可以让我们在手机端访问应用。
![webserver1](https://user-gold-cdn.xitu.io/2018/9/21/165f7ec5691f72fb?w=214&h=207&f=png&s=17624)

![webserver2](https://user-gold-cdn.xitu.io/2018/9/21/165f7ec583c890fa?w=284&h=565&f=png&s=40165)

### manifest.json 网络应用清单
manifest.json 提供了将webapp 添加到设备主屏幕的功能，更详细的[配置内容](https://developers.google.com/web/fundamentals/web-app-manifest/)在此查看。我们可以通过它给我们的应用设置图标，启动动画，背景颜色等等。它在我们项目的public下：
```json
// public/manifest.json
// 最基本的配置内容

{
  "name": "浏览我们的实验吧！",
  "short_name": "BrowseExp",
  "icons": [
    {
      "src": "/img/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/img/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#4DBA87"
}

```
当浏览器（支持此功能的浏览器）检测到目录中的manifest.json文件时，就会读取其中的内容。在适当的时机弹出询问框，询问是否将应用添加到桌面。注意它不会在第一次访问就弹出，而是发现用户在一定时间内多次访问该网站时才会弹出。在开发过程中我们可以点击Application -> Manifest -> Add to homescreen 触发弹框弹出。

## 移动端其他小问题
作为移动端web app，我们需要解决一些常见的小问题，比如：
- 各浏览器间样式统一问题
- 移动端点击300ms延迟问题
- 点透事件
- rem的运用
#### 1.各浏览器间样式统一问题
常见做法就是引入`normalize.css`重置我们设备的默认样式，使得各浏览器的默认样式高度一致，避免我们的布局出现意想不到的情况。
#### 2.点击300ms延迟和点透事件
因为我们的移动端的浏览器需要判断用户是否想要双击放大，所以会有一个300ms的延迟来查看用户是否双击屏幕；点透事件就是当我们混用touch和click事件的时候，在touch事件响应后，如果该元素隐藏掉，那么300ms后同一位置的底层元素的click事件就会被触发。对于它们常用的解决方法就是引入 `fastclick.js `，这个库的原理就是：修改浏览器的touch事件来模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉。让前端开发人员可以以熟悉的click来书写代码
#### 3.rem的运用
移动端我们常常会使用到rem来进行响应式的布局，我们通常会将`html`的`font-size`设置为 `62.5%`，那么我们的 1rem = 10px，便于我们的单位转换。


## 项目部署
开发完毕后，就需要把我们的项目部署到自己的服务器上面去
### 编写一个服务
首先我们编写一个后端服务，让我们可以访问到项目的index.html文件，这里采用express起个服务。
```js
// browse-exp.js
const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express();

app.use(express.static(path.resolve(__dirname, './dist')))
app.get('*', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})

app.listen(3002, function() {
  console.log('server listening on port 3002!')
})

```
然后将项目通过比如ftp等工具上传到服务器，我用的服务器是nginx，它的特点就是轻量级，高并发，可配置反向代理。然后需要配置个代理将我们对服务器的访问代理到该项目。在`etc/nginx/conf.d`目录下创建我们的配置文件 `holyzheng-top-3002.conf`
```conf
# etc/nginx/conf.d/holyzheng-top-3002.conf

# 实例，代表我们的应用
upstream browseexp {
  server 127.0.0.1:3002; 
}
# 将以http协议对我们项目的访问转到https协议
server {
  listen 80; # http监听的端口
  server_name browseexp.holyzheng.top; # 我要使用的ip域名
  error_page 405 =200 @405; # 允许对静态资源进行POST请求
  location @405 {
    proxy_pass http://browseexp;
  }
  rewrite ^(.*) https://$host$1 permanent;
}

# 配置代理，将对域名browseexp.holyzheng.top的访问代理到服务端的127.0.0.1:3002
# 也就是我们的应用
server {
  listen 443;
  server_name browseexp.holyzheng.top;
# 跟证书有关的配置，在申请证书的时候会有提示这部分配置
  ssl on;
  ssl_certificate /etc/nginx/cert/1538045542271.pem;
  ssl_certificate_key /etc/nginx/cert/1538045542271.key;
  ssl_session_timeout 5m;
  ssl_protocols SSLv2 SSLv3 TLSv1;
  ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
  ssl_prefer_server_ciphers on;

  if ($ssl_protocol = "") { # 判断用户是否输入协议
    rewrite ^(.*) https://$host$1 permanent;
  }

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;

    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;

    proxy_pass http://browseexp; # 要代理的实例
  }
}

```
这样我们就可以通过对于域名来访问了来访问该项目了。这里给出对应二维码，可以进行访问查看：

![qrcore](https://user-gold-cdn.xitu.io/2018/9/21/165f7ec5c5b7377c?w=260&h=260&f=png&s=6183)

下面是在安卓端UC浏览器访问的结果（UC对pwa的支持十分好），在几次访问我们的应用后就弹出了相关的提示，点击“好的”就可以添加到主屏幕了。

![pwademo1](https://user-gold-cdn.xitu.io/2018/9/21/165f7ec5c3d79026?w=297&h=524&f=png&s=69391)


## 结语
我非常享受尝试新事物（自己没做过）的这个过程，这次记录下来并分享给大家，希望对大家有帮助，如果大家看后有什么补充或意见的话，欢迎issues提出。项目地址：[browse-Exp](https://github.com/HolyZheng/BrowseExp)

