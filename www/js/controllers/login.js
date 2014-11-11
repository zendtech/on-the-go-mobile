angular.module('onthego.controllers')

.controller('LoginController', function($rootScope, $scope, $http, $state, $ionicLoading, AuthenticationService) {
	$rootScope.data = {};
	$scope.data = {
		'server': 'http://onthego.zend.com/on-the-go-api',
		//'server': 'http://54.209.165.66/on-the-go-api',
		'user': {
			'username': 'demo',  
			'password': 'zend'
		}
	}

	$scope.login = function() {
		window.localStorage.setItem('server', $scope.data.server);
		AuthenticationService.login($scope.data.user);
	};

	$scope.logout = function() {
		$rootScope.data.loggedIn = false;
		AuthenticationService.logout();
	};

	$scope.$on('event:auth-loginRequired', function(e, rejection) {
		$ionicLoading.hide();
		$scope.loginModal.show();
	});

	$scope.$on('event:auth-loginConfirmed', function() {
		$rootScope.data.loggedIn = true;
		$scope.data.username = null;
		$scope.data.password = null;
		$scope.loginModal.hide();
		$state.go('app.home');
	});

	$scope.$on('event:auth-login-failed', function(e, status) {
		var error = "Login failed";

		if (status == 401) {
			error = "Invalid username and/or password";
		}
		$scope.message = error;
	});

	$scope.$on('event:auth-logout-complete', function() {
		$rootScope.$broadcast('event:auth-loginRequired');
	});
});
