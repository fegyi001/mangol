import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromLonLat } from 'ol/proj.js';
import View from 'ol/View';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AppService } from '../../app.service';
import { MangolConfig } from './../../../../projects/mangol/src/lib/interfaces/config.interface';
import { MangolService } from './../../../../projects/mangol/src/lib/mangol.service';
import { code } from './code';

// import proj4 from 'proj4';
@Component({
  selector: 'app-demo-controllers',
  templateUrl: './demo-controllers.component.html',
  styleUrls: ['./demo-controllers.component.scss']
})
export class DemoControllersComponent implements OnInit, OnDestroy {
  mangolConfig: MangolConfig;
  sidebarOpenedSubscription: Subscription;

  code = code;

  constructor(
    private appService: AppService,
    private mangolService: MangolService
  ) {
    this.sidebarOpenedSubscription = this.appService.sidebarOpenedSubject.subscribe(
      opened => {
        if (opened !== null) {
          this.mangolService.mapState$
            .pipe(
              map(m => m.map),
              filter(m => m !== null)
            )
            .subscribe(m => {
              setTimeout(() => {
                m.updateSize();
              }, 500);
            });
        }
      }
    );
  }

  ngOnInit() {
    this.mangolConfig = {
      map: {
        target: 'mangol-demo-controllers',
        view: new View({
          projection: 'EPSG:3857',
          center: fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:3857'),
          zoom: 4,
          enableRotation: true,
          rotation: 45
        }),
        controllers: {
          zoom: {
            show: true
          },
          position: {
            show: true,
            precision: 2,
            dictionary: {
              copyCoordinates: 'Copy coordinates',
              textCopied: 'Copied',
              closeSnackbar: 'Close'
            }
          },
          rotation: {
            show: true,
            dictionary: {
              rotateToNorth: 'Rotate to North'
            },
            showTooltip: true
          },
          fullScreen: {
            show: true,
            dictionary: {
              maximize: 'Full Screen Mode',
              minimize: 'Normal Mode'
            },
            showTooltip: true
          }
        }
      }
    } as MangolConfig;
  }

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe();
    }
    this.mangolService.resetMangolState();
  }
}
