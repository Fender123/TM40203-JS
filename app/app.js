'use strict';

angular.module('App', [
    'ngRoute',
    'ngMaterial',
    'ngMdIcons',
    'App.main',
    'App.service'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }])

    .config(function ($mdThemingProvider) {
        var customPrimary = {
            '50': '#ff6274',
            '100': '#ff495e',
            '200': '#ff2f47',
            '300': '#ff1631',
            '400': '#fb001d',
            '500': '#E2001A',
            '600': '#c80017',
            '700': '#af0014',
            '800': '#950011',
            '900': '#7c000e',
            'A100': '#ff7c8b',
            'A200': '#ff95a2',
            'A400': '#ffafb8',
            'A700': '#62000b',
            'contrastDefaultColor': 'light'
        };
        $mdThemingProvider
            .definePalette('customPrimary',
                customPrimary);

        var customAccent = {
            '50': '#ff6274',
            '100': '#ff495e',
            '200': '#ff2f47',
            '300': '#ff1631',
            '400': '#fb001d',
            '500': '#E2001A',
            '600': '#c80017',
            '700': '#af0014',
            '800': '#950011',
            '900': '#7c000e',
            'A100': '#ff7c8b',
            'A200': '#ff95a2',
            'A400': '#ffafb8',
            'A700': '#62000b',
            'contrastDefaultColor': 'light'
        };
        $mdThemingProvider
            .definePalette('customAccent',
                customAccent);

        var customWarn = {
            '50': '#ffb280',
            '100': '#ffa266',
            '200': '#ff934d',
            '300': '#ff8333',
            '400': '#ff741a',
            '500': '#ff6400',
            '600': '#e65a00',
            '700': '#cc5000',
            '800': '#b34600',
            '900': '#993c00',
            'A100': '#ffc199',
            'A200': '#ffd1b3',
            'A400': '#ffe0cc',
            'A700': '#803200'
        };
        $mdThemingProvider
            .definePalette('customWarn',
                customWarn);

        var customBackground = {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#ffffff',
            '300': '#ffffff',
            '400': '#ffffff',
            '500': '#fff',
            '600': '#f2f2f2',
            '700': '#e6e6e6',
            '800': '#d9d9d9',
            '900': '#cccccc',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#ffffff',
            'A700': '#bfbfbf'
        };
        $mdThemingProvider
            .definePalette('customBackground',
                customBackground);

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent')
            .warnPalette('customWarn')
            .backgroundPalette('customBackground')
    })

    .run(['$rootScope', function($rootScope){
        $rootScope.global = {};
        $rootScope.global.datasourceKey = 'C#';
    }]);