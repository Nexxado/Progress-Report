angular.module('ProgressReport')

.controller('TypeDialogController', function ($scope, $mdDialog, $mdToast, $timeout, constants) {


    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.submit = function () {

        if ($scope.type === '') {
            $mdToast.show($mdToast.simple()
                .textContent('You must choose an option')
                .action('Ok')
                .highlightAction(true)
                .position('bottom right'));
            return;
        }

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
