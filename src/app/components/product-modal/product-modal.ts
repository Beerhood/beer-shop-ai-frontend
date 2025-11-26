import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { IProduct } from 'src/app/models';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { Image } from 'primeng/image';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-product-modal',
  imports: [
    Dialog,
    ButtonModule,
    FormsModule,
    InputNumber,
    ButtonGroupModule,
    Image,
    FieldsetModule,
  ],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.scss',
})
export class ProductModal {
  @Input() visible: boolean = true;
  @Input() product: IProduct | null;

  inputValue: number = 0;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  onCloseDialog() {
    this.visible = false;
    this.router.navigate(['menu']);
  }
}
