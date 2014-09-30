angular.module('onthego.services')

  .factory('StatResource', function ($http, $q, Hal) {
    var basePath = 'http://localhost/on-the-go-api';
    var statPath = basePath + '/statistics';
    var stats;

    return {
      getList: function(type) {
        var config = {
          method: 'GET',
          url: statPath + "?type=" + type
        };
        return $http(config).then(
          function(response) {
            stats = Hal.pluckCollection('statistics', response.data);
            stats = Hal.props(stats);
            console.log(stats[0]['data']);
            return stats[0]['data'];
          }
        );
      },
    }

  });
