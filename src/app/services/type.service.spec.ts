import { TestBed } from '@angular/core/testing';

import { TypeService } from './type.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TypeService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    }).compileComponents();
  });
  let service: TypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
