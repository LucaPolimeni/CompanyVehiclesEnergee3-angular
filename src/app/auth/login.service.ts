import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Employee} from "../admin/employees-admin/Employee";
import {catchError, tap } from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({providedIn: "root"})
export class LoginService implements OnInit{
  isAdmin: boolean = false;
  isLogged: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  login(email: string, check: boolean){
    return this.http.get<Employee>('http://localhost:8080/api/employees/findByEmail/' + email)
      .pipe(
       catchError(this.handleError),
        tap(responseData => {
          if(check){
            localStorage.setItem('id', String(responseData.id));
            localStorage.setItem('firstName', responseData.firstName);
            localStorage.setItem('lastName', responseData.lastName);
          } else {
            sessionStorage.setItem('id', String(responseData.id));
            sessionStorage.setItem('firstName', responseData.firstName);
            sessionStorage.setItem('lastName', responseData.lastName);
          }
          this.isLogged = true;
        }));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    console.log(errorRes.error.status);

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.status) {
      case 500:
        errorMessage = 'This email does not exist.';
        break;
      case 401:
        errorMessage = 'Unauthorized access';
        break;
    }
    return throwError(errorMessage);
  }

}
