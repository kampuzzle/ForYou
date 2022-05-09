import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  month: string = 'Janeiro';
  monthList = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  despesas = [{
    nome: 'Alimentação', icon: 'restaurant'},{
    nome: 'Lazer', icon: 'local_play'},{
    nome: 'Saúde', icon: 'local_hospital'},{
    nome: 'Transporte', icon: 'directions_car'},{
    nome: 'Educação', icon: 'school'},{
    nome: 'Moradia', icon: 'home'},{
    nome: 'Outros', icon: 'local_atm'},{
    nome: 'Adicionar categoria', icon: 'add'}
  ];
  receitas = [{
    nome: 'Salário', icon: 'payments'},{
    nome: 'Rendimentos', icon: 'savings'},{
    nome: 'Mesada', icon: 'attach_money'},{
    nome: 'Adicionar categoria', icon: 'add'}
  ];
    // 'Salário', 'Bolsa', 'Mesada', 'Adicionar categoria'];


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  decrement() {
    this.month = this.monthList[this.monthList.indexOf(this.month) - 1];
  }

  increment() {
    this.month = this.monthList[this.monthList.indexOf(this.month) + 1];
  }

  debt() {
    this.router.navigate(['/new-debt']);
  }

  income() {
    this.router.navigate(['/new-income']);
  }
}
