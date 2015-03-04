(function () {
  'use strict';

  angular
    .module('onthego.stats')
    .config(config);

  var content = {
    url: '/stats',
    views: {
      'tab-stats': {
        templateUrl: 'onthego/stats/stats.html',
        controller: 'StatsController',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('tab.stats', content)
  }

})();
