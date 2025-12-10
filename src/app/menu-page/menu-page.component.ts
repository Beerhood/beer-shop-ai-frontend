import { Component, OnInit, signal } from '@angular/core';
import { Card } from '../components/card/card';
import { ApiError, Product, ProductApiResponse, ProductsApiResponse } from '../models';
import { ProductService } from '../services/product.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductModal } from '../components/product-modal/product-modal';
import { SnackbarService } from '../services/snackbar.service';
import { firstValueFrom } from 'rxjs';
import { IListParams } from '../services';

@Component({
  selector: 'app-menu-page.component',
  imports: [Card, PaginatorModule, ProductModal],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPage implements OnInit {
  first: number = 1;
  elements: number = 12;
  totalRecords: number;
  products = signal<Product[]>([]);
  dialogVisible = false;
  selectedProduct = signal<Product | null>(null);
  constructor(
    private productService: ProductService,
    private snackBar: SnackbarService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadProducts();

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
      const response: ProductApiResponse = await firstValueFrom(this.getProductById(id));

      const product = response as Product;

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

  loadProducts(): void {
    this.getProducts({ limit: this.elements, skip: this.first }).subscribe({
      next: (response: ProductsApiResponse) => {
        this.products.set(response.items);
        this.totalRecords = response.totalCount;
      },
      error: (error: ApiError) => {
        this.snackBar.showError(error.statusCode + ': ' + error.message);
        console.error(error);
      },
    });
  }

  onPageChange(event: PaginatorState) {
    event.first === 0 ? (this.first = event.first + 1) : (this.first = event.first as number);
    this.elements = event.rows ?? 3;
    this.loadProducts();
  }

  getProducts(params: IListParams) {
    return this.productService.getList(params);
  }

  getProductById(id: string) {
    return this.productService.getById(id);
  }
}
