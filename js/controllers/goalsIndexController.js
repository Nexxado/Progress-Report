angular.module('ProgressReport')

.controller('GoalsIndexController', function ($scope, $location, $mdDialog, $mdMedia, DatabaseService) {

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

            var mockObject = {
                title: 'Title ' + r,
                description: 'Description ' + i,
                icon: 'assignment',
                progress: (Math.random() * 100).toFixed(0),
                date: date,
                category: category
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

        //Implement Comparing goals
        $scope.toggleEditMode();
    };



    /****************************/
    /****** Dialog Methods ******/
    /****************************/
    $scope.addDialog = function ($event) {
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');

        $mdDialog.show({
                controller: 'GoalDialogController',
                templateUrl: 'templates/goals/goalDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    goal: undefined
//                    goal: DatabaseService.getGoal({title: 'test'})
                }
            })
            .then(function (newGoal) {

                $scope.goals.push(newGoal);
                DatabaseService.addGoal(newGoal);

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
});
