// var app = angular.module("myApp", []);
// app.controller('pageCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
$(function(){
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
	
	
})
	
// }]);