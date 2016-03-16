angular.module('ProgressReport')

.controller('GoalsShowController', function ($scope, $routeParams, DatabaseService, $mdDialog, $mdMedia, $timeout) {

    $scope.backLink = '/#/goals';

    $scope.checkMissedRoutines = function () {
        var now = new Date();
        for (var i in $scope.goal.routines) {
            if (!$scope.goal.routines[i].isActive) {
                //if the time now is already after the due date - you missed a routine
                while (now > $scope.goal.routines[i].date) {
                    $scope.goal.routines[i].timesMissed++;
                    $scope.calcNextRoutineDate($scope.goal.routines[i], true);
                }
            }
        }
    };

    $scope.goal = DatabaseService.getGoal({
        title: $routeParams.id
    });

    $scope.date = $scope.goal.date.toUTCString();
    $scope.editRoutineMode = false;

    $scope.editDialog = function ($event) {
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
                    goal: oldGoal,
                    type: ""
                }
            })
            .then(function (updatedGoal) {
                var result = DatabaseService.updateGoal(oldGoal, updatedGoal);
                $scope.goal = updatedGoal;
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

    $scope.calcGoalGrade = function () {

    };

    $scope.addRoutine = function ($event) {
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');
        $mdDialog.show({
                controller: 'RoutineDialogController',
                templateUrl: 'templates/goals/routineDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: useFullScreen
            })
            .then(function (routine) {
                $scope.goal.routines.push(routine);
                var result = DatabaseService.updateGoal($scope.goal);
                console.log(result);

            }, function () {
                console.log('Dialog Canceled.');
            });
    };

    $scope.deleteRoutine = function (routine) {
        var routineIndex = $scope.goal.routines.indexOf(routine);
        if (routineIndex > -1) {
            $scope.goal.routines.splice(routineIndex, 1);
            DatabaseService.updateGoal($scope.goal);
        }
    };

    $scope.addAchievement = function ($event) {
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');
        $mdDialog.show({
                controller: 'AchievementDialogController',
                templateUrl: 'templates/goals/achievementDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                    title: "",
                    description: "",
                    date: ""
                }
            })
            .then(function (achievement) {
                $scope.goal.achievements.push(achievement);
                var result = DatabaseService.updateGoal($scope.goal);
                console.log(result);

            }, function () {
                console.log('Dialog Canceled.');
            });
    };

    $scope.drawGraph = function () {
        if ($scope.goal.achievements.length > 0) {
            var ctx = $("#graph").get(0).getContext("2d");
            var chart = new Chart(ctx);

            //        var titles = [];
            var progress = [];

            var titles = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"];

            //        for (var i = 0; i < 12; i++) {
            //            titles.push(monthNames);
            //        }
            //        //        progress.push($scope.goal.achievements[i].date);
            var monthsAchievements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            for (var j in monthsAchievements) {
                monthsAchievements[j] = 0;
            }
            console.log(new Date($scope.goal.achievements[0].date).getMonth());
            for (var x in $scope.goal.achievements) {
                var t2 = new Date($scope.goal.achievements[x].date);
                monthsAchievements[t2.getMonth()]++;
            }
            for (var w in monthsAchievements) {
                progress.push(monthsAchievements[w]);
            }



            var data = {
                labels: titles,
                datasets: [
                    {
                        label: "Achievements",
                        fillColor: "rgba(0,150,136,0.5)",
                        strokeColor: "rgba(76,175,80,0.8)",
                        highlightFill: "rgba(0,150,136,0.75)",
                        highlightStroke: "rgba(76,175,80,1)",
                        data: progress
                    }
                ]
            };

            var options = {
                barShowStroke: false
            };

            Chart.defaults.global.tooltipTemplate = "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>";

            chart.Line(data, options); //create Bar graph
        }
    };

    $scope.turnOffEdit = function () {
        $scope.editRoutineMode = false;
    };

    $scope.timeRangeLabels = ['Days', 'Weeks', 'Months', 'Years'];

    $scope.calcNextRoutineDate = function (routine, active) {
        var dateMilli;
        if(!active)
            dateMilli = new Date().getTime();
        else
            dateMilli = routine.date.getTime();
        var factor = 0;
        switch (routine.timeRange) {
            case 'Days':
                factor = 8.64e+7;
                break;
            case 'Weeks':
                factor = 6.048e+8;
                break;
            case 'Months':
                factor = 2.628e+9;
                break;
            case 'Years':
                factor = 3.154e+10;
                break;
        }
        dateMilli += routine.everyNumOfTime * factor;
        routine.date = new Date(dateMilli);
    };
    
    $scope.updateDatabase = function () {
        DatabaseService.updateGoal($scope.goal);
    };

    /*Call all the functions inside this once the view is loaded*/
    $scope.$on('$viewContentLoaded', function () {
        console.log("view loaded");
        $scope.checkMissedRoutines();
    });
});
