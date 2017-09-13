(function () {
  'use strict';

  angular
    .module('users.icebear')
    .config(routes)
  ;

  function routes ($stateProvider, TEMPLATE_URL) {

    $stateProvider
      .state('feed', {
        url          : '/feed/',
        templateUrl  : TEMPLATE_URL + 'feed.html',
        controller   : 'FeedController',
        controllerAs : 'ctrl'
      })
  }

})();