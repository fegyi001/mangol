import { AfterViewChecked, Component, Input } from '@angular/core'

declare let PR: any

@Component({
  selector: 'app-pretty-print',
  templateUrl: './pretty-print.component.html',
  styleUrls: ['./pretty-print.component.scss']
})
export class PrettyPrintComponent implements AfterViewChecked {
  @Input() code: string

  ngAfterViewChecked() {
    PR.prettyPrint()
  }
}
