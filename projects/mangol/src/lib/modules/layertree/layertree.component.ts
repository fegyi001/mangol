import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { Store } from '@ngxs/store';
import { Observable, of as ofObservable } from 'rxjs';

import { MangolLayer } from '../../classes/Layer';
import { MangolLayerGroup } from '../../classes/LayerGroup';
import { MangolConfig } from './../../interfaces/config.interface';

/**
 * Node for to-do item
 */
export class LayertreeItemNode {
  children: LayertreeItemNode[];
  item: string;
  checked?: boolean;
}

/** Flat to-do item node with expandable and level information */
export class LayertreeItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  checked?: boolean;
}

@Component({
  selector: 'mangol-layertree',
  templateUrl: './layertree.component.html',
  styleUrls: ['./layertree.component.scss']
})
export class LayertreeComponent implements OnInit {
  flatNodeMap: Map<LayertreeItemFlatNode, LayertreeItemNode> = new Map<
    LayertreeItemFlatNode,
    LayertreeItemNode
  >();
  nestedNodeMap: Map<LayertreeItemNode, LayertreeItemFlatNode> = new Map<
    LayertreeItemNode,
    LayertreeItemFlatNode
  >();
  selectedParent: LayertreeItemFlatNode | null = null;
  treeControl: FlatTreeControl<LayertreeItemFlatNode>;
  treeFlattener: MatTreeFlattener<LayertreeItemNode, LayertreeItemFlatNode>;
  dataSource: MatTreeFlatDataSource<LayertreeItemNode, LayertreeItemFlatNode>;
  checklistSelection = new SelectionModel<LayertreeItemFlatNode>(true);

  constructor(private store: Store) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<LayertreeItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    this.store
      .select(state => state.config.config)
      .subscribe((config: MangolConfig) => {
        if (
          typeof config !== 'undefined' &&
          config !== null &&
          config.hasOwnProperty('map') &&
          config.map.hasOwnProperty('layers')
        ) {
          const layers: (MangolLayer | MangolLayerGroup)[] = config.map.layers;
          const data: LayertreeItemNode[] = this.processLayersAndLayerGroups(
            layers
          );
          this.dataSource.data = data;
        }
      });
  }

  private processLayersAndLayerGroups(
    items: (MangolLayer | MangolLayerGroup)[]
  ): LayertreeItemNode[] {
    const data: LayertreeItemNode[] = [];
    items.forEach((i: MangolLayer | MangolLayerGroup) => {
      if (i instanceof MangolLayer) {
        this.processLayer(i, data);
      } else if (i instanceof MangolLayerGroup) {
        this.processLayerGroup(i, data);
      }
    });
    return data;
  }

  private processLayer(layer: MangolLayer, data: LayertreeItemNode[]) {
    const item = {
      item: layer.name,
      checked: layer.layer.getVisible()
    } as LayertreeItemNode;
    data.push(item);
  }

  private processLayerGroup(
    group: MangolLayerGroup,
    data: LayertreeItemNode[]
  ) {
    const item = { item: group.name } as LayertreeItemNode;
    item.children = [];
    if (
      group.hasOwnProperty('children') &&
      Array.isArray(group.children) &&
      group.children.length > 0
    ) {
      group.children.forEach((c: MangolLayer | MangolLayerGroup) => {
        if (c instanceof MangolLayer) {
          this.processLayer(c, item.children);
        } else if (c instanceof MangolLayerGroup) {
          this.processLayerGroup(c, item.children);
        }
      });
    }
    data.push(item);
  }

  ngOnInit(): void {}

  getLevel = (node: LayertreeItemFlatNode) => {
    return node.level;
  };

  isExpandable = (node: LayertreeItemFlatNode) => {
    return node.expandable;
  };

  getChildren = (node: LayertreeItemNode): Observable<LayertreeItemNode[]> => {
    return ofObservable(node.children);
  };

  hasChild = (_: number, _nodeData: LayertreeItemFlatNode) => {
    return _nodeData.expandable;
  };

  hasNoContent = (_: number, _nodeData: LayertreeItemFlatNode) => {
    return _nodeData.item === '';
  };

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: LayertreeItemNode, level: number) => {
    const flatNode =
      this.nestedNodeMap.has(node) &&
      this.nestedNodeMap.get(node)!.item === node.item
        ? this.nestedNodeMap.get(node)!
        : new LayertreeItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    if (!!node.checked) {
      flatNode.checked = node.checked;
    }

    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    console.log(flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: LayertreeItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: LayertreeItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: LayertreeItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }
}
