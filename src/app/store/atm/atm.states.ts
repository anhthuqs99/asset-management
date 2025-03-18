import { Atm } from '../../model/atm.model';

export interface AtmState {
  atms: Atm[];
  error: any; // define later
  loading: boolean;
  success: boolean;
}

export const initialState: AtmState = {
  atms: [],
  error: null,
  loading: false,
  success: false,
};

export interface AtmDetailState {
  atm: Atm;
  error: any;
  loading: boolean;
  success: boolean;
}

export const initialAtmDetail: Atm = {
  id: NaN,
  name: '',
  manufacturer: '',
  type: '',
  serial_number: '',
  image: '',
};

export const initialAtmDetailState: AtmDetailState = {
  atm: initialAtmDetail,
  error: null,
  loading: false,
  success: false,
};

export interface AppState {
  atm: AtmState;
  atmDetail: AtmDetailState;
}
