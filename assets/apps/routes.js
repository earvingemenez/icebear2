(function () {
  'use strict';

  angular
    .module('icebear')
    .config(routes)

  function routes ($urlMatcherFactoryProvider, $stateProvider,
    $locationProvider, $urlRouterProvider, TEMPLATE_URL) {

    $urlRouterProvider.otherwise('/login/');
    $urlMatcherFactoryProvider.strictMode(false);
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('legacy', {
        abstract : true,
        url      : '',
        template : '<ui-view></ui-view>'
      })
      .state('login', {
        url          : '/login/',
        templateUrl  : TEMPLATE_URL + 'login.html',
        controller   : 'AuthController',
        controllerAs : 'ctrl'
      })
    ;
  }

})();
