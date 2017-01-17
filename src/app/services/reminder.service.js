(function () {
    'use strict';
    angular.module('tripPlanner')
        .factory('ReminderService', ReminderService);

    function ReminderService(TripPlanner, $uibModal) {
        var service = {}, timer = null;
        
        var trips = TripPlanner.getAll();

        service.start = function(){
            timer = setInterval(_checkForReminder, 60000);
        };
        
        service.stop = function(){
            timer && timer.clearInterval();
            timer = null;
        };
        
        service.showReminder = function(trip){
            $uibModal.open({
                controller: 'ShowReminderCtrl'
                , templateUrl: '/app/show-reminder/show-reminder.html'
                , controllerAs: 'rm'
                , resolve: {
                    trip: function () {
                        return trip;
                    }
                }
            });
        };
        
        return service;
        
        function _checkForReminder(){
            trips.forEach(function(trip){
                if(trip.reminder){
                    var date = moment(trip.reminder.date).format('YYYY-MM-DD');
                    var time = moment(trip.reminder.time).format('HH:mm:ss');
                    var snooze = trip.reminder.snooze || 0;
                    if(moment(date+' '+time).add(snooze, 'minute').diff(moment(), 'minute')===0){
                        service.showReminder(trip);
                    }
                }
            });
        }
    }
})();