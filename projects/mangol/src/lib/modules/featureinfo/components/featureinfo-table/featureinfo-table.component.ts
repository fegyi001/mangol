import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import { first } from 'rxjs/operators';

import * as fromMangol from '../../../../store/mangol.reducers';

@Component({
  selector: 'mangol-featureinfo-table',
  templateUrl: './featureinfo-table.component.html',
  styleUrls: ['./featureinfo-table.component.scss'],
})
export class FeatureinfoTableComponent implements OnInit {
  @Input()
  feature: Feature<Polygon | LineString | Point>;

  dataSource: any[] = [];
  columns: string[] = ['property', 'value'];

  constructor(private store: Store<fromMangol.MangolState>) {}

  ngOnInit() {
    this.store
      .select((state) => state.featureinfo.selectedLayer)
      .pipe(first())
      .subscribe((layer) => {
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
