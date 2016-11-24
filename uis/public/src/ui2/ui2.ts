/// <reference path="../../../typings/index.d.ts" />

module UI2 {

  const $log = console;


  class ImageItem {
    public on_off: boolean = false;
    constructor(public title: string,
                public img_url: string,
                public clazz?: string) {}

    click() {
      $log.info(`${this.title} clicked`);
    }
  }


  abstract class IUI2Ctrl {
    public grid: ImageItem[][];
    constructor(grid: ImageItem[][]) {
      this.initGrid(grid);
    }
    protected initGrid(grid: ImageItem[][]) {
      this.grid = grid;
      let nrow = this.grid[0].length;
      let clazz = `col-xs-${Math.floor(12 / nrow)}`
      for (let row of this.grid)
        for (let item of row)
          item.clazz = clazz;
    }
  }


  class UI2T1Ctrl extends IUI2Ctrl {
    constructor() {
      super([
        [
          new ImageItem('uis.curtains_bed', 'img/curtains_bed.png'),
          new ImageItem('uis.curtains_bathroom', 'img/curtains_bathroom.png'),
          new ImageItem('uis.curtains_living', 'img/curtains_living.png'),
          new ImageItem('uis.curtains_kitchen', 'img/curtains_kitchen.png')
        ]
      ]);
    }
  }


  class UI2T2Ctrl extends IUI2Ctrl {
    constructor() {
      super([
        [
          new ImageItem('uis.door_bed', 'img/door_bed.png'),
          new ImageItem('uis.door_bathroom', 'img/door_bathroom.png'),
          new ImageItem('uis.door_living', 'img/door_living.png'),
          new ImageItem('uis.door_kitchen', 'img/door_kitchen.png')
        ]
      ]);
    }
  }


  angular
    .module('irmisUisApp.ui2', [])
    .controller('UI2T1Ctrl', [UI2T1Ctrl])
    .controller('UI2T2Ctrl', [UI2T2Ctrl]);

}
