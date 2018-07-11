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
    this.logo = 'assets/img/logo/mangol_logo.png';
    this.items = [
      {
        link: '/demo-map',
        title: 'Map'
      },
      // {
      //   link: '/demo-map-controllers',
      //   title: 'Map controllers'
      // },
      {
        link: '/demo-layertree',
        title: 'Layertree'
      }
      // {
      //   link: '/demo-featureinfo',
      //   title: 'Feature info'
      // },
      // {
      //   link: '/demo-measure',
      //   title: 'Measure'
      // },
      // {
      //   link: '/demo-print',
      //   title: 'Print'
      // },
      // {
      //   link: '/demo-full',
      //   title: 'Full functionality'
      // }
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

// import { Component, OnInit } from '@angular/core';
// import TileLayer from 'ol/layer/Tile';
// import { fromLonLat } from 'ol/proj.js';
// import { register } from 'ol/proj/proj4.js';
// import OSM from 'ol/source/OSM';
// import TileJSON from 'ol/source/TileJSON';
// import Fill from 'ol/style/Fill';
// import Stroke from 'ol/style/Stroke';
// import Style from 'ol/style/Style';
// import View from 'ol/View';
// import proj4 from 'proj4';

// import { MangolConfig } from '../../projects/mangol/src/lib/interfaces/config.interface';
// import { MangolService } from '../../projects/mangol/src/lib/mangol.service';
// import { MangolLayer } from './../../projects/mangol/src/lib/classes/Layer';
// import { MangolLayerGroup } from './../../projects/mangol/src/lib/classes/LayerGroup';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnInit {
//   mangolConfig: MangolConfig;

//   constructor(private mangolService: MangolService) {}

//   ngOnInit() {
//     proj4.defs(
//       'EPSG:23700',
//       '+proj=somerc +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993 ' +
//         '+x_0=650000 +y_0=200000 +ellps=GRS67 +units=m +no_defs'
//     );
//     register(proj4);
//     this.mangolConfig = {
//       map: {
//         renderer: 'canvas',
//         target: 'my-map',
//         view: new View({
//           projection: 'EPSG:900913',
//           center: fromLonLat(
//             // [19.3956393810065, 47.168464955013],
//             [0, 0],
//             'EPSG:900913'
//           ),
//           zoom: 3
//         }),
//         controllers: {
//           mousePosition: {},
//           scaleLine: {
//             units: 'metric'
//           },
//           quickSearch: {
//             placeholder: 'City search',
//             items: [
//               {
//                 text: 'Budapest',
//                 details: 'Capital of Hungary',
//                 extent: [2108491, 6010126, 2134556, 6039783]
//               },
//               {
//                 text: 'London',
//                 details: 'Capital of England & UK',
//                 coordinates: [-13664, 6711101]
//               },
//               {
//                 text: 'Paris',
//                 details: 'Capital of France',
//                 extent: [250839, 6235856, 272853, 6263067]
//               }
//             ]
//           },
//           fullScreen: {},
//           tileLoad: true
//         },
//         layers: [
//           new MangolLayer({
//             name: 'OpenStreetMap Layer',
//             details:
//               'Here are the OSM layer details: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus necessitatibus ipsa beatae qui voluptate perspiciatis ullam aperiam, autem adipisci rerum molestias libero dolor quia possimus tenetur ipsam saepe expedita itaque corrupti atque nulla dolores fugiat facere! Ullam sapiente molestiae tempora deserunt. Dolore reprehenderit quos earum facilis sint hic, repellendus corrupti. Molestias atque sed, fugiat iure consequuntur facere voluptates? Dolore ipsum mollitia, dolores, fugit molestiae similique reprehenderit nihil ratione nulla adipisci repellendus rem molestias est blanditiis. Quia mollitia magni saepe rerum culpa accusamus impedit ipsum dolorem perspiciatis in temporibus recusandae commodi rem consectetur iusto, aspernatur eligendi illo, vero ratione, sit esse!',
//             layer: new TileLayer({
//               source: new OSM(),
//               visible: true
//             })
//           }),
//           new MangolLayerGroup({
//             name: 'Overlays',
//             children: [
//               new MangolLayer({
//                 name: 'Food Insecurity Layer',
//                 layer: new TileLayer({
//                   source: new TileJSON({
//                     url:
//                       'https://api.tiles.mapbox.com/v3/mapbox.20110804-hoa-foodinsecurity-3month.json?secure',
//                     crossOrigin: 'anonymous'
//                   }),
//                   visible: false
//                 })
//               }),
//               new MangolLayerGroup({
//                 name: 'Second Layer Group',
//                 children: [
//                   new MangolLayer({
//                     name: 'Countries',
//                     details:
//                       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur neque unde autem corporis similique provident maxime, harum suscipit sit est nesciunt accusantium enim! Aliquid in quis sapiente doloremque quia laboriosam.',
//                     layer: new TileLayer({
//                       source: new TileJSON({
//                         url:
//                           'https://api.tiles.mapbox.com/v3/mapbox.world-borders-light.json?secure',
//                         crossOrigin: 'anonymous'
//                       }),
//                       visible: true
//                     })
//                   }),
//                   new MangolLayer({
//                     name: 'Food Insecurity Layer2',
//                     layer: new TileLayer({
//                       source: new TileJSON({
//                         url:
//                           'https://api.tiles.mapbox.com/v3/mapbox.20110804-hoa-foodinsecurity-3month.json?secure',
//                         crossOrigin: 'anonymous'
//                       }),
//                       visible: false
//                     })
//                   })
//                 ]
//               })
//             ]
//           })
//         ],
//         layertree: {}
//       },
//       sidebar: {
//         collapsible: true,
//         opened: true,
//         title: 'Mangol 6.x',
//         mode: 'side',
//         toolbar: {
//           layertree: {
//             active: true,
//             disabled: false,
//             title: 'Layers',
//             isAccordionMulti: true,
//             details: {
//               opacity: {
//                 sliderStep: 1,
//                 showLabels: true
//               }
//             }
//           },
//           featureinfo: {
//             title: 'Feature info',
//             maxFeatures: 10,
//             cursorStyle: 'crosshair',
//             placeholder: 'Select query layer',
//             zoomOnRowClick: true,
//             highlightFeatures: true,
//             hoverStyle: [
//               new Style({
//                 fill: new Fill({
//                   color: [255, 255, 0, 0.5]
//                 }),
//                 stroke: new Stroke({
//                   color: [255, 255, 0, 1],
//                   width: 5
//                 })
//               })
//             ]
//           },
//           measure: {
//             title: 'Measure',
//             disabled: false,
//             fillColor: [255, 255, 0, 0.2],
//             strokeColor: [33, 150, 243, 0.8],
//             textColor: [33, 150, 243, 1],
//             textOutlineColor: [255, 255, 255, 0.8],
//             font: 'normal 14px Arial'
//           },
//           print: {}
//         }
//       }
//     } as MangolConfig;

//     setTimeout(() => {
//       // this.mangolService.sidebarSetSidebarTitle('hahaha');
//     }, 2000);
//   }
// }
