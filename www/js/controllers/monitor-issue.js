angular.module('onthego.controllers')

.controller('MonitorIssueController', function($scope, $stateParams, $ionicLoading, IssueResource) {
	IssueResource.get($stateParams.issueId).then(function(result) {
		$scope.issue = result;
		$ionicLoading.hide();
  });
  $scope.share = function(issueId) {
    IssueResource.share(issueId);
  };
});
