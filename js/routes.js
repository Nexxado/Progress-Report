angular.module('ProgressReport') 

.config(function ($routeProvider) {
    
    $routeProvider.when('/', {
        redirectTo: '/home'
    })
    
    .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomePageController'
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