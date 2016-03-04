angular.module('ProgressReport')

.controller('SubgoalDialogController', function ($scope, $mdDialog, $mdToast, goal) {

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.confirm = function () {
        if(!$scope.subgoals.length) {
            $mdToast.show($mdToast.simple()
                .textContent('Add at least 1 Subgoal')
                .action('Ok')
                .highlightAction(true)
                .position('bottom right'));
            return;
        }
        goal.subgoals = $scope.subgoals;
        $mdDialog.hide(goal);
    };


    $scope.subgoals = [];
    $scope.subgoal = '';


    $scope.addSubgoal = function () {

        if ($scope.SubgoalForm.$invalid) {
            return;
        }

        if ($scope.subgoals.indexOf($scope.subgoal) !== -1) {
            $mdToast.show($mdToast.simple()
                .textContent('Subgoal already exists')
                .action('Ok')
                .highlightAction(true)
                .position('bottom right'));
            return;
        }

        $scope.subgoals.push($scope.subgoal);
        $scope.subgoal = '';
        $scope.SubgoalForm.$setPristine();
        $scope.SubgoalForm.$setUntouched();
    };

    $scope.removeSubgoal = function (subgoal) {
        $scope.subgoals.splice($scope.subgoals.indexOf(subgoal), 1);
    };

});
