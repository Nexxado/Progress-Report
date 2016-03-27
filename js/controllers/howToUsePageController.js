angular.module('ProgressReport')

.controller('HowToUsePageController', function ($scope) {
//    $scope.pageClass = 'bounce-top'; //used for animation of ng-view
    
    $scope.slides = [
        {
            name: 'Not my cat.',
            url: 'img/howToUse/01.png'
        },
        {
            name: 'Again, not my cat.',
            url: 'img/howToUse/02.png'
        }]

});

