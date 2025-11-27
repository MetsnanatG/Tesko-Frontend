import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../core/services/request.service';
import { Request } from '../../models/request.model';

@Component({
  selector: 'request-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="request-list">
      <h2>Request History & Queue</h2>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Purpose</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>User</th>
              <th>Asset</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let request of requests">
              <td>{{ request.id }}</td>
              <td>{{ request.purpose }}</td>
              <td>{{ request.quantity }}</td>
              <td>
                <span class="badge" [ngClass]="getStatusClass(request.status)">{{ request.status }}</span>
              </td>
              <td>{{ request.user?.name }}</td>
              <td>{{ request.asset?.name }}</td>
              <td>{{ request.requestDate | date:'short' }}</td>
              <td>
                <button *ngIf="request.status === 'Pending'" class="btn btn-sm btn-success me-2" (click)="approveRequest(request.id)">Approve</button>
                <button *ngIf="request.status === 'Pending'" class="btn btn-sm btn-danger" (click)="rejectRequest(request.id)">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [
    `.request-list { padding: 24px; }
     .badge { font-size: 0.8rem; }`
  ]
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [];

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getRequests().subscribe({
      next: (data) => this.requests = data,
      error: (err) => console.error('Error loading requests', err)
    });
  }

  approveRequest(id: number): void {
    this.requestService.approveRequest(id).subscribe({
      next: () => this.loadRequests(),
      error: (err) => console.error('Error approving request', err)
    });
  }

  rejectRequest(id: number): void {
    const reason = prompt('Rejection reason (optional):');
    this.requestService.rejectRequest(id, reason || undefined).subscribe({
      next: () => this.loadRequests(),
      error: (err) => console.error('Error rejecting request', err)
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Approved': return 'bg-success';
      case 'Rejected': return 'bg-danger';
      case 'Pending': return 'bg-warning';
      default: return 'bg-secondary';
    }
  }
}
