import { Component, Input, OnInit, Output } from '@angular/core';
import { IncomeDebtService } from 'src/app/services/income-debt.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  @Input() categorys: any = [];
  @Input() title: string = '';
  @Input() tipo: string = '';

  new: any = {
    nomeDeUsuario: '',
    valor: '',
    descricao: '',
    categoria: '',
    data: '',
    tipo: ''
  }


  constructor( private incomeDebtService: IncomeDebtService ) { }

  ngOnInit(): void {
    localStorage.setItem('username', 'Amanda');
    this.new.tipo = this.tipo;
    this.new.nomeDeUsuario = localStorage.getItem('username');
  }

  create() {
    localStorage.setItem('username', 'Amanda');
    this.new.tipo = this.tipo;
    this.new.nomeDeUsuario = localStorage.getItem('username');
    this.incomeDebtService.create(this.new, '/novaMovimentacao').subscribe(incomeDebt => {
      this.new = incomeDebt;
      console.log(incomeDebt);
    }), (err: any) => {
      console.log(err);
    }
  }


}
