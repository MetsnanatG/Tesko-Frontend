import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LoginResult {
  token: string;
  userId?: number;
  name?: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'tesko_token';
  private readonly USER_KEY = 'tesko_user';

  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<LoginResult> {
    const res = await this.http.post<LoginResult>('/api/auth/login', { email, password }).toPromise();
    if (res?.token) {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      if (res.userId) {
        localStorage.setItem(this.USER_KEY, String(res.userId));
      }
    }
    return res as LoginResult;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserId(): number | null {
    const v = localStorage.getItem(this.USER_KEY);
    return v ? parseInt(v, 10) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
