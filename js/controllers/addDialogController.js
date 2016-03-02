angular.module('ProgressReport')

.controller('AddDialogController', function ($scope, $mdDialog, DatabaseService) {

    $scope.goalDetails = {
        title: "",
        description: "",
        date: "",
        category: "",
        progress: 0,
        icon: "assignment"
    };

    $scope.categories = DatabaseService.getCategories();
    console.log($scope.categories);
    $scope.categorySearch = undefined;
    $scope.selectedCategory = undefined;

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

        if ($scope.categories.indexOf($scope.categorySearch) === -1) {
            DatabaseService.addCategory($scope.categorySearch);
        }

        $scope.goalDetails.category = $scope.categorySearch;
        $mdDialog.hide($scope.goalDetails);
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

        var date = $scope.goalDetails.date;
        if (date === '') {
            return false;
        }

        return true;
    };
});
