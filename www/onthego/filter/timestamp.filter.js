(function() {
  'use strict';

  angular
    .module('onthego.filter')
    .filter('timestamp', function() {
      return function(input) {
        var a = new Date(input * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth() - 1];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
        var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        var time = date + ', ' + month + ' ' + year + ' | ' + hour + ':' + min + ':' + sec;
        return time;
    };
  });

})();
