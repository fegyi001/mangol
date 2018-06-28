import { LayertreeItemNode } from './../Layertree.class';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mangol-layer-group',
  templateUrl: './layer-group.component.html',
  styleUrls: ['./layer-group.component.scss']
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
