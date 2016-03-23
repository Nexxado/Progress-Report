angular.module('ProgressReport')

.controller('RoutineDialogController', function ($scope, $mdDialog) {
    /*Cancel button logic*/
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    /*Submit button logic*/
    $scope.submit = function () {
        $mdDialog.hide($scope.routine);
    };

    /*Time ranges for dialog time picks*/
    $scope.timeRangeLabels = ['Days', 'Weeks', 'Months', 'Years'];

    /*The actual Routine object with its parameters*/
    $scope.routine = {
        title: "",
        description: "",
        repetitions: 0,
        everyNumOfTime: 0,
        timeRange: "Days",
        date: new Date(),
        endDate: new Date(),
        addDate: new Date(),
        isActive: false,
        timesMissed: 0,
        finishedByTimeFrame: false,
        icon: "assignment"
    };

});
