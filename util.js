var isValidate = function(data){
    for(var i in data){
        if(typeof data=='undefined')return false
    }
    return true
}

var sendError = function(res,err){
    return sendMessage(res,{msg:err,code:0,err:err})
}
var sendSuccess = function(res,msg){
    return sendMessage(res,{msg:msg,code:200})
}
var sendMessage = function(res,data){
    var msg = Object.assign({},data)
    return res.json(msg)
}

var islogin = function(req,res){
    if(req.session.userId>0)return req.session.userId
    sendError(res,"请先登录")
    return false
}

module.exports.isValidate = isValidate
module.exports.sendError = sendError
module.exports.sendSuccess = sendSuccess
module.exports.sendMessage = sendMessage
module.exports.islogin = islogin