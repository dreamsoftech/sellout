var selloutApp = angular.module('selloutApp', ['ui.bootstrap', 'google-maps', 'ngRoute'])
.config(function ($httpProvider, $routeProvider) {
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
      scaleControl: true,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      maxZoom:20,
      minZoom:3
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

  $scope.getDetail = function(lat, lng) {
  	var map = new google.maps.Map($(".google-map"), {
	    center: new google.maps.LatLng(lat, lng),
	    zoom: 13
	  });

	  var request = {
	    reference: 'CnRkAAAAGnBVNFDeQoOQHzgdOpOqJNV7K9-c5IQrWFUYD9TNhUmz5-aHhfqyKH0zmAcUlkqVCrpaKcV8ZjGQKzB6GXxtzUYcP-muHafGsmW-1CwjTPBCmK43AZpAwW0FRtQDQADj3H2bzwwHVIXlQAiccm7r4xIQmjt_Oqm2FejWpBxLWs3L_RoUbharABi5FMnKnzmRL2TGju6UA4k'
	  };
	  var service = new google.maps.places.PlacesService(map);

	  return service.getDetails(request, function(place, status) {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
	    	return place.formatted_phone_number;
	    }
	  });
  }

  $scope.getLocation = function() {
    p = $scope.gPlace.getPlace()
    if (p.geometry && p.geometry.location) {
      $scope.map.center.latitude = p.geometry.location.lat();
      $scope.map.center.longitude = p.geometry.location.lng();
    }
    $scope.getEvents();
  };

  var onMarkerClicked = function (marker) {
    if ($scope.prevMarker)
      $scope.prevMarker.showWindow = false;
    marker.showWindow = true;
    $scope.prevMarker = marker;
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
						ticket_url: event.ticket_url,
						address: event.venue.name
					});
		  	})

        _.each($scope.map.markers, function (marker) {
          marker.closeClick = function () {
            marker.showWindow = false;
            $scope.$apply();
          };
          marker.onClicked = function () {
            onMarkerClicked(marker);
            $scope.$apply();
          };
        });


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