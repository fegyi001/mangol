import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mangol-tile-load',
  templateUrl: './tile-load.component.html',
  styleUrls: ['./tile-load.component.scss']
})
export class TileLoadComponent implements OnInit {
  @Input() tiles: any[];

  constructor() {}

  ngOnInit() {}
}
