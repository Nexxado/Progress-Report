angular.module('ProgressReport')

.controller('TasksIndexController', function ($scope, $location, LocalStorageService, $mdDialog, $mdMedia) {

    $scope.navigateTo = function (path) {
        $location.path(path);
    };

    $scope.tasks = LocalStorageService.getAllTasks();


    $scope.addDialog = function ($event) {
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');

        $mdDialog.show({
                controller: 'AddDialogController',
                templateUrl: 'templates/tasks/addDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
            .then(function (newTask) {

                $scope.tasks.push(newTask);
                LocalStorageService.addTask(newTask);

            }, function () {
                console.log('Dialog Canceled.');
            });
    };
});
