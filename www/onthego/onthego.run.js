(function () {
  'use strict';
  angular
    .module('onthego')
    .run(run);
  
  run.$inject = [
    '$rootScope',
    '$ionicLoading',
    '$ionicPlatform',
    '$cordovaSplashscreen'
  ];
  
  function run ($rootScope, $ionicLoading, $ionicPlatform, $cordovaSplashscreen) {
    $ionicPlatform.ready(function() {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
    setTimeout(function() {
      $cordovaSplashscreen.hide()
    }, 3000);

    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({template: 'Loading...'});
    });

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide();
    });
  }
});