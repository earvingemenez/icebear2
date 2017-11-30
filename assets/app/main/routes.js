function mainURL ($stateProvider, $urlRouterProvider, settings) {

  $stateProvider
    .state('index', {
      url          : '/',
      controller   : 'IndexCtrl',
      controllerAs : 'ctrl',
      templateUrl  : settings.TEMPLATE_URL + 'index.html'
    })
    .state('login', {
      url          : '/login/',
      controller   : 'LoginCtrl',
      controllerAs : 'ctrl',
      templateUrl  : settings.TEMPLATE_URL + 'login.html'    
    })
  ;

};


export { mainURL };