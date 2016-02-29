angular.module('ProgressReport')

.controller('AddDialogController', function ($scope, $mdDialog) {
    
    $scope.goalDetails = {
        title: "",
        description: "",
        date: "",
        icon: ""
    };
    
    $scope.minDate = new Date();
    $scope.maxDate = new Date(
        $scope.minDate.getFullYear() + 1,
        $scope.minDate.getMonth() + 6,
        $scope.minDate.getDate()
    );
    
    
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    
    $scope.submit = function() {
        
        console.log("date: " + $scope.goalDetails.date);
        if(!$scope.validateDialog()) {
            return;
        }
        
        $mdDialog.hide($scope.goalDetails);
    };
    
    /**********************************/
    $scope.validateDialog = function() {
        
        var description = $("input[name='description']").val();
        if (description.length < 5 || description.length > 150) {
            return false;
        }
        
        var date = $scope.goalDetails.date;
        if(date === '') {
            return false;
        }
        
        return true;
    };
});