'use strict';

angular.module('App.settings', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/settings', {
            templateUrl: '/app/views/settings.html',
            controller: 'SettingsCtrl'
        });
    }])

    .controller('SettingsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

    }]);