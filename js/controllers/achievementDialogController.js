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
    
    $scope.dateToday = function(){
        $scope.achievement.date = new Date();
        console.log($scope.achievement.date);
    };
});
