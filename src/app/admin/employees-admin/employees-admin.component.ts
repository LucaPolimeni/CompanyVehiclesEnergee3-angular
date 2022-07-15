import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatColumnDef, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort'
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
  employeesArray = [];
  EmployeesData : Employee[] = this.employeesArray;
  dataSource: MatTableDataSource<Employee>;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'sex',
    'email',
    'phoneNumber',
    'taxCode',
    'active'
  ]


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEmployees(); //per mandare la richiesta get quando clicco il bottone nell'header
  }

  addEmployee(){
    this.add = !this.add;
    this.showedTable = !this.add;
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    //this.dataSource.filter = form.value.email.trim().toLowerCase();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
