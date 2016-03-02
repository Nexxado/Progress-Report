angular.module('ProgressReport')

.controller('DialogController', function ($scope, $mdToast, $mdDialog, DatabaseService, goal) {

    //Decide dialog behavior according to goal variable
    //switches between an Add Dialog and Edit Dialog.
    if (!goal) {

        $scope.dialogTitle = 'Add New Goal';
        $scope.goal = {
            title: "",
            description: "",
            date: "",
            category: "",
            progress: 0,
            icon: "assignment"
        };
        
        //Autocomplete variables
        $scope.categorySearch = undefined;
        $scope.selectedCategory = undefined;

    } else {

        $scope.dialogTitle = 'Edit Goal';
        $scope.goal = goal;
        
        //Autocomplete variables
        $scope.categorySearch = goal.category;
        $scope.selectedCategory = goal.category;
    }



    //Get categories for AutoComplete field
    $scope.categories = DatabaseService.getCategories();
    
    //Setup min\max dates for datepicker
    $scope.minDate = new Date();
    $scope.maxDate = new Date(
        $scope.minDate.getFullYear() + 1,
        $scope.minDate.getMonth() + 6,
        $scope.minDate.getDate()
    );


    $scope.cancel = function () {
        $mdDialog.cancel();
    };


    $scope.submit = function () {

        if (!$scope.validateDialog()) {
            return;
        }

        if ($scope.categorySearch && $scope.categorySearch !== '') {
            $scope.goal.category = $scope.categorySearch;
            
            //if new category, add it.
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

        var description = $("input[name='description']").val();
        if (description.length < 5 || description.length > 150) {
            return false;
        }

        var date = $scope.goal.date;
        if (date === '') {
            return false;
        }

        //if adding new Goal, check for existing one.
        if (!goal) {
            if (DatabaseService.getGoal($scope.goal.title)) {
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

});
