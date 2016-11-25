/// <reference path="../../../typings/index.d.ts" />

module UI3 {

  const $log = console;


  interface IAnnyang {
    start(): void;
    setLanguage(lang: string): void;
    addCommands(commands: {}): void;
    removeCommands(commands: string|{}|string[]): void;
  }


  interface IUI3Window extends angular.IWindowService {
    annyang: IAnnyang;
  }


  class UI3Ctrl {
    private annyang: IAnnyang;
    private speechSynth: SpeechSynthesis;

    constructor($window: IUI3Window, private $rootScope: IRootCtrlScope) {
      this.annyang = $window.annyang;
      this.speechSynth = $window.speechSynthesis;
      if (this.annyang) {
        let speeches = {
          'en-US': {
            'turn on :space lights': (space: string) => {
              this.reply(`Lights turned on in ${space}`);
            },
            'turn off :space lights': (space: string) => {
              this.reply(`Lights turned off in ${space}`);
            },
            'open :space :object': (space: string, object: string) => {
              this.reply(`${object} opened in ${space}`);
            },
            'close :space :object': (space: string, object: string) => {
              this.reply(`${object} closed in ${space}`);
            },
            'add :object to shopping bag': (object: string) => {
              this.reply(`Added ${object} to shopping bag`);
            },
            'remove :object from shopping bag': (object: string) => {
              this.reply(`Removed ${object} from shopping bag`);
            },
            'send order': () => {
              this.reply('Sending order');
            }
          },
          'nl-NL': {}
        };

        $rootScope.$watch('lang', (lang: string) => {
          this.annyang.removeCommands(Object.keys(speeches[lang == 'en' ? 'en-US' : 'nl-NL']));

          let speechLang = `${lang}-${lang == 'en' ? 'US' : 'NL'}`;
          $log.info(`Speech lang is ${speechLang}`);
          this.annyang.setLanguage(speechLang);

          this.annyang.addCommands(speeches[speechLang]);
        });

        this.annyang.start();
      } else {
        $log.warn('annyang not available...');
      }
    }

    reply(msg: string) {
      $log.info(msg);
      let utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = this.$rootScope.lang;
      this.speechSynth.speak(utterance);
    }
  }


  angular
    .module('irmisUisApp.ui3', [])
    .controller('UI3Ctrl', ['$window', '$rootScope', UI3Ctrl]);

}
