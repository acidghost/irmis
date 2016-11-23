/// <reference path="../../../typings/index.d.ts" />

module UI1 {

  type ActionFn = () => void;

  const $log = console;

  class MenuItem {
    public text: string;
    public layers: MenuItem[];
    public action: ActionFn;
    public active: boolean;
    public type: string = 'MenuItem';

    constructor(text: string, layers: MenuItem[] = [], action?: ActionFn, active: boolean = false) {
      this.text = text;
      this.active = active;
      this.layers = layers;
      this.action = action;
    }
  }

  class ToggableItem extends MenuItem {
    public on_off: boolean = false;
    public type: string = 'ToggableItem';

    toggle() {
      this.on_off = !this.on_off;
      if (this.action)
        this.action();
      $log.info(`${this.text} toggled`);
    }
  }

  class ButtonItem extends MenuItem {
    public type: string = 'ButtonItem';
  }

  class UI1Ctrl {
    private static room_layer(): MenuItem[] {
      return [
        new ToggableItem('uis.lights'),
        new ToggableItem('uis.windows'),
        new ToggableItem('uis.curtains'),
        new ToggableItem('uis.doors')
      ];
    }

    public ui_layers: MenuItem[];

    public activations: number[];
    private static DEPTH = 3;

    constructor(private $window: ng.IWindowService) {
      $log.info('UI1 started');
      this.activations = [];
      for (let i=0; i < UI1Ctrl.DEPTH - 1; i++)
        this.activations.push(null);

      this.ui_layers = [
        new MenuItem('uis.rooms', [
          new MenuItem('uis.bedroom', UI1Ctrl.room_layer()),
          new MenuItem('uis.kitchen', UI1Ctrl.room_layer()),
          new MenuItem('uis.living', UI1Ctrl.room_layer()),
          new MenuItem('uis.bathroom', UI1Ctrl.room_layer())
        ]),
        new MenuItem('uis.heating'),
        new MenuItem('uis.energy'),
        new MenuItem('uis.groceries', [
          new MenuItem('uis.category1', [
            new ToggableItem('uis.milk'),
            new ToggableItem('uis.eggs')
          ]),
          new MenuItem('uis.category2', [
            new ToggableItem('uis.vegetables'),
            new ToggableItem('uis.chicken'),
            new ToggableItem('uis.haring')
          ]),
          new ButtonItem('uis.submit', [], () => {
            $window.alert('Groceries submitted!');
          })
        ]),
        new MenuItem('uis.services', [
          new MenuItem('uis.emergencies'),
          new MenuItem('uis.telephone')
        ])
      ];
    }

    public click_item(depth: number, index: number, item: MenuItem) {
      if (depth < UI1Ctrl.DEPTH) {
        if (this.activations[depth] != null) {
          let items: MenuItem[];
          if (depth > 0) {
            items = this.ui_layers[this.activations[depth - 1]].layers
          } else {
            items = this.ui_layers;
          };
          for (let item of items) {
            item.active = false;
          }
        }
        for (let i = depth + 1; i < UI1Ctrl.DEPTH; i++)
          this.activations[i] = null;
        this.activations[depth] = index;
      }

      item.active = true;

      if (item.action)
        item.action();
    }
  }

  let ui1 = angular.module('irmisUisApp.ui1', []);
  ui1.controller('UI1Ctrl', ['$window', UI1Ctrl]);

}
