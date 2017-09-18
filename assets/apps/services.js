(function () {
  'use strict';

  angular
    .module('icebear')
    .service('AuthService', AuthService)
    .service('HttpRequestInterceptor', HttpRequestInterceptor)
  ;


  /* AUTHENTICATION SERVICE
   *  @desc : service which contains methods related
   *         to user authentication
   */
  function AuthService ($http, API_URL) {
    var fns = {
      'login': requestToken,
      'logout': clearToken,
      'getToken': getToken,
      'user': undefined
    }

    // check first if the user is already logged-in
    // if not then ignore executing this func.
    if (fns.getToken()) {
      authUser();
    }

    return fns;

    
    function requestToken (d) {
      /* method to call the getToken API. it will evaluate
       * the user credentials and return a user_token if valid.
       */
      return $http.post(API_URL + 'users/auth/token/', d).then(
        function (r) {
          // successful login. save the token to the localStorage
          localStorage.setItem('_ut', JSON.stringify(r.data));
          return true;
        },
        function (r) {
          // fail.show error message
          return false;
        }
      )
    };

    function getToken () {
      /* method that returns the user_token.
       * returns false if token is unavailable.
       */
      var _ut = localStorage.getItem('_ut');
      if (!_ut) { return false; }

      return JSON.parse(_ut);
    };

    function clearToken () {
      // method that clears the user_token
      return localStorage.removeItem('_ut');
    };

    function authUser () {
      // method that gets the authenticated user data
      return $http.get(API_URL + 'users/auth/user/').then(
        function (r) {
          // save the user data
          fns.user = r.data;
          return r;
        }
      )
    };
  };


  /* HTTP INTERCEPTOR
   *  @desc : http interceptor is used to set the http header
   *          and add user token of all the requests to the server.
   */
  function HttpRequestInterceptor () {

    function getToken () {
      /* method that returns the user_token.
       * returns false if token is unavailable.
       */
      var _ut = localStorage.getItem('_ut');
      if (!_ut) { return false; }

      return JSON.parse(_ut);
    };

    return {
      request: function (conf) {
        conf.headers['Authorization'] = "token " + getToken().token;
        conf.headers['Content-Type'] = "application/json";

        return conf;
      }
    };
  };

})();