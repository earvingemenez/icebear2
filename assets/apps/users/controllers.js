(function () {
  'use strict';

  angular
    .module('users.icebear')
    .controller('UserController', UserController)
    .controller('FeedController', FeedController)
  ;


  /* FEED CONTROLLER
   *  @desc : controller which contains methods related
   *          to the user's feed
   */
  function FeedController ($scope, $state, AuthService) {
    $scope.user = undefined;

    $scope.$watch(function () {return AuthService.user; }, function () {
      $scope.user = AuthService.user;
    });
  };


  /* USER CONTROLLER
   *  @desc : controller which contains methods related to the
   *          user module
   */
  function UserController ($scope, $state, AuthService) {
    $scope.user = AuthService.user;


    this.isAuthenticated = function () {
      /* method that checks if a user is authenticated
       * or not.
       */
      $scope.user = AuthService.user;
      return AuthService.getToken() !== false ? true : false; 
    };

  };

})();