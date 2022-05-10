import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { IncomeComponent } from './income.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    IncomeComponent
  ],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    ComponentsModule
  ]
})
export class IncomeModule { }
