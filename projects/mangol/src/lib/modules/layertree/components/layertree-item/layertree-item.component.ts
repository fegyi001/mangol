import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { LayertreeDictionary } from '../../../../store/layertree/layertree.reducers'
import * as fromMangol from '../../../../store/mangol.reducers'
import { LayertreeItemNode } from '../../classes/layertree-item-node.class'

@Component({
  selector: 'mangol-layertree-item',
  templateUrl: './layertree-item.component.html',
  styleUrls: ['./layertree-item.component.scss']
})
export class LayertreeItemComponent implements OnInit {
  @Input()
  items: LayertreeItemNode[]
  @Input()
  level: number

  dictionary$: Observable<LayertreeDictionary>

  groupNodes: LayertreeItemNode[] = []
  layerNodes: LayertreeItemNode[] = []

  constructor(private store: Store<fromMangol.MangolState>) {
    this.dictionary$ = this.store.select((state) => state.layertree.dictionary)
  }

  ngOnInit() {
    this.items.forEach((i) => {
      if (!!i.children) {
        this.groupNodes.push(i)
      } else if (!!i.layer) {
        this.layerNodes.push(i)
      }
    })
  }

  getStyle() {
    return {
      'margin-left': (this.level === 0 ? 0 : 30) + 'px'
    }
  }
}
