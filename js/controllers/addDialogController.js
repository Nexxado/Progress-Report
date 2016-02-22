angular.module('ProgressReport')

.controller('AddDialogController', function ($scope, $mdDialog, LocalStorageService) {
    
    $scope.taskDetails = {
        title: "",
        description: ""
    };
    
    
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    
    $scope.submit = function() {
                
        $mdDialog.hide($scope.taskDetails);
    };
});