import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { BackendService } from './backend.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate{

  serviceUrl: string = "/auth";
  tokenName: string = 'ForYouToken';
  currentUser: User | undefined;

  constructor(
    // public jwtHelper: JwtHelperService,
    private router: Router,
    private backendService: BackendService) {
    var token = localStorage.getItem(this.tokenName);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(!this.isAuthenticated()){
      this.logout();
      return false;
    }
    return true;
  }

  public login(username: string, password: string): Observable<User> {
    return this.backendService.post('/login', { "username": username, "password": password }).pipe(map((res: any) => {
      localStorage.setItem(this.tokenName, res.token);

      var decoded = '';//this.jwtHelper.decodeToken(res.token);
      this.currentUser = new User(decoded);
      return this.currentUser;
    }))
  }

  public logout(): void {
    localStorage.removeItem(this.tokenName);
    this.currentUser = undefined;
    this.router.navigate(['/login']);
  }

  public loadUser(): void {
    let token = localStorage.getItem(this.tokenName);

    if(token) {
      var decoded = '';//this.jwtHelper.decodeToken(token);
      this.currentUser =  new User(decoded);
    }
  }

  public isAuthenticated(): boolean {
    this.loadUser();
    return true;//!this.jwtHelper.isTokenExpired(this.getCurrentToken());
  }

  public getCurrentToken(): any {
    return localStorage.getItem(this.tokenName);
  }

  public getCurrentUser(): any {
    var decoded = '';//this.jwtHelper.decodeToken(this.getCurrentToken());
    return decoded;
  }
}
