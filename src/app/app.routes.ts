import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RequestListComponent } from './features/requests/request-list.component';
import { RequestCreateComponent } from './features/requests/request-create.component';
import { AssetListComponent } from './features/assets/asset-list.component';
import { AssetFormComponent } from './features/assets/asset-form.component';
import { UserListComponent } from './features/users/user-list.component';

export const routes: Routes = [
	{ path: 'login', component: AuthLayoutComponent, children: [ { path: '', component: LoginComponent } ] },
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{ path: 'dashboard', component: DashboardComponent, canActivate: [() => import('./core/guards/auth.guard').then(m => m.AuthGuard)] },
			{ path: 'requests', component: RequestListComponent, canActivate: [() => import('./core/guards/auth.guard').then(m => m.AuthGuard)] },
			{ path: 'requests/create', component: RequestCreateComponent, canActivate: [() => import('./core/guards/auth.guard').then(m => m.AuthGuard)] },
			{ path: 'assets', component: AssetListComponent, canActivate: [() => import('./core/guards/auth.guard').then(m => m.AuthGuard)] },
			{ path: 'assets/manage', component: AssetFormComponent, canActivate: [() => import('./core/guards/auth.guard').then(m => m.AuthGuard)] },
			{ path: 'users', component: UserListComponent, canActivate: [() => import('./core/guards/auth.guard').then(m => m.AuthGuard)] },
			{ path: '', pathMatch: 'full', redirectTo: 'dashboard' }
		]
	}
];
