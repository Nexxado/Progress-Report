angular.module('ProgressReport')

.controller('RoutineDialogController', function ($scope, $mdDialog) {

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.submit = function () {
        $mdDialog.hide($scope.routine);
    };

    $scope.timeRangeLabels = ['Days', 'Weeks', 'Months', 'Years'];

    $scope.routine = {
        title: "",
        description: "",
        date: "",
        icon: "assignment",
    };
});
