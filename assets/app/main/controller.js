class IndexCtrl {

  constructor ($scope) {
    console.log('angular is working');
  }

};

class LoginCtrl {

  constructor ($scope, AuthService) {
    this.$scope = $scope;
    this.AuthService = AuthService;
  }

  login (d) {
    /* method to authenticate user credential
     * and signs in.
     */
    this.AuthService.login(d).then(
      resp => {
        console.log("successful login");
      },
      resp => {
        console.log("invalid credentials");
      }
    );
  }

}

export { IndexCtrl, LoginCtrl };