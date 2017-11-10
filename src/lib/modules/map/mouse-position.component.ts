import { HostBinding, OnInit, OnDestroy, Component, Input } from '@angular/core';
import { MangolMap } from '../../core/map';
import { MangolConfigMapControllerMousePosition } from '../../interfaces/mangol-config-map-controllers.interface';

@Component({
  selector: 'mangol-mouse-position',
  templateUrl: './mouse-position.component.html'
})
export class MangolMousePositionComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mangol-mouse-position';

  @Input() map: MangolMap;
  @Input() opts: MangolConfigMapControllerMousePosition

  coordinates: number[];
  precision: number;
  pointerMoveListener: any;

  constructor() {
    this.coordinates = [];
  }

  ngOnInit() {
    this.precision = this.opts.hasOwnProperty('precision') ? this.opts.precision : 2;
    this.pointerMoveListener = this.map.on('pointermove', (evt: any) => {
      if (evt.dragging) {
        return;
      } else {
        let coord1: any = evt.coordinate[0];
        coord1 = parseFloat(coord1).toFixed(this.precision);
        let coord2: any = evt.coordinate[1];
        coord2 = parseFloat(coord2).toFixed(this.precision);
        this.coordinates = [coord1, coord2];
      }
    });
  }

  ngOnDestroy() {
    this.map.un('pointermove', this.pointerMoveListener);
  }

}
