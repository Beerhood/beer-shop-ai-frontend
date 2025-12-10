import { Injectable } from '@angular/core';
import { ApiError, OrderItem, ProductsApiResponse } from '../models';
import { ProductService } from './product.service';
import { SnackbarService } from './snackbar.service';

const CART_KEY = 'beerhood_cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: OrderItem[] = [];

  constructor(
    private productService: ProductService,
    private snackBar: SnackbarService,
  ) {
    this.loadCart();
  }

  getCartItems(): OrderItem[] {
    return this.items;
  }

  addToCart(item: OrderItem): void {
    const existingItem = this.items.find((cartItem) => cartItem.itemId === item.itemId);
    if (existingItem) {
      existingItem.count += item.count;
    } else {
      this.items.push(item);
    }
    this.syncCart();
  }

  removeFromCart(productId: string): void {
    this.items = this.items.filter((item) => item.itemId !== productId);
    this.syncCart();
  }

  private syncCart(): void {
    localStorage.setItem(CART_KEY, JSON.stringify(this.items));
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem(CART_KEY);
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  clearCart(): void {
    this.items = [];
    this.syncCart();
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    const itemIds = this.items.map((item) => item.itemId);
    this.productService.getList({ filter: { itemIds } }).subscribe({
      next: (response: ProductsApiResponse) => {
        response.items.forEach((product) => {
          const cartItem = this.items.find((item) => item.itemId === product._id);
          if (cartItem) {
            totalPrice += product.price * cartItem.count;
          }
        });
      },
      error: (error: ApiError) => {
        this.snackBar.showError(error.statusCode + ': ' + error.message);
        console.error(error);
      },
    });
    return totalPrice;
  }
}
