// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('onthego', ['ionic', 'onthego.services', 'onthego.controllers', 'highcharts-ng'])


.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/tabs.html",
      controller: "AppController"
    })

    .state('app.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeController'
        }
      }
    })

    .state('app.monitor', {
      url: '/monitor',
      views: {
        'tab-monitor': {
          templateUrl: 'templates/tab-monitor.html',
          controller: 'MonitorController'
        }
      }
    })
   
    .state('app.monitor-issue', {
      url: '/monitor-issue/:issueId',
      views: {
        'tab-monitor': {
          templateUrl: 'templates/monitor-issue.html',
          controller: 'MonitorIssueController'
        }
      }
    })

    .state('app.stats', {
      url: '/stats',
      views: {
        'tab-stats': {
          templateUrl: 'templates/tab-stats.html',
          controller: 'StatsController'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});

angular.module('onthego.controllers', []);
angular.module('onthego.services', ['http-auth-interceptor']);
