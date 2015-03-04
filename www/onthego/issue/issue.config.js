(function () {
  'use strict';

  angular
    .module('onthego.issue')
    .config(config);

  var content = {
    url: '/issue/:issueId',
    views: {
      'tab-monitor': {
        templateUrl: 'onthego/issue/issue.html',
        controller: 'IssueController',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('tab.issue', content)
  }

})();
