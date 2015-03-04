(function() {
  'use strict';
  
  angular
    .module('onthego.issue')
    .controller('IssueController', Issue);
  
  Issue.$inject = ['api'];
  
  function Issue(api) {
	  
  }
})();