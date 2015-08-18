#css 常用属性

## 盒模型
    - 外补白(Margin)
    - 内补白(Padding)
    - 边框(Border)
    - 内容(Content)

```css
/*
默认
一个内容所占宽高 ＝ 内容设定宽高 + 内补白 + 边框 + 外补白
*/
.div1{
    width:100px;
    height:100px;
    padding:10px;
    border:1px solid #333;
    box-sizing:content-box;  
}
/*
border作为盒子
一个内容所占宽高 ＝ 内容设定宽高 + 外补白
*/
.biv2{
    width:100px;
    height:100px;
    padding:10px;
    border:1px solid #333;
    box-sizing:border-box;
}
<div class="div1">
</div>
<div class="div2">
</div>
```

## 布局方法属性

### display 显示方式

    - block
    - inline
    - inline-block
    - table 及 table-caption | table-cell | table-row | table-row-group | table-column | table-column-group | table-footer-group | table-header-group
    - none
    - flex （css3）

### position 定位

    - static 常规流式布局
    - relative 常规流式布局，并且可以偏移
    - absolute 脱离常规流式布局，使用top left布局
    - fixed 脱离常规流式布局，使用top left布局，当出现滚动条时，对象不会随着滚动。

### float and clear 浮动和清除浮动

    - 流式布局，浮动是为了元素靠在一起
    - 浮动会继承
    - 所以清除浮动是为了让不该靠在一起的元素分开

## 文本
    - font-style 指定文本字体样式
    - font-weight 指定文本字体的粗细
    - font-size 指定文本字体尺寸
    - line-height 指定文本字体的行高
    - font-family 指定文本使用某个字体或字体序列

## 背景
    - background-image 指定对象的背景图像。可以是真实图片路径或使用渐变创建的“背景图像”
    - background-position 指定对象的背景图像位置。
    - background-size 指定对象的背景图像的尺寸大小。
    - background-repeat 指定对象的背景图像如何铺排填充。
    - background-attachment 指定对象的背景图像是随对象内容滚动还是固定的。
    - background-origin 指定对象的背景图像显示的原点。
    - background-clip  指定对象的背景图像向外裁剪的区域。
    - background-color 指定对象的背景颜色。