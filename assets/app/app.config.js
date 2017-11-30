function routes($stateProvider,
  $urlRouterProvider,
  $urlMatcherFactoryProvider,
  $locationProvider,
  settings) {
  
  $urlRouterProvider.otherwise('/');
  $urlMatcherFactoryProvider.strictMode(false);
  $locationProvider.html5Mode(true);
};


function csrf($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
};


export { routes, csrf };