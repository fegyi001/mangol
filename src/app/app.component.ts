import { Component, Inject } from '@angular/core';

@Component({
  selector: 'mangol-demo',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="mangol-demo">
      <div class="ribbon-box">
            <div class="ribbon-wrapper">
                <a href="https://github.com/fegyi001/mangol" target="_blank" title="GitHub repository">
                    <div class="ribbon">
                        <i class="fa fa-github"></i>
                    </div>
                </a>
            </div>
        </div>
        <div class="demo">
            <div class="demo-header">
                <h1 class="title">MANGOL components</h1>
                <nav>
                    <button md-raised-button color="primary" routerLink="/demo-map" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">map</button>
                    <button md-raised-button color="primary" routerLink="/demo-sidebar" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">sidebar</button>
                </nav>
            </div>
            <div class="demo-content">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
      `
})
export class MangolDemoComponent {
  // this is how you use a window
  constructor( @Inject(Window) window) {
  }
}
