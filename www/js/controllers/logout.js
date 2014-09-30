angular.module('onthego.controllers')

.controller('LogoutCtrl', function($scope, AuthenticationService) {
  AuthenticationService.logout();
})
