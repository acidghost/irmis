/// <reference path="../../../typings/index.d.ts" />

let app = angular.module('irmisUisApp', [
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'pascalprecht.translate',
    'app.templates',
    'irmisUisApp.ui1'
]);


function configIt($locationProvider: ng.ILocationProvider,
                  $stateProvider: angular.ui.IStateProvider,
                  $urlRouterProvider: angular.ui.IUrlRouterProvider,
                  $translateProvider: angular.translate.ITranslateProvider) {

  const DEFAULT_LANG = 'en';

  $translateProvider.translations('en', {
    'navbar': {
      'brand': 'IRMIS UIs / Group 07',
      'ui1': 'Firist UI',
      'ui2': 'Second UI',
      'ui3': 'Third UI'
    },
    'welcome': 'Welcome',
    'welcome-small': 'Group 07 testing framework',
    'index': 'Choose the interface that you want to test from the navigation bar on top',
    'uis': {
      'rooms': 'Rooms',
      'heating': 'Heating',
      'energy': 'Energy',
      'groceries': 'Groceries',
      'services': 'Services',
      'bedroom': 'Bedroom',
      'kitchen': 'Kitchen',
      'living': 'Living',
      'bathroom': 'Bathroom',
      'lights': 'Lights',
      'windows': 'Windows',
      'curtains': 'Curtains',
      'doors': 'Doors',
      'emergencies': 'Emergencies',
      'telephone': 'Telephone',
      'category1': 'Category1',
      'category2': 'Category2',
      'milk': 'Milk',
      'eggs': 'Eggs',
      'vegetables': 'Vegetables',
      'chicken': 'Chicken',
      'haring': 'Haring',
      'submit': 'Submit'
    }
  });

  $translateProvider.translations('nl', {
    'navbar': {
      'brand': 'IRMIS UIs / Groep 07',
      'ui1': 'Eerste UI',
      'ui2': 'Tweede UI',
      'ui3': 'Derde UI'
    },
    'welcome': 'Welkom',
    'welcome-small': 'Groep 07 test omgeving',
    'index': 'Kies bovenin de gebruikersomgeving die u wilt testen.',
    'uis': {
      'rooms': 'Kamers',
      'heating': 'Verwarming',
      'energy': 'Energie',
      'groceries': 'Boodschappen',
      'services': 'Diensten',
      'bedroom': 'Slaapkamer',
      'kitchen': 'Keuken',
      'living': 'Woonkamer',
      'bathroom': 'Badkamer',
      'lights': 'Verlichting',
      'windows': 'Ramen',
      'curtains': 'Gordijnen',
      'doors': 'Deuren',
      'emergencies': 'Noodgevallen',
      'telephone': 'Telefoon',
      'category1': 'Categorie 1',
      'category2': 'Categorie 2',
      'milk': 'Melk',
      'eggs': 'Eieren',
      'vegetables': 'Groenten',
      'chicken': 'Kip',
      'haring': 'Haring',
      'submit': 'Verstuur'
    }
  });

  $translateProvider.preferredLanguage(DEFAULT_LANG);
  $translateProvider.useSanitizeValueStrategy(null);

  $locationProvider.html5Mode(false);

  $urlRouterProvider.otherwise('/');

  class RootCtrl {
    constructor($rootScope: angular.IRootScopeService,
                $translate: angular.translate.ITranslateService) {
      $rootScope.lang = DEFAULT_LANG;
      $rootScope.$watch('lang', (lang: string) => {
        $translate.use(lang);
      });
    }
  }

  const routes = {
    'root': {
      abstract: true,
      controller: ['$rootScope', '$translate', RootCtrl],
      templateUrl: 'app-templates/app/root.html'
    },
    'root.index': {
      url: '/',
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

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', configIt]);
