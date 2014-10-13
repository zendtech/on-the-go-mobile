angular.module('onthego.controllers')

.controller('MonitorIssueCtrl', function($scope, $stateParams, $ionicLoading, IssueResource) {
	$ionicLoading.show({
	  template: 'Loading...',
	});
	IssueResource.get($stateParams.issueId).then(function(result) {
		console.log(result);
		$scope.issue = result;
		$ionicLoading.hide();
  });
  $scope.share = function(issueId) {
    alert(issueId);
  };
});
