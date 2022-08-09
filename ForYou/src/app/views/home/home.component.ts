import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  month: string = 'Janeiro';
  user: any = '';
  monthList = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  extratos = [];

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

  constructor(
    private router: Router,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.crudService.getAll('/getMovimentacoes/Amanda/receita/janeiro').subscribe(extratos => {
      this.extratos = extratos;
      console.log("dajksdkasd")
      console.log(extratos)
    });
    this.graph();
    // this.crudService.getAll('/getUser').subscribe(user => {
    //   this.user = user;
    // });
    this.user = 'Amanda';
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

  extratoCategoria(categoria: string, tipo: string) {
    this.crudService.getAll('/getMovimentacao/' + this.user + '/' + tipo + '/' + this.month + '/' + categoria).subscribe(extratos => {
      this.extratos = extratos;
    })
  }

  graph() {
    var chart = echarts.init(document.getElementById('graph')!);
    console.log(this.despesas[0], this.despesas[1])
    chart.setOption({
      title: {},
      tooltip: {},
      series: [{
        type: 'pie',
        data: [
          {
            value: 10,
            name: this.despesas[0].nome
          },
          {
            value: 10,
            name: this.despesas[1].nome
          }
        ],
        radius: ['40%', '70%']
      }]
    })
  }
}
