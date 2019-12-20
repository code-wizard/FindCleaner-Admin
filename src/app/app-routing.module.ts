import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserViewComponent } from './users/user-view/user-view.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionViewComponent } from './transactions/transaction-view/transaction-view.component';

const routes: Routes = [
  { path: 'adminDashboard', component: DashboardComponent },
  { path: 'usersInsight', component: UsersComponent},
  {
    path: 'usersInsight/:userId', component: UserViewComponent
  },
  { path: 'transactionsInsight', component: TransactionsComponent},
  {
    path: 'transactionsInsight/:transactionsId', component: TransactionViewComponent
  },
  { path: '', redirectTo: 'adminDashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'adminDashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
