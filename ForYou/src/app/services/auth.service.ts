import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  serviceUrl: string = "/auth";
  tokenName: string = 'ForYouToken';
  currentUser: User | undefined;

  constructor( 
    public jwtHelper: JwtHelperService,
    private router: Router) {
    var token = localStorage.getItem(this.tokenName);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(!this.IsAuthenticated()){
      this.logout();
      return false;
    }
    return true;
  }

  public logout(): void {
    localStorage.removeItem(this.tokenName);
    this.currentUser = undefined;
    this.router.navigate(['/login']);
  }

  public IsAuthenticated(): boolean {
    this.loadUser();
    return !this.jwtHelper.isTokenExpired(this.getCurrentToken());
  }

  public loadUser(): void {
    let token = localStorage.getItem(this.tokenName);

    if(token) {
      var decoded = this.jwtHelper.decodeToken(token);
      this.currentUser =  new User(decoded);
    }
  }

  public isAuthenticated(): boolean {
    this.loadUser();
    return !this.jwtHelper.isTokenExpired(this.getCurrentToken());
  }

  public getCurrentToken(): any {
    return localStorage.getItem(this.tokenName);
  }

  public getCurrentUser(): any {
    var decoded = this.jwtHelper.decodeToken(this.getCurrentToken());
    return decoded;
  }
}
