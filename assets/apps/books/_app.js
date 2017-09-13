(function () {
  'use strict';

  angular
    .module('books.icebear', [])
    .constant('TEMPLATE_URL', '/static/apps/templates/books/')
    .constant('API_URL', '/api/books/')
  ;
})();