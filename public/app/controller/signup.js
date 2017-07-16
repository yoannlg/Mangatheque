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
				console.log('Successsssss : ', data.user)
				//save the datas in sessionStorage
				sessionStorage.setItem('mangaToken', data.token);
				sessionStorage.setItem('userId', data.user._id);
	    	$location.path('/home/add-collection')
	    	console.log("test : ", sessionStorage.mangaToken);
	    	console.log("testID : ", sessionStorage.userId);
	    	})
				.error(function(error) {
	        alert('Inscription non effectuée')
	        console.log(error)
	    	});

			}
		}
})