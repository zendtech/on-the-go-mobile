(function () {
  'use strict';

  angular
    .module('onthego', [
      'ionic',
      'ngCordova',
      'onthego.home',
      'onthego.monitor',
      'onthego.stats',
      'onthego.apps',
      'onthego.service',
      'onthego.filter'
    ]);
})();