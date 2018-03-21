import { Component, OnInit } from '@angular/core';

import { MangolConfig } from './../interfaces/config.interface';

@Component({
  selector: 'mangol-demo-sidebar',
  template: `
    <mangol [config] = "config"></mangol>
    <mangol-pretty-print [code]="snippet"></mangol-pretty-print>
  `
})
export class DemoSidebarComponent implements OnInit {
  snippet = `
  import { Component, OnInit } from '@angular/core';

  import { MangolConfig } from 'mangol';

  @Component({
    selector: 'mangol-demo-sidebar',
    template: '<mangol [config]="config"></mangol>'
  })
  export class DemoSidebarComponent implements OnInit {

    config = {} as MangolConfig;

    public ngOnInit(): any {
      this.config = {
        // Minimal configuration
        sidebar: {
          collapsible: true,
          opened: true,
          toolbar: {}
        }
      };
    }
  }

  `;

  config = {} as MangolConfig;

  public ngOnInit(): any {
    this.config = {
      // Minimal configuration
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {}
      }
    };
  }
}
