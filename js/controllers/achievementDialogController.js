angular.module('ProgressReport')

.controller('AchievementDialogController', function ($scope, $mdDialog) {

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.submit = function () {
        $mdDialog.hide($scope.achievement);
    };

    $scope.chooseSpecificDate = false;

    $scope.achievement = {
        title: "",
        description: "",
        date: new Date(),
        icon: "check_circle"
    };

    $scope.dateToday = function () {
        $scope.achievement.date = new Date();
        console.log($scope.achievement.date);
    };

    $scope.maxDate = new Date();
    $scope.minDate = new Date(
        $scope.maxDate.getFullYear(),
        $scope.maxDate.getMonth() - 6,
        $scope.maxDate.getDate()
    );
});
