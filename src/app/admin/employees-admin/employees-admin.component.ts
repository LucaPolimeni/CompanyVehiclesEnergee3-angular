import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { Employee } from './Employee';

@Component({
  selector: 'app-employees-admin',
  templateUrl: './employees-admin.component.html',
  styleUrls: ['./employees-admin.component.css']
})
export class EmployeesAdminComponent implements OnInit {
  dataLoaded = false;
  showedTable = false;
  add = false;
  addedEmployee = false;
  nome = "";
  cognome = "";

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'sex',
    'email',
    'phoneNumber',
    'taxCode',
    'active'
  ]

  
  employeesArray = [];

  EmployeesData : Employee[] = this.employeesArray;
  //  [{
  //  firstName: "Luca",
  //  lastName: this.employeesArray[2],
  //  sex: this.employeesArray[3],
  //  email: this.employeesArray[4],
  //  phoneNumber: this.employeesArray[5],
  //  taxcode: this.employeesArray[6],
  //  active: this.employeesArray[7]
  //}];

  
  dataSource;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //this.getEmployees(); //per mandare la richiesta get quando clicco il bottone nell'header
  }

  addEmployee(){
    this.add = !this.add;
    this.showedTable = !this.showedTable;
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  onAddedEmployee(form: NgForm){
    this.addedEmployee = true;
    this.nome = form.value.name;
    this.cognome = form.value.lastName;
    var firstName = this.nome;
    var lastName = this.cognome;
    var sex = form.value.sex;
    var phoneNumber = form.value.phone;
    var email = firstName + "." + lastName + "@energee3.com";
    var taxCode = form.value.fiscalCode;
    var active = true;

    //console.log(firstName, lastName, sex, phoneNumber, email, taxCode);

    this.http.post(
      "http://localhost:8080/api/employees/newEmployee", 
      {firstName, lastName, sex, phoneNumber, email, taxCode, active}
      ).subscribe(responseData =>{
        console.log(responseData);
      });
  }

  getEmployees(){
    if (!this.dataLoaded){
    this.http.get("http://localhost:8080/api/employees/findAll")
    .pipe(
      map(responseData => {

        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            this.employeesArray.push({...responseData[key], id:key});
          }
        }
        console.log(this.employeesArray[0].firstName);
        console.log(this.employeesArray[0].lastName);
        console.log("array -> ", this.EmployeesData);
        this.dataSource = new MatTableDataSource(this.EmployeesData);
      })
    )
    .subscribe(posts => {
      //console.log(posts)
    })
    } 
    this.dataLoaded = true; //per evitare che ogni volta che clicco "cerca" vengano ricaricati i dati in nuove righe della tabella
    this.showedTable = true;
  }
}
