'use strict';

angular.module('App.main', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/views/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$scope', 'Search', function($scope, Search) {
        $scope.searchTerm = '';

        $scope.search = function($event){
            $event.preventDefault();

            alert("Search: " + $scope.searchTerm);
        };

        $scope.results = Search.query();
    }]);