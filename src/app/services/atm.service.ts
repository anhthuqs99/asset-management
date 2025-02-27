import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';
import { Atm, AtmEditData } from '../model/atm.model';

@Injectable({
  providedIn: 'root',
})
export class AtmService {
  constructor(private apiService: ApiService) {}

  public getAtm(id: string): Promise<Atm> {
    return firstValueFrom(this.apiService.get(`atm/${id}`));
  }

  public getAtms(parameters: object): Promise<Atm[]> {
    return firstValueFrom(this.apiService.get('atm', parameters));
  }

  public editAtm(id: number, atm: AtmEditData): Promise<Atm> {
    return firstValueFrom(this.apiService.put(`atm/${id}`, atm));
  }

  public addAtm(atm: AtmEditData): Promise<Atm> {
    return firstValueFrom(this.apiService.post<Atm>('atm', atm));
  }

  public deleteAtm(id: number): Promise<void> {
    return firstValueFrom(this.apiService.delete<void>(`atm/${id}`));
  }
}
