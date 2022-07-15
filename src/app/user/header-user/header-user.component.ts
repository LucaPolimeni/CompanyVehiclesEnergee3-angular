import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  firstName: string;
  lastName: string;

  constructor() {}

  ngOnInit(): void {
    this.firstName = sessionStorage.getItem("firstName") ? sessionStorage.getItem("firstName") : localStorage.getItem("firstName");
    this.lastName = sessionStorage.getItem("lastName") ? sessionStorage.getItem("lastName") : localStorage.getItem("lastName");
  }

  onLogout(){
    sessionStorage.clear();
    localStorage.clear();
  }

}
