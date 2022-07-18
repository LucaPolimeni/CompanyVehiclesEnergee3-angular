import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Bookings } from 'src/app/user/my-bookings/Bookings';
import { Utilizations } from 'src/app/user/my-bookings/Utilizations';

@Component({
  selector: 'app-bookings-admin',
  templateUrl: './bookings-admin.component.html',
  styleUrls: ['./bookings-admin.component.css']
})
export class BookingsAdminComponent implements OnInit {
  showUtilization = false;
  bookingId;
  displayedColumnsBookings: string[] = [
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

  dataSourceUtilizations: MatTableDataSource<Utilizations>;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getBookings();
  }

  onSubmit(form: NgForm){
    console.log(form.value)
  }

  //getEmployeeById(id){
  //  console.log("getEmployeesById")
  //  this.http.get("http://localhost:8080/api/employees/findById/" + id)
  //  .pipe(
  //    map(responseData => {
  //      console.log(responseData["email"])
  //      return responseData["email"]
  //    })
  //  ).subscribe();
  //}

  getBookings(){
    this.http.get<Bookings>("http://localhost:8080/api/bookings/findAll")
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

            console.log(responseData[key]["startDate"]);
            utilizations.push({...responseData[key], myId:key});
          }
        }
        this.dataSourceUtilizations = new MatTableDataSource(utilizations);
        console.log(responseData);
      })
    ).subscribe()

    this.showUtilization = true
    this.bookingId = id;
  }

}
