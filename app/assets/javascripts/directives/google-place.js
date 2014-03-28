(function() {
  angular.module('selloutApp').directive('googleplace', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, model) {
        var options = {
          types: attrs["googleplace"] == "" ? [] : [attrs["googleplace"]],
          componentRestrictions: {}
        };

        scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
          scope.$apply(function() {
            // Get the place details from the autocomplete object.
            model.$setViewValue(element.val());
            scope.getLocation();
          });
        });
      }
    };
  })
}).call(this);