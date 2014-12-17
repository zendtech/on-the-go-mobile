(function() {
angular.module('onthego')
	.factory('Config', function () {
		return {
			'server': 'http://onthego.zend.com/on-the-go-api',
			'user': {
				'username': 'demo',  
				'password': 'zend'
			}
		}
	});
})();
