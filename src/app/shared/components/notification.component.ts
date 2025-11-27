import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="relative">
    <button class="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" (click)="toggle()" aria-label="Notifications">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
      <span class="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full" *ngIf="unreadCount() > 0">{{ unreadCount() }}</span>
    </button>

    <div class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200 origin-top-right transition-all duration-200 ease-out" *ngIf="open()">
      <div class="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 flex justify-between items-center">
        <span>Notifications</span>
        <span class="text-xs font-normal text-gray-500" *ngIf="unreadCount() > 0">{{ unreadCount() }} new</span>
      </div>
      <div class="max-h-80 overflow-y-auto">
        <div *ngIf="unreadCount() === 0" class="p-6 text-center text-gray-500 text-sm">No new notifications</div>
        <div *ngFor="let n of unread()" class="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0">
          <div class="font-medium text-gray-900 text-sm mb-1">{{ n.title }}</div>
          <div class="text-sm text-gray-600 mb-2">{{ n.message }}</div>
          <div class="text-xs text-gray-400">{{ n.timestamp }}</div>
        </div>
      </div>
    </div>
  </div>
  `
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
