import { MangolState } from './../../../../mangol.state';
import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { LayertreeItemNode } from '../../classes/layertree-item-node.class';
import { slideStateTrigger } from '../../layertree.animations';
import { LayerGroupDetailItem } from './../../interfaces/layergroup-detail-item.interface';
import { MangolLayerGroup } from '../../../../classes/LayerGroup';
import { LayertreeDictionary } from '../../../../store/layertree.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'mangol-layer-group',
  templateUrl: './layer-group.component.html',
  styleUrls: ['./layer-group.component.scss'],
  animations: [slideStateTrigger]
})
export class LayerGroupComponent implements OnInit, OnDestroy {
  @Input() group: LayertreeItemNode;
  @Input() level: number;

  dictionary$: Observable<LayertreeDictionary>;
  showBadges$: Observable<boolean>;
  displayLimit = 50;

  detailItems: LayerGroupDetailItem[] = [];
  dictionarySubscription: Subscription;

  constructor(private store: Store) {
    this.dictionary$ = this.store.select(
      (state: MangolState) => state.layertree.dictionary
    );
    this.showBadges$ = this.store.select(
      (state: MangolState) => state.layertree.showLayergroupBadges
    );
  }

  ngOnInit() {
    this.dictionarySubscription = this.dictionary$.subscribe(dict => {
      this.detailItems = [];
      this.detailItems.push({
        type: 'expand_all',
        text: dict.expandAll,
        fontSet: null,
        fontIcon: 'unfold_more',
        disabled: false
      });
      this.detailItems.push({
        type: 'collapse_all',
        text: dict.collapseAll,
        fontSet: null,
        fontIcon: 'unfold_less',
        disabled: false
      });
      this.detailItems.push({
        type: 'toggle_on',
        text: dict.turnLayersOn,
        fontSet: null,
        fontIcon: 'layers',
        disabled: false
      });
      this.detailItems.push({
        type: 'toggle_off',
        text: dict.turnLayersOff,
        fontSet: null,
        fontIcon: 'layers_clear',
        disabled: false
      });
    });
  }

  ngOnDestroy() {
    if (this.dictionarySubscription) {
      this.dictionarySubscription.unsubscribe();
    }
  }

  /**
   * Toggles the layer group's expanded state
   */
  toggleGroup() {
    this.group.checked = !this.group.checked;
  }

  /**
   * Action based on the menu item clicked
   * @param evt
   */
  onMenuItemClicked(evt: LayerGroupDetailItem) {
    switch (evt.type) {
      case 'expand_all':
        this.expandAll(this.group, true);
        break;
      case 'collapse_all':
        this.expandAll(this.group, false);
        break;
      case 'toggle_on':
        this.visibleAll(this.group, true);
        break;
      case 'toggle_off':
        this.visibleAll(this.group, false);
        break;
      default:
        break;
    }
  }

  /**
   * Recursively expands or collapses all children of a layer group
   * @param group
   * @param toChecked
   */
  private expandAll(group: LayertreeItemNode, checked: boolean) {
    if (!!group.children) {
      if (group.checked !== checked) {
        group.checked = checked;
      }
      group.children.forEach(c => {
        this.expandAll(c, checked);
      });
    }
  }

  /**
   * Recursively sets the layers' visibility of a layer group
   * @param group
   * @param visible
   */
  private visibleAll(group: LayertreeItemNode, visible: boolean) {
    if (!!group.children) {
      group.children.forEach(c => {
        if (!!c.layer) {
          if (c.checked !== visible) {
            c.checked = visible;
            c.layer.layer.setVisible(visible);
          }
        } else if (!!c.children) {
          this.visibleAll(c, visible);
        }
      });
    }
  }
}
