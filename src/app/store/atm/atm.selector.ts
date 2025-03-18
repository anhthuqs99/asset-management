import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AtmState } from './atm.states';

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
