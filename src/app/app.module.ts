import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { ChartsModule } from "ng2-charts";

import { AppComponent } from "./app.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderNavComponent } from "./header-nav/header-nav.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ChartComponent } from "./shared/components/chart/chart.component";
import { UsersComponent } from "./users/users.component";
import { AuthcrudInterceptorService } from "./auth/auth-crud-interceptor.service";
import { UserViewComponent } from "./users/user-view/user-view.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionViewComponent } from "./transactions/transaction-view/transaction-view.component";
import { SettingsComponent } from "./settings/settings.component";
import { ShortenPipe } from "./shared/pipes/shorten.pipe";
import { FilterPipe } from "./shared/pipes/filter.pipe";
import { SessionsComponent } from "./sessions/sessions.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { AdminUserViewComponent } from "./admin-users/admin-user-view/admin-user-view.component";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderNavComponent,
    DashboardComponent,
    ChartComponent,
    UsersComponent,
    UserViewComponent,
    TransactionsComponent,
    TransactionViewComponent,
    SettingsComponent,
    ShortenPipe,
    FilterPipe,
    SessionsComponent,
    LoginComponent,
    RegisterComponent,
    AdminUsersComponent,
    AdminUserViewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatCardModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthcrudInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
