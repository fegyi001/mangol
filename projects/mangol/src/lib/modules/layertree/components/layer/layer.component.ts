import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MangolLayer } from '../../../../classes/Layer';
import { LayertreeItemNode } from './../../classes/layertree-item-node.class';
import { LayerDetailItem } from './../../interfaces/layer-detail-item.interface';
import { layertreeVisibilityIconStateTrigger } from './../../layertree.animations';
import { LayerDetailsComponent } from './../layer-details/layer-details.component';

@Component({
  selector: 'mangol-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
  animations: [layertreeVisibilityIconStateTrigger]
})
export class LayerComponent implements OnInit {
  @Input() node: LayertreeItemNode;

  displayLimit = 100;

  layer: MangolLayer = null;

  detailItems: LayerDetailItem[] = [];
  selectedDetail: LayerDetailItem = null;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.layer = this.node.layer;

    this.detailItems.push({
      type: 'transparency',
      text: 'Transparency',
      fontSet: 'ms',
      fontIcon: 'ms-transparency',
      disabled: false
    });
    if (!!this.layer.details) {
      this.detailItems.push({
        type: 'description',
        text: 'Layer description',
        fontSet: 'ms',
        fontIcon: 'ms-label-o',
        disabled: false
      });
    }
    // this.detailItems.push({
    //   type: 'legend',
    //   text: 'Legend',
    //   fontSet: 'ms',
    //   fontIcon: 'ms-style-o',
    //   disabled: true
    // });
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
      // backdropClass: 'mangol-details-backdrop',
      data: { item: this.selectedDetail, layer: this.layer }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
