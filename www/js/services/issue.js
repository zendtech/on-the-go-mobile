angular.module('onthego.services')

  .factory('IssueResource', function ($rootScope, $http, $q, $window, Hal, Config) {

    return {
      getList: function() {
    	if (Config.server == null) { 
    		$rootScope.$broadcast('event:auth-loginRequired');
    	}
    	var issuePath = Config.server + '/api/monitor-issues';
    	var issues;
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
    	var issuePath = Config.server + '/api/monitor-issues';
        var config = {
          method: 'GET',
          url: issuePath + '/' + issueId
        };
        return $http(config).then(
          function(response) {
            return response.data;
          }
        );
      },
      share: function(id) {
    	  var issuePath = Config.server + '/api/monitor-issues';
    	  var config = {
	          method: 'POST',
	          url: issuePath + '/' + issueId,
	          data: {
	        	  'recipient': '',
	        	  'content': ''
	          }
	      };
    	  return $http(config).then(
	          function(response) {
	        	  console.log(response);
	          }
	      );
      }
    };

  });
