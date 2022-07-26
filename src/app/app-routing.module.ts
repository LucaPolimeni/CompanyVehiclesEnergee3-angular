import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { EmployeesAdminComponent } from "./admin/employees-admin/employees-admin.component";
import { VehiclesAdminComponent } from "./admin/vehicles-admin/vehicles-admin.component";
import { MyProfileComponent } from "./user/my-profile/my-profile.component";
import { NewBookingComponent } from "./new-booking/new-booking.component";
import {UserComponent} from "./user/user.component";
import {PageNotFoundComponent} from "./pages/PageNotFound/pageNotFound.component";
import {AuthGuard} from "./core/auth/auth.guard";
import {LoginPageComponent} from "./core/auth/login-page.component";
import { BookingsComponent } from "./bookings/bookings.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
      children: [
        {path: '', redirectTo: 'newBookingAdmin', pathMatch: 'full'},
        {path: 'newBookingAdmin', component: NewBookingComponent},
        {path: 'bookings', component: BookingsComponent},
        {path: 'vehicles', component: VehiclesAdminComponent},
        {path: 'employees', component: EmployeesAdminComponent},
    ]},
    {path: 'user', component: UserComponent, canActivate: [AuthGuard],
      children: [
        {path: '', redirectTo: 'newBooking', pathMatch: 'full'},
        {path: 'newBooking', component: NewBookingComponent},
        {path: 'myBookings', component: BookingsComponent},
        {path: 'myProfile', component: MyProfileComponent}
    ]},
    {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
