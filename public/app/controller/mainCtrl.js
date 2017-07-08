.controller('mainController', function($scope, $http) {

	$scope.callApi = {}
	$scope.displayManga = {};

	var getInformation = function(i){
		$http
	  .get("http://www.mangaeden.com/api/manga/" + $scope.callApi[i].id + "/")
	  .success(function(dataManga) {
	    $scope.displayManga[i] = dataManga;
	    console.log('displayManga : ', $scope.displayManga);
	  })
	  .error(function(data){
	  	console.log('Fail call mangaEdenApi');
	  })
	}

  $http
	.get("/api/users/" + sessionStorage.userId)
	.success(function(data) {
		console.log('success call mangaList : ', data);
		for (var i = data.length - 1; i >= 0; i--) {
			$scope.callApi = data;
		}
		for (var i = 0; i < $scope.callApi.length; i++) {
		  getInformation(i);
		}
		console.log('test : ', $scope.callApi);
	})
	.error(function(error) {
		console.log("error :   ",error)
	})

})