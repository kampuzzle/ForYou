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

  month: string = 'Agosto';
  user: any = '';
  monthList = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  extratos: any = [];

  despesas = [{
    nome: 'Alimentação', icon: 'restaurant'},{
    nome: 'Lazer', icon: 'local_play'},{
    nome: 'Saúde', icon: 'local_hospital'},{
    nome: 'Transporte', icon: 'directions_car'},{
    nome: 'Educação', icon: 'school'},{
    nome: 'Moradia', icon: 'home'},{
    nome: 'Outros', icon: 'local_atm'}
  ];
  receitas = [{
    nome: 'Salário', icon: 'payments'},{
    nome: 'Rendimentos', icon: 'savings'},{
    nome: 'Mesada', icon: 'attach_money'}
  ];
  monthIndex: any = '';

  constructor(
    private router: Router,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('username');
    let index = 0;
    for (let month of this.monthList) {
      index++;
      if (month === this.month){
        this.monthIndex = index;
      }
    }
    let monthString = '';
    if(this.monthIndex < 10){
      monthString = '0'+this.monthIndex;
    }

    this.crudService.getAll('/getMovimentacoes/' + this.user + '/receita/' + monthString).subscribe(extratos => {
      this.extratos = extratos;
    });
    this.graph();

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
    console.log('/getMovCateg/' + this.user + '/' + tipo + '/08/' + categoria)
    this.crudService.getAll('/getMovCateg/' + this.user + '/' + tipo + '/08/' + categoria).subscribe(extratos => {
      this.extratos = extratos;
    })
  }

  graph() {
    var chart = echarts.init(document.getElementById('graph')!);

    var data = this.crudService.getAll('/getDespesas' + this.user + '/receita');
    console.log(data);

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
