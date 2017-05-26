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