import { Component, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
// import { CartService } from '../services/cart.service';
import { ApiError, 
  // OrderItem, 
  Product, ProductsApiResponse } from '../models';
import { ProductService } from '../services/product.service';
import { SnackbarService } from '../services/snackbar.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-order-page',
  imports: [
    TableModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FormsModule,
    Message,
    Button,
    InputNumber,
  ],
  templateUrl: './order-page.component.html',
})
export class OrderPage implements OnInit {
  products = signal<Product[]>([]);
  // cart: OrderItem[] = [];

  text1: string | undefined;

  text2: string | undefined;

  text3: string | undefined;

  number: string | undefined;

  value: any;

  constructor(
    // private cartService: CartService,
    private productService: ProductService,
    private snackBar: SnackbarService,
  ) {}

  ngOnInit(): void {
    // this.cart = this.cartService.getCartItems();
    this.getProductsList();
  }

  getProductsList() {
    this.productService
      .getList({
        // filter: { _id: this.cart.map((product) => product.itemId) },
      })
      .subscribe({
        next: (response: ProductsApiResponse) => {
          this.products.set(response.items);
        },
        error: (error: ApiError) => {
          this.snackBar.showError(error.statusCode + ': ' + error.message);
          console.error(error);
        },
      });
  }

  onSubmit(form: any) {}
}
