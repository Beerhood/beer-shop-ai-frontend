import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ProductService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    }).compileComponents();
  });
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
