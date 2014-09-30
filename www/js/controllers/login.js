angular.module('onthego.controllers')

.controller('LoginCtrl', function($scope, $http, $state, AuthenticationService) {
  $scope.message = "";
  $scope.user = {
    username: "julien",
    password: "avalon"
  }

  $scope.login = function() {
    console.log('logging in...');

    AuthenticationService.login($scope.user);
  }

  $scope.$on('event:auth-loginRequired', function(e, rejection) {
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
    $state.go('app.settings', {}, {reload: true, inherit:false});
  });
})
