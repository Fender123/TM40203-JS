'use strict';

angular.module('App.main', ['ngRoute', 'ngActivityIndicator'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/views/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$scope', '$rootScope', 'SearchManager', 'Query', '$activityIndicator', '$timeout', function($scope, $rootScope, SearchManager, Query, $activityIndicator, $timeout) {
        $scope.searchTerm = '';
        $scope.results = [];
        $scope.pages = 0;
        $scope.currentPage = 0;

        $scope.search = function($event){
            $event.preventDefault();

            Query.reset();
            Query.term = $scope.searchTerm;

            updateSearch();
        };

        $scope.gotoPage = function($event, pageNum){
            $event.preventDefault();

            Query.gotoPage(pageNum);
            updateSearch();
        };

        $scope.nextPage = function($event){
            $event.preventDefault();

            Query.gotoPage(Query.currentPage() + 1);
            updateSearch();
        };

        $scope.prevPage = function($event){
            $event.preventDefault();

            Query.gotoPage(Query.currentPage() - 1);
            updateSearch();
        };

        //Helper for paging loop
        $scope.range = function(n) {
            return new Array(n);
        };

        var updateSearch = function(){
            $activityIndicator.startAnimating();

            $scope.results = SearchManager.search($rootScope.global.datasourceKey, Query.getQuery()).then(function(results){
                $scope.results = results;

                buildPages();

                $activityIndicator.stopAnimating();
            });
        };

        var buildPages = function(){
            var res = $scope.results;

            var total = res.totalResults;

            var pages = Math.ceil(total / Query.length);
            var currentPage = Query.currentPage();

            $scope.pages = pages;
            $scope.currentPage = currentPage;
        };
    }]);