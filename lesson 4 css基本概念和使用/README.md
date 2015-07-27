#css 基本概念和使用

- 简单的说css就是用来控制html中每个元素在页面中呈现的效果的

- <a href="http://css.doyoe.com/" target="_blank">业届顶级参考手册</a>

## 引入css
- link 标签
- style 标签
- 内联 style
- @import

## css的特性
- 继承

```css
div{
    color:red;
}
<div>
    我是div的文字
    <p>我是p的文字</p>
</div>
```

- 覆盖

```css
div{
    color:red;
}
<div>
    我是div的文字
    <p>我是p的文字</p>
    <a href="#">我是a的文字</a>
</div>
```

- 优先级
```css
#a{
    color:red;
}
.a{
    color:black;
}
a{
    color:white !important;
}
<a href="javascript:;" id="a" class="a"></a>
```

## 元素的分类
- 块级元素
    - div p
- 行内元素
    - span a
- 块级行内元素
    - img
- table元素

- 基本规则1：块级可以包含行内，行内不要包含块级
    - 经典特例
```css
<a href="javascript:;"><h1>我是标题</h1></a>
```
- 基本规则2：块级可以包含块级，行内可以包含行内
    - 经典特例
```css
<p>我是p<p>我是p</p></p>
```

## css重置
- css reset
    -去掉css的默认属性
- <a href="https://github.com/necolas/normalize.css">Normalize</a>
    -保护有用的浏览器默认样式而不是完全去掉它们

