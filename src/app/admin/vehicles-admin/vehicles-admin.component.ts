import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Vehicles } from 'src/app/shared/Vehicles';

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
  calledGetManufacturer = false;
  addManufacturerButton = false;
  manufacturerAdded = false;
  addModelButton = false;
  modelAdded = false;
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

  modelsArray = [];
  manufacturersArray = [];
  modelsByManufacturerArray = [];

  vehiclesArray: VehicleModel[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getVehicles();
    this.getModels();
  }

  ngOnDestroy(): void {
    this.vehiclesArray = [];
  }

  addVehicle(){
    this.add = !this.add;
    this.showButton = !this.add;
    if (!this.calledGetManufacturer)
      this.getManufacturer();
    this.calledGetManufacturer = true;
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  onAddVehicle(form: NgForm){
    this.addedVehicle = true;
    this.targa = (form.value.licensePlate).toUpperCase();
    this.produttore = form.value.manufacturer
    this.modello = form.value.model;
    this.alimentazione = form.value.fuel;

    this.http.post(`${environment.apiURL}vehicles/newVehicle`, 
      {
        "id": this.targa,
        "fuel": this.alimentazione,
        "modelId": {
            "id": this.modello
        },
        "active": true
      }
      ).subscribe(responseData => {
        console.log(responseData);
        this.modelAdded = true;
      });
  }

  getVehicles(){
    this.http.get<Vehicles>(`${environment.apiURL}vehicles/findAll`)
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

  getModels(){
    this.http.get(`${environment.apiURL}vehicles/models`)
    .subscribe(responseData => {
      for (const key in responseData){
        if(responseData.hasOwnProperty(key)){
          this.modelsArray.push({...responseData[key], id:key});
        }
      }
      console.log(this.modelsArray);
    })
  }

  getManufacturer(){
    this.http.get(`${environment.apiURL}vehicles/manufacturer`)
    .subscribe(responseData => {
      for (const key in responseData){
        if(responseData.hasOwnProperty(key)){
          this.manufacturersArray.push({...responseData[key], myId:key});
        }
      }
      console.log(this.manufacturersArray);
    })
  }

  getModelsByManufacturer(event){
    if (event.target.value == "add"){
      this.addManufacturerButton = true;
    } else{
      this.addManufacturerButton = false;
      this.modelsByManufacturerArray = [];
      const manufacturerName = event.target.value;
      console.log(manufacturerName);
    
      this.http.get(`${environment.apiURL}vehicles/modelByManufacturer/` + manufacturerName)
      .subscribe(responseData => {
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            this.modelsByManufacturerArray.push({...responseData[key], myId:key});
          }
        }
        console.log(this.modelsByManufacturerArray);
      })
    }
  }

  addManufacturer(form: NgForm){
    const name = form.value.manufacturerName
    this.http.post(`${environment.apiURL}vehicles/newManufacturer`, {"name": name})
    .subscribe(responseData => {
      console.log(responseData);
      this.manufacturerAdded = true;
    });
  }

  addModelEvent(event){
    if(event.target.value == "add"){
      this.addModelButton = true;
    } else{
      this.addModelButton = false;
    }
  }

  addModel(form: NgForm){
    const manufacturerId = form.value.manufacturer;
    const modelName = form.value.modelName
    const year = form.value.year
  
    console.log("id manufacturer -> ", manufacturerId)
    console.log("name model -> ", modelName)
    console.log("year -> ", year)

       this.http.post(`${environment.apiURL}vehicles/newModel`, 
       {
        "name": modelName,
        "yearProd": year,
        "manufacturerId": {
            "id": manufacturerId
         }
       }
       ).subscribe(responseData => {
        console.log(responseData);
        this.modelAdded = true;
      });
  }

}
