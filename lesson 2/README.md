#HTML5 语义化

##先从DIV+CSS vs TABLE 布局说起

- 两种说法都是错误的
- 结构与样式的分离才是核心
- HTML只负责结构化和语义，css负责表现

##HTML5 标签

- 标准可查：<a href="http://html5doctor.com/" target="_blank">html5 doctor</a>
- 中文版：<a href="http://www.w3school.com.cn/tags/tag_doctype.asp" target="_blank">w3School</a>

### 常用标签

#### Head
- doctype  只用记html5标准
- html 
- head
- title
- link 外联样式
- meta
	- name="description"
	- name="keywords"
	- http-equiv="content-type" content="text/html;charset=utf-8"
	- http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"
- style 内联样式
- script 内联或外联javascript

#### Sections

- body
- h1-h6

#### Grouping

- p  段落
- ol 有序列表
- ul 无序列表
- li
- dl, dt, dd 列表, 列表的头 ,列表的内容
- div 分块

#### Tables 表格

- table
- thead
- tbody
- tfoot
- tr
- th
- td

#### Forms 表单

- form
- label 标注
- input 输入
- button 按钮
- select 单选或多选菜单
- option
- textarea 多行输入框

#### Embedded

- img 图片
- iframe 
- embed flash使用
- object
- param
- video 视频
- audio 音乐
- source 
- canvas 画布

#### Text

- a 链接
- em 
- strong 加强
- span 分行
- br 换行

### 语义增强

#### Head

- base
- noscript

#### Sections

- article
- nav
- aside
- section
- header
- footer
- main
- address

#### Grouping

- hr
- pre
- blockquote
- figure
- figcaption

#### Tables

- caption
- col
- colgroup

#### Forms

- fieldset
- legend
- datalist
- optgroup
- keygen
- output
- progress
- meter

#### Interactive

- details
- summary
- command
- menu

#### Edits

-del, ins

#### Embedded

- track
- map
- area

#### Text

- i, b
- u
- s
- small
- abbr
- q
- cite
- dfn
- sub, sup
- time
- code
- kbd
- samp
- var
- mark
- bdi
- bdo
- ruby, rt, rp
- wbr

## 元素的分类
- 块级元素
	- div
- 行内元素
	- span
- 块级行内元素
	- img

## SEO 重点

- meta 的description、keywords合理分布
- h1-h6 p合理使用，内容必须使用标签及文字承载
- 使用图片的要写alt，使用图片标题的要把主要文字也写进去
- 避免死链接
- 网站打开速度优化和合理的404处理