import { Component, Input, OnInit } from '@angular/core';

import { LayertreeItemNode } from '../../classes/layertree-item-node.class';
import { slideStateTrigger } from '../../layertree.animations';

@Component({
  selector: 'mangol-layer-group',
  templateUrl: './layer-group.component.html',
  styleUrls: ['./layer-group.component.scss'],
  animations: [slideStateTrigger]
})
export class LayerGroupComponent implements OnInit {
  @Input() group: LayertreeItemNode;
  @Input() level: number;

  showBadges = true;
  dictGroups = 'Groups';
  displayLimit = 50;

  constructor() {}

  ngOnInit() {}

  toggleGroup() {
    this.group.checked = !this.group.checked;
  }
}
