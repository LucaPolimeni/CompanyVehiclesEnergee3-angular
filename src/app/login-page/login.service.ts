import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "./user.module";
import {Employee} from "../admin/employees-admin/Employee";

@Injectable({providedIn: "root"})
export class LoginService implements OnInit{

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }

  login(email: string, check: boolean){
    this.http.get<Employee>('http://localhost:8080/api/employees/findByEmail/' + email)
      .subscribe(
        responseData => {
          if(check){
            localStorage.setItem('id', String(responseData.id));
            localStorage.setItem('firstName', responseData.firstName);
            localStorage.setItem('lastName', responseData.lastName);
          } else {
            sessionStorage.setItem('id', String(responseData.id));
            sessionStorage.setItem('firstName', responseData.firstName);
            sessionStorage.setItem('lastName', responseData.lastName);
          }
          // this.user.id = responseData.id;
          // this.user.firstName = responseData.firstName;
          // this.user.lastName = responseData.lastName;
          // console.log(this.user.firstName);
          // console.log(responseData.firstName);
        });

  }

}
