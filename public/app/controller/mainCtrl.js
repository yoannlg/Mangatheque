.controller('mainController', function($scope, $http, $location) {

	$scope.callApi = {}
	$scope.displayManga = [];
	$scope.order = "title";
	$scope.displayChapterLength;
	$scope.query = '';

	var getInformation = function(i){
		$http
	  .get("http://www.mangaeden.com/api/manga/" + $scope.callApi[i].id + "/")
	  .success(function(dataManga) {
	  	dataManga.id = $scope.callApi[i].id;
	    $scope.displayManga[i] = dataManga;
	  })
	  .error(function(data){
	  	console.log('Fail call mangaEdenApi');
	  })
	}

	// call users to catch mangaId collection, and do loop with getInformation()
	// to have one get request per manga for the details
	// and stock this informations in $scope.displayManga array

	$http
	.get("/api/users/" + sessionStorage.userId)
	.success(function(data) {
			$scope.callApi = data;
		for (var i = 0; i < $scope.callApi.length; i++) {
		  getInformation(i);
		}
		console.dir($scope.displayManga);
	})
	.error(function(error) {
		console.log("error :   ",error)
	})


	$scope.disconnect = function() {
		sessionStorage.clear();
		$location.path('/login');
		console.log("disconnected");
	}

	$scope.addChapter = function(mangaId) {
				$http
	  		.post("/api/users/" + sessionStorage.userId + "/chapter", {chapter : +1,
	  																															mangaId: mangaId})
	  		.success(function(data) {
	  			console.log("success : ", data);
	  			$scope.displayChapterLength = data.mangaList;
	  		})
	  		.error(function(error) {
	  			console.log('ERROR      : ', error);
	  		})
	}

	$scope.removeChapter = function(mangaId) {
				$http
	  		.post("/api/users/" + sessionStorage.userId + "/chapter", {chapter : -1,
	  																															mangaId: mangaId})
	  		.success(function(data) {
	  			console.log("success : ", data);
	  			$scope.displayChapterLength = data.mangaList;
	  		})
	  		.error(function(error) {
	  			console.log('ERROR      : ', error);
	  		})
	}

})