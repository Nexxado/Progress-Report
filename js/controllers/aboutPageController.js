angular.module('ProgressReport')

.controller('AboutPageController', function($scope) {
    $scope.pageClass = 'bounce-top'; //used for animation of ng-view
    
    $scope.libraries = [
        {
            'name' : 'AngularJS',
            'link' : 'https://angularjs.org/'
        } , {
            'name' : 'Angular Material',
            'link' : 'https://material.angularjs.org/'
        } , {
            'name' : 'jQuery',
            'link' : 'https://jquery.com/'
        } , {
            'name' : 'Chart.js',
            'link' : 'https://www.chartjs.org/'
        }];
    
});