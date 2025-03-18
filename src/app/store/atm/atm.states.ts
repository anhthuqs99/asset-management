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
