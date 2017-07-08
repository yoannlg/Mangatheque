//------------------------------------------
// WARNING:::::::::::::::::::::::::::::::::::
// COPIER MAIS PAS AJUSTER AU PROJET MANGATHEQUE!!!!!
//------------------------------------------

angular.module('app', ['ngAnimate', 'app.routes'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	//$httpProvider.interceptors.push('AuthInterceptor');
})

// FORMAT DES FICHIERS CONTROLLERS : 

// .controller('testController', function($scope, $http) {
// 	$scope.toto = 'le code s\'affiche';
// })

// NE PAS OUBLIER DE NE PAS METTRE DE ; A LA FIN DE SON CODE CONTROLLER
// LE FICHIER NE DOIT CONTENIR QUE LE CONTROLLER
// NE PAS OUBLIER D\'AJOUTER LA ROUTE DU CONTROLLER DANS LE GULPFILE.JS

//angular.module('mangatheque', ['restangular'])
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
				// Enregistrer des données dans sessionStorage
				sessionStorage.setItem('mangaToken', data.token);
				sessionStorage.setItem('userId', data.user._id);
	    	$location.path('/home')
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

	  	$scope.addManga = function(mangaIndex) {
	  		console.log("hzuifhzufh       : ", mangaIndex);
	  		$http
	  		.post("/api/users/" + sessionStorage.userId, { mangaId : mangaIndex})
	  		.success(function(data) {
	  			console.log("successssssssssssssssssssssssss : ", data);
	  		})
	  		.error(function(error) {
	  			console.log('ERROR      : ', error);
	  		})
	  	}
		
})
// ------------------------------------------
// WARNING:::::::::::::::::::::::::::::::::::
// ROUTE A REVOIR JUSTE COPIER PAS AJUSTER!
// ------------------------------------------

angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/login.html',
			controller: 'loginController' 
			//controlelrAs: ''
		})
		.when('/home', {
			templateUrl:'app/views/home.html',
			resolve: {
				function($location) {
					if(!sessionStorage.mangaToken && !sessionStorage.userID) {
						alert("vous n'avez pas accès à cette page, connectez-vous");
						$location.path('/login');
					}
					else {
						return true;
					}
				}
			}
		})
		.when('/home/add-collection', {
			templateUrl: 'app/views/addCollection.html',
			controller: 'addCollectionController'
		})
		.when('/signup', {
			templateUrl: 'app/views/signup.html',
			controller: 'signupController'
			// controllerAs: 'signupCtrl'
		})
	
		.otherwise({redirectTo: '/'})
});



//angular.module('app.routes', ['ngRoute' 'restangular'])

