import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { LoginPageComponent } from './auth/login-page.component';
import { VehiclesAdminComponent } from './admin/vehicles-admin/vehicles-admin.component';
import { EmployeesAdminComponent } from './admin/employees-admin/employees-admin.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {PageNotFoundComponent} from "./PageNotFound/pageNotFound.component";
import { BookingsComponent } from './bookings/bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    NewBookingComponent,
    MyProfileComponent,
    LoginPageComponent,
    VehiclesAdminComponent,
    EmployeesAdminComponent,
    UserComponent,
    AdminComponent,
    NavbarComponent,
    PageNotFoundComponent,
    BookingsComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
