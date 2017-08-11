import { Component, OnInit, Input, HostBinding } from '@angular/core';

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

  constructor() {

  }

  public ngOnInit(): any {
    this.dims = {
      a0: [1189, 841],
      a1: [841, 594],
      a2: [594, 420],
      a3: [420, 297],
      a4: [297, 210],
      a5: [210, 148]
    };
  }

  // http://stackoverflow.com/questions/31956403/printing-in-openlayers-3-pdf
  public print(): void {
    const map = this.map;

    const format = 'a4';
    const resolution = 72;

    const dim = this.dims[format];
    const width = Math.round(dim[0] * resolution / 25.4);
    const height = Math.round(dim[1] * resolution / 25.4);
    const size = map.getSize();
    const extent = map.getView().calculateExtent(size);

    map.once('postcompose', function (event: any) {
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
      }, 100);
    });
    map.setSize([width, height]);
    map.getView().fit(extent);
    map.renderSync();
  }

}
