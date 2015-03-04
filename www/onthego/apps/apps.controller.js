(function() {
  'use strict';
  
  angular
    .module('onthego.apps')
    .controller('AppsController', Apps);
  
  Apps.$inject = ['api', '$scope'];
  
  function Apps(api, $scope) {
	
	api.getAppsList(function(err, result) {
	  if (err) {
		return;
	  }
	  $scope.apps = result.apps;
	});
  }
})();