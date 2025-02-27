import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://67c05924b9d02a9f22495603.mockapi.io/api';

  constructor(protected http: HttpClient) {}

  // GET request
  get<T>(endpoint: string, options?: any): Observable<T> {
    return this.http.get<T>(
      `${this.baseUrl}/${endpoint}`,
      options
    ) as Observable<T>;
  }

  // POST request
  post<T>(endpoint: string, body: any, options?: any): Observable<T> {
    return this.http.post<T>(
      `${this.baseUrl}/${endpoint}`,
      body,
      options
    ) as Observable<T>;
  }

  // PUT request
  put<T>(endpoint: string, body: any, options?: any): Observable<T> {
    return this.http.put<T>(
      `${this.baseUrl}/${endpoint}`,
      body,
      options
    ) as Observable<T>;
  }

  // DELETE request
  delete<T>(endpoint: string, options?: any) {
    return this.http.delete(
      `${this.baseUrl}/${endpoint}`,
      options
    ) as Observable<T>;
  }

  // PATCH request
  patch<T>(endpoint: string, body: any, options?: any) {
    return this.http.patch(`${this.baseUrl}/${endpoint}`, body, options);
  }
}
