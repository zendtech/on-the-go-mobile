angular.module('onthego.services')

  .factory('StatResource', function ($rootScope, $http, $q, Hal) {

	  return {
      getList: function(type, from, to) {
      	if (window.localStorage.getItem('server') == null) {
      		$rootScope.$broadcast('event:auth-loginRequired');
      	}
      	var statPath = window.localStorage.getItem('server') + '/api/statistics';
      	var stats;
      	var url = statPath + "?type=" + type + "&from=" + from + '&to=' + to + '&' + makeid();
      	/*if (! [500, 503, 504, 505].contains(type)) {
			url += '&to='+to;
		}*/
        var config = {
          method: 'GET',
          url: url
        };
        return $http(config).then(
          function(response) {
            stats = response.data.result;
            return stats;
          }
        );
      },
    };

  });
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}