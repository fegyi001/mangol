import { Component, OnDestroy, OnInit } from '@angular/core'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj.js'
import OSM from 'ol/source/OSM'
import TileWMS from 'ol/source/TileWMS'
import View from 'ol/View'
import { Subscription } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { MangolLayer } from '../../../../projects/mangol/src/lib/classes/Layer'
import { MangolLayerGroup } from '../../../../projects/mangol/src/lib/classes/LayerGroup'
import { MangolConfig } from '../../../../projects/mangol/src/lib/interfaces/config.interface'
import { MangolService } from '../../../../projects/mangol/src/lib/mangol.service'
import { AppService } from '../../app.service'
import { code } from './code'

@Component({
  selector: 'app-demo-full',
  templateUrl: './demo-full.component.html',
  styleUrls: ['./demo-full.component.scss']
})
export class DemoFullComponent implements OnInit, OnDestroy {
  mangolConfig: MangolConfig
  sidebarOpenedSubscription: Subscription

  code = code

  constructor(
    private appService: AppService,
    private mangolService: MangolService
  ) {
    this.sidebarOpenedSubscription =
      this.appService.sidebarOpenedSubject.subscribe((opened) => {
        if (opened !== null) {
          this.mangolService.mapState$
            .pipe(
              map((m) => m.map),
              filter((m) => m !== null)
            )
            .subscribe((m) => {
              setTimeout(() => {
                m.updateSize()
              }, 500)
            })
        }
      })
  }

  ngOnInit() {
    this.mangolConfig = {
      map: {
        target: 'mangol-demo-full',
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat(
            [19.3956393810065, 47.168464955013],
            'EPSG:900913'
          ),
          zoom: 4
        }),
        controllers: {
          zoom: {
            show: true,
            showTooltip: true,
            dictionary: {
              zoomIn: 'Zoom in',
              zoomOut: 'Zoom out'
            }
          },
          position: {
            show: true,
            precision: 2
          },
          fullScreen: {
            show: true,
            showTooltip: true
          }
        },
        layers: [
          new MangolLayer({
            name: 'OpenStreetMap Layer',
            details: 'Here are the OSM layer details',
            layer: new TileLayer({
              source: new OSM(),
              visible: true
            })
          }),
          new MangolLayerGroup({
            name: 'Overlays',
            children: [
              new MangolLayer({
                name: 'Roads',
                queryable: true,
                querySrs: 'EPSG:900913',
                layer: new TileLayer({
                  source: new TileWMS({
                    url: 'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                    crossOrigin: 'anonymous',
                    params: {
                      LAYERS: ['naturalearth:roads'],
                      format: 'image/png',
                      SRS: 'EPSG:900913'
                    }
                  }),
                  opacity: 0.5,
                  visible: true
                })
              }),
              new MangolLayerGroup({
                name: 'Coutries & Cities',
                children: [
                  new MangolLayer({
                    name: 'Country borders',
                    queryable: true,
                    querySrs: 'EPSG:900913',
                    details:
                      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    layer: new TileLayer({
                      source: new TileWMS({
                        url: 'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                        crossOrigin: 'anonymous',
                        params: {
                          LAYERS: ['naturalearth:countries'],
                          format: 'image/png',
                          SRS: 'EPSG:900913'
                        }
                      }),
                      opacity: 0.5,
                      visible: false
                    })
                  }),
                  new MangolLayer({
                    name: 'Cities',
                    queryable: true,
                    querySrs: 'EPSG:900913',
                    layer: new TileLayer({
                      source: new TileWMS({
                        url: 'http://188.166.116.137:8080/geoserver/gwc/service/wms',
                        crossOrigin: 'anonymous',
                        params: {
                          LAYERS: ['naturalearth:populated_places'],
                          format: 'image/png',
                          SRS: 'EPSG:900913'
                        }
                      }),
                      visible: true
                    })
                  })
                ]
              })
            ]
          })
        ]
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Full functionality example',
        mode: 'side',
        toolbar: {
          layertree: {
            active: true,
            disabled: false,
            title: 'Layers',
            details: {
              opacity: {
                sliderStep: 1,
                showLabels: true
              }
            }
          },
          featureinfo: {
            title: 'Feature info'
          },
          measure: { disabled: false },
          print: { disabled: false }
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.sidebarOpenedSubscription) {
      this.sidebarOpenedSubscription.unsubscribe()
    }
    this.mangolService.resetMangolState()
  }
}
