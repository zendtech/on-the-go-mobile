angular.module('onthego.controllers')

.controller('MonitorCtrl', function($rootScope, $scope, $ionicLoading, $state, IssueResource) {
  /*$ionicLoading.show({
    template: 'Loading...'
  });
  IssueResource.getList().then(function(result) {
	$ionicLoading.hide();
    $scope.issues = result;
  });*/
	
	$scope.$on('event:settings-updated', function() {
		console.log('event:settings-updated');
		$rootScope.apiPath = window.localStorage.getItem('settings.name');
	});
	
	$ionicLoading.show({
      template: 'Loading...'
	});
	var issues = IssueResource.getList();
	/*if (null != issues) {
      issues.then(function(result) {
        $scope.issues = result;
      });
	} else {
    	$state.go('app.settings', {});
	}
	$ionicLoading.hide();*/
	issues.then(function(result) {
        $scope.issues = result;
        $ionicLoading.hide();
      });
	
});
