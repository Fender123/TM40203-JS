'use strict';

angular.module('App.main', ['ngRoute'])

    .controller('MainListCtrl', ['$scope', 'Search', function($scope, Search) {
        $scope.results = Search.query();
    }]);