import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AtmStoreService } from '../../services/atm-store.service';
import * as AtmStore from './index';
import { catchError, map, of, switchMap } from 'rxjs';

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

  public createAtm$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AtmStore.CreateAtm>(AtmStore.AtmActionTypes.CreateAtm),
      switchMap((action) =>
        this.atmStoreService.callCreateAtm(action.payload).pipe(
          map((atm) => new AtmStore.CreateAtmSuccess(atm)),
          catchError((error) => of(new AtmStore.CreateAtmFailed(error)))
        )
      )
    )
  );

  public updateAtm$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AtmStore.UpdateAtm>(AtmStore.AtmActionTypes.UpdateAtm),
      switchMap((action) =>
        this.atmStoreService
          .callUpdateAtm(action.payload.id, action.payload.atm)
          .pipe(
            map((atm) => new AtmStore.UpdateAtmSuccess(atm)),
            catchError((error) => of(new AtmStore.UpdateAtmFailed(error)))
          )
      )
    )
  );

  public deleteAtm$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AtmStore.DeleteAtm>(AtmStore.AtmActionTypes.DeleteAtm),
      switchMap((action) =>
        this.atmStoreService.callDeleteAtm(action.payload).pipe(
          map(() => new AtmStore.DeleteAtmSuccess()),
          catchError((error) => of(new AtmStore.DeleteAtmFailed(error)))
        )
      )
    )
  );

  public loadAtm$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AtmStore.LoadAtm>(AtmStore.AtmActionTypes.LoadAtm),
      switchMap((action) =>
        this.atmStoreService.callGetAtm(action.payload).pipe(
          map((atm) => new AtmStore.LoadAtmSuccess(atm)),
          catchError((error) => of(new AtmStore.LoadAtmFailed(error)))
        )
      )
    )
  );
}
