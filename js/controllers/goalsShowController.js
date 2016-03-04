angular.module('ProgressReport')

.controller('GoalsShowController', function ($scope, $routeParams, DatabaseService, $mdDialog, $mdMedia) {

    $scope.backLink = '/#/goals';

    $scope.goal = DatabaseService.getGoal({
        title: $routeParams.id
    });

    $scope.date = $scope.goal.date.toUTCString();

    $scope.routine = {
        /*need to find a way to have a list of routines. a routine is made out of exercises and 
        a time for repeatition (every week/day/month). so i need to find a way to have a routine
        add itself to an array of "todo this week/day/month" that with a checkbox to check that 
        you actually did it like you planned. so i need to see if i should make an extra array that
        will be filled with routines as TODO and have a parameter of "done" or something on that line.
        */
        title: "",
        description: "",
        exercises: [],
        active: false
    };
    
    $scope.exercise = {
        description: "",
        repetitions: 0,
        
    };
    
    $scope.achievement = {

    };

    $scope.editDialog = function ($event) {
        console.log("asdassadasdasddsada");
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');
        var oldGoal = angular.copy($scope.goal);
        console.log(oldGoal);
        $mdDialog.show({
                controller: 'GoalDialogController',
                templateUrl: 'templates/goals/goalDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                    goal: $scope.goal,
                    type: ""
                }
            })
            .then(function (updatedGoal) {
                var result = DatabaseService.updateGoal(oldGoal, updatedGoal);
                console.log(result);

            }, function () {
                console.log('Dialog Canceled.');
            });
    };

    /* pressing Backspace closes currently open dialogs */
    $scope.$on('$locationChangeStart', function (event) {
        // Check if there is a dialog active
        if (angular.element(document).find('md-dialog').length > 0) {
            event.preventDefault(); // Prevent route from changing
            $mdDialog.cancel(); // Cancel the active dialog
        }
    });

    $scope.showGoalGraph = function () {
        console.log("called Show Graph");
    };

    $scope.editRoutines = function () {
        console.log("called Edit Routines");
    };

    $scope.calcGoalGrade = function () {
        
    };
});
