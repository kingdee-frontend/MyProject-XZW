var app = angular.module("myApp", []);
app.controller('pageCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
	$scope.isError = false;
	$scope.isDif = false;
	$scope.warnOn = function(){
		var len = $scope.myValue.length;
		if(len>16){
			$scope.isError = true;
			$scope.isLong = true;
		}else{
			$scope.isError = false;
			$scope.isLong = false;
		}
	}
}]);