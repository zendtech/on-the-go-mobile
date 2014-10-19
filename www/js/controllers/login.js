angular.module('onthego.controllers')

.controller('LoginCtrl', function($rootScope, $scope, $http, $state, $ionicLoading, AuthenticationService) {
  $scope.message = "";
  $scope.user = {
    username: "julien",
    password: "avalon"
  };
  $scope.server = "http://localhost:8080";

  $scope.login = function() {
	  window.localStorage.setItem('server', $scope.server);
    AuthenticationService.login($scope.user);
  };
  
  $scope.logout = function() {
    AuthenticationService.logout();
  };

  $scope.$on('event:auth-loginRequired', function(e, rejection) {
	$ionicLoading.hide();
    $scope.loginModal.show();
  });

  $scope.$on('event:auth-loginConfirmed', function() {
    $scope.username = null;
    $scope.password = null;
    $scope.loginModal.hide();
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
