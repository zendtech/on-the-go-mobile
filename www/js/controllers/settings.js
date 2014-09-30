angular.module('onthego.controllers')

.controller('SettingsCtrl', function($scope, AuthenticationService) {

  $scope.settings = {};

  console.log(window.localStorage.getItem('settings.name'));
  console.log(window.localStorage.getItem('settings.hash'));
  console.log(window.localStorage.getItem('settings.server'));

  /*$scope.settings['name'] = window.localStorage.getItem('settings.name') ? window.localStorage.getItem('settings.name') : 'demo';*/
  $scope.settings['name'] = window.localStorage.getItem('settings.name');
  /*$scope.settings['hash'] = window.localStorage.getItem('settings.hash') ? window.localStorage.getItem('settings.hash') : 'd6e5c2b0324b34db6f69e3fce67ecb3d70520dd3a14fe612890248983633aff1';*/
  $scope.settings['hash'] = window.localStorage.getItem('settings.hash');
  /*$scope.settings['server'] = window.localStorage.getItem('settings.server') ? window.localStorage.getItem('settings.server') : 'http://localhost:10081/on-the-go-api';*/
  $scope.settings['server'] = window.localStorage.getItem('settings.server');

  $scope.logout = function() {
    AuthenticationService.logout();
  }
  $scope.saveSettings = function() {
    window.localStorage.setItem('settings.name', $scope.settings['name']);
    window.localStorage.setItem('settings.hash', $scope.settings['hash']);
    window.localStorage.setItem('settings.server', $scope.settings['server']);
  }

  $scope.clearSettings = function() {
    $scope.settings['name'] = null;
    window.localStorage.removeItem('settings.name');
    $scope.settings['hash'] = null;
    window.localStorage.removeItem('settings.hash');
    $scope.settings['server'] = null;
    window.localStorage.removeItem('settings.server');
  }
})
