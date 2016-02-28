angular.module('ProgressReport')

.controller('GoalsIndexController', function ($scope, $location, DatabaseService, $mdDialog, $mdMedia) {

    $scope.navigateTo = function (path) {
        $location.path(path);
    };

    $scope.goals = DatabaseService.getAllGoals();


    $scope.addDialog = function ($event) {
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');

        $mdDialog.show({
                controller: 'AddDialogController',
                templateUrl: 'templates/goals/addDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
            .then(function (newGoal) {

                $scope.goals.push(newGoal);
                DatabaseService.addGoal(newGoal);

            }, function () {
                console.log('Dialog Canceled.');
            });
    };
});
