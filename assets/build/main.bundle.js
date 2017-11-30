webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = __webpack_require__(1);

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

__webpack_require__(2);

var _appConfig = __webpack_require__(6);

var _app = __webpack_require__(7);

var _controller = __webpack_require__(8);

var _routes = __webpack_require__(9);

var _services = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modules = [_angularUiRouter2.default, 'ui.bootstrap'];

var app = _angular2.default.module('app', modules);

/* CORE CONFIG
 */
app.config(_appConfig.routes);
app.config(_appConfig.csrf);
app.constant('settings', _app.coreSettings);

/* MAIN CONFIG
 */
app.config(_routes.mainURL);
app.controller('IndexCtrl', _controller.IndexCtrl);
app.controller('LoginCtrl', _controller.LoginCtrl);

/* USERS CONFIG
 */
app.service('AuthService', _services.AuthService);

_angular2.default.bootstrap(document, ['app']);

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function routes($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, settings) {

  $urlRouterProvider.otherwise('/');
  $urlMatcherFactoryProvider.strictMode(false);
  $locationProvider.html5Mode(true);
};

function csrf($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
};

exports.routes = routes;
exports.csrf = csrf;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var coreSettings = {
  API_URL: '/api/',
  USER_URL: '/api/users/',
  TEMPLATE_URL: '/static/app/templates/'
};

exports.coreSettings = coreSettings;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IndexCtrl = function IndexCtrl($scope) {
  _classCallCheck(this, IndexCtrl);

  console.log('angular is working');
};

;

var LoginCtrl = function () {
  function LoginCtrl($scope, AuthService) {
    _classCallCheck(this, LoginCtrl);

    this.$scope = $scope;
    this.AuthService = AuthService;
  }

  _createClass(LoginCtrl, [{
    key: "login",
    value: function login(d) {
      /* method to authenticate user credential
       * and signs in.
       */
      this.AuthService.login(d).then(function (resp) {
        console.log("successful login");
      }, function (resp) {
        console.log("invalid credentials");
      });
    }
  }]);

  return LoginCtrl;
}();

exports.IndexCtrl = IndexCtrl;
exports.LoginCtrl = LoginCtrl;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function mainURL($stateProvider, $urlRouterProvider, settings) {

  $stateProvider.state('index', {
    url: '/',
    controller: 'IndexCtrl',
    controllerAs: 'ctrl',
    templateUrl: settings.TEMPLATE_URL + 'index.html'
  }).state('login', {
    url: '/login/',
    controller: 'LoginCtrl',
    controllerAs: 'ctrl',
    templateUrl: settings.TEMPLATE_URL + 'login.html'
  });
};

exports.mainURL = mainURL;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthService = function () {
  function AuthService($http, settings) {
    _classCallCheck(this, AuthService);

    this.$http = $http;
    this.API_URL = settings.USER_API;
    this.user = undefined;
  }

  _createClass(AuthService, [{
    key: 'getToken',
    value: function getToken() {
      /* method that returns the user_token.
       * returns false if token is unavailable.
       */
      var _ut = localStorage.getItem('_ut');
      if (!_ut) {
        return false;
      }

      return JSON.parse(_ut);
    }
  }, {
    key: 'requestToken',
    value: function requestToken(d) {
      /* method to call the getToken API. it will evaluate
       * the user credentials and return a user_token if valid.
       */
      return this.$http.post(API_URL + 'auth/token/', d).then(function (r) {
        // successful login. save the token to the localStorage
        localStorage.setItem('_ut', JSON.stringify(r.data));
        return true;
      }, function (r) {
        // fail.show error message
        return false;
      });
    }
  }, {
    key: 'clearToken',
    value: function clearToken() {
      /* method that clears the user_token
       */
      return localStorage.removeItem('_ut');
    }
  }, {
    key: 'getAuthUser',
    value: function getAuthUser() {
      /* method that gets the authenticated user data
       */
      return;
    }
  }]);

  return AuthService;
}();

exports.AuthService = AuthService;

/***/ })
],[3]);