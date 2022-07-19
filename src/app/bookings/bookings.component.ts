import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { LoginService } from '../auth/login.service';
import { Bookings } from '../shared/Bookings';
import { Employee } from '../shared/Employee';
import { Utilizations } from '../shared/Utilizations';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  showUtilization = false;
  bookingId;
  employeeMail = "";
  displayedColumnsBookings: string[] = [
    'id',
    'vehicleId',
    'startDate',
    'endDate',
    'utilizations'
  ]

  displayedColumnsBookingsAdmin: string[] = [
    'id',
    'employeeId',
    'vehicleId',
    'startDate',
    'endDate',
    'utilizations'
  ]

  displayedColumnsUtilizations: string[] = [
    'startDate',
    'endDate',
    'km',
    'note'
  ]

  bookings: Bookings[] = [];
  dataSourceBookings: MatTableDataSource<Bookings>;

  //utilizations: Utilizations[] = [];
  dataSourceUtilizations: MatTableDataSource<Utilizations>;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  isAdmin(){
    return this.loginService.isAdmin;
  }

  ngOnInit() {
    if (this.isAdmin())
      this.getAllBookings();
    else 
      this.getBookingsByEmployeeId();
  }

  ngOnDestroy() {
    this.bookings = [];
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  //getEmailEmployeeById(employeeId){
  //  console.log("getEmailByEmployeeId --> ", employeeId);
  //  this.http.get<Employee>("http://localhost:8080/api/employees/findById/" + employeeId)
  //    .subscribe(data => {
 //      console.log("SUBSCRIBE  -->  ", data["email"]);
  //      this.employeeMail = data["email"]
  //    });
  //  console.log("FUNCTION  -->  ", this.employeeMail);
  //}

  getAllBookings(){
    this.http.get<Bookings>("http://localhost:8080/api/bookings/findAll")
      .pipe(
        map(responseData => {
          for (const key in responseData){
            if(responseData.hasOwnProperty(key)){
              //this.getEmailEmployeeById(responseData[key]["employeeId"]);
              //responseData[key]["employeeId"] = this.employeeMail;

              const myStartDate = responseData[key]["startDate"];
              responseData[key]["startDate"] = myStartDate.substr(0, myStartDate.indexOf("T")) + "  - ore " + myStartDate.substr(myStartDate.indexOf("T")+1, 5)

              const myEndDate = responseData[key]["endDate"];
              responseData[key]["endDate"] = myEndDate.substr(0, myEndDate.indexOf("T")) + "  - ore " + myEndDate.substr(myEndDate.indexOf("T")+1, 5)

              this.bookings.push({...responseData[key], myId:key});
            }
          }
          this.dataSourceBookings = new MatTableDataSource(this.bookings);
          console.log(this.bookings)
        })
      ).subscribe();

  }
  getBookingsByEmployeeId(){
    let id: number;

    if(localStorage.getItem("id")){
      id = Number(localStorage.getItem("id"));
    } else if (sessionStorage.getItem("id")) {
      id = Number(sessionStorage.getItem("id"));
    } else {
      return;
    }

    this.http.get<Bookings>("http://localhost:8080/api/bookings/findByEmployeeId/" + id)
      .pipe(
        map(responseData => {
          for (const key in responseData){
            if(responseData.hasOwnProperty(key)){
              const myStartDate = responseData[key]["startDate"];
              responseData[key]["startDate"] = myStartDate.substr(0, myStartDate.indexOf("T")) + "  - ore " + myStartDate.substr(myStartDate.indexOf("T")+1, 5)

              const myEndDate = responseData[key]["endDate"];
              responseData[key]["endDate"] = myEndDate.substr(0, myEndDate.indexOf("T")) + "  - ore " + myEndDate.substr(myEndDate.indexOf("T")+1, 5)

              this.bookings.push({...responseData[key], myId:key});
            }
          }
          this.dataSourceBookings = new MatTableDataSource(this.bookings);
          console.log(this.bookings)
        })
      ).subscribe();

  }

  getUtilization(id){
    const utilizations = [];
    this.http.get<Utilizations>("http://localhost:8080//api/bookings/utilizationsByBookingId/" + id)
    .pipe(
      map(responseData => {
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            const myStartDate = responseData[key]["startDate"];
            responseData[key]["startDate"] = myStartDate.substr(0, myStartDate.indexOf("T")) + "  - ore " + myStartDate.substr(myStartDate.indexOf("T")+1, 5)

            const myEndDate = responseData[key]["endDate"];
            responseData[key]["endDate"] = myEndDate.substr(0, myEndDate.indexOf("T")) + "  - ore " + myEndDate.substr(myEndDate.indexOf("T")+1, 5)

            utilizations.push({...responseData[key], myId:key});
          }
        }
        this.dataSourceUtilizations = new MatTableDataSource(utilizations);
        //console.log(responseData);
      })
    ).subscribe()

    this.showUtilization = true
    this.bookingId = id;
  }

  onAddUtilization(form: NgForm){
    console.log(form.value)
    const startDate = form.value.startDate
    const endDate = form.value.endDate
    const km = form.value.km
    const note = form.value.note
    console.log("startDate -> ", startDate, " endDate -> ", endDate, " km -> ", km,  " note -> ", note)
    this.http.post<Utilizations>("http://localhost:8080/api/bookings/insertKmNote", 
    {
      "bookingId": {
          "id": this.bookingId
      },
      "startDate": startDate,
      "endDate": endDate,
      "km": km,
      "note": note
    }
      ).subscribe(responseData =>{
        console.log(responseData);
      });

      this.getUtilization(this.bookingId)
  }

}
