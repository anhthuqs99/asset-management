import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, StoreModule } from '@ngrx/store';
import * as AtmStore from './store/atm';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(AtmStore.reducer),
    provideEffects([AtmStore.AtmEffects]),
    importProvidersFrom(
      StoreModule.forRoot({}),
      StoreModule.forFeature(AtmStore.atmFeatureKey, AtmStore.atmReducer),
      StoreModule.forFeature(AtmStore.atmFeatureKey, AtmStore.atmDetailReducer)
    ),
  ],
};
