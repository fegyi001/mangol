import { LayertreeItemNode } from './../Layertree.class';
import { Component, OnInit, Input } from '@angular/core';
import {
  layertreeVisibilityIconStateTrigger,
  slideStateTrigger
} from '../layertree.animations';

@Component({
  selector: 'mangol-layer-group',
  templateUrl: './layer-group.component.html',
  styleUrls: ['./layer-group.component.scss'],
  animations: [layertreeVisibilityIconStateTrigger, slideStateTrigger]
})
export class LayerGroupComponent implements OnInit {
  @Input() group: LayertreeItemNode;
  @Input() level: number;

  constructor() {}

  ngOnInit() {}

  toggleGroup() {
    this.group.checked = !this.group.checked;
  }
}
