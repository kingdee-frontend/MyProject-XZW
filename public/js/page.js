var app = angular.module("myApp",[]);
app.controller('pageCtrl',['$scope','$http',function($scope,$http,$interval){
	window.$scope = $scope
	window.$http = $http
	window.$interval = $interval
	$scope.isFollow = false;
	$scope.isReply = false;
	$scope.isFocus = false;
	$scope.Focus = function(){
		this.isFocus = true;
	}
	$scope.follow=function(){
		$scope.isFollow=true;
	}
	$scope.default=function(){
		$scope.isFollow=false;
	}
	$scope._reply = function(){
		this.isReply = true;
	}
	$scope.cancel = function(){
		this.isReply = false;
		this.isFocus = false;
	}
	$scope.postComment = function(){
		var articleId= location.pathname.match(/page\/(\d+)$/)[1]
		var post = {
			articleId:articleId,
			comment:$('#comment').val()
		}
		console.log(post)
		$.post('/addComment',post,function(data){
			if(data.code==200){
				alert('评论成功')
				window.location.reload()
			}else{
				alert(data.err)
			}
		})
		
	}
	$scope.replyList = []
	$scope.getComment = function(){
		window.$scope = $scope
		var articleId= location.pathname.match(/page\/(\d+)$/)[1]
		$http.get('/comment?articleId='+articleId).then(function(data){
			$scope.replyList = data.data.data
		})
	}
	$scope.getComment()
}]);
