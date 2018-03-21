import { Component, OnInit } from '@angular/core';

export interface MangolDemoItem {
  link: string;
  title: string;
}

@Component({
  selector: 'mangol-demo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class MangolDemoComponent implements OnInit {
  items: MangolDemoItem[];
  logo: string;
  sidebarOpened = true;

  ngOnInit() {
    this.logo = 'assets/img/logo/mangol_logo.png';
    this.items = [
      {
        link: '/demo-map',
        title: 'Map'
      },
      {
        link: '/demo-map-controllers',
        title: 'Map controllers'
      },
      {
        link: '/demo-sidebar',
        title: 'Sidebar'
      },
      {
        link: '/demo-layertree',
        title: 'Layertree'
      },
      {
        link: '/demo-featureinfo',
        title: 'Feature info'
      },
      {
        link: '/demo-measure',
        title: 'Measure'
      },
      {
        link: '/demo-print',
        title: 'Print'
      },
      {
        link: '/demo-full',
        title: 'Full functionality'
      }
    ];
  }
}
