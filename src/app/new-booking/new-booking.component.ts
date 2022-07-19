import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../auth/login.service";
import {Employee} from "../shared/Employee";

export interface Vehicles {
  id: string,
  fuel: string,
  modelId: {
    name: string,
    yearProd: number,
    manufacturerId: {
      name: string
    }
  }
}

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
  startDate: any;
  endDate: any;
  position: number = null;
  vehiclesArray: Vehicles[] = [];

  constructor(private http: HttpClient, private loginService: LoginService) { }

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

    if (this.isAdmin()){
      this.getEmployeeId(form.value.email);
    }

    if(!this.error) {
      this.getAvailable(form.value.startDate, form.value.endDate);
    }
  }

  getAvailable(startDate, endDate){
    this.http.get<Vehicles>("http://localhost:8080/api/bookings/available/" + startDate + "&" + endDate)
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
    this.http.post("http://localhost:8080/api/bookings/newBooking", {
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
    this.http.get<Employee>('http://localhost:8080/api/employees/findByEmail/' + email)
      .subscribe(resData => {
        this.id = resData.id;
      }, error => {
        this.error = true;
      });
  }

}
