import { filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
declare var jsPDF: any;
import { MatSelectChange } from '@angular/material';

import Map from 'ol/Map';
import * as fromMangol from './../../store/mangol.reducers';

export interface Layout {
  name: string;
  value: string;
}

@Component({
  selector: 'mangol-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  map$: Observable<Map>;
  layouts: Layout[];
  dims: any;
  resolutions: number[];

  selectedLayout: Layout = null;
  selectedDim: string = null;
  selectedResolution: number = null;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.map$ = this.store
      .select(state => state.map.map)
      .pipe(filter(m => m !== null));
  }

  ngOnInit() {
    this.layouts = [
      {
        name: 'Landscape',
        value: 'landscape'
      },
      {
        name: 'Portrait',
        value: 'portrait'
      }
    ];
    this.resolutions = [72, 100, 150, 300];
    this.dims = {
      A5: [210, 148],
      A4: [297, 210],
      A3: [420, 297],
      A2: [594, 420],
      A1: [841, 594],
      A0: [1189, 841]
    };
  }

  // http://stackoverflow.com/questions/31956403/printing-in-openlayers-3-pdf
  print(): void {
    this.map$.pipe(take(1)).subscribe(m => {
      const map = m;
      const layout = this.selectedLayout;
      const format = this.selectedDim;
      const dim = this.dims[format];
      const resolution = this.selectedResolution;
      const width = Math.round(
        ((layout.value === 'landscape' ? dim[0] : dim[1]) * resolution) / 25.4
      );
      const height = Math.round(
        ((layout.value === 'landscape' ? dim[1] : dim[0]) * resolution) / 25.4
      );
      const size = map.getSize();
      const extent = map.getView().calculateExtent(size);
      map.once('postcompose', (event: any) => {
        let interval: any;
        interval = setInterval(function() {
          clearInterval(interval);
          const canvas = event['context']['canvas'];
          const data = canvas.toDataURL('image/jpeg');
          const pdf = new jsPDF(layout.value, undefined, format);
          pdf.addImage(
            data,
            'JPEG',
            0,
            0,
            layout.value === 'landscape' ? dim[0] : dim[1],
            layout.value === 'landscape' ? dim[1] : dim[0]
          );
          pdf.save('map.pdf');
          map.setSize(size);
          map.getView().fit(extent);
          map.renderSync();
        }, 5000);
      });
      map.setSize([width, height]);
      map.getView().fit(extent);
      map.renderSync();
    });
  }

  onLayoutChange(evt: MatSelectChange) {
    this.selectedLayout = evt.value;
  }

  onSizeChange(evt: MatSelectChange) {
    this.selectedDim = evt.value;
  }

  onResolutionChange(evt: MatSelectChange) {
    this.selectedResolution = evt.value;
  }
}
