angular.module('ProgressReport')

.controller('RoutineDialogController', function ($scope, $mdDialog) {

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.submit = function () {
        $mdDialog.hide($scope.type);
    };

    $scope.timeRangeLabels = ['Days', 'Weeks', 'Months', 'Years'];
});
