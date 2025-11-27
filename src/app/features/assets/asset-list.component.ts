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
    <section class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-900">Inventory</h2>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2" (click)="showCreateForm = true" *ngIf="!showCreateForm">
          <span>+</span> Add Asset
        </button>
      </div>

      <div *ngIf="showCreateForm" class="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <h5 class="text-xl font-semibold text-gray-800 mb-4">{{ isEditing ? 'Edit Asset' : 'Create New Asset' }}</h5>
        <form (ngSubmit)="createAsset()" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="col-span-2 md:col-span-1">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" id="name" [(ngModel)]="newAsset.name" name="name" required>
          </div>
          <div class="col-span-2 md:col-span-1">
            <label for="type" class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" id="type" [(ngModel)]="newAsset.type" name="type" required>
          </div>
          <div class="col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" id="description" [(ngModel)]="newAsset.description" name="description" rows="2"></textarea>
          </div>
          <div>
            <label for="totalStock" class="block text-sm font-medium text-gray-700 mb-1">Total Stock</label>
            <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" id="totalStock" [(ngModel)]="newAsset.totalStock" name="totalStock" required min="0">
          </div>
          <div>
            <label for="lowStockThreshold" class="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
            <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" id="lowStockThreshold" [(ngModel)]="newAsset.lowStockThreshold" name="lowStockThreshold" required min="0">
          </div>
          
          <div class="col-span-2 flex gap-2 mt-2">
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">{{ isEditing ? 'Update Asset' : 'Create Asset' }}</button>
            <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors" (click)="cancelCreate()">Cancel</button>
          </div>
        </form>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let asset of assets" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ asset.name }}</div>
                  <div class="text-sm text-gray-500 truncate max-w-xs">{{ asset.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ asset.type }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">Total: {{ asset.totalStock }}</div>
                  <div class="text-xs text-gray-500">Avail: {{ asset.availableStock }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                    [ngClass]="{'bg-green-100 text-green-800': asset.availableStock > asset.lowStockThreshold, 'bg-yellow-100 text-yellow-800': asset.availableStock <= asset.lowStockThreshold && asset.availableStock > 0, 'bg-red-100 text-red-800': asset.availableStock === 0}">
                    {{ asset.availableStock > 0 ? 'In Stock' : 'Out of Stock' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button class="text-indigo-600 hover:text-indigo-900 mr-3" (click)="editAsset(asset)">Edit</button>
                  <button class="text-red-600 hover:text-red-900" (click)="deleteAsset(asset.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `
})
export class AssetListComponent implements OnInit {
  assets: Asset[] = [];
  showCreateForm = false;
  newAsset: Asset = { 
    id: 0, 
    name: '', 
    description: '', 
    type: '', 
    totalStock: 0, 
    availableStock: 0, 
    allocatedStock: 0, 
    defectiveStock: 0, 
    lowStockThreshold: 0 
  };

  isEditing = false;

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
    if (this.isEditing) {
      this.updateAsset();
      return;
    }
    this.assetService.createAsset(this.newAsset).subscribe({
      next: () => {
        this.loadAssets();
        this.cancelCreate();
      },
      error: (err) => console.error('Error creating asset', err)
    });
  }

  updateAsset(): void {
    this.assetService.updateAsset(this.newAsset.id, this.newAsset).subscribe({
      next: () => {
        this.loadAssets();
        this.cancelCreate();
      },
      error: (err) => console.error('Error updating asset', err)
    });
  }

  editAsset(asset: Asset): void {
    this.newAsset = { ...asset };
    this.showCreateForm = true;
    this.isEditing = true;
    window.scrollTo(0, 0);
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
    this.isEditing = false;
    this.newAsset = { 
      id: 0, 
      name: '', 
      description: '', 
      type: '', 
      totalStock: 0, 
      availableStock: 0, 
      allocatedStock: 0, 
      defectiveStock: 0, 
      lowStockThreshold: 0 
    };
  }
}
