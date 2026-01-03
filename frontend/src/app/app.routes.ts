import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateBugComponent } from './components/create-bug/create-bug.component';
import { EditBugComponent } from './components/edit-bug/edit-bug.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-bug', component: CreateBugComponent, canActivate: [AuthGuard] },
  { path: 'edit-bug/:id', component: EditBugComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];
