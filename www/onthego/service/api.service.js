(function () {
  'use strict';
  
  angular
    .module('onthego.service')
    .service('api', Api);
  
  Api.$inject = ['xhr', 'otgApiPath'];
  
  function Api(xhr, otgApiPath) {
	var httpMethods = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
	
	this.getMonitorList = function(callback) {
	  xhr.get(otgApiPath + '/api/monitor-issues', '_embedded')
	    .then(function(response) {
	      return callback(false, response);
	    })
	    .catch(function (err) {
	      return callback(true, null);
	    });
	};
	
	this.getAppsList = function(callback) {
	  xhr.get(otgApiPath + '/api/apps', '_embedded')
	    .then(function(response) {
	      return callback(false, response);
	    })
	    .catch(function(err) {
	      return callback(true, null);
	    })
	};
  }
})();