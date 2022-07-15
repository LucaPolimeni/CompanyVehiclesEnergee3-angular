import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { BookingsAdminComponent } from "./admin/bookings-admin/bookings-admin.component";
import { EmployeesAdminComponent } from "./admin/employees-admin/employees-admin.component";
import { HeaderAdminComponent } from "./admin/header-admin/header-admin.component";
import { NewBookingAdminComponent } from "./admin/new-booking-admin/new-booking-admin.component";
import { VehiclesAdminComponent } from "./admin/vehicles-admin/vehicles-admin.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { HeaderUserComponent } from "./user/header-user/header-user.component";
import { MyBookingsComponent } from "./user/my-bookings/my-bookings.component";
import { MyProfileComponent } from "./user/my-profile/my-profile.component";
import { NewBookingComponent } from "./user/new-booking/new-booking.component";
import {UserComponent} from "./user/user.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'admin', component: AdminComponent, children: [
        {path: '', redirectTo: 'newBookingAdmin', pathMatch: 'full'},
        {path: 'newBookingAdmin', component: NewBookingAdminComponent},
        {path: 'bookings', component: BookingsAdminComponent},
        {path: 'vehicles', component: VehiclesAdminComponent},
        {path: 'employees', component: EmployeesAdminComponent},
    ]},
    {path: 'user', component: UserComponent, children: [
        {path: '', redirectTo: 'newBooking', pathMatch: 'full'},
        {path: 'newBooking', component: NewBookingComponent},
        {path: 'myBookings', component: MyBookingsComponent},
        {path: 'myProfile', component: MyProfileComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
