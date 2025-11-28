import { Component, Input, OnChanges, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { IProduct } from 'src/app/models';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { Image } from 'primeng/image';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';

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
    TableModule,
    ChipModule,
    DividerModule,
  ],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.scss',
})
export class ProductModal implements OnChanges {
  @Input() visible: boolean = true;
  @Input() product: IProduct | null;

  inputValue: number = 0;
  productDetails = signal<[string, string | number][]>([]);

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}
  ngOnChanges() {
    if (this.product) {
      this.productDetails.set(Object.entries(this.product.details));
    }
  }
  onCloseDialog() {
    this.visible = false;
    this.router.navigate(['menu']);
  }
}
