import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-map',
  templateUrl: './demo-map.component.html',
  styleUrls: ['./demo-map.component.scss']
})
export class DemoMapComponent implements OnInit {
  code = `
  import { Component } from '@angular/core';

  @Component({
    selector: 'mangol-demo-map',
    template: '<mangol></mangol>'
  })
  export class DemoMapComponent {

  }
  `;

  constructor() {}

  ngOnInit() {}
}
