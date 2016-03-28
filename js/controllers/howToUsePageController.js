angular.module('ProgressReport')

.controller('HowToUsePageController', function ($scope) {

    //     Scroll to appropriate position based on image index and width
    $scope.pageClass = 'bounce-top'; //used for animation of ng-view
    
    $scope.currentImage = 0;
    
    $scope.slides = [
        'img/howToUse/01.png',
        'img/howToUse/02.png',
        'img/howToUse/03.png',
        'img/howToUse/04.png',
        'img/howToUse/05.png',
        'img/howToUse/06.png',
        'img/howToUse/07.png',
        'img/howToUse/08.png',
        'img/howToUse/09.png',
        'img/howToUse/10.png',
        'img/howToUse/11.png',
        'img/howToUse/12.png',
        'img/howToUse/13.png',
        'img/howToUse/14.png'
    ];
    
    $scope.title = [
        "Welcome to Progress Report!",
        "Getting Started",
        "Goal List page",
        "Adding New Goal",
        "Create example goals for testing",
        "Filtering List Items",
        "Comparing Goals 1",
        "Comparing Goals 2",
        "Getting into Goal Info",
        "Moving between Goal tabs",
        "The Routine Tab",
        "The Achievement Tab",
        "The To Do Tab",
        "Back to Homepage"
        
    ];

    $scope.nextImage = function () {
        $scope.currentImage++;
        if ($scope.currentImage > $scope.slides.length - 1) {
            $scope.currentImage = 0;
        }
        $scope.updateCurrentImage();
    };

    $scope.prevImage = function () {
        $scope.currentImage--;
        if ($scope.currentImage < 0) {
            $scope.currentImage = $scope.slides.length - 1;
        }
        $scope.updateCurrentImage();
    };

    $scope.updateCurrentImage = function () {
        document.getElementById('imageSlide').src = $scope.slides[$scope.currentImage];
        $('#imageTitle').text($scope.title[$scope.currentImage]);
    };
});
