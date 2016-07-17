# 连接数据库

## 数据库的分类
1. 关系型数据库 MySql
3. 非关系型数据库 Redis MongoDB

### 不同数据库的差异

MySQL与MongoDB都是开源的常用数据库，但是MySQL是传统的关系型数据库，MongoDB则是非关系型数据库。
复杂关系类型选用MySql
简单数据结构选用MongoDB
MongoDB在相同数据量下性能更好，但对复杂关系的数据处理能力会很差。
redis作为内存数据库，更多使用场景是用作缓存。

### 数据库搭建

#### mysql 安装 使用

<a href="http://www.cnblogs.com/qiyebao/p/3887055.html" target="_blank">window mysql 安装</a>
<a href="http://www.cnblogs.com/macro-cheng/archive/2011/10/25/mysql-001.html" target="_blank">mac mysql 安装</a>
<a href="http://www.sequelpro.com/" target="_blank">客户端工具 sequel pro</a>

##### 关系型数据库的基本概念

数据库,从名字上来讲就是一个用来放数据的库,
表嘛.就是你平常在生活中的表一样,比如excel的表一样
列嘛,也就是字段,就是一行东西只能放一种类型的数据,
行嘛,一行也就是记录,放着每个字段(列)对应的值

##### 基本语法

1. 说明：创建数据库 

  Create DATABASE database-name 

2. 说明：删除数据库 

  drop database dbname 

3. 说明：备份sql server 

  --- 创建 备份数据的 device 

  USE master 

  EXEC sp_addumpdevice 'disk', 'testBack', 'c:\mssql7backup\MyNwind_1.dat' 

  --- 开始 备份 

  BACKUP DATABASE pubs TO testBack 

4. 说明：创建新表 
  
  create table tabname(col1 type1 [not null] [primary key],col2 type2 [not null],..) 

  根据已有的表创建新表： 

  A：create table tab_new like tab_old (使用旧表创建新表) 
  
  B：create table tab_new as select col1,col2… from tab_old definition only 

5. 说明：删除新表 

  drop table tabname 

6. 说明：增加一个列 

  Alter table tabname add column col type 

  注：列增加后将不能删除。DB2中列加上后数据类型也不能改变，唯一能改变的是增加varchar类型 
的长度。 

7. 说明：添加主键： Alter table tabname add primary key(col) 

  说明：删除主键： Alter table tabname drop primary key(col) 

8. 说明：创建索引：create [unique] index idxname on tabname(col….) 

  删除索引：drop index idxname 

  注：索引是不可更改的，想更改必须删除重新建。 

9. 说明：创建视图：create view viewname as select statement 

  删除视图：drop view viewname 

10. 说明：几个简单的基本的sql语句 

  选择：select * from table1 where 范围 

  插入：insert into table1(field1,field2) values(value1,value2) 

  删除：delete from table1 where 范围 

  更新：update table1 set field1=value1 where 范围 

  查找：select * from table1 where field1 like '%value1%' ---like的语法很精妙，查资料! 

  排序：select * from table1 order by field1,field2 [desc] 

  总数：select count as totalcount from table1 

  求和：select sum(field1) as sumvalue from table1 
  
  平均：select avg(field1) as avgvalue from table1 

  最大：select max(field1) as maxvalue from table1 

  最小：select min(field1) as minvalue from table1 

11. 说明：几个高级查询运算词 

  A： UNION 运算符 

  UNION 运算符通过组合其他两个结果表（例如 TABLE1 和 TABLE2）并消去表中任何重复行而派生 

  出一个结果表。当 ALL 随 UNION 一起使用时（即 UNION ALL），不消除重复行。两种情况下，派 
生表的每一行不是来自 TABLE1 就是来自 TABLE2。 

  B： EXCEPT 运算符 

  EXCEPT 运算符通过包括所有在 TABLE1 中但不在 TABLE2 中的行并消除所有重复行而派生出一个 
结果表。当 ALL 随 EXCEPT 一起使用时 (EXCEPT ALL)，不消除重复行。 
  
  C： INTERSECT 运算符 

  INTERSECT 运算符通过只包括 TABLE1 和 TABLE2 中都有的行并消除所有重复行而派生出一个结果 
表。当 ALL 随 INTERSECT 一起使用时 (INTERSECT ALL)，不消除重复行。 

  注：使用运算词的几个查询结果行必须是一致的。 

