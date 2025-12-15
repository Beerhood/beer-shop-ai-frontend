import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { SnackbarService } from '../services/snackbar.service';
import { TableModule } from 'primeng/table';
import { ApiError, OrderItem, OrderStatuses, Product, ProductsApiResponse } from '../models';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Message } from 'primeng/message';
import { Button, ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  imports: [
    TableModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FloatLabel,
  ],
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
})
export class OrderPage implements OnInit {
  orderForm: FormGroup;
  cart: OrderItem[] = [];
  products = signal<Product[]>([]);
  totalPrice = signal<number>(0);
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private snackBar: SnackbarService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.cart = this.cartService.getCartItems();
    this.orderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.getProductsList();
    this.totalPrice.set(await this.cartService.getTotalPrice());
  }

  getTotalPriceForProduct(productId: string, productPrice: number): number {
    const cartItem = this.cart.find((i) => i.item === productId);
    if (cartItem) {
      return cartItem.count * productPrice;
    }
    return 0;
  }

  getProductsList() {
    this.productService
      .getList({
        filter: { _id: this.cart.map((product) => product.item) },
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

  onSubmit() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      this.orderService
        .create({
          products: this.cart,
          address: orderData.address,
        })
        .subscribe({
          next: () => {
            this.cartService.clearCart();
            this.router.navigate(['/home']);
            this.snackBar.showSuccess('Order sended successfully');
          },
          error(err) {
            console.log(err);
          },
        });
    } else {
      console.log('Form is invalid!');
    }
  }
}
