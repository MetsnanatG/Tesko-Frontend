import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'request-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="request-list">
      <h2>Request History & Queue</h2>
      <div class="list-placeholder">[Request list will appear here]</div>
    </section>
  `,
  styles: [
    `.request-list { padding: 24px; }
     .list-placeholder { height: 180px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #555; font-size: 1.1rem; }`
  ]
})
export class RequestListComponent {}