12. 说明：使用外连接 

  A、left outer join： 

  左外连接（左连接）：结果集几包括连接表的匹配行，也包括左连接表的所有行。 

  sql: select a.a, a.b, a.c, b.c, b.d, b.f from a LEFT OUT JOIN b ON a.a = b.c 

  B：right outer join: 

  右外连接(右连接)：结果集既包括连接表的匹配连接行，也包括右连接表的所有行。 

  C：full outer join： 

  全外连接：不仅包括符号连接表的匹配行，还包括两个连接表中的所有记录。 

13. 说明：复制表(只复制结构,源表名：a 新表名：b) (Access可用) 

  法一：select * into b from a where 1<>1 

  法二：select top 0 * into b from a 

14. 说明：拷贝表(拷贝数据,源表名：a 目标表名：b) (Access可用) 

  insert into b(a, b, c) select d,e,f from b; 

15. 说明：跨数据库之间表的拷贝(具体数据使用绝对路径) (Access可用) 

  insert into b(a, b, c) select d,e,f from b in ‘具体数据库' where 条件 

  例子：..from b in '"&Server.MapPath(".")&"\data.mdb" &"' where.. 

16. 说明：子查询(表名1：a 表名2：b) 

  select a,b,c from a where a IN (select d from b ) 或者: select a,b,c from a where a IN 
(1,2,3) 

17. 说明：显示文章、提交人和最后回复时间 

  select a.title,a.username,b.adddate from table a,(select max(adddate) adddate from 
table where table.title=a.title) b 

18. 说明：外连接查询(表名1：a 表名2：b) 

  select a.a, a.b, a.c, b.c, b.d, b.f from a LEFT OUT JOIN b ON a.a = b.c 

19. 说明：在线视图查询(表名1：a ) 

  select * from (Select a,b,c FROM a) T where t.a > 1; 

20. 说明：between的用法,between限制查询数据范围时包括了边界值,not between不包括 

  select * from table1 where time between time1 and time2 

  select a,b,c, from table1 where a not between 数值1 and 数值2 

