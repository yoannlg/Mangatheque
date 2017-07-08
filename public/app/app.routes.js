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
			controller: 'mainController',
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

