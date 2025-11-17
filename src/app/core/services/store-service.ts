import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants/api-url';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { StoreCreateModel, StoreModel } from '../models/store-interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private http = inject(HttpClient);
  private readonly baseUrl = API_URL + '/stores';

  public index(): Observable<ApiResponse<StoreModel[]>> {
    return this.http.get<ApiResponse<StoreModel[]>>(this.baseUrl);
  }

  public store(payload: StoreCreateModel): Observable<ApiResponse<StoreModel>> {
    return this.http.post<ApiResponse<StoreModel>>(this.baseUrl, payload);
  }

  public destroy(id: string): Observable<ApiResponse<StoreModel>> {
    return this.http.delete<ApiResponse<StoreModel>>(`${this.baseUrl}/${id}`);
  }
}
