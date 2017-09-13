(function () {
  'use strict';

  angular
    .module('icebear')
    .controller('AuthController', AuthController)
  ;


  /* AUTHENTICATION CONTROLLER
   *  @desc : controller which contains methods related
   *          to authenticate the user
   */
  function AuthController ($scope, $state, AuthService) {

    this.login = function (f) {
      /* method to authenticate user credential
       * and signs in.
       */
      AuthService.login(f).then(function (resp) {
        if(resp) {
          $state.go('feed');
        } else {
          // show error message. invalid credentials
          console.log('Invalid Credentials');
        }
      });
    }; // .ENDOF this.login()

    this.logout = function () {
      /* method to clear authenticated user data
       */
      AuthService.logout().then(function () {
        $state.go('login');
      });
    };
  }

})();