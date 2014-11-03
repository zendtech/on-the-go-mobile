angular.module('onthego.controllers')

.controller('MonitorController', function($rootScope, $scope, $ionicLoading, $state, IssueResource) {
	var issues = IssueResource.getList();
	issues.then(function(result) {
        $scope.issues = result;
        $ionicLoading.hide();
      });
	
});
