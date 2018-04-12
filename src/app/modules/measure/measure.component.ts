import { Subscription } from 'rxjs/Subscription';
import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import * as ol from 'openlayers';

import { MangolMap } from '../../classes/map.class';
import { MangolConfigMeasureItem } from '../../interfaces/config-toolbar.interface';
import { MangolMeasureService } from './measure.service';

declare var $: any;
export interface MeasureButton {
  title: string;
  value: string;
  geometryType: any;
  fontSet: string;
  fontIcon: string;
}

@Component({
  selector: 'mangol-measure',
  templateUrl: './measure.component.html'
})
export class MangolMeasureComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mangol-measure';

  @Input() map: MangolMap;
  @Input() opts: MangolConfigMeasureItem;

  precision: number;
  cursorStyle: string;
  fillColor: [number, number, number, number];
  strokeColor: [number, number, number, number];
  textColor: [number, number, number, number];
  textOutlineColor: [number, number, number, number];
  font: string;

  buttons: MeasureButton[];
  layer: ol.layer.Vector = null;
  selected: MeasureButton = null;
  draw: ol.interaction.Draw = null;
  value: number;
  units: string;

  activateStateSubscription: Subscription;

  constructor(private measureService: MangolMeasureService) {
    this.buttons = [];
    this.value = null;
    this.activateStateSubscription = this.measureService.activateState$.subscribe(
      state => {
        if (state !== null) {
          if (state && this.selected !== null) {
            this.activateDraw();
          } else {
            this.deactivateDraw();
          }
        }
      }
    );
  }

  ngOnInit() {
    // Read user-defined parameters
    this.precision =
      this.opts && this.opts.hasOwnProperty('precision')
        ? this.opts.precision
        : 2;
    this.cursorStyle =
      this.opts && this.opts.hasOwnProperty('cursorStyle')
        ? this.opts.cursorStyle
        : 'crosshair';
    this.fillColor =
      this.opts && this.opts.hasOwnProperty('fillColor')
        ? this.opts.fillColor
        : [255, 255, 255, 0.5];
    this.strokeColor =
      this.opts && this.opts.hasOwnProperty('strokeColor')
        ? this.opts.strokeColor
        : [72, 72, 72, 1];
    this.textColor =
      this.opts && this.opts.hasOwnProperty('textColor')
        ? this.opts.textColor
        : [this.strokeColor[0], this.strokeColor[1], this.strokeColor[2], 1];
    this.textOutlineColor =
      this.opts && this.opts.hasOwnProperty('textOutlineColor')
        ? this.opts.textOutlineColor
        : [this.fillColor[0], this.fillColor[1], this.fillColor[2], 0.7];
    this.font =
      this.opts && this.opts.hasOwnProperty('font')
        ? this.opts.font
        : 'normal 14px Arial';

    this.units = this.map
      .getView()
      .getProjection()
      .getUnits();
    this.buttons = [
      {
        title: 'Measure distance',
        value: 'line',
        geometryType: 'LineString',
        fontSet: 'ms',
        fontIcon: 'ms-measure-distance'
      },
      {
        title: 'Measure area',
        value: 'area',
        geometryType: 'Polygon',
        fontSet: 'ms',
        fontIcon: 'ms-measure-area'
      },
      {
        title: 'Meesure radius',
        value: 'radius',
        geometryType: 'Circle',
        fontSet: 'ms',
        fontIcon: 'ms-geolocation'
      }
    ];
    this.layer = new ol.layer.Vector({
      source: new ol.source.Vector(),
      style: (feature: ol.Feature) => {
        return this._getStyle(feature);
      }
    });
  }

  ngOnDestroy() {
    this.deactivateDraw();
    if (this.activateStateSubscription) {
      this.activateStateSubscription.unsubscribe();
    }
  }

  onToggleChange(evt: MatButtonToggleChange) {
    this.selected = evt.value;
    this.measureService.activateState$.next(true);
  }

  activateDraw() {
    this.deactivateDraw();
    this.map.addLayer(this.layer);
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
      const feat = new ol.Feature({
        geometry: e.target
      });
      this._getLengthOrArea(feat);
    });
    this.draw.setActive(true);
    this.map.addInteraction(this.draw);
  }

  deactivateDraw() {
    this._setCursor('');
    this.value = null;
    try {
      this.map.removeInteraction(this.draw);
      this.layer.getSource().clear();
      this.map.removeLayer(this.layer);
    } catch (error) {}
  }

  getDimension() {
    return this.selected.geometryType !== 'Polygon'
      ? `${this.units}`
      : `${this.units}&sup2;`;
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
          value = parseFloat(geom.getLength().toString())
            .toFixed(this.precision)
            .toString();
        } catch (error) {}
        break;
      case 'Polygon':
        try {
          value = parseFloat(geom.getArea().toString())
            .toFixed(this.precision)
            .toString();
        } catch (error) {}
        break;
      case 'Circle':
        try {
          value = parseFloat(geom.getRadius().toString())
            .toFixed(this.precision)
            .toString();
        } catch (error) {}
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
    return [
      new ol.style.Style({
        fill: new ol.style.Fill({
          color: this.fillColor
        })
      }),
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: this.strokeColor,
          width: 2,
          lineDash: [5, 5]
        }),
        text: new ol.style.Text({
          textAlign: 'center',
          textBaseline: 'middle',
          text: this._getLengthOrArea(feature),
          font: this.font,
          fill: new ol.style.Fill({
            color: this.textColor
          }),
          offsetX: 0,
          offsetY: 0,
          rotation: 0,
          stroke: new ol.style.Stroke({
            color: this.textOutlineColor,
            width: 3
          })
        })
      })
    ];
  }
}
