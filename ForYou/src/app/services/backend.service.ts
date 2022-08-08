import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private API = 'http://localhost:8080'; //MOCK

  constructor( private http: HttpClient ) { }

  public getById = (Url: string, id: any) => {
    return this.http.get(this.API + Url + '/' + id);
  }

  public post = (Url: string, data: any) => {
    return this.http.post(this.API + Url, data);
  }

  public put = (Url: string, data: any) => {
    return this.http.put(this.API + Url, data);
  }

  public delete = (Url: string, id: any) => {
    return this.http.delete(this.API + Url + '/' + id);
  }

  public getAll = (Url: string) => {
    return this.http.get(this.API + Url);
  }
}
