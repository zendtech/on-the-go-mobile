angular.module('onthego', ['ionic', 'ngCordova', 'onthego.services', 'onthego.controllers', 'highcharts-ng'])


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
    
    .state('app.about', {
    	url: '/about',
    	views: {
    	  'tab-about': {
    		  templateUrl: 'templates/tab-about.html',
    		  controller: 'AboutController'
    	  }
    	}
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

}).config(function($httpProvider) {
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show');
                return config;
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide');
                return response;
            }
        }
    });
}).run(function($rootScope, $ionicLoading, $ionicPlatform, $cordovaSplashscreen) {
    setTimeout(function() {
        $cordovaSplashscreen.hide()
    }, 3000);
	
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({template: 'Loading...', noBackdrop: false});
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide();
    });

    /*$ionicPlatform.ready(function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState]);
    });*/
});

angular.module('onthego.controllers', []);
angular.module('onthego.services', ['http-auth-interceptor']);
