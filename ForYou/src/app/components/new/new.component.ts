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

  //toda vez que a tela for inicializada irá armazenar o tipo recebido por input property no tipo do objeto criado e pegar o nome de usuário salvo na localStorage
  ngOnInit(): void {
    this.new.tipo = this.tipo;
    this.new.nomeDeUsuario = localStorage.getItem('username');
  }

  //pega o nome do usuario na localStorage e cria uma nova movimentação chamando o serviço de incomeDebt
  create() {
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
