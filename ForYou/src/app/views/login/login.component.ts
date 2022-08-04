import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  public login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(
      res => {
        this.router.navigate(['/home']);
      },
      (err: any) => {
        console.log(err);
        this.user.password = undefined;
      }
    )
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
