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
			templateUrl : 'app/views/login/login.html'
			//controller: "", 
			//controlelrAs: ''
		})

		// .when('/signup', {
		// 	templateUrl: 'app/views/signup/signup.html',
		// 	controller: 'signupController',
		// 	// controllerAs: 'signupCtrl'
		// })

		.when('/home', {
			templateUrl: 'app/views/home/home.html'
		})
		.when('/home/add-collection', {
			templateUrl: 'app/views/addCollection/addCollection.html'
		})

		.otherwise({redirectTo: '/'})
});



//angular.module('app.routes', ['ngRoute' 'restangular'])

