/// <reference path="../../../typings/index.d.ts" />

module UI1 {

  type ActionFn = () => void;

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
      console.log(`${this.text} toggled`);
    }
  }

  class ButtonItem extends MenuItem {
    public type: string = 'ButtonItem';
  }

  class UI1Ctrl {
    private static room_layer(): MenuItem[] {
      return [
        new ToggableItem('Lights'),
        new ToggableItem('Windows'),
        new ToggableItem('Curtains'),
        new ToggableItem('Doors')
      ];
    }

    public ui_layers: MenuItem[] = [
      new MenuItem('Rooms', [
        new MenuItem('Bedroom', UI1Ctrl.room_layer()),
        new MenuItem('Kitchen', UI1Ctrl.room_layer()),
        new MenuItem('Living', UI1Ctrl.room_layer()),
        new MenuItem('Bathroom', UI1Ctrl.room_layer())
      ]),
      new MenuItem('Heating'),
      new MenuItem('Energy'),
      new MenuItem('Groceries', [
        new MenuItem('Category1', [
          new ToggableItem('Milk'),
          new ToggableItem('Eggs')
        ]),
        new MenuItem('Category2', [
          new ToggableItem('Vegetables'),
          new ToggableItem('Chicken'),
          new ToggableItem('Haring')
        ]),
        new ButtonItem('Submit', [], () => {
          window.alert('Groceries submitted!');
        })
      ]),
      new MenuItem('Services', [
        new MenuItem('Emergencies'),
        new MenuItem('Telephone')
      ])
    ];

    public activations: number[];
    private static DEPTH = 3;

    constructor(private $log: ng.ILogService) {
      $log.info('UI1 started');
      this.activations = [];
      for (let i=0; i < UI1Ctrl.DEPTH - 1; i++)
        this.activations.push(null);
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
  ui1.controller('UI1Ctrl', ['$log', UI1Ctrl]);

}
