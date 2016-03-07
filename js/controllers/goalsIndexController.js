angular.module('ProgressReport')

.controller('GoalsIndexController', function ($scope, $location, $mdDialog, $mdMedia, DatabaseService, anchorSmoothScroll, constants) {
    
    /**********************************/
    /********** MOCK METHODS **********/
    /**********************************/
    $scope.mockData = function () {
        console.log("Generating Mock Data");

        DatabaseService.clearGoals();
        localStorage.setItem('categories', JSON.stringify(['cat1', 'cat2']));

        var numOfMocks = 50;

        for (var i = 0; i < numOfMocks; i++) {
            var r = Math.pow(Math.random() * numOfMocks, 2).toFixed(0);
            var startDate = new Date(2016, 0, 3);
            var endDate = new Date(2017, 5, 31);
            var date = new Date(+startDate + Math.random() * (endDate - startDate));
            var category = Math.random() < 0.5 ? 'cat1' : 'cat2';


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
                title: 'Title ' + r,
                description: 'Description ' + i,
                date: date,
                category: category,
                progress: (Math.random() * 100).toFixed(0),
                icon: 'assignment',
                done: Math.random() < 0.25
            };
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
