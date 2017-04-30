var app = angular.module("myApp", []);
app.controller('pageCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
	window.$scope=$scope
	$scope.warnOn = function(){
		var len = $scope.user.content.length;
		if(len>16){
			$scope.user.long = true;
		}else{
			$scope.user.long = false;
		}
	}
}]);