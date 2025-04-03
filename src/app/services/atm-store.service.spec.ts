import { TestBed } from '@angular/core/testing';

import { AtmStoreService } from './atm-store.service';

describe('AtmStoreService', () => {
  let service: AtmStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
