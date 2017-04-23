var express = require('express')
var app = express()
var ejs = require('ejs')
var mysql = require('./mysql')
var bodyParser = require('body-parser')
var session = require('express-session')
var { isValidate, sendError, sendSuccess, sendMessage } = require('./util')
app.use(session({
  secret: 'zhiwei', //secret的值建议使用随机字符串
  cookie: { maxAge: 60 * 1000 * 30 } // 过期时间（毫秒）
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', function (req, res) {
  res.render('index', {});
});

app.get('/index', function (req, res) {
  mysql.query('select * from user', function (rows) {
    res.render('index', { data: rows });
  })
});

app.get('/myself.html', function (req, res) {
  res.render('myself', {});
});

app.get('/page.html', function (req, res) {
  res.render('page', {});
});

app.get('/sign-in.html', function (req, res) {
  res.render('sign-in', {});
});

app.get('/sign-up.html', function (req, res) {
  res.render('sign-up', {});
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
                       ( "${post.username}", ${post.password} );`
      mysql.query(sql, function (rows) {
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
  console.log(userQuery)
  mysql.query(userQuery, function (rows) {
    if (rows.length > 0) {
      console.log(rows)
      req.session.userId = rows[0].id
      req.session.username = post.username
      sendSuccess(res, "登陆成功")
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

//伪造首页数据
// app.get('/insert',function(req,res){
//   var data = [{
// 		pic_url:'/pic/page-bg.png',
// 		author_url:'myself.html',
// 		user_pic_url:'/pic/user-pic.png',
// 		user_name:'宇文书',
// 		upload_date:'昨天 11:24',
// 		title:'如何拓宽视野、刷新三观？这些书请你一定记得读',
// 		abstract:'我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。',
// 		collection:'历史',
// 		read_num:'2055',
// 		reply_num:'24',
// 		like_num:'216'
// 	},{
// 		pic_url:'/pic/page-bg.png',
// 		author_url:'myself.html',
// 		user_pic_url:'/pic/user-pic.png',
// 		user_name:'宇文书',
// 		upload_date:'昨天 11:24',
// 		title:'如何拓宽视野、刷新三观？这些书请你一定记得读',
// 		abstract:'我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。',
// 		collection:'历史',
// 		read_num:'2055',
// 		reply_num:'24',
// 		like_num:'216'
// 	},{
// 		pic_url:'/pic/page-bg.png',
// 		author_url:'myself.html',
// 		user_pic_url:'/pic/user-pic.png',
// 		user_name:'宇文书',
// 		upload_date:'昨天 11:24',
// 		title:'如何拓宽视野、刷新三观？这些书请你一定记得读',
// 		abstract:'我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。',
// 		collection:'历史',
// 		read_num:'2055',
// 		reply_num:'24',
// 		like_num:'216'
// 	},{
// 		pic_url:'/pic/page-bg.png',
// 		author_url:'myself.html',
// 		user_pic_url:'/pic/user-pic.png',
// 		user_name:'宇文书',
// 		upload_date:'昨天 11:24',
// 		title:'如何拓宽视野、刷新三观？这些书请你一定记得读',
// 		abstract:'我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。',
// 		collection:'历史',
// 		read_num:'2055',
// 		reply_num:'24',
// 		like_num:'216'
// 	},{
// 		pic_url:'/pic/page-bg.png',
// 		author_url:'myself.html',
// 		user_pic_url:'/pic/user-pic.png',
// 		user_name:'宇文书',
// 		upload_date:'昨天 11:24',
// 		title:'如何拓宽视野、刷新三观？这些书请你一定记得读',
// 		abstract:'我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。',
// 		collection:'旅行·在路上',
// 		read_num:'2055',
// 		reply_num:'24',
// 		like_num:'216'
// 	},{
// 		pic_url:'/pic/page-bg.png',
// 		author_url:'myself.html',
// 		user_pic_url:'/pic/user-pic.png',
// 		user_name:'宇文书',
// 		upload_date:'昨天 11:24',
// 		title:'如何拓宽视野、刷新三观？这些书请你一定记得读',
// 		abstract:'我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。',
// 		collection:'历史',
// 		read_num:'2055',
// 		reply_num:'24',
// 		like_num:'216'
// 	},{
// 		pic_url:'/pic/page-bg.png',
// 		author_url:'myself.html',
// 		user_pic_url:'/pic/user-pic.png',
// 		user_name:'宇文书',
// 		upload_date:'昨天 11:24',
// 		title:'如何拓宽视野、刷新三观？这些书请你一定记得读',
// 		abstract:'我想，这世上的绝大多数人，都不想坐井观天地活一辈子，因为井底之蛙的生活，实在太单调、太无趣、太闷得慌了。视野狭窄、三观陈旧的人，本质上就像井底之蛙。他们很容易被自己欺骗，很容易被这个瞬息万变的新时代所抛弃，因而最终也难以感到快乐。人性是爱自由、爱新奇的。不断地拓宽视野，你的世界就会变得海阔天空。及时地刷新三观，你的思想才能跟上时代的步伐。怎样拓宽视野、刷新三观呢？我认为最好的办法之一是去读书。读那些宏丽的书，读那些独特的书，读那些充满新知与远见的书。因为这些书都是那些视野非常宽广，三观非常不同的人写的。读之，近之，你自然而然也会变成类似的人。我算是一个经验丰富的书虫了。在无涯的书海中，我有幸遇到过不少这样的书。下面就择其尤优者，推荐给诸君，共二十余本。“尤优”有多“优”呢？它们在豆瓣上的得分，没有一本是在8.5以下的。混过豆瓣的人，都清楚：能上8分就已是难得。所以，我接下来推荐的书，不仅与视野、三观这个主题密切相关，而且将是精品中的精品。',
// 		collection:'历史',
// 		read_num:'2055',
// 		reply_num:'24',
// 		like_num:'216'
// 	}]
//   var query = ""
//   var list = []
//   data.forEach(item=>{
//     delete item.user_name
//     delete item.upload_date
//     item.userId = 3
//     var arr = []
//     var result = []
//     for(var i in item){
//       arr.push(i)
//       result.push("'"+item[i]+"'")
//     }
//     query = arr.join(',')
//     var sql = `INSERT INTO article ( ${query} )
//                        VALUES
//                        ( ${result.join(",")});`
//     list.push(new Promise(function(resolve){
//       mysql.query(sql,function(rows){
//         console.log(rows)
//         resolve(1)
//       },res)
//     }))

//   })
//   try{
//   Promise.all(list).then(res.send('ok'))

//   }catch(e){
//     console.log(e)
//   }
//   // res.send('ok')
// })

app.set('views', __dirname + '/view');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');




app.use(express.static('public'));

var server = app.listen(9999, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})