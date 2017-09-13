(function () {
  'use strict';

  angular
    .module('users.icebear', [])
    .constant('TEMPLATE_URL', '/static/apps/templates/users/')
    .constant('API_URL', '/api/users/')
  ;
})();