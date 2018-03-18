import { MangolConfig } from './../../interfaces/config.interface';
import { AfterViewInit, Component, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'mangol-dialog',
  templateUrl: './mangol-dialog.component.html'
})
export class MangolDialogComponent implements AfterViewInit {
  @HostBinding('class') class = 'mangol-dialog';

  config: MangolConfig;

  constructor(
    public dialogRef: MatDialogRef<MangolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.config = this.data.config;
  }

  ngAfterViewInit() {}
}
