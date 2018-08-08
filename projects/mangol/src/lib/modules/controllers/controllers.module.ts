import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ControllersComponent } from './controllers.component';
import { CursorComponent } from './cursor/cursor.component';
import { PositionComponent } from './position/position.component';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import { ZoomButtonsComponent } from './zoom-buttons/zoom-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule
  ],
  declarations: [
    ControllersComponent,
    SidebarButtonComponent,
    ZoomButtonsComponent,
    CursorComponent,
    PositionComponent
  ],
  exports: [ControllersComponent]
})
export class ControllersModule {}
