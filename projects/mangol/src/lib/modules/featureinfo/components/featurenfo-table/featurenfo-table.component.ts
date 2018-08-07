import { Component, OnInit, Input } from '@angular/core';
import Feature from 'ol/Feature';

@Component({
  selector: 'mangol-featurenfo-table',
  templateUrl: './featurenfo-table.component.html',
  styleUrls: ['./featurenfo-table.component.scss']
})
export class FeaturenfoTableComponent implements OnInit {
  @Input() feature: Feature;

  dataSource: any[] = [];
  columns: string[] = ['property', 'value'];

  constructor() {}

  ngOnInit() {
    const props = { ...this.feature.getProperties() };
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        // Don't show objects or functions in the table
        if (
          typeof props[key] === 'object' ||
          typeof props[key] === 'function'
        ) {
          delete props[key];
        } else {
          this.dataSource.push({ property: key, value: props[key] });
        }
      }
    }
  }
}
