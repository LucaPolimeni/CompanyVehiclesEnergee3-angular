import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoginService} from "../auth/login.service";

@Component({
  selector: 'nav-bar-root',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    if(!this.loginService.isAdmin) {
      this.firstName = sessionStorage.getItem("firstName") ? sessionStorage.getItem("firstName") : localStorage.getItem("firstName");
      this.lastName = sessionStorage.getItem("lastName") ? sessionStorage.getItem("lastName") : localStorage.getItem("lastName");
    }
  }

  onLogout(){
    this.loginService.isAdmin = false;
    sessionStorage.clear();
    localStorage.clear();
  }

  isAdmin():boolean {
    return this.loginService.isAdmin;

  }

}
