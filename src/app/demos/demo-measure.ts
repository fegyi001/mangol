import { Component, OnInit } from '@angular/core';

import * as ol from 'openlayers';
import MangolConfig from '../../lib/interfaces/mangol-config.interface';

@Component({
  selector: 'mangol-demo-measure',
  template: `
      <mangol [config]="config"></mangol>
    `
})
export class DemoMeasureComponent implements OnInit {

  config = {} as MangolConfig;

  public ngOnInit(): any {
    this.config = {
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {
          measure: {
            active: true,
            disabled: false
          }
        }
      }
    };
  }

}
