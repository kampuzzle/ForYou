import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss']
})

export class DebtComponent implements OnInit {
  debts: any[] = ['Alimentação ', 'Lazer', 'Transporte', 'Saude', 'Educação', 'Moradia', 'Outros'];

  constructor() { }

  ngOnInit(): void {

  }



}
