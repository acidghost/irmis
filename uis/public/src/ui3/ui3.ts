/// <reference path="../../../typings/index.d.ts" />

module UI3 {

  const $log = console;


  interface IAnnyang {
    start(): void;
    abort(): void;
    pause(): void;
    resume(): void;
    setLanguage(lang: string): void;
    addCommands(commands: {}): void;
    removeCommands(commands: string|{}|string[]): void;
    debug(onoff: boolean): void;
  }


  interface IUI3Window extends angular.IWindowService {
    annyang: IAnnyang;
  }


  class UI3Ctrl {
    private annyang: IAnnyang;
    private speechSynth: SpeechSynthesis;
    public mic: boolean = false;

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
          'nl-NL': {
            'doe de lichten in de :space aan': (space: string) => {
              this.reply(`Lichten in de ${space} zijn aan`);
            },
            'doe de lichten in de :space uit': (space: string) => {
              this.reply(`Lichten in de ${space} zijn uit`);
            },
            'open :object in :space': (space: string, object: string) => {
              this.reply(`${object} in ${space} zijn geopend`);
            },
            'sluit :object in :space': (space: string, object: string) => {
              this.reply(`${object} in ${space} zijn gesloten`);
            },
            'voeg :object toe aan winkelmand': (object: string) => {
              this.reply(`${object} is aan de winkelmand toegevoed`);
            },
            'verwijder :object uit de winkelmand': (object: string) => {
              this.reply(`${object} is uit de winkelmand verwijderd`);
            },
            'verstuur opdracht': () => {
              this.reply('De opdracht is verzonden');
            }
          }
        };

        $rootScope.$watch('lang', (lang: string) => {
          let speechLang = `${lang}-${lang == 'en' ? 'US' : 'NL'}`;
          this.annyang.removeCommands(Object.keys(speeches[speechLang]));

          $log.info(`Speech lang is ${speechLang}`);
          this.annyang.setLanguage(speechLang);

          this.annyang.addCommands(speeches[speechLang]);
        });

        this.annyang.debug(true);
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

    clickMic(mic: boolean) {
      if (mic) {
        $log.info('Resuming...');
        this.annyang.resume();
      } else {
        $log.info('Pausing...');
        this.annyang.pause();
      }
    }
  }


  angular
    .module('irmisUisApp.ui3', [])
    .controller('UI3Ctrl', ['$window', '$rootScope', UI3Ctrl]);

}
