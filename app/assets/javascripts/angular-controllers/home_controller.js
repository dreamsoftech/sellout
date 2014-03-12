var selloutApp = angular.module('selloutApp', ['ui.bootstrap']).config(['$httpProvider', function ($httpProvider) {
   delete $httpProvider.defaults.headers.common['X-Requested-With']; //Fixes cross domain requests
}]);

selloutApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {
	$scope.location = '';
	$scope.startDate = '';
	$scope.endDate = '';

	$scope.getLocation = function(val) {
		if (val) {
	    return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
	      params: {
	      	// key: "AIzaSyAHWvq6qmw1cgJXhD2dlTQ7vGrBX6hbAAI",
	        address: val,
	        sensor: false
	      }
	    }).then(function(res){
	      var addresses = [];
	      angular.forEach(res.data.results, function(item){
	        addresses.push(item.formatted_address);
	      });
	      return addresses;
	    });
	  }
  };

  $scope.getEvents = function() {
  	return $http.get('http://api.bandsintown.com/events/search.json', {
  		params: {
  			location: $scope.location,
  			app_id: "sellout_platform298982873"

  			// start_date: $scope.startDate,
  			// end_date: $scope.endDate
  		}
  	}).then(function(res){
  		debugger;
      var events = [];
      angular.forEach(res.data.results, function(item){
        // addresses.push(item.formatted_address);
      });
      return events;
    });
  };
}])