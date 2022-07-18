import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Bookings } from './Bookings';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit, OnDestroy {
  expandedElement = false;
  displayedColumns: string[] = [
    'id',
    'vehicleId',
    'startDate',
    'endDate'
  ]

  bookings: Bookings[] = [];
  dataSource: MatTableDataSource<Bookings>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getBookings();
  }

  ngOnDestroy() {
    this.bookings = [];
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  getBookings(){
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
              this.bookings.push({...responseData[key], myId:key});
            }
          }
          this.dataSource = new MatTableDataSource(this.bookings);
        })
      ).subscribe();

  }

  getUtilization(id){
    console.log("currentId -> ", id)
    this.expandedElement = !this.expandedElement;
  }


}
