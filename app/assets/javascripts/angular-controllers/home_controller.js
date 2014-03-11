var selloutApp = angular.module('selloutApp', ['ui.bootstrap']);

selloutApp.controller('HomeController', function($scope, $http) {
	$scope.getLocation = function(val) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
      params: {
      	key: "AIzaSyAHWvq6qmw1cgJXhD2dlTQ7vGrBX6hbAAI",
        address: val,
        sensor: false,
      	dataType: 'jsonp',
      }
    }).then(function(res){
      var addresses = [];
      angular.forEach(res.data.results, function(item){
        addresses.push(item.formatted_address);
      });
      return addresses;
    });
  };
})