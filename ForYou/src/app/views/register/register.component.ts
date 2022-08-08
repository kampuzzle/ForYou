import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

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

  constructor(
    private crudService: CrudService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.crudService.create(this.form.value, '/cadastro').subscribe(register => {
      console.log(register);
      this.router.navigate(['/login']);
    }), (err: any) => {
      this.router.navigate(['/login']);
    }
  }


}
