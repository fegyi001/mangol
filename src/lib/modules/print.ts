import { Component, OnInit, Input, HostBinding, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { MangolMap } from '../core/_index';

declare var jsPDF: any;

@Component({
  selector: 'mangol-print',
  template: `
      <div>
          <button md-raised-button (click)='print()'>print to file</button>
          <div class="dev">PDF in A4 format with 72 dpi resolution. Detailed printing options will come soon.</div>
      </div>
    `
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
    let map = this.map;

    let format = 'a4';
    let resolution = 72;

    let dim = this.dims[format];
    let width = Math.round(dim[0] * resolution / 25.4);
    let height = Math.round(dim[1] * resolution / 25.4);
    let size = map.getSize();
    let extent = map.getView().calculateExtent(size);

    map.once('postcompose', function (event) {
      let interval: any;
      interval = setInterval(function () {
        clearInterval(interval);
        let canvas = event['context']['canvas'];
        let data = canvas.toDataURL('image/jpeg');
        let pdf = new jsPDF('landscape', undefined, format);
        pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
        pdf.save('map.pdf');
        map.setSize(size);
        map.getView().fit(extent, size);
        map.renderSync();
      }, 100);
    });
    map.setSize([width, height]);
    map.getView().fit(extent, (map.getSize()));
    map.renderSync();
  }

}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot()
  ],
  exports: [
    MangolPrintComponent
  ],
  declarations: [
    MangolPrintComponent
  ]
})
export class MangolPrintModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MangolPrintModule,
      providers: []
    };
  }
}

