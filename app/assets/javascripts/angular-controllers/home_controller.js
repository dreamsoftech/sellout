var selloutApp = angular.module('selloutApp', ['ui.bootstrap', 'ngRoute'])
.config(function ($httpProvider) {
   delete $httpProvider.defaults.headers.common['X-Requested-With']; //Fixes cross domain requests
});

// selloutApp.config([
//   '$routeProvider',

//   function($routeProvider) {
// 		$routeProvider
// 		.when('/', {
// 		  controller: 'HomeController',
// 		  templateUrl: '/assets/angular-templates/event_list.html'
// 		}).when('/calendar', {
// 		  controller: 'HomeController',
// 		  templateUrl: '/assets/angular-templates/event_calendar.html'
// 		});
// 	}
// ]);


selloutApp.controller('HomeController', function($scope, $http, $filter) {
	$scope.location = '';
	$scope.view = 'list';
	$scope.distance = 2;
	$scope.events = [];
	$scope.today = function() {
	  $scope.dt = new Date();
  };

  $scope.today();

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

  $scope.getEvents = function(refresh) {
  	$scope.loading = true;
  	$.getJSON("http://api.bandsintown.com/events/search.json?callback=?&", {
			location: $scope.location,
			radius: $scope.distance,
			date: $filter('date')($scope.dt, "yyyy-MM-dd"),
			app_id: "sellout_platform298982873"
  	}).done(function(result) {
		  $scope.loading = false;
  		if (result.errors){
  			$scope.errorMsg = result.errors;
  			$scope.$apply();
		  } else {
		  	$(".galcolumn").remove();
		  	$scope.events = result;
		  	$scope.$apply();
		  	if ($scope.view == 'list')
		  		init_grid();
		  }
		  
		}).fail(function(result) {
			$scope.loading = false;
		  $scope.$apply();
		});
  };

  $scope.getArtists = function(event) {
  	var artist_names = [];
  	event.artists.forEach(function(artist){
  		artist_names.push(artist.name);
  	})

  	return artist_names.join(", ")
  }

  $scope.ticketAvailable = function(event) {
  	return event.ticket_status == 'available'
  }

  $scope.artistImageUrl = function(event) {
		return event.artists[0].url + "/photo/medium.jpg";
  }

  $scope.removeWhitespace = function(str) {
  	return str.replace(/ /g, '');
  }

  $scope.getTime = function(datetime) {
  	date = new Date(Date.parse(datetime))
  	return date.toLocaleTimeString();
  }
})