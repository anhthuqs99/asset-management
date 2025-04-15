import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AtmService } from './atm.service';

describe('AtmService', () => {
  let service: AtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AtmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
