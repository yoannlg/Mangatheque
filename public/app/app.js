//------------------------------------------
// WARNING:::::::::::::::::::::::::::::::::::
// COPIER MAIS PAS AJUSTER AU PROJET MANGATHEQUE!!!!!
//------------------------------------------

angular.module('userApp', ['ngAnimate', 'app.routes', 'authService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});


//angular.module('mangatheque', ['restangular'])