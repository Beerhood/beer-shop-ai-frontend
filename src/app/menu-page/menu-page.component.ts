import { Component, OnInit, signal } from '@angular/core';
import { Card } from '../components/card/card';
import * as MOCK from 'src/app/models/products.mock.json';
import { ApiError, IProduct, IProductApiResponse, IProductsApiResponse } from '../models';
import { ProductService } from '../services/product.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductModal } from '../components/product-modal/product-modal';
import { SnackbarService } from '../services/snackbar.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-menu-page.component',
  imports: [Card, PaginatorModule, ProductModal],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPage implements OnInit {
  first: number = 0;
  rows: number = 3;
  products = signal<IProduct[]>([]);
  dialogVisible = false;
  selectedProduct = signal<IProduct | null>(null);
  constructor(
    private productService: ProductService,
    private snackBar: SnackbarService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getProducts().subscribe({
      next: (response: IProductsApiResponse) => {
        this.products.set(response.items);
      },
      error: (error: ApiError) => {
        this.snackBar.showError(error.statusCode + ': ' + error.message);
        console.error(error);
      },
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        void this.openProductById(id);
      } else {
        this.dialogVisible = false;
      }
    });
  }

  async openProductById(id: string): Promise<void> {
    try {
      const response: IProductApiResponse = await firstValueFrom(this.getProductById(id));

      const product = response as IProduct;

      if (!product) {
        this.dialogVisible = false;
        this.selectedProduct.set(null);
        this.router.navigate(['/menu']);
        this.snackBar.showError('Product not found');
        return;
      }

      this.selectedProduct.set(product);
      this.dialogVisible = true;
    } catch (error: any) {
      const apiError = error as ApiError;
      this.dialogVisible = false;
      this.selectedProduct.set(null);
      this.snackBar.showError(
        apiError?.statusCode + ': ' + apiError?.message || 'Product load failed',
      );
      console.error(error);
    }
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  getProducts() {
    return this.productService.getList();
    //TODO: add pagination & filter field overloads
  }

  getProductById(id: string) {
    return this.productService.getById(id);
  }
}
