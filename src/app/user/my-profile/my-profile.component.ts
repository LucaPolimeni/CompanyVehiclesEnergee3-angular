import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../../admin/employees-admin/Employee";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  submitted = false;
  id: number;
  telefono: number;
  employee: Employee = {email: null, firstName: null, id: null, lastName: null, phoneNumber: null, sex: null, taxCode: null};
  //profilePic = "https://lh3.googleusercontent.com/a/AItbvmmerj5d2RT_qxezx_0eBsnfrrXsB2faDYt1-ccp=s96-c";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem("id")){
      this.id = Number(localStorage.getItem("id"));
    } else if (sessionStorage.getItem("id")) {
      this.id = Number(sessionStorage.getItem("id"));
    } else {
      return;
    }

    this.callApi();
  }

  callApi(){
    if(!this.id){
      return;
    }

    this.http.get<Employee>("http://localhost:8080/api/employees/findById/" + this.id)
      .subscribe(responseData => {
        this.employee.id = this.id;
        this.employee.firstName = responseData.firstName;
        this.employee.lastName = responseData.lastName;
        this.employee.sex = responseData.sex;
        this.employee.phoneNumber = responseData.phoneNumber;
        this.employee.taxCode = responseData.taxCode;
        this.employee.email = responseData.email;
      });
  }

  onSubmit(form: NgForm){
    this.telefono= form.value.telefono;

    if(!form.valid || !this.id){
      return;
    }

    this.http.put("http://localhost:8080/api/employees/updatePhone/" + this.id,
      {phoneNumber: this.telefono}
      ).subscribe(responseData =>{
        console.log(responseData);
        this.submitted = true;
    });
  }



}
