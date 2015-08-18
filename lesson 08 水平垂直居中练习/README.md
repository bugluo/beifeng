###寂寞的垂直居中
垂直居中有很多种方法，各有特点，那么问题来了，我们什么情况下用哪种呢？
####transform:translateY(-50%)
#####Talk is cheap show me the code
    .dialog{
        position:absolute;
        top:50%;
        transform:translateY(-50%);
    }
    <body>
        <div class="dialog"></div>
    </body>
#####兼容性和场景
    结构很简洁
    IE9+ 支持css3的浏览器
    用于手机开发做一个弹窗或文字图片居中

####百分比布局和负margin
#####Talk is cheap show me the code
    .dialog{
        position:absolute;
        top:50%;
        left:50%;
        margin-left:-100px;
        margin-top:-100px;
        width:200px;
        height:200px;
    }
    <body>
        <div class="dialog"></div>
    </body>
#####兼容性和场景
    结构很简洁、必须知道宽高，兼容IE6
    各种寂寞的弹窗必用

####display: table-cell
#####Talk is cheap show me the code
    html,body{
        height:100%;
    }
    .middle{
        display:table-cell;
        height:90px;
        vertical-align: middle;
    }
    <body>
        <div class="middle"><img src="" alt=""></div>
    </body>
#####兼容性和场景
    IE8+ 
    由于容器高度固定，设置overflow: hidden 会导致文字不显示
    和文字撑开兄弟元素不居中
    所以仅用于文字居中的情况或图片居中
    配合下面的font-size用法兼容IE6、7

#### top: 0; left: 0; bottom: 0; right: 0;大法
#####Talk is cheap show me the code
    .father{
        possition:relative;
    }
    .middle{
        margin: auto;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        height:auto;
    }
    <div class="father">
        <div class="middle"></div>
    </div>
#####兼容性和场景
    IE8+ 
    支持百分比%属性值和min-/max-属性
    只用这一个css可实现任何内容块居中
    必须指定height
    如果是ie8+这个应该是弹窗最好用的，脱离文档流

####flexbox布局
#####Talk is cheap show me the code
    .middle{
        display: -webkit-box;  /* 老版本语法: Safari,  iOS, Android browser, older WebKit browsers.  */
        display: -moz-box;    /* 老版本语法: Firefox (buggy) */ 
        display: -ms-flexbox;  /* 混合版本语法: IE 10 */
        display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
        display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */

        /*垂直居中*/  
        /*老版本语法*/
        -webkit-box-align: center; 
        -moz-box-align: center;
        /*混合版本语法*/
        -ms-flex-align: center; 
        /*新版本语法*/
        -webkit-align-items: center;
        align-items: center;

        /*水平居中*/
        /*老版本语法*/
        -webkit-box-pack: center; 
        -moz-box-pack: center; 
        /*混合版本语法*/
        -ms-flex-pack: center; 
        /*新版本语法*/
        -webkit-justify-content: center;
        justify-content: center;

        margin: 0;
        height: 100%;
        width: 100% /* needed for Firefox */
    }
    <div class="middle"></div>
#####兼容性和场景
    IE9+ 
    结构非常简单，谁想用就给谁加个css就行
    但是兼容性异常纠结，能不用就先别用了。

####ie6、7 font-size为高度的0.873倍
#####Talk is cheap show me the code
    html,body{
        height:100%;
    }
    .middle{
        text-align:center;
        display:table-cell;
        height:190px;
        vertical-align: middle;
        *display:block;
        *font-size:175px;
    }
    .middle img{
        verical-align:middle;
    }
    <body>
        <div class="middle"><img src="" alt=""></div>
    </body>
#####兼容性和场景
    这个方法好像是IE6下标签最简单的图片的垂直居中的方法了


####三层div法 第二层top:50% 第三层top:-50%
#####Talk is cheap show me the code
    .wrap {
        width: 300px;
        height: 300px;
        border: 3px solid #ddd;
        display: table;
        *position: relative;
    }
    .hack {
        display: table-cell;
        vertical-align: middle;
        *position: absolute;
        *top: 50%;
    }
    .cnt {
        *position: relative;
        *top: -50%;
    }
    <div class="wrap">
        <div class="hack">
            <div class="cnt">
                <img src="http://pic002.cnblogs.com/images/2012/382256/2012080118323766.gif" width="50%">
            </div>
        </div>
    </div>

#####兼容性和场景
    IE6+
    这种方法多了一层无语义的div