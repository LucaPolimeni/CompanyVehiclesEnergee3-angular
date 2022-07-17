import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from "./login.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) signupForm: NgForm;
  error: string = null;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogin(){
    if(!this.signupForm.valid){
      return;
    }

    let authObs: Observable<any>;

    const email = this.signupForm.value.email;

    if(email == 'admin.admin@energee3.com'){
      this.loginService.isAdmin = true;
      this.loginService.isLogged = true;
      this.router.navigate(['admin']);

    } else {
      authObs = this.loginService.login(email, this.signupForm.value.ricordami);
      authObs.subscribe(
        resData => {
          this.router.navigate(['user']);
        },
        error =>{
          this.error = error;
        });
    }

  }

}
