angular.module('ProgressReport')

.config(function ($routeProvider) {

    $routeProvider.when('/', {
        redirectTo: '/home'
    })

    .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomePageController'
    })

    .when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'AboutPageController'
    })

    .when('/howToUse', {
        templateUrl: 'templates/howToUse.html',
        controller: 'HowToUsePageController'
    })
    
    .when('/goals', {
        templateUrl: 'templates/goals/index.html',
        controller: 'GoalsIndexController'
    })

    .when('/goals/:id', {
        templateUrl: 'templates/goals/show.html',
        controller: 'GoalsShowController'
    })

    .otherwise('/');
});
