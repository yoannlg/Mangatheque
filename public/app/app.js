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
.controller('signupController', function($scope, $http) {
	$scope.toto = 'coucou';
});


//angular.module('mangatheque', ['restangular'])