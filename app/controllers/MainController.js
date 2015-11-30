'use strict';

angular.module('App.main', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/main.html',
            controller: 'MainCtrl'
        });
    }])


    .filter('makeRange', function(){
        return function (input){
            var lowBound, highBound;
            switch (input.length){
                case 1:
                    lowBound = 0;
                    highBound = parseInt(input[0], 10) - 1;
                    break;
                case 2:
                    lowBound = parseInt(input[0], 10);
                    highBound = parseInt(input[1], 10);
                    break;
                default:
                    return input;
            }
            var result = [];
            for(var i = lowBound; i <= highBound; i++){
                result.push(i);
            }
            return result;
        }
    })

    .controller('MainCtrl', ['$scope', '$rootScope', 'SearchManager', 'Query', '$mdDialog', '$mdMedia', function($scope, $rootScope, SearchManager, Query, $mdDialog, $mdMedia) {
        $scope.$mdMedia = $mdMedia;
        $scope.search = {
            title: '',
            journal: '',
            authors: '',
            institutions: '',
            abstract: '',
            PMID: ''
        };
        $scope.advancedMode = false;
        $scope.results = [];
        $scope.pages = [0, 0];
        $scope.currentPage = 0;
        $scope.timing = false;
        $scope.loading = false;

        $scope.search = function($event){
            $event.preventDefault();

            Query.reset();
            if($scope.advancedMode) {
                Query.mode = Query.MODE_ADVANCED;
                Query.search = $scope.search;
            }else{
                Query.mode = Query.MODE_SIMPLE;
                Query.term = $scope.search.title;
            }

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

        $scope.toggleShowMore = function($event, result){
            $event.preventDefault();
            result.showAll = !result.showAll;
        };

        var resetSearch = function(){
            $scope.results = [];
            $scope.pages = [0, 0];
            $scope.currentPage = 0;
        };

        $scope.showSettingsDialog = function($event){
            $event.preventDefault();

            var parentEl = angular.element(document.body);
            $mdDialog.show({
                //parent: parentEl,
                targetEvent: $event,
                templateUrl: 'app/views/settings.html',
                clickOutsideToClose: true,
                controller: function DialogController($scope, $rootScope, $mdDialog) {
                    $scope.closeDialog = function(){
                        $mdDialog.hide();
                    };
                    $scope.datasourceKey = $rootScope.global.datasourceKey;
                    $scope.$watch('datasourceKey', function(){
                        if($rootScope.global.datasourceKey !== $scope.datasourceKey) {
                            resetSearch();
                        }
                        $rootScope.global.datasourceKey = $scope.datasourceKey;
                    })
                }
            });
        };

        var updateSearch = function(){
            //$activityIndicator.startAnimating();
            $scope.loading = true;

            var start = (new Date()).getTime();
            $scope.results = SearchManager.search($rootScope.global.datasourceKey, Query.getQuery()).then(function(results){
                //check if an error happend
                if(results === false){
                    var alert = $mdDialog.alert()
                        .title('Fehler beim Abrufen der Ergebnisse')
                        .content('Für deine Eingaben konnten leider keine Ergebnisse geladen werden. Bitte probiere es mit anderen Werten')
                        .ok('Schließen');
                    $mdDialog.show(alert)
                        .finally(function(){
                            alert = undefined;
                        });

                    $scope.loading = false;

                    return;
                }

                $scope.results = results;

                var end = (new Date()).getTime();
                $scope.timing = (end - start) / 1000;

                $scope.totalResults = results.totalResults;

                buildPages();

                //$activityIndicator.stopAnimating();
                $scope.loading = false;
            });
        };

        var buildPages = function(){
            var numPagesToShow = 10;

            var res = $scope.results;

            var total = res.totalResults;

            var pages = Math.ceil(total / Query.length);
            var currentPage = Query.currentPage();

            $scope.pages = [Math.max(0, currentPage - (numPagesToShow / 2)), Math.min(pages - 1, currentPage + (numPagesToShow / 2))];
            $scope.currentPage = currentPage;
        };
    }]);