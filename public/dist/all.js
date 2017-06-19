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
        	$location.path('/home')
	    	})
				.error(function(error) {
	        alert('Inscription non effectuée')
	        console.log(error)
	    	});

			}
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
			templateUrl : 'app/views/login.html'
			//controller: "", 
			//controlelrAs: ''
		})
		.when('/home', {
			templateUrl:'app/views/home.html'
		})
		.when('/home/add-collection', {
			templateUrl: 'app/views/addCollection.html'
		})
		.when('/signup', {
			templateUrl: 'app/views/signup.html',
			controller: 'signupController'
			// controllerAs: 'signupCtrl'
		})
	
		.otherwise({redirectTo: '/'})
});



//angular.module('app.routes', ['ngRoute' 'restangular'])

