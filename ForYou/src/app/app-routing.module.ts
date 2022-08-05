import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)},
  {
    path: '',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)},
  { 
    path: 'home', 
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: 'new-income', loadChildren: () => import('./views/income/income.module').then(m => m.IncomeModule) },
  { path: 'new-debt', loadChildren: () => import('./views/debt/debt.module').then(m => m.DebtModule) },
  { path: 'register', loadChildren: () => import('./views/register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
