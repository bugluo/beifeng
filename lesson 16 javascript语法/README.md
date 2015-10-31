## 数据类型

### 概述

JavaScript语言的每一个值，都属于某一种数据类型。JavaScript的数据类型，共有六种。（ES6又新增了第七种Symbol类型的值，本教程不涉及。）

六种数据类型又可以分成两组：原始类型（primitive type）和合成类型（complex type）。

原始类型包括五种数据类型。

- 数值（number）
- 字符串（string）
- 布尔值（boolean）
- undefined
- null

“数值”就是整数和小数(比如1和3.14)，“字符串”就是由多个字符组成的文本（比如"Hello World"），“布尔值”则是true（真）和false（假）两个特定值。`undefined`表示变量没有被赋值时的状态，`null`表示此处应该有一个对象，但被故意省略了。

合成类型只有一种值：对象（object）。但是，严格地分，又可以分成三个小类型。

- 对象（object）
- 数组（array）
- 函数（function）

## 基本句法和变量

### 语句

JavaScript程序的执行单位为行（line），也就是一行一行地执行。一般情况下，每一行就是一个语句。

语句（statement）是为了完成某种任务而进行的操作，比如下面就是一行赋值语句：

```javascript
var a = 1 + 3;
```

这条语句先用var命令，声明了变量a，然后将`1 + 3`的运算结果赋值给变量a。

`1 + 3`叫做表达式（expression），指一个为了得到返回值的计算式。语句和表达式的区别在于，前者主要为了进行某种操作，一般情况下不需要返回值；后者则是为了得到返回值，一定会返回一个值。

凡是JavaScript语言中预期为值的地方，都可以使用表达式。比如，赋值语句的等号右边，预期是一个值，因此可以放置各种表达式。一条语句可以包含多个表达式。

语句以分号结尾，一个分号就表示一个语句结束。多个语句可以写在一行内。

```javascript
var a = 1 + 3 ; var b = "abc";
```

分号前面可以没有任何内容，JavaScript引擎将其视为空语句。

```javascript
;;;
```

上面的代码就表示3个空语句。（关于分号的更多介绍，请看后文《结尾的分号》一节。）

表达式不需要分号结尾。一旦在表达式后面添加分号，则JavaScript引擎就将表达式视为语句，这样会产生一些没有任何意义的语句。

```javascript
1 + 3;

"abc";
```

上面两行语句有返回值，但是没有任何意义，因为只是返回一个单纯的值，没有任何其他操作。

### 变量

变量是对“值”的引用，使用变量等同于引用一个值。每一个变量都有一个变量名。

```javascript

var a = 1;

```

上面的代码先声明变量a，然后在变量a与数值1之间建立引用关系，也称将数值1“赋值”给变量a。以后，引用变量a就会得到数值1。最前面的var，是变量声明命令。它表示通知解释引擎，要创建一个变量a。

变量的声明和赋值，是分开的两个步骤，上面的代码将它们合在了一起，实际的步骤是下面这样。

```javascript

var a;

a = 1;

```

如果只是声明变量而没有赋值，则该变量的值为`undefined`。

```javascript
var a;
a // undefined
```

JavaScript允许省略`var`，直接对未声明的变量赋值。也就是说，`var a = 1`与`a = 1`，这两条语句的效果相同。但是由于这样的做法很容易不知不觉地创建全局变量（尤其是在函数内部），所以建议总是使用var命令声明变量。

> 严格地说，var a = 1 与 a = 1，这两条语句的效果不完全一样，主要体现在delete命令无法删除前者。不过，绝大多数情况下，这种差异是可以忽略的。

如果一个变量没有声明就直接使用，JavaScript会报错，告诉你变量未定义。

```javascript

x
// ReferenceError: x is not defined 

```

上面代码直接使用变量x，系统就报错，告诉你变量x没有声明。

可以在同一条var命令中声明多个变量。

```javascript

var a,b;

```

JavaScirpt是一种动态类型语言，也就是说，变量的类型没有限制，可以赋予各种类型的值。

```javascript

var a = 1;

a = "hello";

```

上面代码中，变量a起先被赋值为一个数值，后来又被重新赋值为一个字符串。第二次赋值的时候，因为变量a已经存在，所以不需要使用var命令。如果用了，就等于重新声明一个变量a，会覆盖掉前面的同名变量。

### 变量提升

JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

```javascript

console.log(a);
var a = 1;

```

上面代码首先使用console.log方法，在控制台（console）显示变量a的值。这时变量a还没有声明和赋值，所以这是一种错误的做法，但是实际上不会报错。因为存在变量提升，真正运行的是下面的代码：

```javascript

var a;
console.log(a);
a = 1;

```

最后的结果是显示undefined，表示变量a已声明，但还未赋值。

请注意，变量提升只对var命令声明的变量有效，如果一个变量不是用var命令声明的，就不会发生变量提升。

```javascript

console.log(b);
b = 1;

```

上面的语句将会报错，提示“ReferenceError: b is not defined”，即变量b未声明，这是因为b不是用var命令声明的，JavaScript引擎不会将其提升，而只是视为对顶层对象的b属性的赋值。

