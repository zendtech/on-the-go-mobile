angular.module('onthego.services')

  .factory('IssueResource', function ($http, $q, Hal) {
    var basePath = 'http://localhost/on-the-go-api';
    var issuePath = basePath + '/monitor-issues';
    var issues;

    return {
      getList: function() {
        var config = {
          method: 'GET',
          url: issuePath
        };
        return $http(config).then(
          function(response) {
            issues = Hal.pluckCollection('monitor_issues', response.data);
            issues = Hal.props(issues);
            return issues;
          }
        );
      },
      get: function(issueId) {
        var config = {
          method: 'GET',
          url: issuePath + '/' + issueId
        };
        return $http(config).then(
          function(response) {
            return response.data;
          }
        );
      }
    }

  });
