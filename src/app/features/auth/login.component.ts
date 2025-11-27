import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrap">
      <form (ngSubmit)="submit()" class="login-form">
        <h2>Sign In</h2>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" [(ngModel)]="email" name="email" type="email" required autocomplete="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" [(ngModel)]="password" name="password" type="password" required autocomplete="current-password" />
        </div>
        <button type="submit" class="btn-primary" [disabled]="loading">{{ loading ? 'Signing in...' : 'Sign In' }}</button>
        <div *ngIf="error()" class="error">{{ error() }}</div>
      </form>
    </div>
  `,
  styles: [
    `
    .login-wrap { max-width: 400px; margin: 48px auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 32px; }
    .login-form { display: flex; flex-direction: column; gap: 18px; }
    h2 { text-align: center; margin-bottom: 12px; color: #1e40af; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 500; color: #555; }
    input { width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #dbeafe; font-size: 1rem; }
    .btn-primary { width: 100%; padding: 10px 0; background: #1e40af; color: #fff; border: none; border-radius: 6px; font-size: 1.1rem; font-weight: 600; cursor: pointer; margin-top: 8px; }
    .btn-primary:disabled { background: #a5b4fc; cursor: not-allowed; }
    .btn-primary:hover:not(:disabled) { background: #3749bb; }
    .error { color: #e11d48; margin-top: 12px; text-align: center; }
    `
  ]
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  error = signal('');
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async submit() {
    this.error.set('');
    this.loading = true;
    try {
      await this.auth.login(this.email(), this.password());
      this.router.navigate(['/']);
    } catch (e: any) {
      console.error(e);
      this.error.set(e?.message ?? 'Login failed');
    } finally {
      this.loading = false;
    }
  }
}
