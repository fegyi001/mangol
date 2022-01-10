import { SelectionModel } from '@angular/cdk/collections'
import { NestedTreeControl } from '@angular/cdk/tree'
import { Component, OnDestroy } from '@angular/core'
import { MatTreeNestedDataSource } from '@angular/material/tree'
import { Store } from '@ngrx/store'
import { of as observableOf, Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'

import { MangolLayer } from '../../classes/Layer'
import { MangolLayerGroup } from '../../classes/LayerGroup'
import { MangolConfig } from '../../interfaces/config.interface'
import { MapService } from '../map/map.service'
import * as CursorActions from './../../store/cursor/cursor.actions'
import * as fromMangol from './../../store/mangol.reducers'
import { LayertreeItemNode } from './classes/layertree-item-node.class'
import { LayertreeService } from './layertree.service'

@Component({
  selector: 'mangol-layertree',
  templateUrl: './layertree.component.html',
  styleUrls: ['./layertree.component.scss']
})
export class LayertreeComponent implements OnDestroy {
  nestedTreeControl: NestedTreeControl<LayertreeItemNode>
  nestedDataSource: MatTreeNestedDataSource<LayertreeItemNode>
  checklistSelection = new SelectionModel<LayertreeItemNode>(true)

  tabSubscription: Subscription
  configSub: Subscription

  constructor(
    private store: Store<fromMangol.MangolState>,
    private layertreeService: LayertreeService,
    private mapService: MapService
  ) {
    this.nestedTreeControl = new NestedTreeControl<LayertreeItemNode>(
      this.getChildren
    )
    this.nestedDataSource = new MatTreeNestedDataSource()
    this.tabSubscription = this.store
      .select((state) => state.sidebar.selectedModule)
      .pipe(filter((module) => module === 'layertree'))
      .subscribe((_module) => {
        this.store.dispatch(new CursorActions.ResetMode())
      })

    this.configSub = this.store
      .select((state) => state.config.config)
      .subscribe((config: MangolConfig) => {
        if (
          typeof config !== 'undefined' &&
          config !== null &&
          !!config.map &&
          !!config.map.layers
        ) {
          const layers: (MangolLayer | MangolLayerGroup)[] = config.map.layers
            .slice()
            .reverse()
          this.nestedDataSource.data =
            this.layertreeService.processLayersAndLayerGroups(layers)
        } else {
          this.nestedDataSource.data =
            this.layertreeService.processLayersAndLayerGroups(
              this.mapService.getDefaultMap().layers
            )
        }
      })
  }

  ngOnDestroy() {
    if (this.tabSubscription) {
      this.tabSubscription.unsubscribe()
    }
    if (this.configSub) {
      this.configSub.unsubscribe()
    }
  }

  private getChildren = (node: LayertreeItemNode) => {
    return observableOf(node.children)
  }

  hasNestedChild = (_: number, node: LayertreeItemNode) => {
    return (
      !!node.children &&
      Array.isArray(node.children) &&
      node.children.length > 0
    )
  }

  toggleCheckbox(node: LayertreeItemNode) {
    node.checked = !node.checked
    node.layer.layer.setVisible(node.checked)
  }

  toggleLayergroup(node: LayertreeItemNode) {
    console.log(node)
  }
}
