'use strict';

angular.module('App.service', ['ngResource'])

    //http://stackoverflow.com/questions/12633904/angularjs-resource-different-url-for-get-and-post
    .factory('Search', ['$resource', function($resource) {
        return $resource('https://raw.githubusercontent.com/franqus/TM40203-iOS/master/MockData/20151107_pubmed_mock.json', {

        }, {
            search: {
                method: 'GET'
            }
        });
    }])

    .factory('Query', [function(){
        var Query = {
            term: '',
            length: 10,
            index: 0,

            getQuery: function(){
                return {
                    query: this.getQueryString(),
                    lenght: this.length,
                    index: this.index
                };
            },

            getQueryString: function(){
                var fields = ['journal', 'authors', 'title', 'institutions', 'abstract', 'pmid'];
                var query = [];
                for(var f in fields){
                    if(fields.hasOwnProperty(f)){
                        query.push(fields[f] + ':"' + this.term + '"');
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