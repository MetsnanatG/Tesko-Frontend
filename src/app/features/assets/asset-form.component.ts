import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'asset-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="asset-form">
      <h2>Add/Edit Asset</h2>
      <div class="form-placeholder">[Asset form will appear here]</div>
    </section>
  `,
  styles: [
    `.asset-form { padding: 24px; }
     .form-placeholder { height: 120px; background: #e0e7ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #1e40af; font-size: 1.1rem; }`
  ]
})
export class AssetFormComponent {}
