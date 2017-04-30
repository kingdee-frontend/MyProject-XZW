var express = require('express')
var app = express()
var ejs = require('ejs')
var mysql = require('./mysql')
var bodyParser = require('body-parser')
var session = require('express-session')
var ueditor = require("ueditor")
var path = require('path')
var { isValidate, sendError, sendSuccess, sendMessage,islogin } = require('./util')
app.use(session({
  secret: 'zhiwei', //secret的值建议使用随机字符串
  cookie: { maxAge: 60 * 1000 * 30 } // 过期时间（毫秒）
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', function (req, res) {
    res.render('index', { session: req.session });
});

app.get('/index.html', function (req, res) {
    res.render('index', { session: req.session });
});

app.get('/myself.html', function (req, res) {
  var id = parseInt(req.query.id)
  if(!(id>0)){
    sendError(res,"缺少用户id")
    return
  }
  var sql = `Select * from user where id = ${id} Limit 1`
  mysql.query(sql, function (rows) {
    if (rows.length > 0) {
        res.render('myself', { session: req.session,data:rows[0] });
    }else{
      sendError(res,"没有找到该用户")
    }
  }, res)
});

app.get('/page/:id', function (req, res) {
  var id = parseInt(req.params.id)
  if(!(id>0)){
    sendError(res,"缺少文章参数")
  }else{
    var sql = `SELECT
article.*,
user.username
FROM
article
JOIN user
ON article.userId = user.id
WHERE article.id = "${id}"
LIMIT 1`
  mysql.query(sql, function (rows) {
    if (rows.length > 0) {
        res.render('page', { session: req.session,data:rows[0] });
    }else{
      sendError(res,"没有找到数据")
    }
  }, res)
  }
});

app.get('/sign-in.html', function (req, res) {
  res.render('sign-in', { session: req.session });
});

app.get('/editor.html', function (req, res) {
  if(!islogin(req,res))return
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
    if (rows.length > 0) {
      sendError(res, '该用户已经注册')
    } else {
      var sql = `INSERT INTO user ( username, password )
                       VALUES
                       ( "${post.username}", "${post.password}" );`
      mysql.query(sql, function (rows) {
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
article.*,
user.username
FROM
article
JOIN user
ON article.userId = user.id
ORDER BY
article.id DESC
LIMIT 10`
//   var sql = `SELECT
// article.*
// FROM
// article
// ORDER BY
// article.id DESC
// LIMIT 10`
  mysql.query(sql, function (rows) {
    if (rows.length > 0) {
      sendMessage(res, { data: rows })
    }
  }, res)
})

//获取用户中心文章列表
app.get('/getArticleById', function (req, res) {
  var id = parseInt(req.query.id)
  if(!(id>0)){
    sendError(res,"缺少文章参数")
  }else{
    var sql = `SELECT
article.*,
user.username
FROM
article
JOIN user
ON article.userId = user.id
WHERE article.userId = ${id}
ORDER BY
article.id DESC
`
//   var sql = `SELECT
// article.*
// FROM
// article
// ORDER BY
// article.id DESC
// LIMIT 10`
  mysql.query(sql, function (rows) {
    if (rows.length > 0) {
      sendMessage(res, { data: rows })
    }else{
      sendError(res,"没有找到数据")
    }
  }, res)
  }
  
})


//获取用户中心评论列表
app.get('/getCommentById', function (req, res) {
  var id = parseInt(req.query.id)
  if(!(id>0)){
    sendError(res,"缺少文章参数")
  }else{
    var sql = `SELECT
*
FROM
comment
WHERE userId = ${id}
ORDER BY
id DESC
`
  mysql.query(sql, function (rows) {
    if (rows.length > 0) {
      sendMessage(res, { data: rows })
    }else{
      sendError(res,"没有找到数据")
    }
  }, res)
  }
  
})

//退出登录
app.get('/loginout',function(req,res){
  req.session.userId=0
  req.session.username=""
  var url = req.query.url
  if(url){
    url = decodeURIComponent(url)
    res.redirect(url)
  }else{
    res.redirect("/")
  }
  
})

//获取文章
app.get('/getArticleById',function(req,res){
  var id = parseInt(req.query.id)
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
//获取评论
app.get('/comment',function(req,res){
  var articleId = parseInt(req.query.articleId)
  if(!articleId){
    sendError(res,'缺少articleid')
    return 
  }
  var sql = `SELECT
comment.*,
user.username
FROM
comment
JOIN user
ON comment.userId = user.id
WHERE
comment.articleId = ${articleId} ORDER BY comment.id DESC`
  mysql.query(sql, function (rows) {
    sendMessage(res,{data:rows})
  }, res)
})
//评论
app.post('/addComment',function(req,res){
  if(!islogin(req,res))return
  var content  = req.body
  var post = {
    articleId:content.articleId,
    userId:req.session.userId,
    comment:content.comment,
  }
  if(post.articleId&&post.userId&&post.comment){
    var sql  = `INSERT INTO comment ( articleId, userId,comment,time )
                       VALUES
                       ( "${post.articleId}", "${post.userId}",'${post.comment}',${+new Date()});`
    mysql.query(sql, function (rows) {
      if (rows.insertId > 0) {
          sendSuccess(res,"评论成功")
          return
      }else{
        sendError(res,"数据库插入错误"+JSON.stringify(rows))
      }
    }, res)
  }else{
    sendError(res,"缺少参数")
    return 
  }
})


//发布文章
app.post('/article',function(req,res){
  debugger
  if(!islogin(req,res))return 
  var content  = req.body
  console.log(content)
  var post = {
    title:content.title||"",
    collection:content.collection||"",
    content:content.editorValue||"",
    abstract:content.abstract||"",
    pic_url:content.pic_url||"/pic/page-bg.png"
  }
  console.log(post)
  if(post.title&&post.collection&&post.abstract&&post.content){
    post.userId = req.session.userId
    post.upload_date = +new Date()
    var sql = `INSERT INTO article ( upload_date, title,abstract,collection,userId,content,pic_url )
                       VALUES
                       ( "${post.upload_date}", "${post.title}",'${post.abstract}',"${post.collection}","${post.userId}",'${post.content}',"${post.pic_url}" );`

    mysql.query(sql, function (rows) {
      if (rows.insertId > 0) {
          res.redirect("/")
          return
      }else{
        sendError(res,"数据库插入错误")
      }
    }, res)
   }else{
    sendError(res,"缺少参数")
    return 
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