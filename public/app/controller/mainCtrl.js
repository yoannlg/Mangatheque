.controller('mainController', function($scope, $http) {

	$scope.callApi = {}
	$scope.displayManga = [];
	$scope.order = "title";

	var getInformation = function(i){
		$http
	  .get("http://www.mangaeden.com/api/manga/" + $scope.callApi[i].id + "/")
	  .success(function(dataManga) {
	    $scope.displayManga[i] = dataManga;
	  })
	  .error(function(data){
	  	console.log('Fail call mangaEdenApi');
	  })
	}

	// var addChapter = function(chapterLength) {
	// 	$http
	//   		.post("/api/users/" + sessionStorage.userId + "/chapter", {chapter : chapterLength})
	//   		.success(function(data) {
	//   			console.log("succes : ", data);
	//   		})
	//   		.error(function(error) {
	//   			console.log('ERROR      : ', error);
	//   		})
	// }

	// var removeChapter = function() {

	// }

  $http
	.get("/api/users/" + sessionStorage.userId)
	.success(function(data) {
		for (var i = data.length - 1; i >= 0; i--) {
			$scope.callApi = data;
		}
		for (var i = 0; i < $scope.callApi.length; i++) {
		  getInformation(i);
		}
		console.dir($scope.displayManga);
	})
	.error(function(error) {
		console.log("error :   ",error)
	})

})