import { Component, Inject } from '@angular/core';

@Component({
  selector: 'mangol-demo',
  template: `
    <div class="mangol-demo">
      <div class="ribbon-box">
            <div class="ribbon-wrapper">
                <a href="https://github.com/fegyi001/mangol" target="_blank" matTooltip="Fork me on GitHub" matTooltipPosition="left">
                    <div class="ribbon">
                        <i class="fa fa-github"></i>
                    </div>
                </a>
            </div>
        </div>
        <div class="demo">
            <div class="demo-header">
                <h1 class="title">MANGOL 0.5.3 components</h1>
                <div class="subtitle">built with: Angular 5.0.0 | OpenLayers 4.4.2
                | Angular CLI 1.5.0 | Angular Material 2.0.0-beta.12 | TypeScript 2.4.2</div>
                <nav>
                    <button mat-raised-button color="primary" routerLink="/demo-map" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">map</button>
                    <button mat-raised-button color="primary" routerLink="/demo-sidebar" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">sidebar</button>
                    <button mat-raised-button color="primary" routerLink="/demo-layertree" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">layertree</button>
                    <button mat-raised-button color="primary" routerLink="/demo-print" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">print</button>
                    <button mat-raised-button color="primary" routerLink="/demo-measure" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">measure</button>
                    <button mat-raised-button color="primary" routerLink="/demo-osmgwc" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">osmgwc</button>
                    <button mat-raised-button color="primary" routerLink="/demo-full" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">full functionality</button>
                </nav>
            </div>
            <div class="demo-content">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
      `
})
export class MangolDemoComponent { }
