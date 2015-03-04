(function() {
  'use strict';
  
  angular
    .module('onthego.login')
    .controller('LoginController', Login);
  
  Login.$inject = ['$rootScope', '$scope', '$http', '$state', '$ionicLoading', 'auth'];
  
  function Login($rootScope, $scope, $http, $state, $ionicLoading, Auth) {
	  $rootScope.data = {};
		$scope.data = {
			'server': 'http://localhost:10081',
			'user': 'demo'
		}
		
		$scope.login = function() {
			auth.login($scope.data.user);
		};

		$scope.logout = function() {
			$rootScope.data.loggedIn = false;
			auth.logout();
		};

		$scope.$on('event:auth-loginRequired', function(e, rejection) {
			console.log('login required');
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
  }
})();