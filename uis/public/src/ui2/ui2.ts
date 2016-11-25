/// <reference path="../../../typings/index.d.ts" />

module UI2 {

  const $log = console;


  abstract class Item {
    type: string;
    constructor(public text: string, public clazz?: string) {}
    public click() {
      $log.info(`${this.text} clicked`);
    }
  }


  class ImageItem extends Item {
    public type: string = 'ImageItem';
    public on_off: boolean = false;
    constructor(text: string, public img_url: string) {
      super(text);
    }
  }


  class BtnItem extends Item {
    public type: string = 'BtnItem';
    constructor(text: string, private action: () => void) {
      super(text);
    }
    click() {
      this.action();
    }
  }


  abstract class IUI2Ctrl {
    public grid: Item[][];
    constructor(grid: Item[][]) {
      this.initGrid(grid);
    }
    protected initGrid(grid: Item[][]) {
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


  class UI2T3Ctrl extends IUI2Ctrl {
    constructor($window: angular.IWindowService) {
      super([
        [
          new ImageItem('uis.broccoli', 'img/broccoli.jpeg'),
          new ImageItem('uis.carrots', 'img/carrots.jpeg'),
          new ImageItem('uis.eggs', 'img/eggs.jpeg')
        ], [
          new ImageItem('uis.milk', 'img/milk.jpeg'),
          new ImageItem('uis.tomatoes', 'img/tomatoes.jpeg'),
          new BtnItem('uis.submit', () => {
            $window.alert('Groceries submitted!');
          })
        ]
      ]);
    }
  }


  angular
    .module('irmisUisApp.ui2', [])
    .controller('UI2T1Ctrl', [UI2T1Ctrl])
    .controller('UI2T2Ctrl', [UI2T2Ctrl])
    .controller('UI2T3Ctrl', ['$window', UI2T3Ctrl]);

}
