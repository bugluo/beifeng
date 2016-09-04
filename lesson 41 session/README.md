# session

## redis简单手册

#### 下载安装<a href="http://redis.io/download" target="_blank">redis</a>

##### 基本数据结构及操作 <a href="http://www.yiibai.com/redis/redis_quick_guide.html" target="_blank">redis简明教程</a>

###### Strings - 字符串

Redis的字符串是字节序列。在Redis中字符串是二进制安全的，这意味着他们有一个已知的长度，是没有任何特殊字符终止决定的，所以可以存储任何东西，最大长度可达512兆。

```javascript
redis 127.0.0.1:6379> SET name "yiibai"
OK
redis 127.0.0.1:6379> GET name
"yiibai"
```

###### Hashes - 哈希值

Redis的哈希键值对的集合。 Redis的哈希值是字符串字段和字符串值之间的映射，所以它们被用来表示对象

```javascript
redis 127.0.0.1:6379> HMSET user:1 username yiibai password yiibai points 200
OK
redis 127.0.0.1:6379> HGETALL user:1

1) "username"
2) "yiibai"
3) "password"
4) "yiibai"
5) "points"
6) "200"
```

###### Lists - 列表

Redis的列表是简单的字符串列表，排序插入顺序。可以添加元素到Redis列表的头部或尾部。

```javascript
redis 127.0.0.1:6379> lpush tutoriallist redis
(integer) 1
redis 127.0.0.1:6379> lpush tutoriallist mongodb
(integer) 2
redis 127.0.0.1:6379> lpush tutoriallist rabitmq
(integer) 3
redis 127.0.0.1:6379> lrange tutoriallist 0 10

1) "rabitmq"
2) "mongodb"
3) "redis"
```

###### Sets - 集合

Redis集合是字符串的无序集合。在Redis中可以添加，删除和测试文件是否存在在O(1)的时间复杂度的成员。

```javascript
redis 127.0.0.1:6379> sadd tutoriallist redis
(integer) 1
redis 127.0.0.1:6379> sadd tutoriallist mongodb
(integer) 1
redis 127.0.0.1:6379> sadd tutoriallist rabitmq
(integer) 1
redis 127.0.0.1:6379> sadd tutoriallist rabitmq
(integer) 0
redis 127.0.0.1:6379> smembers tutoriallist

1) "rabitmq"
2) "mongodb"
3) "redis"
```

###### 集合排序

```javascript
redis 127.0.0.1:6379> zadd tutoriallist 0 redis
(integer) 1
redis 127.0.0.1:6379> zadd tutoriallist 0 mongodb
(integer) 1
redis 127.0.0.1:6379> zadd tutoriallist 0 rabitmq
(integer) 1
redis 127.0.0.1:6379> zadd tutoriallist 0 rabitmq
(integer) 0
redis 127.0.0.1:6379> ZRANGEBYSCORE tutoriallist 0 1000

1) "redis"
2) "mongodb"
3) "rabitmq"
```

###### 发布订阅

###### 事务



## 我们为什么要把Session存放到数据中，以及又为什么要在子域名间跨域共享Cookie呢？

### Session与Cookie的关系

cookie 和session 的区别：

1. cookie数据存放在客户的浏览器上，session数据放在服务器上。
2. cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗
   考虑到安全应当使用session。
3. session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
   考虑到减轻服务器性能方面，应当使用COOKIE。
4. 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。
5. 所以个人建议：
   将登陆信息等重要信息存放为SESSION
   其他信息如果需要保留，可以放在COOKIE中

### session的请求过程

1. 服务器端的产生Session ID
2. 服务器端和客户端存储Session ID
3. 从HTTP Header中提取Session ID
4. 根据Session ID从服务器端的Hash中获取请求者身份信息

### 为什么session搭配redis

Redis是一个非常适合用于Session管理的数据库。

1. 它的结构简单，key-value的形式非常符合SessionID-UserID的存储；
2. 读写速度非常快；
3. 自身支持数据自动过期和清除；
4. 语法、部署非常简单。基于以上原因，很多Session管理都是基于Redis实现的。

### 在NodeJS中使用Redis缓存数据

Express已经将Session管理的整个实现过程简化到仅仅几行代码的配置的地步了，你完全不用理解整个session产生、存储、返回、过期、再颁发的结构，使用Express和Redis实现Session管理，只要两个中间件就足够了：

express-session
connect-redis

废话不多说还是上代码：


```javascript
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();
var options = {
     "host": "127.0.0.1",
     "port": "6379",
     "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天
};

// 此时req对象还没有session这个属性
app.use(session({
     store: new RedisStore(options),
     secret: 'express is powerful'
}));
// 经过中间件处理后，可以通过req.session访问session object。比如如果你在session中保存了session.userId就可以根据userId查找用户的信息了。
```

req在经过session中间件的时候就会自动完成session的有效性验证、延期/重新颁发、以及对session中数据的获取了。

上述代码只是对于请求的Session静态处理，整个用户管理的另一个方面则是状态的切换（用户的登陆、登出）以及用户数据的获取。

```javascript
exports.signin = function(params, req, res){
    var username = params.username;
    var password = params.password;

    //查找用户信息，看是否满足登陆条件
    var user = findUser(username, password);
    if(user){
        //成功获取用户对象
        req.session.regenerate(function(){
            req.user = user;
            req.session.userId = user.id;
            req.session.save();  //保存一下修改后的Session

            res.redirect('/account');
        });  
    }
    else{
        //用户信息不符合，登陆失败
    }
}

exports.signout = function(req, res){
    req.clearCookie('connect.sid');
    req.user = null;

    req.session.regenerate(function(){
        //重新生成session之后后续的处理
        res.redirect('/signin');
    })
}

exports.persist = function(req, res, next){
    var userId = req.session.userId;

    //通过user id去数据库里面查找User对象
    var user = findUserById(userId);

    if(user){
        req.user = user;
        next();
    }
    else{
        //该用户不存在
    }
}
```

这样你的Session就转移到了Redis数据库，这样做的一个额外好处是，当你的Express服务器突然重启后，用户仍然可以使用当前Cookie中的SessionID从数据库中获取到他的会话状态，做到会话不丢失，在一定程度上提高网站的键壮性。


如果你的NodeJS网站上的所有缓存数据都转移到了Redis后，就可做到完全状态无关，按需扩展网站的规模。


### Session的安全问题

SessionId就如同请求者的身份证，一旦被攻击者恶意获得，攻击者便可以伪装成请求者对服务器发起请求，也就是我们经常听到的会话劫持(Session/Cookie Hijack)

暴力破解SessionId
恶意植入固定SessionId

两种可能，因为uid的库基本上可以保证SessionId的随机性；而传递SessionId则依赖HTTP请求头中的Cookie信息而非URL，同时在用户登录立刻更换SessionId。

唯一的可能性来源于Session的监听，而对于这种攻击有效的两种防止办法是：

#### Https

很多网站仅仅在Login的阶段使用Https防止用户的用户名、密码信息被监听者获取，但是随后的SessionId同样有可能被监听者获取而伪造登录者的身份信息。因此更加推荐的方式是所有的信息传递全部使用Https实现，这样即使监听着截获了信息也无法破解其中的内容。关于如何使用NodeJS建立一个HTTPS的server可以参考《HTTPS的原理和NodeJS的实现》 这篇文章
#### httpOnly

Express在options中提供了httpOnly的属性，此属性默认值为true，这个属性保证了Cookie的信息不能够通过JavaScript脚本获取。