angular.module('ProgressReport') 

.config(function ($routeProvider) {
    
    $routeProvider.when('/', {
        redirectTo: '/home'
    })
    
    .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomePageController'
    })
    
    .when('/tasks', {
        templateUrl: 'templates/tasks/index.html',
        controller: 'TasksIndexController'
    })
    
    .when('/tasks/:id', {
        templateUrl: 'templates/tasks/show.html',
        controller: 'TasksShowController'
    })
    
    .otherwise('/');
});