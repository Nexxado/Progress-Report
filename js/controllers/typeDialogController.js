angular.module('ProgressReport')

.controller('TypeDialogController', function ($scope, $mdDialog, $timeout, constants) {


    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.submit = function () {
        $mdDialog.hide($scope.type);
    };

    $scope.type = '';

    $timeout(function () {
        $scope.btnNumerical = $('#btnNumerical');
        $scope.btnAchievement = $('#btnAchievement');
        $scope.btnCustom = $('#btnCustom');
    });




    $scope.chooseNumerical = function () {
        $scope.btnNumerical.addClass('md-accent');
        $scope.btnAchievement.removeClass('md-accent');
        $scope.btnCustom.removeClass('md-accent');

        $scope.type = constants.goalType.numerical;
    };

    $scope.chooseAchievement = function () {
        $scope.btnNumerical.removeClass('md-accent');
        $scope.btnAchievement.addClass('md-accent');
        $scope.btnCustom.removeClass('md-accent');

        $scope.type = constants.goalType.achievement;
    };

    $scope.chooseCustom = function () {
        $scope.btnNumerical.removeClass('md-accent');
        $scope.btnAchievement.removeClass('md-accent');
        $scope.btnCustom.addClass('md-accent');

        $scope.type = constants.goalType.custom;
    };



});
