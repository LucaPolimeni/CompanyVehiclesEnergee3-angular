import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Vehicles} from "../../new-booking/new-booking.component";
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";

export interface VehicleModel {
  Targa: string,
  Alimentazione: string,
  Modello: string,
  Anno: number,
  Produttore: string,
  Attiva: boolean
}

@Component({
  selector: 'app-vehicles-admin',
  templateUrl: './vehicles-admin.component.html',
  styleUrls: ['./vehicles-admin.component.css']
})
export class VehiclesAdminComponent implements OnInit, OnDestroy {
  add = false;
  addedVehicle = false;
  showButton = true;
  targa = "";
  produttore = "";
  modello = "";
  alimentazione = "";
  anno = "";

  displayedColumns: string[] = [
    'Targa',
    'Alimentazione',
    'Produttore',
    'Modello',
    'Anno',
    'Attiva'
  ];

  vehiclesArray: VehicleModel[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  ngOnDestroy(): void {
    this.vehiclesArray = [];
  }

  addVehicle(){
    this.add = !this.add;
    this.showButton = !this.add;
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

  getVehicles(){
    this.http.get<Vehicles>("http://localhost:8080/api/vehicles/findAll")
      .subscribe(responseData =>{
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            const vehicle: VehicleModel = {
              Attiva: false,
              Alimentazione: "",
              Anno: 0,
              Modello: "",
              Produttore: "",
              Targa: ""
            };

            vehicle.Targa = responseData[key].id;
            vehicle.Alimentazione = responseData[key].fuel;
            vehicle.Attiva = responseData[key].active;
            vehicle.Modello = responseData[key].modelId.name;
            vehicle.Anno = responseData[key].modelId.yearProd;
            vehicle.Produttore = responseData[key].modelId.manufacturerId.name;
            this.vehiclesArray.push(vehicle);

          }
        }
        this.dataSource = new MatTableDataSource(this.vehiclesArray);
      });
  }

  insertVehicles(){
    //this.http.post("http://localhost:8080/api/vehicles/").subscribe();
  }



}
