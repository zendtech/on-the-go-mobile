(function() {
  'use strict';
  
  angular
    .module('onthego.monitor')
    .controller('MonitorController', Monitor);
  
  Monitor.$inject = ['api'];
  
  function Monitor(api) {
	var vm = this;
	
	api.getMonitorList(function(err, result) {
	  vm.issues = result.monitor_issues;
	});
  }
})();