import { Component, OnInit } from '@angular/core';
import { Card } from '../components/card/card';
import * as MOCK from 'src/app/models/products.mock.json';
import { IProduct, IProductsApiResponse } from '../models';
import { ProductService } from '../services/product.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductModal } from '../components/product-modal/product-modal';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-menu-page.component',
  imports: [Card, PaginatorModule, ProductModal],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPage implements OnInit {
  first: number = 0;
  rows: number = 3;
  products = <IProductsApiResponse>MOCK; //MOCK for now, rewrite using signal() in future
  dialogVisible = false;
  selectedProduct: IProduct;
  constructor(
    private productService: ProductService,
    private snackBar: SnackbarService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.openProductById(id);
      } else {
        this.dialogVisible = false;
      }
    });
  }

  openProductById(id: string) {
    const product = this.products.items.find((p) => p._id === id);

    if (!product) {
      this.dialogVisible = false;
      this.router.navigate(['menu']);
      this.snackBar.showError('Product not found');

      return;
    }
    this.selectedProduct = product;
    this.dialogVisible = true;
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  getProducts(): void {
    this.productService.getList(); //TODO: add pagination & filter field overloads
  }
}
