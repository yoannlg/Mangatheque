angular.module('app', ['ngAnimate', 'app.routes'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

})

// FORMAT DES FICHIERS CONTROLLERS : 

// POUR YOANN
// NE PAS OUBLIER DE NE PAS METTRE DE ; A LA FIN DE SON CODE CONTROLLER
// LE FICHIER NE DOIT CONTENIR QUE LE CONTROLLER
// NE PAS OUBLIER D\'AJOUTER LA ROUTE DU CONTROLLER DANS LE GULPFILE.JS
.controller('signupController', function($scope, $http, $location) {
		
		$scope.nickName;
		$scope.password;
		$scope.checkPwd;

		$scope.checkPassword = function() {
			if ($scope.password === $scope.checkPwd) {
				return true;
			}
			else {
				alert('Vous devez avoir saisi le même mot de passe');
				return false
			}
		}

		$scope.setAuth = function() {
			console.log($scope.nickName);
			console.log($scope.password);
			console.log($scope.checkPwd);
			if ($scope.checkPassword()) {
				var auth = {
					name : $scope.nickName,
					password : $scope.password
				};

			$http.post('/api/users', auth)
				.success(function(data) {
				console.log('Success : ', data.user)
				//save the datas in sessionStorage
				sessionStorage.setItem('mangaToken', data.token);
				sessionStorage.setItem('userId', data.user._id);
	    	$location.path('/home/add-collection')
	    	})
				.error(function(error) {
	        alert('Inscription non effectuée')
	        console.log(error)
	    	});

			}
		}
})
.controller('loginController', function($scope, $http, $location) {
		
	$scope.nickName;
	$scope.password;

	$scope.setAuth = function() {
		console.log("Username : ",$scope.nickName);
		console.log("Password : ",$scope.password);
			var auth = {
				name : $scope.nickName,
				password : $scope.password
			};

		$http.post('/api/authenticate', auth)
			.success(function(data) {
				console.log('Success : ', data.token)
				sessionStorage.setItem('mangaToken', data.token);
				sessionStorage.setItem('userId', data.id);
	    	$location.path('/home/add-collection')
	  	})
			.error(function(error) {
	      alert(error.message)
	  	});
		}
})
.controller('addCollectionController', function($scope, $http, $q) {

		$scope.mangaList = [];
		$scope.checkCall = false;
		$scope.query = '';

	$scope.disconnect = function() {
		sessionStorage.mangaToken = undefined;
		sessionStorage.userId = undefined;
		console.log(sessionStorage.mangaToken);
		console.log(sessionStorage.userId);
		$location.path('/login');
		console.log("disconnected");
	}

			$http
			.get('http://www.mangaeden.com/api/list/0/')
			.success(function(data) {
				for (var i = 20 - 1; i >= 0; i--) {
					$scope.mangaList.push(data.manga[i]);
				 }
				$scope.checkCall = true;
				 console.log($scope.mangaList[0]);
	  	})
			.error(function(error) {
	      alert('ERROR');
	      console.log(error);
	  	});

	  	$scope.addManga = function(mangaIndex, item) {
	  		console.log("mangaIndex vaut  : ", mangaIndex);
	  		$http
	  		.post("/api/users/" + sessionStorage.userId, { mangaId : mangaIndex})
	  		.success(function(data) {
	  			console.log("succes : ", data);
	  			sessionStorage.setItem('mangaList', data);

	  			//if success, we need to delete items to avoid same manga in the mangaList
	  			console.log(item);
  					$scope.mangaList.splice(item, 1);  

	  		})
	  		.error(function(error) {
	  			console.log('ERROR      : ', error);
	  		})
	  	}

	  	$scope.disconnect = function() {
				sessionStorage.clear();
				$location.path('/login');
				console.log("disconnected");
			}
		
})
.controller('mainController', function($scope, $http, $location) {

	$scope.callApi = {}
	$scope.displayManga = [];
	$scope.order = "title";
	$scope.displayChapterLength;
	$scope.query = '';

	var getInformation = function(i){
		$http
	  .get("http://www.mangaeden.com/api/manga/" + $scope.callApi[i].id + "/")
	  .success(function(dataManga) {
	  	dataManga.id = $scope.callApi[i].id;
	    $scope.displayManga[i] = dataManga;
	  })
	  .error(function(data){
	  	console.log('Fail call mangaEdenApi');
	  })
	}

	// call users to catch mangaId collection, and do loop with getInformation()
	// to have one get request per manga for the details
	// and stock this informations in $scope.displayManga array

	$http
	.get("/api/users/" + sessionStorage.userId)
	.success(function(data) {
		for (var i = data.length - 1; i >= 0; i--) {
			$scope.callApi = data;
		}
		for (var i = 0; i < $scope.callApi.length; i++) {
		  getInformation(i);
		}
		console.dir($scope.displayManga);
	})
	.error(function(error) {
		console.log("error :   ",error)
	})


	$scope.disconnect = function() {
		sessionStorage.clear();
		$location.path('/login');
		console.log("disconnected");
	}

	$scope.addChapter = function(mangaId) {
				$http
	  		.post("/api/users/" + sessionStorage.userId + "/chapter", {chapter : +1,
	  																															mangaId: mangaId})
	  		.success(function(data) {
	  			console.log("success : ", data);
	  			$scope.displayChapterLength = data.mangaList;
	  		})
	  		.error(function(error) {
	  			console.log('ERROR      : ', error);
	  		})
	}

	$scope.removeChapter = function(mangaId) {
				$http
	  		.post("/api/users/" + sessionStorage.userId + "/chapter", {chapter : -1,
	  																															mangaId: mangaId})
	  		.success(function(data) {
	  			console.log("success : ", data);
	  			$scope.displayChapterLength = data.mangaList;
	  		})
	  		.error(function(error) {
	  			console.log('ERROR      : ', error);
	  		})
	}

})
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
			controller: 'addCollectionController',
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
		.when('/signup', {
			templateUrl: 'app/views/signup.html',
			controller: 'signupController'
			// controllerAs: 'signupCtrl'
		})
		.otherwise({redirectTo: '/'})
});

window.addEventListener('click', function(e){
	if (e.target.className === "fa fa-caret-down fa-2x pointer") {
		console.log('oui');
		var button = document.getElementById('order');
		console.log(button);
		console.log(e);
		button.classList.toggle('rotate');
	}
});