import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="notif-root" aria-live="polite">
    <button class="bell" (click)="toggle()" aria-label="Notifications">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 24c1.1046 0 2-.8954 2-2h-4c0 1.1046.8954 2 2 2zm6.364-6v-5c0-3.07-1.635-5.64-4.364-6.32V5a2 2 0 10-4 0v1.68C6.271 7.36 4.636 9.93 4.636 13v5l-1.636 1v1h18v-1l-1.636-1z"/>
      </svg>
      <span class="badge" *ngIf="unreadCount() > 0">{{ unreadCount() }}</span>
    </button>

    <div class="dropdown" *ngIf="open()">
      <div class="header">Notifications</div>
      <div class="list">
        <div *ngIf="unreadCount() === 0" class="empty">No new notifications</div>
        <div *ngFor="let n of unread()" class="item">
          <div class="title">{{ n.title }}</div>
          <div class="message">{{ n.message }}</div>
          <div class="ts">{{ n.timestamp }}</div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
    `:host { position: relative; }
    .notif-root { position: relative; display: inline-block; }
    .bell { background: transparent; border: none; position: relative; cursor: pointer; }
    .badge { position: absolute; top: -6px; right: -6px; background: #e11; color: white; border-radius: 999px; padding: 2px 6px; font-size: 11px; font-weight: 600; }
    .dropdown { position: absolute; top: 32px; right: 0; width: 320px; background: white; box-shadow: 0 6px 18px rgba(0,0,0,0.12); border-radius: 8px; overflow: hidden; z-index: 100; }
    .header { padding: 8px 12px; font-weight: 700; border-bottom: 1px solid #eee; }
    .list { max-height: 320px; overflow: auto; }
    .item { padding: 8px 12px; border-bottom: 1px solid #f5f5f5; }
    .title { font-weight: 600; }
    .message { color: #444; }
    .ts { font-size: 11px; color: #888; margin-top: 6px; }
    .empty { padding: 12px; color: #666; }
    `
  ]
})
export class NotificationComponent {
  unread = signal<Array<any>>([]);
  unreadCount = signal(0);
  open = signal(false);

  constructor(private svc: NotificationService) {
    // initial fetch
    this.refresh();

    // keep local signals in sync with service
    effect(() => {
      const list = this.svc.unread();
      this.unread.set(list);
      this.unreadCount.set(list.length);
    });
  }

  async refresh() {
    await this.svc.fetchUnread();
  }

  async toggle() {
    const isOpen = !this.open();
    this.open.set(isOpen);
    if (isOpen) {
      // mark read when opening
      await this.svc.markAllRead();
    } else {
      // refresh when closing
      await this.refresh();
    }
  }
}
