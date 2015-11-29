'use strict';

angular.module('App.service', ['ngResource'])

    .factory('SearchStatic', ['$http', '$q', function($http, $q) {
        return {
            search: function(args){
                var deferred = $q.defer();

                $http.get('https://raw.githubusercontent.com/franqus/TM40203-iOS/master/MockData/20151107_pubmed_mock.json').success(function(data){
                    deferred.resolve(data);
                });

                return deferred.promise;
            }
        };
    }])

    .factory('SearchCSharp', ['$http', '$q', function($http, $q) {
        return {
            search: function(args){
                var deferred = $q.defer();

                var query = {
                    search: args.query,
                    startIndex: args.index,
                    length: args.length
                };

                $http.get('http://dhbw-master.cloudapp.net/lucene/Service1.svc/query', {params: query}).success(function(data){
                    //prepare data

                    var res = {
                        results: [],
                        totalResults: 0,
                        resultsPerPage: 10,
                        index: 0
                    };

                    if(data && typeof data.results !== 'undefined'){
                        var qr = data;

                        res.totalResults = qr.totalResults;
                        res.resultsPerPage = qr.resultsPerPage;
                        res.index = qr.index;

                        res.results = qr.results;
                    }

                    deferred.resolve(res);
                });

                return deferred.promise;
            }
        };
    }])

    .factory('SearchJava', ['$http', '$q', function($http, $q) {
        return {
            search: function(args){
                var deferred = $q.defer();

                var query = {
                    search: args.query,
                    startIndex: args.index,
                    length: args.length
                };

                $http.get('http://185.44.105.219:8080/ADM-Java-Service/lucene/query', {params: query}).success(function(data){
                    //prepare data

                    var res = {
                        results: [],
                        totalResults: 0,
                        resultsPerPage: 10,
                        index: 0
                    };

                    if(data && typeof data.results !== 'undefined'){
                        var qr = data;

                        res.totalResults = qr.totalResults;
                        res.resultsPerPage = qr.resultsPerPage;
                        res.index = qr.index;

                        res.results = qr.results;
                    }

                    deferred.resolve(res);
                });

                return deferred.promise;
            }
        };
    }])

    .service('SearchManager', ['SearchStatic', 'SearchCSharp', 'SearchJava', function(SearchStatic, SearchCSharp, SearchJava){
        var getDataSource = function(dsName){
            var ds = null;
            switch(dsName){
                case 'C#':
                    ds = SearchCSharp;
                    break;
                case 'Java':
                    ds = SearchJava;
                    break;
                case 'Static':
                    ds = SearchStatic;
                    break;
                default:
                    ds = SearchStatic;
                    break;
            }
            return ds;
        };
        return {
            search: function(dsKey, args){
                var ds = getDataSource(dsKey);
                return ds.search(args);
            }
        };
    }])

    .factory('Query', [function(){
        var Query = {
            term: '',
            length: 10,
            index: 0,

            getQuery: function(){
                return {
                    query: this.getQueryString(),
                    length: this.length,
                    index: this.index
                };
            },

            getQueryString: function(){
                var fields = ['journal', 'authors', 'title', 'institutions', 'abstract', 'pmid'];
                var query = [];
                for(var f in fields){
                    if(fields.hasOwnProperty(f)){
                        var searchValue = this.term;
                        if(searchValue.indexOf(' ') !== -1){
                            searchValue = '"' + searchValue + '"';
                        }
                        query.push(fields[f] + ':' + searchValue);
                    }
                }
                query = query.join(' ');
                return query;
            },

            gotoPage: function(page){
                this.index = this.length * page;
            },

            reset: function(){
                this.term = '';
                this.index = 0;
                this.length = 10;
            },

            currentPage: function(){
                return Math.floor(this.index / Query.length);
            }
        };

        return Query;
    }]);