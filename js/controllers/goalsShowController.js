angular.module('ProgressReport')

.controller('GoalsShowController', function ($scope, $routeParams, DatabaseService) {
    
    $scope.backLink = '/#/goals';
    
    $scope.goal = DatabaseService.getGoal($routeParams.id);
    
});