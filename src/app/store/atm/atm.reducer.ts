import { AtmActions, AtmActionTypes } from './atm.actions';
import { AtmState, initialState } from './atm.states';

export const atmReducer = (
  state: AtmState = initialState,
  action: AtmActions
): AtmState => {
  switch (action.type) {
    case AtmActionTypes.LoadAtms: {
      return {
        ...state,
        loading: true,
      };
    }
    case AtmActionTypes.LoadAtmsSuccess: {
      return {
        ...state,
        loading: false,
        atms: action.payload,
        success: true,
      };
    }
    case AtmActionTypes.LoadAtmsFailed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const reducer = atmReducer;
