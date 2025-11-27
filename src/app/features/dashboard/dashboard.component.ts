
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="dashboard">
      <h2>Dashboard</h2>
      <div class="metrics">
        <div class="metric">
          <div class="label">Total Assets</div>
          <div class="value">{{ assetsCount() }}</div>
        </div>
        <div class="metric">
          <div class="label">Total Requests</div>
          <div class="value">{{ requestsCount() }}</div>
        </div>
        <div class="metric">
          <div class="label">Total Users</div>
          <div class="value">{{ usersCount() }}</div>
        </div>
      </div>
      <div class="charts">
        <div class="chart-placeholder">[Charts will appear here]</div>
      </div>
    </section>
  `,
  styles: [
    `.dashboard { padding: 24px; }
     .metrics { display: flex; gap: 32px; margin-bottom: 32px; }
     .metric { background: #f1f5f9; border-radius: 8px; padding: 24px 32px; min-width: 160px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
     .label { font-size: 1rem; color: #555; margin-bottom: 8px; }
     .value { font-size: 2.2rem; font-weight: 700; color: #1e40af; }
     .charts { margin-top: 24px; }
     .chart-placeholder { height: 220px; background: #e0e7ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #1e40af; font-size: 1.2rem; }`
  ]
})
export class DashboardComponent {
  assetsCount = signal(0);
  requestsCount = signal(0);
  usersCount = signal(0);

  // TODO: Replace with API calls
  constructor() {
    this.assetsCount.set(42);
    this.requestsCount.set(17);
    this.usersCount.set(8);
  }
}
