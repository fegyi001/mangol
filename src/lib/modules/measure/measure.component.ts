import { Component, OnInit, Input, HostBinding, NgModule, ModuleWithProviders, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleChange } from '@angular/material';

import { MangolMap } from './../../core/_index';

declare var $: any;
import * as ol from 'openlayers';

export interface MeasureButton {
  title: string,
  value: string,
  geometryType: ol.geom.GeometryType,
  fontSet: string,
  fontIcon: string
}

@Component({
  selector: 'mangol-measure',
  templateUrl: './measure.component.html'
})
export class MangolMeasureComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mangol-measure';

  @Input() map: MangolMap;

  precision: number;
  cursorStyle: string;
  buttons: MeasureButton[];
  layer: ol.layer.Vector = null;
  selected: MeasureButton = null;
  draw: ol.interaction.Draw = null;
  value: number;
  units: string;

  constructor() {
    this.buttons = [];
  }

  ngOnInit() {
    this.value = null;
    this.precision = 2;
    this.cursorStyle = 'crosshair';
    this.units = this.map.getView().getProjection().getUnits();
    this.buttons = [{
      title: 'Measure line',
      value: 'line',
      geometryType: 'LineString',
      fontSet: 'ms',
      fontIcon: 'ms-measure-distance'
    }, {
      title: 'Measure area',
      value: 'area',
      geometryType: 'Polygon',
      fontSet: 'ms',
      fontIcon: 'ms-measure-area'
    }];
    this.layer = new ol.layer.Vector({
      source: new ol.source.Vector(),
      style: (feature: ol.Feature) => {
        return this._getStyle(feature);
      }
    });
    this.map.addLayer(this.layer);
  }

  ngOnDestroy() {
    this.deactivateDraw();
    this.map.removeLayer(this.layer);
  }

  onToggleChange(evt: MatButtonToggleChange) {
    this.selected = evt.value;
    this.layer.getSource().clear();
    this.activateDraw();
  }

  activateDraw() {
    this.deactivateDraw();
    this._setCursor(this.cursorStyle);
    this.draw = new ol.interaction.Draw({
      source: this.layer.getSource(),
      type: this.selected.geometryType,
      style: (feature: ol.Feature) => {
        return this._getStyle(feature);
      }
    });
    this.draw.on('drawstart', (e: any) => {
      this.value = null;
      this.layer.getSource().clear();
    });
    this.draw.on('drawend', (e: any) => {
      const feat: ol.Feature = new ol.Feature({
        geometry: e.target
      });
      this._getLengthOrArea(feat);
    });
    this.draw.setActive(true);
    this.map.addInteraction(this.draw);
  }

  deactivateDraw() {
    this._setCursor('');
    try {
      this.map.removeInteraction(this.draw);
    } catch (error) {
    }
  }

  getDimension() {
    return this.selected.geometryType === 'LineString' ? `${this.units}` : `${this.units}&sup2;`;
  }

  private _setCursor(cursorType: string) {
    if (this.map) {
      const target = this.map.getTarget();
      // jQuery hack to convert the mouse cursor to a crosshair
      const jTarget = typeof target === 'string' ? $('#' + target) : $(target);
      jTarget.css('cursor', cursorType);
    }
  }

  private _getLengthOrArea(feature: ol.Feature): string {
    let value = '';
    const geom: any = feature.getGeometry();
    switch (this.selected.geometryType) {
      case 'LineString':
        try {
          value = parseFloat(geom.getLength().toString()).toFixed(this.precision).toString();
        } catch (error) { }
        break;
      case 'Polygon':
        try {
          value = parseFloat(geom.getArea().toString()).toFixed(this.precision).toString();
        } catch (error) { }
        break;
      default:
        break;
    }
    if (value !== '') {
      this.value = +value;
    }
    return value;
  }

  private _getStyle(feature: ol.Feature): ol.style.Style[] {
    return [new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.5)'
      }),
      stroke: new ol.style.Stroke({
        color: 'white',
        width: 3
      })
    }), new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#484848',
        width: 2
      }),
      text: new ol.style.Text({
        textAlign: 'center',
        textBaseline: 'middle',
        text: this._getLengthOrArea(feature),
        font: 'normal 14px Arial',
        fill: new ol.style.Fill({
          color: '#484848'
        }),
        offsetX: 0,
        offsetY: 0,
        rotation: 0,
        stroke: new ol.style.Stroke({
          color: 'white',
          width: 3
        }),
      })
    })];
  }

}
