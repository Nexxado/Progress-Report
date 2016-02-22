angular.module('ProgressReport')

.directive('toolbar', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/directives/toolbar.html'
    };
});