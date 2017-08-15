import { Component, Inject } from '@angular/core';

@Component({
    selector: 'mangol-demo',
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
                <div class="subtitle">built with version 0.4.0</div>
                <nav>
                    <button md-raised-button color="primary" routerLink="/demo-map" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">map</button>
                    <button md-raised-button color="primary" routerLink="/demo-sidebar" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">sidebar</button>
                    <button md-raised-button color="primary" routerLink="/demo-layertree" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">layertree</button>
                    <button md-raised-button color="primary" routerLink="/demo-print" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">print</button>
                    <button md-raised-button color="primary" routerLink="/demo-measure" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">measure</button>
                    <button md-raised-button color="primary" routerLink="/demo-osmgwc" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">osmgwc</button>
                    <button md-raised-button color="primary" routerLink="/demo-full" routerLinkActive="active"
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
