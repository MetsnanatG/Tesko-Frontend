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
    <section class="request-create">
      <h2>Create New Request</h2>
      <div class="card">
        <div class="card-body">
          <form (ngSubmit)="createRequest()">
            <div class="mb-3">
              <label for="assetId" class="form-label">Asset</label>
              <select class="form-control" id="assetId" [(ngModel)]="request.assetId" name="assetId" required>
                <option *ngFor="let asset of assets" [value]="asset.id">{{ asset.name }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="quantity" class="form-label">Quantity</label>
              <input type="number" class="form-control" id="quantity" [(ngModel)]="request.quantity" name="quantity" required>
            </div>
            <div class="mb-3">
              <label for="purpose" class="form-label">Purpose</label>
              <textarea class="form-control" id="purpose" [(ngModel)]="request.purpose" name="purpose" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit Request</button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [
    `.request-create { padding: 24px; }`
  ]
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
