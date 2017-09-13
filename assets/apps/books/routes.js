(function () {
  'use strict';

  angular
    .module('books.icebear')
    .config(routes)

  function routes ($stateProvider, TEMPLATE_URL) {
    $stateProvider
      .state('book-settings', {
        url           : '/books/:id/',
        templateUrl   : TEMPLATE_URL + 'book-settings.html',
        controller    : 'BookController',
        controllerAs  : 'ctrl'
      })
      .state('book-editor', {
        url           : '/books/:id/editor/',
        templateUrl   : TEMPLATE_URL + 'book-editor.html',
        controller    : 'BookEditorController',
        controllerAs  : 'ctrl'
      })
    ;
  }

})();