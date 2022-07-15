import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {
  submitted = false;
  dataInizio="";
  dataFine= "";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.submitted = true;

    this.dataInizio = form.value.startDate;
    this.dataFine = form.value.endDate;

    console.log(this.dataInizio);
    console.log(this.dataFine);
    form.reset();
  }

}
