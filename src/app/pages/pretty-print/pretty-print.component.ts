import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

declare var PR: any;

@Component({
  selector: 'app-pretty-print',
  templateUrl: './pretty-print.component.html',
  styleUrls: ['./pretty-print.component.scss']
})
export class PrettyPrintComponent implements OnInit, AfterViewInit {
  @Input() code: string;

  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    PR.prettyPrint();
  }
}
