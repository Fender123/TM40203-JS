'use strict';

angular.module('App', [
    'ngRoute',
    'App.main',
    'App.service'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }]);