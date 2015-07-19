#HTML5 语义化

##先从DIV+CSS vs TABLE 布局说起

- 两种说法都是错误的
- 结构与样式的分离才是核心
- HTML只负责结构化和语义，css负责表现

##HTML5 标签

- 标准可查：<a href="http://html5doctor.com/">html5 doctor</a>

### 常用标签

#### Head
- doctype 
- html
- head
- title
- link
- meta 
	- name="description"
	- name="keywords"
	- http-equiv="content-type" content="text/html;charset=utf-8"
	- http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"
- style
- script

#### Sections

- body
- h1-h6

#### Grouping

- p
- ol
- ul
- li
- dl, dt, dd
- div

#### Tables

- table
- thead
- tbody
- tfoot
- tr
- th
- td

#### Forms

- form
- label
- input
- button
- select
- option
- textarea

#### Embedded

- img
- iframe
- embed
- object
- param
- video
- audio
- source
- canvas

#### Text

- a
- em
- strong

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
- span
- br
- wbr

## SEO 重点

- meta 的description、keywords合理分布
- h1-h6 p合理使用，内容必须使用标签及文字承载
- 使用图片的要写alt，使用图片标题的要把主要文字也写进去
- 避免死链接
- 网站打开速度优化和合理的404处理