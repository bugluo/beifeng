## 数组的定义

数组（array）是按次序排列的一组值，每个值的位置都有编号（从0开始）。整个数组用方括号表示。

```javascript
var arr = ['a', 'b', 'c'];
```

上面代码中的`a`、`b`、`c`就构成一个数组，两端的方括号是数组的标志，`a`是0号位置，`b`是1号位置，`c`是2号位置。

除了在定义时赋值，数组也可以先定义后赋值。

```javascript
var arr = [];

arr[0] = 'a';
arr[1] = 'b';
arr[2] = 'c';
```

## 数组的访问

```javascript
var arr = [
  {a: 1},
  [1, 2, 3],
  function() {return true;}
];

arr[0] // Object {a: 1}
arr[1] // [1, 2, 3]
arr[2] // function (){return true;}
```

上面数组`arr`的3个成员依次是对象、数组、函数。

如果数组的元素还是数组，就形成了多维数组。

```javascript
var a = [[1, 2], [3, 4]];
a[0][1] // 2
a[1][1] // 4
```

## 数组的操作

### 数组元素的添加
```javascript
arrayObj. push([item1 [item2 [. . . [itemN ]]]]);// 将一个或多个新元素添加到数组结尾，并返回数组新长度

arrayObj.unshift([item1 [item2 [. . . [itemN ]]]]);// 将一个或多个新元素添加到数组开始，数组中的元素自动后移，返回数组新长度

arrayObj.splice(insertPos,0,[item1[, item2[, . . . [,itemN]]]]);//将一个或多个新元素插入到数组的指定位置，插入位置的元素自动后移，返回""。
```

### 数组元素的删除
```javascript
arrayObj.pop(); //移除最后一个元素并返回该元素值

arrayObj.shift(); //移除最前一个元素并返回该元素值，数组中元素自动前移

arrayObj.splice(deletePos,deleteCount); //删除从指定位置deletePos开始的指定数量deleteCount的元素，数组形式返回所移除的元素
```


###数组的截取和合并
```javascript
arrayObj.slice(start, [end]); //以数组的形式返回数组的一部分，注意不包括 end 对应的元素，如果省略 end 将复制 start 之后的所有元素

arrayObj.concat([item1[, item2[, . . . [,itemN]]]]); //将多个数组（也可以是字符串，或者是数组和字符串的混合）连接为一个数组，返回连接好的新的数组
```

### 数组元素的拷贝
```javascript
arrayObj.slice(0); //返回数组的拷贝数组，注意是一个新的数组，不是指向

arrayObj.concat(); //返回数组的拷贝数组，注意是一个新的数组，不是指向
```

### 数组元素的排序
```javascript
arrayObj.reverse(); //反转元素（最前的排到最后、最后的排到最前），返回数组地址

arrayObj.sort(); //对数组元素排序，返回数组地址
```

### 数组元素的字符串化

```javascript
arrayObj.join(separator); //返回字符串，这个字符串将数组的每一个元素值连接在一起，中间用 separator 隔开。
```

## 数组的特点

### 数组与对象的关系

本质上，数组也属于对象，是字典结构（dictionary）的一个变种。

```javascript
typeof [1, 2, 3] // "object"
```

上面代码表明，数组只是一种特殊的对象，所以`typeof`运算符返回数组的类型是`object`。

数组的特殊性体现在，它的键默认是按次序排列的整数（0，1，2...），所以数组不用为每个元素指定键名，而对象的每个成员都必须指定键名。

此外，对象以字符串来识别键名，非字符串的键名会被转为字符串。数组的键名其实也是字符串，所有的整数键名默认都会转为字符串。所以，使用数值或字符串作为键名，都能读取数组的成员。

```javascript
var arr = ['a', 'b', 'c'];

arr['0'] // 'a'
arr[0] // 'a'
```

上面代码分别用数值和字符串作为键名，结果都能读取数组。

需要注意的是，这一条在赋值时也成立。如果一个值可以被转换为整数，则以该值为键名，等于以对应的整数为键名。

```javascript
var a = [];

a['1000'] = 'abc';
a[1000] // 'abc'

a[1.00] = 6;
a[1] // 6
```

上面代码表明，由于字符串“1000”和浮点数1.00都可以转换为整数，所以视同为整数键赋值。

上一节说过，对象有两种读取成员的方法：“点”结构（`object.key`）和方括号结构（`object[key]`）。但是，对于数字的键名，不能使用点结构，`arr.0`的写法不合法，因为单独的数字不能作为标识符（identifier）。所以，数组成员只能用方括号`arr[0]`表示（方括号是运算符，可以接受数值）。

