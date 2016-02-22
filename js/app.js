angular.module('ProgressReport', ['ngRoute', 'ngMaterial'])

.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('light-green');
});
