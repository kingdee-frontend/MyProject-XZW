var app = angular.module("myApp",[]);
app.controller('pageCtrl',['$scope','$http',function($scope,$http){
	$scope.isFollow=false;
	$scope.follow=function(){
		$scope.isFollow=true;
	}
	$scope.default=function(){
		$scope.isFollow=false;
	}
}]);
