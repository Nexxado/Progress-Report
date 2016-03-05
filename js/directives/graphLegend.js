angular.module('ProgressReport')

.directive('graphLegend', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div><div class="legend-color"></div><span class="legend-text">{{ label }}</span></div>',
        scope: {
            color: "@",
            label: "@"
        },
        link: function(scope, element, attrs) {
            $(element).find('.legend-color').css('background-color', scope.color);
        }
    };
});
