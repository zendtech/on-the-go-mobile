(function () {
  'use strict';
  
  angular
    .module('onthego.service')
    .service('auth', Auth);
  
  Auth.$inject = ['$rootScope', '$http', 'AuthInterceptor'];
  
  function Auth($rootScope, $http, AuthInterceptor) {
	this.login = function(user) {
      var payload = {};
      payload.username = user.username;
      payload.password = user.password;
      payload.grant_type = 'password';
      payload.client_id = 'on-the-go';
      var basePath = 'http://localhost:10081';
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
    	  $rootScope.loggedin = true;
          $http.defaults.headers.common.Authorization = "Bearer " + data.access_token;

          AuthInterceptor.loginConfirmed(data, function(config) {
            config.headers.Authorization = "Bearer " + data.access_token;
            return config;
          });
        })
        .error(function(data, status, headers, config) {
          $rootScope.$broadcast('event:auth-login-failed', status);
        });
    };
    
    this.logout = function() {
      delete $http.defaults.headers.common.Authorization;
      $rootScope.loggedin = false;
      $rootScope.$broadcast('event:auth-logout-complete');
    };
    
    this.loginCancelled = function() {
    	AuthInterceptor.loginCancelled();
    };
  }
})();