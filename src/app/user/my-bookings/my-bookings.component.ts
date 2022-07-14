import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Bookings } from './Bookings';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'vehicleId',
    'startDate',
    'endDate',
    'utilization'
  ]

  BookingData : Bookings[] =[{
    "id" :1,
    "vehicleId": "AB123CD",
    "startDate": "08/07/2022",
    "endDate": "10/07/2022",
    "utilization": 5
  },
  {
    "id" :2,
    "vehicleId": "AB123CD",
    "startDate": "08/07/2022",
    "endDate": "10/07/2022",
    "utilization": 5
  }  
];

  dataSource = new MatTableDataSource(this.BookingData);
constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }
}
