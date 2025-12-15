import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('User', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    }).compileComponents();
  });
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
