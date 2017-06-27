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
				localStorage.setItem('mangaToken', data.token);
	    	$location.path('/home')
	    	console.log("test : ",localStorage.mangaToken);
	  	})
			.error(function(error) {
	      alert('Inscription non effectuée')
	      console.log(error)
	  	});

		}
})