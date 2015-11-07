'use strict';

angular.module('App.main', ['ngRoute', 'ngActivityIndicator'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/views/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$scope', 'Search', 'Query', '$activityIndicator', '$timeout', function($scope, Search, Query, $activityIndicator, $timeout) {
        $scope.searchTerm = '';
        $scope.results = [];
        $scope.pages = 0;
        $scope.currentPage = 0;

        var BoundSearch = Search;

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

            BoundSearch = Search.bind(Query.getQuery());
            $scope.results = BoundSearch.search({}, function(){
                buildPages();

                $activityIndicator.stopAnimating();
            });
        };

        var buildPages = function(){
            var res = $scope.results;

            var cIndex = Query.index;
            var total = res.totalResults;

            //TODO remove
            total = 28;

            var pages = Math.ceil(total / Query.length);
            var currentPage = Query.currentPage();

            $scope.pages = pages;
            $scope.currentPage = currentPage;
        };
    }]);