import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../core/services/request.service';
import { Request } from '../../models/request.model';

@Component({
  selector: 'request-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="p-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Request History & Queue</h2>
      <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let request of requests" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{{ request.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ request.asset?.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ request.user?.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ request.quantity }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate" title="{{ request.purpose }}">{{ request.purpose }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ request.requestDate | date:'MMM d, y, h:mm a' }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" [ngClass]="getStatusClass(request.status)">
                    {{ request.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div *ngIf="request.status === 'Pending'" class="flex gap-2">
                    <button class="text-green-600 hover:text-green-900 font-semibold" (click)="approveRequest(request.id)">Approve</button>
                    <button class="text-red-600 hover:text-red-900 font-semibold" (click)="rejectRequest(request.id)">Reject</button>
                  </div>
                  <span *ngIf="request.status !== 'Pending'" class="text-gray-400 italic text-xs">No actions</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `
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
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
