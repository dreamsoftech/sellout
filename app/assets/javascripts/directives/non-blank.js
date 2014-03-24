// directive for inputs
 //it sets required=true and handles white-space values
(function() {
  angular.module('selloutApp').directive('nonBlank', function() {
    return {
      restrict: 'A',
      link: function(scope, input, attrs) {
        var isBlank;
        input[0].required = true;
        angular.element(input[0].form).find(':submit').bind('click', function(event) {
          if (isBlank(input.val())) {
            return input.val("");
          }
        });
        return isBlank = function(text) {
          return !!text && text.length > 0 && !text.match(/\S/);
        };
      }
    };
  });
}).call(this);
