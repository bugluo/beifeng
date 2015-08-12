# css3 样式增强
	-<a href="http://isux.tencent.com/css3/index.html" target="_blank">很好用的css3动画速查</a>

## 媒体查询(Media Queries)
	-响应式布局

```css
<link rel="stylesheet" media="screen and (max-width: 600px)" href="small.css" />
<link rel="stylesheet" media="only screen and (-webkit-min-device-pixel-ratio: 2)" type="text/css" href="iphone5.css" />
<style type="text/css">
@media screen and (min-width: 600px) {
	a{display:none;}
}

</style>

```
    
## 布局增强 （居中和分栏的使用）
    -flex布局
    -translate偏移用于布局

## 伪元素 :before and :after

## 过渡
	-transition
		-transition-property 设置过渡效果的 CSS 属性的名称。
		-transition-duration 完成过渡效果需要多少秒或毫秒。
		-transition-timing-function 速度效果的速度曲线。
		-transition-delay 定义过渡效果何时开始。

## 变换
	-transform：
		-translate  移动
		-translate3d 3d移动
		-scale  缩放
		-scale3d 3d缩放
		-rotate 2d旋转
		-rotate3d 3d旋转
		-skew 变换
		-perspective 视角

## 过渡 + 样式的改变 = 动画效果

## 动画
	-@keyframes
		-from to
		-百分比

	-animation
		-animation-name	规定 @keyframes 动画的名称。
		-animation-duration	规定动画完成一个周期所花费的秒或毫秒。
		-animation-timing-function	规定动画的速度曲线。
		-animation-delay	规定动画何时开始。
		-animation-iteration-count	规定动画被播放的次数。
		-animation-direction	规定动画是否在下一周期逆向地播放。
		-animation-play-state	规定动画是否正在运行或暂停。
		-animation-fill-mode	规定对象动画时间之外的状态。
