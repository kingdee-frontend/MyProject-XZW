var express = require('express')
var app = express()
var ejs = require('ejs')
var mysql = require('./mysql')
var bodyParser = require('body-parser')
var session = require('express-session')
var ueditor = require("ueditor")
var path = require('path')
var { isValidate, sendError, sendSuccess, sendMessage } = require('./util')
app.use(session({
  secret: 'zhiwei', //secret的值建议使用随机字符串
  cookie: { maxAge: 60 * 1000 * 30 } // 过期时间（毫秒）
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', function (req, res) {
    console.log({ session: req.session })
    res.render('index', { session: req.session });
});

app.get('/index.html', function (req, res) {
    console.log({ session: req.session })
    res.render('index', { session: req.session });
});

app.get('/myself.html', function (req, res) {
  res.render('myself', { session: req.session });
});

app.get('/page/:id', function (req, res) {
  var id = parseInt(req.params.id)
  console.log(id)
  if(!(id>0)){
    sendError(res,"缺少文章参数")
  }else{
    var sql = `SELECT
article.*
FROM
article
WHERE id = "${id}"
LIMIT 1`
  mysql.query(sql, function (rows) {
    if (rows.length > 0) {
        res.render('page', { session: req.session,data:rows[0] });
    }else{
      sendError(res,"没有找到数据")
    }
  }, res)
  }
  console.log(req.params.id)
});

app.get('/sign-in.html', function (req, res) {
  res.render('sign-in', { session: req.session });
});

app.get('/editor.html', function (req, res) {
  res.render('edit', { session: req.session });
});

app.get('/sign-up.html', function (req, res) {
  res.render('sign-up', { session: req.session });
});

//注册用户
app.post('/register', function (req, res) {
  var body = req.body
  var post = {
    username: body.username,
    password: body.password
  }
  if (!isValidate(post)) sendError(res, '缺少用户名或者密码')
  var userQuery = `Select 'id' from user where username = "${post.username}"`
  mysql.query(userQuery, function (rows) {
    console.log(rows)
    if (rows.length > 0) {
      sendError(res, '该用户已经注册')
    } else {
      var sql = `INSERT INTO user ( username, password )
                       VALUES
                       ( "${post.username}", "${post.password}" );`
      console.log(sql)
      mysql.query(sql, function (rows) {
        console.log(rows.insertId)
        req.session.userId = rows.insertId
        req.session.username = post.username
        sendSuccess(res, "注册成功")
      }, res)
    }
  })

})

//是否登陆
app.get('/islogin', function (req, res) {
  var rel = req.session.userId || null
  var name = req.session.username || null
  sendMessage(res, {
    userId: rel,
    name: name
  })
})
//登陆接口
app.post('/login', function (req, res) {
  var body = req.body
  var post = {
    username: body.username,
    password: body.password
  }
  if (!isValidate(post)) sendError(res, '缺少用户名或者密码')
  var userQuery = `Select id from user where username = "${post.username}" and password =  "${post.password}" `
  mysql.query(userQuery, function (rows) {
    if (rows.length > 0) {
      req.session.userId = rows[0].id
      req.session.username = post.username
      sendSuccess(res, "登陆成功")
    }else{
      sendError(res, "账号或者密码错误")
    }
  }, res)
})

//获取首页文章列表
app.get('/getArticle', function (req, res) {
  var sql = `SELECT
article.*
FROM
article
ORDER BY
article.id DESC
LIMIT 10`
  mysql.query(sql, function (rows) {
    if (rows.length > 0) {
      sendMessage(res, { data: rows })
    }
  }, res)
})
//退出登录
app.get('/loginout',function(req,res){
  req.session.userId=0
  req.session.username=""
  res.redirect("/")
})

//获取文章
app.get('/getArticleById',function(req,res){
  var id = parseInt(req.query.id)
  console.log(id)
  if(!(id>0)){
    sendError(res,"缺少文章参数")
  }else{
    var sql = `SELECT
article.*
FROM
article
WHERE id = "${id}"
LIMIT 1`
  mysql.query(sql, function (rows) {
    if (rows.length > 0) {
        sendMessage(res,rows[0])
    }else{
      sendError(res,"没有找到数据")
    }
  }, res)
  }
})


app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
 
  // ueditor 客户发起上传图片请求 
 
  if(req.query.action === 'uploadimage'){
 
    // 这里你可以获得上传图片的信息 
    var foo = req.ueditor;
    // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径） 
    var img_url = 'upload';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做 
  }
  //  客户端发起图片列表请求 
  else if (req.query.action === 'listimage'){
    var dir_url = 'upload'; // 要展示给客户端的文件夹路径 
    res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片 
  }
  // 客户端发起其它请求 
  else {
 
    res.setHeader('Content-Type', 'application/json');
    // 这里填写 ueditor.config.json 这个文件的路径 
    res.redirect('/ueditor/ueditor.config.json')
}}));


app.set('views', __dirname + '/view');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');




app.use(express.static('public'));

var server = app.listen(9999, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})