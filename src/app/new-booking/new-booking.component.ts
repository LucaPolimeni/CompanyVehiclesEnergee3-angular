import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../core/auth/login.service";
import {Employee} from "../shared/Employee";
import { environment } from 'src/environments/environment';
import { Vehicles } from '../shared/Vehicles';


@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {
  submitted = false;
  booked = false;
  error = null;
  id: number;
  startDate: string;
  endDate: string;
  position: number = null;
  date: string;
  vehiclesArray: Vehicles[] = [];

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.date = new Date().toISOString().slice(0, 16);
  }

  ngOnInit() {
    if(localStorage.getItem("id")){
      this.id = Number(localStorage.getItem("id"));
    } else if (sessionStorage.getItem("id")) {
      this.id = Number(sessionStorage.getItem("id"));
    } else {
      return;
    }

  }

  onSubmit(form: NgForm){
    this.vehiclesArray = [];
    this.booked = false;
    this.error = null;
    this.startDate = form.value.startDate;
    this.endDate = form.value.endDate;

    if(!form.valid){
      return;
    }

    if (this.isAdmin()){
      this.getEmployeeId(form.value.email);
    }

    if(!this.error) {
      if((this.startDate < this.endDate)) {
        this.getAvailable(form.value.startDate, form.value.endDate);
      } else {
        this.error = true;
      }
    }
  }

  getAvailable(startDate, endDate){
    this.http.get<Vehicles>(`${environment.apiURL}bookings/available/` + startDate + "&" + endDate)
      .subscribe(responseData =>{
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            this.vehiclesArray.push({...responseData[key], myId:key});
          }
        }
      });

    this.submitted = true;
  }

  newBooking(index: number){
      this.insertBooking(
        this.id,
        this.vehiclesArray[index].id,
        this.startDate,
        this.endDate
      );
      this.position = index;
  }

  insertBooking(id: number, license_plate: string, startDate: any, endDate: any){
    this.http.post(`${environment.apiURL}bookings/newBooking`, {
      "employeeId": {
        "id": id
      },
      "vehicleId" : {
        "id": license_plate
      },
      "startDate": startDate,
      "endDate": endDate
    }).subscribe(resData => {
      console.log(resData);
      resData == 1 ? this.booked = true : this.error = true;
    });

  }

  isAdmin(){
    return this.loginService.isAdmin;
  }

  getEmployeeId(email: string){
    this.http.get<Employee>(`${environment.apiURL}employees/findByEmail/` + email)
      .subscribe(resData => {
        this.id = resData.id;
      }, error => {
        this.error = true;
      });
  }

}
