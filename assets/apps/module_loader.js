(function () {
  'use strict';

  var PRIVATE_MODULES = [
    '/static/apps/users/services.js',
    '/static/apps/users/routes.js'
  ]

  function userTokenExists () {
    return localStorage.getItem('_ut') ? true : false;
  };

  function loadModules () {
    if (!userTokenExists())
      return "No modules loaded";

    for(x=0;x<=PRIVATE_MODULES.length;x++) {
      var body = document.getElementsByTagName('body')[0];
      var script = document.createElement('script');
      script.src = PRIVATE_MODULES[x];
      script.type = 'text/javascript';

      body.appendChild(script);
    }
    return "modules loaded";
  }

  loadModules();

})();