angular.module("selloutApp").controller "HomeController", ($scope, $http, $filter) ->
  $scope.location = ""
  $scope.view = "list"
  $scope.distance = 2
  $scope.events = []
  $scope.map =
    options:
      scaleControl: true
      scrollwheel: false
      mapTypeId: google.maps.MapTypeId.ROADMAP
      mapTypeControl: true
      mapTypeControlOptions:
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU

      maxZoom: 20
      minZoom: 3

    center:
      latitude: 45
      longitude: -73

    zoom: 12
    dragging: false
    bounds: {}
    markers: []

  $scope.today = ->
    $scope.dt = new Date()

  $scope.today()
  $scope.getAddresses = (val) ->
    if val
      
      # key: "AIzaSyAHWvq6qmw1cgJXhD2dlTQ7vGrBX6hbAAI",
      $http.get("https://maps.googleapis.com/maps/api/geocode/json",
        params:
          address: val
          sensor: false
      ).then (res) ->
        addresses = []
        angular.forEach res.data.results, (item) ->
          addresses.push item.formatted_address

        addresses


  $scope.getDetail = (lat, lng) ->
    map = new google.maps.Map($(".google-map"),
      center: new google.maps.LatLng(lat, lng)
      zoom: 13
    )
    request = reference: "CnRkAAAAGnBVNFDeQoOQHzgdOpOqJNV7K9-c5IQrWFUYD9TNhUmz5-aHhfqyKH0zmAcUlkqVCrpaKcV8ZjGQKzB6GXxtzUYcP-muHafGsmW-1CwjTPBCmK43AZpAwW0FRtQDQADj3H2bzwwHVIXlQAiccm7r4xIQmjt_Oqm2FejWpBxLWs3L_RoUbharABi5FMnKnzmRL2TGju6UA4k"
    service = new google.maps.places.PlacesService(map)
    service.getDetails request, (place, status) ->
      place.formatted_phone_number  if status is google.maps.places.PlacesServiceStatus.OK


  $scope.getLocation = ->
    p = $scope.gPlace.getPlace()
    if p.geometry and p.geometry.location
      $scope.map.center.latitude = p.geometry.location.lat()
      $scope.map.center.longitude = p.geometry.location.lng()
    $scope.getEvents()

  onMarkerClicked = (marker) ->
    $scope.prevMarker.showWindow = false  if $scope.prevMarker
    marker.showWindow = true
    $scope.prevMarker = marker

  $scope.getEvents = ->
    $scope.loading = true
    
    # Venues on google map
    $.getJSON("http://api.bandsintown.com/events/search.json?callback=?&",
      location: $scope.location
      radius: $scope.distance
      date: (if $scope.view is "calendar" then $filter("date")($scope.dt, "yyyy-MM-dd") else "upcoming")
      app_id: "sellout_platform298982873"
    ).done((result) ->
      $scope.loading = false
      if result.errors
        $scope.errorMsg = result.errors
        $scope.$apply()
      else
        $(".galcolumn").remove()
        $scope.events = result
        $scope.map.markers = []
        result.forEach (event) ->
          $scope.map.markers.push
            latitude: event.venue.latitude
            longitude: event.venue.longitude
            image_url: $scope.artistImageUrl(event)
            ticket_url: event.ticket_url
            address: event.venue.name

        _.each $scope.map.markers, (marker) ->
          marker.closeClick = ->
            marker.showWindow = false
            $scope.$apply()

          marker.onClicked = ->
            onMarkerClicked marker
            $scope.$apply()

        $scope.$apply()
        init_grid()  if $scope.view is "list"
    ).fail (result) ->
      $scope.loading = false
      $scope.$apply()


  $scope.getArtists = (event) ->
    artist_names = []
    event.artists.forEach (artist) ->
      artist_names.push artist.name

    artist_names.join ", "

  $scope.ticketAvailable = (event) ->
    event.ticket_status is "available"

  $scope.artistImageUrl = (event) ->
    event.artists[0].url + "/photo/medium.jpg"

  $scope.removeWhitespace = (str) ->
    str.replace RegExp(" ", "g"), ""

  $scope.getTime = (datetime) ->
    date = new Date(Date.parse(datetime))
    date.toLocaleTimeString()