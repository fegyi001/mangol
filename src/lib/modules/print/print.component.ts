import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { MangolMap } from './../../core/_index';

declare var jsPDF: any;

export interface Layout {
  name: string,
  value: string
}

@Component({
  selector: 'mangol-print',
  templateUrl: './print.component.html'
})
export class MangolPrintComponent implements OnInit {
  @HostBinding('class') class = 'mangol-print';

  @Input() map: MangolMap;
  layouts: Layout[];
  dims: any;
  resolutions: number[];

  selectedLayout: Layout = null;
  selectedDim: string = null;
  selectedResolution: number = null;

  constructor() {

  }

  public ngOnInit(): any {
    this.layouts = [{
      name: 'Landscape',
      value: 'landscape'
    }, {
      name: 'Portrait',
      value: 'portrait'
    }];
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
  public print(): void {
    const map = this.map;
    const layout = this.selectedLayout;
    const format = this.selectedDim;
    const dim = this.dims[format];
    const resolution = this.selectedResolution;
    const width = Math.round((layout.value === 'landscape' ? dim[0] : dim[1]) * resolution / 25.4);
    const height = Math.round((layout.value === 'landscape' ? dim[1] : dim[0]) * resolution / 25.4);
    const size = map.getSize();
    const extent = map.getView().calculateExtent(size);
    map.once('postcompose', (event: any) => {
      let interval: any;
      interval = setInterval(function () {
        clearInterval(interval);
        const canvas = event['context']['canvas'];
        const data = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF(layout.value, undefined, format);
        pdf.addImage(data, 'JPEG', 0, 0,
          (layout.value === 'landscape' ? dim[0] : dim[1]), (layout.value === 'landscape' ? dim[1] : dim[0]));
        pdf.save('map.pdf');
        map.setSize(size);
        map.getView().fit(extent);
        map.renderSync();
      }, 5000);
    });
    map.setSize([width, height]);
    map.getView().fit(extent);
    map.renderSync();
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

