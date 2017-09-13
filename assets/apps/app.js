(function () {
  'use strict';

  angular.module('icebear', [
      'ui.router',
      'ui.bootstrap',
      'users.icebear',
      'books.icebear'
    ])
    .constant('TEMPLATE_URL', '/static/apps/templates/')
    .constant('API_URL', '/api/')
    .config(csrf)
    .config(header)
  ;

  /* CSRF TOKEN */
  function csrf($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  };

  /* USER TOKEN */
  function header($httpProvider) {
    $httpProvider.interceptors.push('HttpRequestInterceptor');
  }

})();