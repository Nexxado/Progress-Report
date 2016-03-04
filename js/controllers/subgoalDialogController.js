angular.module('ProgressReport')

.controller('SubgoalDialogController', function($scope, $mdDialog, goal) {
    
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.submit = function () {
        $mdDialog.hide(goal);
    };
    
    
    $scope.subgoals = [];
    $scope.subgoal = '';
    
    
    $scope.addSubgoal = function() {
        //Add validation
        
        $scope.subgoals.push($scope.subgoal);
        $scope.subgoal = '';
        $scope.SubgoalForm.$setPristine();
    };
    
    $scope.removeSubgoal = function(subgoal) {
        console.log("removeSubgoal: ", subgoal);
        
        $scope.subgoals.splice($scope.subgoals.indexOf(subgoal), 1);
    };
    
}); 