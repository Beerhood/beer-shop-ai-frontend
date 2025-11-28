import { Component, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() product: Product;

  constructor(private readonly router: Router) {}

  openProductModal() {
    this.router.navigate(['menu', this.product._id]);
  }
}
