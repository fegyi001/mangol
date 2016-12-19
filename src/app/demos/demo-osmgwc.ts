import { Component, OnInit } from '@angular/core';

declare var ol: any;
declare var proj4: any;

@Component({
  selector: 'mangol-demo-osmgwc',
  template: `
      <mangol-container [config]="config"></mangol-container>
    `
})
export class DemoOsmgwcComponent implements OnInit {

  config: any;

  public ngOnInit(): any {

    proj4
      .defs(
      "EPSG:23700",
      "+proj=somerc +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993 +x_0=650000 +y_0=200000 +ellps=GRS67 +units=m +no_defs ");

    let resolutions: number[] = [1120.0, 560.0, 280.0, 140.0, 55.99999999999999, 27.999999999999996,
      13.999999999999998, 5.6, 2.8, 1.4, 0.5599999999999999, 0.27999999999999997
    ];
    let maxExtent: number[] = [421306.58134742436, 43986.223614953604, 994746.5813474243, 617426.2236149536];
    let tileSize: number[] = [256, 256];

    this.config = {
      map: {
        renderer: 'canvas',
        target: 'demo-osmgwc-map',
        view: {
          projection: "EPSG:23700",
          center: ol.proj.fromLonLat([19.3956393810065, 47.168464955013], "EPSG:23700"),
          zoom: 0,
          resolutions: resolutions
        },
        layers: [
          {
            type: 'layer',
            name: 'OpenStreetMap layer',
            layer: new ol.layer.Tile({
              source: new ol.source.XYZ({
                url: "http://188.166.116.137:8081/geoserver/gwc/service/tms/1.0.0/osm_hungary@EPSG:23700@png/{z}/{x}/{-y}.png",
                projection: "EPSG:23700",
                tileGrid: new ol.tilegrid.TileGrid({
                  extent: maxExtent,
                  resolutions: resolutions,
                  tileSize: tileSize
                })
              })
            })
          }
        ]
      }
    }

  }

}
