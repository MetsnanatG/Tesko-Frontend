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
  <div class="app-shell">
    <header class="navbar">
      <div class="brand">
        <span class="brand-icon">T</span>
        Tesko
      </div>
      <div class="spacer"></div>
      <div class="actions">
        <app-notification></app-notification>
        <button class="logout-btn" (click)="logout()" title="Logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </header>
    <div class="layout-body">
      <aside class="sidebar">
        <div class="user-profile" *ngIf="user()">
          <div class="avatar">{{ user().name.charAt(0) }}</div>
          <div class="info">
            <div class="name">{{ user().name }}</div>
            <div class="role">{{ user().role }}</div>
          </div>
        </div>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">
            <span class="icon">📊</span> Dashboard
          </a>
          <div class="nav-group">Requests</div>
          <a routerLink="/requests" routerLinkActive="active">
            <span class="icon">📋</span> All Requests
          </a>
          <a routerLink="/requests/create" routerLinkActive="active">
            <span class="icon">➕</span> New Request
          </a>
          <div class="nav-group">Inventory</div>
          <a routerLink="/assets" routerLinkActive="active">
            <span class="icon">📦</span> Assets
          </a>
          <a routerLink="/assets/manage" routerLinkActive="active">
            <span class="icon">⚙️</span> Manage Assets
          </a>
          <div class="nav-group">Admin</div>
          <a routerLink="/users" routerLinkActive="active">
            <span class="icon">👥</span> Users
          </a>
        </nav>
      </aside>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>
  `,
  styles: [
    `:host { display: block; height: 100vh; overflow: hidden; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
    
    .app-shell { display: flex; flex-direction: column; height: 100%; }

    /* Navbar */
    .navbar {
      height: 64px;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      padding: 0 24px;
      z-index: 10;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    .brand {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
    }
    .spacer { flex: 1; }
    .actions { display: flex; align-items: center; gap: 16px; }
    
    .logout-btn {
      background: transparent;
      border: 1px solid #e2e8f0;
      color: #64748b;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .logout-btn:hover {
      background: #fee2e2;
      color: #ef4444;
      border-color: #fecaca;
    }

    /* Layout Body */
    .layout-body { display: flex; flex: 1; overflow: hidden; background: #f8fafc; }

    /* Sidebar */
    .sidebar {
      width: 260px;
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    
    .user-profile {
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid #f1f5f9;
      margin-bottom: 12px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      background: #e0e7ff;
      color: #4f46e5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
    }
    .info { display: flex; flex-direction: column; }
    .name { font-weight: 600; color: #0f172a; font-size: 0.9rem; }
    .role { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500; }

    .sidebar nav {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
    }
    .nav-group {
      font-size: 0.75rem;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 16px 12px 8px 12px;
    }
    .sidebar a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      color: #475569;
      text-decoration: none;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.2s;
      font-size: 0.95rem;
    }
    .sidebar a:hover {
      background: #f1f5f9;
      color: #0f172a;
    }
    .sidebar a.active {
      background: #eef2ff;
      color: #4f46e5;
    }
    .icon { font-size: 1.1rem; width: 24px; text-align: center; }

    /* Content */
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 32px;
    }

    @media (max-width: 768px) {
      .sidebar { display: none; } /* Mobile menu would go here */
    }
    `
  ]
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
