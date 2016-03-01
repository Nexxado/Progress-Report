angular.module('ProgressReport')

.controller('GoalsIndexController', function ($scope, $location, $mdDialog, $mdMedia, DatabaseService) {

    /**********************************/
    /********** MOCK METHODS **********/
    /**********************************/
    $scope.mockData = function () {
        console.log("Generating Mock Data");

        DatabaseService.clearGoals();
        
        var numOfMocks = 50;

        for (var i = 0; i < numOfMocks; i++) {
            var r = Math.pow(Math.random()*numOfMocks, 2).toFixed(0);
            var start = new Date(2016, 0, 3);
            var end = new Date(2017,5,31);
            var date = new Date(+start + Math.random() * (end - start)).toLocaleDateString();
            var category = Math.random() < 0.5 ? 'cat1' : 'cat2';
            
            var mockObject = {
                title: 'Title ' + r,
                description: 'Description ' + i,
                icon: 'assignment',
                progress: (Math.random()*100).toFixed(0),
                date: date,
                category: category
            };
            DatabaseService.addGoal(mockObject);
        }
        
        $scope.goals = DatabaseService.getAllGoals();
    };
    
    $scope.mockDelete = function() {
        DatabaseService.clearGoals();
        $scope.goals = DatabaseService.getAllGoals();
    };
    
    
    /**************************************/
    /********** MOCK METHODS END **********/
    /**************************************/
    
    $scope.search = {};
//    $scope.activeCategory = {};
    $scope.categories = DatabaseService.getCategories();

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
