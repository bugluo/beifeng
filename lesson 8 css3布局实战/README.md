# 手机端切图实战
	-拿到图依然要有大局观
	-找到要剔除的地方，切出整体
	-分析哪些该切图，哪些该用css输出内容

###特别的注意点
	-media query合理使用
	-图片使用2倍以上的图
	-1px的线需要用特别的方法生成
```css
.after-scale{
   position: relative;
}
.after-scale:after{
   content:"";
   position: absolute;
   bottom:0px;
   left:0px;
   right:0px;
   border-bottom:1px solid #c8c7cc;
   -webkit-transform:scaleY(.5);
   -webkit-transform-origin:0 0;
}
```
    
    -box-shadow的妙用

```css
.box-shadow{
    box-shadow:inset 0px -1px 1px  -1px #c8c7cc;
}
```