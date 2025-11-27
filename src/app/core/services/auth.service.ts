import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = signal<string | null>(null);
  private user = signal<any>(null);

  readonly currentUser = this.user.asReadonly();

  constructor(private http: HttpClient, private router: Router) {
    // Restore user from token on init if exists
    const token = localStorage.getItem('jwt');
    if (token) {
      this.token.set(token);
      this.user.set(this.decodeUser(token));
    }
  }

  async login(email: string, password: string) {
    // Backend expects POST /api/auth/login with email and password
    try {
      const res = await this.http.post<any>('/api/auth/login', { email, password }).toPromise();
      if (res?.token) {
        this.token.set(res.token);
        localStorage.setItem('jwt', res.token);
        // Optionally decode user info from JWT
        this.user.set(this.decodeUser(res.token));
        return true;
      }
      throw new Error('Invalid login response');
    } catch (e) {
      throw new Error('Login failed');
    }
  }

  logout() {
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.token() || localStorage.getItem('jwt');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getUser() {
    return this.user();
  }

  private decodeUser(token: string) {
    // Simple JWT decode (no validation)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub || payload.nameid,
        name: payload.name,
        email: payload.email,
        role: payload.role
      };
    } catch {
      return null;
    }
  }
}
