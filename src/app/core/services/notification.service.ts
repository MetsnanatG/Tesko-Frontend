import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _unread = signal<NotificationItem[]>([]);
  readonly unread = this._unread;

  constructor(private http: HttpClient) {}

  async fetchUnread(): Promise<NotificationItem[]> {
    try {
      const list = await this.http.get<NotificationItem[]>('/api/notifications/unread').toPromise();
      this._unread.set(list ?? []);
      return this._unread();
    } catch (e) {
      console.error('Failed to fetch notifications', e);
      this._unread.set([]);
      return [];
    }
  }

  async markAllRead(): Promise<void> {
    try {
      await this.http.post('/api/notifications/mark-read', {}).toPromise();
      this._unread.set([]);
    } catch (e) {
      console.error('Failed to mark notifications read', e);
    }
  }
}
