angular.module('ProgressReport')

.controller('AddDialogController', function ($scope, $mdDialog) {
    
    $scope.goalDetails = {
        title: "",
        description: ""
    };
    
    
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    
    $scope.submit = function() {
        
        var description = $("input[name='description']").val();
        
        if (description.length < 5 || description.length > 150) {
            return;
        }
        
        $mdDialog.hide($scope.goalDetails);
    };
});