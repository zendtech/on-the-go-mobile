(function () {
  'use strict';

  angular
    .module('onthego.apps')
    .config(config);

  var content = {
    url: '/apps',
    views: {
      'tab-apps': {
        templateUrl: 'onthego/apps/apps.html',
        controller: 'AppsController',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('tab.apps', content)
  }

})();
