import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'mangol-demo-home',
  templateUrl: './demo-home.component.html',
  styleUrls: ['./demo-home.component.scss']
})
export class DemoHomeComponent implements OnInit {
  @HostBinding('class') class = 'demo-home';

  logoSrc = 'assets/img/logo/mangol_logo.png';

  constructor() {}

  ngOnInit() {}
}
