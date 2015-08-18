# less (scss、Stylus)是什么
	-CSS 预处理器是一种语言用来为 CSS 增加一些编程的的特性，无需考虑浏览器的兼容性问题，例如你可以在 CSS 中使用变量、简单的程序逻辑、函数等等在编程语言中的一些基本技巧。

# 我们为什么要使用less
	-可以让你的 CSS 更见简洁，适应性更强，代码更直观。

#怎么开始用
	-安装<a href="https://nodejs.org/">nodejs</a>  
	-安装less
		-npm install -g less
		-npm install -g less-watch


#有些什么用法

变量

变量允许我们单独定义一系列通用的样式，然后在需要的时候去调用。所以在做全局样式调整的时候我们可能只需要修改几行代码就可以了。

  // LESS

@color: #4D926F;

#header {
  color: @color;
}
h2 {
  color: @color;
}

混合

混合可以将一个定义好的class A轻松的引入到另一个class B中，从而简单实现class B继承class A中的所有属性。我们还可以带参数地调用，就像使用函数一样。

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