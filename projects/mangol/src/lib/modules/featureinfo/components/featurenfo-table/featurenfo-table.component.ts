import { Component, OnInit, Input } from '@angular/core';
import Feature from 'ol/Feature';
import { Store } from '../../../../../../node_modules/@ngxs/store';
import { MangolState } from '../../../../mangol.state';

@Component({
  selector: 'mangol-featurenfo-table',
  templateUrl: './featurenfo-table.component.html',
  styleUrls: ['./featurenfo-table.component.scss']
})
export class FeaturenfoTableComponent implements OnInit {
  @Input() feature: Feature;

  dataSource: any[] = [];
  columns: string[] = ['property', 'value'];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .selectOnce((state: MangolState) => state.featureinfo.selectedLayer)
      .subscribe(layer => {
        const hasQueryColumns =
          !!layer.queryColumns && layer.queryColumns.length > 0;
        const props = { ...this.feature.getProperties() };
        for (const key in props) {
          if (props.hasOwnProperty(key)) {
            // Don't show objects or functions in the table or the property is not in the layers' queryColumns attribute
            if (
              typeof props[key] === 'object' ||
              typeof props[key] === 'function' ||
              (hasQueryColumns && layer.queryColumns.indexOf(key) === -1)
            ) {
              delete props[key];
            } else {
              this.dataSource.push({ property: key, value: props[key] });
            }
          }
        }
      });
  }
}
