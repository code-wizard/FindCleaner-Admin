import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'adminDashboard', component: DashboardComponent },
  { path: 'usersInsight', component: UsersComponent, children: [
    // {
    //   path: '/:userId', component: ApplyComponent
    // },
  ]},
  { path: '', redirectTo: 'adminDashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'adminDashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
