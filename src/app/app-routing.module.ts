import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { BookingsAdminComponent } from "./admin/bookings-admin/bookings-admin.component";
import { EmployeesAdminComponent } from "./admin/employees-admin/employees-admin.component";
import { NewBookingAdminComponent } from "./admin/new-booking-admin/new-booking-admin.component";
import { VehiclesAdminComponent } from "./admin/vehicles-admin/vehicles-admin.component";
import { MyBookingsComponent } from "./user/my-bookings/my-bookings.component";
import { MyProfileComponent } from "./user/my-profile/my-profile.component";
import { NewBookingComponent } from "./user/new-booking/new-booking.component";
import {UserComponent} from "./user/user.component";
import {PageNotFoundComponent} from "./PageNotFound/pageNotFound.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginPageComponent} from "./auth/login-page.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
      children: [
        {path: '', redirectTo: 'newBookingAdmin', pathMatch: 'full'},
        {path: 'newBookingAdmin', component: NewBookingAdminComponent},
        {path: 'bookings', component: BookingsAdminComponent},
        {path: 'vehicles', component: VehiclesAdminComponent},
        {path: 'employees', component: EmployeesAdminComponent},
    ]},
    {path: 'user', component: UserComponent, canActivate: [AuthGuard],
      children: [
        {path: '', redirectTo: 'newBooking', pathMatch: 'full'},
        {path: 'newBooking', component: NewBookingComponent},
        {path: 'myBookings', component: MyBookingsComponent},
        {path: 'myProfile', component: MyProfileComponent}
    ]},
    {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
