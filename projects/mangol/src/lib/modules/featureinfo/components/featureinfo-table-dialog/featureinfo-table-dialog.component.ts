import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { saveAs } from 'file-saver';

@Component({
  selector: 'mangol-featureinfo-table-dialog',
  templateUrl: './featureinfo-table-dialog.component.html',
  styleUrls: ['./featureinfo-table-dialog.component.scss'],
})
export class FeatureinfoTableDialogComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  columns: string[] = [];

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<FeatureinfoTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const source: any[] = [];
    const hasQueryColumns =
      !!this.data.layer.queryColumns && this.data.layer.queryColumns.length > 0;
    this.data.features.forEach((feature) => {
      const props = { ...feature.getProperties() };
      for (const key in props) {
        if (props.hasOwnProperty(key)) {
          // Don't show objects or functions in the table or the property is not in the layers' queryColumns attribute
          if (
            typeof props[key] === 'object' ||
            typeof props[key] === 'function' ||
            (hasQueryColumns &&
              this.data.layer.queryColumns.indexOf(key) === -1)
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

  exportCsv() {
    const data: any[] = this.dataSource.data;
    let csvContent = '';
    const separator = ';';
    this.columns.forEach((column) => {
      csvContent += column + separator;
    });
    data.forEach((d) => {
      csvContent += '\n';
      this.columns.forEach((c) => {
        csvContent += (d.hasOwnProperty(c) ? d[c] : '') + separator;
      });
    });
    const blob = new Blob([csvContent], {
      type: 'text-csv;charset=utf-8;',
    });
    try {
      saveAs(
        blob,
        `${this.data.layer.name
          .toLowerCase()
          .replace(/ /g, '_')}_${new Date().getTime()}.csv`
      );
    } catch (error) {
      console.log(error);
    }
  }
}
