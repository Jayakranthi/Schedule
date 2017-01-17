(function () {
    'use strict';
    angular.module('tripPlanner').directive('todo', todo);
    /** @ngInject */
    function todo() {
        var directive = {
            restrict: 'E'
            , require: 'ngModel'
            , templateUrl: 'app/components/todo/todo.html'
            , scope: {
                todo:'=ngModel'
            }
            , link: TodoLink
        };
        return directive;
        /** @ngInject */
        function TodoLink(scope, elm, att, ngModelCtrl) {
            scope.todo = scope.todo || [];
            
            scope.todoField = '';
            
            scope.add = function(e){
                e.preventDefault();
                if(e.keyCode !== 13){
                    return false;
                }
                if(scope.todoField.trim()){
                    scope.todo.unshift({
                        completed: false,
                        description: scope.todoField
                    });
                    scope.todoField = '';
                    ngModelCtrl.$setViewValue(scope.todo);
                }
            };
            
            scope.remove = function(todo){
                var index = scope.todo.indexOf(todo);
                (index>=0) && scope.todo.splice(index, 1);
                ngModelCtrl.$setViewValue(scope.todo);
            };
        }
    }
})();