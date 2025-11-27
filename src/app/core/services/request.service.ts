import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = '/api/requests';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getRequest(id: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createRequest(request: Partial<Request>): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, request, { headers: this.getHeaders() });
  }

  approveRequest(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/approve`, {}, { headers: this.getHeaders() });
  }

  rejectRequest(id: number, reason?: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/reject`, JSON.stringify(reason), { headers: this.getHeaders() });
  }
}