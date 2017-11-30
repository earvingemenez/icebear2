import angular from 'angular';
import uirouter from 'angular-ui-router';

import 'angular-ui-bootstrap';

import { routes, csrf } from './app.config.js';
import { coreSettings } from './app.constants';

import { IndexCtrl, LoginCtrl } from './main/controller.js';
import { mainURL } from './main/routes.js';

import { AuthService } from './users/services.js';



const modules = [
  uirouter,
  'ui.bootstrap'
];


let app = angular.module('app', modules);

/* CORE CONFIG
 */
app.config(routes);
app.config(csrf);
app.constant('settings', coreSettings);


/* MAIN CONFIG
 */
app.config(mainURL);
app.controller('IndexCtrl', IndexCtrl);
app.controller('LoginCtrl', LoginCtrl);

/* USERS CONFIG
 */
app.service('AuthService', AuthService);


angular.bootstrap(document, ['app'])