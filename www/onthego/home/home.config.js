(function () {
  'use strict';

  angular
    .module('onthego.home')
    .config(config);

  var content = {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'onthego/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('tab.home', content)
  }

})();
