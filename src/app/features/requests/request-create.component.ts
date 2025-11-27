import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../../core/services/request.service';
import { AssetService } from '../../core/services/asset.service';
import { Request, Asset } from '../../models/request.model';

@Component({
  selector: 'request-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="p-6 max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Create New Request</h2>
      <div class="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <form (ngSubmit)="createRequest()" class="space-y-6">
          <div>
            <label for="assetId" class="block text-sm font-medium text-gray-700 mb-1">Select Asset</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white" id="assetId" [(ngModel)]="request.assetId" name="assetId" required>
              <option value="0" disabled selected>Choose an asset...</option>
              <option *ngFor="let asset of assets" [value]="asset.id">{{ asset.name }} (Available: {{ asset.availableStock }})</option>
            </select>
          </div>
          
          <div>
            <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" id="quantity" [(ngModel)]="request.quantity" name="quantity" required min="1">
          </div>
          
          <div>
            <label for="purpose" class="block text-sm font-medium text-gray-700 mb-1">Purpose of Request</label>
            <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" id="purpose" [(ngModel)]="request.purpose" name="purpose" rows="4" required placeholder="Describe why you need this asset..."></textarea>
          </div>
          
          <div class="pt-4">
            <button type="submit" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-sm">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </section>
  `
})
export class RequestCreateComponent implements OnInit {
  request: Partial<Request> = { purpose: '', quantity: 1, assetId: 0 };
  assets: Asset[] = [];

  constructor(private requestService: RequestService, private assetService: AssetService, private router: Router) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe({
      next: (data) => this.assets = data,
      error: (err) => console.error('Error loading assets', err)
    });
  }

  createRequest(): void {
    this.requestService.createRequest(this.request).subscribe({
      next: () => this.router.navigate(['/requests']),
      error: (err) => console.error('Error creating request', err)
    });
  }
}
