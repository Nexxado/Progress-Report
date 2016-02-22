angular.module('ProgressReport')

.controller('TasksIndexController', function ($scope, $location) {
    
    $scope.navigateTo = function(path) {
        $location.path(path);
    };
    
    $scope.tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
    
});