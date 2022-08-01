import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl (''),
    password: new FormControl (''),
    confirmPassword: new FormControl ('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  register(): void {
    console.log(this.form.value);
  }

}
