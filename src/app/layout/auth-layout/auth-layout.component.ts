import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-shell">
      <header class="auth-header">
        <div class="brand">Tesko</div>
      </header>
      <main class="auth-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `.auth-shell { min-height: 100vh; display: flex; flex-direction: column; background: #f8fafc; }
     .auth-header { padding: 24px 0; text-align: center; font-size: 2rem; font-weight: 700; color: #1e40af; }
     .auth-content { flex: 1; display: flex; align-items: center; justify-content: center; }`
  ]
})
export class AuthLayoutComponent {}
