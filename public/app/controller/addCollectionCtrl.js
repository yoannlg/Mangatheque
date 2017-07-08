.controller('addCollectionController', function($scope, $http, $q) {

		$scope.mangaList = [];
		$scope.checkCall = false;

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

	  	function addManga(index) {
	  		console.log(index);
	  		$http
	  		.post('/api/users/' + USER_ID + '/', {manga_id})
	  	}
		
})