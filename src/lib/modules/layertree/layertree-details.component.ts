import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';

import { MangolLayer, MangolLayergroup } from './../../core/_index';

@Component({
  selector: 'mangol-layertree-details',
  templateUrl: './layertree-details.component.html'
})
export class MangolLayertreeDetailsComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layertree-details';

  @Input() element: any;
  @Input() hovered: boolean;
  @Input() detailsHeight: string;

  @Output() elementClicked = new EventEmitter();

  items: any[];

  bgOpacity: number;

  constructor() {
    this.items = [];
    this.bgOpacity = 0.6;
  }

  public ngOnInit(): any {
    // this.items.push({
    //     type: 'opacity',
    //     cols: 1,
    //     rows: 1,
    //     color: [144, 238, 144],
    //     fontSet: "ms",
    //     fontIcon: "ms-transparency",
    //     toggled: false
    // });
    if (this.element instanceof MangolLayergroup) {
      this.items.push({
        type: 'expand',
        cols: 1,
        rows: 1,
        color: [173, 189, 241],
        fontSet: 'fa',
        fontIcon: 'fa-expand',
        toggled: this.element.hasOwnProperty('expanded') ? this.element.expanded : false,
        fontSetToggled: 'fa',
        fontIconToggled: 'fa-compress'
      });
    } else if (this.element instanceof MangolLayer) {
      this.items.push({
        type: 'visibility',
        cols: 1,
        rows: 1,
        color: [173, 216, 230],
        // color: [255, 182, 193],
        fontSet: 'fa',
        fontIcon: 'fa-eye',
        toggled: this.element.hasOwnProperty('visible') ? !this.element.getVisible() : false,
        fontSetToggled: 'fa',
        fontIconToggled: 'fa-eye-slash'
      });
      // this.items.push({
      //     type: 'style',
      //     cols: 1,
      //     rows: 1,
      //     color: [255, 182, 193],
      //     fontSet: 'ms',
      //     fontIcon: 'ms-style',
      //     toggled: false
      // });
    }
    // this.items.push({
    //     type: 'settings',
    //     cols: 1,
    //     rows: 1,
    //     color: [221, 189, 241],
    //     fontSet: 'fa',
    //     fontIcon: 'fa-cog',
    //     toggled: false
    // });
  }

  _calcRGBAColor(rgbArray: number[]) {
    if (rgbArray.length !== 3) {
      rgbArray = [255, 255, 255];
    }
    return 'rgba(' + rgbArray[0] + ',' + rgbArray[1] + ',' + rgbArray[2] + ', ' + this.bgOpacity + ')';
  }

  public onClick(item: any) {
    if (item.hasOwnProperty('toggled')) {
      item.toggled = !item.toggled;
    }
    var obj: any = {};
    obj.type = item.type;
    switch (obj.type) {
      case 'expand':
        break;
      case 'visibility':
        break;
      case 'opacity':
        break;
      case 'style':
        break;
      case 'settings':
        break;
      default:
        break;
    }
    this.elementClicked.emit(obj);
  }

}