(function () {
    'use strict';
    angular.module('tripPlanner').factory('TripPlanner', TripPlanner);
    /** @ngInject */
    function TRIP_MODEL() {
        return {
            title: ''
            , destination: ''
            , category: ''
            , startDate: ''
            , endDate: ''
            , todo: []
        };
    }

    function TripPlanner(Store) {
        var STORE_KEY = '__TRIP_PLANNER__';
        
        var trip = Store.get(STORE_KEY);
        
        trip.new = TRIP_MODEL;
        
        return trip;
    }
})();