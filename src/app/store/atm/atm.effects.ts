import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AtmStoreService } from '../../services/atm-store.service';
import * as AtmStore from './index';
import { map, switchMap } from 'rxjs';

@Injectable()
export class AtmEffects {
  private actions$ = inject(Actions);
  constructor(private atmStoreService: AtmStoreService) {}

  public loadAtms$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AtmStore.LoadAtms>(AtmStore.AtmActionTypes.LoadAtms),
      switchMap((actions) =>
        this.atmStoreService
          .callGetAtms()
          .pipe(map((atms) => new AtmStore.LoadAtmsSuccess(atms)))
      )
    )
  );
}
