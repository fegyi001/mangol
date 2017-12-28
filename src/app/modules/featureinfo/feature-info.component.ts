import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange, MatSnackBar } from '@angular/material';

import { MangolLayer } from './../../classes/layer.class';
import { MangolConfigFeatureInfoItem } from './../../interfaces/config-toolbar.interface';
import { FeatureIntoService } from './feature-info.service';
import { MangolMap } from '../../classes/map.class';


declare var $: any;
import * as ol from 'openlayers';
@Component({
  selector: 'mangol-feature-info',
  templateUrl: './feature-info.component.html'
})
export class MangolFeatureInfoComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mangol-feature-info';

  @Input() map: MangolMap;
  @Input() opts: MangolConfigFeatureInfoItem;

  maxFeatures: number;
  cursorStyle: string;
  placeholder: string;
  zoomOnRowClick: boolean;
  highlightFeatures: boolean;

  layers: MangolLayer[];
  selected: MangolLayer;
  hoverLayer: ol.layer.Vector;
  clickEvent: any;
  features: ol.Feature[];
  geojson = new ol.format.GeoJSON();
  constructor(
    private featureInfoService: FeatureIntoService,
    public snackBar: MatSnackBar
  ) {
    this.layers = [];
    this.selected = null;
    this.features = [];
  }

  ngOnInit() {
    this.maxFeatures = this.opts && this.opts.hasOwnProperty('maxFeatures') ? this.opts.maxFeatures : 10;
    this.cursorStyle = this.opts && this.opts.hasOwnProperty('cursorStyle') ? this.opts.cursorStyle : 'crosshair';
    this.placeholder = this.opts && this.opts.hasOwnProperty('placeholder') ? this.opts.placeholder : 'Select query layer';
    this.zoomOnRowClick = this.opts && this.opts.hasOwnProperty('zoomOnRowClick') ? this.opts.zoomOnRowClick : true;
    this.highlightFeatures = this.opts && this.opts.hasOwnProperty('highlightFeatures') ? this.opts.highlightFeatures : true;
    this._addHoverLayer();
    this._getQueryableLayers();
  }

  ngOnDestroy() {
    this._removeHoverLayer();
    this._deactivateClick();
  }

  onSelectionChange(evt: MatSelectChange) {
    this.selected = evt.value;
    this._activateClick(this.selected.layer);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onFeatureSelected(evt: ol.Feature) {
    this.hoverLayer.getSource().clear();
    if (evt !== null) {
      const projCode: string = this.selected.getLayer().getSource().getProjection().getCode();
      const viewProjCode = this.map.getView().getProjection().getCode();
      const feat = evt.clone();
      if (projCode !== viewProjCode) {
        feat.setGeometry(feat.getGeometry().transform(projCode, viewProjCode));
      }
      this.hoverLayer.getSource().addFeature(feat);
      if (this.zoomOnRowClick) {
        this.map.getView().fit(feat.getGeometry().getExtent(), {
          duration: 500
        });
      }
    }
  }

  private _addHoverLayer() {
    this.hoverLayer = new ol.layer.Vector({
      source: new ol.source.Vector()
    });
    if (this.opts.hasOwnProperty('hoverStyle')) {
      this.hoverLayer.setStyle(this.opts.hoverStyle);
    }
    if (this.highlightFeatures) {
      this.map.addLayer(this.hoverLayer);
    }
  }

  private _removeHoverLayer() {
    if (this.highlightFeatures) {
      this.map.removeLayer(this.hoverLayer);
    }
  }

  private _getQueryableLayers() {
    this.map.getMangolAllLayers().forEach((layer: MangolLayer) => {
      if (layer.isQueryable() && layer.getVisible()) {
        this.layers.push(layer);
      }
    });
  }

  private _setCursor(cursorType: string) {
    if (this.map) {
      const target = this.map.getTarget();
      // jQuery hack to convert the mouse cursor to a crosshair
      const jTarget = typeof target === 'string' ? $('#' + target) : $(target);
      jTarget.css('cursor', cursorType);
    }
  }

  private _getFeatureInfoUrl(source: any, coordinate: any, resolution: any, srs: any) {
    const styles = source.getParams().hasOwnProperty('STYLES') ? source.getParams().STYLES : '';
    const url = source.getGetFeatureInfoUrl(coordinate, resolution, srs, {
      'INFO_FORMAT': 'application/json',
      'FEATURE_COUNT': this.maxFeatures,
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

  private _activateClick(layer: any) {
    this._deactivateClick();
    this._setCursor(this.cursorStyle);
    this.clickEvent = ((evt: any) => {
      this.features = [];
      if (layer instanceof ol.layer.Tile) {
        const url = this._getFeatureInfoUrl(layer.getSource(), evt.coordinate,
          this.map.getView().getResolution(), this.map.getView().getProjection());
        if (url) {
          this.featureInfoService.getFeatureInfo(url).subscribe((data: any) => {
            if (data.hasOwnProperty('features')) {
              // convert the GeoJSON response to Feature array
              this.features = this.geojson.readFeatures(data);
              this.openSnackBar(`${this.features.length} feature${this.features.length === 1 ? '' : 's'} found.`, 'Close');
            }
          });
        }
      } else {
        this.openSnackBar('Currently only WMS query is supported. Please select another layer!', 'Close');
      }
    });
    this.map.on('singleclick', this.clickEvent);
  }

}
