class AuthService {

  constructor ($http, settings) {
    this.$http = $http;
    this.API_URL = settings.USER_API;
    this.user = undefined;
  }

  getToken () {
    /* method that returns the user_token.
     * returns false if token is unavailable.
     */
    var _ut = localStorage.getItem('_ut');
    if (!_ut) { return false; }

    return JSON.parse(_ut);
  };

  requestToken (d) {
    /* method to call the getToken API. it will evaluate
     * the user credentials and return a user_token if valid.
     */
    return this.$http.post(API_URL + 'auth/token/', d).then(
      (r) => {
        // successful login. save the token to the localStorage
        localStorage.setItem('_ut', JSON.stringify(r.data));
        return true;
      },
      (r) => {
        // fail.show error message
        return false;
      }
    )
  };

  clearToken () {
    /* method that clears the user_token
     */
    return localStorage.removeItem('_ut');
  };

  getAuthUser () {
    /* method that gets the authenticated user data
     */
    return 
  }

}

export { AuthService };