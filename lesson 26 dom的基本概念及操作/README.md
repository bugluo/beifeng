## DOM的概念

DOM是文档对象模型（Document Object Model）的简称，它的基本思想是把结构化文档（比如HTML和XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。所有的节点和最终的树状结构，都有规范的对外接口，以达到使用编程语言操作文档的目的（比如增删内容）。所以，DOM可以理解成文档（HTML文档、XML文档和SVG文档）的编程接口。

DOM有自己的国际标准，目前的通用版本是[DOM 3](http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html)，下一代版本[DOM 4](http://www.w3.org/TR/dom/)正在拟定中。本章介绍的就是JavaScript对DOM标准的实现和用法。

严格地说，DOM不属于JavaScript，但是操作DOM是JavaScript最常见的任务，而JavaScript也是最常用于DOM操作的语言。所以，DOM往往放在JavaScript里面介绍。

## 节点的概念

DOM的最小组成单位叫做节点（node），一个文档的树形结构（DOM树），就是由各种不同类型的节点组成。

对于HTML文档，节点主要有以下六种类型：Document节点、DocumentType节点、Element节点、Attribute节点、Text节点和DocumentFragment节点。

节点|名称|含义
----|----|----
Document | 文档节点 | 整个文档（window.document）
DocumentType | 文档类型节点 | 文档的类型（比如&lt;!DOCTYPE html&gt;）
Element | 元素节点 | HTML元素（比如&lt;body&gt;、&lt;a&gt;等）
Attribute | 属性节点| HTML元素的属性（比如class="right"）
Text | 文本节点 | HTML文档中出现的文本
DocumentFragment | 文档碎片节点 | 文档的片段

浏览器原生提供一个Node对象，上表所有类型的节点都是Node对象派生出来的。也就是说，它们都继承了Node的属性和方法。

## Node节点的属性

### nodeName，nodeType

nodeName属性返回节点的名称，nodeType属性返回节点的常数值。具体的返回值，可查阅下方的表格。

类型 | nodeName | nodeType
-----|----------|---------
DOCUMENT_NODE | #document | 9
ELEMENT_NODE | 大写的HTML元素名 | 1
ATTRIBUTE_NODE | 等同于Attr.name | 2
TEXT_NODE | #text | 3
DOCUMENT_FRAGMENT_NODE | #document-fragment | 11
DOCUMENT_TYPE_NODE | 等同于DocumentType.name |10

以document节点为例，它的nodeName属性等于#document，nodeType属性等于9。

```javascript

document.nodeName // "#document"
document.nodeType // 9

```

通常来说，使用nodeType属性确定一个节点的类型，比较方便。

```javascript

document.querySelector('a').nodeType === 1
// true

document.querySelector('a').nodeType === Node.ELEMENT_NODE
// true

```

上面两种写法是等价的。

### ownerDocument，nextSibling，previousSibling，parentNode，parentElement

以下属性返回当前节点的相关节点。

**（1）ownerDocument**

ownerDocument属性返回当前节点所在的顶层文档对象，即document对象。

```javascript
var d = p.ownerDocument;
d === document // true
```

document对象本身的ownerDocument属性，返回null。

**（2）nextSibling**

nextSibling属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回null。注意，该属性还包括文本节点和评论节点。因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格。

```javascript
var el = document.getElementById('div-01').firstChild;
var i = 1;

while (el) {
  console.log(i + '. ' + el.nodeName);
  el = el.nextSibling;
  i++;
}
```

上面代码遍历div-01节点的所有子节点。

**（3）previousSibling**

previousSibling属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回null。

```javascript
// html代码如下
// <a><b1 id="b1"/><b2 id="b2"/></a>

document.getElementById("b1").previousSibling // null
document.getElementById("b2").previousSibling.id // "b1"
```

对于当前节点前面有空格，则previoussibling属性会返回一个内容为空格的文本节点。

**（4）parentNode**

parentNode属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：element节点、document节点和documentfragment节点。

下面代码是如何从父节点移除指定节点。

```javascript
if (node.parentNode) {
  node.parentNode.removeChild(node);
}
```

对于document节点和documentfragment节点，它们的父节点都是null。另外，对于那些生成后还没插入DOM树的节点，父节点也是null。

**（5）parentElement**

parentElement属性返回当前节点的父Element节点。如果当前节点没有父节点，或者父节点类型不是Element节点，则返回null。

```javascript
if (node.parentElement) {
  node.parentElement.style.color = "red";
}
```

上面代码设置指定节点的父Element节点的CSS属性。

在IE浏览器中，只有Element节点才有该属性，其他浏览器则是所有类型的节点都有该属性。

### textContent，nodeValue

以下属性返回当前节点的内容。

**（1）textContent**

textContent属性返回当前节点和它的所有后代节点的文本内容。

```javascript
// HTML代码为
// <div id="divA">This is <span>some</span> text</div>

document.getElementById("divA").textContent
// This is some text
```

上面代码的textContent属性，自动忽略当前节点内部的HTML标签，返回所有文本内容。

该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有它原来的子节点。它还有一个好处，就是自动对HTML标签转义。这很适合用于用户提供的内容。

```javascript
document.getElementById('foo').textContent = '<p>GoodBye!</p>';
```

上面代码在插入文本时，会将p标签解释为文本，即&amp;lt;p&amp;gt;，而不会当作标签处理。

对于Text节点和Comment节点，该属性的值与nodeValue属性相同。对于其他类型的节点，该属性会将每个子节点的内容连接在一起返回，但是不包括Comment节点。如果一个节点没有子节点，则返回空字符串。

document节点和doctype节点的textContent属性为null。如果要读取整个文档的内容，可以使用`document.documentElement.textContent`。

在IE浏览器，所有Element节点都有一个innerText属性。它与textContent属性基本相同，但是有几点区别。

- innerText受CSS影响，textContent不受。比如，如果CSS规则隐藏（hidden）了某段文本，innerText就不会返回这段文本，textContent则照样返回。

- innerText返回的文本，会过滤掉空格、换行和回车键，textContent则不会。

- innerText属性不是DOM标准的一部分，Firefox浏览器甚至没有部署这个属性，而textContent是DOM标准的一部分。

**（2）nodeValue**

nodeValue属性返回或设置当前节点的值，格式为字符串。但是，该属性只对Text节点、Comment节点、XML文档的CDATA节点有效，其他类型的节点一律返回null。

因此，nodeValue属性一般只用于Text节点。对于那些返回null的节点，设置nodeValue属性是无效的。

### childNodes，firstNode，lastChild

以下属性返回当前节点的子节点。

**（1）childNodes**

childNodes属性返回一个NodeList集合，成员包括当前节点的所有子节点。注意，除了HTML元素节点，该属性返回的还包括Text节点和Comment节点。如果当前节点不包括任何子节点，则返回一个空的NodeList集合。由于NodeList对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中。

```javascript

var ulElementChildNodes = document.querySelector('ul').childNodes;

```

**（2）firstNode**

firstNode属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回null。注意，除了HTML元素子节点，该属性还包括文本节点和评论节点。

**（3）lastChild**

lastChild属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回null。

## Node节点的方法

### appendChild()，hasChildNodes()

以下方法与子节点相关。

**（1）appendChild()**

appendChild方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。

```javascript

var p = document.createElement("p");
document.body.appendChild(p);

```

如果参数节点是文档中现有的其他节点，appendChild方法会将其从原来的位置，移动到新位置。

hasChildNodes方法返回一个布尔值，表示当前节点是否有子节点。

```javascript
var foo = document.getElementById("foo");

if ( foo.hasChildNodes() ) {
  foo.removeChild( foo.childNodes[0] );
}
```

上面代码表示，如果foo节点有子节点，就移除第一个子节点。

**（2）hasChildNodes()**

hasChildNodes方法结合firstChild属性和nextSibling属性，可以遍历当前节点的所有后代节点。

```javascript
function DOMComb (oParent, oCallback) {
  if (oParent.hasChildNodes()) {
    for (var oNode = oParent.firstChild; oNode; oNode = oNode.nextSibling) {
      DOMComb(oNode, oCallback);
    }
  }
  oCallback.call(oParent);
}
```

上面代码的DOMComb函数的第一个参数是某个指定的节点，第二个参数是回调函数。这个回调函数会依次作用于指定节点，以及指定节点的所有后代节点。

```javascript
function printContent () {
  if (this.nodeValue) {
    console.log(this.nodeValue);
  }
}

DOMComb(document.body, printContent);
```

### cloneNode()，insertBefore()，removeChild()，replaceChild()

下面方法与节点操作有关。

**（1）cloneNode()**

cloneNode方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点，默认是false，即不克隆子节点。

```javascript

var cloneUL = document.querySelector('ul').cloneNode(true);

```

需要注意的是，克隆一个节点，会拷贝该节点的所有属性，但是会丧失addEventListener方法和on-属性（即`node.onclick = fn`），添加在这个节点上的事件回调函数。

克隆一个节点之后，DOM树有可能出现两个有相同ID属性（即`id="xxx"`）的HTML元素，这时应该修改其中一个HTML元素的ID属性。

**（2）insertBefore()**

insertBefore方法用于将某个节点插入当前节点的指定位置。它接受两个参数，第一个参数是所要插入的节点，第二个参数是当前节点的一个子节点，新的节点将插在这个节点的前面。该方法返回被插入的新节点。

```javascript

var text1 = document.createTextNode('1');
var li = document.createElement('li');
li.appendChild(text1);

var ul = document.querySelector('ul');
ul.insertBefore(li,ul.firstChild);

```

上面代码在ul节点的最前面，插入一个新建的li节点。

如果insertBefore方法的第二个参数为null，则新节点将插在当前节点的最后位置，即变成最后一个子节点。

将新节点插在当前节点的最前面（即变成第一个子节点），可以使用当前节点的firstChild属性。

```javascript
parentElement.insertBefore(newElement, parentElement.firstChild);
```

上面代码中，如果当前节点没有任何子节点，`parentElement.firstChild`会返回null，则新节点会插在当前节点的最后，等于是第一个子节点。

由于不存在insertAfter方法，如果要插在当前节点的某个子节点后面，可以用insertBefore方法结合nextSibling属性模拟。

```javascript
parentDiv.insertBefore(s1, s2.nextSibling);
```

上面代码可以将s1节点，插在s2节点的后面。如果s2是当前节点的最后一个子节点，则`s2.nextSibling`返回null，这时s1节点会插在当前节点的最后，变成当前节点的最后一个子节点，等于紧跟在s2的后面。

**（3）removeChild()**

removeChild方法接受一个子节点作为参数，用于从当前节点移除该节点。它返回被移除的节点。

```javascript

var divA = document.getElementById('A');
divA.parentNode.removeChild(divA);

```

上面代码是如何移除一个指定节点。

下面是如何移除当前节点的所有子节点。

```javascript
var element = document.getElementById("top");
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

被移除的节点依然存在于内存之中，但是不再是DOM的一部分。所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点。

**（4）replaceChild()**

replaceChild方法用于将一个新的节点，替换当前节点的某一个子节点。它接受两个参数，第一个参数是用来替换的新节点，第二个参数将要被替换走的子节点。它返回被替换走的那个节点。

```javascript
replacedNode = parentNode.replaceChild(newChild, oldChild);
```

下面是一个例子。

```javascript

var divA = document.getElementById('A');
var newSpan = document.createElement('span');
newSpan.textContent = 'Hello World!';
divA.parentNode.replaceChild(newSpan,divA);

```

上面代码是如何替换指定节点。

## NodeList接口，HTMLCollection接口

节点对象都是单个节点，但是有时会需要一种数据结构，能够容纳多个节点。DOM提供两种接口，用于部署这种节点的集合：NodeList接口和HTMLCollection接口。

### NodeList接口

有些属性和方法返回的是一组节点，比如Node.childNodes、document.querySelectorAll()。它们返回的都是一个部署了NodeList接口的对象。

NodeList接口有时返回一个动态集合，有时返回一个静态集合。所谓动态集合就是一个活的集合，DOM树删除或新增一个相关节点，都会立刻反映在NodeList接口之中。Node.childNodes返回的，就是一个动态集合。

```javascript
var parent = document.getElementById('parent');
parent.childNodes.length // 2
parent.appendChild(document.createElement('div'));
parent.childNodes.length // 3
```

上面代码中，`parent.childNodes`返回的是一个部署了NodeList接口的对象。当parent节点新增一个子节点以后，该对象的成员个数就增加了1。

document.querySelectorAll方法返回的是一个静态，DOM内部的变化，并不会实时反映在该方法的返回结果之中。

NodeList接口提供length属性和数字索引，因此可以像数组那样，使用数字索引取出每个节点，但是它本身并不是数组，不能使用pop或push之类数组特有的方法。

```javascript
// 数组的继承链
myArray --> Array.prototype --> Object.prototype --> null

// NodeList的继承链
myNodeList --> NodeList.prototype --> Object.prototype --> null
```

从上面的继承链可以看到，NodeList接口对象并不继承Array.prototype，因此不具有数组接口提供的方法。如果要在NodeList接口使用数组方法，可以将NodeList接口对象转为真正的数组。

```javascript
var div_list = document.querySelectorAll('div');
var div_array = Array.prototype.slice.call(div_list);
```

也可以通过下面的方法调用。

```javascript
var forEach = Array.prototype.forEach;

forEach.call(element.childNodes, function(child){
  child.parentNode.style.color = '#0F0';
});
```

上面代码让数组的forEach方法在NodeList接口对象上调用。

不过，遍历NodeList接口对象的首选方法，还是使用for循环。

```javascript
for (var i = 0; i < myNodeList.length; ++i) {
  var item = myNodeList[i];
}
```

不要使用for...in循环去遍历NodeList接口对象，因为for...in循环会将非数字索引的length属性和下面要讲到的item方法，也遍历进去，而且不保证各个成员遍历的顺序。


### HTMLCollection接口

HTMLCollection接口与NodeList接口类似，也是节点的集合，但是集合成员都是Element节点。

```javascript

```

## html元素

html元素是网页的根元素，document.documentElement就指向这个元素。

**（1）clientWidth属性，clientHeight属性**

这两个属性返回视口（viewport）的大小，单位为像素。所谓“视口”，是指用户当前能够看见的那部分网页的大小

document.documentElement.clientWidth和document.documentElement.clientHeight，基本上与window.innerWidth和window.innerHeight同义。只有一个区别，前者不将滚动条计算在内（很显然，滚动条和工具栏会减小视口大小），而后者包括了滚动条的高度和宽度。

**（2）offsetWidth属性，offsetHeight属性**

这两个属性返回html元素的宽度和高度，即网页的总宽度和总高度。

### dataset属性

dataset属性用于操作HTML标签元素的data-*属性。目前，Firefox、Chrome、Opera、Safari浏览器支持该API。

假设有如下的网页代码。

```javascript

<div id="myDiv" data-id="myId"></div>

以data-id属性为例，要读取这个值，可以用dataset.id。

var id = document.getElementById("myDiv").dataset.id;

```

要设置data-id属性，可以直接对dataset.id赋值。这时，如果data-id属性不存在，将会被创造出来。

```javascript

document.getElementById("myDiv").dataset.id = "hello";

```

删除一个data-*属性，可以直接使用delete命令。

```javascript

delete document.getElementById("myDiv").dataset.id

```

IE 9不支持dataset属性，可以用 getAttribute('data-foo')、removeAttribute('data-foo')、setAttribute('data-foo')、hasAttribute('data-foo') 代替。

需要注意的是，dataset属性使用骆驼拼写法表示属性名，这意味着data-hello-world会用dataset.helloWorld表示。而如果此时存在一个data-helloWorld属性，该属性将无法读取，也就是说，data属性本身只能使用连词号，不能使用骆驼拼写法。

### tabindex属性

tabindex属性用来指定，当前HTML元素节点是否被tab键遍历，以及遍历的优先级。

```javascript
var b1 = document.getElementById("button1");

b1.tabIndex = 1;
```

如果 tabindex = -1 ，tab键跳过当前元素。

如果 tabindex = 0 ，表示tab键将遍历当前元素。如果一个元素没有设置tabindex，默认值就是0。

如果 tabindex 大于0，表示tab键优先遍历。值越大，就表示优先级越大。

### 页面位置相关属性

**（1）offsetParent属性、offsetTop属性和offsetLeft属性**

这三个属性提供Element对象在页面上的位置。

- offsetParent：当前HTML元素的最靠近的、并且CSS的position属性不等于static的父元素。
- offsetTop：当前HTML元素左上角相对于offsetParent的垂直位移。
- offsetLeft：当前HTML元素左上角相对于offsetParent的水平位移。

如果Element对象的父对象都没有将position属性设置为非static的值（比如absolute或relative），则offsetParent属性指向body元素。另外，计算offsetTop和offsetLeft的时候，是从边框的左上角开始计算，即Element对象的border宽度不计入offsetTop和offsetLeft。

### style属性

style属性用来读写页面元素的行内CSS属性，详见本章《CSS操作》一节。

### Element对象的方法

**（1）选择子元素的方法**

Element对象也部署了document对象的4个选择子元素的方法，而且用法完全一样。

- querySelector方法
- querySelectorAll方法
- getElementsByTagName方法
- getElementsByClassName方法

上面四个方法只用于选择Element对象的子节点。因此，可以采用链式写法来选择子节点。

```javascript

document.getElementById('header').getElementsByClassName('a')

```

各大浏览器对这四个方法都支持良好，IE的情况如下：IE 6开始支持getElementsByTagName，IE 8开始支持querySelector和querySelectorAll，IE 9开始支持getElementsByClassName。

**（3）HTML元素的属性相关方法**

- hasAttribute()：返回一个布尔值，表示Element对象是否有该属性。
- getAttribute()
- setAttribute()
- removeAttribute()

**（4）matchesSelector方法**

该方法返回一个布尔值，表示Element对象是否符合某个CSS选择器。

```javascript

document.querySelector('li').matchesSelector('li:first-child')

```

这个方法需要加上浏览器前缀，需要写成mozMatchesSelector()、webkitMatchesSelector()、oMatchesSelector()、msMatchesSelector()。

**（5）focus方法**

focus方法用于将当前页面的焦点，转移到指定元素上。

```javascript

document.getElementById('my-span').focus();

```
