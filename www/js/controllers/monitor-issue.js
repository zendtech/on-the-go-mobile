angular.module('onthego.controllers')

.controller('MonitorIssueCtrl', function($rootScope, $scope, IssueResource) {
  IssueResource.get(673).then(function(result) {
    $scope.issue = result;
  });
});
