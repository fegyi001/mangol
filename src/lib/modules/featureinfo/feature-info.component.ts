import { FeatureIntoService } from './feature-info.service';
import { Component, HostBinding, OnInit, Input, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { MangolLayer } from './../../core/layer';
import { MangolMap } from './../../core/map';

import * as ol from 'openlayers';
declare var $: any;

@Component({
  selector: 'mangol-feature-info',
  templateUrl: './feature-info.component.html'
})
export class MangolFeatureInfoComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mangol-feature-info';

  @Input() map: MangolMap;

  layers: MangolLayer[];
  selected: MangolLayer;
  hoverLayer: any;
  clickEvent: any;
  maxFeatures = 10;
  features: any[];

  constructor(private featureInfoService: FeatureIntoService) {
    this.layers = [];
    this.selected = null;
    this.features = [];
  }

  ngOnInit() {

    this.hoverLayer = new ol.layer.Vector({
      source: new ol.source.Vector({}),
      style: [new ol.style.Style({
        image: new ol.style.Circle({
          radius: 10,
          fill: new ol.style.Fill({
            color: [255, 255, 0, 0.5]
          }),
          stroke: new ol.style.Stroke({
            color: [51, 51, 51, 0.8],
            width: 2
          })
        })
      })]
    });
    this.map.addLayer(this.hoverLayer);

    this.map.getMangolAllLayers().forEach((layer: MangolLayer) => {
      if (layer.isQueryable() && layer.getVisible()) {
        this.layers.push(layer);
      }
    });
  }

  ngOnDestroy() {
    this.map.removeLayer(this.hoverLayer);
    this._deactivateClick();
  }

  onSelectionChange(evt: MatSelectChange) {
    this.selected = evt.value;
    this._activateClick(this.selected.layer);
  }

  private _setCursor(cursorType: string) {
    if (this.map) {
      const target = this.map.getTarget();
      const jTarget = typeof target === 'string' ? $('#' + target) : $(target);
      jTarget.css('cursor', cursorType);
    }
  }

  private _getFeatureInfoUrl(source: any, coordinate: any, resolution: any, srs: any, maxFeatures: any) {
    const styles = source.getParams().hasOwnProperty('STYLES') ? source.getParams().STYLES : '';
    const url = source.getGetFeatureInfoUrl(coordinate, resolution, srs, {
      'INFO_FORMAT': 'application/json',
      'FEATURE_COUNT': maxFeatures === null ? 100000000 : maxFeatures,
      'STYLES': styles
    });
    return url;
  }

  private _deactivateClick() {
    this._setCursor('');
    if (this.clickEvent) {
      this.map.un('singleclick', this.clickEvent);
    }
  }

  private _activateClick(layer: ol.layer.Tile) {
    this._deactivateClick();
    this._setCursor('crosshair');
    this.clickEvent = ((evt: any) => {
      const url = this._getFeatureInfoUrl(layer.getSource(), evt.coordinate,
        this.map.getView().getResolution(), this.map.getView().getProjection(), this.maxFeatures);
      if (url) {
        this.featureInfoService.getFeatureInfo(url).subscribe((data: any) => {
          if (data.hasOwnProperty('features')) {
            this.features = data.features;
          }
        });
      }
    });
    this.map.on('singleclick', this.clickEvent);
  }

}
