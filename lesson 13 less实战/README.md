# less (scss、Stylus)是什么
	
- CSS 预处理器是一种语言用来为 CSS 增加一些编程的的特性，无需考虑浏览器的兼容性问题，例如你可以在 CSS 中使用变量、简单的程序逻辑、函数等等在编程语言中的一些基本技巧。

# 我们为什么要使用less

  - 因为生命苦短。
	- 可以让css更具备可维护性。

#怎么开始用
##装环境

	- 安装 <a href="https://nodejs.org/" target="_blank">nodejs</a>
  - 了解一下包管理工具 npm
  - npm config delete http-proxy
  - npm config delete https-proxy
  - 安装less
		- npm install -g less --registry=https://registry.npm.taobao.org 
	- 安装gulp
    - npm install -g gulp --registry=https://registry.npm.taobao.org 

##使用编译环境

- 使用less编译
- 用gulp监听less的变化

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "Gulpfile.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "bugluo",
  "license": "MIT",
  "devDependencies":{
    "gulp-less":"^v3.0.3"
  }
}
```

```javascript 
var gulp = require('gulp');
var less = require('gulp-less');


gulp.task('less', function() {
    gulp.src('./less/**/*')
        .pipe(less())
        .pipe(gulp.dest('./css'));
});

gulp.task('default', function () {
    gulp.watch('./less/**/*',function(){
      gulp.run('less');
    });
});
```

#有些什么用法

##变量

###变量的定义与引用

变量允许我们单独定义一系列通用的样式，然后在需要的时候去调用。所以在做全局样式调整的时候我们可能只需要修改几行代码就可以了。

```less
@color: #4D926F;
#header {
  color: @color;
}
h2 {
  color: @color;
}
```

###变量计算

```less
@nice-blue: #5b83ad;
@light-blue: @nice-blue + #111;
#header {
  color: @light-blue;
}
```


##混合

混合可以将一个定义好的class A轻松的引入到另一个class B中，从而简单实现class B继承class A中的所有属性。我们还可以带参数地调用，就像使用函数一样。

```less
.rounded-corners (@radius: 5px) {
  border-radius: @radius;
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
}

#header {
  .rounded-corners;
}
#footer {
  .rounded-corners(10px);
}
```

##嵌套

嵌套规则主要是针对一多层元素的样式规则写法，以前我们在多层元素中写样式，要么从头选下来，要么另外给这个元素加上类名或id名，但在Less中我们不需要这样操作了，我们只要使用他的嵌套规则就可以完成

```html
<div id="header">
  <h1><a href="">W3cplus</a></h1>
  <p>记述前端那些事——引领Web前沿</p>
</div>
```

```less
#header {
  display: inline;
  float: left;
  h1 {
    font-size: 26px;
    font-weight: bold;
    a {
      text-decoration: none;
      color: #f36;
      &:hover {
        text-decoration: underline;
        color: #63f;
      }
    }
  }
  p {
    font-size: 12px;
  }
}
```

###操作伪元素

```less
a {
  color: red;
  text-decoration: none;
  &:hover {
    color: blue;
    text-decoration: underline;
  }
}
```

###媒体查询的嵌套
```less
.some-class {
  /* 基础样式 */
  @media (max-width: 800px) {
    /* 响应样式 */
  }
}
```

###算数
```less
@var: 20px;
#header {
  width: @var + 5 * 2;/* 先计算了5 * 2 = 10 然后在计算了 @var + 10 = 30px,其实就是"@var+(5*2)"*/
  height: (@var + 5 ) * 2;/*先计算了(@var + 5) = 25px,然后在计算了25*2=50px，因为括号更具有优先权，小学数学题*/
}
```

###变量作用域
```less
@var: red;
#page {
  @var: white;
  #header {
    color: @var; // white
  }
}

#footer {
  color: @var; // red  
}
```