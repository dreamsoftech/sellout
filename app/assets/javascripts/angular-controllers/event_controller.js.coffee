angular.module("selloutApp").controller "EventController", ($scope, $http, $filter) ->
  $scope.getLocation = ->
    p = $scope.gPlace.getPlace()
    city = ""
    latitude = 0
    longitude = 0
    photoUrl = []

    if p.address_components.length > 2
      l = p.address_components.length
      i = 0

      while i < l
        if $.inArray("locality", p.address_components[i]["types"]) > -1
          city = p.address_components[i]["long_name"]
        else if $.inArray("country", p.address_components[i]["types"]) > -1
          country = p.address_components[i]["long_name"]
        else if $.inArray("administrative_area_level_1", p.address_components[i]["types"]) > -1
          state = p.address_components[i]["long_name"]
        else if $.inArray("administrative_area_level_2", p.address_components[i]["types"]) > -1
          state = p.address_components[i]["long_name"]
        else if $.inArray("administrative_area_level_3", p.address_components[i]["types"]) > -1
          state = p.address_components[i]["long_name"]
        i++

    if p.photos? and p.photos.length > 0
      photoUrl = p.photos[0].getUrl(
        maxWidth: 71
        maxHeight: 71
      )
    else
      photoUrl = p.icon

    if p.geometry and p.geometry.location
      latitude = p.geometry.location.lat()
      longitude = p.geometry.location.lng()

    address = (if (p.vicinity) then p.vicinity else p.formatted_address)
    
    $scope.venue =
      address: address
      phone_number: p.formatted_phone_number
      latitude: latitude
      longitude: longitude
      city: city
      country: country
      state: state
      # photo_thumbs: getGooglePhotos(p.photos)
      website: p.website
      google_reference: p.reference
      types: p.types

  getGooglePhotos = (photos) ->
    if photos
      urls = []
      _(photos).each((p) ->
        urls.push {image: p.getUrl(maxWidth: 300, maxHeight: 200)}
      )
      urls
    else
      []