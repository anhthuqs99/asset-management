import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, AtmDetailState } from './atm.states';

export const atmFeatureKey = 'atm';

export const selectAppState = createFeatureSelector<AppState>(atmFeatureKey);

export const selectAllAtms = createSelector(
  selectAppState,
  (state: AppState) => state.atm.atms
); // get all atms
export const selectAtmError = createSelector(
  selectAppState,
  (state: AppState) => state.atm.error
); // get error
export const selectAtmLoading = createSelector(
  selectAppState,
  (state: AppState) => state.atm.loading
); // get loading

export const selectAtmSuccess = createSelector(
  selectAppState,
  (state: AppState) => state.atm.success
); // get success

export const selectAtm = createSelector(
  selectAppState,
  (state: AppState) => state.atmDetail.atm
); // get atm

export const selectAtmDetailError = createSelector(
  selectAppState,
  (state: AppState) => state.atmDetail.error
); // get error

export const selectAtmDetailLoading = createSelector(
  selectAppState,
  (state: AppState) => state.atmDetail.loading
); // get loading

export const selectAtmDetailSuccess = createSelector(
  selectAppState,
  (state: AppState) => state.atmDetail.success
); // get success
