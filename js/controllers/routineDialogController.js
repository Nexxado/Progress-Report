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
        repetitions: 0,
        everyNumOfTime: 0,
        timeRange: "",
        date: "",
        isActive: false,
        icon: "assignment"
    };
});
