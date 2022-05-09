import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  Url: string = '';
  class: any = '';

  constructor(
    private backendService: BackendService
  ) { }

  public create(item: any): Observable<any> {
    return this.backendService.post(this.Url, item).pipe(
      map((res: any) => new this.class(res.resp)),
      catchError((err) => {
        throw err;
      })
    )
  }

  public update(item: any): Observable<any> {
    return this.backendService.put(this.Url, item).pipe(
      map((res: any) => new this.class(res.resp)),
      catchError((err) => {
        throw err;
      })
    )
  }

  public delete(item: any): Observable<any> {
    return this.backendService.delete(this.Url, item).pipe(
      map((res: any) => {
        return res;
      },
      catchError((err) => {
        return 'Falha ao deletar item. Status: ' + err.status;
      }))
    )
  }

  public getAll(): Observable<any> {
    return this.backendService.getAll(this.Url).pipe(
      map((res: any) => {
        return res;
      },
      catchError((err) => {
        return 'Falha ao buscar itens. Status: ' + err.status;
      }))
    )
  }

  public getById(id: number): Observable<any> {
    return this.backendService.getById(this.Url, id).pipe(
      map((res: any) => new this.class(res.resp)),
      catchError((err) => {
        return 'Falha ao buscar item. Status: ' + err.status;
      })
    )
  }
}
