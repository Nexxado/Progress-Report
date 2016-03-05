angular.module('ProgressReport', ['ngRoute', 'ngAria', 'ngMessages', 'ngAnimate', 'ngMaterial'])

.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('green');
})

.constant('constants', {
    
    goalType: {
        achievement: 'achievement',
        numerical: 'numerical',
        custom: 'custom'
    },
    //LocalStorage Keys
    goalsKey: 'goals',
    categoryKey: 'categories'
    
});
