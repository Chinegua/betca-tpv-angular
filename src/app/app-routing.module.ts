import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbDeleteDialogComponent } from './home/admin/db-delete-dialog.component';
import {DbSeedDialogComponent } from './home/admin/db-seed-dialog.component';

import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CashierClosedComponent } from './home/cashier-closed/cashier-closed.component';
import { CashierOpenedComponent } from './home/cashier-opened/cashier-opened.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL },
  { path: WelcomeComponent.URL, component: WelcomeComponent },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: CashierClosedComponent.URL, component: CashierClosedComponent },
      { path: CashierOpenedComponent.URL, component: CashierOpenedComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [
    CashierClosedComponent,
    CashierOpenedComponent,
    HomeComponent,
    WelcomeComponent
  ];

  static componentFactory = [
    DbDeleteDialogComponent,
    DbSeedDialogComponent
  ];
}
