import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  homeButtonStateTrigger,
  routeStateTrigger,
  sidebarButtonStateTrigger
} from './app.animations';
import { AppService } from './app.service';

export interface MangolDemoItem {
  link: string;
  title: string;
}

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    homeButtonStateTrigger,
    sidebarButtonStateTrigger,
    routeStateTrigger
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, DoCheck, OnDestroy {
  items: MangolDemoItem[];
  logo: string;
  sidebarOpened: boolean;
  sidebarOpenedSubscription: Subscription;
  activeRouteData = '/demo-home';

  constructor(
    private cdr: ChangeDetectorRef,
    private appService: AppService,
    private router: Router
  ) {
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
    this.appService.sidebarOpenedSubject.next(false);
    this.logo = 'assets/img/logo/mangol_logo.png';
    this.items = [
      {
        link: '/demo-map',
        title: 'Map'
      },
      {
        link: '/demo-controllers',
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
      // {
      //   link: '/demo-print',
      //   title: 'Print'
      // },
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
    let activeRouteData: string = null;
    const routeData = outlet.activatedRouteData['animation'];
    if (!routeData) {
      activeRouteData = '/demo-home';
    } else {
      activeRouteData = '/' + routeData['page'];
    }
    this.activeRouteData = activeRouteData;
    return this.activeRouteData;
  }

  navigate(item: MangolDemoItem) {
    if (window.innerWidth <= 500) {
      this.appService.sidebarOpenedSubject.next(false);
    }
    this.router.navigate([item.link]);
  }

  navigateHome() {
    if (window.innerWidth <= 500) {
      this.appService.sidebarOpenedSubject.next(false);
    }
    this.router.navigate(['/demo-home']);
  }
}
