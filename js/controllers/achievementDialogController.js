angular.module('ProgressReport')

.controller('AchievementDialogController', function ($scope, $mdDialog) {

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.submit = function () {
        $mdDialog.hide($scope.routine);
    };

    $scope.achievement = {
        title: "",
        description: "",
        date: "",
        icon: "check_circle"
    };
});
