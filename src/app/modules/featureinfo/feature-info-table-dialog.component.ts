import 'rxjs/add/observable/of';

import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { MangolLayer } from './../../classes/layer.class';
import { MangolFeatureInfoTableElement } from './feature-info-table-element.interface';

@Component({
  selector: 'mangol-feature-info-table-dialog',
  templateUrl: './feature-info-table-dialog.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class MangolFeatureInfoTableDialogComponent implements OnInit {

  dataSource = new MangolFeatureInfoTableDialogDataSource();
  columns: any[];
  layer: MangolLayer;

  constructor(
    public dialogRef: MatDialogRef<MangolFeatureInfoTableDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public myData: any) {
    this.columns = myData.columns;
    this.layer = myData.layer;
    data = myData.data;
  }

  ngOnInit() {

  }

  getColumnLabel(column: string): string {
    let label = column;
    const attrCols = this.layer.getAttrColumns();
    for (let i = 0; i < attrCols.length; i++) {
      if (attrCols[i].name === column && attrCols[i].hasOwnProperty('label')) {
        label = attrCols[i].label;
        break;
      }
    }
    return label;
  }

}

let data: MangolFeatureInfoTableElement[] = [];

export class MangolFeatureInfoTableDialogDataSource extends DataSource<any> {

  connect(): Observable<MangolFeatureInfoTableElement[]> {
    return Observable.of(data);
  }

  disconnect() { }

}
