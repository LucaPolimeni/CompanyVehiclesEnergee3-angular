import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vehicles-admin',
  templateUrl: './vehicles-admin.component.html',
  styleUrls: ['./vehicles-admin.component.css']
})
export class VehiclesAdminComponent implements OnInit {
  add = false;
  addedVehicle = false;

  targa = "";
  produttore = "";
  modello = "";
  alimentazione = "";
  anno = "";

  constructor() { }

  ngOnInit(): void {
  }

  addVehicle(){
    this.add = !this.add;
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  onAdd(form: NgForm){
    this.addedVehicle = true;
    console.log("added", form.value);
    this.targa = (form.value.licensePlate).toUpperCase();
    this.produttore = form.value.manufacturer;
    this.modello = form.value.model;
    this.alimentazione = form.value.fuel;
    this.anno = form.value.year;
  }

}
