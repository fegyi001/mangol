import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mangol',
  templateUrl: './mangol.component.html',
  styleUrls: ['./mangol.component.scss']
})
export class MangolComponent implements OnInit {
  @Input() config: any;
  sidebarOpened = false;
  sidebarMode: string;

  constructor() {}

  ngOnInit() {
    this.sidebarOpened = true;
    this.sidebarMode = 'side';

    console.log(this.config);
  }
}
