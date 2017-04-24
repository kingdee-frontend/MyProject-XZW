var app = angular.module("myApp", []);
app.controller('pageCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
	//banner图链接
	$scope.lunboList=[{
		pic_url:'/pic/pic1.png'
	},{
		pic_url:'/pic/pic2.png'
	},{
		pic_url:'/pic/pic3.png'
	}];

	//标签
	$scope.tips=[{
			tips_url:'/pic/tip1.png',
			tip_name:'上班这点事儿'
		},{
			tips_url:'/pic/tip1.png',
			tip_name:'上班这点事儿'
		},{
			tips_url:'/pic/tip1.png',
			tip_name:'上班这点事儿'
		},{
			tips_url:'/pic/tip1.png',
			tip_name:'上班这点事儿'
		},{
			tips_url:'/pic/tip1.png',
			tip_name:'上班这点事儿'
		},{
			tips_url:'/pic/tip1.png',
			tip_name:'上班这点事儿'
		},{
			tips_url:'/pic/tip1.png',
			tip_name:'上班这点事儿'}];
	
	//帖子列表数据
	$scope.pageList=[];
	$scope.timer = $interval(function(){
		$scope.next();
	},1500);
	//滑过停止定时器
	$scope.hover_ = function(){
		$interval.cancel($scope.timer);
		$scope.isHover = true;
	}
	$scope.move_ = function(){
		$scope.timer = $interval(function(){
			$scope.next();
		},1500);
		$scope.isHover = false;
	}	
	window.onload=function(){
		var i = 0,mgTop = 0,imgLen = $('.banner>a').length;
		//下一个
		$scope.next = function(){
			var $img = $('.banner>a');
			var $banner = $('.banner2')
			if(i<imgLen-1){
				i++;
				mgTop-=106;
			}else{
				mgTop=0;
				i = 0;
			}
			if(!$img.is(':animated')){
				$img.eq(i).fadeIn(1000).siblings().fadeOut();
			}				
		};
		$scope.prev = function(){
			var $img = $('.banner>a');
			var $banner = $('.banner2')
			if(i>0){
				i--;
			}else{
				i = 2;
			}
			if(!$img.is(':animated')){
				$img.eq(i).stop(true,false).fadeIn(1000).siblings().fadeOut();
			}
		};
		//滚轮事件
		$(window).scroll(function(){
			var s=$(window).scrollTop();
			if(s>328){
				$('.back_top').show();
			}else{
				$('.back_top').hide();
			}
		});
		$('.back_top').on('click',function(){
			console.log(1)
			$('html,body').animate({scrollTop:'0'},200);
		})	
		$http.get('/getArticle').then(function(data){
			$scope.pageList  = data.data.data
		})	
	}

}]);


$('#signIn').on('submit',function(event){
	var postData = {
		username:$(this).find('.username').val(),
		password:$(this).find('.keyword').val(),
	}
	//todo:表单验证
	$.post('/login',postData,function(data){
		if(data.code!=200){
			alert(data.err)
		}else{
			window.location.href="/"
		}
	})

	return false
})
$('#signUp').on('submit',function(event){
	var postData = {
		username:$(this).find('.username').val(),
		password:$(this).find('.keyword').val(),
	}
	//todo:表单验证
	$.post('/register',postData,function(data){
		if(data.code!=200){
			alert(data.err)
		}else{
			alert("注册成功")
			window.location.href="/"
		}
	})

	return false
})