angular.module('ProgressReport')

.controller('TasksShowController', function ($scope, $routeParams, LocalStorageService) {
    
    $scope.task = LocalStorageService.getTask($routeParams.id);
    
});