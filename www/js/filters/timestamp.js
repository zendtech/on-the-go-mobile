(function() {
    'use strict';

    // @todo refactor the naming of this at some point
    angular.module('onthego').filter('timestamp', function() {
        return function(input) {
          var a = new Date(input * 1000);
           var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
           var year = a.getFullYear();
           var month = months[a.getMonth() - 1];
           var date = a.getDate();
           /*var hour;
           var AMPM;
           if (a.getHours() > 12) {
             hour = a.getHours() - 12;
             AMPM = 'PM';
           } else {
             hour = a.getHours();
             AMPM = 'AM';
           }*/
           var hour = a.getHours();
           var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
           var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
           var time = date + ', ' + month + ' ' + year + ' | ' + hour + ':' + min + ':' + sec /* + ' ' + AMPM*/ ;
           return time;
        };
    });

})();
