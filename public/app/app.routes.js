// ------------------------------------------
// WARNING:::::::::::::::::::::::::::::::::::
// ROUTE A REVOIR JUSTE COPIER PAS AJUSTER!
// ------------------------------------------

angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

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
		});

	$locationProvider.html5Mode(true);

});



//angular.module('app.routes', ['ngRoute' 'restangular'])
















