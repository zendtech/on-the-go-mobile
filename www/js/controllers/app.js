angular.module('onthego.controllers')

.controller('AppCtrl', function($scope, $state, $ionicModal) {
  /*$ionicModal.fromTemplateUrl('templates/login.html', function(modal) {
      $scope.loginModal = modal;
    },
    {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }
  );*/
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.loginModal = modal;
  });
  $scope.$on('$destroy', function() {
    $scope.loginModal.remove();
  });
});
