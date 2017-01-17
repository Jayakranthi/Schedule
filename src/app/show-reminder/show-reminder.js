(function () {
    'use strict';
    angular.module('tripPlanner').controller('ShowReminderCtrl', ShowReminderCtrl);
    /** @ngInject */
    function ShowReminderCtrl($scope, trip, TripPlanner, $rootScope) {
        var vm = this;
        
        vm.times = [10, 15, 20, 30, 45, 60];
        
        vm.form = {
            snooze: 10
        };
        
        vm.open = function(){
            $rootScope.$broadcast('trip.edit', trip);
            vm.dismiss();
        };
        
        vm.snooze = function(){
            trip.reminder.snooze = vm.form.snooze;
            TripPlanner.save(trip.id, trip);
            vm.dismiss();
        };
        
        vm.dismiss = function(){
            $scope.$close();
        };
        
        vm.dismiss
    }
})();