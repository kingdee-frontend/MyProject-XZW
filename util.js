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

module.exports.isValidate = isValidate
module.exports.sendError = sendError
module.exports.sendSuccess = sendSuccess
module.exports.sendMessage = sendMessage