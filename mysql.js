/**
 * Created by Administrator on 2016/7/19.
 */
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'zhiwei_blog'
});

var {sendError} = require('./util') 

function query(sql, callback,res) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            if(err){
                console.log(err)
                // sendError(res,err)
            }
            callback(rows);
            connection.release();//释放链接
        });
    });
}

module.exports.query = query