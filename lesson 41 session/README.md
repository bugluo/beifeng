# session

## redis简单手册

#### 下载安装<a href="http://redis.io/download" target="_blank">redis</a>

##### 基本数据结构及操作 <a href="http://www.yiibai.com/redis/redis_quick_guide.html" target="_blank">redis简明教程</a>

###### Strings - 字符串

String 数据结构是简单的 key-value 类型，value 不仅可以是 String，也可以是数字（当数字类型用 Long 可以表示的时候encoding 就是整型，其他都存储在 sdshdr 当做字符串）。使用 Strings 类型，可以完全实现目前 Memcached 的功能，并且效率更高。还可以享受 Redis 的定时持久化（可以选择 RDB 模式或者 AOF 模式），操作日志及 Replication 等功能。

```javascript
redis 127.0.0.1:6379> SET name "yiibai"
OK
redis 127.0.0.1:6379> GET name
"yiibai"
```

###### Hashes - 哈希值

在 Memcached 中，我们经常将一些结构化的信息打包成 hashmap，在客户端序列化后存储为一个字符串的值（一般是 JSON 格式），比如用户的昵称、年龄、性别、积分等。这时候在需要修改其中某一项时，通常需要将字符串（JSON）取出来，然后进行反序列化，修改某一项的值，再序列化成字符串（JSON）存储回去。简单修改一个属性就干这么多事情，消耗必定是很大的，也不适用于一些可能并发操作的场合（比如两个并发的操作都需要修改积分）。而 Redis 的 Hash 结构可以使你像在数据库中 Update 一个属性一样只修改某一项属性值。

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

List 说白了就是链表（redis 使用双端链表实现的 List），相信学过数据结构知识的人都应该能理解其结构。使用 List 结构，我们可以轻松地实现最新消息排行等功能（比如新浪微博的 TimeLine ）。List 的另一个应用就是消息队列，可以利用 List 的 *PUSH 操作，将任务存在 List 中，然后工作线程再用 POP 操作将任务取出进行执行。Redis 还提供了操作 List 中某一段元素的 API，你可以直接查询，删除 List 中某一段的元素。

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

Set 就是一个集合，集合的概念就是一堆不重复值的组合。利用 Redis 提供的 Set 数据结构，可以存储一些集合性的数据。比如在微博应用中，可以将一个用户所有的关注人存在一个集合中，将其所有粉丝存在一个集合。因为 Redis 非常人性化的为集合提供了求交集、并集、差集等操作，那么就可以非常方便的实现如共同关注、共同喜好、二度好友等功能，对上面的所有集合操作，你还可以使用不同的命令选择将结果返回给客户端还是存集到一个新的集合中。

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

和Sets相比，Sorted Sets是将 Set 中的元素增加了一个权重参数 score，使得集合中的元素能够按 score 进行有序排列，比如一个存储全班同学成绩的 Sorted Sets，其集合 value 可以是同学的学号，而 score 就可以是其考试得分，这样在数据插入集合的时候，就已经进行了天然的排序。另外还可以用 Sorted Sets 来做带权重的队列，比如普通消息的 score 为1，重要消息的 score 为2，然后工作线程可以选择按 score 的倒序来获取工作任务。让重要的任务优先执行。

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

Pub/Sub 从字面上理解就是发布（Publish）与订阅（Subscribe），在 Redis 中，你可以设定对某一个 key 值进行消息发布及消息订阅，当一个 key 值上进行了消息发布后，所有订阅它的客户端都会收到相应的消息。这一功能最明显的用法就是用作实时消息系统，比如普通的即时聊天，群聊等功能。

###### 事务

谁说 NoSQL 都不支持事务，虽然 Redis 的 Transactions 提供的并不是严格的 ACID 的事务（比如一串用 EXEC 提交执行的命令，在执行中服务器宕机，那么会有一部分命令执行了，剩下的没执行），但是这个 Transactions 还是提供了基本的命令打包执行的功能（在服务器不出问题的情况下，可以保证一连串的命令是顺序在一起执行的，中间有会有其它客户端命令插进来执行）。Redis 还提供了一个 Watch 功能，你可以对一个 key 进行 Watch，然后再执行 Transactions，在这过程中，如果这个 Watched 的值进行了修改，那么这个 Transactions 会发现并拒绝执行。

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