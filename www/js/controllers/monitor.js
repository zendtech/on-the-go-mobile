angular.module('onthego.controllers')

.controller('MonitorController', function($rootScope, $scope, $ionicLoading, $state, IssueResource) {
	
	$ionicLoading.show({
      template: 'Loading...'
	});
	var issues = IssueResource.getList();
	issues.then(function(result) {
        $scope.issues = result;
        $ionicLoading.hide();
      });
	
});
