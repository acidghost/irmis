/// <reference path="../../../typings/index.d.ts" />

module UI1 {

  class UI1Ctrl {
    constructor() {
      console.info('UI1');
    }
  }

  let ui1 = angular.module('irmisUisApp.ui1', []);
  ui1.controller('UI1Ctrl', UI1Ctrl);

}
