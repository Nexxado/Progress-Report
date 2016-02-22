angular.module('ProgressReport')

.controller('TasksShowController', function ($scope, $routeParams, LocalStorageService) {
    
    var taskTitle = $routeParams.id;
    $scope.task = LocalStorageService.getTask(taskTitle);
    
    
});