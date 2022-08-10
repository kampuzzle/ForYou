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
  saldos: any;
  data: any = [];

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
      this.getExtrato(extratos);
    });

    this.crudService.getAll('/getSaldos/' + this.user + '/' + monthString).subscribe(saldos => {
      this.saldos = saldos;
    })
  }

  decrement() {
    this.month = this.monthList[this.monthList.indexOf(this.month) - 1];
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
      this.getExtrato(extratos);
    });
    this.saldos = null;
    this.crudService.getAll('/getSaldos/' + this.user + '/' + monthString).subscribe(saldos => {
      this.saldos = saldos;
    })
  }

  increment() {
    this.month = this.monthList[this.monthList.indexOf(this.month) + 1];

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
      this.getExtrato(extratos);
    });
    this.saldos = null;
    this.crudService.getAll('/getSaldos/' + this.user + '/' + monthString).subscribe(saldos => {
      this.saldos = saldos;
    })
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

  getExtrato(extratos: any) {
    let dictList = [];
    for(let cat of this.despesas) {
      let somaCat = 0;
      for (let extrato of extratos) {
        if (extrato.tipo === 'despesa') {
          if(extrato.categoria.replace(/\s/g, "") === cat.nome){
            somaCat+=extrato.valor;
          }
        }
      }
      let dict = {value: 0, name: ''}
      if(somaCat != 0) {
        dict.name = cat.nome;
        dict.value = somaCat;
        dictList.push(dict);
      }
    }
    this.graph(dictList);
  }

  graph(dict: any) {
    var chart = echarts.init(document.getElementById('graph')!);
    console.log(dict);

    chart.setOption({
      title: {},
      tooltip: {},
      series: [{
        type: 'pie',
        data: dict,
        radius: ['40%', '70%']
      }]
    })
  }
}
