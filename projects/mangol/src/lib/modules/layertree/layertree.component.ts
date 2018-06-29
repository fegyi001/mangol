import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Store } from '@ngxs/store';
import { of as observableOf } from 'rxjs';

import { MangolLayer } from '../../classes/Layer';
import { MangolLayerGroup } from '../../classes/LayerGroup';
import { MangolConfig } from './../../interfaces/config.interface';
import { LayertreeItemNode } from './classes/layertree-item-node.class';
import { LayertreeService } from './layertree.service';

@Component({
  selector: 'mangol-layertree',
  templateUrl: './layertree.component.html',
  styleUrls: ['./layertree.component.scss']
})
export class LayertreeComponent implements OnInit {
  nestedTreeControl: NestedTreeControl<LayertreeItemNode>;
  nestedDataSource: MatTreeNestedDataSource<LayertreeItemNode>;
  checklistSelection = new SelectionModel<LayertreeItemNode>(true);
  toggleDetailsText = 'Toggle details';

  constructor(
    private store: Store,
    private layertreeService: LayertreeService
  ) {
    this.nestedTreeControl = new NestedTreeControl<LayertreeItemNode>(
      this.getChildren
    );
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.store
      .select(state => state.config.config)
      .subscribe((config: MangolConfig) => {
        if (
          typeof config !== 'undefined' &&
          config !== null &&
          config.hasOwnProperty('map') &&
          config.map.hasOwnProperty('layers')
        ) {
          const layers: (
            | MangolLayer
            | MangolLayerGroup)[] = config.map.layers.slice().reverse();
          const data: LayertreeItemNode[] = this.layertreeService.processLayersAndLayerGroups(
            layers
          );
          this.nestedDataSource.data = data;
        }
      });
  }

  ngOnInit() {}

  private getChildren = (node: LayertreeItemNode) => {
    return observableOf(node.children);
  };

  hasNestedChild = (_: number, node: LayertreeItemNode) => {
    return (
      node.hasOwnProperty('children') &&
      Array.isArray(node.children) &&
      node.children.length > 0
    );
  };

  toggleCheckbox(node: LayertreeItemNode) {
    node.checked = !node.checked;
    node.layer.layer.setVisible(node.checked);
  }

  toggleLayergroup(node: LayertreeItemNode) {
    console.log(node);
  }
}
