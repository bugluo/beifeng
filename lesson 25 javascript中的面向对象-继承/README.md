## javascript的继承

从一个简单的需求开始
现从前台抽离一个model名为Person，其有基本属性name和age，默认每个人都会说话，因此将说话的功能say放在了原型对象上，以供每个实例享用。现在对于Man来说，它需要继承Person的基本属性，并且在此基础上添加自己特有的属性。

```javascript
function Person (name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function(){
    console.log('hello, my name is ' + this.name);
};
function Man() {
    //my own properties
}
```

### 几种不同的继承方式

```javascript
1.原型链继承
function Person (name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function(){
    console.log('hello, my name is ' + this.name);
};
function Man() {
}
Man.prototype = new Person('pursue');
var man1 = new Man();
man1.say(); //hello, my name is pursue
var man2 = new Man();
console.log(man1.say === man2.say);//true
console.log(man1.name === man2.name);//true
```

这种继承方式很直接，为了获取Person的所有属性方法(实例上的和原型上的)，直接将父类的实例new Person('pursue')赋给了子类的原型，其实子类的实例man1,man2本身是一个完全空的对象，所有的属性和方法都得去原型链上去找，因而找到的属性方法都是同一个。
所以直接利用原型链继承是不现实的。

```javascript
2.利用构造函数继承
function Person (name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function(){
    console.log('hello, my name is ' + this.name);
};
function Man(name, age) {
    Person.apply(this, arguments);
}
//Man.prototype = new Person('pursue');
var man1 = new Man('joe');
var man2 = new Man('david');
console.log(man1.name === man2.name);//false
man1.say(); //say is not a function
```

这里子类的在构造函数里利用了apply去调用父类的构造函数，从而达到继承父类属性的效果，比直接利用原型链要好的多，至少每个实例都有自己那一份资源，但是这种办法只能继承父类的实例属性，因而找不到say方法，为了继承父类所有的属性和方法，则就要修改原型链，从而引入了组合继承方式。

```javascript
3.组合继承
function Person (name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function(){
    console.log('hello, my name is ' + this.name);
};
function Man(name, age) {
    Person.apply(this, arguments);
}
Man.prototype = new Person();
var man1 = new Man('joe');
var man2 = new Man('david');
console.log(man1.name === man2.name);//false
console.log(man1.say === man2.say);//true
man1.say(); //hello, my name is joe
```

需要注意的是man1和man2的实例属性其实是覆盖了原型属性，但是并没要覆盖掉原型上的say方法（因为它们没有），所以这里man1.say === man2.say依然返回true，因而需要十分小心没有覆盖掉的原型属性，因为它是所有实例共有的。

```javascript
4.寄生组合继承
说实话我真不知道下面的这种形式叫这名字，但是它确实是最流行，最经典的javascript的继承方式。
其实，只需要明白原型对象的结构即可：

function Person (name, age) {
            this.name = name;
            this.age = age;
        }
Person.prototype.say = function(){
    console.log('hello, my name is ' + this.name);
};
function Man(name, age) {
    Person.apply(this, arguments);
}
Man.prototype = Object.create(Person.prototype);//a.
Man.prototype.constructor = Man;//b.
var man1 = new Man('pursue');
var man2 = new Man('joe');
console.log(man1.say == man2.say);
console.log(man1.name == man2.name);

其实寄生组合继承和上面的组合继承区别仅在于构造子类原型对象的方式上（a.和b.），这里用到了Object.creat(obj)方法，该方法会对传入的obj对象进行浅拷贝，类似于：

function create(obj){
    function T(){};
    T.prototype = obj;
    return new T();
}
```

因此，a.会将子类的原型对象与父类的原型对象进行很好的连接，而并不像一般的组合继承那样直接对子类的原型进行复制（如Man.prototype = new Person();）,这样只是很暴力的在对属性进行覆盖。而寄生组合继承方式则对实例属性和原型属性分别进行了继承，在实现上更加合理。


# 模块化

## 原始写法

模块就是实现特定功能的一组方法。只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。

```javascript
function m1(){
  //...
}

function m2(){
  //...
}
```

上面的函数m1()和m2()，组成一个模块。使用的时候，直接调用就行了。

这种做法的缺点很明显："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。

```javascript
var module1 = new Object({
　_count : 0,
　m1 : function (){
　　//...
　},
　m2 : function (){
  　//...
　}
});
```

上面的函数m1()和m2(），都封装在module1对象里。使用的时候，就是调用这个对象的属性。

```javascript
module1.m1();
```

但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。

```javascript
module1._count = 5;
```

## 使用构造函数封装私有变量

可以利用构造函数，封装私有变量。

```javascript

function StringBuilder() {
  var buffer = [];

  this.add = function (str) {
     buffer.push(str);
  };

  this.toString = function () {
    return buffer.join('');
  };

}

```

这种方法将私有变量封装在构造函数中，违反了构造函数与实例对象相分离的原则。并且，非常耗费内存。

```javascript

function StringBuilder() {
  this._buffer = [];
}

StringBuilder.prototype = {
  constructor: StringBuilder,
  add: function (str) {
    this._buffer.push(str);
  },
  toString: function () {
    return this._buffer.join('');
  }
};

```

这种方法将私有变量放入实例对象中，好处是看上去更自然，但是它的私有变量可以从外部读写，不是很安全。

## 立即执行函数写法

使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE），将相关的属性和方法封装在一个函数作用域里面，可以达到不暴露私有成员的目的。

```javascript
var module1 = (function(){
　var _count = 0;
　var m1 = function(){
　  //...
　};
　var m2 = function(){
　　//...
　};
　return {
　　m1 : m1,
　　m2 : m2
　};
})();
```

使用上面的写法，外部代码无法读取内部的_count变量。

```javascript
console.info(module1._count); //undefined
```

module1就是JavaScript模块的基本写法。下面，再对这种写法进行加工。

## 放大模式

如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"（augmentation）。

```javascript
var module1 = (function (mod){
　mod.m3 = function () {
　　//...
　};
　return mod;
})(module1);
```

上面的代码为module1模块添加了一个新方法m3()，然后返回新的module1模块。

在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上面的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"（Loose augmentation）。

```javascript
var module1 = ( function (mod){
　//...
　return mod;
})(window.module1 || {});
```

与"放大模式"相比，“宽放大模式”就是“立即执行函数”的参数可以是空对象。

## 输入全局变量

独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。

为了在模块内部调用全局变量，必须显式地将其他变量输入模块。

```javascript
var module1 = (function ($, YAHOO) {
　//...
})(jQuery, YAHOO);
```

上面的module1模块需要使用jQuery库和YUI库，就把这两个库（其实是两个模块）当作参数输入module1。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

立即执行函数还可以起到命名空间的作用。

```javascript
(function($, window, document) {

  function go(num) {
  }

  function handleEvents() {
  }

  function initialize() {
  }

  function dieCarouselDie() {
  }

  //attach to the global scope
  window.finalCarousel = {
    init : initialize,
    destroy : dieCouraselDie
  }

})( jQuery, window, document );
```

上面代码中，finalCarousel对象输出到全局，对外暴露init和destroy接口，内部方法go、handleEvents、initialize、dieCarouselDie都是外部无法调用的。

