import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/pages/employees/employees.component';
import { HomeComponent } from './home/pages/home/home.component';

import { LoginComponent } from './login/pages/login/login.component';
import { PaymentComponent } from './payment/pages/payment/payment.component';
import { ProfileEmployeeComponent } from './profile/pages/profile-employee/profile-employee.component';
import { ProfileComponent } from './profile/pages/profile/profile.component';
import { RegisterComponent } from './register/pages/register/register.component';
import { ServicesComponent } from './services/pages/services/services.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',component:LoginComponent},
  { path: 'register',component:RegisterComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',component:HomeComponent},
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile',component:ProfileComponent},
  { path: '', redirectTo: '/services', pathMatch: 'full' },
  { path: 'services',component:ServicesComponent},
  { path: '', redirectTo: '/employees/:id', pathMatch: 'full' },
  { path: 'employees/:id',component:EmployeesComponent},
  { path: '', redirectTo: '/employees/information/:id', pathMatch: 'full' },
  { path: 'employees/information/:id',component:ProfileEmployeeComponent},
  { path: '', redirectTo: '/payment/:id', pathMatch: 'full' },
  { path: 'payment/:id',component:PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
