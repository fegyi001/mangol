import { routeStateTrigger } from './app.animations';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';

import { RouterOutlet } from '@angular/router';

export interface MangolDemoItem {
  link: string;
  title: string;
}

declare var window: any;

@Component({
  selector: 'mangol-demo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeStateTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MangolDemoComponent implements OnInit, AfterViewInit, DoCheck {
  items: MangolDemoItem[];
  logo: string;
  sidebarOpened = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.sidebarOpened = window.innerWidth > 500;
  }

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

  ngAfterViewInit() {
    // console.log(window.innerWidth);
  }

  ngDoCheck() {
    this.cdr.detectChanges();
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  getAnimationData(outlet: RouterOutlet) {
    const routeData = outlet.activatedRouteData['animation'];
    if (!routeData) {
      return 'homePage';
    }
    return routeData['page'];
  }
}
