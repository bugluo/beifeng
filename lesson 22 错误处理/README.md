# 错误处理

## throw语句

throw语句的作用是中断程序执行，抛出一个意外或错误。它接受一个表达式作为参数。

```javascript

throw "Error！";
throw 42;
throw true;
throw {toString: function() { return "Error!"; } };

```

上面代码表示，throw可以接受各种值作为参数。JavaScript引擎一旦遇到throw语句，就会停止执行后面的语句，并将throw语句的参数值，返回给用户。

如果只是简单的错误，返回一条出错信息就可以了，但是如果遇到复杂的情况，就需要在出错以后进一步处理。这时最好的做法是使用throw语句手动抛出一个Error对象。

```javascript

throw new Error('出错了!');

```

上面语句新建一个Error对象，然后将这个对象抛出，整个程序就会中断在这个地方。

throw语句还可以抛出用户自定义的错误。

```javascript

function UserError(message) {
   this.message = message || "默认信息";
   this.name = "UserError";
}

UserError.prototype.toString = function (){
  return this.name + ': "' + this.message + '"';
}

throw new UserError("出错了！");

```

## try...catch结构

为了对错误进行处理，需要使用try...catch结构。

```javascript
try {
  throw new Error('出错了!');
} catch (e) {
  console.log(e.name + ": " + e.message);  // Error: 出错了！
  console.log(e.stack);  // 不是标准属性，但是浏览器支持
}
// Error: 出错了!
// Error: 出错了!
//   at <anonymous>:3:9
//   at Object.InjectedScript._evaluateOn (<anonymous>:895:140)
//   at Object.InjectedScript._evaluateAndWrap (<anonymous>:828:34)
//   at Object.InjectedScript.evaluate (<anonymous>:694:21)
```

上面代码中，try代码块抛出的错误（包括用throw语句抛出错误），可以被catch代码块捕获。catch接受一个参数，表示try代码块传入的错误对象。

```javascript
function throwIt(exception) {
  try {
    throw exception;
  } catch (e) {
    console.log('Caught: '+e);
  }
}

throwIt(3);
// Caught: 3
throwIt('hello');
// Caught: hello
throwIt(new Error('An error happened'));
// Caught: Error: An error happened
```

catch代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

```javascript
try {
  throw "出错了";
} catch (e) {
  console.log(111);
}
console.log(222);
// 111
// 222
```

上面代码中，try代码块抛出的错误，被catch代码块捕获后，程序会继续向下执行。

catch代码块之中，还可以再抛出错误，甚至使用嵌套的try...catch结构。

```javascript

try {
   throw n; // 这里抛出一个整数
} catch (e) {
   if (e <= 50) {
      // 针对1-50的错误的处理
   } else {
      // 大于50的错误无法处理，再抛出一个错误
      throw e;
   }
}

```

为了捕捉不同类型的错误，catch代码块之中可以加入判断语句。

```javascript

try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
  // ... 
}

```

try...catch结构是JavaScript语言受到Java语言影响的一个明显的例子。这种结构多多少少是对结构化编程原则一种破坏，处理不当就会变成类似goto语句的效果，应该谨慎使用。

## finally代码块

try...catch结构允许在最后添加一个finally代码块，表示不管是否出现错误，都必需在最后运行的语句。

```javascript

function cleansUp() {
    try {
        throw new Error('Sorry...');
    } finally {
        console.log('Performing clean-up');
    }
}

cleansUp()
// Performing clean-up
// Error: Sorry...

```

上面代码说明，throw语句抛出错误以后，finanlly继续得到执行。

```javascript

function idle(x) {
    try {
        console.log(x);
        return 'result';
    } finally {
        console.log("FINALLY");
    }
}

idle('hello')
// hello
// FINALLY
// "result"

```

上面代码说明，即使有return语句在前，finally代码块依然会得到执行，且在其执行完毕后，才会显示return语句的值。

下面的例子说明，return语句的执行是排在finanlly代码之前，只是等finnally代码执行完毕后才返回。

```javascript

var count = 0;
function countUp() {
    try {
        return count;
    } finally {
        count++;
    }
}

countUp()
// 0
count
// 1

```

上面代码说明，return语句的count的值，是在finally代码块运行之前，就获取完成了。

下面是另一个例子。

```javascript

openFile();

try {
   writeFile(Data);
} catch(e) {
    handleError(e);
} finally {
   closeFile();
}

```

上面代码首先打开一个文件，然后在try代码块中写入文件，如果没有发生错误，则运行finally代码块关闭文件；一旦发生错误，则先使用catch代码块处理错误，再使用finally代码块关闭文件。

下面的例子充分反应了try...catch...finally这三者之间的执行顺序。

```javascript

function f() {
    try {
        console.log(0);
        throw "bug";
    } catch(e) {
        console.log(1);
        return true; // 这句会延迟到finally代码块结束再执行
        console.log(2); // 不会运行
    } finally {
        console.log(3);
        return false; // 这句会覆盖掉前面那句return
        console.log(4); // 不会运行
    }
    
    console.log(5); // 不会运行
}

var result = f(); 
// 0
// 1
// 3

result
// false

```

某些情况下，甚至可以省略catch代码块，只使用finally代码块。

```javascript

openFile();

try {
   writeFile(Data);
} finally {
   closeFile();
}

```


## window.onerror

javascript的window对象有一个特别的属性onerror，如果你将某个function赋值给window的onerror属性，那么但凡这个window中有javascript错误出现，该function都会被调用，也就是说这个function会成为这个window的错误处理句柄。

```javascript
window.onerror = function(msg, url, line) {
  alert("ERROR: " + msg + "\n" + url + ":" + line);
  return true;
}
```

onerroe句柄的返回值也很重要，如果句柄返回true，表示浏览器无需在对该错误做额外的处理，也就是说浏览器不需要再显示错误信息。而如果返回的是false，浏览器还是会提示错误信息。