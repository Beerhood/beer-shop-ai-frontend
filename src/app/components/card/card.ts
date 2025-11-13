import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() titleValue: string = '';
  @Input() subtitleValue: string = '';
  @Input() descriptionValue: string = ''

}
