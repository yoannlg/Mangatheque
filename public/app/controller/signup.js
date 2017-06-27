.controller('signupController', function($scope, $http, $location) {
		
		$scope.nickName;
		$scope.password;
		$scope.checkPwd;

		$scope.checkPassword = function() {
			if ($scope.password === $scope.checkPwd) {
				return true;
			}
			else {
				alert('Vous devez avoir saisi le même mot de passe');
				return false
			}
		}

		$scope.setAuth = function() {
			console.log($scope.nickName);
			console.log($scope.password);
			console.log($scope.checkPwd);
			if ($scope.checkPassword()) {
				var auth = {
					name : $scope.nickName,
					password : $scope.password
				};

			$http.post('/api/users', auth)
				.success(function(data) {
				console.log('Success : ', data)
				localStorage.setItem('mangaToken', data.token);
	    	$location.path('/home')
	    	console.log("test : ",localStorage.mangaToken);
	    	})
				.error(function(error) {
	        alert('Inscription non effectuée')
	        console.log(error)
	    	});

			}
		}
})