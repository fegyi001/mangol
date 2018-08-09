import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ControllersComponent } from './controllers.component';
import { CursorComponent } from './cursor/cursor.component';
import { PositionComponent } from './position/position.component';
import { RotationButtonComponent } from './rotation-button/rotation-button.component';
import { ScalebarComponent } from './scalebar/scalebar.component';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import { ZoomButtonsComponent } from './zoom-buttons/zoom-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  declarations: [
    ControllersComponent,
    SidebarButtonComponent,
    ZoomButtonsComponent,
    CursorComponent,
    PositionComponent,
    ScalebarComponent,
    RotationButtonComponent
  ],
  exports: [ControllersComponent]
})
export class ControllersModule {}
