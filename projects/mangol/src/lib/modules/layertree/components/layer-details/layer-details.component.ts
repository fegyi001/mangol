import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MangolLayer } from '../../../../classes/Layer';
import { LayerDetailItem } from '../../interfaces/layer-detail-item.interface';

@Component({
  selector: 'mangol-layer-details',
  templateUrl: './layer-details.component.html',
  styleUrls: ['./layer-details.component.scss'],
})
export class LayerDetailsComponent implements OnInit {
  item: LayerDetailItem;
  layer: MangolLayer;

  constructor(
    dialogRef: MatDialogRef<LayerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.item;
    this.layer = data.layer;
  }

  ngOnInit() {}
}
