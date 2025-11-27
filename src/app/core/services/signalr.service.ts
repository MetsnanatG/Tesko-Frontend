import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private connection: any = null;
  public connected = signal(false);

  start(url: string) {
    // TODO: Replace with actual SignalR client (e.g., @microsoft/signalr)
    // Example:
    // this.connection = new signalR.HubConnectionBuilder().withUrl(url).build();
    // this.connection.start().then(() => this.connected.set(true));
    // this.connection.on('notification', (data) => { ... });
  }

  stop() {
    if (this.connection) {
      this.connection.stop();
      this.connected.set(false);
    }
  }
}
