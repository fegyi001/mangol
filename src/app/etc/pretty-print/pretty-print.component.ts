import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';

declare var PR: any;

@Component({
  selector: 'app-pretty-print',
  templateUrl: './pretty-print.component.html',
  styleUrls: ['./pretty-print.component.scss']
})
export class PrettyPrintComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() code: string;

  constructor() {}

  ngOnInit() {}

  ngAfterViewChecked() {
    PR.prettyPrint();
  }

  ngAfterViewInit() {
    // PR.prettyPrint();
  }
}
