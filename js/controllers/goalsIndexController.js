angular.module('ProgressReport')

.controller('GoalsIndexController', function ($scope, $location, $mdDialog, $mdMedia, DatabaseService, anchorSmoothScroll, constants) {

    /**********************************/
    /********** MOCK METHODS **********/
    /**********************************/
    $scope.mockRealData = function () {
        console.log("Generating Mock Data");

        DatabaseService.clearGoals();
        DatabaseService.addCategory('Extreme Sport');
        DatabaseService.addCategory('Losing Weight');
        $scope.categories = DatabaseService.getCategories();

        var numOfMocks = 15;

        for (var i = 0; i < numOfMocks; i++) {
            var startDate = new Date(2016, 0, 3);
            var endDate = new Date(2017, 5, 31);
            var date = new Date(+startDate + Math.random() * (endDate - startDate));
            var category = Math.random() < 0.5 ? 'Extreme Sport' : 'Losing Weight';


            var type = 'no type';
            var temp = Math.random() * 3;
            if (temp < 1) {
                type = 'achievement';
            } else if (temp < 2) {
                type = 'numerical';
            } else if (temp < 3) {
                type = 'custom';
            }

            var mockObject = {
                type: type,
                title: '',
                description: '',
                date: date,
                category: category,
                progress: (Math.random() * 100).toFixed(0),
                icon: 'assignment',
                done: Math.random() < 0.25,
                routines: [],
                achievements: [],
                grade: 100,
                totalPassedRoutineDates: 0,
                totalMissedRoutines: 0
            };

            if (category == 'Extreme Sport') {
                mockObject.title = 'Climbing Mount ' + String.fromCharCode(65 + i);
                mockObject.description = 'I want to manage to climb Mount ' + String.fromCharCode(65 + i);
            } else {
                mockObject.title = 'Running track  ' + String.fromCharCode(65 + i);
                mockObject.description = 'I want to manage to run the track ' + String.fromCharCode(65 + i);
            }

            var numOfRoutines = ((Math.random() * 10) + 1);
            for (var j = 0; j < numOfRoutines; j++) {
                var mockRoutine = {
                    title: "",
                    description: "",
                    repetitions: Math.floor((Math.random() * 250) + 1),
                    everyNumOfTime: Math.floor((Math.random() * 10) + 1),
                    timeRange: "",
                    date: new Date(),
                    addDate: new Date(),
                    isActive: "false",
                    timesMissed: Math.floor((Math.random() * 100) + 1),
                    icon: "assignment"
                };

                var totalMilli = mockRoutine.date.getTime() + (Math.floor((Math.random() * 100000) + 1) * (Math.floor((Math.random() * 100000) + 1)));
                mockRoutine.date = new Date(totalMilli);
                mockRoutine.isActive = Math.random() < 0.5 ? false : true;

                if (category == 'Extreme Sport') {
                    mockRoutine.title = "Make sure to climb the small hill on " + String.fromCharCode(65 + j);
                    mockRoutine.description = "i need to start slow, ill just climb the hill located at " + String.fromCharCode(65 + j);
                } else {
                    mockRoutine.title = "make sure the run around neighborhood " + String.fromCharCode(65 + j);
                    mockRoutine.description = "i need to start slow so ill just go to neighborhood " + String.fromCharCode(65 + j) + " and run a bit";
                }

                switch (Math.floor((Math.random() * 4) + 1)) {
                    case 1:
                        mockRoutine.timeRange = 'Days';
                        break;
                    case 2:
                        mockRoutine.timeRange = 'Weeks';
                        break;
                    case 3:
                        mockRoutine.timeRange = 'Months';
                        break;
                    case 4:
                        mockRoutine.timeRange = 'Years';
                        break;
                }

                mockObject.routines.push(mockRoutine);
            }
            mockObject.totalPassedRoutineDates = Math.floor((Math.random() * 250) + 1);
            console.log("totalPassed: " + mockObject.totalPassedRoutineDates);
            var totalMissedCounter = mockObject.totalPassedRoutineDates - 1;
            for (var k in mockObject.routines) {
                mockObject.routines[k].timesMissed = Math.floor((Math.random() * totalMissedCounter / 4) + 1);
                totalMissedCounter -= mockObject.routines[k].timesMissed;
            }

            var months = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"];
            var numOfAchievements = Math.floor((Math.random() * 50) + 1);
            for (var m = 0; m < numOfAchievements; m++) {
                var mockAchievement = {
                    title: "OMG i managed to do " + Math.floor((Math.random() * 234) + 1) + "sit ups",
                    description: "i am the man!",
                    date: new Date(Date.parse((months[Math.floor((Math.random() * 12) + 1)]) + " " + (Math.floor((Math.random() * 12) + 28)) + ", 2016")),
                    icon: "check_circle"
                };
                mockObject.achievements.push(mockAchievement);
            }
            DatabaseService.addGoal(mockObject);
        }

        $scope.goals = DatabaseService.getAllGoals();
    };

    $scope.mockDelete = function () {
        DatabaseService.clearGoals();
        $scope.goals = DatabaseService.getAllGoals();
    };

    /**************************************/
    /********** MOCK METHODS END **********/
    /**************************************/

    //Variables
    $scope.search = {};
    $scope.goals = DatabaseService.getAllGoals();
    $scope.categories = DatabaseService.getCategories();
    $scope.checkedGoals = [];
    $scope.editMode = false;


    /****************************/
    /******* Click Methods ******/
    /****************************/
    //List item click function
    $scope.goalClicked = function (goal) {
        if (!$scope.editMode) {
            $scope.navigateTo('/goals/' + goal.title);
        } else {
            $scope.checkGoal(goal);
        }
    };

    $scope.navigateTo = function (path) {
        $location.path(path);
    };

    $scope.checkGoal = function (goal) {
        var checked = $scope.checkedGoals.indexOf(goal);

        if (checked > -1) {
            $scope.checkedGoals.splice(checked, 1);
        } else {
            $scope.checkedGoals.push(goal);
        }
    };

    //Smooth scroll - on 'search' focus
    $scope.scrollTo = function (eID) {
        anchorSmoothScroll.scrollTo(eID);
    };
    /****************************/
    /***** Edit Mode Methods ****/
    /****************************/
    $scope.toggleEditMode = function () {
        $scope.checkedGoals = [];
        $scope.editMode = !$scope.editMode;
    };
    $scope.isChecked = function (goal) {
        return $scope.checkedGoals.indexOf(goal) > -1;
    };


    $scope.compareGoals = function ($event) {
        if ($scope.checkedGoals.length < 2) {
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Error')
                .textContent('Please select at least 2 goals to compare')
                .ariaLabel('Alert Dialog')
                .ok('Ok')
                .targetEvent($event));
            return;
        }


        $scope.compareDialog($event);
    };



    /****************************/
    /****** Dialog Methods ******/
    /****************************/
    //Dialog to select goal type
    $scope.typeDialog = function ($event) {
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');

        $mdDialog.show({
                controller: 'TypeDialogController',
                templateUrl: 'templates/goals/typeDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
            })
            .then(function (type) {

                $scope.addDialog($event, type);

            }, function () {
                console.log('Dialog Canceled.');
            });
    };

    //Dialog to input goal details
    $scope.addDialog = function ($event, type) {
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');

        $mdDialog.show({
                controller: 'GoalDialogController',
                templateUrl: 'templates/goals/goalDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                    //goal: DatabaseService.getGoal({title: 'test'}),
                    goal: undefined,
                    type: type
                }
            })
            .then(function (newGoal) {

                if (type === constants.goalType.achievement) {
                    $scope.subgoalDialog($event, newGoal);
                } else if (type === constants.goalType.numerical) {
                    $scope.numericGoalDialog($event, newGoal);
                } else {
                    $scope.goals.push(newGoal);
                    DatabaseService.addGoal(newGoal);
                }

            }, function () {
                console.log('Dialog Canceled.');
            });
    };

    //Dialog to create subgoals for 'achievement' dialog
    $scope.subgoalDialog = function ($event, goal) {

        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');

        $mdDialog.show({
                controller: 'SubgoalDialogController',
                templateUrl: 'templates/goals/subgoalDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                    goal: goal
                }
            })
            .then(function (goal) {

                $scope.goals.push(goal);
                DatabaseService.addGoal(goal);

            }, function () {
                console.log('Dialog Canceled.');
            });
    };

    //Dialog to create a current metric and goal metric
    $scope.numericGoalDialog = function ($event, goal) {

        $mdDialog.show({
                controller: 'NumericGoalDialogController',
                templateUrl: 'templates/goals/numericGoalDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    goal: goal
                }
            })
            .then(function (goal) {

                $scope.goals.push(goal);
                DatabaseService.addGoal(goal);

            }, function () {
                console.log('Dialog Canceled.');
            });
    };


    //Dialog with graph comparing several goals
    $scope.compareDialog = function ($event) {

        $mdDialog.show({
                controller: 'CompareDialogController',
                templateUrl: 'templates/goals/compareDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    goals: $scope.checkedGoals
                }
            })
            .then(function () {
                $scope.toggleEditMode();

            }, function () {
                console.log('Dialog Canceled.');
            });
    };


    //pressing Backspace closes currently open dialogs
    $scope.$on('$locationChangeStart', function (event) {
        if (angular.element(document).find('md-dialog').length > 0) { // Check if there is a dialog active
            event.preventDefault(); // Prevent route from changing
            $mdDialog.cancel(); // Cancel the active dialog
        }
    });
});
