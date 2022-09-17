import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock : HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[LoginService],
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
