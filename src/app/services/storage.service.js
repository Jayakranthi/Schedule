(function () {
    'use strict';
    angular.module('tripPlanner')
        .factory('Store', StoreService);
    /** @ngInject */
    function ObjectStore(key) {
        this.key = key;
        this.__data = angular.fromJson(window.localStorage.getItem(this.key)) || [];
    }

    /** Add new Trip **/
    ObjectStore.prototype.add = function (value) {
        if (!angular.isObject(value)) {
            return false;
        }
        value.id = UUIDjs.create().hex;
        value.updatedOn = new Date();
        this.getAll().push(value);
        this.save();
        return true;
    };
  /** Update existing Trip **/
    ObjectStore.prototype.update = function (id, value) {
        if (!angular.isObject(value)) {
            return false;
        }
        var obj = this.getById(id);
        if (obj) {
            for (var k in value) {
                obj[k] = value[k];
            }
            obj.updatedOn = new Date();
            this.save();
            return true;
        }
        return false;
    };

  /** Delete Trip **/
  ObjectStore.prototype.delete = function (id) {
        var obj = this.getById(id);
        if (obj) {
            var index = this.getAll().indexOf(obj);
            if (index >= 0) {
                this.getAll().splice(index, 1);
                this.save();
                return true;
            }
        }
        return false;
    };
    ObjectStore.prototype.getById = function (id) {
        return this.getAll().filter(function (obj) {
            return obj.id === id;
        })[0];
    };
    ObjectStore.prototype.getAll = function(){
        return this.__data;
    };
    ObjectStore.prototype.save = function () {
        window.localStorage.setItem(this.key, angular.toJson(this.getAll()));
    };

    function StoreService() {
        var service = {};
        service.get = function (key) {
            return new ObjectStore(key);
        };

        return service;
    }
})();
