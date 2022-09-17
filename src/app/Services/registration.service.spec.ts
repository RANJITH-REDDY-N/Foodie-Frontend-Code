import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock : HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[RegistrationService],
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(RegistrationService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
