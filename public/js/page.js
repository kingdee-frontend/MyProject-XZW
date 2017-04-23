var app = angular.module("myApp",[]);
app.controller('pageCtrl',['$scope','$http',function($scope,$http){
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
	$scope.replyList = [{
		txt:'这是一条评论。',
		user_pic:'http://upload.jianshu.io/users/upload_avatars/2963884/fff1fb89babb?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120',
		user_name:'早更',
		displayorder:'1',
		post_date:'2017-4-10'
	},{
		txt:'这是一条评论。',
		user_pic:'http://upload.jianshu.io/users/upload_avatars/2963884/fff1fb89babb?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120',
		user_name:'早更',
		displayorder:'1',
		post_date:'2017-4-10'
	},{
		txt:'这是一条评论。',
		user_pic:'http://upload.jianshu.io/users/upload_avatars/2963884/fff1fb89babb?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120',
		user_name:'早更',
		displayorder:'1',
		post_date:'2017-4-10'
	},{
		txt:'这是一条评论。',
		user_pic:'http://upload.jianshu.io/users/upload_avatars/2963884/fff1fb89babb?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120',
		user_name:'早更',
		displayorder:'1',
		post_date:'2017-4-10'
	},{
		txt:'这是一条评论。',
		user_pic:'http://upload.jianshu.io/users/upload_avatars/2963884/fff1fb89babb?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120',
		user_name:'早更',
		displayorder:'1',
		post_date:'2017-4-10'
	}]
}]);
