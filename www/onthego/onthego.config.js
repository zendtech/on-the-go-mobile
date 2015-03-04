(function () {
  'use strict';
  
  angular
    .module('onthego')
    .config(config);
  
  config.$inject = [
    '$provide',
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider'
  ];
  
  function config ($provide, $stateProvider, $urlRouterProvider, $httpProvider) {
	  $provide.value(
        'otgApiPath',
        'http://localhost:8888'
      );
	  
	  $stateProvider

      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "onthego/main/main.html"
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');
  }
})();