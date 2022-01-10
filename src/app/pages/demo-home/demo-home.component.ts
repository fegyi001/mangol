import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'app-demo-home',
  templateUrl: './demo-home.component.html',
  styleUrls: ['./demo-home.component.scss']
})
export class DemoHomeComponent {
  @HostBinding('class') class = 'demo-home'

  logoSrc = 'assets/img/logo/mangol_logo.png'
}
