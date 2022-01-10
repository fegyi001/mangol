import { Component, Input } from '@angular/core'

@Component({
  selector: 'mangol-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  @Input() description: string
}
