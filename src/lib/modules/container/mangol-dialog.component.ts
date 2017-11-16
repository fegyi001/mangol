import { HostBinding, OnInit, Component, Input, AfterViewInit, Inject } from '@angular/core';

import * as ol from 'openlayers';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MangolConfig } from '../../interfaces/mangol-config.interface';

@Component({
  selector: 'mangol-dialog',
  templateUrl: './mangol-dialog.component.html'
})
export class MangolDialogComponent implements AfterViewInit {
  @HostBinding('class') class = 'mangol-dialog';

  config: MangolConfig;

  constructor(public dialogRef: MatDialogRef<MangolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.config = this.data.config;
  }

  ngAfterViewInit() {

  }

}
