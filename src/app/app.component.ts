import { Component, Inject, OnInit } from '@angular/core';

export interface MangolDemoItem {
  link: string;
  title: string;
}

@Component({
  selector: 'mangol-demo',
  templateUrl: './app.component.html'
})
export class MangolDemoComponent implements OnInit {
  items: MangolDemoItem[];
  logo: string;

  ngOnInit() {
    this.logo = 'assets/img/logo/mangol_logo.png';
    this.items = [
      {
        link: '/demo-map',
        title: 'map'
      },
      {
        link: '/demo-map-controllers',
        title: 'map controllers'
      },
      {
        link: '/demo-sidebar',
        title: 'sidebar'
      },
      {
        link: '/demo-layertree',
        title: 'layertree'
      },
      {
        link: '/demo-featureinfo',
        title: 'feature info'
      },
      {
        link: '/demo-measure',
        title: 'measure'
      },
      {
        link: '/demo-print',
        title: 'print'
      },
      {
        link: '/demo-full',
        title: 'full functionality'
      }
    ];
  }
}
