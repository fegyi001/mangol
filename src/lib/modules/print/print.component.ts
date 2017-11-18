import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { MangolMap } from './../../core/_index';

declare var jsPDF: any;

@Component({
  selector: 'mangol-print',
  templateUrl: './print.component.html'
})
export class MangolPrintComponent implements OnInit {
  @HostBinding('class') class = 'mangol-print';

  @Input() map: MangolMap;
  dims: any;
  resolutions: number[];
  selectedDim: string = null;
  selectedResolution: number = null;

  constructor() {

  }

  public ngOnInit(): any {
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
    const format = this.selectedDim;
    const resolution = this.selectedResolution;
    const dim = this.dims[format];
    const width = Math.round(dim[0] * resolution / 25.4);
    const height = Math.round(dim[1] * resolution / 25.4);
    const size = map.getSize();
    const extent = map.getView().calculateExtent(size);
    map.once('postcompose', (event: any) => {
      let interval: any;
      interval = setInterval(function () {
        clearInterval(interval);
        const canvas = event['context']['canvas'];
        const data = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF('landscape', undefined, format);
        pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
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

  onSizeChange(evt: MatSelectChange) {
    this.selectedDim = evt.value;
  }

  onResolutionChange(evt: MatSelectChange) {
    this.selectedResolution = evt.value;
  }

}

