# session nodeJS

### 我们为什么要把Session存放到数据中，以及又为什么要在子域名间跨域共享Cookie呢？

## Session与Cookie的关系

客户端与服务会使用一个Sessionid的Cookie值来进行客户端和服务器端会话的匹配，这个Cookie一般是服务器端读/写的，并在Http请求响应的Header中的Set-Cookie属性设置：

HTTP/1.1 200 OK
Server: nginx
Date: Wed, 14 Jan 2015 02:29:09 GMT
Content-Type: text/html
Transfer-Encoding: chunked
Proxy-Connection: Keep-Alive
Connection: Keep-Alive
Content-Encoding: gzip
Set-Cookie: sessionid=i4w3axuzyj4nwwg75y6k5us2; path=/; domain=.ourjs.com; httponly

path=/             表示这个cookie是设置在根目录的。
httponly           属性禁止客户端JavaScript的访问，防止当前会话（sessionid)被恶意的js脚本盗取
domain=.ourjs.com  表示将sessionid存放到主域名下，各个二级域名域名均使用此Cookie (sessionid)

注* 中间代理人攻击，即是通过代理服务器（如无线路由）盗取你的会话Cookie（SessionID等），从而访冒你的身份。因此Google建议网站全部采用HTTPS协议，加密传输内容，并提高了纯HTTPS网站的权重。

使用数据库来集中管理session，存放Session内容，并在各个子域名跨域共享Cookies (SessionID)，即可实现为每一个子域分配一个独立的node.js Web服务器，各个服务程序均可依据sessionid从数据库中寻找到同一Session，从而实现不同Web Server中的会话同步，从而实现一定程度上的负载均衡。

要想实现完全意义的负载均衡还需要将Web服务做到完全状态无关，不仅仅是Session，所有的中间缓存数据都要转移到与服务器无关的缓存层中，这正是Redis最善长的地方。

### 在NodeJS中使用Redis缓存数据

#### node_redis

redis驱动程序多使用 node_redis　此模块可搭载官方的 hiredis C 语言库 － 同样是非阻塞的，比使用JavaScript内置的解释器性能稍好。可选择将hiredis 与 redis 一同安装。

```javascript
npm install hiredis redis
```

如果 hiredis 安装成功, node_redis 会默认使用 hiredis， 否则会使用JavaScript的解释器。

Redis的一个Key不仅可以对应一个String类型的值，还支持hashes, lists, sets, sorted sets, bitmaps等。

比如存/取一组Hash值，Redis中有两个对应的命令 

HMSET key field value [field value ...]、
为一个Key一次设置多个哈希键/值, 多用于JSON对象的写入（序列化的SESSION）。

HGETALL key
读取一个Key的所有 哈希键/值，多用于JSON对象读取

这两个命令即是在NodeJS中存取JSON对象的关键，

下面是node_reids中对应的例子：

```javascript
var redis = require("redis"),
    client = redis.createClient();

//写入JavaScript(JSON)对象
client.hmset('sessionid', { username: 'kris', password: 'password' }, function(err) {
  console.log(err)
})

//读取JavaScript(JSON)对象
client.hgetall('sessionid', function(err, object) {
  console.log(object)
})
```

Redis没有严格意义上的表名和字段名，以　Key-Value　键值对的方式存储，因此一般采用　schema:key　形式做为键值，其中

schema:  可理解为传统数据库中的表名
key: 　　 可理解为表中的主键

因此使用redis存放你的session时，需要一个schema前辍，　比如这个key：　sessionid:i4w3axuzyj4nwwg75y6k5us2

Redis 也仅能对Key进行检索， 尚不支持对Key所存放的Hash Key的检索。 如要检索到所有session，只需匹配 sessionid:*　即可，　

```javascript
client.keys('session:*', function (err, keys) {
  console.log(keys)
})
```

有些第三方库会支持检索值中的Hash Key，但这不是一个原子性操作，redis本身并不提供。 

因此在采用Redis缓存与检索数据时，要使用一些独特的数据类型，如集合（Sets）

```javascript
> sadd myset 1 2 3    //添加 1 2 3到集合myset
(integer) 3
> smembers myset      //列出集合的所有成员
1. 3
2. 1
3. 2
> sismember myset 30  //判断30是否存在
(integer) 0           //不存在
```

Redis集合不允许添加相同成员。多次添加同一元素到集合中最终只会包含一个元素。多个集合之间可以进行连接/交集这样的操作。从而实现类似传统数据库中索引、条件和连接查询的效果。

# 添加 3 个用户和信息
hmset user:1 user_name lee age 21
hmset user:2 user_name david age 25
hmset user:3 user_name chris age 25

# 维护age索引
sadd age:21 1
sadd age:25 2 3

# 维护name索引
sadd name:lee 1
sadd name:david 2
sadd name:chris 3

# 查找  age = 25 和 name = lee 的用户
sinter age:25 name:lee
  -> 会返回一个空集合


将Session存放到Redis中

connect-reids　 是一个 Redis 版的 session　存储器，使用node_redis作为驱动。借助它即可在Express中启用Redis来持久化你的Session.


安装

```javascript
$ npm install connect-redis

在 Express 3.x 中还需要安装express-session 

$ npm install express-session
```

参数

client 你可以复用现有的redis客户端对象， 由 redis.createClient() 创建
host   Redis服务器名
port   Redis服务器端口
socket Redis服务器的unix_socket

可选参数

ttl        Redis session TTL 过期时间 （秒）
disableTTL 禁用设置的 TTL
db         使用第几个数据库
pass       Redis数据库的密码
prefix     数据表前辍即schema, 默认为 "sess:"


使用

将express-session传给connect-redis来启用

```javascript
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

app.use(session({
    store: new RedisStore(options),
    secret: 'keyboard cat'
}));
```

检验
```javascript
app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
})
```

这样你的Session就转移到了Redis数据库，这样做的一个额外好处是，当你的Express服务器突然重启后，用户仍然可以使用当前Cookie中的SessionID从数据库中获取到他的会话状态，做到会话不丢失，在一定程度上提高网站的键壮性。


如果你的NodeJS网站上的所有缓存数据都转移到了Redis后，就可做到完全状态无关，按需扩展网站的规模。