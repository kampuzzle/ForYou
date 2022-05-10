import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebtRoutingModule } from './debt-routing.module';
import { DebtComponent } from './debt.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    DebtComponent
  ],
  imports: [
    CommonModule,
    DebtRoutingModule,
    ComponentsModule
  ]
})
export class DebtModule { }
