import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/pages/employees/employees.component';
import { HomeEmployeeComponent } from './home/pages/home-employee/home-employee.component';
import { HomeComponent } from './home/pages/home/home.component';

import { LoginComponent } from './login/pages/login/login.component';
import { PaymentComponent } from './payment/pages/payment/payment.component';
import { ProfileEmployeeUserComponent } from './profile/pages/profile-employee-user/profile-employee-user.component';
import { ProfileClientComponent } from './profile/pages/profile-client/profile-client.component';
import { ProfileEmployeeComponent } from './profile/pages/profile-employee/profile-employee.component';
import { ProfileComponent } from './profile/pages/profile/profile.component';
import { RegisterComponent } from './register/pages/register/register.component';
import { ServicesComponent } from './services/pages/services/services.component';
import { ConfigureregisterComponent } from './register/pages/configureregister/configureregister.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',component:LoginComponent},
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register',component:RegisterComponent},
  { path: '', redirectTo: '/configure', pathMatch: 'full' },
  { path: 'configure',component:ConfigureregisterComponent},
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
  { path: '', redirectTo: '/client/information/:id', pathMatch: 'full' },
  { path: 'client/information/:id',component:ProfileClientComponent},
  { path: '', redirectTo: '/payment/:id', pathMatch: 'full' },
  { path: 'payment/:id',component:PaymentComponent},
  { path: '', redirectTo: '/profileemployee', pathMatch: 'full' },
  { path: 'profileemployee',component:ProfileEmployeeUserComponent},
  { path: '', redirectTo: '/homeemployee', pathMatch: 'full' },
  { path: 'homeemployee',component:HomeEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
