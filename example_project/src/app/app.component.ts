import { Component, OnInit } from '@angular/core';
import MangolConfig from 'mangol/src/lib/interfaces/mangol-config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  mangolConfig: MangolConfig;

  ngOnInit() {
    this.mangolConfig = {
      sidebar: {
        collapsible: true,
        opened: true,
        toolbar: {
          layertree: {},
          measure: {
            fillColor: [255, 255, 0, 0.2]
          },
          print: {}
        }
      }
    };

  }
}