### length属性

数组的length属性，返回数组的成员数量。

```javascript

['a', 'b', 'c'].length // 3

```

JavaScript使用一个32位整数，保存数组的元素个数。这意味着，数组成员最多只有4294967295个（2<sup>32</sup>-1）个，也就是说length属性的最大值就是4294967295。

数组的length属性与对象的length属性有区别，只要是数组，就一定有length属性，而对象不一定有。而且，数组的length属性是一个动态的值，等于键名中的最大整数加上1。

```javascript

var arr = ['a', 'b'];
arr.length // 2

arr[2] = 'c';
arr.length // 3

arr[9] = 'd';
arr.length // 10

arr[1000] = 'e';
arr.length // 1001

```

上面代码表示，数组的数字键不需要连续，length属性的值总是比最大的那个整数键大1。另外，这也表明数组是一种动态的数据结构，可以随时增减数组的成员。

length属性是可写的。如果人为设置一个小于当前成员个数的值，该数组的成员会自动减少到length设置的值。

```javascript

var arr = [ 'a', 'b', 'c' ];
arr.length // 3

arr.length = 2;
arr // ["a", "b"]

```

上面代码表示，当数组的length属性设为2，即最大的整数键只能是1，那么整数键2（值为c）就已经不在数组中了，被自动删除了。

将数组清空的一个有效方法，就是将length属性设为0。

```javascript

var arr = [ 'a', 'b', 'c' ];

arr.length = 0;
arr // []

```

如果人为设置length大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置填入空元素。

```javascript

var a = ['a'];

a.length = 3;
a // ["a", undefined × 2]

```

上面代码表示，当length属性设为大于数组个数时，新增的位置都填充为undefined。

如果人为设置length为不合法的值，JavaScript会报错。

```javascript

// 设置负值
[].length = -1
// RangeError: Invalid array length

// 数组元素个数大于等于2的32次方
[].length = Math.pow(2,32)
// RangeError: Invalid array length

// 设置字符串
[].length = 'abc'
// RangeError: Invalid array length

```

值得注意的是，由于数组本质上是对象的一种，所以我们可以为数组添加属性，但是这不影响length属性的值。

```javascript

var a = [];

a["p"] = "abc";
a.length // 0

a[2.1] = "abc";
a.length // 0

```

上面代码将数组的键分别设为字符串和小数，结果都不影响length属性。因为，length属性的值就是等于最大的数字键加1，而这个数组没有整数键，所以length属性保持为0。

### 数组的空位

当数组的某个位置是空元素（比如两个逗号之间没有任何值，或者值为undefined），我们称该数组存在空位（hole）。

```javascript
var a = [1,,1];
a // [1, undefined, 1]
a.length // 3
```

上面代码表明，数组的空位不影响`length`属性。

需要注意的是，如果最后一个元素后面有逗号，并不会产生空位。也就是说，有没有这个逗号，结果都是一样的。

```javascript
var a = [1, 2, 3,];

a.length // 3
a // [1, 2, 3]
```

上面代码中，数组最后一个成员后面有一个逗号，这不影响`length`属性的值，与没有这个逗号时效果一样。

使用`delete`命令删除一个值，会形成空位。

```javascript
var a = [1, 2, 3];

delete a[1];
a // [1, undefined, 3]
```

需要注意的是，`delete`命令不影响`length`属性。

```javascript
var a = [1, 2, 3];
delete a[1];
delete a[2];
a // [1, undefined, undefined]
a.length // 3
```

上面代码用`delete`命令删除了两个键，对`length`属性没有影响。因为这两个键还在，只是值变为了`undefined`。也就是说，`length`属性不过滤`undefined`的值。所以，使用`length`属性进行数组遍历，一定要非常小心。

空位通过空值生成，还是通过显式设为`undefined`生成，有一个细微的差别。如果通过空值生成，使用数组的`forEach`方法、`for...in`结构、以及`Object.keys`方法进行遍历，空位都会被跳过。

```javascript
var a = [,,,];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出

for (var i in a) {
  console.log(i);
}
// 不产生任何输出

Object.keys(a)
// []
```

如果空位是通过显式定义`undefined`生成，遍历的时候就不会被跳过。

```javascript
var a = [undefined,undefined,undefined];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined

for (var i in a) {
  console.log(i);
}
// 0
// 1
// 2

Object.keys(a)
// ['0', '1', '2']
```


