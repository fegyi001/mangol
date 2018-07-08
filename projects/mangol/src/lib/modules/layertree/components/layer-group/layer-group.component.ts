import { Component, Input, OnInit } from '@angular/core';

import { LayertreeItemNode } from '../../classes/layertree-item-node.class';
import { slideStateTrigger } from '../../layertree.animations';
import { LayerGroupDetailItem } from './../../interfaces/layergroup-detail-item.interface';
import { MangolLayerGroup } from '../../../../classes/LayerGroup';

@Component({
  selector: 'mangol-layer-group',
  templateUrl: './layer-group.component.html',
  styleUrls: ['./layer-group.component.scss'],
  animations: [slideStateTrigger]
})
export class LayerGroupComponent implements OnInit {
  @Input() group: LayertreeItemNode;
  @Input() level: number;

  detailItems: LayerGroupDetailItem[] = [];

  showBadges = true;
  dictGroups = 'Groups';
  displayLimit = 50;

  constructor() {}

  ngOnInit() {
    this.detailItems.push({
      type: 'expand_all',
      text: 'Expand all',
      fontSet: 'ms',
      fontIcon: 'ms-maximize',
      disabled: false
    });
    this.detailItems.push({
      type: 'collapse_all',
      text: 'Collapse all',
      fontSet: 'ms',
      fontIcon: 'ms-minimize',
      disabled: false
    });
    this.detailItems.push({
      type: 'toggle_on',
      text: 'Toggle children on',
      fontSet: 'ms',
      fontIcon: 'ms-layers',
      disabled: false
    });
    this.detailItems.push({
      type: 'toggle_off',
      text: 'Toggle children off',
      fontSet: 'ms',
      fontIcon: 'ms-layers-o',
      disabled: false
    });
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
  private expandAll(group: LayertreeItemNode, toChecked: boolean) {
    if (!!group.children) {
      group.checked = toChecked;
      group.children.forEach(c => {
        this.expandAll(c, toChecked);
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
          c.checked = visible;
          c.layer.layer.setVisible(visible);
        } else if (!!c.children) {
          this.visibleAll(c, visible);
        }
      });
    }
  }
}
