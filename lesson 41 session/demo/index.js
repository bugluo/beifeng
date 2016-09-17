var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');
var app = express();
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

// app.use(cookieParser());

var connection = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'test',
  connectionlimit: 10
});

var options = {
     "host": "127.0.0.1",
     "port": "6379",
     "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天
};

app.use(session({
     store: new RedisStore(options),
     secret: 'qerioqwejroi'
}));


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});


function hasUser(username,func) {
	connection.query('select 1 from user where username=?',[username], function(err, rows, fields) {
		console.log(err,rows,fields);
		if(rows.length == 0){
			func(false);
		}else{
			func(true);
		}
	});
}

app.get('/', function (req, res) {
	var visit = req.cookies;
	console.log(visit);
})

app.get('/register', function (req, res) {
	var username = req.query.username;
	var password = md5(req.query.password);

	hasUser(username,function(has){
		if(has){
			res.send('error,has one');
		}else{
			connection.query('insert into user(username,password) value (?,?)',[username,password], function(err, rows, fields) {
			  	if (err) throw err;
				res.send('ok');
			});
		}
	})

	
});

app.get('/login', function (req, res) {
	var username = req.query.username;
	var password = md5(req.query.password);
	connection.query('select 1 from user where username=? and password=?',[username,password], function(err, rows, fields) {
		if(rows.length == 1){
			req.session.regenerate(function(){
	            req.user = username;
	            req.session.userId = username;
	            req.session.save();  //保存一下修改后的Session
				res.send('session is ok');
	            // res.redirect('/account');
	        });  
			// res.cookie('isVisit', md5(username+password+'321'), {maxAge: 60 * 1000,httpOnly:true});
			// res.redirect('/');
		}else{
			res.send('user or password ,error');
		}
	})
}); 