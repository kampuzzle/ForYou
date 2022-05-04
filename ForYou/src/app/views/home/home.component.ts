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

  despesas = ['Alimentação ', 'Lazer', 'Transporte', 'Saude', 'Educação', 'Moradia', 'Outros'];
  receitas = ['Salário', 'Bolsa', 'Mesada'];

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
