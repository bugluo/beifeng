var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');
var app = express();


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

function hasUser(username,password,func) {
	connection.query('select 1 from user where username=? and password=?',[username,password], function(err, rows, fields) {
		console.log(err,rows,fields);
		if(rows.length == 0){
			func(false);
		}else{
			func(true);
		}
	});
}

app.get('/register', function (req, res) {
	var username = req.query.username;
	var password = md5(req.query.password);

	hasUser(username,password,function(has){
		if(has){
			res.send('error,has one');
		}else{
			connection.query('delete into user(username,password) value (?,?)',[username,password], function(err, rows, fields) {
			  	if (err) throw err;
				res.send('ok');
			});
		}
	})

	
});

app.get('/login', function (req, res) {
	var username = req.query.username;
	var password = md5(req.query.password);
	hasUser(username,password,function(has){
		if(has){
			res.send('login,ok');
			// session
		}else{
			res.send('error,no user');
		}
	})
}); 