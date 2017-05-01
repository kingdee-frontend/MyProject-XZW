var app = angular.module("myApp", []);
app.controller('pageCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
	window.$scope = $scope
	window.$http = $http
	window.$interval = $interval
	$scope.isPage = true;
	$scope.my = userId==myself
	$scope.tabPage = function(){
		$scope.isPage = true;
	}
	$scope.tabReply = function(){
		$scope.isPage = false;
	}
	var id = getUrlParam("id")||0
	$http.get('/getArticleById?id='+id).then(function(data){
		$scope.pageList  = data.data.data
	})	
	$http.get('/getCommentById?id='+id).then(function(data){
		$scope.commentList  = data.data.data
	})
	$scope.edit = function(id){
		window.open("/editor.html?id="+id)
	}
	$scope.del = function(id){
		var rel = confirm("是否确定删除")
		if(rel){
			$.get('/delArticle?id='+id,function(data){
				if(data.code ==200){
					alert('删除成功')
					window.location.reload()
				}else{
					alert(data.err)
				}
			})
		}
	}
	$scope.delComment = function(id){
		var rel = confirm("是否确定删除")
		if(rel){
			$.get('/delComment?id='+id,function(data){
				if(data.code ==200){
					alert('删除成功')
					window.location.reload()
				}else{
					alert(data.err)
				}
			})
		}
	}
	$scope.changePic = function(){
		if(userId>0&&userId==myself){
			$('#file').click()
		}
	}
	$('#file').on('change',function(e){
		var file = e.currentTarget.files[0]
		var fileReader = new FileReader()
		fileReader.readAsDataURL(file)
		fileReader.onload = function(event){
			var src = event.target.result
			$('#avatar').attr('src',src)
			var form = new FormData()
			form.append('file',src)
			$.post('/uploadPic',{
				file:src
			},function(data){
				if(data.code==200){
					alert('上传成功')
				}else{
					alert('上传失败')
				}
			})
		}
	})
}]);