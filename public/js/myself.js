var app = angular.module("myApp", []);
app.controller('pageCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
	window.$scope = $scope
	window.$http = $http
	window.$interval = $interval	
}]);