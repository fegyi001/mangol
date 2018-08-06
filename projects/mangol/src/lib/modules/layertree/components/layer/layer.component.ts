import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MangolLayer } from '../../../../classes/Layer';
import { LayertreeItemNode } from './../../classes/layertree-item-node.class';
import { LayerDetailItem } from './../../interfaces/layer-detail-item.interface';
import { layertreeVisibilityIconStateTrigger } from './../../layertree.animations';
import { LayerDetailsComponent } from './../layer-details/layer-details.component';
import { LayertreeDictionary } from '../../../../store/layertree.state';
import { MangolState } from '../../../../mangol.state';

@Component({
  selector: 'mangol-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
  animations: [layertreeVisibilityIconStateTrigger]
})
export class LayerComponent implements OnInit, OnDestroy {
  @Input() node: LayertreeItemNode;

  dictionary$: Observable<LayertreeDictionary>;

  displayLimit = 100;

  layer: MangolLayer = null;

  detailItems: LayerDetailItem[] = [];
  selectedDetail: LayerDetailItem = null;

  dictionarySubscription: Subscription;

  constructor(public dialog: MatDialog, private store: Store) {
    this.dictionary$ = this.store.select(
      (state: MangolState) => state.layertree.dictionary
    );
  }

  ngOnInit() {
    this.layer = this.node.layer;

    this.dictionarySubscription = this.dictionary$.subscribe(dict => {
      this.detailItems = [];
      this.detailItems.push({
        type: 'transparency',
        text: dict.showLayerTransparency,
        fontSet: null,
        fontIcon: 'opacity',
        disabled: false
      });
      if (!!this.layer.details) {
        this.detailItems.push({
          type: 'description',
          text: dict.showLayerDescription,
          fontSet: null,
          fontIcon: 'subject',
          disabled: false
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.dictionarySubscription) {
      this.dictionarySubscription.unsubscribe();
    }
  }

  toggleLayerVisibility() {
    this.layer.layer.setVisible(!this.layer.layer.getVisible());
    this.node.checked = !this.node.checked;
  }

  onMenuItemClicked(evt: LayerDetailItem) {
    this.selectedDetail = evt;

    const dialogRef = this.dialog.open(LayerDetailsComponent, {
      width: '50%',
      maxHeight: '60%',
      autoFocus: false,
      panelClass: 'mangol-dialog',
      hasBackdrop: true,
      data: { item: this.selectedDetail, layer: this.layer }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
