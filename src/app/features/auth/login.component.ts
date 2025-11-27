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
    <div class="max-w-md mx-auto my-12 bg-white rounded-xl shadow-lg p-8">
      <form (ngSubmit)="submit()" class="flex flex-col gap-6">
        <h2 class="text-center text-2xl font-bold text-blue-800 mb-4">Sign In</h2>
        <div class="flex flex-col gap-2">
          <label for="email" class="font-medium text-gray-700">Email</label>
          <input id="email" [(ngModel)]="email" name="email" type="email" required autocomplete="username" class="w-full px-3 py-2 border border-blue-200 rounded-lg text-lg" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password" class="font-medium text-gray-700">Password</label>
          <input id="password" [(ngModel)]="password" name="password" type="password" required autocomplete="current-password" class="w-full px-3 py-2 border border-blue-200 rounded-lg text-lg" />
        </div>
        <button type="submit" class="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold cursor-pointer disabled:bg-blue-300 hover:bg-blue-700 transition-colors" [disabled]="loading">{{ loading ? 'Signing in...' : 'Sign In' }}</button>
        <div *ngIf="error()" class="text-red-600 text-center mt-4">{{ error() }}</div>
      </form>
    </div>
  `
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
