import { Component, OnInit } from '@angular/core';

import { MangolConfig } from './../interfaces/config.interface';

import * as ol from 'openlayers';


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
