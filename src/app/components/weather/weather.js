'use strict';
angular.module('weather.widget', []).factory('weatherService', function ($http) {
    return {
        getWeather: function (location) {
            var weather = {
                temp: {}
                , clouds: null
            };
            $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&callback=JSON_CALLBACK&APPID=f9dbd911bc01df1d9ce563b2ba4d3209').success(function (data) {
                if (data) {
                    if (data.main) {
                        weather.temp.current = (data.main.temp *1.8) + 32
                        weather.temp.min = (data.main.temp_min * 1.8) + 32;
                        weather.temp.max = (data.main.temp_max * 1.8) + 32;
                    }
                    weather.clouds = data.clouds ? data.clouds.all : undefined;
                }
            });
            return weather;
        }
    };
}).filter('temp', function ($filter) {
    return function (input, precision) {
        if (!precision) {
            precision = 1;
        }
        var numberFilter = $filter('number');
        return numberFilter(input, precision) + '\u00B0F';
    };
}).directive('weatherIcon', function () {
    return {
        restrict: 'E'
        , replace: true
        , scope: {
            cloudiness: '@'
        }
        , controller: function ($scope) {
            $scope.imgurl = function () {
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                if ($scope.cloudiness < 20) {
                    return baseUrl + 'sunny.png';
                }
                else if ($scope.cloudiness < 90) {
                    return baseUrl + 'partly_cloudy.png';
                }
                else {
                    return baseUrl + 'cloudy.png';
                }
            };
        }
        , template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
    };
}).directive('weatherWidget', function (weatherService) {
    return {
        restrict: 'E'
        , replace: true
        , template: ['<div ng-show="location" style="border:1px solid #ddd; border-radius:5px; padding:5px 30px;background: cornflowerblue;margin-bottom:10px;">'
                     , '<h3>Weather in {{location}}</h3>'
            , '<weather-icon cloudiness="{{ weather.clouds }}"></weather-icon>'
            , '<h4>Current: {{ weather.temp.current | temp:2 }}</h4>'
            , 'min: {{ weather.temp.min | temp }}, max: {{ weather.temp.max | temp }}', '<div style="clear:both;"></div>', '</div>'].join('')
        , scope: {
            location: '='
        }
        , link: function (scope) {
            scope.weather = {};
            scope.$watch('location', function (nv, ov) {
                if (nv !== ov) {
                    scope.location = nv;
                    scope.getWeather(nv);
                }
            });
            scope.getWeather = function (loc) {
                if (loc) {
                    scope.weather = weatherService.getWeather(loc);
                }
            };
            scope.getWeather();
        }
    }
});
