import { Component } from '@angular/core';

@Component({
  selector: 'mangol-demo-map',
  template: `
      <mangol></mangol>
      <mangol-pretty-print [code]="snippet"></mangol-pretty-print>
    `
})
export class DemoMapComponent {
  snippet = `
  import { Component } from '@angular/core';

  @Component({
    selector: 'mangol-demo-map',
    template: '<mangol></mangol>'
  })
  export class DemoMapComponent {
  }
  `;
}
