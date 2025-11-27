import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'request-create',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="request-create">
      <h2>Create New Request</h2>
      <div class="form-placeholder">[Request form will appear here]</div>
    </section>
  `,
  styles: [
    `.request-create { padding: 24px; }
     .form-placeholder { height: 120px; background: #e0e7ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #1e40af; font-size: 1.1rem; }`
  ]
})
export class RequestCreateComponent {}
