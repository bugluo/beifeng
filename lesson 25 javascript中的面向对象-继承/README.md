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

注意:代码b.并不会改变instanceof的结果，但是对于需要用到construcor的场景，这么做更加严谨。

