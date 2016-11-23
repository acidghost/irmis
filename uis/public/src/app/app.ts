/// <reference path="../../../typings/index.d.ts" />

let app = angular.module('irmisUisApp', [
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'app.templates',
    'irmisUisApp.ui1'
]);



class IndexCtrl {
  private x: number;

  constructor() {
    this.x = 0xAA;
  }
}

app.controller('IndexCtrl', [IndexCtrl]);



function configIt($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  const routes = {
    'root': {
      abstract: true,
      templateUrl: 'app-templates/app/root.html'
    },
    'root.index': {
      url: '/',
      controller: 'IndexCtrl',
      controllerAs: 'index',
      templateUrl: 'app-templates/app/ui-index.html'
    },
    'root.ui1': {
      url: '/ui1',
      controller: 'UI1Ctrl',
      controllerAs: 'ui1',
      templateUrl: 'app-templates/ui1/ui1.html'
    }
  };

  Object.keys(routes).forEach((route) => {
    $stateProvider.state(route, routes[route]);
  });
}

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', configIt]);
