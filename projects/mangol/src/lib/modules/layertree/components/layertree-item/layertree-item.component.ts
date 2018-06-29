import { Component, Input, OnInit } from '@angular/core';

import { LayertreeItemNode } from '../../classes/layertree-item-node.class';

@Component({
  selector: 'mangol-layertree-item',
  templateUrl: './layertree-item.component.html',
  styleUrls: ['./layertree-item.component.scss']
})
export class LayertreeItemComponent implements OnInit {
  @Input() items: LayertreeItemNode[];
  @Input() level: number;

  dictLayers = 'Layers';

  groupNodes: LayertreeItemNode[] = [];
  layerNodes: LayertreeItemNode[] = [];

  constructor() {}

  ngOnInit() {
    this.items.forEach(i => {
      if (i.hasOwnProperty('children')) {
        this.groupNodes.push(i);
      } else if (i.hasOwnProperty('layer')) {
        this.layerNodes.push(i);
      }
    });
  }

  getStyle() {
    return {
      'margin-left': (this.level === 0 ? 0 : 30) + 'px'
    };
  }
}
