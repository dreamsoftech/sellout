selloutApp = angular.module("selloutApp", [
  "ngRoute"
  "ngResource"
  "ui.bootstrap"
  "google-maps"
  "ngGPlaces"
])
selloutApp.config ($httpProvider, $routeProvider) ->
  authToken = $("meta[name=\"csrf-token\"]").attr("content")
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken