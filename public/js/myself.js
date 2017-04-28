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
	$http.get('/getArticle').then(function(data){
		$scope.pageList  = data.data.data
	})	
}]);