angular.module('ProgressReport')

.controller('NumericGoalDialogController', function ($scope, $mdDialog, $mdToast, goal) {

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.submit = function () {

        if ($scope.NumericGoalForm.$invalid) {
            return;
        }

        if ($scope.currentNum >= $scope.goalNum) {
            $mdToast.show($mdToast.simple()
                .textContent('Goal# must be higher than Current#')
                .action('Ok')
                .highlightAction(true)
                .position('bottom right'));
            return;
        }

        goal.currentNum = $scope.currentNum;
        goal.goalNum = $scope.goalNum;

        $mdDialog.hide(goal);
    };


    $scope.currentNum = '';
    $scope.goalNum = '';



});
