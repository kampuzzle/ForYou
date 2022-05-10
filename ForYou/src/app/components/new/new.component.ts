import { Component, Input, OnInit } from '@angular/core';
import { IncomeDebtService } from 'src/app/services/income-debt.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  @Input() categorys: any = [];
  @Input() title: string = '';

  new: any = {
    value: '',
    description: '',
    category: '',
    date: ''
  }

  constructor( private incomeDebtService: IncomeDebtService ) { }

  ngOnInit(): void {
  
  }

  create() {
    this.incomeDebtService.create(this.new).subscribe(incomeDebt => {
      this.new = incomeDebt;
      console.log(incomeDebt);
    }), (err: any) => {
      console.log(err);
    }
  }


}
