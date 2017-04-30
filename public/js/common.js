// var app = angular.module("myApp", []);
// app.controller('pageCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}
$(function(){
	try{
		$scope.isSign = false;
		$scope.mouseover_ = function(){
			$scope.isSign = true;
		}
		$scope.mouseout_ = function(){
			$scope.isSign = false;
		}
		$('[type="login"]').each(function(){
			$(this).attr('href',$(this).attr('href')+'?url='+encodeURIComponent(location.href))
		})
	}catch(e){}
	
	
	
})
	
// }]);