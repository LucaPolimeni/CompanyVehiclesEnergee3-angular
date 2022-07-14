import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bookings-admin',
  templateUrl: './bookings-admin.component.html',
  styleUrls: ['./bookings-admin.component.css']
})
export class BookingsAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form.value)
  }

}
