import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {
    username: null,
    password: null
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
  }

  public login(): void {
    console.log(this.user);
  }

}
