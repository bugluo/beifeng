# 连接数据库

## 数据库的分类
1. 关系型数据库 MySql oracle db2
2. KV数据库 Redis memcached
3. 非关系型数据库 MongoDB

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

##### 实例演练
```javascript
用户登陆
var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');
var app = express();

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : '127.0.0.1',
  user            : 'root',
  password    : ''
});


注册
app.get('/register', function (req, res) {
  var username = req.query.username;
  var password = md5(req.query.password);
  pool.query('insert into user(username,password) values('+ username +','+ password +') ', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows);
  });
});

登陆
app.get('/login', function (req, res) {
  pool.query('select  * from user', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows, fields);
  });
}); 

```