(function () {
    'use strict';
    angular.module('tripPlanner').controller('MainController', MainController);
    /** @ngInject */
    function MainController($timeout, toastr, TripPlanner, $uibModal, $scope) {
        var vm = this;
        vm.TripRecord = TripPlanner.getAll();
        vm.form = TripPlanner.new();
        vm.search = {
            text: '', 
            category: ''
        };
        vm.searchTrip = function () {
            vm.search.text = vm.search.$text;
            vm.search.category = vm.search.$category;
        };
        
        vm.clearSearch = function(){
            vm.search.$text = '';
            vm.search.$category = '';
            vm.searchTrip();
        };
        
        vm.sort = {
            column: null,
            order:1
        };
        
        vm.sortByColumn = function(col){
            if(vm.sort.column === col){
                vm.sort.order = !vm.sort.order;
            }
            vm.sort.column = col;
        };
        
        vm.dateOptions = {
            minDate: new Date()
        };
        vm.newTrip = function () {
            vm.form = TripPlanner.new();
        };
        vm.setReminder = function () {
            $uibModal.open({
                controller: 'SetReminderCtrl'
                , templateUrl: '/app/set-reminder/set-reminder.html'
                , controllerAs: 'rm'
                , resolve: {
                    trip: function () {
                        return vm.form;
                    }
                }
            });
        };
        vm.edit = function (trip) {
            var _tripCopy = angular.copy(trip);
            _tripCopy.startDate = moment(_tripCopy.startDate).toDate();
            _tripCopy.endDate = moment(_tripCopy.endDate).toDate();
            vm.form = _tripCopy;
        };
        vm.delete = function () {
            if (TripPlanner.delete(vm.form.id)) {
                toastr.success('Trip record deleted successfully');
                vm.newTrip();
            }
            else {
                toastr.error('Unable to process. Please try again');
            }
        };
        vm.save = function () {
            var success = false
                , message = '';
            if (vm.form.id) {
                success = TripPlanner.update(vm.form.id, vm.form);
                message = 'Trip updated successfully';
            }
            else {
                success = TripPlanner.add(vm.form);
                message = 'Trip added successfully';
            }
            if (success) {
                toastr.success(message);
                vm.newTrip();
            }
            else {
                toastr.error('Unable to process. Please try again');
            }
        };
        //grid functions
        vm.getTripDuration = function (trip) {
            return moment(trip.endDate).diff(moment(trip.startDate), 'd');
        };
        vm.getTodoReport = function (trip) {
            var completed = trip.todo.filter(function (t) {
                return t.completed;
            });
            return completed.length + '/' + trip.todo.length;
        };
        vm.getTripState = function (trip) {
            var completed = trip.todo.filter(function (t) {
                return t.completed;
            });
            if (completed.length === trip.todo.length) return 'Ready';
            else if (!completed.length) return 'Created';
            else {
                return 'In Progress';
            }
        };
        
        $scope.$on('trip.edit', function(e, trip){
            vm.edit(trip);
        });
    }
})();