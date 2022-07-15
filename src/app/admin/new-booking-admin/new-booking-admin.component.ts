import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-new-booking-admin',
  templateUrl: './new-booking-admin.component.html',
  styleUrls: ['./new-booking-admin.component.css']
})
export class NewBookingAdminComponent implements OnInit {
  submitted = false;
  booked = false;
  currentId = 0;
  cognome ="";
  nome = "";
  dataInizio="";
  dataFine= "";

  vehiclesArray = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAvailablesVehicles();
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

  getAvailablesVehicles(){
      this.http.get("http://localhost:8080/api/vehicles/findAll")
      .pipe(
        map(responseData => {

          for (const key in responseData){
            if(responseData.hasOwnProperty(key)){
              this.vehiclesArray.push({...responseData[key], id:key});
            }
          }
          console.log("array -> ", this.vehiclesArray);
          console.log("targa -> ", this.vehiclesArray[0].id);
          console.log("produttore -> ", this.vehiclesArray[0].modelId.manufacturerId.name);
          console.log("modello -> ", this.vehiclesArray[0].modelId.name);
          console.log("anno -> ", this.vehiclesArray[0].modelId.yearProd);
          console.log("alimentazione -> ", this.vehiclesArray[0].fuel);
        })
      )
      .subscribe(posts => {
        //console.log(posts)
      })
    } 

    bookVehicle(id: number){
      this.booked = true;
      this.currentId = id;
    }
  
}
