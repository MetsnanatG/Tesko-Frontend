import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssetService } from '../../core/services/asset.service';
import { Asset } from '../../models/asset.model';

@Component({
  selector: 'asset-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="asset-list">
      <h2>Inventory</h2>
      <button class="btn btn-primary mb-3" (click)="showCreateForm = true" *ngIf="!showCreateForm">Add Asset</button>
      <div *ngIf="showCreateForm" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Create New Asset</h5>
          <form (ngSubmit)="createAsset()">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" [(ngModel)]="newAsset.name" name="name" required>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" [(ngModel)]="newAsset.description" name="description"></textarea>
            </div>
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <input type="text" class="form-control" id="category" [(ngModel)]="newAsset.category" name="category">
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">Status</label>
              <select class="form-control" id="status" [(ngModel)]="newAsset.status" name="status">
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="location" class="form-label">Location</label>
              <input type="text" class="form-control" id="location" [(ngModel)]="newAsset.location" name="location">
            </div>
            <button type="submit" class="btn btn-success">Create</button>
            <button type="button" class="btn btn-secondary ms-2" (click)="cancelCreate()">Cancel</button>
          </form>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Status</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let asset of assets">
              <td>{{ asset.id }}</td>
              <td>{{ asset.name }}</td>
              <td>{{ asset.description }}</td>
              <td>{{ asset.category }}</td>
              <td>{{ asset.status }}</td>
              <td>{{ asset.location }}</td>
              <td>
                <button class="btn btn-sm btn-warning me-2" (click)="editAsset(asset)">Edit</button>
                <button class="btn btn-sm btn-danger" (click)="deleteAsset(asset.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [
    `.asset-list { padding: 24px; }`
  ]
})
export class AssetListComponent implements OnInit {
  assets: Asset[] = [];
  showCreateForm = false;
  newAsset: Asset = { id: 0, name: '', description: '', category: '', status: 'Available', location: '' };

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe({
      next: (data) => this.assets = data,
      error: (err) => console.error('Error loading assets', err)
    });
  }

  createAsset(): void {
    this.assetService.createAsset(this.newAsset).subscribe({
      next: () => {
        this.loadAssets();
        this.cancelCreate();
      },
      error: (err) => console.error('Error creating asset', err)
    });
  }

  editAsset(asset: Asset): void {
    // Implement edit
  }

  deleteAsset(id: number): void {
    if (confirm('Are you sure you want to delete this asset?')) {
      this.assetService.deleteAsset(id).subscribe({
        next: () => this.loadAssets(),
        error: (err) => console.error('Error deleting asset', err)
      });
    }
  }

  cancelCreate(): void {
    this.showCreateForm = false;
    this.newAsset = { id: 0, name: '', description: '', category: '', status: 'Available', location: '' };
  }
}
