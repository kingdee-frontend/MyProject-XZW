var express = require('express')
var app = express()
var ejs = require('ejs')
var mysql = require('./mysql')

app.get('/', function(req, res) {
  res.render('index', {});
});

app.get('/index', function(req, res) {
    mysql.query('select * from user',function(err,rows){
        res.render('index', {data:rows});
    })
});

app.get('/myself.html', function(req, res) {
  res.render('myself', {});
});

app.get('/page.html', function(req, res) {
  res.render('page', {});
});

app.get('/signup.html', function(req, res) {
  res.render('sign-up', {});
});



app.set('views', __dirname + '/view');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');




app.use(express.static('public'));

var server = app.listen(9999, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})