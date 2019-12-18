import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserViewComponent } from './users/user-view/user-view.component';

const routes: Routes = [
  { path: 'adminDashboard', component: DashboardComponent },
  { path: 'usersInsight', component: UsersComponent},
  {
    path: 'usersInsight/:userId', component: UserViewComponent
  },
  { path: '', redirectTo: 'adminDashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'adminDashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
