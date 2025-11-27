import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from '../../models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = '/api/assets';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getAsset(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, asset, { headers: this.getHeaders() });
  }

  updateAsset(id: number, asset: Asset): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, asset, { headers: this.getHeaders() });
  }

  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}