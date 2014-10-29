angular.module('onthego.services')

  .factory('IssueResource', function ($rootScope, $http, $q, Hal) {

    return {
      getList: function() {
    	if (window.localStorage.getItem('server') == null) {
    		$rootScope.$broadcast('event:auth-loginRequired');
    	}
    	console.log(window.localStorage.getItem('server'));
    	var issuePath = window.localStorage.getItem('server') + '/api/monitor-issues';
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
    	var issuePath = window.localStorage.getItem('server') + '/api/monitor-issues';
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
    	  var issuePath = window.localStorage.getItem('server') + '/api/monitor-issues';
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
