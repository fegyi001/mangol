import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  @Input()
  apiUrl: string;
  apiFullUrl: string;

  constructor() {}

  ngOnInit() {
    this.apiFullUrl = `https://fegyi001.github.io/mangol/modules/${
      this.apiUrl
    }.html`;
  }

  openAPIPage() {
    window.open(this.apiFullUrl);
  }
}
