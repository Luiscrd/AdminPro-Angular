import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progrsbar',
  templateUrl: './progrsbar.component.html',
  styleUrls: ['./progrsbar.component.css']
})
export class ProgrsbarComponent {

  @Input() progreso: number = 50;
  @Input() color: string = 'bg-primary';

  get getProgresBar() {
    return `${this.progreso}%`
  }

}
