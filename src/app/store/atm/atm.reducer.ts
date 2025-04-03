import { Action, combineReducers } from '@ngrx/store';
import { AtmActions, AtmActionTypes } from './atm.actions';
import {
  AtmDetailState,
  AtmState,
  initialAtmDetailState,
  initialState,
} from './atm.states';

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

export const atmDetailReducer = (
  state: AtmDetailState = initialAtmDetailState,
  action: AtmActions
): AtmDetailState => {
  switch (action.type) {
    case AtmActionTypes.LoadAtm: {
      return {
        ...state,
        loading: true,
      };
    }
    case AtmActionTypes.LoadAtmSuccess: {
      return {
        ...state,

        loading: false,
        atm: action.payload,
        success: true,
      };
    }
    case AtmActionTypes.LoadAtmFailed: {
      return {
        ...state,
        loading: false,

        error: action.payload,
      };
    }

    case AtmActionTypes.CreateAtm: {
      return {
        ...state,
        loading: true,
      };
    }
    case AtmActionTypes.CreateAtmSuccess: {
      return {
        ...state,
        loading: false,
        success: true,
        atm: action.payload,
      };
    }
    case AtmActionTypes.CreateAtmFailed: {
      return {
        ...state,
        loading: false,
      };
    }

    case AtmActionTypes.UpdateAtm: {
      return {
        ...state,
        loading: true,
      };
    }
    case AtmActionTypes.UpdateAtmSuccess: {
      return {
        ...state,
        loading: false,
        success: true,
        atm: action.payload,
      };
    }
    case AtmActionTypes.UpdateAtmFailed: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const reducer = combineReducers({
  atm: atmReducer as (state: AtmState | undefined, action: Action) => AtmState,
  atmDetail: atmDetailReducer as (
    state: AtmDetailState | undefined,
    action: Action
  ) => AtmDetailState,
});
