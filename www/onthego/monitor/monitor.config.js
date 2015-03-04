(function () {
  'use strict';

  angular
    .module('onthego.monitor')
    .config(config);

  var content = {
    url: '/monitor',
    views: {
      'tab-monitor': {
        templateUrl: 'onthego/monitor/monitor.html',
        controller: 'MonitorController',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('tab.monitor', content)
  }

})();
