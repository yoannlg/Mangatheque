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
		
		// register page
		.when('/inscription', {
			templateUrl : 'app/views/pages/register.html',
			//controller  : 'mainController',
			//controllerAs: 'register'
		})
		.otherwise({redirectTo: '/'});

});



//angular.module('app.routes', ['ngRoute' 'restangular'])



