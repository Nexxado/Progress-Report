angular.module('ProgressReport')

.controller('GoalDialogController', function ($scope, $mdToast, $mdDialog, DatabaseService, goal, type) {

    //Decide dialog behavior according to goal variable
    //switches between an Add Dialog and Edit Dialog.
    if (!goal) {

        $scope.isEditing = false;
        $scope.lockDate = false;
        $scope.dialogTitle = 'Add New Goal';
        $scope.goal = {
            type: type,
            title: "",
            description: "",
            date: "",
            category: "",
            progress: 0,
            icon: "assignment",
            done: false,
            //Added by dan:
            routines: [],
            achievements: [],
            grade: 100
        };
        $scope.timeAmount = '';
        //Autocomplete variables
        $scope.categorySearch = undefined;
        $scope.selectedCategory = undefined;

    } else {

        $scope.isEditing = true;
        $scope.lockDate = true;
        $scope.dialogTitle = 'Edit Goal';
        $scope.goal = goal;
        $scope.timeAmount = Math.round((goal.date - (new Date())) / (1000 * 60 * 60 * 24)); //show time amount in days

        //Autocomplete variables
        $scope.categorySearch = goal.category;
        $scope.selectedCategory = goal.category;
    }


    //Get categories for AutoComplete field
    $scope.categories = DatabaseService.getCategories();
    $scope.goal.date = new Date();

    //Setup min\max dates for datepicker
    $scope.minDate = new Date();
    $scope.maxDate = new Date(
        $scope.minDate.getFullYear() + 1,
        $scope.minDate.getMonth() + 6,
        $scope.minDate.getDate()
    );


    //Setup non-speicifc Date picker
    $scope.specificDate = false;
    $scope.timeRangeLabels = ['Days', 'Months', 'Years'];
    $scope.timeRange = 'Days';



    $scope.cancel = function () {
        $mdDialog.cancel();
    };


    $scope.submit = function () {

        if (!$scope.validateDialog()) {
            return;
        }

        if (!$scope.specificDate) {
            $scope.goal.date = $scope.getDate();
        }

        if ($scope.categorySearch && $scope.categorySearch !== '') {
            $scope.goal.category = $scope.categorySearch;

            //if new category, add it to categories list.
            if ($scope.categories.indexOf($scope.categorySearch) === -1) {
                DatabaseService.addCategory($scope.categorySearch);
            }
        }
        $mdDialog.hide($scope.goal);
    };

    /**********************************/
    /***** Category Autocomplete ******/
    /**********************************/
    $scope.query = function (queryText) {
        if (!queryText) {
            return $scope.categories;
        }
        return $scope.categories.filter($scope.queryFilter(queryText));
    };

    $scope.queryFilter = function (query) {
        var lowerCaseQuery = query.toLowerCase();
        return function filterFunc(category) {
            return category.toLowerCase().indexOf(lowerCaseQuery) === 0;
        };
    };

    /**********************************/
    /******** Helper Methods **********/
    /**********************************/
    $scope.validateDialog = function () {

        if($scope.AddGoalForm.$invalid) {
            return false;
        }

        //if adding new Goal, check for existing one.
        if (!goal) {
            if (DatabaseService.getGoal($scope.goal)) {
                $mdToast.show($mdToast.simple()
                    .textContent('Goal already exists')
                    .action('Ok')
                    .highlightAction(true)
                    .position('bottom right'));
                return false;
            }
        }

        return true;
    };

    //Convert specific Date to date object
    $scope.getDate = function () {
        var rangeIndex = $scope.timeRangeLabels.indexOf($scope.timeRange);
        var temp = new Date();
        var date;

        switch (rangeIndex) {
            case 0:
                date = new Date(
                    temp.getFullYear(),
                    temp.getMonth(),
                    temp.getDate() + $scope.timeAmount
                );
                break;
            case 1:
                date = new Date(
                    temp.getFullYear(),
                    temp.getMonth() + $scope.timeAmount,
                    temp.getDate()
                );
                break;
            case 2:
                date = new Date(
                    temp.getFullYear() + $scope.timeAmount,
                    temp.getMonth(),
                    temp.getDate()
                );
                break;
        }

        return date;
    };

    //Reset date on clicking Switch
    $scope.resetDate = function () {
        if ($scope.specificDate) {
            $scope.goal.date = '';
            $scope.timeAmount = 1;
        } else {
            $scope.goal.date = new Date();
            $scope.timeAmount = '';
        }
    };

    //Unlock date when editing
    $scope.unlockDate = function () {
        $scope.lockDate = false;
    };
});
