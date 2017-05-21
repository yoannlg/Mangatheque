var app = angular.module('app', [])
   .directive('equalsTo', [function () {
       return {
           restrict: 'A', // attribut
           scope: true,
           require: 'ngModel',
           link: function (scope, elem, attrs, control) {
               var check = function () {
               var v1 = scope.$eval(attrs.ngModel); // attrs.ngModel = "ConfirmPassword"
               var v2 = scope.$eval(attrs.equalsTo).$viewValue; // attrs.equalsTo = "Password"
               return v1 == v2;
           };

           scope.$watch(check, function (isValid) {
               // Défini si le champ est valide
               control.$setValidity("equalsTo", isValid);
           });
       }
   }
   .controller('signupController', function($scope, $http) {

   	return {
   		send: send
   	}

   	let dataToSend = {
   		'Email': $scope.Email,
   		'Password': $scope.Password
   	}

   	$scope.send = function() {
   		$http.post(url, dataToSend, config).then(function (response) {
				console.log("SUCCESS : ", response);
			}, function (response) {
				console.log("ERROR : ", response);
			});

   	}

   	$scope.Password;
   	$scope.Email;

   })
}]);
