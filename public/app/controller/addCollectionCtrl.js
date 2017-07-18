.controller('addCollectionController', function($scope, $http, $q) {

		$scope.mangaList = [];
		$scope.checkCall = false;

	$scope.disconnect = function() {
		sessionStorage.mangaToken = undefined;
		sessionStorage.userId = undefined;
		console.log(sessionStorage.mangaToken);
		console.log(sessionStorage.userId);
		$location.path('/login');
		console.log("disconnected");
	}

			$http
			.get('http://www.mangaeden.com/api/list/0/')
			.success(function(data) {
				for (var i = 20 - 1; i >= 0; i--) {
					$scope.mangaList.push(data.manga[i]);
				 }
				$scope.checkCall = true;
				 console.log($scope.mangaList[0]);
	  	})
			.error(function(error) {
	      alert('ERROR');
	      console.log(error);
	  	});

	  	$scope.addManga = function(mangaIndex, item) {
	  		console.log("mangaIndex vaut  : ", mangaIndex);
	  		$http
	  		.post("/api/users/" + sessionStorage.userId, { mangaId : mangaIndex})
	  		.success(function(data) {
	  			console.log("succes : ", data);
	  			sessionStorage.setItem('mangaList', data);

	  			//if success, we need to delete items to avoid same manga in the mangaList
	  			console.log(item);
  					$scope.mangaList.splice(item, 1);  

	  		})
	  		.error(function(error) {
	  			console.log('ERROR      : ', error);
	  		})
	  	}
		
})