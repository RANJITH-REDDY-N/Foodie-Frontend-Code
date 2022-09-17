import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock : HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[DashboardService],
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
      expect(service).toBeTruthy();
    });
});
