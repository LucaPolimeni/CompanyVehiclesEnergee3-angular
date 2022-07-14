import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  submitted = false;
  telefono = "";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.submitted = true;
    this.telefono = form.value.telefono;
  }

}
