import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  incomes: any[] = ['Salário', 'Bolsa', 'Mesada'];

  constructor() { }

  ngOnInit(): void {
  }

}
