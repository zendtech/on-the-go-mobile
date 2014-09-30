angular.module('onthego.services')
  .factory('AuthenticationService', function($rootScope, $http, authService) {
    var service = {
      login: function(user) {
        var payload = {};
        payload.username = user.username;
        payload.password = user.password;
        payload.grant_type = 'password';
        payload.client_id = 'on-the-go';

        var config = {
          url: 'http://localhost/on-the-go-api' + '/oauth',
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          data: payload,
          ignoreAuthModule: true,
        }

        $http(config)
          .success(function (data, status, headers, config){
            console.log('success login');
            $http.defaults.headers.common.Authorization = "Bearer " + data.access_token;

            authService.loginConfirmed(data, function(config) {
              config.headers.Authorization = "Bearer " + data.access_token;
              return config;
            });
          })
          .error(function(data, status, headers, config) {
            console.log('fail login');
            $rootScope.$broadcast('event:auth-login-failed', status);
          });
      },
      logout: function(user) {
        delete $http.defaults.headers.common.Authorization;
        $rootScope.$broadcast('event:auth-logout-complete');
      },
      loginCancelled: function() {
        authService.loginCancelled();
      }
    };
    return service;
  });
