angular.module('ProgressReport')

.controller('AchievementDialogController', function ($scope, $mdDialog) {
    
    /*Cancel button logic*/
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    /*Submit button logic*/
    $scope.submit = function () {
        $mdDialog.hide($scope.achievement);
    };
    
    /*Boolean for user to choose a specific date*/
    $scope.chooseSpecificDate = false;

    /*the actual Achievement object with its parameters*/
    $scope.achievement = {
        title: "",
        description: "",
        date: new Date(),
        icon: "check_circle"
    };

    /*get Today's date*/
    $scope.dateToday = function () {
        $scope.achievement.date = new Date();
        console.log($scope.achievement.date);
    };

    /*logic for limiting the picking of a specific date to 6 months ago*/
    $scope.maxDate = new Date();
    $scope.minDate = new Date(
        $scope.maxDate.getFullYear(),
        $scope.maxDate.getMonth() - 6,
        $scope.maxDate.getDate()
    );
});
