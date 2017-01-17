(function () {
    'use strict';
    angular.module('tripPlanner').controller('SetReminderCtrl', SetReminderCtrl);
    /** @ngInject */
    function SetReminderCtrl($scope, toastr, trip, $uibModal) {
        var vm = this;
        
        var defaultReminder = {date: new Date(), time: null, snooze:0};
        
        vm.dateOptions = {
            minDate: new Date()
        };
        
        vm.form = {
            reminder: angular.copy(trip.reminder || defaultReminder)
        };
        
        vm.form.reminder.date = moment(vm.form.reminder.date).toDate();
        vm.form.reminder.snooze = 0;
        
        vm.save = function(){
            trip.reminder = vm.form.reminder;
            vm.close();
        };
        
        vm.close = function(){
            $scope.$close();
        };
    }
})();