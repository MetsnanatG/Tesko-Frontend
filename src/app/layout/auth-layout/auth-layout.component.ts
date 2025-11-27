import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <header class="py-6 text-center text-3xl font-bold text-blue-800">
        <div>Tesko</div>
      </header>
      <main class="flex-1 flex items-center justify-center">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AuthLayoutComponent {}
