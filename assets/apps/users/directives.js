(function () {
  'use strict';

  angular
    .module('users.icebear')
    .directive('mainNav', MainNavDirective)
  ;


  /* MAIN NAV DIRECTIVE
   *  @desc : directive that process, renders the nav component
   */
  function MainNavDirective (TEMPLATE_URL) {
    return {
      restrict : 'A',
      scope: {},
      templateUrl: TEMPLATE_URL + 'includes/nav.html',
      controller : 'UserController',
      controllerAs: 'ctrl',
      link: function ($scope, attr) {
      }
    }
  };
})();