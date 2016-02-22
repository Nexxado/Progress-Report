angular.module('ProgressReport', ['ngRoute', 'ngAria', 'ngMessages', 'ngMaterial'])

.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('green');
});