21. 说明：in 的使用方法 

  select * from table1 where a [not] in (‘值1','值2','值4','值6') 

22. 说明：两张关联表，删除主表中已经在副表中没有的信息 

  delete from table1 where not exists ( select * from table2 where 
table1.field1=table2.field1 ) 

23. 说明：四表联查问题： 

  select * from a left inner join b on a.a=b.b right inner join c on a.a=c.c inner join 
d on a.a=d.d where ..... 

24. 说明：日程安排提前五分钟提醒 

  sql: select * from 日程安排 where datediff('minute',f开始时间,getdate())>5 

25. 说明：一条sql 语句搞定数据库分页 

  select top 10 b.* from (select top 20 主键字段,排序字段 from 表名 order by 排序字段 
desc) a,表名 b where b.主键字段 = a.主键字段 order by a.排序字段 

26. 说明：前10条记录 

  select top 10 * form table1 where 范围 

27. 说明：选择在每一组b值相同的数据中对应的a最大的记录的所有信息(类似这样的用法可以用 
于论坛每月排行榜,每月热销产品分析,按科目成绩排名,等等.) 

  select a,b,c from tablename ta where a=(select max(a) from tablename tb where 
tb.b=ta.b) 

28. 说明：包括所有在 TableA 中但不在 TableB和TableC 中的行并消除所有重复行而派生出一个 
结果表 

  (select a from tableA ) except (select a from tableB) except (select a from tableC) 

29. 说明：随机取出10条数据 

  select top 10 * from tablename order by newid() 

30. 说明：随机选择记录 

  select newid() 

31. 说明：删除重复记录 

  Delete from tablename where id not in (select max(id) from tablename group by 
col1,col2,...) 

32. 说明：列出数据库里所有的表名 

  select name from sysobjects where type='U' 

33. 说明：列出表里的所有的 

  select name from syscolumns where id=object_id('TableName') 

34. 说明：选择从10到15的记录 
select top 5 * from (select top 15 * from table order by id asc) table_别名 order by 
id desc 

##### nodejs 与 mysql

安装mysql连接module，npm install mysql

##### 普通连接方式
```javascript 
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'secret',
  database : 'my_db'
});

connection.connect();

connection.query('select  * from solution', function(err, rows, fields) {
  if (err) throw err;
    console.log('The solution is: ', rows);
});

connection.end();
```

##### 连接池
```javascript
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'example.org',
  user            : 'bob',
  password    : 'secret'
});

pool.query('select  * from solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows);
});
```


#### redis 安装 使用

brew redis


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


6. 设置key对应的值为string类型的value，并指定此键值对应的有效期。

   redis 127.0.0.1:6379> setex haircolor 10 red

　　OK

　　redis 127.0.0.1:6379> get haircolor

　　"red"

　　redis 127.0.0.1:6379> get haircolor

　　(nil)


7. 一次设置多个key的值，成功返回ok表示所有的值都设置了，失败返回0表示没有任何值被设置。

   redis 127.0.0.1:6379> mset key1 HongWan1 key2 HongWan2

　　OK

　　redis 127.0.0.1:6379> get key1

　　"HongWan1"

　　redis 127.0.0.1:6379> get key2

　　"HongWan2"

　　
8. 一次设置多个key的值，成功返回ok表示所有的值都设置了，失败返回0表示没有任何值被设置，但是不会覆盖已经存在的key。

   redis 127.0.0.1:6379> get key1

　　"HongWan1"

　　redis 127.0.0.1:6379> get key2

　　"HongWan2"

　　redis 127.0.0.1:6379> msetnx key2 HongWan2_new key3 HongWan3

　　(integer) 0

　　redis 127.0.0.1:6379> get key2

　　"HongWan2"

　　redis 127.0.0.1:6379> get key3

　　(nil)

　　可以看出如果这条命令返回0，那么里面操作都会回滚，都不会被执行。


9. 获取key对应的string值,如果key不存在返回nil。例如我们获取一个库中存在的键name，可以很快得到它对应的value　

   redis 127.0.0.1:6379> get name

　　"HongWan"

　　redis 127.0.0.1:6379>

　　我们获取一个库中不存在的键name1，那么它会返回一个nil以表时无此键值对

   redis 127.0.0.1:6379> get name1

　　(nil)



10. 设置key的值，并返回key的旧值。
   
   redis 127.0.0.1:6379> get name
　　
  "HongWan"

　　redis 127.0.0.1:6379> getset name HongWan_new

　　"HongWan"

　　redis 127.0.0.1:6379> get name

　　"HongWan_new"

　　redis 127.0.0.1:6379>

　　接下来我们看一下如果key不存的时候会什么样儿?

   redis 127.0.0.1:6379> getset name1 aaa

　　(nil)

　　redis 127.0.0.1:6379>

　　可见，如果key不存在，那么将返回nil


11. 获取指定key的value值的子字符串。

　 redis 127.0.0.1:6379> get name

　　"HongWan@126.com"

　　redis 127.0.0.1:6379> getrange name 0 6

　　"HongWan"

　　redis 127.0.0.1:6379>

　　字符串左面下标是从0开始的

   redis 127.0.0.1:6379> getrange name -7 -1

　　"126.com"

　　redis 127.0.0.1:6379>

　　字符串右面下标是从-1开始的　

   redis 127.0.0.1:6379> getrange name 7 100

　　"@126.com"

　　redis 127.0.0.1:6379>

　　当下标超出字符串长度时，将默认为是同方向的最大下标

12. 一次获取多个key的值，如果对应key不存在，则对应返回nil。

　  redis 127.0.0.1:6379> mget key1 key2 key3

　　1) "HongWan1"

　　2) "HongWan2"

　　3) (nil)

　　redis 127.0.0.1:6379>

　　key3由于没有这个键定义，所以返回nil。

13. 对key的值做加加操作,并返回新的值。注意incr一个不是int的value会返回错误，incr一个不存在的key，则设置key为1

　  redis 127.0.0.1:6379> set age 20

　　 OK

　　redis 127.0.0.1:6379> incr age

　　(integer) 21

　　redis 127.0.0.1:6379> get age

　　"21"

　　redis 127.0.0.1:6379>
 
14. 同incr类似，加指定值 ，key不存在时候会设置key，并认为原来的value是 0
  
    redis 127.0.0.1:6379> get age
　
　"21"

　　redis 127.0.0.1:6379> incrby age 5

　　(integer) 26

　　redis 127.0.0.1:6379> get name

　　"HongWan@gmail.com"

　　redis 127.0.0.1:6379> get age

　　"26"

　　redis 127.0.0.1:6379>

