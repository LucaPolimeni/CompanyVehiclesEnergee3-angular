import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { HeaderUserComponent } from './user/header-user/header-user.component';
import { NewBookingComponent } from './user/new-booking/new-booking.component';
import { MyBookingsComponent } from './user/my-bookings/my-bookings.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewBookingAdminComponent } from './admin/new-booking-admin/new-booking-admin.component';
import { BookingsAdminComponent } from './admin/bookings-admin/bookings-admin.component';
import { VehiclesAdminComponent } from './admin/vehicles-admin/vehicles-admin.component';
import { EmployeesAdminComponent } from './admin/employees-admin/employees-admin.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderAdminComponent,
    HeaderUserComponent,
    NewBookingComponent,
    MyBookingsComponent,
    MyProfileComponent,
    LoginPageComponent,
    NewBookingAdminComponent,
    BookingsAdminComponent,
    VehiclesAdminComponent,
    EmployeesAdminComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
