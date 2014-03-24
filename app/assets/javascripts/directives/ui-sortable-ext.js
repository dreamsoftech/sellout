// Disables/enables uiSortable depending on value of boolean attribute.
(function() {
  angular.module('selloutApp').directive('uiSortableExt', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var toggleSortable;
        toggleSortable = function() {
          return element.sortable(scope[attrs.uiSortableExt] ? 'enable' : 'disable');
        };
        return scope.$watch(attrs.uiSortableExt, toggleSortable, true);
      }
    };
  });
}).call(this);
