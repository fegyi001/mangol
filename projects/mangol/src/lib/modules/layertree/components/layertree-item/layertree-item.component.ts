import { Component, Input, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LayertreeDictionary } from '../../../../store/layertree/layertree.reducers';
import { LayertreeItemNode } from '../../classes/layertree-item-node.class';
import * as fromMangol from './../../../../store/mangol.reducers';

@Component({
  selector: 'mangol-layertree-item',
  templateUrl: './layertree-item.component.html',
  styleUrls: ['./layertree-item.component.scss']
})
export class LayertreeItemComponent implements OnInit, OnChanges {

  @Input()
  items: LayertreeItemNode[];
  @Input()
  level: number;

  dictionary$: Observable<LayertreeDictionary>;

  groupNodes: LayertreeItemNode[] = [];
  layerNodes: LayertreeItemNode[] = [];

  constructor(private store: Store<fromMangol.MangolState>) {
    this.dictionary$ = this.store.select(fromMangol.getLayerGroupDictionary);
  }

  ngOnInit() {
    this.items.forEach(i => {
      if (!!i.children) {
        this.groupNodes.push(i);
      } else if (!!i.layer) {
        this.layerNodes.push(i);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items && changes.items.currentValue !== changes.items.previousValue) {
      this.groupNodes = [];
      this.layerNodes = [];
      this.items.forEach(i => {
        if (!!i.children) {
          this.groupNodes.push(i);
        } else if (!!i.layer) {
          this.layerNodes.push(i);
        }
      });
    }
  }

  getStyle() {
    return {
      'margin-left': (this.level === 0 ? 0 : 30) + 'px'
    };
  }
}
