angular.module('onthego.controllers')

.controller('HomeCtrl', function($scope) {
	/*$ionicLoading.show({
	  template: 'Loading...',
	  duration: 1500,
	});*/
	$scope.contacts = [];
  /*var options = new ContactFindOptions();
  options.filter=""; //returns all results
  options.multiple=true;
  var fields = ["displayName", "name", "phoneNumbers"];
  navigator.contacts.find(fields,function(contacts) {
      $scope.contacts=contacts;
	  console.log($scope.contacts);
      $scope.$apply();
  },function(e){
	  console.log("Error finding contacts " + e.code);
  },options);*/
});
