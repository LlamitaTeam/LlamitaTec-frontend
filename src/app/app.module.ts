import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatListModule} from '@angular/material/list';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import{ MatRadioModule} from "@angular/material/radio";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import { AppRoutingModule } from './app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { LoginComponent } from './login/pages/login/login.component';
import { RegisterComponent } from './register/pages/register/register.component';
import { EmployeesComponent } from './employees/pages/employees/employees.component';
import { ServicesComponent } from './services/pages/services/services.component';
import { HomeComponent } from './home/pages/home/home.component';
import { ProfileComponent } from './profile/pages/profile/profile.component';
import { ProfileEmployeeComponent } from './profile/pages/profile-employee/profile-employee.component';
import { PaymentComponent } from './payment/pages/payment/payment.component';
import { ProfileEmployeeUserComponent } from './profile/pages/profile-employee-user/profile-employee-user.component';
import { HomeEmployeeComponent } from './home/pages/home-employee/home-employee.component';
import { CancelDialogComponent } from './dialogs/pages/cancel-dialog/cancel-dialog.component';
import { AddrequestDialogComponent } from './dialogs/pages/addrequest-dialog/addrequest-dialog.component';
import { ConfigureregisterComponent } from './register/pages/configureregister/configureregister.component';
import { ProfileClientComponent } from './profile/pages/profile-client/profile-client.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ProfileEmployeeComponent,
    PaymentComponent,
    EmployeesComponent,
    ServicesComponent,
    ProfileEmployeeUserComponent,
    HomeEmployeeComponent,
    CancelDialogComponent,
    AddrequestDialogComponent,
    ConfigureregisterComponent,
    ProfileClientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatDatepickerModule,
    MatListModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    LayoutModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatSidenavModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
