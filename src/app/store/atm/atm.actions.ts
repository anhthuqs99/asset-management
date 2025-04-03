import { Action } from '@ngrx/store';
import { Atm, AtmEditData } from '../../model/atm.model';

export enum AtmActionTypes {
  LoadAtms = '[Atm] Load Atms',
  LoadAtmsSuccess = '[Atm] Load Atms Success',
  LoadAtmsFailed = '[Atm] Load Atms Fail',

  LoadAtm = '[Atm] Load Atm',
  LoadAtmSuccess = '[Atm] Load Atm Success',
  LoadAtmFailed = '[Atm] Load Atm Fail',

  CreateAtm = '[Atm] Create Atm',
  CreateAtmSuccess = '[Atm] Create Atm Success',
  CreateAtmFailed = '[Atm] Create Atm Fail',

  UpdateAtm = '[Atm] Update Atm',
  UpdateAtmSuccess = '[Atm] Update Atm Success',
  UpdateAtmFailed = '[Atm] Update Atm Fail',

  DeleteAtm = '[Atm] Delete Atm',
  DeleteAtmSuccess = '[Atm] Delete Atm Success',
  DeleteAtmFailed = '[Atm] Delete Atm Fail',
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

export class LoadAtm implements Action {
  readonly type = AtmActionTypes.LoadAtm;
  constructor(public payload: string) {}
}

export class LoadAtmSuccess implements Action {
  readonly type = AtmActionTypes.LoadAtmSuccess;
  constructor(public payload: Atm) {}
}

export class LoadAtmFailed implements Action {
  readonly type = AtmActionTypes.LoadAtmFailed;
  constructor(public payload: any) {}
}

export class CreateAtm implements Action {
  readonly type = AtmActionTypes.CreateAtm;
  constructor(public payload: AtmEditData) {}
}

export class CreateAtmSuccess implements Action {
  readonly type = AtmActionTypes.CreateAtmSuccess;
  constructor(public payload: Atm) {}
}

export class CreateAtmFailed implements Action {
  readonly type = AtmActionTypes.CreateAtmFailed;
  constructor(public payload: any) {}
}

export class UpdateAtm implements Action {
  readonly type = AtmActionTypes.UpdateAtm;
  constructor(public payload: { id: string; atm: AtmEditData }) {}
}

export class UpdateAtmSuccess implements Action {
  readonly type = AtmActionTypes.UpdateAtmSuccess;
  constructor(public payload: Atm) {}
}

export class UpdateAtmFailed implements Action {
  readonly type = AtmActionTypes.UpdateAtmFailed;
  constructor(public payload: any) {}
}

export class DeleteAtm implements Action {
  readonly type = AtmActionTypes.DeleteAtm;
  constructor(public payload: number) {}
}

export class DeleteAtmSuccess implements Action {
  readonly type = AtmActionTypes.DeleteAtmSuccess;
  constructor() {}
}

export class DeleteAtmFailed implements Action {
  readonly type = AtmActionTypes.DeleteAtmFailed;
  constructor(public payload: any) {}
}

export type AtmActions =
  | LoadAtms
  | LoadAtmsSuccess
  | LoadAtmsFailed
  | LoadAtm
  | LoadAtmSuccess
  | LoadAtmFailed
  | CreateAtm
  | CreateAtmSuccess
  | CreateAtmFailed
  | UpdateAtm
  | UpdateAtmSuccess
  | UpdateAtmFailed
  | DeleteAtm
  | DeleteAtmSuccess
  | DeleteAtmFailed;