### 标识符

标识符（identifier）是用来识别具体对象的一个名称。最常见的标识符就是变量名，以及后面要提到的函数名。JavaScript语言的标识符对大小写敏感，所以a和A是两个不同的标识符。

标识符有一套命名规则，不符合规则的就是非法标识符。JavaScript引擎遇到非法标识符，就会报错。

简单说，标识符命名规则如下：

- 第一个字符可以是任意Unicode字母，以及美元符号（$）和下划线（_）。
- 第二个字符及后面的字符，还可以用数字。

下面这些都是合法的标识符。

```javascript

arg0
_tmp
$elem
π

```

下面这些则是不合法的标识符。

```javascript

1a
23
***
a+b
-d

```

中文是合法的标识符，可以用作变量名。

```javascript

var 临时变量 = 1;

```

> JavaScript有一些保留字，不能用作标识符：arguments、break、case、catch、class、const、continue、debugger、default、delete、do、else、enum、eval、export、extends、false、finally、for、function、if、implements、import、in、instanceof、interface、let、new、null、package、private、protected、public、return、static、super、switch、this、throw、true、try、typeof、var、void、while、with、yield。

另外，还有三个词虽然不是保留字，但是因为具有特别含义，也不应该用作标识符：Infinity、NaN、undefined。

### 注释

源码中被JavaScript引擎忽略的部分就叫做注释，它的作用是对代码进行解释。Javascript提供两种注释：一种是单行注释，用//起头；另一种是多行注释，放在/\* 和 \*/之间。

```javascript

// 这是单行注释

/*
 这是
 多行
 注释
*/

```

本教程后面的代码部分，会采用这两种形式说明代码的运行结果，以及需要注意的地方。

此外，由于历史上JavaScript兼容HTML代码的注释，所以&lt;!--和--&gt;也被视为单行注释。

```javascript
x = 1; <!-- x = 2;
--> x = 3;
```

上面代码中，只有`x = 1`会执行，其他的部分都被注释掉了。

需要注意的是，--&gt;只有在行首，才会被当成单行注释，否则就是一个运算符。

```javascript
function countdown(n) {
  while (n --> 0) console.log(n);
}
countdown(3)
// 2
// 1
// 0
```

上面代码中，`n --> 0`实际上会当作`n-- > 0`，因为输出2、1、0。


### 条件语句

JavaScript提供if结构和switch结构，完成条件判断。

**（1）if 结构**

if结构先判断一个表达式的布尔值，然后根据布尔值的真伪，执行不同的语句。

```javascript

if (expression) 
  statement

```

上面是if结构的基本形式。需要注意的是，expression（表达式）必须放在圆括号中，表示对表达式求值。如果结果为true，就执行紧跟在后面的statement（语句）；如果结果为false，则跳过statement。

```javascript

if (m === 3) 
  m += 1; 

```

上面代码表示，只有在m等于3时，才会将其值加上1。

这种写法要求statement只能有一个语句。如果想将多个语句放在statement之中，必须在if的条件判断之后，加上大括号。

```javascript

if (m === 3) {
  m += 1; 
}

```

建议总是在if语句中使用大括号，因为这样方便插入语句。

**（2）if...else结构**

if代码块后面，还可以跟一个else代码块，表示括号中的表示式为false时，所要执行的代码。

```javascript

 if (m === 3) {
    // then
 } else {
   // else
 }

```

上面代码判断变量m是否等于3，如果等于就执行if代码块，否则执行else代码块。

对同一个变量进行多次判断时，多个if...else语句可以连写在一起。

```javascript

if (m === 0) {
    // ...
} else if (m === 1) {
   // ...
} else if (m === 2) {
   // ...
} else {
   // ...
}

```

else代码块总是跟随离自己最近的那个if语句。

```javascript

var m = 1;
var n = 2;

if (m !== 1) 
if (n === 2) console.log('hello');  
else console.log('world');

```

上面代码不会有任何输出，else代码块也不会得到执行，因为它跟着的是最近的那个if语句，相当于下面这样。

```javascript

if (m !== 1) {
  if (n === 2) {
    console.log('hello'); 
  } else {
    console.log('world');
  }
}

```

如果想让else代码块跟随最上面的那个if语句，就要改变大括号的位置。

```javascript

if (m !== 1) {
  if (n === 2) {
    console.log('hello'); 
  } 
} else {
    console.log('world');
} 
// world

```

**（3）switch结构**

多个if...else连在一起使用的时候，可以转为使用更方便的switch结构。

```javascript

switch (fruit) {
  case "banana":
    // ...
    break;
    case "apple":
        // ...
        break;
    default:
        // ...
}

```

上面代码根据变量fruit的值，选择执行相应的case。如果所有case都不符合，则执行最后的default部分。需要注意的是，每个case代码块内部的break语句不能少，否则会接下去执行下一个case代码块，而不是跳出switch结构。

switch语句部分和case语句部分，都可以使用表达式。

```javascript

switch(1 + 3) {
    case 2 + 2:
        f();
        break;
    default:
        neverhappens();
}

```

