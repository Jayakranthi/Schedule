(function() {
  'use strict';

  angular
    .module('tripPlanner')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, ReminderService) {
    ReminderService.start();
  }

})();
