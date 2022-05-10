import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeDebtService extends CrudService {

  override Url: string = 'income-debt';
  override class = 'IncomeDebt';
  
  constructor( backendService: BackendService ) { 
    super(backendService)
  }

}