上面代码的default部分，是永远不会执行到的。

需要注意的是，switch语句后面的表达式与case语句后面的表示式，在比较运行结果时，采用的是严格相等运算符（===），而不是相等运算符（==），这意味着比较时不会发生类型转换。

switch结构不利于代码重用，往往可以用对象形式重写。

```javascript

var o = {
  banana: function (){ return },
  apple: function (){ return },
  default: function (){ return }
};

if (o[fruit]){
  o[fruit]();
} else {
  o['default']();
}

```

### 循环语句

循环语句用于重复执行某个操作，它有多种形式。

**（1）while循环**

While语句包括一个循环条件，只要该条件为真，就不断循环。

```javascript

while (expression)  
statement

```

while语句的循环条件是一个表达式（express），必须放在圆括号中。语句（statement）部分默认只能写一条语句，如果需要包括多条语句，必须添加大括号。

```javascript

while (expression){ 
  statement
}

```

下面是while语句的一个例子。

```javascript

var i = 0;

while (i<100){
  console.log('i当前为：' + i);
  i++;
} 

```

上面的代码将循环100次，直到i等于100为止。

**（2）for循环**

for语句是循环命令的另一种形式。

```javascript

for(initialize; test; increment)
statement

// 或者

for(initialize; test; increment){
  statement
}

```

它分成三步：

- 初始化（initialize）：确定循环的初始值，只在循环开始时执行一次;
- 测试（test）：检查循环条件，只要为真就进行后续操作;
- 递增（increment）：完成后续操作，然后返回上一步，再一次检查循环条件。

下面是一个循环打印数组每个元素的例子。

```javascript

for (var i=0; i < arr.length; i++) {
  console.log(arr[i]);
}

```

所有for循环，都可以改写成while循环。

```javascript

var i = 0;

while (i < arr.length) {
  console.log(arr[i]);
    i++;
}

```

for语句表达式的三个部分（initialize，test，increment），可以省略任何一个，也可以全部省略。

```javascript

for (;;){
  console.log('Hello World');
}

```

上面代码省略了for语句表达式的三个部分，结果就导致了一个无限循环。

**（3）do...while循环**

do...while循环与while循环类似，唯一的区别就是先运行一次循环体，然后判断循环条件。

```javascript

do 
statement
while(expression);

// 或者

do { 
  statement
} while(expression);

```

不管条件是否为真，do..while循环至少运行一次，这是这种结构最大的特点。另外，while语句后面的分号不能省略。

**（4）break语句和continue语句**

break语句和continue语句都具有跳转作用，可以让代码不按既有的顺序执行。

break语句用于跳出代码块或循环。

```javascript

var i = 0;

while (i<100){
  console.log('i当前为：' + i);
  i++;
  if (i === 10) break;
}

```

上面代码只会执行10次循环，一旦i等于10，就会跳出循环。

continue语句用于立即终止本次循环，返回循环结构的头部，开始下一次循环。

```javascript

var i = 0;

while (i<100){
  i++;
  if (i%2===0) continue;
  console.log('i当前为：' + i);
}

```

上面代码只有在i为奇数时，才会输出i的值。如果i为偶数，则直接进入下一轮循环。

如果存在多重循环，不带参数的break语句和continue语句都只针对最内层循环。

**（5）标签（label）**

JavaScript语言允许，语句的前面有标签（label）。标签通常与break语句和continue语句配合使用，跳出特定的循环。

```javascript

top:
  for (var i=0;i<3;i++){
    for (var j=0;j<3;j++){
      if (i===1 && j===1) break top;
      console.log("i="+i+",j="+j);
    }
}
// i=0,j=0
// i=0,j=1
// i=0,j=2
// i=1,j=0

```

上面代码为一个双重循环区块，加上了top标签（注意，top不用加引号）。当满足一定条件时，使用break语句加上标签名，直接跳出双层循环。如果break语句后面不使用标签，则只能跳出内层循环，进入下一次的外层循环。

continue语句也可以与标签配合使用。

```javascript

top:
  for (var i=0;i<3;i++){
    for (var j=0;j<3;j++){
      if (i===1 && j===1) continue top;
      console.log("i="+i+",j="+j);
    }
}
// i=0,j=0
// i=0,j=1
// i=0,j=2
// i=1,j=0
// i=2,j=0
// i=2,j=1
// i=2,j=2

```

上面代码在满足一定条件时，使用continue语句加上标签名，直接进入下一轮外层循环。如果continue语句后面不使用标签，则只能进入下一轮的内层循环。



对象和数组是两种不同的数据组合方式，而函数其实是处理数据的方法。JavaScript把函数当成一种数据类型，可以像其他类型的数据一样，进行赋值和传递，这为编程带来了很大的灵活性，体现了JavaScript作为“函数式语言”的本质。

这里需要明确的是，JavaScript的所有数据，都可以视为对象。不仅合成类型的数组和函数属于对象的特例，就连原始类型的数据（数值、字符串、布尔值）也可以用对象方式调用。

本教程将分别详细所有的数据类型。两个特殊值和布尔类型比较简单，将在本节介绍，其他类型将各自有单独的一节。

