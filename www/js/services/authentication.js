angular.module('onthego.services')
  .factory('AuthenticationService', function($rootScope, $http, authService) {
    var service = {
      login: function(user) {
        var payload = {};
        payload.username = user.username;
        payload.password = user.password;
        payload.grant_type = 'password';
        payload.client_id = 'on-the-go';
        var basePath = window.localStorage.getItem('server');
        var config = {
          url: basePath + '/oauth',
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          data: payload,
          ignoreAuthModule: true,
        };

        $http(config)
          .success(function (data, status, headers, config){
        	  console.log('auth success');
        	  $rootScope.loggedin = true;
            $http.defaults.headers.common.Authorization = "Bearer " + data.access_token;

            authService.loginConfirmed(data, function(config) {
              config.headers.Authorization = "Bearer " + data.access_token;
              return config;
            });
          })
          .error(function(data, status, headers, config) {
        	  console.log('auth error');
        	  console.log(headers);
        	  console.log(status);
            $rootScope.$broadcast('event:auth-login-failed', status);
          });
      },
      logout: function(user) {
        delete $http.defaults.headers.common.Authorization;
        $rootScope.loggedin = false;
        $rootScope.$broadcast('event:auth-logout-complete');
      },
      loginCancelled: function() {
        authService.loginCancelled();
      }
    };
    return service;
  });