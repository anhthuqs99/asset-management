import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AtmDetailState, AtmState } from './atm.states';

export const atmFeatureKey = 'atm';

export const selectAtmState = createFeatureSelector<AtmState>(atmFeatureKey);

export const selectAllAtms = createSelector(
  selectAtmState,
  (state: AtmState) => state.atms
); // get all atms
export const selectAtmError = createSelector(
  selectAtmState,
  (state: AtmState) => state.error
); // get error
export const selectAtmLoading = createSelector(
  selectAtmState,
  (state: AtmState) => state.loading
); // get loading

export const selectAtmSuccess = createSelector(
  selectAtmState,
  (state: AtmState) => state.success
); // get success

export const selectAtmDetailState =
  createFeatureSelector<AtmDetailState>(atmFeatureKey);

export const selectAtm = createSelector(
  selectAtmDetailState,
  (state: AtmDetailState) => state.atm
); // get atm

export const selectAtmDetailError = createSelector(
  selectAtmDetailState,
  (state: AtmDetailState) => state.error
); // get error

export const selectAtmDetailLoading = createSelector(
  selectAtmDetailState,
  (state: AtmDetailState) => state.loading
); // get loading

export const selectAtmDetailSuccess = createSelector(
  selectAtmDetailState,
  (state: AtmDetailState) => state.success
); // get success
