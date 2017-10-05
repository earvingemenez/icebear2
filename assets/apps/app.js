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
    .run(scope)
  ;

  /* CSRF TOKEN */
  function csrf($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  };

  /* USER TOKEN */
  function header($httpProvider) {
    $httpProvider.interceptors.push('HttpRequestInterceptor');
  };

  function scope ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  };

})();