import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { LayerDetailItem } from '../../interfaces/layer-detail-item.interface';

@Component({
  selector: 'mangol-layer-details',
  templateUrl: './layer-details.component.html',
  styleUrls: ['./layer-details.component.scss']
})
export class LayerDetailsComponent implements OnInit {
  item: LayerDetailItem;

  constructor(
    dialogRef: MatDialogRef<LayerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.item;
  }

  ngOnInit() {}
}
