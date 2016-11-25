/// <reference path="../../../typings/index.d.ts" />

let app = angular.module('irmisUisApp', [
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'pascalprecht.translate',
    'app.templates',
    'irmisUisApp.ui1',
    'irmisUisApp.ui2',
    'irmisUisApp.ui3'
]);


class AvailLang {
  code: string;
  text: string;
  constructor(code: string, text: string) {
    this.code = code;
    this.text = text;
  }
  getExtCode(): string {
    switch (this.code) {
      case 'en':
        return 'en-US';
      case 'nl':
        return 'nl-NL';
      case 'it':
        return 'it-IT';
      default:
        throw new Error(`${this.code} not supported!`);
    }
  }
}

const LANG_EN = new AvailLang('en', 'EN');
const LANG_NL = new AvailLang('nl', 'NL');
const LANG_IT = new AvailLang('it', 'IT');
const LANG_DEFAULT = LANG_EN;


interface IRootCtrlScope extends angular.IRootScopeService {
  lang: AvailLang;
  availLangs: AvailLang[];
  root: { langCode: string };   // to make lang radio btn work...
}

class RootCtrl {
  constructor($scope: IRootCtrlScope,
              $translate: angular.translate.ITranslateService) {
    $scope.availLangs = [ LANG_EN, LANG_NL, LANG_IT ];
    $scope.lang = LANG_DEFAULT;
    $scope.root = { langCode: LANG_DEFAULT.code };
    $scope.$watch('root.langCode', (langCode: string) => {
      $translate.use(langCode);
      for (let l of $scope.availLangs) {
        if (l.code == langCode) {
          $scope.lang = l;
          break;
        }
      }
    });
  }
}


function configIt($locationProvider: ng.ILocationProvider,
                  $stateProvider: angular.ui.IStateProvider,
                  $urlRouterProvider: angular.ui.IUrlRouterProvider,
                  $translateProvider: angular.translate.ITranslateProvider) {

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
      'submit': 'Submit',
      'task1': 'Curtains',
      'task2': 'Doors',
      'task3': 'Groceries'
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
      'submit': 'Verstuur',
      'task1': 'Gordijnen',
      'task2': 'Deuren',
      'task3': 'Boodschappen'
    }
  });

  $translateProvider.translations('it', {
    'navbar': {
      'brand': 'IRMIS UIs / Group 07',
      'ui1': 'Prima UI',
      'ui2': 'Seconda UI',
      'ui3': 'Terza UI'
    },
    'welcome': 'Benvenuto',
    'welcome-small': 'Group 07 testing framework',
    'index': 'Scegli l\'interfaccia che vuoi testare dal menu qui in alto',
    'uis': {
      'rooms': 'Stanze',
      'heating': 'Termostato',
      'energy': 'Energia',
      'groceries': 'Spesa',
      'services': 'Servizi',
      'bedroom': 'Camera da letto',
      'kitchen': 'Cucina',
      'living': 'Salone',
      'bathroom': 'Bagno',
      'lights': 'Luci',
      'windows': 'Finestre',
      'curtains': 'Tende',
      'doors': 'Porte',
      'emergencies': 'Emergenza',
      'telephone': 'Telefono',
      'category1': 'Categoria1',
      'category2': 'Categoria2',
      'milk': 'Latte',
      'eggs': 'Uova',
      'vegetables': 'Verdura',
      'chicken': 'Pollo',
      'haring': 'Aringhe',
      'submit': 'Invia',
      'task1': 'Tende',
      'task2': 'Porte',
      'task3': 'Spesa'
    }
  });

  $translateProvider.preferredLanguage(LANG_DEFAULT.code);
  $translateProvider.useSanitizeValueStrategy(null);

  $locationProvider.html5Mode(false);

  $urlRouterProvider.otherwise('/');

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
    },
    'root.ui2': {
      url: '/ui2',
      templateUrl: 'app-templates/ui2/ui2.html'
    },
    'root.ui2.task1': {
      url: '/task1',
      controller: 'UI2T1Ctrl',
      controllerAs: 'ui2',
      templateUrl: 'app-templates/ui2/task.html'
    },
    'root.ui2.task2': {
      url: '/task2',
      controller: 'UI2T2Ctrl',
      controllerAs: 'ui2',
      templateUrl: 'app-templates/ui2/task.html'
    },
    'root.ui2.task3': {
      url: '/task3',
      controller: 'UI2T3Ctrl',
      controllerAs: 'ui2',
      templateUrl: 'app-templates/ui2/task.html'
    },
    'root.ui3': {
      url: '/ui3',
      controller: 'UI3Ctrl',
      controllerAs: 'ui3',
      templateUrl: 'app-templates/ui3/ui3.html'
    }
  };

  Object.keys(routes).forEach((route) => {
    $stateProvider.state(route, routes[route]);
  });
}

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', configIt]);
