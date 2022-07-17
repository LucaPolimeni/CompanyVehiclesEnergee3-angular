import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

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
  dataInizio="";
  dataFine= "";
  id: number;

  constructor(private http: HttpClient) { }

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
    // this.dataInizio = form.value.startDate;
    // this.dataFine = form.value.endDate;

    this.getAvailable(form.value.startDate, form.value.endDate);

  }

  getAvailable(startDate, endDate){
    this.http.get<Vehicles[]>("http://localhost:8080/api/bookings/available/" + startDate + "&" + endDate)
      .subscribe(resData =>{
        console.log(resData);
      });

    this.submitted = true;
  }

}
