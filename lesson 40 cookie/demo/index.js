var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

var connection = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'test',
  connectionlimit: 10
});

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
			res.cookie('isVisit', md5(username+password+'321'), {maxAge: 60 * 1000,httpOnly:true});
			res.redirect('/');
		}else{
			res.send('user or password ,error');
		}
	})
}); 