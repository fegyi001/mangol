import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromLonLat } from 'ol/proj.js';
import View from 'ol/View';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AppService } from '../../app.service';
import { MangolConfig } from './../../../../projects/mangol/src/lib/interfaces/config.interface';
import { MangolService } from './../../../../projects/mangol/src/lib/mangol.service';
import { code } from './code';

@Component({
  selector: 'app-demo-print',
  templateUrl: './demo-print.component.html',
  styleUrls: ['./demo-print.component.scss']
})
export class DemoPrintComponent implements OnInit, OnDestroy {
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
          this.mangolService
            .getMap$()
            .pipe(filter(map => map !== null))
            .subscribe(map => {
              setTimeout(() => {
                map.updateSize();
              }, 500);
            });
        }
      }
    );
  }

  ngOnInit() {
    this.mangolConfig = {
      map: {
        renderer: 'canvas',
        target: 'mangol-demo-print',
        view: new View({
          projection: 'EPSG:3857',
          center: fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:3857'),
          zoom: 4
        })
      },
      sidebar: {
        title: 'Print example',
        opened: true,
        toolbar: {
          print: {
            resolutions: [72, 100, 150, 300],
            sizes: [
              { id: 'A5', width: 210, height: 148 },
              { id: 'A4', width: 297, height: 210 },
              { id: 'A3', width: 420, height: 297 },
              { id: 'A2', width: 594, height: 420 },
              { id: 'A1', width: 841, height: 594 },
              { id: 'A0', width: 1189, height: 841 }
            ],
            layouts: [
              {
                type: 'landscape'
              },
              {
                type: 'portrait'
              }
            ],
            dictionary: {
              print: 'Print',
              layout: 'Choose layout...',
              size: 'Choose paper size...',
              resolution: 'Choose resolution...',
              landscape: 'Landscape',
              portrait: 'Portrait',
              clearSelection: 'Clear'
            }
          }
        }
      }
    };
  }

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe();
    }
    this.mangolService.setConfig(null);
  }
}
