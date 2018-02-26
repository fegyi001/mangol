import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import { MangolMap } from '../../classes/map.class';
import { MangolConfigMapControllerMousePosition } from '../../interfaces/config-map-controllers.interface';

@Component({
  selector: 'mangol-mouse-position',
  templateUrl: './mouse-position.component.html'
})
export class MangolMousePositionComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mangol-mouse-position';

  @Input() map: MangolMap;
  @Input() opts: MangolConfigMapControllerMousePosition;

  coordinates: number[];
  precision: number;
  pointerMoveListener: any;

  constructor() {
    this.coordinates = [];
  }

  ngOnInit() {
    this.precision = this.opts.hasOwnProperty('precision')
      ? this.opts.precision
      : 2;
    this.coordinates = this._formatCoordinates(this.map.getView().getCenter());
    this.pointerMoveListener = this.map.on('pointermove', (evt: any) => {
      if (evt.dragging) {
        return;
      } else {
        this.coordinates = this._formatCoordinates(evt.coordinate);
      }
    });
  }

  ngOnDestroy() {
    this.map.un('pointermove', this.pointerMoveListener);
  }

  private _formatCoordinates(coords: any[]): number[] {
    const formattedCoords: number[] = [];
    coords.forEach((coord: any) => {
      coord = parseFloat(coord).toFixed(this.precision);
      formattedCoords.push(coord);
    });
    return formattedCoords;
  }
}
