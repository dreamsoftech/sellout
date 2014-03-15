var selloutApp = angular.module('selloutApp', ['ui.bootstrap', 'google-maps', 'ngRoute'])
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
	$scope.map = {
    options:{
      scaleControl: false,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      }
    },
    center: {
    	latitude: 45,
      longitude: -73
    },
    zoom: 12,
    dragging: false,
    bounds: {},
    markers: []
	};

	$scope.today = function() {
	  $scope.dt = new Date();
  };

  $scope.today();

	$scope.getAddresses = function(val) {
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

  $scope.getLocation = function() {
    $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
      	// key: "AIzaSyAHWvq6qmw1cgJXhD2dlTQ7vGrBX6hbAAI",
        address: $scope.location,
        sensor: false
      }
    }).then(function(res){
    	if (res.data.results.length > 0)
    	{
    		var location = res.data.results[0].geometry.location;
    		$scope.map.center.latitude = location.lat;
    		$scope.map.center.longitude = location.lng;
    	}
    });
    $scope.getEvents();
  };

  $scope.getEvents = function() {
  	$scope.loading = true;
  	$.getJSON("http://api.bandsintown.com/events/search.json?callback=?&", {
			location: $scope.location,
			radius: $scope.distance,
			date: $scope.view == 'calendar' ? $filter('date')($scope.dt, "yyyy-MM-dd") : "upcoming",
			app_id: "sellout_platform298982873"
  	}).done(function(result) {
		  $scope.loading = false;
  		if (result.errors){
  			$scope.errorMsg = result.errors;
  			$scope.$apply();
		  } else {
		  	$(".galcolumn").remove();
		  	$scope.events = result;

		  	// Venues on google map
		  	$scope.map.markers = [];
		  	result.forEach(function(event){
					$scope.map.markers.push({
						latitude: event.venue.latitude,
						longitude: event.venue.longitude,
						image_url: $scope.artistImageUrl(event),
						address: event.venue.name
					});
		  	})

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