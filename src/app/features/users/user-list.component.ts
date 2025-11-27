import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="user-list">
      <h2>User Management</h2>
      <button class="btn btn-primary mb-3" (click)="showCreateForm = true" *ngIf="!showCreateForm">Add User</button>
      <div *ngIf="showCreateForm" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Create New User</h5>
          <form (ngSubmit)="createUser()">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" [(ngModel)]="newUser.name" name="name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" [(ngModel)]="newUser.email" name="email" required>
            </div>
            <div class="mb-3">
              <label for="role" class="form-label">Role</label>
              <select class="form-control" id="role" [(ngModel)]="newUser.role" name="role" required>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
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
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button class="btn btn-sm btn-warning me-2" (click)="editUser(user)">Edit</button>
                <button class="btn btn-sm btn-danger" (click)="deleteUser(user.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [
    `.user-list { padding: 24px; }`
  ]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  showCreateForm = false;
  newUser: User = { id: 0, name: '', email: '', role: 'User' };
  editingUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error loading users', err)
    });
  }

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.cancelCreate();
      },
      error: (err) => console.error('Error creating user', err)
    });
  }

  editUser(user: User): void {
    this.editingUser = { ...user };
    // Implement edit form
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user', err)
      });
    }
  }

  cancelCreate(): void {
    this.showCreateForm = false;
    this.newUser = { id: 0, name: '', email: '', role: 'User' };
  }
}
