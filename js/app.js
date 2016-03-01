angular.module('ProgressReport', ['ngRoute', 'ngAria', 'ngMessages', 'ngAnimate', 'ngMaterial'])

.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('green');
})

.constant('constants', {
    
    goalsKey: 'goals',
    categoryKey: 'categories'
    
});
