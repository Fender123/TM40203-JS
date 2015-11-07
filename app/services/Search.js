'use strict';

angular.module('App.service', ['ngResource'])

    .factory('Search', ['$resource', function($resource) {
        return $resource('https://raw.githubusercontent.com/franqus/TM40203-iOS/master/MockData/20151107_pubmed_mock.json', {

        }, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    }]);