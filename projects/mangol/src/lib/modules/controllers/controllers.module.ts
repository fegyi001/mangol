import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControllersComponent } from './controllers.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import { ZoomButtonsComponent } from './zoom-buttons/zoom-buttons.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [
    ControllersComponent,
    SidebarButtonComponent,
    ZoomButtonsComponent
  ],
  exports: [ControllersComponent]
})
export class ControllersModule {}
