'use strict';

angular.module('App.main', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/views/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$scope', '$rootScope', 'SearchManager', 'Query', '$mdDialog', function($scope, $rootScope, SearchManager, Query, $mdDialog) {
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

        $scope.showSettings = function(){

        };

        $scope.resultsLazyLoader = {
            getItemAtIndex: function(index){
                console.log(index);
                return null;
            },
            getLength: function(){
                console.log($scope.results.length, $scope.totalResults);
                return $scope.results.length === 0 ? 0 : $scope.totalResults;
            }
        };

        var updateSearch = function(){
            //$activityIndicator.startAnimating();

            $scope.results = SearchManager.search($rootScope.global.datasourceKey, Query.getQuery()).then(function(results){
                $scope.results = results;

                $scope.totalResults = results.totalResults;

                buildPages();

                //$activityIndicator.stopAnimating();
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