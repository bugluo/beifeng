#### redis 安装 使用

  <a href="http://redis.io/download">redis下载</a>

  或者brew redis

  redis-cli /usr/local/etc/redis.conf

##### redis 基本操作

1. 插入数据
  
  redis 127.0.0.1:6379> set name wwl

  OK

  设置一个key-value对。

2. 查询数据
  
  redis 127.0.0.1:6379> get name
  
  "wwl"
　
  取出key所对应的value。

3. 删除键值　
  
  redis 127.0.0.1:6379> del name

  删除这个key及对应的value。

4. 验证键是否存在
  
  redis 127.0.0.1:6379> exists name
　
　(integer) 0

  其中0，代表此key不存在;1代表存在。

5. 插入数据，如果有就不插入

   redis 127.0.0.1:6379> get name

　　"HongWan"

　　redis 127.0.0.1:6379> setnx name HongWan_new

　　(integer) 0

　　redis 127.0.0.1:6379> get name

　　"HongWan"

##### redis+nodejs 操作

```javascript
npm install redis
```

```javascript
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');
```

```javascript
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');
```

```javascript

client.auth("foobared");

client.set('str', '1', function(){

});

client.select('15', function(error){
    if(error) {
        console.log(error);
    } else {
        // set
        client.set('str_key_0', '0', function(error, res) {
            if(error) {
                console.log(error);
            } else {
                console.log(res);
            }

            // 关闭链接
            client.end();
        });
    }
});
```