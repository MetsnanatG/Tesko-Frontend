import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { NotificationComponent } from '../../shared/components/notification.component';
import { SignalRService } from '../../core/services/signalr.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref, NotificationComponent],
  template: `
  <div class="h-screen overflow-hidden font-sans">
    <header class="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm z-10">
      <div class="text-xl font-bold text-gray-900 flex items-center gap-3">
        <span class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg flex items-center justify-center font-black">T</span>
        Tesko
      </div>
      <div class="flex-1"></div>
      <div class="flex items-center gap-4">
        <app-notification></app-notification>
        <button class="bg-transparent border border-gray-200 text-gray-500 w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors" (click)="logout()" title="Logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </header>
    <div class="flex flex-1 overflow-hidden bg-gray-50">
      <aside class="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div class="p-6 flex items-center gap-3 border-b border-gray-100 mb-3" *ngIf="user()">
          <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold">{{ user().name.charAt(0) }}</div>
          <div>
            <div class="font-medium text-gray-900">{{ user().name }}</div>
            <div class="text-sm text-gray-500">{{ user().role }}</div>
          </div>
        </div>
        <nav class="px-3">
          <a routerLink="/dashboard" routerLinkActive="bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700" class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <span>📊</span> Dashboard
          </a>
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-3">Requests</div>
          <a routerLink="/requests" routerLinkActive="bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700" class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <span>📋</span> All Requests
          </a>
          <a routerLink="/requests/create" routerLinkActive="bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700" class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <span>➕</span> New Request
          </a>
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-3">Inventory</div>
          <a routerLink="/assets" routerLinkActive="bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700" class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <span>📦</span> Assets
          </a>
          <a routerLink="/assets/manage" routerLinkActive="bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700" class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <span>⚙️</span> Manage Assets
          </a>
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-3">Admin</div>
          <a routerLink="/users" routerLinkActive="bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700" class="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <span>👥</span> Users
          </a>
        </nav>
      </aside>
      <main class="flex-1 overflow-auto p-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>
  `
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  user;

  constructor(private signalr: SignalRService, public auth: AuthService) {
    this.user = this.auth.currentUser;
  }

  ngOnInit() {
    this.signalr.start('/hubs/dashboard'); // Replace with your actual SignalR hub URL
  }

  ngOnDestroy() {
    this.signalr.stop();
  }

  logout() {
    this.auth.logout();
  }
}
