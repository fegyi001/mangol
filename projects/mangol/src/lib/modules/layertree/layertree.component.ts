import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Store } from '@ngxs/store';
import { of as observableOf, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MangolLayer } from '../../classes/Layer';
import { MangolLayerGroup } from '../../classes/LayerGroup';
import { MangolState } from '../../mangol.state';
import { ResetCursorMode } from '../../store/cursor.state';
import { MangolConfig } from './../../interfaces/config.interface';
import { MapService } from './../map/map.service';
import { LayertreeItemNode } from './classes/layertree-item-node.class';
import { LayertreeService } from './layertree.service';

@Component({
  selector: 'mangol-layertree',
  templateUrl: './layertree.component.html',
  styleUrls: ['./layertree.component.scss']
})
export class LayertreeComponent implements OnInit, OnDestroy {
  nestedTreeControl: NestedTreeControl<LayertreeItemNode>;
  nestedDataSource: MatTreeNestedDataSource<LayertreeItemNode>;
  checklistSelection = new SelectionModel<LayertreeItemNode>(true);

  tabSubscription: Subscription;

  constructor(
    private store: Store,
    private layertreeService: LayertreeService,
    private mapService: MapService
  ) {
    this.nestedTreeControl = new NestedTreeControl<LayertreeItemNode>(
      this.getChildren
    );
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.tabSubscription = this.store
      .select((state: MangolState) => state.sidebar.selectedModule)
      .pipe(filter(module => module === 'layertree'))
      .subscribe(module => {
        this.store.dispatch(new ResetCursorMode());
      });

    this.store
      .select(state => state.config.config)
      .subscribe((config: MangolConfig) => {
        if (
          typeof config !== 'undefined' &&
          config !== null &&
          !!config.map &&
          !!config.map.layers
        ) {
          const layers: (
            | MangolLayer
            | MangolLayerGroup)[] = config.map.layers.slice().reverse();
          this.nestedDataSource.data = this.layertreeService.processLayersAndLayerGroups(
            layers
          );
        } else {
          this.nestedDataSource.data = this.layertreeService.processLayersAndLayerGroups(
            this.mapService.getDefaultMap().layers
          );
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.tabSubscription) {
      this.tabSubscription.unsubscribe();
    }
  }

  private getChildren = (node: LayertreeItemNode) => {
    return observableOf(node.children);
  };

  hasNestedChild = (_: number, node: LayertreeItemNode) => {
    return (
      !!node.children &&
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
