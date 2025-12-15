import { Injectable } from '@angular/core';
import { OrderItem, ProductsApiResponse } from '../models';
import { ProductService } from './product.service';
import { firstValueFrom } from 'rxjs';

const CART_KEY = 'beerhood_cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: OrderItem[] = [];

  constructor(private productService: ProductService) {
    this.loadCart();
  }

  getCartItems(): OrderItem[] {
    return this.items;
  }

  addToCart(item: OrderItem): void {
    const existingItem = this.items.find((cartItem) => cartItem.item === item.item);
    if (existingItem) {
      existingItem.count += item.count;
    } else {
      this.items.push(item);
    }
    this.syncCart();
  }

  removeFromCart(productId: string): void {
    this.items = this.items.filter((i) => i.item !== productId);
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

  async getTotalPrice(): Promise<number> {
    let totalPrice = 0;
    const items = this.items.map((item) => item.item);

    try {
      const response: ProductsApiResponse = await firstValueFrom(
        this.productService.getList({ filter: { _id: { $in: items } } }),
      );

      response.items.forEach((product) => {
        const cartItem = this.items.find((i) => i.item === product._id);
        if (cartItem) {
          totalPrice += product.price * cartItem.count;
        }
      });
    } catch (error: unknown) {
      console.error(error);
    }

    return totalPrice;
  }
}
