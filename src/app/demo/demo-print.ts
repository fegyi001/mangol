import { Component, OnInit } from '@angular/core';

import { MangolConfig } from './../interfaces/config.interface';

@Component({
  selector: 'mangol-demo-print',
  template: `
      <mangol [config]="config"></mangol>
      <mangol-pretty-print [code]="snippet"></mangol-pretty-print>
    `
})
export class DemoPrintComponent implements OnInit {
  config = {} as MangolConfig;
  snippet = `
  import { Component, OnInit } from '@angular/core';

  import { MangolConfig } from 'mangol';

  @Component({
    selector: 'mangol-demo-print',
    template: '<mangol [config]="config"></mangol>'
  })
  export class DemoPrintComponent implements OnInit {
    config = {} as MangolConfig;

    public ngOnInit(): any {
      this.config = {
        sidebar: {
          collapsible: true,
          opened: true,
          toolbar: {
            // Minimal configuration
            print: {}
          }
        }
      };
    }
  }

  `;

  public ngOnInit(): any {
    this.config = {
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {
          // Minimal configuration
          print: {}
        }
      }
    };
  }
}
