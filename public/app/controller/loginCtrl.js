.controller('loginController', function($scope, $http, $location) {
		
	$scope.nickName;
	$scope.password;

	$scope.setAuth = function() {
		console.log("Username : ",$scope.nickName);
		console.log("Password : ",$scope.password);
			var auth = {
				name : $scope.nickName,
				password : $scope.password
			};

		$http.post('/api/authenticate', auth)
			.success(function(data) {
				console.log('Success : ', data.token)
				sessionStorage.setItem('mangaToken', data.token);
				sessionStorage.setItem('userId', data.id);
	    	$location.path('/home/add-collection')
	  	})
			.error(function(error) {
	      alert(error.message)
	  	});
		}
})