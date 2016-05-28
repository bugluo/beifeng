#Node.js

### Node.js的本质
Node.js不是JS应用、而是JS运行平台。

### 为什么要用Node.js
Node.js采用了Google Chrome浏览器的V8引擎，性能很好，同时还提供了很多系统级的API，如文件操作、网络编程等。浏览器端的Javascript代码在运行时会受到各种安全性的限制，对客户系统的操作有限。相比之下，Node.js则是一个全面的后台运行时，为Javascript提供了其他语言能够实现的许多功能。

一个前端语言可以做后端的事，有想象空间。
Node.js采用事件驱动、异步编程，为网络服务而设计。听上去性能还可以。

### Node.js主要用处

1. 前端工程化 gulp Webpack
2. 增删改查功能
3. websocket需求

### Node.js的弱势

1.数值计算
2.没有nginx这样超级优秀的原生webserver

### 安装 Node.js


<a href="http://nodejs.org">nodejs.org</a>

OK，我们在终端中输入

```
$ node
```

REPL(read–eval–print loop) 应该就出来了，那我们就成功了。

随便敲两行命令玩玩吧。

比如 `> console.log(1)`


### 装一个nvm

nodejs有一个很坑爹的地方，版本太多太多，所以我们装一个叫n的版本控制程序

### 《一个最简单的 express 应用》

#### 什么是express

基于 Node.js 平台，快速、开放、极简的 web 开发框架。
学习这个有什么用？
框架帮我们完成一些重复的东西，约定一些有用的东西。
只是在它之上扩展了 Web 应用所需的基本功能。

#### 目标

建立一个 lesson1 项目，在其中编写代码。当在浏览器中访问 `http://localhost:3000/` 时，输出 `Hello World`。

#### 挑战

访问 `http://localhost:3000/` 时，输出 `Hello World`。

#### 知识点

1. 包管理器 npm 。使用 npm 安装包，并自动安装所需依赖。
2. 框架 express 。学习新建 express 实例，并定义 routes ，产生输出。

#### 课程内容

按照惯例，我们来个 helloworld 入门。

#### 包管理器 npm

npm 可以自动管理包的依赖. 只需要安装你想要的包, 不必考虑这个包的依赖包.

在 PHP 中, 包管理使用的 `Composer`, python 中，包管理使用 `easy_install` 或者 `pip`，ruby 中我们使用 `gem`。而在 Node.js 中，对应就是 `npm`，npm 是 `Node.js Package Manager` 的意思。

#### 框架 Express

express 是 Node.js 应用最广泛的 web 框架，现在是 4.x 版本，它非常薄。跟 Rails 比起来，完全两个极端。

express 的官网是 http://expressjs.com/ ，我常常上去看它的 API。

首先我们需要得到一个 express。

不同于 ruby 的 gem 装在全局，Node.js 的依赖是以项目为单位管理的，直接就安装在项目的 `node_modules` 目录下，而且每个依赖都可以有指定版本的其他依赖，这些依赖像一棵树一样。根据我自己的使用经验来说，npm 的体验在 pip 和 gem 之上。

OK，新建一个文件夹叫 lesson1 的，进去里面安装 express

```
$ mkdir lesson1 && cd lesson1
# 这里没有从官方 npm 安装，而是使用了大淘宝的 npm 镜像
$ npm install express --registry=https://registry.npm.taobao.org
```

安装完成后，我们的 lesson1 目录下应该会出现一个 `node_modules` 文件夹，`ls` 看看

```
$ ls node_modules
```

里面如果出现 express 文件夹则说明安装成功。

或者 npm命令提供更清晰直观的显示:
```
$ npm list
```

我们继续应用程序的编写。

新建一个 app.js 文件

```
$ touch app.js
```

copy 进去这些代码

```js
// 这句的意思就是引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
var express = require('express');
// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
var app = express();

// app 本身有很多方法，其中包括最常用的 get、post、put/patch、delete，在这里我们调用其中的 get 方法，为我们的 `/` 路径指定一个 handler 函数。
// 这个 handler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response。
// request 中包含了浏览器传来的各种信息，比如 query 啊，body 啊，headers 啊之类的，都可以通过 req 对象访问到。
// res 对象，我们一般不从里面取信息，而是通过它来定制我们向浏览器输出的信息，比如 header 信息，比如想要向浏览器输出的内容。这里我们调用了它的 #send 方法，向浏览器输出一个字符串。
app.get('/', function (req, res) {
  res.send('Hello World'+ req);
});

// 定义好我们 app 的行为之后，让它监听本地的 3000 端口。这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。
app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
```

执行

`$ node app.js`

这时候我们的 app 就跑起来了，终端中会输出 `app is listening at port 3000`。这时我们打开浏览器，访问 `http://localhost:3000/`，会出现 `Hello World`。如果没有出现的话，肯定是上述哪一步弄错了，自己调试一下。
