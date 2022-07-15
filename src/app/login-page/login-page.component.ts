import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from "./login.service";
import {User} from "./user.module";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) signupForm: NgForm;
  isAdmin: boolean = false;
  error: string = null;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogin(){
    if(!this.signupForm.valid){
      return;
    }

    const email = this.signupForm.value.email;

    if(email == 'admin.admin@energee3.com'){
      this.isAdmin = true;
      this.router.navigate(['admin']);

    } else {
      this.loginService.login(email, this.signupForm.value.ricordami);
      this.router.navigate(['user']);
    }
  }

}
