(function() {
  'use strict';
  
  angular
    .module('onthego')
    .controller('MainController', Main);
  
  Main.$inject = ['$scope', '$ionicModal', '$ionicPopup', 'auth'];
  
  function Main($scope, $ionicModal, $ionicPopup, auth) {
	  $ionicModal.fromTemplateUrl('onthego/login/login.html', {
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
			    	 Auth.logout();
			     } else {
			       console.log('Logout cancelled');
			     }
			   });
			  
		  };
  }
})();