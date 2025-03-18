import { Action } from '@ngrx/store';
import { Atm } from '../../model/atm.model';

export enum AtmActionTypes {
  LoadAtms = '[Atm] Load Atms',
  LoadAtmsSuccess = '[Atm] Load Atms Success',
  LoadAtmsFailed = '[Atm] Load Atms Fail',
}

export class LoadAtms implements Action {
  readonly type = AtmActionTypes.LoadAtms;
}

export class LoadAtmsSuccess implements Action {
  readonly type = AtmActionTypes.LoadAtmsSuccess;
  constructor(public payload: Atm[]) {}
}

export class LoadAtmsFailed implements Action {
  readonly type = AtmActionTypes.LoadAtmsFailed;
  constructor(public payload: any) {}
}

export type AtmActions = LoadAtms | LoadAtmsSuccess | LoadAtmsFailed;
