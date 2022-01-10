import { Component, OnDestroy, OnInit } from '@angular/core'
import GeoJSON from 'ol/format/GeoJSON'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj.js'
import OSM from 'ol/source/OSM'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import View from 'ol/View'
import { Subscription } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { MangolLayer } from '../../../../projects/mangol/src/lib/classes/Layer'
import { MangolConfig } from '../../../../projects/mangol/src/lib/interfaces/config.interface'
import { MangolService } from '../../../../projects/mangol/src/lib/mangol.service'
import { AppService } from '../../app.service'
import { code } from './code'

@Component({
  selector: 'app-demo-featureinfo',
  templateUrl: './demo-featureinfo.component.html',
  styleUrls: ['./demo-featureinfo.component.scss']
})
export class DemoFeatureinfoComponent implements OnInit, OnDestroy {
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
    const pseudoGeoJSONFormat = <any>GeoJSON
    this.mangolConfig = {
      map: {
        target: 'mangol-demo-featureinfo',
        view: new View({
          projection: 'EPSG:900913',
          center: fromLonLat(
            [19.3956393810065, 47.168464955013],
            'EPSG:900913'
          ),
          zoom: 4
        }),
        layers: [
          new MangolLayer({
            name: 'OpenStreetMap Layer',
            details: 'Here are the OSM layer details',
            layer: new TileLayer({
              source: new OSM(),
              visible: true
            })
          }),
          new MangolLayer({
            name: 'Countries (Vector)',
            queryable: true,
            queryIdProperty: 'name',
            layer: new VectorLayer({
              source: new VectorSource({
                url: 'assets/geojson/countries.geojson',
                format: new pseudoGeoJSONFormat({
                  dataProjection: 'EPSG:4326',
                  featureProjection: 'EPSG:900913'
                })
              })
            })
          }),
          new MangolLayer({
            name: 'Cities (WMS)',
            queryable: true,
            querySrs: 'EPSG:900913',
            queryIdProperty: 'NAME',
            queryColumns: [
              'NAME',
              'ADM0NAME',
              'POP_MIN',
              'POP_MAX',
              'TIMEZONE',
              'FEATURECLA'
            ],
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
      },
      sidebar: {
        collapsible: true,
        opened: true,
        title: 'Feature info example',
        mode: 'side',
        toolbar: {
          featureinfo: {}
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
