import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./users/users.component";
import { UserViewComponent } from "./users/user-view/user-view.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionViewComponent } from "./transactions/transaction-view/transaction-view.component";
import { SettingsComponent } from "./settings/settings.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "adminDashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "usersInsight/pages/:pageNumber",
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "usersInsight/:username",
    component: UserViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "transactionsInsight/pages/:pageNumber",
    component: TransactionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "transactionsInsight/:transactionId",
    component: TransactionViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "sessions",
    component: SessionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "adminDashboard", pathMatch: "full" },
  { path: "**", redirectTo: "adminDashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