15. append 给指定key的字符串值追加value,返回新字符串值的长度。例如我们向name的值追加一个@126.com字符串，那么可以这样做:　

  redis 127.0.0.1:6379> append name @126.com

　　(integer) 15

　　redis 127.0.0.1:6379> get name

　　"HongWan@126.com"

　　redis 127.0.0.1:6379>

16. strlen  取指定key的value值的长度。


  redis 127.0.0.1:6379> get name　　"HongWan_new"　　

  redis 127.0.0.1:6379> strlen name　　

  (integer) 11　　

  redis 127.0.0.1:6379> get age　　"15"　

  　redis 127.0.0.1:6379> strlen age　　(integer) 2　　
  
  　redis 127.0.0.1:6379>

17. 设置hash field为指定值，如果key不存在，则先创建。

   redis 127.0.0.1:6379> hset myhash field1 Hello

　　(integer) 1

　　redis 127.0.0.1:6379>

18.　设置hash field为指定值，如果key不存在，则先创建。如果field已经存在，返回0，nx是not exist的意思。　

    redis 127.0.0.1:6379> hsetnx myhash field "Hello"

　　(integer) 1

　　redis 127.0.0.1:6379> hsetnx myhash field "Hello"

　　(integer) 0

　　redis 127.0.0.1:6379>

　　第一次执行是成功的，但第二次执行相同的命令失败，原因是field已经存在了。


19. 同时设置hash的多个field。

   redis 127.0.0.1:6379> hmset myhash field1 Hello field2 World

　　OK

　　redis 127.0.0.1:6379>

20. 获取指定的hash field。

    redis 127.0.0.1:6379> hget myhash field1

　　"Hello"

　　redis 127.0.0.1:6379> hget myhash field2

　　"World"

　　redis 127.0.0.1:6379> hget myhash field3

　　(nil)

　　redis 127.0.0.1:6379>

　　由于数据库没有field3，所以取到的是一个空值nil。


21. 获取全部指定的hash filed。　

   redis 127.0.0.1:6379> hmget myhash field1 field2 field3

　　1) "Hello"

　　2) "World"

　　3) (nil)

　　redis 127.0.0.1:6379>

　　由于数据库没有field3，所以取到的是一个空值nil。

22. 指定的hash filed 加上给定值。

    redis 127.0.0.1:6379> hset myhash field3 20

　　(integer) 1

　　redis 127.0.0.1:6379> hget myhash field3

　　"20"

　　redis 127.0.0.1:6379> hincrby myhash field3 -8

　　(integer) 12

　　redis 127.0.0.1:6379> hget myhash field3

　　"12"

　　redis 127.0.0.1:6379>

　　在本例中我们将field3的值从20降到了12，即做了一个减8的操作。

23. 测试指定field是否存在。

    redis 127.0.0.1:6379> hexists myhash field1

　　(integer) 1

　　redis 127.0.0.1:6379> hexists myhash field9

　　(integer) 0

　　redis 127.0.0.1:6379>

　　通过上例可以说明field1存在，但field9是不存在的。

24. 返回指定hash的field数量。

    redis 127.0.0.1:6379> hlen myhash

　　(integer) 4

　　redis 127.0.0.1:6379>

　　通过上例可以看到myhash中有4个field。

25. 返回指定hash的field数量。

    redis 127.0.0.1:6379> hlen myhash

　　(integer) 4

　　redis 127.0.0.1:6379> hdel myhash field1

　　(integer) 1

　　redis 127.0.0.1:6379> hlen myhash

　　(integer) 3

　　redis 127.0.0.1:6379>

26. 返回hash的所有field。

    redis 127.0.0.1:6379> hkeys myhash

　　1) "field2"

　　2) "field"

　　3) "field3"

　　redis 127.0.0.1:6379>

　　说明这个hash中有3个field。
　　
27. 返回hash的所有value。

    redis 127.0.0.1:6379> hvals myhash

　　1) "World"

　　2) "Hello"

　　3) "12"

　　redis 127.0.0.1:6379>

　　说明这个hash中有3个field。

28. 获取某个hash中全部的filed及value。

　redis 127.0.0.1:6379> hgetall myhash

　　1) "field2"

　　2) "World"

　　3) "field"

　　4) "Hello"

　　5) "field3"

　　6) "12"

　　redis 127.0.0.1:6379>

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