import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Atm, AtmEditData } from '../model/atm.model';
import { Store } from '@ngrx/store';
import * as AtmStore from '../store/atm';

@Injectable({
  providedIn: 'root',
})
export class AtmStoreService {
  constructor(
    private apiService: ApiService,
    private store: Store<AtmStore.AtmState>
  ) {}

  // API calls
  public callGetAtm(id: string): Observable<Atm> {
    return this.apiService.get(`atm/${id}`);
  }

  public callGetAtms(): Observable<Atm[]> {
    return this.apiService.get('atm');
  }

  public callUpdateAtm(id: number, atm: AtmEditData): Observable<Atm> {
    return this.apiService.put(`atm/${id}`, atm);
  }

  public callCreateAtm(atm: AtmEditData): Observable<Atm> {
    return this.apiService.post<Atm>('atm', atm);
  }

  public callDeleteAtm(id: number): Observable<void> {
    return this.apiService.delete<void>(`atm/${id}`);
  }

  // Store
  public fetchAtms() {
    this.store.dispatch(new AtmStore.LoadAtms());
  }

  public getAtms(): Observable<Atm[]> {
    return this.store.select(AtmStore.selectAllAtms);
  }

  public getLoading(): Observable<boolean> {
    return this.store.select(AtmStore.selectAtmLoading);
  }

  public getError(): Observable<any> {
    return this.store.select(AtmStore.selectAtmError);
  }

  public getSuccess(): Observable<boolean> {
    return this.store.select(AtmStore.selectAtmSuccess);
  }
}
