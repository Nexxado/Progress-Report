angular.module('ProgressReport')

.controller('TasksShowController', function ($scope, $routeParams) {
    
    $scope.task = $routeParams.id;
    
});