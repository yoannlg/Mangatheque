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
			templateUrl : 'app/views/pages/login.html'
			//controller: "", 
			//controlelrAs: ''
		})
		.when('/signup', {
			templateUrl: 'app/views/pages/signup/signup.html',
			// controller: 'signupController',
			// controllerAs: 'signupCtrl'
		})
		.otherwise({redirectTo: '/'})
});



//angular.module('app.routes', ['ngRoute' 'restangular'])

