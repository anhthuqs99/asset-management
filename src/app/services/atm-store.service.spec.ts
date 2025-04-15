import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AtmStoreService } from './atm-store.service';
import { StoreModule } from '@ngrx/store';
import * as AtmStore from '../store/atm';

describe('AtmStoreService', () => {
  let service: AtmStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forFeature(AtmStore.atmFeatureKey, AtmStore.reducer),
        StoreModule.forRoot({}),
      ],
    });
    service = TestBed.inject(AtmStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
