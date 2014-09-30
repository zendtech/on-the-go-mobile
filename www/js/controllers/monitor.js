angular.module('onthego.controllers')

.controller('MonitorCtrl', function($rootScope, $scope, IssueResource) {
  IssueResource.getList().then(function(result) {
    $scope.issues = result;
  });
});
