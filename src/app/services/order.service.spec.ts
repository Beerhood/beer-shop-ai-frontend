import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('OrderService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    }).compileComponents();
  });
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
