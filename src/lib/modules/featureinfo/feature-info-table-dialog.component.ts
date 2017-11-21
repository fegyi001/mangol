import { MangolFeatureInfoTableElement } from './feature-info-table-element.interface';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MangolLayer } from '../../core/layer';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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
