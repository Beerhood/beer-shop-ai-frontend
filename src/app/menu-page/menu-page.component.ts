import { Component, OnInit } from '@angular/core';
import { Card } from '../components/card/card';
import * as MOCK from 'src/app/models/products.mock.json';
import { IProductsApiResponse } from '../models';
import { ProductService } from '../services/product.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-menu-page.component',
  imports: [Card, PaginatorModule],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPage implements OnInit {
  first: number = 0;

  rows: number = 3;
  products = <IProductsApiResponse>MOCK;//MOCK for now, rewrite using signal() in future

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  getProducts(): void {
    this.productService.getList(); //TODO: add pagination & filter field overloads
  }
}
