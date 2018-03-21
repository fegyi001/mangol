import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnDestroy,
  OnInit
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { routeStateTrigger } from './app.animations';
import { AppService } from './app.service';

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
export class MangolDemoComponent implements OnInit, DoCheck, OnDestroy {
  items: MangolDemoItem[];
  logo: string;
  sidebarOpened: boolean;
  sidebarOpenedSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef, private appService: AppService) {
    this.sidebarOpenedSubscription = this.appService.sidebarOpenedSubject.subscribe(
      opened => {
        if (opened !== null) {
          this.sidebarOpened = opened;
        }
      }
    );
    this.appService.sidebarOpenedSubject.next(window.innerWidth > 500);
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

  ngDoCheck() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe();
    }
  }

  toggleSidebar() {
    this.appService.sidebarOpenedSubject.next(!this.sidebarOpened);
  }

  getAnimationData(outlet: RouterOutlet) {
    const routeData = outlet.activatedRouteData['animation'];
    if (!routeData) {
      return 'homePage';
    }
    return routeData['page'];
  }
}
