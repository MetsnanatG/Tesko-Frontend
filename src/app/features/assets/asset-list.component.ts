import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'asset-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="asset-list">
      <h2>Inventory</h2>
      <div class="list-placeholder">[Asset list will appear here]</div>
    </section>
  `,
  styles: [
    `.asset-list { padding: 24px; }
     .list-placeholder { height: 180px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #555; font-size: 1.1rem; }`
  ]
})
export class AssetListComponent {}
