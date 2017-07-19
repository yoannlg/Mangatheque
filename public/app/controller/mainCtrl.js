.controller('mainController', function($scope, $http, $location) {

	$scope.callApi = {}
	$scope.displayManga = [];
	$scope.order = "title";
	$scope.displayChapterLength;
	$scope.query = '';

	var getInformation = function(i){
		$http
	  .get("http://www.mangaeden.com/api/manga/" + $scope.displayManga[i].id + "/")
	  .success(function(dataManga) {
	  	$scope.displayManga[i].details = dataManga;
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
			$scope.displayManga = data;
		for (var i = 0; i < $scope.displayManga.length; i++) {
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

	$scope.addChapter = function(index) {
				$http
	  		.post("/api/users/" + sessionStorage.userId + "/chapter", {chapter : +1,
	  																															mangaId: $scope.displayManga[index].id})
	  		.success(function(data) {
	  			console.log("success : ", data);
	  			$scope.displayManga[index].chapter = data.mangaList[index].chapter;
	  		})
	  		.error(function(error) {
	  			console.log('ERROR      : ', error);
	  		})
	}

	$scope.removeChapter = function(index) {
				$http
	  		.post("/api/users/" + sessionStorage.userId + "/chapter", {chapter : -1,
	  																															mangaId: $scope.displayManga[index].id})
	  		.success(function(data) {
	  			console.log("success : ", data);
	  			$scope.displayManga[index].chapter = data.mangaList[index].chapter;
	  		})
	  		.error(function(error) {
	  			console.log('ERROR      : ', error);
	  		})
	}

})