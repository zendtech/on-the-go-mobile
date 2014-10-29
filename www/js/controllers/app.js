angular.module('onthego.controllers')

.controller('AppController', function($scope, $state, $ionicModal, $ionicPopup, AuthenticationService) {
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
  $scope.logout = function() {
	  var confirmPopup = $ionicPopup.confirm({
	     title: 'Logging out',
	     template: 'Are you sure you want to logout of the application?'
	   });
	  confirmPopup.then(function(res) {
	     if(res) {
	    	 AuthenticationService.logout();
	     } else {
	       console.log('Logout cancelled');
	     }
	   });
	  
  };
});
