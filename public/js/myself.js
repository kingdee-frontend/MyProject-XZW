var app = angular.module("myApp", []);
app.controller('pageCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
	window.$scope = $scope
	window.$http = $http
	window.$interval = $interval
	$scope.isPage = true;
	$scope.tabPage = function(){
		$scope.isPage = true;
	}
	$scope.tabReply = function(){
		$scope.isPage = false;
	}
	var userId = getUrlParam("id")||userId
	$http.get('/getArticleById?id='+userId).then(function(data){
		$scope.pageList  = data.data.data
	})	
	$http.get('/getCommentById?id='+userId).then(function(data){
		$scope.commentList  = data.data.data
	})

}]);