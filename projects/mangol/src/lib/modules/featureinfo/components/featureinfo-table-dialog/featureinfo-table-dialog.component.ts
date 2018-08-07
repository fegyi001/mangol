import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import Feature from 'ol/Feature';

import { MangolLayer } from './../../../../classes/Layer';

@Component({
  selector: 'mangol-featureinfo-table-dialog',
  templateUrl: './featureinfo-table-dialog.component.html',
  styleUrls: ['./featureinfo-table-dialog.component.scss']
})
export class FeatureinfoTableDialogComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  columns: string[] = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<FeatureinfoTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { layer: MangolLayer; features: Feature[] }
  ) {}

  ngOnInit() {
    const source: any[] = [];
    this.data.features.forEach(feature => {
      const props = { ...feature.getProperties() };
      for (const key in props) {
        if (props.hasOwnProperty(key)) {
          // Don't show objects or functions in the table
          if (
            typeof props[key] === 'object' ||
            typeof props[key] === 'function'
          ) {
            delete props[key];
          } else {
            // Add the property name to the columns if not already added
            if (this.columns.indexOf(key) === -1) {
              this.columns.push(key);
            }
          }
        }
      }
      source.push(props);
    });
    this.dataSource = new MatTableDataSource(source);
    this.dataSource.sort = this.sort;
  }
}
