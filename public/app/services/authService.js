angular.module('authService', []);

// ===================================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// ===================================================
// .factory('Auth', function($http, $q, AuthToken) {

// 	// create auth factory object
// 	var authFactory = {};

// 	// log a user in
// 	authFactory.login = function(username, password) {

// 		// return the promise object and its data
// 		return $http.post('/api/authenticate', {
// 			username: username,
// 			password: password
// 		})
// 			.success(function(data) {
// 				AuthToken.setToken(data.token);
//        			return data;
// 			});
// 	};