import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AtmDetailComponent } from './atm-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as AtmStore from '../../store/atm';

describe('AtmDetailComponent', () => {
  let component: AtmDetailComponent;
  let fixture: ComponentFixture<AtmDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AtmDetailComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forFeature(AtmStore.atmFeatureKey, AtmStore.reducer),
        StoreModule.forRoot({}),
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AtmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
