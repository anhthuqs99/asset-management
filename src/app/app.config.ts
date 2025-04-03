import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideStore, StoreModule } from '@ngrx/store';
import * as AtmStore from './store/atm';
import { provideEffects } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function TranslateFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(AtmStore.reducer),
    provideEffects([AtmStore.AtmEffects]),
    importProvidersFrom([
      StoreModule.forRoot({}),
      StoreModule.forFeature(AtmStore.atmFeatureKey, AtmStore.reducer),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: TranslateFactory,
          deps: [HttpClient],
        },
      }),
    ]),
  ],
};
