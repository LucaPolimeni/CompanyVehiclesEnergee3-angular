import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-booking-admin',
  templateUrl: './new-booking-admin.component.html',
  styleUrls: ['./new-booking-admin.component.css']
})
export class NewBookingAdminComponent implements OnInit {
  submitted = false;
  cognome ="";
  nome = "";
  dataInizio="";
  dataFine= "";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.submitted = true;

    var email = form.value.email;
    this.nome = (email.substr(0,email.indexOf("."))).toUpperCase();
    var cognomeTemp = (email.substr(email.indexOf(".")+1)).toUpperCase();
    this.cognome = cognomeTemp.substr(0, cognomeTemp.indexOf("@"));

    this.dataInizio = form.value.startDate;
    this.dataFine = form.value.endDate;

    form.reset();
  }
}
