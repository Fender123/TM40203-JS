'use strict';

angular.module('App', [
    'ngRoute',
    'ngMaterial',
    'ngMdIcons',
    'App.main',
    'App.settings',
    'App.service'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }])

    .run(['$rootScope', function($rootScope){
        $rootScope.global = {};
        $rootScope.global.datasourceKey = 'C#';
    }]);