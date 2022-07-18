import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Vehicles} from "../../new-booking/new-booking.component";
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-vehicles-admin',
  templateUrl: './vehicles-admin.component.html',
  styleUrls: ['./vehicles-admin.component.css']
})
export class VehiclesAdminComponent implements OnInit, OnDestroy {
  add = false;
  addedVehicle = false;

  targa = "";
  produttore = "";
  modello = "";
  alimentazione = "";
  anno = "";

  displayedColumns: string[] = [
    'id',
    'fuel',
    'modelId',
    //'modelId[yearProd]',
    'manufacturerId',
    'active'
  ];

  vehiclesArray: Vehicles[] = [];
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
        console.log(responseData);
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            this.vehiclesArray.push({...responseData[key], myId:key});
          }
        }
        this.dataSource = new MatTableDataSource(this.vehiclesArray);
      });
  }



}
